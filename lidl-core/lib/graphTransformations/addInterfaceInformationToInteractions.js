"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





addInterfaceInformationToInteractions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interactions = require('../interactions.js');var _interactions2 = _interopRequireDefault(_interactions);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //This transformation adds information about the interfaces of each interaction node, by infering from the definitions
function addInterfaceInformationToInteractions(graph) {addInterfaceInformationToArguments(graph);
  addInterfaceInformationToMainInteractions(graph);}


function addInterfaceInformationToArguments(graph) {
  graph.
  matchNodes({ type: 'Interaction', isArgument: true }).
  forEach(function (theNode) {
    // Find the InteractionSignatureOperandElement node this interaction agument node is associated with
    var theArgumentNode = graph.
    findDirectedEdge({ type: 'InteractionDefinition', from: { node: theNode } }).
    to.node;

    // Find the Interface node this InteractionSignatureOperandElement node is associated with
    var theArgumentInterfaceNode = graph.
    findDirectedEdge({ type: 'InteractionSignatureOperandElementInterface', from: { node: theArgumentNode } }).
    to.node;

    // Add the appropriate interaction to the interaction node on ports 0
    theNode.ports = [theArgumentInterfaceNode.content];}).

  commit();}



function addInterfaceInformationToMainInteractions(graph) {
  graph.
  matchNodes({ type: 'Definition' }).
  forEach(function (theNode) {
    // Find the interface of this definition
    var theInterfaceNode = graph.
    findDirectedEdge({ type: 'DefinitionInterface', from: { node: theNode } }).
    to.node;

    // Find the main interaction of this definition
    var theMainInteractionNode = graph.
    findDirectedEdge({ type: 'DefinitionInteraction', from: { node: theNode } }).
    to.node;

    // The main interaction has the same interface as the definition
    theMainInteractionNode.ports = [theInterfaceNode.content];}).

  commit();}