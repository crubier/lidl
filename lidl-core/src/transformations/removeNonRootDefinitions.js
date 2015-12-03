"use strict"

// This transformation removes all definitions from a graph exepted one: the selected rootNode

export default function removeNonRootDefinition(graph,rootNode) {
  graph
  .matchNodes({type:'Definition'})
  .reject(x=>(x===rootNode))
  .forEach(x=>{

    graph
    .matchDirectedEdges({type:'DefinitionSubInteractionInstance',from:{node:x}})
    .forEach(e=>{
      graph
      .finish(e.to.node);})
    .commit()

    graph
    .matchDirectedEdges({type:'DefinitionSubInterface',from:{node:x}})
    .forEach(e=>{
      graph
      .finish(e.to.node);})
    .commit()

    graph
    .matchDirectedEdges({type:'SignatureOperand',from:{node:x}})
    .forEach(e=>{
      graph
      .finish(e.to.node);})
    .commit()

    // Finally we remove the definition node
    graph
    .finish(x);
  })
  .commit();

}
