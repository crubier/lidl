"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



nonMatchingCompositionCompilation;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function nonMatchingCompositionCompilation(graph) {
  // Then we find composition nodes and reduce them
  graph.
  matchNodes({ type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Composition' } }).
  filter(function (x) {return x.ports[0] === 'out' || x.ports[0] === 'in';}).
  forEach(function (theNode) {

    var isCompo = theNode.ports[0] === 'out';

    // console.log("NODE ! "+theNode.id +" "+ JSON.stringify(theNode.ports));

    var code = isCompo ? "<%=a0%> = {};\n" : "";
    var ports = [isCompo ? 'out' : 'in'];

    var compositionElementNameWithTheirIndex = 
    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode } }).
    reject(function (theEdge) {return _lodash2.default.isUndefined(theEdge.from.compositionElementName);}).
    forEach(function (theEdge) {if (theEdge.to.node === theNode) {throw new Error('Error:Loop on a composition interaction ' + theNode.content.operator);}}).
    map(function (theEdge) {return { compositionElementName: theEdge.from.compositionElementName, index: theEdge.from.index };}).
    groupBy('index').
    map(function (theElement) {return (
        (0, _lodash2.default)(theElement).
        tap(function (x) {if (_lodash2.default.size(_lodash2.default.unique(x, function (y) {return y.compositionElementName;})) > 1) {throw new Error('Error: there are different edges with the same index but different compositionElementName');}}).
        unique(function (z) {return z.compositionElementName;}).
        first());}).
    value();

    // console.log("  "+JSON.stringify(compositionElementNameWithTheirIndex));

    (0, _lodash2.default)(compositionElementNameWithTheirIndex).
    forEach(function (el) {
      if (isCompo) {
        code = code.concat("<%=a0%>['" + el.compositionElementName + "'] = <%=a" + el.index + "%>;\n");
        ports[el.index] = 'in';} else 
      {
        code = code.concat("<%=a" + el.index + "%> = <%=a0%>['" + el.compositionElementName + "'];\n");
        ports[el.index] = 'out';}}).

    commit();

    // console.log("  "+code);
    // console.log("  "+JSON.stringify(ports));

    var newNode = graph.
    addNode({ type: 'InteractionInstance', content: { 
        'type': 'InteractionNative', 
        'content': code }, 
      ports: ports });

    graph.
    matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode } })
    // .reject(theEdge=>_.isUndefined(theEdge.from.compositionElementName))
    .forEach(function (theEdge) {
      graph.addEdge({ type: 'InteractionInstanceOperand', from: { node: newNode, index: theEdge.from.index }, to: theEdge.to });}).
    commit();

    graph.
    finish(theNode);}).

  commit();

  // Then we find decomposition nodes and reduce them

  //TODO loop
}