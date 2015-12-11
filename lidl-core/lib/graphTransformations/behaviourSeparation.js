"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



behaviourSeparation;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function behaviourSeparation(graph) {
  var activeSource = 
  graph.
  addNode({ 
    type: 'InteractionInstance', 
    content: { 
      type: 'InteractionNative', 
      content: '<%=a0%> = active;\n' }, 

    ports: [{ 
      type: 'InterfaceAtomic', 
      direction: 'out', 
      data: { 
        type: 'DataAtomic', 
        name: 'Activation' } }] });




  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      operatorType: "Behaviour" } }, 

  function (theResut, theNode) {
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 2 } }).


    forEach(function (x) {return (
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: activeSource, 
            index: 0 }, 

          to: x.to }));}).

    commit();
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 0 } }).


    forEach(function (x) {return (
        graph.
        matchUndirectedEdges({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: theNode, 
            index: 1 } }).


        forEach(function (y) {return (
            graph.
            addEdge({ 
              type: 'InteractionInstanceOperand', 
              from: x.to, 
              to: y.to }));}).

        commit());}).
    commit();
    graph.
    finish(theNode);});}