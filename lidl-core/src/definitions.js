"use strict"

import identifiers  from'./identifiers.js';
import interactions from'./interactions.js';
import serializer from'./serializer.js';
import operator from'./operator.js';
import Graph from'./g.js';
import _ from 'lodash';

import addDefinitionToGraph from './transformations/addDefinitionToGraph'
import addOperatorTypeAnnotation from './transformations/addOperatorTypeAnnotation'
import referentialTransparency from './transformations/referentialTransparency'
import linkInteractionsToDefinitions from './transformations/linkInteractionsToDefinitions'
import expandDefinitions from './transformations/expandDefinitions'
import removeNonRootDefinitions from './transformations/removeNonRootDefinitions'
import clearSubInformation from './transformations/clearSubInformation'
import instantiateInterfaces from './transformations/instantiateInterfaces'
import linkArguments from './transformations/linkArguments'
import linkInterface from './transformations/linkInterface'
import keepOnlyInteractions from './transformations/keepOnlyInteractions'
import referentialTransparencyInstances from './transformations/referentialTransparencyInstances'
import linkIdentifiers from './transformations/linkIdentifiers'
import voidInteractionCreation from './transformations/voidInteractionCreation'
import behaviourSeparation from './transformations/behaviourSeparation'
import functionLiteralLinking from './transformations/functionLiteralLinking'
import dataLiteralLinking from './transformations/dataLiteralLinking'
import functionApplicationLinking from './transformations/functionApplicationLinking'
import previousNextLinking from './transformations/previousNextLinking'
import tagCompositionElementEdges from './transformations/tagCompositionElementEdges'
import matchingCompositionReduction from './transformations/matchingCompositionReduction'
import removeOneSidedAffectation from './transformations/removeOneSidedAffectation'
import createDataFlowDirection from './transformations/createDataFlowDirection'
import nonMatchingCompositionCompilation from './transformations/nonMatchingCompositionCompilation'
import affectationLinking from './transformations/affectationLinking'
import removeDuplicateEdge from './transformations/removeDuplicateEdge'
import resolveMultiplePorts from './transformations/resolveMultiplePorts'
import instantiateTemplates from './transformations/instantiateTemplates'
import orderGraph from './transformations/orderGraph'
// import  from './transformations/'

export function newExpand(ast,upto){
  let graph = new Graph();
  return graphTransformationPipeline(graph,ast,upto);
}

export function graphTransformationPipeline (graph,ast,upto) {

  let rootDefinitionNode =
  addDefinitionToGraph(graph,ast);
  graph.clean();
  if(upto === 'addDefinitionToGraph') return graph;

  addOperatorTypeAnnotation(graph);
  graph.clean();
  if(upto === 'addOperatorTypeAnnotation') return graph;

  referentialTransparency(graph);
  graph.clean();
  if(upto === 'referentialTransparency') return graph;

  linkInteractionsToDefinitions(graph);
  graph.clean();
  if(upto === 'linkInteractionsToDefinitions') return graph;

  expandDefinitions(graph);
  graph.clean();
  if(upto === 'expandDefinitions') return graph;

  removeNonRootDefinitions(graph,rootDefinitionNode);
  graph.clean();
  if(upto === 'removeNonRootDefinitions') return graph;

  clearSubInformation(graph);
  graph.clean();
  if(upto === 'clearSubInformation') return graph;

  instantiateInterfaces(graph,rootDefinitionNode);
  graph.clean();
  if(upto === 'instantiateInterfaces') return graph;

  linkArguments(graph,rootDefinitionNode);
  graph.clean();
  if(upto === 'linkArguments') return graph;

  linkInterface(graph,rootDefinitionNode);
  graph.clean();
  if(upto === 'linkInterface') return graph;

  keepOnlyInteractions(graph);
  graph.clean();
  if(upto === 'keepOnlyInteractions') return graph;

  referentialTransparencyInstances(graph);
  graph.clean();
  if(upto === 'referentialTransparencyInstances') return graph;

  linkIdentifiers(graph);
  graph.clean();
  if(upto === 'linkIdentifiers') return graph;

  voidInteractionCreation(graph);
  graph.clean();
  if(upto === 'voidInteractionCreation') return graph;

  behaviourSeparation(graph);
  graph.clean();
  if(upto === 'behaviourSeparation') return graph;

  functionLiteralLinking(graph);
  graph.clean();
  if(upto === 'functionLiteralLinking') return graph;

  dataLiteralLinking(graph);
  graph.clean();
  if(upto === 'dataLiteralLinking') return graph;

  functionApplicationLinking(graph);
  graph.clean();
  if(upto === 'functionApplicationLinking') return graph;

  previousNextLinking(graph);
  graph.clean();
  if(upto === 'previousNextLinking') return graph;

  tagCompositionElementEdges(graph);
  graph.clean();
  if(upto === 'tagCompositionElementEdges') return graph;

  matchingCompositionReduction(graph);
  matchingCompositionReduction(graph);
  matchingCompositionReduction(graph);
  //TODO Should loop that, either in the method or here ... until fixed point
  graph.clean();
  if(upto === 'matchingCompositionReduction') return graph;

  removeOneSidedAffectation(graph);
  graph.clean();
  if(upto === 'removeOneSidedAffectation') return graph;

  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  affectationLinking(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  affectationLinking(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  affectationLinking(graph);
  //TODO Should loop that too ... until fixed point ... but always end with another:
  createDataFlowDirection(graph);
  graph.clean();
  if(upto === 'createDataFlowDirection') return graph;
  if(upto === 'nonMatchingCompositionCompilation') return graph;
  if(upto === 'affectationLinking') return graph;

  removeDuplicateEdge(graph);
  graph.clean();
  if(upto === 'removeDuplicateEdge') return graph;

  resolveMultiplePorts(graph);
  graph.clean();
  if(upto === 'resolveMultiplePorts') return graph;

  instantiateTemplates(graph);
  graph.clean();
  if(upto === 'instantiateTemplates') return graph;

  orderGraph(graph);
  graph.clean();
  if(upto === 'orderGraph') return graph;

    return graph;
}





export function expand(ast){
  return _(ast)
  .map(lidlDef=>interactions.expand(lidlDef))
  .map(lidlDef=>
    _(lidlDef)
    .assign({interaction:identifiers.reduceIdentifiers(lidlDef.interaction)})
    .value())
  .value();
}
