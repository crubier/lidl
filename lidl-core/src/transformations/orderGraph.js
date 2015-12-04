"use strict"

import _ from 'lodash'

import {mergePortList,portIsOnlyMadeOf,conjugatePort,portIsDefined} from '../ports'

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
          .filter(edge => portIsOnlyMadeOf(edge.from.ports,'out') && portIsOnlyMadeOf(edge.to.ports,'in') )
          .size() > 0)
        .forEach(x=>visit(x,_(stack).concat([n]).value()))
        .commit();

        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }

  // The list is now ordered ! (Hopefully)
  //  We write the order in the nodes
  _(orderingList)
  .forEach((node, ii) => {node.hasExecutionOrder=true;node.executionOrder = ii;})
  .commit();
  // .forEach(function(node, ii) {console.log("iii "+ii);node.hasExecutionOrder=true;node.executionOrder = ii;})
  // .forEach((node, index) =>{console.log(node.executionOrder);})
  // .commit();


}
