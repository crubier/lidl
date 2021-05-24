"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =

































































































































































































































































































matchingCompositionReduction;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _satSolver = require('../satSolver.js');var _satSolver2 = _interopRequireDefault(_satSolver);var _exportGraph = require('../exportGraph');var _exportGraph2 = _interopRequireDefault(_exportGraph);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Graph = require('../g.js'); // For a given composition Node, find all the Composition Nodes that match it, Along with the condition to match them, determined by the affectations between the two composition Nodes
// If there is no affectation between them, the condition is always true
// If there is one affectation between them, the condition is this affectation activation
// If there are  more than on affectation between them, it is more complicated
function findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, node) {// Parameter fromWhichSide is 1 or 2, depending on which side of the "=" we are coming from.
  // We visit only nodes on the other side of the "=" sign (hence the "3-fromWhichSide" expressions )
  function visitTheAffectation(n, fromWhichSide) {n.temporarilyMarkedDuringCompositionTraversal = true;var conditionForCurrentAffectation = graph.matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: n, index: 0 }, to: { node: { type: 'InteractionInstance' } } }).map(function (e) {return e.to;}).value();var compos = graph.matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: n }, to: { index: 0, node: { type: 'InteractionInstance', unSuitableForCompositionReduction: false, content: { type: 'InteractionSimple', operatorType: 'Composition' } } } }).filter(function (e) {return e.from.index === 3 - fromWhichSide && e.to.node.temporarilyMarkedDuringCompositionTraversal !== true;}).map(function (e) {return { compositionNode: e.to.node, condition: conditionForCurrentAffectation };}).value();var otheraffects = graph.matchUndirectedEdges({ typae: 'InteractionInstanceOperand', from: { node: n }, to: { node: { type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Affectation' } } } }).filter(function (e) {return e.from.index === 3 - fromWhichSide && (e.to.index === 1 || e.to.index === 2) && e.to.node.temporarilyMarkedDuringCompositionTraversal !== true;}).map(function (e) {return visitTheAffectation(e.to.node);}).flatten().map(function (x) {return { compositionNode: x.compositionNode, condition: x.condition.concat(conditionForCurrentAffectation) };}).value();n.temporarilyMarkedDuringCompositionTraversal = false;return compos.concat(otheraffects);}node.temporarilyMarkedDuringCompositionTraversal = true; //
  var compos = graph.matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: node, index: 0 }, to: { index: 0, node: { type: 'InteractionInstance', unSuitableForCompositionReduction: false, content: { type: 'InteractionSimple', operatorType: 'Composition' } } } }).map(function (e) {graph.finish(e);return { compositionNode: e.to.node, condition: [] };}).value();var otheraffects = graph.matchUndirectedEdges({ type: 'InteractionInstanceOperand', from: { node: node, index: 0 }, to: { node: { type: 'InteractionInstance', content: { type: 'InteractionSimple', operatorType: 'Affectation' } } } }).filter(function (e) {return e.to.index === 1 || e.to.index === 2;}).map(function (e) {graph.finish(e);return visitTheAffectation(e.to.node, e.to.index);}).flatten().value();node.temporarilyMarkedDuringCompositionTraversal = false;var res = compos.concat(otheraffects);return res; // return compos;
} //TODO This Might eventually be the source of Bugs and has not been tested on edges cases
// Here we take several paths that go to composition interactions and simplfy them based on their conditions
function simplifyPathExpression(graph, p) {var reduced = (0, _lodash2.default)(p).groupBy('compositionNode.id') // We group path that go to the same target
  .map(function (x) {return (// For each of these groups
      { compositionNode: x[0].compositionNode, // Merge target interactions by taking the first
        condition: (0, _lodash2.default)(x).pluck('condition').map(function (y) {return _lodash2.default.unique(y, function (z) {return z.node.id + " " + z.index;});}).value() // Merge conditions, and remove duplicates conditions from paths
      });}).flatten() // Now the condition for each target is an array (disjunction) of paths (conjunction)
  .forEach(function (x) {var allConds = (0, _lodash2.default)(x.condition).flatten().map(function (c) {return { cond: c, stringRep: c.node.id + " " + c.index };}).unique('stringRep').value();if (allConds.length == 0) {x.simplifiedCond = null;} else {if (allConds.length == 1) {// We do not have to create a new Synthetic node in this case
        x.simplifiedCond = x.condition[0][0];} else {var satProblem = (0, _lodash2.default)(x.condition).map(function (y) {return (0, _lodash2.default)(y).map(function (c) {return c.node.id + " " + c.index;}).value();}).value(); //           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        //           console.log(_.pluck(allConds,'stringRep'));
        // console.log(satProblem);
        //           console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        var solution = _satSolver2.default.solvePath(_lodash2.default.pluck(allConds, 'stringRep'), satProblem); // console.log(solution);
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        var newNode = graph.addNode({ type: 'InteractionInstance', content: { type: 'InteractionNative', content: "TBD" } });var allEdgesToConds = (0, _lodash2.default)(allConds).map(function (c, index) {return { cond: c.cond, stringRep: c.stringRep, edge: graph.addEdge({ type: 'InteractionInstanceOperand', from: { index: index + 1, node: newNode, ports: { type: 'InterfaceAtomic', direction: 'in', data: { type: 'DataAtomic', name: 'Activation' } } }, to: c.cond }) };}).value();var code = (0, _lodash2.default)(solution).map(function (s) {var solcode = "if( ";solcode = solcode + (0, _lodash2.default)(s).map(function (value, index) {return '( <%=a' + (index + 1) + '%>' + ' === ' + (value ? 'active' : 'inactive') + ' )';}).join(' && ');solcode = solcode + ") {\n  <%=a0%> = active;\n} else {\n  <%=a0%> = inactive;\n}";return solcode;}).join("\n"); // console.log(code);
        newNode.content.content = code;newNode.ports = [{ type: 'InterfaceAtomic', direction: 'out', data: { type: 'DataAtomic', name: 'Activation' } }].concat(_lodash2.default.map(allConds, { type: 'InterfaceAtomic', direction: 'in', data: { type: 'DataAtomic', name: 'Activation' } })); // console.log('ffffffffffffffffffffffffffffffffffffffffffffffffff');
        x.simplifiedCond = { index: 0, node: newNode, ports: { type: 'InterfaceAtomic', direction: 'out', data: { type: 'DataAtomic', name: 'Activation' } } };}}}).value(); // compositionNode
  // returns something which contains a key "simplified cond" which is a graph node that regroupd all conditions
  return reduced;} // This is an important graph transform. It deals with the mess of having several linked composition interaction
