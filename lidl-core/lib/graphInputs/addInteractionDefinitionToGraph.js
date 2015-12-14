"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 







addInteractionDefinitionToGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _addInterfaceToGraph = require('./addInterfaceToGraph');var _addInterfaceToGraph2 = _interopRequireDefault(_addInterfaceToGraph);var _addInteractionToGraph = require('./addInteractionToGraph');var _addInteractionToGraph2 = _interopRequireDefault(_addInteractionToGraph);var _addDefinitionToGraph = require('./addDefinitionToGraph');var _addDefinitionToGraph2 = _interopRequireDefault(_addDefinitionToGraph);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addInteractionDefinitionToGraph(graph, definition) {
  var rootNode = 
  graph.
  addNode({ 
    type: 'InteractionDefinition', 
    content: definition, 
    instantiated: false });


  // Add sub defintions
  (0, _lodash2.default)(definition.definitions).
  map(function (subDefinition) {return (0, _addDefinitionToGraph2.default)(graph, subDefinition);}).
  forEach(function (subDefinitionNode, index) {
    graph.
    addEdge({ 
      type: 'DefinitionDefinition', 
      from: { 
        node: rootNode, 
        index: index + 1 }, 

      to: { 
        node: subDefinitionNode, 
        index: 0 } });}).



  commit();

  // Add arguments
  (0, _lodash2.default)(definition.signature.operand).
  map(function (operand) {
    var operandNode = 
    graph.
    addNode({ 
      type: 'InteractionSignatureOperandElement', 
      content: operand });


    // console.log(operand.interfac);
    var operandInterfaceNode = 
    (0, _addInterfaceToGraph2.default)(graph, operand.interfac, 'theArgs.' + operand.name, rootNode);

    graph.
    addEdge({ 
      type: 'InteractionSignatureOperandElementInterface', 
      from: { 
        node: operandNode }, 

      to: { 
        node: operandInterfaceNode } });


    return operandNode;}).

  forEach(function (operandNode, index) {
    graph.
    addEdge({ 
      type: 'SignatureOperand', 
      from: { 
        node: rootNode, 
        index: index + 1 }, 

      to: { 
        node: operandNode, 
        index: 0 } });}).



  commit();

  // Add interface
  var interfaceNode = 
  (0, _addInterfaceToGraph2.default)(graph, definition.signature.interfac, 'theInterface', rootNode);

  graph.
  addEdge({ 
    type: 'DefinitionInterface', 
    from: { 
      node: rootNode }, 

    to: { 
      node: interfaceNode } });




  // Add interaction
  graph.
  addEdge({ 
    type: 'DefinitionInteraction', 
    from: { 
      node: rootNode }, 

    to: { 
      node: (0, _addInteractionToGraph2.default)(graph, definition.interaction, rootNode) } });



  return rootNode;}