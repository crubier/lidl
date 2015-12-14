"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





linkIdentifiers;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _exportGraph = require('../exportGraph');var _exportGraph2 = _interopRequireDefault(_exportGraph);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function linkIdentifiers(graph) {
  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      operatorType: 'Identifier' } }, 

  function (theResut, theNode) {

    if (!(0, _lodash2.default)(theNode.content.operator).endsWith('?') && !(0, _lodash2.default)(theNode.content.operator).endsWith('!')) {
      // Simple identifier situation
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
      finish(theNode);} else 
    {(function () {
        // Oriented identifier situation (identifiers with ! or ? in the end, like (x?) or (my var !)  )



        //Similar situation to referential transparency, we need to find nodes with matching operators and children
        var theChildrenEdges = 
        graph.
        matchUndirectedEdges({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: theNode } }).


        filter(function (e) {return e.from.index > 0;}) // Only children, not the parent which has index 0
        .value();


        if ((0, _lodash2.default)(theChildrenEdges).every(function (edg) {return edg.to.node.content.operatorType !== 'Identifier';})) 

        {(function () {

            // We find the node which has the opposite situation (? instead of ! or vice versa)
            var operator = theNode.content.operator;
            var suffix = operator.slice(-1);
            var coSuffix = suffix === '!' ? '?' : '!';
            var coOperator = operator.slice(0, -1) + coSuffix;
            var coNode = 
            graph.
            matchNodes({ 
              type: 'InteractionInstance', 
              content: { 
                operator: coOperator } })

            // Co operator
            .filter(function (n) {return (// All chidren of similarNode are children of theNode
                graph.
                matchUndirectedEdges({ 
                  type: 'InteractionInstanceOperand', 
                  from: { 
                    node: n } }).


                filter(function (e) {return e.from.index > 0;}) // We check for similarity of children only, not parents !
                .every(function (e) {return (
                    (0, _lodash2.default)(theChildrenEdges).
                    filter({ 
                      from: { 
                        index: e.from.index }, 

                      to: { 
                        index: e.to.index, 
                        node: e.to.node } }).


                    size() === 1);}));}).
            filter(function (n) {return (// All children of theNode are children of the similarNode
                (0, _lodash2.default)(theChildrenEdges).
                every(function (ce) {return (
                    graph.
                    matchUndirectedEdges({ 
                      type: 'InteractionInstanceOperand', 
                      from: { 
                        node: n } }).


                    filter(function (e) {return e.from.index > 0;}).
                    filter({ 
                      from: { 
                        index: ce.from.index }, 

                      to: { 
                        index: ce.to.index, 
                        node: ce.to.node } }).


                    size() === 1);}));}).
            tap(function (x) {
              if (x.length > 1) {
                throw new Error('Fatal: referentialTransparency failed, we found more than one similar coNodes for an identifier');} else 
              if (x.length < 1) {
                // console.log("Single edge");
              }}).

            first();


            //
            // console.log(theNode.content.operator);
            // console.log(coNode.content.operator);
            if (!_lodash2.default.isUndefined(coNode)) {
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
                      node: coNode, 
                      index: 0 } }).


                  map(function (e2) {return (
                      graph.
                      addEdge({ 
                        type: 'InteractionInstanceOperand', 
                        from: e1.from, 
                        to: e2.from, 
                        createdByEliminatingIdentifier: true, 
                        meta: theNode.meta //TODO merge meta of theNode and coNode
                      }));}).
                  commit());}).
              commit();



              graph.
              finish(coNode);}



            graph.
            finish(theNode);})();}})();}




    console.log('exxx');
    (0, _exportGraph2.default)(graph.toDot(), "okk" + _lodash2.default.uniqueId());});}