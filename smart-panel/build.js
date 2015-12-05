"use strict";

var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require('watchify');

console.log("Building");

var b =
browserify("./src/main.js",{ debug: true,entry: true, cache: {}, packageCache: {}  })
// .plugin(watchify)
.transform(babelify);


//
// .bundle()
//
// .pipe(fs.createWriteStream("dist/main.js"));

//
//
// var b = browserify({
//   debug: true,
//   entries: ['./src/main.js'],
//   cache: {},
//   packageCache: {},
//   plugin: [watchify]
// }).transform("babelify");
//


// b
// .on('update', bundle);

bundle();

function bundle() {
  console.log('Bundle');
  b
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .on('end', function() {console.log('Success for main.js');})
  .pipe(fs.createWriteStream("dist/main.js"));
}
