jest.autoMockOff();
//
var  newExpand = require('../definitions.js').newExpand;
var compiler = require('../compiler.js');
var _ = require( 'lodash');
var fs  = require(  'fs');
var path = require(  'path');
var exec = require('child_process').exec;


describe('lidl definitions', function() {
  // console.log('-------------------');

  var exampleTestPath = 'example/test';

  _(fs.readdirSync(exampleTestPath))
  .forEach( (x) =>{
    var ffile = path.join(exampleTestPath, x);
    if (fs.statSync(ffile).isDirectory()) {
      test(ffile);
    };
  })
  .commit();


  // This function compile a lidl file and compare its execution with a scenario
  function test(file) {

    var code = fs.readFileSync(path.join(file, "code.lidl"), {
      encoding: 'utf8'
    });

    describe('Expansion of file ' + file, function() {
    console.log("====================================================");
    console.log("Now (new) compiling " + file);


// Print the graph at an intermediary step for debugging
      var graphDef = newExpand(compiler.Lidl2LidlAst(code)[0],'linkIdentifiers');


      fs.writeFileSync(path.join(file, 'graphDef.dot'), graphDef.toDotDef(), {encoding: 'utf8'});
      exec("dot " + path.join(file, 'graphDef.dot') + " -o" +path.join(file, 'graphDef.pdf')+ " -Tpdf", null);
});
}});
