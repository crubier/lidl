"use strict"
var peg = require('pegjs');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');


// Generate the parser
fs.writeFileSync('./src/parser.js',
  "module.exports = "+
  peg.buildParser(fs.readFileSync('./src/parser.pegjs', {
    encoding: 'utf8'
  }), {
    allowedStartRules: ["start", "interaction", "interfac", "data", "interactionDefinition"],
    output:"source"
  }), {
    encoding: 'utf8'
  });


// Generate the operator parser
fs.writeFileSync('./src/operator.js',
  "module.exports = "+
  peg.buildParser(fs.readFileSync('./src/operator.pegjs', {
    encoding: 'utf8'
  }), {
    allowedStartRules: ["start"],
    output:"source"
  }), {
    encoding: 'utf8'
  });




// Generate the example file that contains all example cases in a JS object form
var exampleTestPath = 'example/test';
var commonHeader = path.join(exampleTestPath, 'common.lidl.js');
var examplecontent = "// File automatically generated when performing     npm run build   \n// It contains examples of lidl code from the "+exampleTestPath+" folder\n";
examplecontent += "module.exports={\nheader:`" + fs.readFileSync(commonHeader, {encoding: 'utf8'}) + "\n`,\n";
examplecontent += "lidl:[";
examplecontent += _(fs.readdirSync(exampleTestPath))
.map(x=>path.join(exampleTestPath, x))
.filter(ffile=>fs.statSync(ffile).isDirectory())
.map(ffile =>"{\n\
    name: '"+ _.startCase(path.basename(ffile)) + "',\n\
fileName: '"+ ffile + "',\n\
     code : `"+fs.readFileSync(path.join(ffile, "code.lidl"), {encoding: 'utf8'})+"`,\n\
     scenario : `"+fs.readFileSync(path.join(ffile, 'scenario.json'), {encoding: 'utf8'})+"`\n\
}")
.join(',');
examplecontent += "]\n};";
fs.writeFileSync('./src/examples.js',examplecontent,{encoding: 'utf8'})
