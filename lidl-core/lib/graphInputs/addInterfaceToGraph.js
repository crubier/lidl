"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =




addInterfaceToGraph;var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addInterfaceToGraph(graph, interfac, prefix, definitionNode) {
  var rootNode;

  switch (interfac.type) {
    case "InterfaceAtomic":

      rootNode =
      graph.
      addNode({
        type: 'Interface',
        name: prefix,
        content: interfac });


      break;
    case "InterfaceComposite":
      rootNode =
      graph.
      addNode({
        type: 'Interface',
        name: prefix,
        content: interfac });


      var nodeOfElement =
      (0, _lodash2.default)(interfac.element).
      map(function (x) {return addInterfaceToGraph(graph, x.value, prefix + "." + x.key, definitionNode);}).
      value();

      (0, _lodash2.default)(nodeOfElement).
      forEach(function (x, index) {return (
          graph.
          addEdge({
            type: 'InterfaceElement',
            from: {
              node: rootNode,
              index: index + 1 },

            to: {
              node: x,
              index: 0 } }));}).


      commit();
      break;
    case "InterfaceNamed":
      rootNode =
      graph.
      addNode({
        type: 'Interface',
        name: prefix,
        content: interfac });

      break;
    default:
      throw new Error("Cannot transform into a graph the interface of type " + interfac.type);}





  graph.
  addEdge({
    type: 'DefinitionSubInterface',
    from: {
      node: definitionNode },

    to: {
      node: rootNode } });


  return rootNode;
}