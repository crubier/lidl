var gulp  = require('gulp');
var peg   = require('gulp-peg');
var newer = require('gulp-newer');
var del   = require('del');

var jest = require('gulp-jest');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('browserify', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './index.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('iii-min.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});







gulp.task('jest',['dist'], function () {
    return gulp.src('./').pipe(jest({
        // scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        // testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "src"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ],
        collectCoverage:true
    }));
});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('dist',['parser','javascript'],function() {

});

gulp.task('javascript',function() {
  return gulp.src('src/**/*.js')
  // .pipe(newer('dist'))
  .pipe(gulp.dest('dist'));
});

gulp.task('parser',['language parser','operator parser']);

gulp.task('language parser',function() {
  return gulp.src('src/parser.pegjs')
  .pipe(peg({
    allowedStartRules:["start","interaction","interface","data","interactionDefinition"]
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('operator parser',function() {
  return gulp.src('src/operator.pegjs')
  .pipe(peg({
    allowedStartRules:["start"]
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch',['dist'], function() {
  gulp.watch('src/**/*.*', ['test']);
  gulp.watch('test/**/*.*', ['test']);
  gulp.watch('example/**/*.*', ['test']);
});

gulp.task('prepublish',['dist']);

gulp.task('default', ['dist']);
