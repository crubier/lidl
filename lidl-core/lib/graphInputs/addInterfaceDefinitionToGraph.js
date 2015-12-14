"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 







addInterfaceDefinitionToGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _addInterfaceToGraph = require('./addInterfaceToGraph');var _addInterfaceToGraph2 = _interopRequireDefault(_addInterfaceToGraph);var _addDefinitionToGraph = require('./addDefinitionToGraph');var _addDefinitionToGraph2 = _interopRequireDefault(_addDefinitionToGraph);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addInterfaceDefinitionToGraph(graph, definition) {
  var rootNode = 
  graph.
  addNode({ 
    type: 'InterfaceDefinition', 
    content: definition, 
    instantiated: false });


  var interfacNode = (0, _addInterfaceToGraph2.default)(graph, definition.interfac, definition.signature, rootNode);

  graph.
  addEdge({ 
    type: 'DefinitionInterface', 
    from: { 
      node: rootNode }, 

    to: { 
      node: interfacNode } });



  return rootNode;}