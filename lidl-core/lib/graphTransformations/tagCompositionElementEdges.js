"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



tagCompositionElementEdges;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function tagCompositionElementEdges(graph) {

  graph.
  matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: { type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Composition' } } } }).
  forEach(function (theEdge) {
    if (theEdge.from.index > 0) 
    theEdge.from.compositionElementName = 
    (0, _lodash2.default)(theEdge.from.node.content.operator).
    words(/[^,:\{\}\$]+/g)[theEdge.from.index - 1];}).

  filter({ to: { node: { type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Composition' } } } }).
  forEach(function (theEdge) {
    if (theEdge.to.index > 0) 
    theEdge.to.compositionElementName = 
    (0, _lodash2.default)(theEdge.to.node.content.operator).
    words(/[^,:\{\}\$]+/g)[theEdge.to.index - 1];}).

  commit();}