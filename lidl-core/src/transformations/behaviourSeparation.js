"use strict"

import _ from 'lodash'

export default function behaviourSeparation(graph) {
  let activeSource =
    graph
    .addNode({type:'InteractionInstance',content: {type: 'InteractionNative',content: '<%=a0%> = active;\n'},ports: ["out"]});

  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:"Behaviour"}},
  (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:2}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:activeSource,index:0},to:x.to}))
    .commit();
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:1}})
      .forEach(y=>
        graph
        .addEdge({type:'InteractionInstanceOperand',from:x.to,to:y.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}
