"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






orderGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _ports = require('../ports');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Use tarjan algorithm to order the graph
function orderGraph(graph) {
  var orderingList = [];

  graph.
  matchNodes({ type: 'InteractionInstance' }).
  forEach(function (x) {x.markedDuringGraphOrdering = false;}).
  commit();

  graph.
  reduceNodes({ markedDuringGraphOrdering: false }, 
  function (theResult, theNode) {
    visit(theNode, [theNode]);});


  function visit(n, stack) {

    if (n.temporarilyMarkedDuringGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("the interaction DAG contains cycles: " + (0, _lodash2.default)(stack).concat([n]).map('id').join(" -> "));} else 
    {
      if (n.markedDuringGraphOrdering !== true) {
        n.temporarilyMarkedDuringGraphOrdering = true;
        graph.
        matchNodes(function (m) {return (
            graph.
            matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: n }, to: { node: m } }).
            filter(function (edge) {return (0, _ports.portIsOnlyMadeOf)(edge.from.ports, 'out') && (0, _ports.portIsOnlyMadeOf)(edge.to.ports, 'in');}).
            size() > 0);}).
        forEach(function (m) {return visit(m, (0, _lodash2.default)(stack).concat([n]).value());}).
        forEach(function (m) {graph.addEdge({ type: 'InteractionInstanceDataDependency', from: { node: n }, to: { node: m } });}).
        commit();

        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);}}}





  // The list is now ordered ! (Hopefully)
  //  We write the order in the nodes
  //   _(orderingList)
  //   .forEach((node, ii) => {node.hasExecutionOrder=true;node.executionOrder = ii;})
  // .commit();

  (0, _lodash2.default)(orderingList).
  reduce(function (prev, current, index) {
    current.hasExecutionOrder = true;
    current.executionOrder = index;
    if (prev !== null) {
      // console.log(prev.id + "  "+current.id);
      graph.
      addEdge({ type: 'InteractionInstanceOrdering', executionOrder: index, from: { node: prev }, to: { node: current } });}

    return current;}, 
  null);




  // .forEach(function(node, ii) {console.log("iii "+ii);node.hasExecutionOrder=true;node.executionOrder = ii;})
  // .forEach((node, index) =>{console.log(node.executionOrder);})
  // .commit();
}