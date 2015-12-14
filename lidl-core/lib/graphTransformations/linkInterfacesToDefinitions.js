"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





linkInterfacesToDefinitions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function linkInterfacesToDefinitions(graph) {
  // Mark all nodes as not having a definition
  graph.
  matchNodes({ 
    type: 'Interface', 
    content: { 
      type: 'InterfaceNamed' } }).


  forEach(function (theNode) {
    theNode.hasDefinition = false;}).

  commit();



  graph.
  reduceNodes({ 
    type: 'Interface', 
    content: { 
      type: 'InterfaceNamed' }, 

    hasDefinition: false }, 
  function (theResult, theNode) {

    var edgeToParent = 
    graph.
    findDirectedEdge({ 
      type: 'DefinitionSubInterface', 
      to: { 
        node: theNode } });



    while (!_lodash2.default.isUndefined(edgeToParent)) {

      var parentDef = edgeToParent.from.node;

      // First case : Interface definition is a child of current definition
      var childDefs = 
      graph.
      matchDirectedEdges({ 
        type: 'DefinitionDefinition', 
        from: { 
          node: parentDef } }).


      pluck("to.node").
      filter(function (defNode) {return defNode.content.signature === theNode.content.name;}).
      value();
      if (_lodash2.default.size(childDefs) > 1) {
        throw new Error('LIDL does not support polymorphism yet (for interface ' + theNode.content.name + ')');} else 
      if (_lodash2.default.size(childDefs) === 1) {
        graph.
        addEdge({ 
          type: 'InterfaceDefinition', 
          from: { 
            node: theNode }, 

          to: { 
            node: _lodash2.default.first(childDefs) } });


        theNode.hasDefinition = true;
        break;}



      // Second case: Interface is maybe defined in a parent definition
      edgeToParent = 
      graph.
      findDirectedEdge({ 
        type: 'DefinitionDefinition', 
        to: { 
          node: parentDef } });}





    if (!theNode.hasDefinition) {
      throw new Error('Could not find definition for interface named ' + theNode.content.name);}});}