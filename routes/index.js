var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// a simple test for the authentication using passport
router.get('/test', isLoggedIn, function(req, res, next) {
	res.render('index', {title: 'Authenticated Page'});
});

router.get('/auth-success', function(req, res, next) {
	res.render('auth-success', {user: req.user});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return res.send(401);

    return next();
}

module.exports = router;
