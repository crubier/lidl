"use strict"

import _ from 'lodash'

// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
export default function referentialTransparency(graph) {
  // First we mark all nodes as not referentialTransparencySolved
  graph
  .matchNodes({type: 'Interaction',content: {type: 'InteractionSimple'}})
  .forEach( (theNode) => {
    theNode.referentialTransparencySolved=false;
    theNode.referentialTransparencySolvable = // Only leaves are solvable intially
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:theNode}})
      .filter(e=>e.from.index>0)
      .size() == 0;})
  .commit();

  graph
  .reduceNodes({type: 'Interaction',content: {type: 'InteractionSimple'},referentialTransparencySolved: false,referentialTransparencySolvable:true},
  (theResult,theNode)=>{
    // console.log("========------------------------------------===");
    // console.log(theNode.id+ " "+theNode.content.operator);
    // console.log("==+++++++++++++++++++++===");
    let theChildrenEdges =
    graph
    .matchUndirectedEdges({type:'InteractionOperand',from:{node:theNode}})
    .filter(e=>e.from.index>0) // Only children, not the parent which has index 0
    .value();

    // Find the definition this interaction is part of
    let parentDef =
    graph
    .findDirectedEdge({type:'DefinitionSubInteraction',to:{node:theNode}})
    .from.node;

    let similarNodes =
    graph
    .matchNodes({type:'Interaction',content:{operator:theNode.content.operator}}) // Same operator
    .reject(n=> // Within the same definition
      _.isUndefined(
        graph
        .findDirectedEdge({type:'DefinitionSubInteraction',from:{node:parentDef},to:{node:n}})))
    .filter(n=> // All chidren of similarNode are children of theNode
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
      .filter(e=>e.from.index>0) // We check for similarity of children only, not parents !
      .every(e=>
        _(theChildrenEdges)
        .filter({from:{index:e.from.index},to:{index:e.to.index,node:e.to.node}})
        .size()===1))
    .filter(n=> // All children of theNode are children of the similarNode
      _(theChildrenEdges)
      .every(ce=>
        graph
        .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
        .filter(e=>e.from.index>0)
        .filter({from:{index:ce.from.index},to:{index:ce.to.index,node:ce.to.node}})
        .size()===1))
    .value();


    // We create a node to merge all the nodes similar to theNode
    // TODO Merge nodes differently than tjust picking the first
    // for example put all syntactic locations of nodes to improve traceback
    let newNode =
    graph
    .addNode(theNode);

    // Attach the newNode to the definition theNode is in
    graph
    .matchDirectedEdges({type:'DefinitionInteraction',to:{node:theNode}})
    .forEach(e=>
      graph
      .addEdge({type:'DefinitionInteraction',from:e.from,to:{node:newNode}}))
    .commit();

    // Attach the newNode to the definition theNode is in
    graph
    .matchDirectedEdges({type:'DefinitionSubInteraction',to:{node:theNode}})
    .forEach(e=>
      graph
      .addEdge({type:'DefinitionSubInteraction',from:e.from,to:{node:newNode}}))
    .commit();


    // Attach newNode to children of theNode
    _(theChildrenEdges)
    .forEach(ce=>{
      graph
      .addEdge({type:'InteractionOperand',from:{node:newNode,index:ce.from.index,ports:ce.from.ports},to:ce.to});})
    .commit();

    newNode.referentialTransparencySolved = true;
    newNode.referentialTransparencySolvable = false;

    // We link them together
    _(similarNodes)
    .forEach(similarNode=>{
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:similarNode,index:0}})
      .forEach(edgeFromSimilarNode=>{
        // console.log()
        graph
        .addEdge({type:'InteractionOperand',from:{node:newNode,index:edgeFromSimilarNode.from.index,ports:edgeFromSimilarNode.from.ports},to:edgeFromSimilarNode.to});})
      .commit();
      graph
      .finish(similarNode);})
    .commit();

      // We find new potential solvable nodes
    graph
    .matchNodes({type: 'Interaction',content: {type: 'InteractionSimple'},referentialTransparencySolved: false,referentialTransparencySolvable:false})
    .filter(n=>{
      return graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
      .filter(x=>(x.from.index>0))
      // .tap(x=>{console.log("xxxx");console.log(_.map(x,y=>(y.from.index+ " " +y.to.node.id +" "+y.to.node.content.operator+ " "+y.to.node.referentialTransparencySolved)))})
      .every(x=>{return x.to.node.referentialTransparencySolved ===true;});})
    .forEach(n=>{n.referentialTransparencySolvable=true;})
    .commit();

  });
}
