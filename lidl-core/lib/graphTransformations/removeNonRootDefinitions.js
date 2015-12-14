"use strict";

// This transformation removes all definitions from a graph exepted one: the selected rootNode
Object.defineProperty(exports, "__esModule", { value: true });exports.default = 
removeNonRootDefinition;function removeNonRootDefinition(graph, rootNode) {
  graph.
  matchNodes({ type: 'InteractionDefinition' }).
  reject(function (x) {return x === rootNode;}).
  forEach(function (x) {

    graph.
    matchDirectedEdges({ type: 'DefinitionSubInteractionInstance', from: { node: x } }).
    forEach(function (e) {
      graph.
      finish(e.to.node);}).
    commit();

    graph.
    matchDirectedEdges({ type: 'DefinitionSubInterface', from: { node: x } }).
    forEach(function (e) {
      graph.
      finish(e.to.node);}).
    commit();

    graph.
    matchDirectedEdges({ type: 'SignatureOperand', from: { node: x } }).
    forEach(function (e) {
      graph.
      finish(e.to.node);}).
    commit();

    // Finally we remove the definition node
    graph.
    finish(x);}).

  commit();}