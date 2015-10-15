var gulp = require('gulp');
var del = require('del');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var vsource = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var babel = require('babelify');


var source = {
	appjs: './src/main.js',
	js: ['./src/**/*.js'],
	appcss: ['./src/main.styl'],
	apphtml: ['./src/**/*.html'],
	appimg: ['./src/img/*']
};

gulp.task('js', function(){
	browserify({ debug: true })
		.transform(babel.configure({stage: 0}))
		.require(source.appjs, { entry: true })
		.bundle()
		.pipe(vsource('main.js'))
		// .pipe(buffer())
		// .pipe(sourcemaps.init({ loadMaps: true }))
		// .pipe(sourcemaps.write('./'))
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist'));
});

// gulp.task('appcss', function () {
// 	gulp.src(source.appcss)
// 		.pipe(concat('app.min.css'))
// 		.pipe(minifyCSS())
// 		.pipe(gulp.dest('./ui-dist'));
//
//
//   return gulp.src(source.appcss)
//   .pipe(sourcemaps.init())
//   .pipe(stylus())
//   .pipe(sourcemaps.write('./'))
//   .pipe(gulp.dest('dist/'));
// });
//
// gulp.task('assets', function() {
// 	return gulp.src('./ui-src/img/**/*')
// 		.pipe(gulp.dest('./ui-dist/img'));
// });
//
//
// gulp.task('watch', function() {
// 	gulp.watch(source.appcss, ['appcss']);
// 	gulp.watch(source.apphtml, ['apphtml']);
// 	gulp.watch(source.js, ['appjs']);
// });
//
// gulp.task('default', ['appjs', 'appcss', 'apphtml', 'watch']);
//
// gulp.task('nw', ['appjs', 'appcss', 'apphtml']);



gulp.task('default',['js','html','css']);

// gulp.task('js', function () {
//   // set up the browserify instance on a task basis
//   var b = browserify({
//     entries: 'src/main.jsx',
//     insertGlobals : true,
//           debug : true,
//           extension: [ "jsx" ],
//           transform: [
//             // ["reactify", {"es6": true}]
//             ["babelify"]
//           ]
//   });
//   return b.bundle()
//     .pipe(vsource('main.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//         // Add transformation tasks to the pipeline here.
//         // .pipe(uglify())
//         .on('error', gutil.log)
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('html', function () {
  return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
  return gulp.src(source.appcss)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('clean', function (cb) {
  del([
    'dist'
  ], cb);
});

gulp.task('watch',['default'], function () {
   gulp.watch(source.js, ['js']);
});
