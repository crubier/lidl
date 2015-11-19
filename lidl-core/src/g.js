// "use strict"
//
// let _ =require( 'lodash');
//
// class Graph {
//   constructor (){
//     this.nodes = [];
//     this.edges = [];
//   }
//
//   edgesOfType(type) {
//     if (type===undefined) {
//       return this.edges;
//     } else {
//       return _.filter(this.edges,(e)=>(e.type===type));
//     }
//   }
//
//   addNode(object) {
//
//   }
//
//   function invert(edge) {
//     var res = _.clone(edge);
//     var _from = res.from;
//     var _to = res.to;
//     res.from = _to;
//     res.to = _from;
//     return res;
//   }
//
//
// }
//
// module.exports = Graph;
//
// console.log( "ok");
//
// function invert(edge) {
//   var res = _.clone(edge);
//   var _from = res.from;
//   var _to = res.to;
//   res.from = _to;
//   res.to = _from;
//   return res;
// }
//
//
//
//
//
// // Find connections between two nodes with specific ports
// function findEdgesPorts(graph, nodeA,indexA, nodeB,indexB) {
//   return _.union(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeA,
//         index: indexA
//       },
//       to: {
//         node: nodeB,
//         index: indexB
//       }
//     }),
//     _.map(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeB,
//         index: indexB
//       },
//       to: {
//         node: nodeA,
//         index: indexA
//       }
//     }), invert));
// }
//
// // Find connections between two nodes with specific ports
// function findEdgesPort(graph, nodeA,indexA, nodeB) {
//   return _.union(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeA,
//         index: indexA
//       },
//       to: {
//         node: nodeB
//       }
//     }),
//     _.map(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeB
//       },
//       to: {
//         node: nodeA,
//         index: indexA
//       }
//     }), invert));
// }
//
// // Find connections between two nodes
// function findEdge(graph, nodeA, nodeB) {
//   return _.union(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeA
//       },
//       to: {
//         node: nodeB
//       }
//     }),
//     _.map(_.filter(graph.edges, {
//       type: 'AstEdge',
//       finished: false,
//       from: {
//         node: nodeB
//       },
//       to: {
//         node: nodeA
//       }
//     }), invert));
// }
//
// // Connect two nodes with given port indices
// function connect(graph, nodeA, indexA, nodeB, indexB) {
//   var res = {
//     type: 'AstEdge',
//     id: _.uniqueId('edge'),
//     finished: false,
//     from: {
//       node: nodeA,
//       index: indexA
//     },
//     to: {
//       node: nodeB,
//       index: indexB
//     }
//   }
//   graph.edges.push(res);
//   return res;
// }
