"use strict"

import _ from 'lodash'

export default function functionApplicationLinking(graph) {
  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'FunctionApplication'}},
  (theResult,theNode)=>{
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative',content: 'if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}\n'},ports: ["in", "in", "in", "out"]});
    _(_.range(4))
    .forEach(i=>
      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:i}})
      .forEach(x=>
        graph
        .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:i},to:x.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}
