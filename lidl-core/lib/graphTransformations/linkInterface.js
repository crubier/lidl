"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



linkInterface;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function linkInterface(graph, rootDefNode) {

  graph.
  matchDirectedEdges({ type: 'DefinitionInterface', from: { node: rootDefNode } }).
  forEach(function (edge) {

    // First, lets find the 4 nodes of the chain (rootDefNode is in this chain too)
    var mainInteractionInstanceNode =
    graph.
    findDirectedEdge({ type: 'DefinitionInteractionInstance', from: { node: rootDefNode } }).
    to.node;

    var interfaceNode =
    edge.to.node;

    var interfaceInteractionInstanceNode =
    graph.
    findDirectedEdge({ type: 'InterfaceInteractionInstance', from: { node: interfaceNode } }).
    to.node;


    graph.
    addEdge({ type: 'InteractionInstanceOperand', from: { node: mainInteractionInstanceNode, index: 0 }, to: { node: interfaceInteractionInstanceNode, index: 0 } });

  }).
  commit();


}