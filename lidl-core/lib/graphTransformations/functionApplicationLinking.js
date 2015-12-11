"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 










functionApplicationLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interfaces = require('../interfaces');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function functionApplicationLinking(graph) {
  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      operatorType: 'FunctionApplication' } }, 

  function (theResult, theNode) {
    var source = 
    graph.
    addNode({ 
      type: 'InteractionInstance', 
      content: { 
        type: 'InteractionNative', 
        content: 'if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}\n' }, 

      ports: [{ 
        type: 'InterfaceAtomic', 
        direction: "in", 
        data: { 
          type: 'DataAtomic', 
          name: 'Activation' } }]

      //FIXME itnerface instead of ports
    });


    // Connect root
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

    // Connect function
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

    if (!(0, _interfaces.isAtomic)(source.ports[1]) || source.ports[1].data.type !== 'DataFunction') throw new Error('Function application should receive functions as first argument, received the interface ' + JSON.stringify(source.ports[1]));
    // Infer in and out ports interfaces from interface of the function
    source.ports[2] = { 
      type: 'InterfaceAtomic', 
      direction: 'in', 
      data: source.ports[1].data.domain };

    source.ports[3] = { 
      type: 'InterfaceAtomic', 
      direction: 'out', 
      data: source.ports[1].data.codomain };


    // Connect input
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 2 } }).


    forEach(function (x) {
      source.ports[2] = (0, _interfaces.mergeInterface)(source.ports[2], (0, _interfaces.conjugateInterface)(x.to.node.ports[x.to.index]));
      graph.
      addEdge({ 
        type: 'InteractionInstanceOperand', 
        from: { 
          node: source, 
          index: 2 }, 

        to: x.to });}).

    commit();

    // Connect output
    graph.
    matchUndirectedEdges({ 
      type: 'InteractionInstanceOperand', 
      from: { 
        node: theNode, 
        index: 3 } }).


    forEach(function (x) {
      source.ports[3] = (0, _interfaces.mergeInterface)(source.ports[3], (0, _interfaces.conjugateInterface)(x.to.node.ports[x.to.index]));
      graph.
      addEdge({ 
        type: 'InteractionInstanceOperand', 
        from: { 
          node: source, 
          index: 3 }, 

        to: x.to });}).

    commit();

    graph.
    finish(theNode);});}