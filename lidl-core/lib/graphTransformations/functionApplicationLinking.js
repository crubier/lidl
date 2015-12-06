"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



functionApplicationLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function functionApplicationLinking(graph) {
  graph.
  reduceNodes({ type: 'InteractionInstance', content: { operatorType: 'FunctionApplication' } }, 
  function (theResult, theNode) {
    var source = 
    graph.
    addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: 'if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}\n' }, ports: ["in", "in", "in", "out"] });
    (0, _lodash2.default)(_lodash2.default.range(4)).
    forEach(function (i) {return (
        graph.
        matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: i } }).
        forEach(function (x) {return (
            graph.
            addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: i }, to: x.to }));}).
        commit());}).
    commit();
    graph.
    finish(theNode);});}