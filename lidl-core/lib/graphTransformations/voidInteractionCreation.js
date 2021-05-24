"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =





voidInteractionCreation;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Here we create nodes for interactions that are empty
function voidInteractionCreation(graph) {
  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: "Void" } },
  function (theResut, theNode) {
    var newNode = graph.
    addNode({ type: 'InteractionInstance', content: { 'type': 'InteractionNative', 'content': '/*Nothing, there was a void interaction*/\n' }, ports: [], isVoid: true });
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', to: { node: theNode, index: 0 } }).
    forEach(function (x) {return graph.
      addEdge({ type: 'InteractionInstanceOperand', from: x, to: { node: newNode, index: x.to.index } });}).
    commit();
    graph.
    finish(theNode);

  });
}