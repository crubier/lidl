"use strict"

import _ from 'lodash'

export default function linkArguments(graph,rootDefNode) {
  graph
  .matchDirectedEdges({type:'SignatureOperand',from:{node:rootDefNode}})
  .forEach(edge=>{

    // First, lets find the 4 nodes of the chain (rootDefNode is in this chain too)
    let argumentInteractionInstanceNode =
    graph
    .findDirectedEdge({type:'InteractionInstanceIsOperandOf',to:{node:rootDefNode,index:edge.from.index}})
    .from.node;

    let signatureOperandElementNode =
    edge.to.node;

    let interfaceNode=
    graph
    .findDirectedEdge({type:'InteractionSignatureOperandElementInterface',from:{node:signatureOperandElementNode}})
    .to.node;

    let interfaceInteractionInstanceNode =
    graph
    .findDirectedEdge({type:'InterfaceInteractionInstance',from:{node:interfaceNode}})
    .to.node;

    // Check that the names are consistent just to be sure
    if(signatureOperandElementNode.content.name !== argumentInteractionInstanceNode.content.operator) {
      throw new Error('Internal error: arguments with matching indices have different names '+ signatureOperandElementNode.content.name+ ' and '+argumentInteractionInstanceNode.content.operator);
    }

    // Then we link the two ends of the chain:
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:argumentInteractionInstanceNode}})
    .forEach(e=>{
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:interfaceInteractionInstanceNode,index:e.from.index,ports:e.from.ports},to:e.to});
    })
    .commit();

    graph
    .matchUndirectedEdges({type:'DefinitionInteractionInstance',to:{node:argumentInteractionInstanceNode}})
    .forEach(e=>{
      graph
      .addEdge({type:'DefinitionInteractionInstance',from:e.from,to:{node:interfaceInteractionInstanceNode}});
    })
    .commit();

    // Then we remove the nodes of the chain we solved
    graph
    .finish(argumentInteractionInstanceNode);

    graph
    .finish(signatureOperandElementNode);

    graph
    .finish(interfaceNode);
  })
  .commit();
}
