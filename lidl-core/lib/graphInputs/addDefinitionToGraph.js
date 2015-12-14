"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



addDefinitionToGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addDefinitionToGraph(graph, definition) {
  var rootNode = 
  graph.
  addNode({ type: 'InteractionDefinition', content: definition, instantiated: false });

  // Add sub defintions
  (0, _lodash2.default)(definition.definitions).
  map(function (subDefinition) {return addDefinitionToGraph(graph, subDefinition);}).
  forEach(function (subDefinitionNode, index) {
    graph.
    addEdge({ type: 'DefinitionDefinition', from: { node: rootNode, index: index + 1 }, to: { node: subDefinitionNode, index: 0 } });}).

  commit();

  // Add arguments
  (0, _lodash2.default)(definition.signature.operand).
  map(function (operand) {
    var operandNode = 
    graph.
    addNode({ type: 'InteractionSignatureOperandElement', content: operand });

    // console.log(operand.interfac);
    var operandInterfaceNode = 
    addInterfaceToGraph(graph, operand.interfac, 'theArgs.' + operand.name, rootNode);

    graph.
    addEdge({ type: 'InteractionSignatureOperandElementInterface', from: { node: operandNode }, to: { node: operandInterfaceNode } });
    return operandNode;}).

  forEach(function (operandNode, index) {
    graph.
    addEdge({ type: 'SignatureOperand', from: { node: rootNode, index: index + 1 }, to: { node: operandNode, index: 0 } });}).

  commit();


  // Add interface
  var interfaceNode = 
  addInterfaceToGraph(graph, definition.signature.interfac, 'theInterface', rootNode);

  graph.
  addEdge({ type: 'DefinitionInterface', from: { node: rootNode }, to: { node: interfaceNode } });


  // Add interaction
  graph.
  addEdge({ type: 'DefinitionInteraction', from: { node: rootNode }, to: { node: addInteractionToGraph(graph, definition.interaction, rootNode) } });

  return rootNode;}


function addInteractionToGraph(graph, interaction, definitionNode) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode = 
      graph.
      addNode({ type: 'Interaction', content: interaction, ports: [] });

      graph.
      addEdge({ type: 'DefinitionSubInteraction', from: { node: definitionNode }, to: { node: rootNode } });

      (0, _lodash2.default)(interaction.operand).
      map(function (operand) {return addInteractionToGraph(graph, operand, definitionNode);}).
      forEach(function (x, index) {
        graph.
        addEdge({ type: 'InteractionOperand', content: interaction, from: { node: rootNode, index: index + 1 }, to: { node: x, index: 0 } });}).

      commit();

      break;
    case 'InteractionNative':
      rootNode = graph.addNode({ type: 'Interaction', content: interaction, ports: [] });
      graph.
      addEdge({ type: 'DefinitionSubInteraction', from: { node: definitionNode }, to: { node: rootNode } });
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');}


  return rootNode;}



function addInterfaceToGraph(graph, interfac, prefix, definitionNode) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":

      rootNode = 
      graph.
      addNode({ type: 'Interface', name: prefix, content: interfac });

      break;
    case "InterfaceComposite":
      rootNode = 
      graph.
      addNode({ type: 'Interface', name: prefix, content: interfac });

      var nodeOfElement = 
      (0, _lodash2.default)(interfac.element).
      map(function (x) {return addInterfaceToGraph(graph, x.value, prefix + "." + x.key, definitionNode);}).
      value();



      (0, _lodash2.default)(nodeOfElement).
      forEach(function (x, index) {return (
          graph.
          addEdge({ type: 'InterfaceElement', from: { node: rootNode, index: index + 1 }, to: { node: x, index: 0 } }));}).
      commit();
      break;
    default:
      throw new Error("Cant transform this interface to a graph. Is it an interface really ?");}


  graph.
  addEdge({ type: 'DefinitionSubInterface', from: { node: definitionNode }, to: { node: rootNode } });
  return rootNode;}