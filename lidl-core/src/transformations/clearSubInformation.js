"use strict"

export default function clearSubInformation(graph){
  graph
  .matchDirectedEdges({type:'DefinitionSubInterface'})
  .forEach(x=>{
    graph
    .finish(x);})
  .commit();

  graph
  .matchDirectedEdges({type:'DefinitionSubInteractionInstance'})
  .forEach(x=>{
    graph
    .finish(x);})
  .commit();
}
