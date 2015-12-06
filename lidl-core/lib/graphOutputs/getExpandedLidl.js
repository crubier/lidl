"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




getExpandedLidl;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // This function should be called with a graph just after the instantiateInterfaceStage
function getExpandedLidl(graph) {
  var defNode = 
  graph.
  findNode({ type: 'Definition' });

  var rootNode = 
  graph.
  findDirectedEdge({ type: 'DefinitionInteractionInstance', from: { node: defNode } }).
  to.node;

  return { source: getLidl(graph, rootNode) };}



function getLidl(graph, node) {

  var operand = 
  graph.
  matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: node } }).
  filter(function (e) {return e.to.index === 0 && e.from.index > 0;}).
  sortBy(function (e) {return e.from.index;}).
  pluck('to.node').
  map(function (n) {return getLidl(graph, n);}).
  value();

  var operator = 
  node.
  content.
  formating.
  split('$');

  return '(' + 
  _lodash2.default.range(2 * operator.length - 1).
  map(function (x) {return x % 2 === 0 ? operator[x / 2] : operand[(x - 1) / 2];}).
  join('') + ')';}