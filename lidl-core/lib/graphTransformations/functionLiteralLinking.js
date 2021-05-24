"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



functionLiteralLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function functionLiteralLinking(graph) {
  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'Function' } },
  function (theResult, theNode) {
    var funcName = theNode.content.operator.substring(8);
    var source =
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', 'content': '<%=a0%> = ' + funcName + ';\n' }, ports: theNode.ports }); //FIXME interface instead of ports
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: 0 } }).
    forEach(function (x) {return (
        graph.
        addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: 0 }, to: x.to }));}).
    commit();
    graph.
    finish(theNode);
  });

}