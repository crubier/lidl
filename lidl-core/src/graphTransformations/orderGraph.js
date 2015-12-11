"use strict"

import _ from 'lodash'

import {madeOnlyOf} from '../interfaces'

// Use tarjan algorithm to order the graph
export default function orderGraph(graph) {

  let orderingList = [];

  graph
  .matchNodes({type:'InteractionInstance'})
  .forEach(x=>{x.markedDuringGraphOrdering=false;})
  .commit();

  graph
  .reduceNodes({markedDuringGraphOrdering:false},
  (theResult,theNode)=>{
    visit(theNode,[theNode]);
  });

  function visit(n,stack) {

    if (n.temporarilyMarkedDuringGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error ("the interaction DAG contains cycles: "+_(stack).concat([n]).map('id').join(" -> "));
    } else {
      if (n.markedDuringGraphOrdering !== true) {
        n.temporarilyMarkedDuringGraphOrdering = true;
        graph
        .matchNodes(m=>
          graph
          .matchUndirectedEdges({type: 'InteractionInstanceOperand',from: {node:n},to: {node:m}})
          .filter(edge => madeOnlyOf(edge.from.ports)==='out' && madeOnlyOf(edge.to.ports)==='in' )
          .size() > 0)
        .forEach(m=>visit(m,_(stack).concat([n]).value()))
        .forEach(m=>{graph.addEdge({type:'InteractionInstanceDataDependency',from:{node:n},to:{node:m}});})
        .commit();

        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }

  // The list is now ordered ! (Hopefully)
  //  We write the order in the nodes
//   _(orderingList)
//   .forEach((node, ii) => {node.hasExecutionOrder=true;node.executionOrder = ii;})
// .commit();

  _(orderingList)
  .reduce((prev,current,index)=>{
    current.hasExecutionOrder=true;
    current.executionOrder = index;
    if(prev!==null) {
      // console.log(prev.id + "  "+current.id);
      graph
      .addEdge({type:'InteractionInstanceOrdering',executionOrder:index,from:{node:prev},to:{node:current}});
    }
    return current;
},null);




  // .forEach(function(node, ii) {console.log("iii "+ii);node.hasExecutionOrder=true;node.executionOrder = ii;})
  // .forEach((node, index) =>{console.log(node.executionOrder);})
  // .commit();


}
