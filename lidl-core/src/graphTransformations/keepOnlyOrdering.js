"use strict"

import _ from 'lodash'

export default function keepOnlyOrdering(graph){
  graph
  .matchUndirectedEdges()
  .reject({type:'InteractionInstanceOrdering'})
  .forEach(e=>{
    graph
    .finish(e);})
  .commit();
}
