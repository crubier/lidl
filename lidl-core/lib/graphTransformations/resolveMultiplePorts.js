"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








resolveMultiplePorts;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _createDataFlowDirection = require('./createDataFlowDirection');var _createDataFlowDirection2 = _interopRequireDefault(_createDataFlowDirection);var _ports = require('../ports');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Here we solve the cases where several signals come or go from the same node with the same port number.
function resolveMultiplePorts(graph) {
  graph.
  matchUndirectedEdges({ type: 'InteractionInstanceOperand' }).
  forEach(function (theEdge) {theEdge.from.multiResolved = false;theEdge.to.multiResolved = false;}).
  commit();


  // Resolve multiple output
  graph.
  reduceUndirectedEdges({ type: 'InteractionInstanceOperand', from: { multiResolved: false } }, 
  function (theResult, theEdge) {
    var direct = (0, _ports.portIsOnlyMadeOf)(theEdge.from.ports, 'out');
    var indirect = (0, _ports.portIsOnlyMadeOf)(theEdge.to.ports, 'out');
    if (direct === indirect) {
      // console.log('Useless edge '+theEdge.id);
      graph.finish(theEdge);
      return;}
    ;
    var theRightEdge = direct ? _lodash2.default.clone(theEdge) : graph.inverse(theEdge);

    // Now we have theRightEdge, with data that goes from its "from" to its "to"
    // theRightEdge is in the direction fo the data flow
    // Resolve multiple output on this edge origin
    var similarOutputEdges = 
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theRightEdge.from.node, index: theRightEdge.from.index } }).
    forEach(function (theOtherEdge) {
      theEdge.from.multiResolved = true;}).

    value();
    if ((0, _lodash2.default)(similarOutputEdges).size() > 1) {(function () {
        // We have a multiple output condition
        var code = "";
        var ports = ["in"];
        (0, _lodash2.default)(similarOutputEdges).
        forEach(function (similarEdge, index) {
          code = code + "<%=a" + (index + 1) + "%> = <%=a0%>;\n";
          ports.push("out");}).

        commit();

        var newNode = 
        graph.
        addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: code }, ports: ports });

        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { multiResolved: true, node: theRightEdge.from.node, index: theRightEdge.from.index }, to: { multiResolved: true, node: newNode, index: 0 } });

        (0, _lodash2.default)(similarOutputEdges).
        forEach(function (similarEdge, index) {
          graph.
          addEdge({ type: 'InteractionInstanceOperand', from: { multiResolved: true, node: newNode, index: index + 1 }, to: similarEdge.to });
          // TODO I Should be able to do that
          // graph.finish(similarEdge);
          // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
          graph.finish(graph.findDirectedEdge({ id: similarEdge.id }));}).

        commit();})();} else 
    if ((0, _lodash2.default)(similarOutputEdges).size() < 1) {
      throw new Error('what ? that should be impossible');}


    // Resolve multiple input on this edge destination
    var similarInputEdges = 
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', to: { node: theRightEdge.to.node, index: theRightEdge.to.index } }).
    forEach(function (theOtherEdge) {
      //TODO SCANDAL REMOVE THE NEXT LINE
      theEdge.from.multiResolved = true;

      theEdge.to.multiResolved = true;}).
    value();
    if ((0, _lodash2.default)(similarInputEdges).size() > 1) {(function () {
        // We have a multiple input condition
        var code = "<%=a0%>=null;\n";
        var ports = ["out"];
        (0, _lodash2.default)(similarInputEdges).
        forEach(function (similarEdge, index) {
          code = code + "if(<%=a0%>===null ){\n  <%=a0%> = <%=a" + (index + 1) + "%>;\n} else if (<%=a" + (index + 1) + "%> !== null){\n  throw ('error:multiple active assignments to the same signal <%=a0%> : '+<%=a0%> + ' and ' + <%=a" + (index + 1) + "%>);\n}";
          ports.push("in");}).

        commit();

        var newNode = 
        graph.
        addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: code }, ports: ports });

        graph.
        addEdge({ type: 'InteractionInstanceOperand', to: { multiResolved: true, node: theRightEdge.to.node, index: theRightEdge.to.index }, from: { multiResolved: true, node: newNode, index: 0 } });

        (0, _lodash2.default)(similarInputEdges).
        forEach(function (similarEdge, index) {
          graph.
          addEdge({ type: 'InteractionInstanceOperand', to: { multiResolved: true, node: newNode, index: index + 1 }, from: similarEdge.from });
          // console.log("finishing edge "+similarEdge.id);
          // TODO I Should be able to do that
          // graph.finish(similarEdge);
          // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
          graph.finish(graph.findDirectedEdge({ id: similarEdge.id }));}).

        commit();})();} else 



    if ((0, _lodash2.default)(similarInputEdges).size() < 1) {
      throw new Error('what ? that should be impossible');}


    (0, _createDataFlowDirection2.default)(graph);});}