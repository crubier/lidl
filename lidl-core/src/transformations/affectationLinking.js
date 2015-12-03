"use strict"

import _ from 'lodash'

import {mergePortList,portIsOnlyMadeOf,conjugatePort,portIsDefined} from '../ports'

export default function affectationLinking(graph) {
// Mark all as linkable
  graph
  .matchNodes({type:'InteractionInstance',content:{type:'InteractionSimple',operatorType:'Affectation'}})
  .forEach(theNode=>{theNode.potentiallyAffectationLinkable = true;})
  .commit();


// reduce
  graph
    .reduceNodes({type:'InteractionInstance',potentiallyAffectationLinkable:true,content:{type:'InteractionSimple',operatorType:'Affectation'}},
    (theResult,theNode)=>{
  theNode.ports[0]='in';
if(portIsDefined(theNode.ports[1]) && portIsDefined(theNode.ports[2])) {
  if(portIsOnlyMadeOf(theNode.ports[1],'out') && portIsOnlyMadeOf(theNode.ports[2],'in'))
      {
      let source =
        graph
        .addNode({type:'InteractionInstance',content:{type: 'InteractionNative',content: 'if(<%=a0%> === active) {<%=a1%> = <%=a2%>;}\n'},ports: ["in", "out", "in"]});

      _(_.range(3))
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
} else if(portIsOnlyMadeOf(theNode.ports[1],'in') && portIsOnlyMadeOf(theNode.ports[2],'out'))
      {
      let source =
        graph
        .addNode({type:'InteractionInstance',content:{type: 'InteractionNative',content: 'if(<%=a0%> === active) {<%=a2%> = <%=a1%>;}\n'},ports: ["in", "in", "out"]});

      _(_.range(3))
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
}else if(portIsOnlyMadeOf(theNode.ports[1],'in') && portIsOnlyMadeOf(theNode.ports[2],'in')) {

      graph
      .finish(theNode);
} else if(portIsOnlyMadeOf(theNode.ports[1],'out') && portIsOnlyMadeOf(theNode.ports[2],'out')) {

      graph
      .finish(theNode);
}else {
        theNode.potentiallyAffectationLinkable = false;
      }
} else {
if(portIsDefined(theNode.ports[1])) {
  if(portIsOnlyMadeOf(theNode.ports[1],'out')) {
    theNode.ports[2]='in';
  }
  if(portIsOnlyMadeOf(theNode.ports[1],'in')) {
      theNode.ports[2]='out';
    }
} else if(portIsDefined(theNode.ports[2])) {
  if(portIsOnlyMadeOf(theNode.ports[2],'out')) {
    theNode.ports[1]='in';
  }
  if(portIsOnlyMadeOf(theNode.ports[2],'in')) {
      theNode.ports[1]='out';
    }
} else {
theNode.potentiallyAffectationLinkable = false;
}
}
    });



}
