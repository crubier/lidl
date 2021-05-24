"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



keepOnlyOrdering;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function keepOnlyOrdering(graph) {
  graph.
  matchUndirectedEdges().
  reject({ type: 'InteractionInstanceOrdering' }).
  forEach(function (e) {
    graph.
    finish(e);}).
  commit();
}