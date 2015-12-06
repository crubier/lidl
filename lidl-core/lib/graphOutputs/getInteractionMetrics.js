"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




getInteractionMetrics;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // This function should be called with a graph just after the instantiateInterfaceStage
function getInteractionMetrics(graph) {
  return { metrics: 
    { 
      numberOfIdentifiers: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Identifier' } }).size(), 
      numberOfComposition: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Composition' } }).size(), 
      numberOfBehaviour: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Behaviour' } }).size(), 
      numberOfAffectation: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Affectation' } }).size(), 
      numberOfPrevious: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Previous' } }).size(), 
      numberOfFunctionApplication: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'FunctionApplication' } }).size(), 
      numberOfFunction: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'FunctionLiteral' } }).size(), 
      numberOfActivation: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Activation' } }).size(), 
      numberOfBoolean: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Boolean' } }).size(), 
      numberOfNumber: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Number' } }).size(), 
      numberOfText: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Text' } }).size(), 
      numberOfVoid: graph.matchNodes({ type: 'InteractionInstance', content: { operatorType: 'Void' } }).size(), 
      totalInteractions: graph.matchNodes({ type: 'InteractionInstance' }).size() } };}







//
// function nbrOfPrevious(interaction) {
//   var total = 0;
//   _.forEach(interaction.operand, function(x) {
//     total += nbrOfPrevious(x);
//   });
//
//   if (lidl.operator.parse(interaction.operator) === "Previous") {
//     total++;
//   }
//   return total;
// }
//
// function nbrOfIdentifiers(interaction) {
//   function listOfIdentifiers(a) {
//     var list = [];
//     _.forEach(a.operand, function(x) {
//       list.push(listOfIdentifiers(x));
//     });
//     if (lidl.operator.parse(a.operator) === "Identifier") {
//       list.push(a.operator);
//     }
//     return list;
//   }
//   return _.uniq(_.flattenDeep(listOfIdentifiers(interaction))).length;
// }
//
// function nbrOfFunctions(interaction) {
//   var total = 0;
//   _.forEach(interaction.operand, function(x) {
//     total += nbrOfFunctions(x);
//   });
//   if (lidl.operator.parse(interaction.operator) === "Function") {
//     total++;
//   }
//   return total;
// }
//
// function nbrOfCompositions(interaction) {
//   var total = 0;
//   _.forEach(interaction.operand, function(x) {
//     total += nbrOfCompositions(x);
//   });
//   if (lidl.operator.parse(interaction.operator) === "Composition") {
//     total++;
//   }
//   return total;
// }