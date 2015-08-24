var gulp = require('gulp');
var del = require('del');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
//var jest = require('gulp-jest');

gulp.task('default',['js','html','css']);

/*
gulp.task('jest', function () {
    return gulp.src('./').pipe(jest({
        // scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        // testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "dist"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ],
        collectCoverage:true
    }));
});*/



gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'src/main.jsx',
    insertGlobals : true,
          debug : true,
          extension: [ "jsx" ],
          transform: [
            ["reactify", {"es6": true}]
          ]
  });
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
  return gulp.src('src/main.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
  gulp.src('src/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('clean', function (cb) {
  del([
    'dist',
    'build',
  ], cb);
});
