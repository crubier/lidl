"use strict"

import _ from 'lodash'

export default function linkInterface(graph,rootDefNode) {

  graph
  .matchDirectedEdges({type:'DefinitionInterface',from:{node:rootDefNode}})
  .forEach(edge=>{

    // First, lets find the 4 nodes of the chain (rootDefNode is in this chain too)
    let mainInteractionInstanceNode =
    graph
    .findDirectedEdge({type:'DefinitionInteractionInstance',from:{node:rootDefNode}})
    .to.node;

    let interfaceNode =
    edge.to.node;

    let interfaceInteractionInstanceNode =
    graph
    .findDirectedEdge({type:'InterfaceInteractionInstance',from:{node:interfaceNode}})
    .to.node;


    graph
    .addEdge({type:'InteractionInstanceOperand',from:{node:mainInteractionInstanceNode,index:0},to:{node:interfaceInteractionInstanceNode,index:0}});

  })
  .commit();


}
