// iii package resolver : find the package associated with an identifier


var fs = require('fs');

var Resolver = function(basedir) {
  this.baseDir = baseDir;
};


// This function takes an argument : the name of a package (example: "crubier/mypackage/subpackage1")
// It returns a string which is the text corresponding to a package (for a file : "crubier/mypackage/subpackage1/index.iii")
Resolver.prototype.resolve = function(name) {
  return(fs.readFileSync(this.baseDir+name+"/index.iii"));
};

module.exports = Resolver;
