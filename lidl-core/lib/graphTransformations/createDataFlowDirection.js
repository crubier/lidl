"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =








createDataFlowDirection;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interfaces = require('../interfaces');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function createDataFlowDirection(graph) {





  // First we infer type of ports on edges from types of ports of nodes they lead to
  graph.
  matchUndirectedEdges({
    type: 'InteractionInstanceOperand' }).

  forEach(function (theEdge) {
    // if(theEdge.from.node.console.log(theEdge.from.node.content.operator);
    // console.log(theEdge.from.node.content.operator);
    // console.log(theEdge.from.node.ports);
    // console.log(theEdge.from.index);
    // if (_.isUndefined(theEdge.from.node.ports)) console.log('UUUUU' + theEdge.from.node.content.operator);
    var portOnOrigin =
    _lodash2.default.cloneDeep(theEdge.from.node.ports[theEdge.from.index]);
    var portOnDestination =
    _lodash2.default.cloneDeep(theEdge.to.node.ports[theEdge.to.index]);
    // Here we infer that ports on one end are conjugated with ports on other end
    // console.log("EDGE0 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    try {
      theEdge.from.ports = (0, _interfaces.mergeInterface)(portOnOrigin, (0, _interfaces.conjugateInterface)(portOnDestination));
      // console.log("EDGE1 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    } catch (e) {
      // console.log("X EDGE1 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    }
    try {
      theEdge.to.ports = (0, _interfaces.mergeInterface)(portOnDestination, (0, _interfaces.conjugateInterface)(portOnOrigin));
      // console.log("EDGE2 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    } catch (e) {

    } // console.log("X EDGE2 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    // console.log("EDGE3 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    if (!(0, _interfaces.isCompatible)(theEdge.from.ports, theEdge.to.ports)) {
      // Useless edge, we delete it
      // Maybe we should instead throw an errorin some cases
      // Sometimes this is normal behaviour though...
      // console.log("removing edge");
      // if(theEdge.createdByEliminatingIdentifier) {
      // console.log("ok");
      // graph.finish(theEdge);
      // } else {
      throw new Error('Incompatible interfaces on ' + theEdge.id);
      // }
    }
    // if (madeOnlyOf(theEdge.from.ports)=== "in" && madeOnlyOf(theEdge.to.ports)=== "in") {
    //   // console.log("in to in situation on edge " +theEdge.id );
    //   graph.finish(theEdge);
    // }
    // if (madeOnlyOf(theEdge.from.ports)=== "out" && madeOnlyOf(theEdge.to.ports)=== "out") {
    //   // console.log("out to out situation on edge " +theEdge.id + " from "+ theEdge.from.node.id+" to "+theEdge.to.node.id );
    //   graph.finish(theEdge);
    // }
  }).
  commit();





  // Then we infer types of ports on Nodes from types of ports on edges that lead to them
  graph.
  matchNodes({
    type: 'InteractionInstance' }).

  forEach(function (theNode) {

    // console.log("NODE0 "+theNode.id +" "+ JSON.stringify(theNode.ports));
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode } }).
    forEach(function (theEdge) {
      // try{
      theNode.ports[theEdge.from.index] = (0, _interfaces.mergeInterface)(theNode.ports[theEdge.from.index], theEdge.from.ports);
      // }catch(e){console.log("X NODE1 " +theNode.id + " " +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.from.index]) + " "+JSON.stringify(theEdge.from.ports));}
    }).
    filter({ type: 'InteractionInstanceOperand', to: { node: theNode } }).
    forEach(function (theEdge) {
      // try{
      theNode.ports[theEdge.to.index] = (0, _interfaces.mergeInterface)(theNode.ports[theEdge.to.index], theEdge.to.ports);
      // }catch(e){console.log("X NODE2 " +theNode.id + " "  +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.to.index]) + " "+JSON.stringify(theEdge.to.ports));}
    }).
    commit();


  }).
  commit();

}