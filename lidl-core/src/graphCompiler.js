"use strict"

import Graph from'./g.js';
import _ from 'lodash';

import addDefinitionToGraph from './graphInputs/addDefinitionToGraph'

import addOperatorTypeAnnotation from './graphTransformations/addOperatorTypeAnnotation'
import referentialTransparency from './graphTransformations/referentialTransparency'
import linkInteractionsToDefinitions from './graphTransformations/linkInteractionsToDefinitions'
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

import getExpandedLidl from './graphOutputs/getExpandedLidl'
import getJsCode from './graphOutputs/getJsCode'


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
        // setTimeout(()=>callCallback('getExpandedLidlCode',{code:getExpandedLidl(graph,rootDefinitionNode)}),1);
        callCallback('getExpandedLidlCode',{code:getExpandedLidl(graph,rootDefinitionNode)});
        return callCallback('instantiateInterfaces',data);
      },
      graphTransformationPipeline:(graph,data)=>{
        // setTimeout(()=>callCallback('getJsCode',{code:getJsCode(graph,header)}),1);
        callCallback('getJsCode',{code:getJsCode(graph,header)});
        return callCallback('graphTransformationPipeline',data);
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

  try {
    if(false===callCallback('addDefinitionToGraph',{iteration:1})) return graph;

    addOperatorTypeAnnotation(graph);
    if(false===callCallback('addOperatorTypeAnnotation',{iteration:1})) return graph;

    referentialTransparency(graph);
    if(false===callCallback('referentialTransparency',{iteration:1})) return graph;

    linkInteractionsToDefinitions(graph);
    if(false===callCallback('linkInteractionsToDefinitions',{iteration:1})) return graph;

    expandDefinitions(graph);
    if(false===callCallback('expandDefinitions',{iteration:1})) return graph;

    removeNonRootDefinitions(graph,rootDefinitionNode);
    if(false===callCallback('removeNonRootDefinitions',{iteration:1})) return graph;

    clearSubInformation(graph);
    if(false===callCallback('clearSubInformation',{iteration:1})) return graph;

    instantiateInterfaces(graph,rootDefinitionNode);
    if(false===callCallback('instantiateInterfaces',{iteration:1})) return graph;

    linkArguments(graph,rootDefinitionNode);
    if(false===callCallback('linkArguments',{iteration:1})) return graph;

    linkInterface(graph,rootDefinitionNode);
    if(false===callCallback('linkInterface',{iteration:1})) return graph;

    keepOnlyInteractions(graph);
    if(false===callCallback('keepOnlyInteractions',{iteration:1})) return graph;

    referentialTransparencyInstances(graph);
    if(false===callCallback('referentialTransparencyInstances',{iteration:1})) return graph;

    linkIdentifiers(graph);
    if(false===callCallback('linkIdentifiers',{iteration:1})) return graph;

    voidInteractionCreation(graph);
    if(false===callCallback('voidInteractionCreation',{iteration:1})) return graph;

    behaviourSeparation(graph);
    if(false===callCallback('behaviourSeparation',{iteration:1})) return graph;

    functionLiteralLinking(graph);
    if(false===callCallback('functionLiteralLinking',{iteration:1})) return graph;

    dataLiteralLinking(graph);
    if(false===callCallback('dataLiteralLinking',{iteration:1})) return graph;

    functionApplicationLinking(graph);
    if(false===callCallback('functionApplicationLinking',{iteration:1})) return graph;

    previousNextLinking(graph);
    if(false===callCallback('previousNextLinking',{iteration:1})) return graph;

    tagCompositionElementEdges(graph);
    if(false===callCallback('tagCompositionElementEdges',{iteration:1})) return graph;

    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction',{iteration:1})) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction',{iteration:2})) return graph;
    matchingCompositionReduction(graph);
    if(false===callCallback('matchingCompositionReduction',{iteration:3})) return graph;
    //TODO Should loop that, either in the method or here ... until fixed point


    removeOneSidedAffectation(graph);
    if(false===callCallback('removeOneSidedAffectation',{iteration:1})) return graph;


    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection',{iteration:1})) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation',{iteration:1})) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking',{iteration:1})) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection',{iteration:2})) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation',{iteration:2})) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking',{iteration:2})) return graph;
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection',{iteration:3})) return graph;
    nonMatchingCompositionCompilation(graph);
    if(false===callCallback('nonMatchingCompositionCompilation',{iteration:3})) return graph;
    affectationLinking(graph);
    if(false===callCallback('affectationLinking',{iteration:3})) return graph;

    //TODO Should loop that too ... until fixed point ... but always end with another:
    createDataFlowDirection(graph);
    if(false===callCallback('createDataFlowDirection',{iteration:4})) return graph;


    removeDuplicateEdge(graph);
    if(false===callCallback('removeDuplicateEdge',{iteration:1})) return graph;

    resolveMultiplePorts(graph);
    if(false===callCallback('resolveMultiplePorts',{iteration:1})) return graph;

    instantiateTemplates(graph);
    if(false===callCallback('instantiateTemplates',{iteration:1})) return graph;

    orderGraph(graph);
    if(false===callCallback('orderGraph',{iteration:1})) return graph;

    if(false===callCallback('graphTransformationPipeline',{iteration:1})) return graph;

    return graph;
  } catch (e) {
    callCallback('error',{iteration:1});
    throw(e);
  }
}
