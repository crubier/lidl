"use strict"

import _ from 'lodash'

export default function linkIdentifiers(graph) {
  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Identifier'}},
    (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',to:{node:theNode,index:0}})
    .map(e1=>
      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',to:{node:theNode,index:0}})
      .filter(x=>(x.id > e1.id)) // Only one way
      .map(e2=>
        graph
        .addEdge({type:'InteractionInstanceOperand',from:e1.from,to:e2.from}))
      .commit())
    .commit();
    graph
    .finish(theNode);
    });
}
