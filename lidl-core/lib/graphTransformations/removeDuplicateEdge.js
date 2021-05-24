"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =




removeDuplicateEdge;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //TODO Why do we even have to do that ? Investigate
function removeDuplicateEdge(graph) {
  graph.
  matchUndirectedEdges({ type: 'InteractionInstanceOperand' }).
  forEach(function (edge) {edge.maybeDuplicate = true;}).
  commit();

  graph.
  reduceUndirectedEdges({ type: 'InteractionInstanceOperand', maybeDuplicate: true },
  function (theResult, theEdge) {
    var identicalEdges =
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', maybeDuplicate: true, from: { node: theEdge.from.node, index: theEdge.from.index }, to: { node: theEdge.to.node, index: theEdge.to.index } }).
    value();

    (0, _lodash2.default)(identicalEdges).
    rest().
    forEach(function (identicalEdge) {
      graph.
      finish(identicalEdge);}).
    commit();

    theEdge.maybeDuplicate = false;});
}