
var serializer = require('./serializer.js');
var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var parser = require('./parser.js');
var _ = require('lodash');
var depgraph = require('dependency-graph').DepGraph;
var compilationResult = require('./compilerExampleResult.js');

function compileToJs(source){
  //TODO Actual compilation
  if(source) return source;
  else return compilationResult;
}

function compileToIii(source){
  return serializer.serialize(
          identifiers.reduceIdentifiers(
            interactions.expand(
              parser.parse(
                source
              )[0]
            ).interaction
          )
        );
}

function compileToGraph(source) {
  return interactionToGraph(
          identifiers.reduceIdentifiers(
            interactions.expand(
              parser.parse(
                source
              )[0]
            ).interaction
          )
        );
}

function interactionToGraph(interaction){
  switch(interaction.type){
    case 'InteractionSimple':
    {
      var sub = _.map(interaction.operand,interactionToGraph);
      var cur = serializer.serialize(interaction);
      return {
        'nodes':  _.unique(_.union([{id:cur}],_.flatten(_.map(sub,'nodes'))),function(x){return x.id;}),
        'edges': _.union(_.map(_.map(interaction.operand,serializer.serialize),function(x,index){return {from:cur,to:x,id:index};}),_.flatten(_.map(sub,'edges')))
      };
    }
    case 'InteractionNative':
    {
      return {
        'nodes':{id:serializer.serialize(interaction)},
        'edges':[]
      };
    }
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }

}


module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.compileToGraph = compileToGraph;
module.exports.interactionToGraph = interactionToGraph;
