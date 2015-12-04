
"use strict"

import _ from 'lodash'

export default function removeOneSidedAffectation(graph){
  let didMatch = true;
  do {
    didMatch = (!graph
    .matchNodes({type:'InteractionInstance',content:{type:'InteractionSimple',operatorType:'Affectation'}})
    .filter(theNode=>(
      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:1}})
      .isEmpty()
      ||
      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:2}})
      .isEmpty()))
    .forEach(theNode=>graph.finish(theNode))
    .isEmpty());
  } while (didMatch)
}
