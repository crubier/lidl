"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








createDataFlowDirection;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _ports = require('../ports');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function createDataFlowDirection(graph) {





  // First we infer type of ports on edges from types of ports of nodes they lead to
  graph.
  matchUndirectedEdges({ 
    type: 'InteractionInstanceOperand' }).

  forEach(function (theEdge) {
    // console.log(theEdge.from.node.content.operator);
    // console.log(theEdge.from.node.ports);
    // console.log(theEdge.from.index);
    if (_lodash2.default.isUndefined(theEdge.from.node.ports)) console.log('UUUUU' + theEdge.from.node.content.operator);
    var portOnOrigin = 
    _lodash2.default.cloneDeep(theEdge.from.node.ports[theEdge.from.index]);
    var portOnDestination = 
    _lodash2.default.cloneDeep(theEdge.to.node.ports[theEdge.to.index]);
    // Here we infer that port on one end are conjugated with ports on other end
    // console.log("EDGE0 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    try {
      theEdge.from.ports = (0, _ports.mergePortList)(portOnOrigin, (0, _ports.conjugatePort)(portOnDestination));
      // console.log("EDGE1 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    } catch (e) {
      // console.log("X EDGE1 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    }
    try {
      theEdge.to.ports = (0, _ports.mergePortList)(portOnDestination, (0, _ports.conjugatePort)(portOnOrigin));
      // console.log("EDGE2 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    } catch (e) {
      // console.log("X EDGE2 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    }
    if ((0, _ports.portIsOnlyMadeOf)(theEdge.from.ports, "in") && (0, _ports.portIsOnlyMadeOf)(theEdge.to.ports, "in")) {
      // console.log("in to in situation on edge " +theEdge.id );
      graph.finish(theEdge);}

    if ((0, _ports.portIsOnlyMadeOf)(theEdge.from.ports, "out") && (0, _ports.portIsOnlyMadeOf)(theEdge.to.ports, "out")) {
      // console.log("out to out situation on edge " +theEdge.id + " from "+ theEdge.from.node.id+" to "+theEdge.to.node.id );
      graph.finish(theEdge);}}).


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
      theNode.ports[theEdge.from.index] = (0, _ports.mergePortList)(theNode.ports[theEdge.from.index], theEdge.from.ports);
      // }catch(e){console.log("X NODE1 " +theNode.id + " " +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.from.index]) + " "+JSON.stringify(theEdge.from.ports));}
    }).
    filter({ type: 'InteractionInstanceOperand', to: { node: theNode } }).
    forEach(function (theEdge) {
      // try{
      theNode.ports[theEdge.to.index] = (0, _ports.mergePortList)(theNode.ports[theEdge.to.index], theEdge.to.ports);
      // }catch(e){console.log("X NODE2 " +theNode.id + " "  +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.to.index]) + " "+JSON.stringify(theEdge.to.ports));}
    }).
    commit();}).



  commit();}