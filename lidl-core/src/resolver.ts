// iii package resolver : find the package associated with an identifier

var Resolver = function (basedir) {
  this.baseDir = basedir;
};

// This function takes an argument : the name of a package (example: "crubier/mypackage/subpackage1")
// It returns a string which is the text corresponding to a package (for a file : "crubier/mypackage/subpackage1/index.iii")
Resolver.prototype.resolve = async function (name) {
  return await Bun.file(this.baseDir + name + "/index.iii").text();
};

export default Resolver;
