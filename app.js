var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var connection = require('express-myconnection');
var mysql = require('mysql');
var path = require('path');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var routes = require('./routes/index');
var config = require('./config.js');

var mysqlConnection = mysql.createConnection(config.database);

var GITHUB_CLIENT_ID = config.github.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = config.github.GITHUB_CLIENT_SECRET;

var app = express();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      mysqlConnection.query(
        'SELECT * FROM users WHERE id = ?',
        [profile.id],
        function(err, rows) {
          if (err)
            return done(err);
          if (rows.length) {
            return done(null, rows[0]);
          } else {
            var newUser = {};

            var insertQuery = 'INSERT INTO users ' +
            '(id, provider, githubUsername, displayName, avatarUrl, email) ' +
            'values (?,?,?,?,?,?)';

            mysqlConnection.query(
              insertQuery,
              [
                profile.id,
                profile.provider,
                profile.username,
                profile.displayName,
                profile._json.avatar_url,
                profile.emails[0].value
              ],
              function(err, rows) {
                newUser.id = profile.id;
                newUser.username = profile.username;
                newUser.displayName = newUser.displayName;
                newUser.avatarUrl = profile._json.avatar_url;
                newUser.email = profile.emails[0].value;

                return done(null, newUser);
            });
          }
      });
    });
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// middleware for handling mysql connection within the request response cycle
app.use(
  connection(
    mysql,
    config.database
  )
);

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/auth-success');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
