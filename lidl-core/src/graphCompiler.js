"use strict"

import Graph from'./g.js';
import _ from 'lodash';

import addDefinitionToGraph from './graphInputs/addDefinitionToGraph'


import linkInterfacesToDefinitions from './graphTransformations/linkInterfacesToDefinitions'
import expandInterfaces from './graphTransformations/expandInterfaces'
import addOperatorTypeAnnotation from './graphTransformations/addOperatorTypeAnnotation'
import referentialTransparency from './graphTransformations/referentialTransparency'
import linkInteractionsToDefinitions from './graphTransformations/linkInteractionsToDefinitions'
import addInterfaceInformationToInteractions from './graphTransformations/addInterfaceInformationToInteractions'
import expandDefinitions from './graphTransformations/expandDefinitions'
import removeNonRootDefinitions from './graphTransformations/removeNonRootDefinitions'
import clearSubInformation from './graphTransformations/clearSubInformation'
import instantiateInterfaces from './graphTransformations/instantiateInterfaces'
import linkArguments from './graphTransformations/linkArguments'
import linkInterface from './graphTransformations/linkInterface'
import keepOnlyInteractions from './graphTransformations/keepOnlyInteractions'
import referentialTransparencyInstances from './graphTransformations/referentialTransparencyInstances'
import linkIdentifiers from './graphTransformations/linkIdentifiers'
import voidInteractionCreation from './graphTransformations/voidInteractionCreation'
import behaviourSeparation from './graphTransformations/behaviourSeparation'
import functionLiteralLinking from './graphTransformations/functionLiteralLinking'
import dataLiteralLinking from './graphTransformations/dataLiteralLinking'
import functionApplicationLinking from './graphTransformations/functionApplicationLinking'
import previousNextLinking from './graphTransformations/previousNextLinking'
import tagCompositionElementEdges from './graphTransformations/tagCompositionElementEdges'
import matchingCompositionReduction from './graphTransformations/matchingCompositionReduction'
import removeOneSidedAffectation from './graphTransformations/removeOneSidedAffectation'
import createDataFlowDirection from './graphTransformations/createDataFlowDirection'
import nonMatchingCompositionCompilation from './graphTransformations/nonMatchingCompositionCompilation'
import affectationLinking from './graphTransformations/affectationLinking'
import removeDuplicateEdge from './graphTransformations/removeDuplicateEdge'
import resolveMultiplePorts from './graphTransformations/resolveMultiplePorts'
import instantiateTemplates from './graphTransformations/instantiateTemplates'
import orderGraph from './graphTransformations/orderGraph'
import keepOnlyOrdering from './graphTransformations/keepOnlyOrdering'

import getExpandedLidl from './graphOutputs/getExpandedLidl'
import getJsCode from './graphOutputs/getJsCode'
import getInteractionMetrics from './graphOutputs/getInteractionMetrics'


export function compile(ast,header,callbacks){

  // A function to properly call each callback correctly
  function callCallback(element,data) {
    graph.clean(); // Also it cleans the graph
    if(_.isUndefined(callbacks[element])) {
      return true;// No callback for this stage ? We continue compiling;
    } else {
      let ret = callbacks[element](graph,(_.isObject(data))?(_.assign({stage:element},data)):(_.isUndefined(data)?{stage:element}:data));
      if(_.isBoolean(ret)) {
        return ret;
      } else {
        throw new Error ('Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for '+element+' returned '+ret);
      }
    }
  }


  // We add the ad hoc callbacks to the callback stack
  var newCallbacks = _.assign(
    _.clone(callbacks),
    {
      instantiateInterfaces:(graph,data)=>{
        callCallback('getExpandedLidlCode',getExpandedLidl(graph,rootDefinitionNode));
        return callCallback('instantiateInterfaces',data);
      },
      referentialTransparencyInstances:(graph,data)=>{
        callCallback('getInteractionMetrics',getInteractionMetrics(graph));
        return callCallback('referentialTransparencyInstances',data);
      },
      orderGraph:(graph,data)=>{
        callCallback('getJsCode',getJsCode(graph,header));
        return callCallback('orderGraph',data);
      }
    }
  );


  // Create a graph
  let graph = new Graph();

  // Add the AST to it
  let rootDefinitionNode =
  addDefinitionToGraph(graph,ast);

  // Apply transformations to it
  graphTransformationPipeline (graph,rootDefinitionNode,newCallbacks);

  return graph;
}



