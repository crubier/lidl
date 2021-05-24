"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =








addDefinitionToGraph;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _addInteractionDefinitionToGraph = require('./addInteractionDefinitionToGraph');var _addInteractionDefinitionToGraph2 = _interopRequireDefault(_addInteractionDefinitionToGraph);var _addInterfaceDefinitionToGraph = require('./addInterfaceDefinitionToGraph');var _addInterfaceDefinitionToGraph2 = _interopRequireDefault(_addInterfaceDefinitionToGraph);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addDefinitionToGraph(graph, definition) {

  if (definition.type === 'InteractionDefinition') {
    return (0, _addInteractionDefinitionToGraph2.default)(graph, definition);
  } else if (definition.type === 'InterfaceDefinition') {
    return (0, _addInterfaceDefinitionToGraph2.default)(graph, definition);
  }
}