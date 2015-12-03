"use strict"

import _ from 'lodash'

//TODO Why do we even have to do that ? Investigate
export default function removeDuplicateEdge(graph) {

  graph
  .matchUndirectedEdges({type:'InteractionInstanceOperand'})
  .forEach(edge=>{edge.maybeDuplicate=true;})
  .commit();

  graph
  .reduceUndirectedEdges({type:'InteractionInstanceOperand',maybeDuplicate:true},
  (theResult,theEdge)=>{
    let identicalEdges =
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',maybeDuplicate:true,from:{node:theEdge.from.node,index:theEdge.from.index},to:{node:theEdge.to.node,index:theEdge.to.index}})
    .value();

    _(identicalEdges)
    .rest()
    .forEach(identicalEdge=>{
      graph
      .finish(identicalEdge);})
    .commit();

    theEdge.maybeDuplicate = false;});
}
