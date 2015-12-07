"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





affectationLinking;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _ports = require('../ports');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function affectationLinking(graph) {
  // Mark all as linkable
  graph.
  matchNodes({ type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Affectation' } }).
  forEach(function (theNode) {theNode.potentiallyAffectationLinkable = true;}).
  commit();


  // reduce
  graph.
  reduceNodes({ type: 'InteractionInstance', potentiallyAffectationLinkable: true, content: { type: 'InteractionSimple', operatorType: 'Affectation' } }, 
  function (theResult, theNode) {
    theNode.ports[0] = 'in';
    if ((0, _ports.portIsDefined)(theNode.ports[1]) && (0, _ports.portIsDefined)(theNode.ports[2])) {
      if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'out') && (0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'in')) 
      {(function () {
          var source = 
          graph.
          addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: 'if(<%=a0%> === active) {<%=a1%> = <%=a2%>;}\n' }, ports: ["in", "out", "in"] });

          (0, _lodash2.default)(_lodash2.default.range(3)).
          forEach(function (i) {return (
              graph.
              matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: i } }).
              forEach(function (x) {return (
                  graph.
                  addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: i }, to: x.to }));}).
              commit());}).
          commit();

          graph.
          finish(theNode);})();} else 
      if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'in') && (0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'out')) 
      {(function () {
          var source = 
          graph.
          addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: 'if(<%=a0%> === active) {<%=a2%> = <%=a1%>;}\n' }, ports: ["in", "in", "out"] });

          (0, _lodash2.default)(_lodash2.default.range(3)).
          forEach(function (i) {return (
              graph.
              matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: theNode, index: i } }).
              forEach(function (x) {return (
                  graph.
                  addEdge({ type: 'InteractionInstanceOperand', from: { node: source, index: i }, to: x.to }));}).
              commit());}).
          commit();

          graph.
          finish(theNode);})();} else 
      if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'in') && (0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'in')) {

        graph.
        finish(theNode);} else 
      if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'out') && (0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'out')) {

        graph.
        finish(theNode);} else 
      {
        theNode.potentiallyAffectationLinkable = false;}} else 

    {
      if ((0, _ports.portIsDefined)(theNode.ports[1])) {
        if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'out')) {
          theNode.ports[2] = 'in';}

        if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[1], 'in')) {
          theNode.ports[2] = 'out';}} else 

      if ((0, _ports.portIsDefined)(theNode.ports[2])) {
        if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'out')) {
          theNode.ports[1] = 'in';}

        if ((0, _ports.portIsOnlyMadeOf)(theNode.ports[2], 'in')) {
          theNode.ports[1] = 'out';}} else 

      {
        theNode.potentiallyAffectationLinkable = false;}}});}