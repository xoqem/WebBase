var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lessify = require('node-lessify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');

var paths = {
  app_js: ['./src/js/app.js'],
  js: ['src/js/**/*.js'],
  less: ['src/less/**/*.less']
};

// clean - remove the build folder
gulp.task('clean', function(done) {
  del(['./build'], done);
});

// browserify - create bundle (includes less and js)
gulp.task('browserify', function() {
  return browserify(paths.app_js)
    .transform(lessify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

// jshint - check js for errors
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// watch - rerun tasks when files change
gulp.task('watch', function() {
  gulp.watch(paths.less, ['build']);
  gulp.watch(paths.js, ['build']);
});

// build - standard build tasks
gulp.task('build', ['jshint', 'browserify']);

// default - clean before running build task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
