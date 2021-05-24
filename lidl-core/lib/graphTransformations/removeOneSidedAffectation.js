
"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



removeOneSidedAffectation;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function removeOneSidedAffectation(graph) {
  var didMatch = true;
  do {
    didMatch = !graph.
    matchNodes({ type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Affectation' } }).
    filter(function (theNode) {return (
        graph.
        matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 1 } }).
        isEmpty() ||

        graph.
        matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 2 } }).
        isEmpty());}).
    forEach(function (theNode) {return graph.finish(theNode);}).
    isEmpty();
  } while (didMatch);
}