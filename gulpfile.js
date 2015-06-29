var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var del = require('del');


gulp.task('default',['browserify']);



// gulp.task('browserifyReactify', function () {
//   return gulp.src('src/*.jsx')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : !gulp.env.production,
//           transform: [
//             ["reactify", {"es6": true}]
//           ]
//         }))
//         .pipe(gulp.dest('dist/'));
// });



gulp.task('browserify',['react'], function () {
  return gulp.src('build/*.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('react',function(){
  return gulp.src('src/*.jsx')
  .pipe(react())
  .pipe(gulp.dest('build/'));
} );


gulp.task('clean', function (cb) {
  del([
    'dist',
    'build',
  ], cb);
});
