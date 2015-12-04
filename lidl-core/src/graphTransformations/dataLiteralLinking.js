
"use strict"

import _ from 'lodash'

export default function dataLiteralLinking(graph) {
  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Activation'}},
  (theResult,theNode)=>{
    let literal = theNode.content.operator;
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative','content': '<%=a0%> = ' + literal + ';\n'},ports: ["out"]});
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Boolean'}},
  (theResult,theNode)=>{
    let literal = theNode.content.operator;
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative','content': '<%=a0%> = ' + literal + ';\n'},ports: ["out"]});
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Number'}},
  (theResult,theNode)=>{
    let literal = theNode.content.operator;
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative','content': '<%=a0%> = ' + literal + ';\n'},ports: ["out"]});
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Text'}},
  (theResult,theNode)=>{
    let literal = theNode.content.operator;
    let source =
      graph
      .addNode({type:'InteractionInstance',content:{type: 'InteractionNative','content': '<%=a0%> = ' + literal + ';\n'},ports: ["out"]});
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
