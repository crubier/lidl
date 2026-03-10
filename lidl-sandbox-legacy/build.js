var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var stylus = require('stylus');

console.log("Building");

browserify("./src/main.js",{ debug: true,entry: true })
.transform("babelify")
.bundle()
.on("error", function (err) { console.log("Error: " + err.message); })
.on('end', function() {console.log('Success for main.js');})
.pipe(fs.createWriteStream("dist/main.js"));

var style =
stylus(fs.readFileSync('src/main.styl', {encoding: 'utf8'}))
.set('filename', 'src/main.styl')
.set('sourcemap', {inline:true})
.define('url', stylus.resolver());


style.render(function(err, css) {
  fs.writeFileSync('dist/main.css', css, {encoding: 'utf8'});
  // fs.writeFileSync('dist/main.css.map',JSON.stringify( style.sourcemap), {encoding: 'utf8'});
});
