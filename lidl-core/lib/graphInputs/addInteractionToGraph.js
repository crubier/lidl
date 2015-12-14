"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



addInteractionToGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addInteractionToGraph(graph, interaction, definitionNode) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode = 
      graph.
      addNode({ 
        type: 'Interaction', 
        content: interaction, 
        ports: [] });


      graph.
      addEdge({ 
        type: 'DefinitionSubInteraction', 
        from: { 
          node: definitionNode }, 

        to: { 
          node: rootNode } });



      (0, _lodash2.default)(interaction.operand).
      map(function (operand) {return addInteractionToGraph(graph, operand, definitionNode);}).
      forEach(function (x, index) {
        graph.
        addEdge({ 
          type: 'InteractionOperand', 
          content: interaction, 
          from: { 
            node: rootNode, 
            index: index + 1 }, 

          to: { 
            node: x, 
            index: 0 } });}).



      commit();

      break;
    case 'InteractionNative':
      rootNode = graph.addNode({ 
        type: 'Interaction', 
        content: interaction, 
        ports: [] });

      graph.
      addEdge({ 
        type: 'DefinitionSubInteraction', 
        from: { 
          node: definitionNode }, 

        to: { 
          node: rootNode } });


      break;
    default:
      throw new Error('Trying to transform into a graph an invalid interaction of type ' + interaction.type);}


  return rootNode;}