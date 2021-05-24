"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =












linkIdentifiers;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _exportGraph = require('../exportGraph');var _exportGraph2 = _interopRequireDefault(_exportGraph);var _serializer = require('../serializer');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Here the goal is to find identifiers, and for each one, link its reference nodes to its co reference nodes
function linkIdentifiers(graph) {// Find identifier nodes
  graph.
  matchNodes({
    type: 'InteractionInstance',
    content: {
      type: 'InteractionSimple',
      operatorType: 'Identifier' } }).


  forEach(function (theNode) {
    // Each identifier node should be associated with at most one identifier (if referential transparency worked ok)
    var theReferenceNode =
    graph.
    matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: theNode,
        index: 0 },

      to: {
        node: {
          type: 'InteractionInstance',
          content: {
            type: 'InteractionSimple',
            operatorType: 'Reference' } },


        index: 1 } }).


    map(function (theEdge) {return theEdge.to.node;}).
    value();

    if (theReferenceNode.length > 1) {
      throw new Error('Fatal: referentialTransparency failed, there are two references to identifier ' + (0, _serializer.serialize)(theNode.content));
    } else if (theReferenceNode.length < 1) {
      // console.log("No reference for " + serialize(theNode.content));
      return; // Nothing to do in this case
    } else {
      theReferenceNode = theReferenceNode[0]; // We take the only element of the set
    }

    // Each identifier node should be associated with at most one CO identifier (if referential transparency worked ok)
    var theCoReferenceNode =
    graph.
    matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: theNode,
        index: 0 },

      to: {
        node: {
          type: 'InteractionInstance',
          content: {
            type: 'InteractionSimple',
            operatorType: 'CoReference' } },


        index: 1 } }).


    map(function (theEdge) {return theEdge.to.node;}).
    value();

    if (theCoReferenceNode.length > 1) {
      throw new Error('Fatal: referentialTransparency failed, there are two co references to identifier ' + (0, _serializer.serialize)(theNode.content));
    } else if (theCoReferenceNode.length < 1) {
      // console.log("No CO reference for " + serialize(theNode.content));
      return; // Nothing to do in this case
    } else {
      theCoReferenceNode = theCoReferenceNode[0]; // We take the only element of the set
    }

    // Now we have the reference and the CO reference to the same identifier node, we just have to link them
    graph.
    matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: theReferenceNode,
        index: 0 } }).


    forEach(function (theEdge) {
      graph.
      matchUndirectedEdges({
        type: 'InteractionInstanceOperand',
        from: {
          node: theCoReferenceNode,
          index: 0 } }).


      forEach(function (theCoEdge) {
        graph.
        addEdge({
          type: 'InteractionInstanceOperand',
          from: theEdge.to,
          to: theCoEdge.to });

      }).
      commit();
    }).
    commit();
  }).
  commit();




  // In the end we can remove all identifier, reference and coreference nodes
  graph.
  matchNodes({
    type: 'InteractionInstance',
    content: {
      type: 'InteractionSimple',
      operatorType: 'Identifier' } }).


  forEach(function (theNode) {return graph.finish(theNode);}).
  commit();

  graph.
  matchNodes({
    type: 'InteractionInstance',
    content: {
      type: 'InteractionSimple',
      operatorType: 'Reference' } }).


  forEach(function (theNode) {return graph.finish(theNode);}).
  commit();

  graph.
  matchNodes({
    type: 'InteractionInstance',
    content: {
      type: 'InteractionSimple',
      operatorType: 'CoReference' } }).


  forEach(function (theNode) {return graph.finish(theNode);}).
  commit();
}





