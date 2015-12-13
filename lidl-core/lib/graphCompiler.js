"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.










































compile = compile;exports.




















































graphTransformationPipeline = graphTransformationPipeline;var _g = require('./g.js');var _g2 = _interopRequireDefault(_g);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _addDefinitionToGraph = require('./graphInputs/addDefinitionToGraph');var _addDefinitionToGraph2 = _interopRequireDefault(_addDefinitionToGraph);var _addOperatorTypeAnnotation = require('./graphTransformations/addOperatorTypeAnnotation');var _addOperatorTypeAnnotation2 = _interopRequireDefault(_addOperatorTypeAnnotation);var _referentialTransparency = require('./graphTransformations/referentialTransparency');var _referentialTransparency2 = _interopRequireDefault(_referentialTransparency);var _linkInteractionsToDefinitions = require('./graphTransformations/linkInteractionsToDefinitions');var _linkInteractionsToDefinitions2 = _interopRequireDefault(_linkInteractionsToDefinitions);var _addInterfaceInformationToInteractions = require('./graphTransformations/addInterfaceInformationToInteractions');var _addInterfaceInformationToInteractions2 = _interopRequireDefault(_addInterfaceInformationToInteractions);var _expandDefinitions = require('./graphTransformations/expandDefinitions');var _expandDefinitions2 = _interopRequireDefault(_expandDefinitions);var _removeNonRootDefinitions = require('./graphTransformations/removeNonRootDefinitions');var _removeNonRootDefinitions2 = _interopRequireDefault(_removeNonRootDefinitions);var _clearSubInformation = require('./graphTransformations/clearSubInformation');var _clearSubInformation2 = _interopRequireDefault(_clearSubInformation);var _instantiateInterfaces = require('./graphTransformations/instantiateInterfaces');var _instantiateInterfaces2 = _interopRequireDefault(_instantiateInterfaces);var _linkArguments = require('./graphTransformations/linkArguments');var _linkArguments2 = _interopRequireDefault(_linkArguments);var _linkInterface = require('./graphTransformations/linkInterface');var _linkInterface2 = _interopRequireDefault(_linkInterface);var _keepOnlyInteractions = require('./graphTransformations/keepOnlyInteractions');var _keepOnlyInteractions2 = _interopRequireDefault(_keepOnlyInteractions);var _referentialTransparencyInstances = require('./graphTransformations/referentialTransparencyInstances');var _referentialTransparencyInstances2 = _interopRequireDefault(_referentialTransparencyInstances);var _linkIdentifiers = require('./graphTransformations/linkIdentifiers');var _linkIdentifiers2 = _interopRequireDefault(_linkIdentifiers);var _voidInteractionCreation = require('./graphTransformations/voidInteractionCreation');var _voidInteractionCreation2 = _interopRequireDefault(_voidInteractionCreation);var _behaviourSeparation = require('./graphTransformations/behaviourSeparation');var _behaviourSeparation2 = _interopRequireDefault(_behaviourSeparation);var _functionLiteralLinking = require('./graphTransformations/functionLiteralLinking');var _functionLiteralLinking2 = _interopRequireDefault(_functionLiteralLinking);var _dataLiteralLinking = require('./graphTransformations/dataLiteralLinking');var _dataLiteralLinking2 = _interopRequireDefault(_dataLiteralLinking);var _functionApplicationLinking = require('./graphTransformations/functionApplicationLinking');var _functionApplicationLinking2 = _interopRequireDefault(_functionApplicationLinking);var _previousNextLinking = require('./graphTransformations/previousNextLinking');var _previousNextLinking2 = _interopRequireDefault(_previousNextLinking);var _tagCompositionElementEdges = require('./graphTransformations/tagCompositionElementEdges');var _tagCompositionElementEdges2 = _interopRequireDefault(_tagCompositionElementEdges);var _matchingCompositionReduction = require('./graphTransformations/matchingCompositionReduction');var _matchingCompositionReduction2 = _interopRequireDefault(_matchingCompositionReduction);var _removeOneSidedAffectation = require('./graphTransformations/removeOneSidedAffectation');var _removeOneSidedAffectation2 = _interopRequireDefault(_removeOneSidedAffectation);var _createDataFlowDirection = require('./graphTransformations/createDataFlowDirection');var _createDataFlowDirection2 = _interopRequireDefault(_createDataFlowDirection);var _nonMatchingCompositionCompilation = require('./graphTransformations/nonMatchingCompositionCompilation');var _nonMatchingCompositionCompilation2 = _interopRequireDefault(_nonMatchingCompositionCompilation);var _affectationLinking = require('./graphTransformations/affectationLinking');var _affectationLinking2 = _interopRequireDefault(_affectationLinking);var _removeDuplicateEdge = require('./graphTransformations/removeDuplicateEdge');var _removeDuplicateEdge2 = _interopRequireDefault(_removeDuplicateEdge);var _resolveMultiplePorts = require('./graphTransformations/resolveMultiplePorts');var _resolveMultiplePorts2 = _interopRequireDefault(_resolveMultiplePorts);var _instantiateTemplates = require('./graphTransformations/instantiateTemplates');var _instantiateTemplates2 = _interopRequireDefault(_instantiateTemplates);var _orderGraph = require('./graphTransformations/orderGraph');var _orderGraph2 = _interopRequireDefault(_orderGraph);var _keepOnlyOrdering = require('./graphTransformations/keepOnlyOrdering');var _keepOnlyOrdering2 = _interopRequireDefault(_keepOnlyOrdering);var _getExpandedLidl = require('./graphOutputs/getExpandedLidl');var _getExpandedLidl2 = _interopRequireDefault(_getExpandedLidl);var _getJsCode = require('./graphOutputs/getJsCode');var _getJsCode2 = _interopRequireDefault(_getJsCode);var _getInteractionMetrics = require('./graphOutputs/getInteractionMetrics');var _getInteractionMetrics2 = _interopRequireDefault(_getInteractionMetrics);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function compile(ast, header, callbacks) {// A function to properly call each callback correctly
  function callCallback(element, data) {graph.clean(); // Also it cleans the graph
    if (_lodash2.default.isUndefined(callbacks[element])) {return true; // No callback for this stage ? We continue compiling;
    } else {var ret = callbacks[element](graph, _lodash2.default.isObject(data) ? _lodash2.default.assign({ stage: element }, data) : _lodash2.default.isUndefined(data) ? { stage: element } : data);if (_lodash2.default.isBoolean(ret)) {return ret;} else {throw new Error('Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for ' + element + ' returned ' + ret);}}} // We add the ad hoc callbacks to the callback stack
  var newCallbacks = _lodash2.default.assign(_lodash2.default.clone(callbacks), { instantiateInterfaces: function instantiateInterfaces(graph, data) {callCallback('getExpandedLidlCode', (0, _getExpandedLidl2.default)(graph, rootDefinitionNode));return callCallback('instantiateInterfaces', data);}, referentialTransparencyInstances: function referentialTransparencyInstances(graph, data) {callCallback('getInteractionMetrics', (0, _getInteractionMetrics2.default)(graph));return callCallback('referentialTransparencyInstances', data);}, orderGraph: function orderGraph(graph, data) {callCallback('getJsCode', (0, _getJsCode2.default)(graph, header));return callCallback('orderGraph', data);} }); // Create a graph
  var graph = new _g2.default(); // Add the AST to it
  var rootDefinitionNode = (0, _addDefinitionToGraph2.default)(graph, ast); // Apply transformations to it
  graphTransformationPipeline(graph, rootDefinitionNode, newCallbacks);return graph;}function graphTransformationPipeline(graph, rootDefinitionNode, callbacks) {var step = 0;var callBackIterationCounter = {}; // A function to properly call each callback correctly
  function callCallback(element, data) {graph.clean(); // Also it cleans the graph
    step = step + 1;if (callBackIterationCounter[element] === undefined) callBackIterationCounter[element] = 0;callBackIterationCounter[element] = callBackIterationCounter[element] + 1;
    if (_lodash2.default.isUndefined(callbacks[element])) {
      return true; // No callback for this stage ? We continue compiling;
    } else {
        var additionalInfo = { stage: element, step: step, iteration: callBackIterationCounter[element] };
        var ret = callbacks[element](graph, _lodash2.default.isObject(data) ? _lodash2.default.assign(additionalInfo, data) : _lodash2.default.isUndefined(data) ? additionalInfo : data);
        if (_lodash2.default.isBoolean(ret)) {
          return ret;} else 
        {
          throw new Error('Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for ' + element + ' returned ' + ret);}}}




  try {
    if (false === callCallback('addDefinitionToGraph')) return graph;

    (0, _addOperatorTypeAnnotation2.default)(graph);
    if (false === callCallback('addOperatorTypeAnnotation')) return graph;

    (0, _referentialTransparency2.default)(graph);
    if (false === callCallback('referentialTransparency')) return graph;

    (0, _linkInteractionsToDefinitions2.default)(graph);
    if (false === callCallback('linkInteractionsToDefinitions')) return graph;

    (0, _addInterfaceInformationToInteractions2.default)(graph);
    if (false === callCallback('addInterfaceInformationToInteractions')) return graph;

    (0, _expandDefinitions2.default)(graph);
    if (false === callCallback('expandDefinitions')) return graph;

    (0, _removeNonRootDefinitions2.default)(graph, rootDefinitionNode);
    if (false === callCallback('removeNonRootDefinitions')) return graph;

    (0, _clearSubInformation2.default)(graph);
    if (false === callCallback('clearSubInformation')) return graph;

    (0, _instantiateInterfaces2.default)(graph, rootDefinitionNode);
    if (false === callCallback('instantiateInterfaces')) return graph;

    (0, _linkArguments2.default)(graph, rootDefinitionNode);
    if (false === callCallback('linkArguments')) return graph;

    (0, _linkInterface2.default)(graph, rootDefinitionNode);
    if (false === callCallback('linkInterface')) return graph;

    (0, _keepOnlyInteractions2.default)(graph);
    if (false === callCallback('keepOnlyInteractions')) return graph;

    (0, _referentialTransparencyInstances2.default)(graph);
    if (false === callCallback('referentialTransparencyInstances')) return graph;

    (0, _linkIdentifiers2.default)(graph);
    if (false === callCallback('linkIdentifiers')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _voidInteractionCreation2.default)(graph);
    if (false === callCallback('voidInteractionCreation')) return graph;

    (0, _behaviourSeparation2.default)(graph);
    if (false === callCallback('behaviourSeparation')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _functionLiteralLinking2.default)(graph);
    if (false === callCallback('functionLiteralLinking')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _dataLiteralLinking2.default)(graph);
    if (false === callCallback('dataLiteralLinking')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _functionApplicationLinking2.default)(graph);
    if (false === callCallback('functionApplicationLinking')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _previousNextLinking2.default)(graph);
    if (false === callCallback('previousNextLinking')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _tagCompositionElementEdges2.default)(graph);
    if (false === callCallback('tagCompositionElementEdges')) return graph;

    (0, _matchingCompositionReduction2.default)(graph);
    if (false === callCallback('matchingCompositionReduction')) return graph;
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;
    (0, _matchingCompositionReduction2.default)(graph);
    if (false === callCallback('matchingCompositionReduction')) return graph;
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;
    (0, _matchingCompositionReduction2.default)(graph);
    if (false === callCallback('matchingCompositionReduction')) return graph;
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    //TODO Should loop that, either in the method or here ... until fixed point

    (0, _removeOneSidedAffectation2.default)(graph);
    if (false === callCallback('removeOneSidedAffectation')) return graph;


    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;
    (0, _nonMatchingCompositionCompilation2.default)(graph);
    if (false === callCallback('nonMatchingCompositionCompilation')) return graph;
    (0, _affectationLinking2.default)(graph);
    if (false === callCallback('affectationLinking')) return graph;
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;
    (0, _nonMatchingCompositionCompilation2.default)(graph);
    if (false === callCallback('nonMatchingCompositionCompilation')) return graph;
    (0, _affectationLinking2.default)(graph);
    if (false === callCallback('affectationLinking')) return graph;
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;
    (0, _nonMatchingCompositionCompilation2.default)(graph);
    if (false === callCallback('nonMatchingCompositionCompilation')) return graph;
    (0, _affectationLinking2.default)(graph);
    if (false === callCallback('affectationLinking')) return graph;

    //TODO Should loop that too ... until fixed point ... but always end with another:
    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;


    (0, _removeDuplicateEdge2.default)(graph);
    if (false === callCallback('removeDuplicateEdge')) return graph;

    (0, _resolveMultiplePorts2.default)(graph);
    if (false === callCallback('resolveMultiplePorts')) return graph;

    (0, _createDataFlowDirection2.default)(graph);
    if (false === callCallback('createDataFlowDirection')) return graph;

    (0, _instantiateTemplates2.default)(graph);
    if (false === callCallback('instantiateTemplates')) return graph;

    (0, _orderGraph2.default)(graph);
    if (false === callCallback('orderGraph')) return graph;

    (0, _keepOnlyOrdering2.default)(graph);
    if (false === callCallback('keepOnlyOrdering')) return graph;

    if (false === callCallback('graphTransformationPipeline')) return graph;

    return graph;} 
  catch (e) {
    callCallback('error', { error: e, iteration: 1 });
    throw e;}}