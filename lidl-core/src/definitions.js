"use strict"

var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');



var _ = require('lodash');

function expand(ast){
  return _(ast)
  .map(lidlDef=>interactions.expand(lidlDef))
  .map(lidlDef=>
    _(lidlDef)
    .assign({interaction:identifiers.reduceIdentifiers(lidlDef.interaction)})
    .value())
  .value();
}


module.exports.expand =expand;
