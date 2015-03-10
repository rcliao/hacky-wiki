var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

/**
 * Simply compile the TypeScript to the javascript
 */
gulp.task('javascript', function() {
	return gulp.src('src/typescripts/**/*.ts')
		.pipe(ts({
			module: 'commonjs',
			target: 'ES5'
		}))
		.pipe(gulp.dest('src/javascripts'))
		.pipe(webpack({
			output: {
				filename: 'bundle.js',
				module: 'umd'
			}
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('build', ['javascript'], function() {
	// TODO: implement anything necessary
});

/**
 * Simple clean task to clean up all the build results
 */
gulp.task('clean', function(cb) {
	del([
		'public/javascripts'
	], cb);
});