export function graphTransformationPipeline (graph,rootDefinitionNode,callbacks) {

  var step = 0;
  var callBackIterationCounter = {};
  // A function to properly call each callback correctly
  function callCallback(element,data) {
    graph.clean(); // Also it cleans the graph
    step = step+1;
    if(callBackIterationCounter[element]===undefined)callBackIterationCounter[element]=0;
    callBackIterationCounter[element] = callBackIterationCounter[element]+1;
    if(_.isUndefined(callbacks[element])) {
      return true;// No callback for this stage ? We continue compiling;
    } else {
      let additionalInfo = {stage:element,step:step,iteration:callBackIterationCounter[element]};
      let ret = callbacks[element](graph,(_.isObject(data))?(_.assign(additionalInfo,data)):(_.isUndefined(data)?additionalInfo:data));
      if(_.isBoolean(ret)) {
        return ret;
      } else {
        throw new Error ('Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for '+element+' returned '+ret);
      }
    }
  }

  try {
    if(false===callCallback('addDefinitionToGraph')) return graph;


    linkInterfacesToDefinitions(graph);
    if(false===callCallback('linkInterfacesToDefinitions')) return graph;

    expandInterfaces(graph);
    if(false===callCallback('expandInterfaces')) return graph;

    addOperatorTypeAnnotation(graph);
    if(false===callCallback('addOperatorTypeAnnotation')) return graph;

    referentialTransparency(graph);
    if(false===callCallback('referentialTransparency')) return graph;

    linkInteractionsToDefinitions(graph);
    if(false===callCallback('linkInteractionsToDefinitions')) return graph;

    addInterfaceInformationToInteractions(graph);
    if(false===callCallback('addInterfaceInformationToInteractions')) return graph;

    expandDefinitions(graph);
    if(false===callCallback('expandDefinitions')) return graph;

    removeNonRootDefinitions(graph,rootDefinitionNode);
    if(false===callCallback('removeNonRootDefinitions')) return graph;

    clearSubInformation(graph);
    if(false===callCallback('clearSubInformation')) return graph;

    instantiateInterfaces(graph,rootDefinitionNode);
    if(false===callCallback('instantiateInterfaces')) return graph;

    linkArguments(graph,rootDefinitionNode);
    if(false===callCallback('linkArguments')) return graph;

    linkInterface(graph,rootDefinitionNode);
    if(false===callCallback('linkInterface')) return graph;

    keepOnlyInteractions(graph);
    if(false===callCallback('keepOnlyInteractions')) return graph;

    referentialTransparencyInstances(graph);
    if(false===callCallback('referentialTransparencyInstances')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    voidInteractionCreation(graph);
    if(false===callCallback('voidInteractionCreation')) return graph;

    behaviourSeparation(graph);
    if(false===callCallback('behaviourSeparation')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    functionLiteralLinking(graph);
    if(false===callCallback('functionLiteralLinking')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    dataLiteralLinking(graph);
    if(false===callCallback('dataLiteralLinking')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    functionApplicationLinking(graph);
    if(false===callCallback('functionApplicationLinking')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    previousNextLinking(graph);
    if(false===callCallback('previousNextLinking')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    tagCompositionElementEdges(graph);
    if(false===callCallback('tagCompositionElementEdges')) return graph;

    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    //TODO Should loop that, either in the method or here ... until fixed point

    linkIdentifiers(graph);
    if(false===callCallback('linkIdentifiers')) return graph;

    createDataFlowDirection(graph);
      if(false===callCallback('createDataFlowDirection')) return graph;


    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    //TODO Should loop that, either in the method or here ... until fixed point


    removeOneSidedAffectation(graph);
    if(false===callCallback('removeOneSidedAffectation')) return graph;


    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation')) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation')) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking')) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation')) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking')) return graph;

    //TODO Should loop that too ... until fixed point ... but always end with another:
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;


    removeDuplicateEdge(graph);
    if(false===callCallback('removeDuplicateEdge')) return graph;

    resolveMultiplePorts(graph);
    if(false===callCallback('resolveMultiplePorts')) return graph;

    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection')) return graph;

    instantiateTemplates(graph);
    if(false===callCallback('instantiateTemplates')) return graph;

    orderGraph(graph);
    if(false===callCallback('orderGraph')) return graph;

    keepOnlyOrdering(graph);
    if(false===callCallback('keepOnlyOrdering')) return graph;

    if(false===callCallback('graphTransformationPipeline')) return graph;

    return graph;
  } catch (e) {
    callCallback('error',{error:e,iteration:1});
    throw(e);
  }
}
