"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




previousNextLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function previousNextLinking(graph) {
  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Previous' } }, 
  function (theResult, theNode) {
    var stateId = _lodash2.default.uniqueId('state_');

    // Add a first node to get from state variable
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', containsAState: true, stateVariableName: stateId, content: { 'type': 'InteractionNative', 'content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\n}\n" }, ports: ["in", "out"] });
    // Add edge to first ports
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    // Add edge to second ports
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 1 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 1 }, to: x.to }));}).
    commit();


    // Add a second node to set state variable
    var source2 = 
    graph.
    addNode({ type: 'InteractionInstance', containsAState: true, stateVariableName: stateId, content: { 'type': 'InteractionNative', 'content': "if(<%=a0%> === active) {\nnextState['" + stateId + "'] = <%=a1%>;\n}\n" }, ports: ["in", "in"] });
    // Add edge to first ports
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source2, index: 0 }, to: x.to }));}).
    commit();
    // Add edge to second ports
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 2 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source2, index: 1 }, to: x.to }));}).
    commit();


    graph.
    finish(theNode);});}