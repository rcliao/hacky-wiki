var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var concat = require('gulp-concat');

gulp.task('build', ['javascript', 'html'], function() {
	// TODO: implement anything necessary
});

/**
 * Simply compile the TypeScript to the javascript
 */
gulp.task('javascript', function() {
	return gulp.src('src/typescripts/**/*.ts')
		.pipe(ts({
			module: 'commonjs',
			target: 'ES5'
		}))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('src/javascripts'))
		.pipe(webpack({
			output: {
				filename: 'bundle.js',
				module: 'umd'
			}
		}))
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('html', function() {
	return gulp.src('src/views/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
	// TODO: implement incremental build as performance of build grows
	gulp.watch('src/**/*', ['build']);
});

/**
 * Simple clean task to clean up all the build results
 */
gulp.task('clean', function(cb) {
	del([
		'public/javascripts'
	], cb);
});
