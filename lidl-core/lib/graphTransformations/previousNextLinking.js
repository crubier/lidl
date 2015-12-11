"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 











previousNextLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interfaces = require('../interfaces');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function previousNextLinking(graph) {
  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      operatorType: 'Previous' } }, 

  function (theResult, theNode) {
    var stateId = _lodash2.default.uniqueId('state_');

    // Add a first node to get from state variable
    var source = 
    graph.
    addNode({ 
      type: 'InteractionInstance', 
      containsAState: true, 
      stateVariableName: stateId, 
      content: { 
        'type': 'InteractionNative', 
        'content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\n}\n" }, 

      ports: [{ 
        type: 'InterfaceAtomic', 
        direction: "in", 
        data: { 
          type: 'DataAtomic', 
          name: 'Activation' } }, 

      undefined] });

    // Add edge to first ports
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 0 } }).


    forEach(function (x) {return (
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: source, 
            index: 0 }, 

          to: x.to }));}).

    commit();
    // Add edge to second ports
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 1 } }).


    forEach(function (x) {
      source.ports[1] = (0, _interfaces.mergeInterface)(source.ports[1], (0, _interfaces.conjugateInterface)(x.to.node.ports[x.to.index]));
      graph.
      addEdge({ 
        type: 'InteractionInstanceOperand', 
        from: { 
          node: source, 
          index: 1 }, 

        to: x.to });}).

    commit();


    // Add a second node to set state variable
    var source2 = 
    graph.
    addNode({ 
      type: 'InteractionInstance', 
      containsAState: true, 
      stateVariableName: stateId, 
      content: { 
        'type': 'InteractionNative', 
        'content': "if(<%=a0%> === active) {\nnextState['" + stateId + "'] = <%=a1%>;\n}\n" }, 

      ports: [{ 
        type: 'InterfaceAtomic', 
        direction: "in", 
        data: { 
          type: 'DataAtomic', 
          name: 'Activation' } }, 

      undefined] });

    // Add edge to first ports
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 0 } }).


    forEach(function (x) {return (
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: source2, 
            index: 0 }, 

          to: x.to }));}).

    commit();
    // Add edge to second ports
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 2 } }).


    forEach(function (x) {
      source2.ports[1] = (0, _interfaces.mergeInterface)(source2.ports[1], (0, _interfaces.conjugateInterface)(x.to.node.ports[x.to.index]));
      graph.
      addEdge({ 
        type: 'InteractionInstanceOperand', 
        from: { 
          node: source2, 
          index: 1 }, 

        to: x.to });}).

    commit();


    graph.
    finish(theNode);});}