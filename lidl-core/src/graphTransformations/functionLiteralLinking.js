"use strict"

import _ from 'lodash'

export default function functionLiteralLinking(graph) {
  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Function'}},
  (theResult,theNode)=>{
    let funcName = theNode.content.operator.substring(8);
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative','content': '<%=a0%> = ' + funcName + ';\n'},ports: theNode.ports}); //FIXME interface instead of port
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

}
