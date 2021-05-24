"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



keepOnlyInteractions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function keepOnlyInteractions(graph) {
  graph.
  matchNodes().
  reject({ type: 'InteractionInstance' }).
  forEach(function (n) {
    graph.
    finish(n);}).
  commit();
}