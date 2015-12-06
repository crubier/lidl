"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




dataLiteralLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function dataLiteralLinking(graph) {
  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Activation' } }, 
  function (theResult, theNode) {
    var literal = theNode.content.operator;
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', 'content': '<%=a0%> = ' + literal + ';\n' }, ports: ["out"] });
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    graph.
    finish(theNode);});


  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Boolean' } }, 
  function (theResult, theNode) {
    var literal = theNode.content.operator;
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', 'content': '<%=a0%> = ' + literal + ';\n' }, ports: ["out"] });
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    graph.
    finish(theNode);});


  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Number' } }, 
  function (theResult, theNode) {
    var literal = theNode.content.operator;
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', 'content': '<%=a0%> = ' + literal + ';\n' }, ports: ["out"] });
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    graph.
    finish(theNode);});


  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Text' } }, 
  function (theResult, theNode) {
    var literal = theNode.content.operator;
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', 'content': '<%=a0%> = ' + literal + ';\n' }, ports: ["out"] });
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    graph.
    finish(theNode);});}