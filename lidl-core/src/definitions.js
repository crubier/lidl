"use strict"

var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var serializer = require('./serializer.js');



var _ = require('lodash');

function expand(ast){
  return _(ast)
  // .tap(x=>console.log("aaaaaaaaaa"))
  // .tap(x=>console.log(serializer.serialize(x[0].interaction)))
  .map(lidlDef=>interactions.expand(lidlDef))
  // .tap(x=>console.log("bbbbbbbbbb"))
  // .tap(x=>console.log(serializer.serialize(x[0].interaction)))
  .map(lidlDef=>
    _(lidlDef)
    .assign({interaction:identifiers.reduceIdentifiers(lidlDef.interaction)})
    .value())
  .value();
}


module.exports.expand =expand;
