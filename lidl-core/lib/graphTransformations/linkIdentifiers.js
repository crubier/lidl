"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



linkIdentifiers;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function linkIdentifiers(graph) {
  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      operatorType: 'Identifier' } }, 

  function (theResut, theNode) {
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      to: { 
        node: theNode, 
        index: 0 } }).


    map(function (e1) {return (
        graph.
        matchUndirectedEdges({ 
          type: 'InteractionInstanceOperand', 
          to: { 
            node: theNode, 
            index: 0 } }).


        filter(function (x) {return x.id > e1.id;}) // Only one way
        .map(function (e2) {return (
            graph.
            addEdge({ 
              type: 'InteractionInstanceOperand', 
              from: e1.from, 
              to: e2.from, 
              createdByEliminatingIdentifier: true, 
              meta: theNode.meta }));}).

        commit());}).
    commit();
    graph.
    finish(theNode);});}