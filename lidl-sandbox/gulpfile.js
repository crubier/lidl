var gulp = require('gulp');
var del = require('del');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var vsource = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var babelify = require('babelify');
var notify = require('gulp-notify');



gulp.task('js', function() {
  browserify({
      debug: true,
    })
    .require('./src/main.js', {
      entry: true
    })
    .transform('babelify', {
      presets: ["react", "stage-0","react"]
    })
    .bundle()
    .pipe(vsource('main.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(notify("Wrote file <%= file.relative %>"));
});



gulp.task('default', ['js', 'html', 'css']);


gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  return gulp.src(source.appcss)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('clean', function(cb) {
  del([
    'dist'
  ], cb);
});

gulp.task('watch', ['default'], function() {
  gulp.watch(source.js, ['js']);
});
