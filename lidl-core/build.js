var peg = require('pegjs');
var fs = require('fs');

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
