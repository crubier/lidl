"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =

clearSubInformation;function clearSubInformation(graph) {
  graph.
  matchDirectedEdges({ type: 'DefinitionSubInterface' }).
  forEach(function (x) {
    graph.
    finish(x);}).
  commit();

  graph.
  matchDirectedEdges({ type: 'DefinitionSubInteractionInstance' }).
  forEach(function (x) {
    graph.
    finish(x);}).
  commit();
}