function matchingCompositionReduction(graph) {// // Mark all
  graph.matchNodes({ type: 'InteractionInstance', content: { type: 'InteractionSimple' } }).forEach(function (theNode) {theNode.unSuitableForCompositionReduction = false;theNode.didCompositionReduction = false;}).commit(); // Now that's tricky !
  // First we find composition nodes that arent treated yet
  graph.reduceNodes({ type: 'InteractionInstance', unSuitableForCompositionReduction: false, content: { type: 'InteractionSimple', operatorType: 'Composition' } }, function (theResult, n1) {var matchingCompoNodes = simplifyPathExpression(graph, findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, n1));

    // console.log("       ");
    // console.log("       ");
    // console.log("       ");
    // console.log("       ");
    // console.log("WWOWOUOUOOUUOOUOUOU");
    // console.log(n1);
    // console.log("       ");
    // console.log(matchingCompoNodes.map(x=>({id:(x.compositionNode.id ),cc:(x.simplifiedCond===null)?"":x.simplifiedCond.node.id, condition:JSON.stringify(x.condition.map(y=>y.map(z=>z.node.id)))})));
    // console.log("       ");
    // console.log("       ");
    // console.log("       ");
    //


    (0, _lodash2.default)(matchingCompoNodes).
    forEach(function (x) {
      var n2 = x.compositionNode;
      // console.log("NULLLLSIMPLEONDDDDDDDD");
      // console.log(x.simplifiedCond);
      if (_lodash2.default.isNull(x.simplifiedCond)) {

        // console.log("ok");

        // No simplified condition because the two composition are linked directly
        // For each edge going to the matching node, we add an edge that goes to the current node with a special label on the ports so we dont confuse with edges that already go to it
        graph.
        matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: n2 } }).


        reject(function (e2) {return _lodash2.default.isUndefined(e2.from.compositionElementName);}).
        forEach(function (e2) {
          // console.log(d2.id);
          var d2 = e2.to;
          // console.log(d2.node.id);
          if (d2.node === n2) d2 = {
            node: n1,
            coCompositionElementName: e2.to.compositionElementName,
            isCoPort: true };

          // console.log(d2.node.id);
          graph.
          addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: n1,
              coCompositionElementName: e2.from.compositionElementName,
              isCoPort: true },

            to: d2 });

        }).
        commit();

        // We can mark this node as done
        n1.didCompositionReduction = true;
        n2.didCompositionReduction = true;
      } else {
        // There are affectation nodes between the two composition but
        // We have a simplified condition available at x.simplifiedCond

        // console.log("pb");
        graph.
        matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: n2 } }).


        reject(function (e2) {return _lodash2.default.isUndefined(e2.from.compositionElementName);}).
        forEach(function (e2) {

          var d2 = e2.to;
          if (d2.node === n2) d2 = {
            node: n1,
            coCompositionElementName: e2.to.compositionElementName,
            isCoPort: true };


          var intermedAffectation =
          graph.
          addNode({
            type: 'InteractionInstance',
            content: {
              type: 'InteractionSimple',
              operator: '$=$',
              operatorType: 'Affectation' },

            ports: [{ type: 'InterfaceAtomic', direction: 'in', data: { type: 'DataAtomic', name: 'Activation' } }] });


          graph.
          addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: n1,
              coCompositionElementName: e2.from.compositionElementName,
              isCoPort: true },

            to: {
              node: intermedAffectation,
              index: 1 } });



          graph.
          addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: intermedAffectation,
              index: 2 },

            to: d2 });


          graph.
          addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: intermedAffectation,
              index: 0 },

            to: x.simplifiedCond });

        }).
        commit();
        // We can mark this node as done
        n1.didCompositionReduction = true;
        n2.didCompositionReduction = true;
        // We have to add custom affectation and use the sat solver
        // throw new Error ("The condition of a multiple assignement between compositions failed to be simplified");
      }


    }).
    commit();


    n1.unSuitableForCompositionReduction = true;

  });


  // gexport(graph,"bob");

  // exportGraph(graph.toDot(),"bob"+_.uniqueId());

  // Now its time to reduce all this mess !
  graph.
  matchNodes({
    type: 'InteractionInstance',
    didCompositionReduction: true }).

  forEach(function (n1) {
    // console.log("-----------------------------------------------");
    // console.log(n1.id);
    // gexport(graph,n1.id);

    // Lets build a graph of the situation inside the Composition Node. Wiring between ports and co ports
    // Each Node of the internal graph represents a ports of the Composition node
    var internalGraph = new Graph();
    internalGraph.type = 'internal';

    var coPortsFrom =
    graph.
    matchDirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: n1 } }).


    filter(function (x) {return x.from.isCoPort === true;}).
    filter(function (x) {return x.from.coCompositionElementName !== undefined;}).
    map(function (x) {return {
        type: 'coPort',
        ports: x.from,
        closed: false,
        node: x.to.node,
        target: x.to };}).

    value();

    var coPortsTo =
    graph.
    matchDirectedEdges({
      type: 'InteractionInstanceOperand',
      to: {
        node: n1 } }).


    filter(function (x) {return x.to.isCoPort === true;}).
    filter(function (x) {return x.to.coCompositionElementName !== undefined;}).
    map(function (x) {return {
        type: 'coPort',
        ports: x.to,
        closed: false,
        node: x.from.node,
        target: x.from };}).

    value();

    var coPortNodes = {};
    (0, _lodash2.default)([coPortsFrom, coPortsTo]).
    flatten().
    sortBy("ports.coCompositionElementName").
    unique(true, "ports.coCompositionElementName").
    forEach(function (x) {
      coPortNodes[x.ports.coCompositionElementName] = internalGraph.addNode(x);
    }).
    commit();

    var portsFrom =
    graph.
    matchDirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: n1 } }).


    filter(function (x) {return x.from.isCoPort !== true;}).
    filter(function (x) {return x.from.compositionElementName !== undefined;}).
    map(function (x) {return {
        type: 'port',
        ports: x.from,
        closed: false,
        node: x.to.node,
        target: x.to };}).

    value();

    var portsTo =
    graph.
    matchDirectedEdges({
      type: 'InteractionInstanceOperand',
      to: {
        node: n1 } }).


    filter(function (x) {return x.to.isCoPort !== true;}).
    filter(function (x) {return x.to.compositionElementName !== undefined;}).
    map(function (x) {return {
        type: 'port',
        ports: x.to,
        closed: false,
        node: x.from.node,
        target: x.from };}).

    value();

    var portNodes = {};
    (0, _lodash2.default)([portsFrom, portsTo]).
    flatten().
    sortBy("ports.compositionElementName").
    unique(true, "ports.compositionElementName").
    forEach(function (x) {
      portNodes[x.ports.compositionElementName] = internalGraph.addNode(x);
    }).
    commit();

    //
    // console.log('-----------------------------------');
    // gexport(internalGraph,n1.id+"internal-1");

    // Connect Ports with their respective coPorts in the internal graph, this is semantics of the composition
    internalGraph.
    matchNodes({
      ports: {
        isCoPort: true } }).


    forEach(function (n1) {
      internalGraph.
      matchNodes({
        ports: {
          compositionElementName: n1.ports.coCompositionElementName } }).


      filter(function (x) {return x.ports.isCoPort !== true;}).
      forEach(function (n2) {return (
          internalGraph.
          addEdge({
            type: 'normal',
            mul: true,
            from: {
              node: n1 },

            to: {
              node: n2 } }));}).


      commit();
    }).
    commit();

    // Add loops between ports of the composition node to the internal graph
    graph.
    matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: n1 },

      to: {
        node: n1 } })


    // .forEach(e=>{
    //         console.log('aaaaa '+e.id+ " "+e.from.compositionElementName+ " "+e.from.coCompositionElementName+ " "+e.to.compositionElementName+ " "+e.to.coCompositionElementName);
    // })
    .reject(function (e) {return _lodash2.default.isUndefined(e.from.compositionElementName) && _lodash2.default.isUndefined(e.from.coCompositionElementName) || _lodash2.default.isUndefined(e.to.compositionElementName) && _lodash2.default.isUndefined(e.to.coCompositionElementName);}).
    forEach(function (e) {
      // console.log('iiii '+e.id);
      var origin = e.from.isCoPort === true ? coPortNodes[e.from.coCompositionElementName] : portNodes[e.from.compositionElementName];
      var dest = e.to.isCoPort === true ? coPortNodes[e.to.coCompositionElementName] : portNodes[e.to.compositionElementName];
      internalGraph.addEdge({
        type: 'loop',
        mul: true,
        from: {
          node: origin },

        to: {
          node: dest } });


    }).
    commit();

    // console.log('-----------------------------------');
    // gexport(internalGraph,n1.id+"internal-2");

    //FIXME Need to use a proper closure algorithm.
    // Transitively close the internal graph
    internalGraph.
    reduceNodes({
      closed: false },
    function (theResult, theNode) {
      // console.log("  > "+theNode.id);
      internalGraph.
      matchUndirectedEdges({
        from: {
          node: theNode
          //,
          // to: {
          //   node: {
          //     closed: false
          //   }
          // }
        } }).
      forEach(function (e1) {
        internalGraph.
        matchUndirectedEdges({
          from: {
            node: theNode
            //,
            // to: {
            //   node: {
            //     closed: false
            //   }
            // }
          } }).
        filter(function (e2) {return e2.id !== e1.id;}).
        forEach(function (e2) {
          // console.log("close "+e1.to.node.id+" "+e2.to.node.id);
          // gexport(internalGraph,n1.id+"close "+e1.id);
          if (_lodash2.default.isEmpty(internalGraph.findUndirectedEdge({
            from: {
              node: e1.to.node },

            to: {
              node: e2.to.node } })))

          {
            internalGraph.
            addEdge({
              type: 'closure',
              mul: true,
              from: {
                node: e1.to.node },

              to: {
                node: e2.to.node } });


          }
        }).
        commit();
      }).
      commit();
      theNode.closed = true;
    });

    // console.log('-----------------------------------');
    // exportGraph(internalGraph.toDot2(),n1.id+"internal-3");

    // // Remove multiple edges on the internal graph
    // internalGraph
    // .reduceDirectedEdges({mul:true},
    // (theResult,theEdge)=>{
    //   internalGraph
    //   .matchDirectedEdges({from:{node:theEdge.from.node},to:{node:theEdge.to.node}})
    //   .union(
    //     internalGraph
    //     .matchDirectedEdges({to:{node:theEdge.from.node},from:{node:theEdge.to.node}})
    //     .value())
    //   .reject(e=>(e===theEdge))
    //   .forEach(e=>internalGraph.finish(e))
    //   .commit();
    //   theEdge.mul=false;
    //   theEdge.type='single';
    // });

    // console.log('-----------------------------------');
    // gexport(internalGraph,n1.id+"internal-4");

    // Ok ! Now the internal graph is complete, we can start wiring edges in the main graph
    internalGraph.
    matchUndirectedEdges(
    {
      from: { node: { type: 'coPort' } },
      to: { node: { type: 'port' } } }).


    forEach(function (internalEdge) {
      // console.log("xxxx")
      graph.
      matchUndirectedEdges({
        from: {
          node: n1,
          coCompositionElementName: internalEdge.from.node.ports.coCompositionElementName } }).


      forEach(function (coEdge) {
        graph.
        matchUndirectedEdges({
          from: {
            node: n1,
            compositionElementName: internalEdge.to.node.ports.compositionElementName } }).


        forEach(function (edge) {
          // console.log("ADD  "+coEdge.to.node.id+" "+edge.to.node.id);
          graph.
          addEdge({
            type: 'InteractionInstanceOperand',
            from: coEdge.to,
            to: edge.to });

        }).
        commit();
      }).
      commit();
    }).
    commit();

    // internalGraph
    //         .matchUndirectedEdges(
    //           {
    //             from: { node:{type:'port'}},
    //             to: {node:{type:'port'}}
    //           }
    //         )
    //         // .tap(x=>{console.log("internal ");console.log(x);})
    //         // .filter(x => (x.to.node.ports.isCoPort !== true && x.from.node.ports.isCoPort === true) || (x.to.node.ports.isCoPort === true && x.from.node.ports.isCoPort !== true))
    //         .forEach(internalEdge => {
    //           // console.log("xxxx")
    //           graph
    //             .matchUndirectedEdges({
    //               from: {
    //                 node: n1,
    //                 compositionElementName: internalEdge.from.node.ports.compositionElementName
    //               }
    //             })
    //             .forEach(coEdge => {
    //               graph
    //                 .matchUndirectedEdges({
    //                   from: {
    //                     node: n1,
    //                     compositionElementName: internalEdge.to.node.ports.compositionElementName
    //                   }
    //                 })
    //                 .forEach(edge => {
    //                   // console.log("ADD  "+coEdge.to.node.id+" "+edge.to.node.id);
    //                   graph
    //                     .addEdge({
    //                       type: 'InteractionInstanceOperand',
    //                       from: coEdge.to,
    //                       to: edge.to
    //                     });
    //                 })
    //                 .commit();
    //             })
    //             .commit();
    //         })
    //         .commit();


    // internalGraph
    //         .matchUndirectedEdges(
    //           {
    //             from: { node:{type:'coPort'}},
    //             to: {node:{type:'coPort'}}
    //           }
    //         )
    //         // .tap(x=>{console.log("internal ");console.log(x);})
    //         // .filter(x => (x.to.node.ports.isCoPort !== true && x.from.node.ports.isCoPort === true) || (x.to.node.ports.isCoPort === true && x.from.node.ports.isCoPort !== true))
    //         .forEach(internalEdge => {
    //           // console.log("xxxx")
    //           graph
    //             .matchUndirectedEdges({
    //               from: {
    //                 node: n1,
    //                 coCompositionElementName: internalEdge.from.node.ports.coCompositionElementName
    //               }
    //             })
    //             .forEach(coEdge => {
    //               graph
    //                 .matchUndirectedEdges({
    //                   from: {
    //                     node: n1,
    //                     coCompositionElementName: internalEdge.to.node.ports.coCompositionElementName
    //                   }
    //                 })
    //                 .forEach(edge => {
    //                   // console.log("ADD  "+coEdge.to.node.id+" "+edge.to.node.id);
    //                   graph
    //                     .addEdge({
    //                       type: 'InteractionInstanceOperand',
    //                       from: coEdge.to,
    //                       to: edge.to
    //                     });
    //                 })
    //                 .commit();
    //             })
    //             .commit();
    //         })
    //         .commit();




  }).
  commit();

  // Finally we finish the treated composition nodes
  graph.
  matchNodes({
    type: 'InteractionInstance',
    didCompositionReduction: true,
    content: {
      type: 'InteractionSimple',
      operatorType: 'Composition' } }).


  forEach(function (theNode) {
    // console.log('finish');
    // console.log(theNode);
    graph.finish(theNode);
  }).
  commit();


  // TODO LOOP all this until fixed point (no new composition matches)


}