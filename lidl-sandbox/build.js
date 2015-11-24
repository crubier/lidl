var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

console.log("Building");

browserify("./src/main.js",{ debug: true,entry: true })
  .transform("babelify")
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .on('end', function() {console.log('Success for main.js');})
  .pipe(fs.createWriteStream("dist/main.js"));

// browserify("./src/worker.js",{ debug: true,entry: true })
//     .transform("babelify")
//     .bundle()
//     .on("error", function (err) { console.log("Error: " + err.message); })
//     .on('end', function() {console.log('Success for worker.js');})
//     .pipe(fs.createWriteStream("dist/worker.js"));
