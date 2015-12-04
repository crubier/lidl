"use strict"

import _ from 'lodash'

// This function should be called with a graph just after the instantiateInterfaceStage
export default function getExpandedLidl(graph) {

  let defNode =
  graph
  .findNode({type:'Definition'});

  let rootNode =
  graph
  .findDirectedEdge({type:'DefinitionInteractionInstance',from:{node:defNode}})
  .to.node;

  return {source:getLidl(graph,rootNode)};

}

function getLidl(graph,node){

  let operand =
  graph
  .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:node}})
  .filter(e=>e.to.index===0 && e.from.index>0)
  .sortBy(e=>e.from.index)
  .pluck('to.node')
  .map(n=>getLidl(graph,n))
  .value();

  let operator =
  node
  .content
  .formating
  .split('$');

  return '('+
  _.range(2*operator.length-1)
  .map(x=>((x%2)===0)?(operator[x/2]):(operand[(x-1)/2]))
  .join('') + ')';

}
