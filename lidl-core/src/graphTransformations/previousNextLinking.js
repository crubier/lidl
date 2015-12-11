
"use strict"

import _ from 'lodash'

export default function previousNextLinking(graph) {
  graph
  .reduceNodes({type:'InteractionInstance',content:{operatorType:'Previous'}},
  (theResult,theNode)=>{
    let stateId = _.uniqueId('state_');

    // Add a first node to get from state variable
    let source =
      graph
      .addNode({type:'InteractionInstance',containsAState:true,stateVariableName:stateId,content:{'type': 'InteractionNative','content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\n}\n"},ports: ["in", "out"]});
    // Add edge to first ports
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:0},to:x.to}))
    .commit();
    // Add edge to second ports
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:1}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source,index:1},to:x.to}))
    .commit();


    // Add a second node to set state variable
    let source2 =
      graph
      .addNode({type:'InteractionInstance',containsAState:true,stateVariableName:stateId,content:{'type': 'InteractionNative','content': "if(<%=a0%> === active) {\nnextState['" + stateId + "'] = <%=a1%>;\n}\n"},ports: ["in", "in"]});
      // Add edge to first ports
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source2,index:0},to:x.to}))
    .commit();
      // Add edge to second ports
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode,index:2}})
    .forEach(x=>
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:source2,index:1},to:x.to}))
    .commit();


    graph
    .finish(theNode);
  });

}
