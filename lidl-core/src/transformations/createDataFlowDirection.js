"use strict"

import _ from 'lodash'

import {mergePortList,portIsOnlyMadeOf,conjugatePort,portIsDefined} from '../ports'

export default function createDataFlowDirection(graph) {

// First we infer type of ports on edges from types of ports of nodes they lead to
  graph
  .matchUndirectedEdges({type:'InteractionInstanceOperand'})
  .forEach((theEdge)=>{
    if(_.isUndefined(theEdge.from.node.ports))console.log('UUUUU'+theEdge.from.node.content.operator);
    let portOnOrigin =
    _.cloneDeep(theEdge.from.node.ports[theEdge.from.index]);
    let portOnDestination =
    _.cloneDeep(theEdge.to.node.ports[theEdge.to.index]);
// Here we infer that port on one end are conjugated with ports on other end
// console.log("EDGE0 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    try{
theEdge.from.ports = mergePortList(portOnOrigin,conjugatePort(portOnDestination));
// console.log("EDGE1 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}catch(e){
// console.log("X EDGE1 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}
try{
    theEdge.to.ports = mergePortList(portOnDestination,conjugatePort(portOnOrigin));
// console.log("EDGE2 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}catch(e){
// console.log("X EDGE2 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}
  if(portIsOnlyMadeOf(theEdge.from.ports,"in") && portIsOnlyMadeOf(theEdge.to.ports,"in")){
    // console.log("in to in situation on edge " +theEdge.id );
    graph.finish(theEdge);
  }
  if(portIsOnlyMadeOf(theEdge.from.ports,"out") && portIsOnlyMadeOf(theEdge.to.ports,"out")){
      // console.log("out to out situation on edge " +theEdge.id + " from "+ theEdge.from.node.id+" to "+theEdge.to.node.id );
      graph.finish(theEdge);
    }
})
  .commit();

// Then we infer types of ports on Nodes from types of ports on edges that lead to them
  graph
  .matchNodes({type:'InteractionInstance'})
  .forEach((theNode)=>{

// console.log("NODE0 "+theNode.id +" "+ JSON.stringify(theNode.ports));
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode}})
    .forEach((theEdge)=>{
// try{
      theNode.ports[theEdge.from.index] = mergePortList(theNode.ports[theEdge.from.index], theEdge.from.ports);
// }catch(e){console.log("X NODE1 " +theNode.id + " " +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.from.index]) + " "+JSON.stringify(theEdge.from.ports));}
})
    .filter({type:'InteractionInstanceOperand',to:{node:theNode}})
    .forEach((theEdge)=>{
// try{
      theNode.ports[theEdge.to.index] = mergePortList(theNode.ports[theEdge.to.index], theEdge.to.ports);
// }catch(e){console.log("X NODE2 " +theNode.id + " "  +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.to.index]) + " "+JSON.stringify(theEdge.to.ports));}
})
    .commit();


})
  .commit();

}
