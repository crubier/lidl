"use strict"

import _ from 'lodash'
import interactions from '../interactions.js';

//This transformation adds information about the interfaces of each interaction node, by infering from the definitions
export default function addInterfaceInformationToInteractions(graph){
  addInterfaceInformationToArguments(graph);
  addInterfaceInformationToMainInteractions(graph);
}

function addInterfaceInformationToArguments(graph) {
  graph
  .matchNodes({type:'Interaction',isArgument:true})
  .forEach(theNode=>{
    // Find the InteractionSignatureOperandElement node this interaction agument node is associated with
    let theArgumentNode = graph
    .findDirectedEdge({type:'InteractionDefinition',from:{node:theNode}})
    .to.node;

    // Find the Interface node this InteractionSignatureOperandElement node is associated with
    let theArgumentInterfaceNode = graph
    .findDirectedEdge({type:'InteractionSignatureOperandElementInterface',from:{node:theArgumentNode}})
    .to.node;

    // Add the appropriate interaction to the interaction node on ports 0
    theNode.ports = [theArgumentInterfaceNode.content];
  })
  .commit();
}


function addInterfaceInformationToMainInteractions(graph) {
  graph
  .matchNodes({type:'InteractionDefinition'})
  .forEach(theNode=>{
    // Find the interface of this definition
    let theInterfaceNode = graph
    .findDirectedEdge({type:'DefinitionInterface',from:{node:theNode}})
    .to.node;

    // Find the main interaction of this definition
    let theMainInteractionNode = graph
    .findDirectedEdge({type:'DefinitionInteraction',from:{node:theNode}})
    .to.node;

    // The main interaction has the same interface as the definition
    theMainInteractionNode.ports = [theInterfaceNode.content];
  })
  .commit();
}