// export default function linkIdentifiers(graph) {
//   graph
//     .reduceNodes({
//       type: 'InteractionInstance',
//       content: {
//         operatorType: 'Identifier'
//       }
//     }, (theResut, theNode) => {
//
//       if (!_(theNode.content.operator).endsWith('?') && !_(theNode.content.operator).endsWith('!')) {
//         // Simple identifier situation
//         graph
//           .matchUndirectedEdges({
//             type: 'InteractionInstanceOperand',
//             to: {
//               node: theNode,
//               index: 0
//             }
//           })
//           .map(e1 =>
//             graph
//             .matchUndirectedEdges({
//               type: 'InteractionInstanceOperand',
//               to: {
//                 node: theNode,
//                 index: 0
//               }
//             })
//             .filter(x => (x.id > e1.id)) // Only one way
//             .map(e2 =>
//               graph
//               .addEdge({
//                 type: 'InteractionInstanceOperand',
//                 from: e1.from,
//                 to: e2.from,
//                 createdByEliminatingIdentifier: true,
//                 meta: theNode.meta
//               }))
//             .commit())
//           .commit();
//         graph
//           .finish(theNode);
//       } else {
//         // Oriented identifier situation (identifiers with ! or ? in the end, like (x?) or (my var !)  )
//
//
//
//         //Similar situation to referential transparency, we need to find nodes with matching operators and children
//         let theChildrenEdges =
//           graph
//           .matchUndirectedEdges({
//             type: 'InteractionInstanceOperand',
//             from: {
//               node: theNode
//             }
//           })
//           .filter(e => e.from.index > 0) // Only children, not the parent which has index 0
//           .value();
//
//
//         if (_(theChildrenEdges).every(edg => edg.to.node.content.operatorType !== 'Identifier'))
//
//         {
//
//           // We find the node which has the opposite situation (? instead of ! or vice versa)
//           let operator = theNode.content.operator;
//           let suffix = operator.slice(-1);
//           let coSuffix = (suffix === '!') ? '?' : '!';
//           let coOperator = operator.slice(0, -1) + coSuffix;
//           let coNode =
//             graph
//             .matchNodes({
//               type: 'InteractionInstance',
//               content: {
//                 operator: coOperator
//               }
//             }) // Co operator
//             .filter(n => // All chidren of similarNode are children of theNode
//               graph
//               .matchUndirectedEdges({
//                 type: 'InteractionInstanceOperand',
//                 from: {
//                   node: n
//                 }
//               })
//               .filter(e => e.from.index > 0) // We check for similarity of children only, not parents !
//               .every(e =>
//                 _(theChildrenEdges)
//                 .filter({
//                   from: {
//                     index: e.from.index
//                   },
//                   to: {
//                     index: e.to.index,
//                     node: e.to.node
//                   }
//                 })
//                 .size() === 1))
//             .filter(n => // All children of theNode are children of the similarNode
//               _(theChildrenEdges)
//               .every(ce =>
//                 graph
//                 .matchUndirectedEdges({
//                   type: 'InteractionInstanceOperand',
//                   from: {
//                     node: n
//                   }
//                 })
//                 .filter(e => e.from.index > 0)
//                 .filter({
//                   from: {
//                     index: ce.from.index
//                   },
//                   to: {
//                     index: ce.to.index,
//                     node: ce.to.node
//                   }
//                 })
//                 .size() === 1))
//             .tap(x => {
//               if (x.length > 1) {
//                 throw new Error('Fatal: referentialTransparency failed, we found more than one similar coNodes for an identifier');
//               } else if (x.length < 1) {
//                 // console.log("Single edge");
//               }
//             })
//             .first();
//
//
//           //
//           // console.log(theNode.content.operator);
//           // console.log(coNode.content.operator);
//           if (!_.isUndefined(coNode)) {
//             graph
//               .matchUndirectedEdges({
//                 type: 'InteractionInstanceOperand',
//                 to: {
//                   node: theNode,
//                   index: 0
//                 }
//               })
//               .map(e1 =>
//                 graph
//                 .matchUndirectedEdges({
//                   type: 'InteractionInstanceOperand',
//                   to: {
//                     node: coNode,
//                     index: 0
//                   }
//                 })
//                 .map(e2 =>
//                   graph
//                   .addEdge({
//                     type: 'InteractionInstanceOperand',
//                     from: e1.from,
//                     to: e2.from,
//                     createdByEliminatingIdentifier: true,
//                     meta: theNode.meta //TODO merge meta of theNode and coNode
//                   }))
//                 .commit())
//               .commit();
//
//
//
//             graph
//               .finish(coNode);
//
//           }
//
//           graph
//             .finish(theNode);
//         }
//
//       }
//
//       console.log('exxx');
//       exportGraph(graph.toDot(), "okk" + _.uniqueId());
//
//     });
// }