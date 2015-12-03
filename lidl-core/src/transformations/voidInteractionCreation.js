"use strict"

import _ from 'lodash'


// Here we create nodes for interactions that are empty
export default function voidInteractionCreation(graph) {

  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:"Void"}},
  (theResut,theNode)=>{
    let newNode = graph
      .addNode({type:'InteractionInstance',content: {'type': 'InteractionNative', 'content': '/*Nothing, there was a void interaction*/\n'},ports: [],isVoid: true});
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',to:{node:theNode,index:0}})
    .forEach(x=>graph
      .addEdge({type:'InteractionInstanceOperand',from:x,to:{node:newNode,index:x.to.index}}))
    .commit();
    graph
    .finish(theNode);

  });
}
