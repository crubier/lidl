"use strict"
var serializer = require('./serializer.js');
var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var interfacs = require('./interfaces.js');
var parser = require('./parser.js');
var operator = require('./operator.js');
var _ = require('lodash');
var compilationResult = require('./compilerExampleResult.js');
var Graph = require('./g.js');

// var neo4j = require('neo4j');

function compileToJs(source, header) {
  //TODO Actual compilation

  return generateJsCode(compileToGraph(source), header);

}



function compileToIii(source) {
  return serializer.serialize(
    identifiers.reduceIdentifiers(
      interactions.expand(
        parser.parse(
          source
        )[0]
      ).interaction
    )
  );
}

function compileToGraph(source) {
  var graph = new Graph();
  var mainDef = parser.parse(source)[0];



  // TODO reduce the amount of processing on the next three lines and transform it into graph operations instead
  var interaction = addInteractionToGraph(graph, identifiers.reduceIdentifiers(interactions.expand(mainDef).interaction));
  //TODO Make it possible to compile interactiosn that have arguments and not just a single interface
  var interfac = addInterfaceToGraph(graph, mainDef.signature.interfac, 'theInterface');

  mergeByRootNode(graph, interaction, interfac);


  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);
  linkIdentifiers(graph);
  voidInteractionCreation(graph);
  behaviourSeparation(graph);
  functionLiteralLinking(graph);
  functionApplicationLinking(graph);
  previousNextLinking(graph);

// TODO Reorder compositions so they match
// reorderComposition(graph);

  tagCompositionElementEdges(graph);

  // matchingCompositionReduction(graph);

  // createDataFlowDirection(graph);
  // nonMatchingCompositionCompilation(graph);
  // createDataFlowDirection(graph);
  // nonMatchingDecompositionCompilation(graph);
  // createDataFlowDirection(graph);
  // resolveMultiplePorts(graph);
  // orderGraph(graph);
  // instantiateTemplates(graph);
  return graph;
}



function addInteractionToGraph(graph, interaction) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode = graph.addNode({type:'ast',content: interaction});
      let nodeOfOperand = _.map(interaction.operand, operand=> addInteractionToGraph(graph, operand));
      _(nodeOfOperand)
      .forEach((x, index) => {
        graph
        .addEdge({type:'ast',content:interaction,from:{node:rootNode,index:index+1},to:{node:x,index:0}})
      })
      .commit()
      break;
    case 'InteractionNative':
      rootNode = graph.addNode({type:'ast',content: interaction});
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }
  return rootNode;
}


function addInterfaceToGraph(graph, interfac, prefix) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      if (interfac.direction === "in") {
        rootNode =
        graph
        .addNode({type:'ast', content:{
          type: "InteractionNative",
          content: "<%=a0%>=" + prefix + ";\n"
        }, ports:["out"]});
      } else {
        rootNode =
        graph
        .addNode({type:'ast',content: {
          type: "InteractionNative",
          content: "" + prefix + "=<%=a0%>;\n"
        }, ports:["in"]});
      }
      break;
    case "InterfaceComposite":
      rootNode =
      graph
      .addNode({type:'ast', content:{
        type: "InteractionSimple",
        operator: interfacs.toOperator(interfac)
      }});
      let nodeOfElement = _.map(interfac.element, x => addInterfaceToGraph(graph, x.value, prefix + "." + x.key));
      _.forEach(nodeOfElement, (x, index) => graph.addEdge({type:'ast',content:interfac, from:{node: rootNode,index:index+1}, to:{node:x,index:0}}));
      break;
    default:
      throw "Cant transform this interface to a graph. Is it an interface really ?";
  }
  return rootNode;
}


function mergeByRootNode(graph, g1, g2) {
  graph
  .addEdge({type:'ast',content: 'root',from:{node:g1,index:0},to:{node:g2,index:0}});
}


function addOperatorTypeAnnotation(graph) {
    graph
    .matchNodes({type:'ast',content: {type: "InteractionSimple"}})
    .forEach(x => (x.content.operatorType = operator.parse(x.content.operator)))
    .commit();
}





// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {
  // First we mark all nodes as not referentialTransparencySolved
  graph
  .matchNodes({type: 'ast',content: {type: 'InteractionSimple'}})
  .forEach( (theNode) => {theNode.referentialTransparencySolved=false;})
  .commit();
  // Then iteratively
  graph
  .reduceNodes({type: 'ast',content: {type: 'InteractionSimple'},referentialTransparencySolved: false},
    (theResult,theNode)=>{
    let newNode =
      graph
      .addNode({type: 'ast',content: theNode.content,referentialTransparencySolved: true});
    let nodesSimilarToTheNode =
      graph
      .matchNodes({type:'ast',content: {type: 'InteractionSimple'},referentialTransparencySolved: false})
      .filter(x=>_.isEqual(x.content, theNode.content,(a, b)=>(interactions.compare(a, b) === 0)))
      .forEach(x=>
        graph
        .matchUndirectedEdges({type:'ast',to:{node:x}})
        .forEach(y=>
          graph
          .addEdge({type:'ast',from:y.from,to:{node:newNode,index:y.to.index}}))
        .commit())
      .forEach(x=>graph.finish(x))
      .tap(x=>(theNode.referentialTransparencySolved=true))
      .commit();
    });
}





function linkIdentifiers(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Identifier'}},
    (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
    .map(e1=>
      graph
      .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
      .filter(x=>(x.id > e1.id)) // Only one way
      .map(e2=>
        graph
        .addEdge({type:'ast',from:e1.from,to:e2.from}))
      .commit())
    .commit();
    graph
    .finish(theNode);
    });
}



// Here we create nodes for interactions that are empty
function voidInteractionCreation(graph) {

  graph
  .reduceNodes({content:{operatorType:"Void"}},
  (theResut,theNode)=>{
    let newNode = graph
      .addNode({content: {'type': 'InteractionNative', 'content': '/*Nothing, there was a void interaction*/\n'},ports: [],isVoid: true});
    graph
    .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
    .forEach(x=>graph
      .addEdge({type:'ast',from:x,to:{node:newNode,index:x.to.index}}))
    .commit();
    graph
    .finish(theNode);

  });
}


function behaviourSeparation(graph) {
  let activeSource =
    graph
    .addNode({type:'ast',content: {type: 'InteractionNative',content: '<%=a0%> = active;\n'},ports: ["out"]});

  graph
  .reduceNodes({type:'ast',content:{operatorType:"Behaviour"}},
  (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:2}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:activeSource,index:0},to:x.to}))
    .commit();
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode,index:1}})
      .forEach(y=>
        graph
        .addEdge({type:'ast',from:x.to,to:y.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}



function functionLiteralLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Function'}},
  (theResult,theNode)=>{
    let funcName = theNode.content.operator.substring(8);
    let source =
      graph
      .addNode({type:'ast',content:{type: 'InteractionNative','content': '<%=a0%> = ' + funcName + ';\n'},ports: ["out"]});
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

}



function functionApplicationLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'FunctionApplication'}},
  (theResult,theNode)=>{
    let source =
      graph
      .addNode({type:'ast',content:{type: 'InteractionNative',content: 'if(<%=a0%> === active) {<%=a3%> = <%=a1%>(<%=a2%>);}\n'},ports: ["in", "in", "in", "out"]});
    _(_.range(4))
    .forEach(i=>
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode,index:i}})
      .forEach(x=>
        graph
        .addEdge({type:'ast',from:{node:source,index:i},to:x.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}


function previousNextLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Previous'}},
  (theResult,theNode)=>{
    let stateId = _.uniqueId('state_');
    let source =
      graph
      .addNode({type:'ast',content:{'type': 'InteractionNative','content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\nnextState['" + stateId + "'] = <%=a2%>;\n}\n"},ports: ["in", "in", "in", "out"]});
    _(_.range(3))
    .forEach(i=>
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode,index:i}})
      .forEach(x=>
        graph
        .addEdge({type:'ast',from:{node:source,index:i},to:x.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });

}




function tagCompositionElementEdges(graph){

  graph
  .matchUndirectedEdges({type:'ast',from:{node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
  .forEach( theEdge => {
    if(theEdge.from.index>0)
    theEdge.from.compositionElementName =
      _(theEdge.from.node.content.operator)
      .words( /[^,:\{\}\$]+/g)[theEdge.from.index-1];
  })
  .commit();


}


//
function matchingCompositionReduction(graph) {
// // Mark all
//   graph
//   .matchUndirectedEdges({type:'ast',unSuitableForCompositionReduction:false,from:{index:0,node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}},to:{index:0,node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
//   .forEach( theEdge => (theEdge.unSuitableForCompositionReduction=false))
//   .commit();

// // Mark all
  graph
  .matchNodes({type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}})
  .forEach( theNode => (theNode.unSuitableForCompositionReduction=false))
  .commit();

  // Now that's tricky !
  graph
  .reduceNodes({type: 'ast',unSuitableForCompositionReduction:false,content: {type: 'InteractionSimple',operatorType:'Composition'}},
  (theResult,n1)=>{
    graph
    .matchUndirectedEdges({type: 'ast',from:{node:n1},to:{node:{type: 'ast',unSuitableForCompositionReduction:false,content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
    .forEach(middleEdge=>{
      let n2= middleEdge.to.node;
      graph
      .matchUndirectedEdges({type: 'ast',from:{node:n1}})
      .reject(e=>_.isUndefined(e.from.compositionElementName))
      .forEach(e1=>{
        let dest1 = [e1.to];
        // while(dest1.node ===n1 || dest1.node === n2 ) {
        //   if(dest1.node ===n1) {
        //
        //   }
        // }
        graph
        .matchUndirectedEdges({type: 'ast',from:{node:n2,compositionElementName:e1.from.compositionElementName}})
        .forEach(e2=>{
          let dest2 = [e2.to];
          graph
          .addEdge({type:'ast',from:dest1,to:dest2});})
        .commit();
        })
      .commit();})
    .commit();
    n1.unSuitableForCompositionReduction=true;
  });

  //
  // graph
  // .reduceUndirectedEdges({type:'ast',unSuitableForCompositionReduction:false,from:{index:0,node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}},to:{index:0,node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}}},
  // (theResult,theEdge)=>{
  //
  //     let n1 = theEdge.from.node;
  //     let n2 = theEdge.to.node;
  //
  //     if(n1 === n2) {
  //       throw "Bizarre configuration";
  //     } else {
  //       graph
  //       .matchUndirectedEdges({type:'ast',from:{node:n1}})
  //       .forEach(e1=>
  //         graph
  //         .matchUndirectedEdges({type:'ast',from:{node:n2,compositionElementName:e1.compositionElementName}})
  //         .forEach(e2=>{
  //           let end1 = e1.to;
  //           let end2 = e2.to;
  //           if(end1.node === n1) {
  //
  //           } else if (end1.node === n2){
  //
  //           }
  //
  //         })
  //         .commit())
  //       .commit();
  //     }
  //     graph
  //     .finish(n1);
  //     graph
  //     .finish(n2);
  //   // };
  //   theEdge.unSuitableForCompositionReduction = true;
  // });

}








//
// // TODO Extend functionality to deal with other nodes between composition interactions
// // TODO Extend functionality to deal with cases where more than 2 compositions are matching (because of identifier elimination)
// function matchingCompositionReduction(graph) {
//
//   // Here we try to match edges that are in the middle of matching and facing compositions
//   var matchEdge = function(x) {
//     if (x.to === undefined) return false;
//     if (x.from === undefined) return false;
//     if (x.from.content === undefined) return false;
//     if (x.to.content === undefined) return false;
//     if (x.to.index !== 0) return false;
//     if (x.from.index !== 0) return false;
//     return (x.unSuitableForCompositionReduction !== true && x.from.content.operatorType === "Composition" && x.from.finished !== true &&
//       x.to.content.operatorType === "Composition" && x.to.finished !== true && x.from.content.operator === x.to.content.operator);
//   };
//   var b = _.find(graph.edges, matchEdge);
//
//   while (b !== undefined) {
//
//     // Get the composition nodes at the extremities of this edge
//     var n1 = b.from;
//     var n2 = b.to;
//
//     var cond = true;
//
//     // i is the index of the current component
//     var i = 1;
//
//     // For each i
//     while (cond) {
//
//       // Get i-th edge going from the first composition
//       var e1 = _.find(graph.edges, {
//         'type': 'ast',
//         'from': n1,
//         'fromIndex': i,
//         'to': {
//           'finished': false
//         }
//       });
//       // Get i-th edge going from the second composition
//       var e2 = _.find(graph.edges, {
//         'type': 'ast',
//         'from': n2,
//         'fromIndex': i,
//         'to': {
//           'finished': false
//         }
//       });
//
//       // We should have found the two edges that we want to merge
//       if (e1 !== undefined && e2 !== undefined) {
//         // Destinations of the edges we are replacing
//         var dest1 = e1.to;
//         var i1 = e1.to.index;
//         var dest2 = e2.to;
//         var i2 = e2.to.index;
//
//         var targetEdge;
//
//         // Special case ! Deal with cases when edges loop onto the very composition interaction that we are destroying !
//
//         if (dest1 === n1) {
//           // first edge looping to first composition node
//           targetEdge = _.find(graph.edges, {
//             'type': 'ast',
//             'from': n2,
//             'fromIndex': i1,
//             'to': {
//               'finished': false
//             }
//           });
//           dest1 = targetEdge.to;
//           i1 = targetEdge.to.index;
//         } else if (dest1 === n2) {
//           // first edge looping to second composition node
//           targetEdge = _.find(graph.edges, {
//             'type': 'ast',
//             'from': n1,
//             'fromIndex': i1,
//             'to': {
//               'finished': false
//             }
//           });
//           dest1 = targetEdge.to;
//           i1 = targetEdge.to.index;
//         }
//
//         if (dest2 === n2) {
//           // second edge looping to first composition node
//           targetEdge = _.find(graph.edges, {
//             'type': 'ast',
//             'from': n1,
//             'fromIndex': i2,
//             'to': {
//               'finished': false
//             }
//           });
//           dest2 = targetEdge.to;
//           i2 = targetEdge.to.index;
//         } else if (dest2 === n1) {
//           // second edge looping to second composition node
//           targetEdge = _.find(graph.edges, {
//             'type': 'ast',
//             'from': n2,
//             'fromIndex': i2,
//             'to': {
//               'finished': false
//             }
//           });
//           dest2 = targetEdge.to;
//           i2 = targetEdge.to.index;
//         }
//
//         // Now that we sorted the correct destination nodes even in corner cases which involve self-loops, we can connect the nodes in question
//         // General Case
//         var edge1 = {
//           type: 'ast',
//           id: _.uniqueId("edge"),
//           to: dest1,
//           toIndex: i1,
//           from: dest2,
//           fromIndex: i2
//         };
//         var edge2 = {
//           type: 'ast',
//           id: _.uniqueId("edge"),
//           to: dest2,
//           toIndex: i2,
//           from: dest1,
//           fromIndex: i1
//         };
//         graph.edges.push(edge1);
//         graph.edges.push(edge2);
//         // console.log("ok");
//         cond = true;
//       } else {
//         cond = false;
//       }
//
//       // Go to next pair of components
//       i = i + 1;
//     }
//
//     // We connected all components, so the two composition nodes are finished
//     n1.finished = true;
//     n2.finished = true;
//     // And the edge is done
//     b.unSuitableForCompositionReduction = true;
//     // Find the next potential edge
//     b = _.find(graph.edges, matchEdge);
//
//   }
// }


function createDataFlowDirection(graph) {
  var matchEdge = function(x) {
    if (x.type !== 'ast') return false;
    if (x.flowManaged === true) return false;
    if (x.to === undefined || x.to.index === undefined) return false;
    if (x.from === undefined || x.from.index === undefined) return false;
    if (x.from.finished || x.to.finished) return false;
    if (x.to.ports === undefined) {
      x.to.ports = [];
      if (x.from.ports === undefined) {
        x.from.ports = [];
        return false;
      } else {
        return x.from.ports[x.from.index] === 'out';
      }
    } else {
      if (x.from.ports === undefined) {
        x.from.ports = [];
        return x.to.ports[x.to.index] === 'in';
      } else {
        return x.to.ports[x.to.index] === 'in' || x.from.ports[x.from.index] === 'out';
      }
    }
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {
    // console.log("Dataflow edge");
    var edge1 = {
      type: 'DataFlowEdge',
      from: b.from,
      fromIndex: b.from.index,
      to: b.to,
      toIndex: b.to.index,
      finished: false
    };
    if (!_.find(graph.edges, edge1)) {
      edge1.id = _.uniqueId("flow");
      // We add the edge only if it does not exist yet
      edge1.to.ports[edge1.to.index] = 'in';
      edge1.from.ports[edge1.from.index] = 'out';
      graph.edges.push(edge1);
    }

    b.flowManaged = true;
    var b = _.find(graph.edges, matchEdge);
  }
}



function nonMatchingCompositionCompilation(graph) {
  var matchEdge = function(x) {
    if (x.type !== 'DataFlowEdge') return false;
    if (x.finished === true) return false;
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.content === undefined) return false;
    if (x.to.content === undefined) return false;
    if (x.from.index !== 0) return false;
    if (x.from.content.type !== 'InteractionSimple') return false;
    if (x.unsuitableForNonMatchingCompositionReduction === true) return false;
    if (x.from.content.operatorType !== "Composition") return false;
    return true;
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {


    // Get the composition nodes at the extremity of this edge
    var n1 = b.from;
    // console.log(">>>>>>>>" + n1.content.operator);

    var op = _.words(_.trim(n1.content.operator, '{}'), /[^:$]+/g);

    // console.log(op);

    var code = "<%=a0%> = {};\n";
    var ports = ["out"];
    _.forEach(op, function(x, index) {
      code = code.concat("<%=a0%>['" + x + "'] = <%=a" + (index + 1) + "%>;\n");
      ports.push["in"];
    });


    // Create the new node
    var newNode = {
      'id': _.uniqueId("node"),
      'interaction': {
        'type': 'InteractionNative',
        'content': code
      },
      ports: ports,
      'finished': false
    };
    graph.nodes.push(newNode);

    var edge1 = {
      type: 'ast',
      id: _.uniqueId("edge"),
      to: b.to,
      toIndex: b.to.index,
      from: newNode,
      fromIndex: 0
    };
    var edge2 = {
      type: 'ast',
      id: _.uniqueId("edge"),
      to: newNode,
      toIndex: 0,
      from: b.to,
      fromIndex: b.to.index
    };
    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var i;

    for (i = 1; i <= op.length; i++) {

      _.forEach(_.filter(graph.edges, function(x) {
        return (x.type === 'ast' && x.to === b.from && x.to.index === i && x.from.finished !== true);
      }), function(x) {
        var edge3 = {
          type: 'ast',
          id: _.uniqueId("edge"),
          to: x.from,
          toIndex: x.from.index,
          from: newNode,
          fromIndex: i
        };
        var edge4 = {
          type: 'ast',
          id: _.uniqueId("edge"),
          to: newNode,
          toIndex: i,
          from: x.from,
          fromIndex: x.from.index
        };
        graph.edges.push(edge3);
        graph.edges.push(edge4);
      });


    }

    n1.finished = true;
    b.unsuitableForNonMatchingCompositionReduction = true;
    var b = _.find(graph.edges, matchEdge);
  }

}



function nonMatchingDecompositionCompilation(graph) {
  var matchEdge = function(x) {
    if (x.type !== 'DataFlowEdge') return false;
    if (x.finished === true) return false;
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.content === undefined) return false;
    if (x.to.content === undefined) return false;
    if (x.to.index !== 0) return false;
    if (x.to.content.type !== 'InteractionSimple') return false;
    if (x.unsuitableForNonMatchingDecompositionReduction === true) return false;
    if (x.to.content.operatorType !== "Composition") return false;
    return true;
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {


    // Get the composition nodes at the extremity of this edge
    var n1 = b.to;
    // console.log(">>>>>>>>" + n1.content.operator);

    var op = _.words(_.trim(n1.content.operator, '{}'), /[^:$]+/g);

    // console.log(op);

    var code = "";
    var ports = ["in"];
    _.forEach(op, function(x, index) {
      code = code.concat("<%=a" + (index + 1) + "%> = <%=a0%>['" + x + "'];\n");
      ports.push["out"];
    });


    // Create the new node
    var newNode = {
      'id': _.uniqueId("node"),
      'interaction': {
        'type': 'InteractionNative',
        'content': code
      },
      ports: ports,
      'finished': false
    };
    graph.nodes.push(newNode);

    var edge1 = {
      type: 'ast',
      id: _.uniqueId("edge"),
      to: b.from,
      toIndex: b.from.index,
      from: newNode,
      fromIndex: 0
    };
    var edge2 = {
      type: 'ast',
      id: _.uniqueId("edge"),
      to: newNode,
      toIndex: 0,
      from: b.from,
      fromIndex: b.from.index
    };
    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var i;

    for (i = 1; i <= op.length; i++) {

      _.forEach(_.filter(graph.edges, function(x) {
        return (x.type === 'ast' && x.from === b.to && x.from.index === i && x.to.finished !== true);
      }), function(x) {
        var edge3 = {
          type: 'ast',
          id: _.uniqueId("edge"),
          to: x.to,
          toIndex: x.to.index,
          from: newNode,
          fromIndex: i
        };
        var edge4 = {
          type: 'ast',
          id: _.uniqueId("edge"),
          to: newNode,
          toIndex: i,
          from: x.to,
          fromIndex: x.to.index
        };
        graph.edges.push(edge3);
        graph.edges.push(edge4);
      });


    }

    n1.finished = true;
    b.unsuitableForNonMatchingDecompositionReduction = true;
    var b = _.find(graph.edges, matchEdge);
  }

}








// Use tarjan algorithm to order the graph
function orderGraph(graph) {
  var matchUnmarkedNode = function(x) {
    return (x.finished !== true && x.markedDuringGraphOrdering !== true);
  };

  var orderingList = [];

  var b = _.find(graph.nodes, matchUnmarkedNode);
  while (b !== undefined) {
    visit(b);
    b = _.find(graph.nodes, matchUnmarkedNode);
  }


  function visit(n) {
    if (n.temporarilyMarkedDuringGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw "Error, the DAG contains cycles !"
    } else {
      if (n.markedDuringGraphOrdering !== true) {
        n.temporarilyMarkedDuringGraphOrdering = true;
        _.forEach(graph.nodes, function(m) {
          if (m.finished !== true && _.find(graph.edges, {
              type: 'DataFlowEdge',
              from: n,
              to: m,
              finished: false
            })) {
            visit(m);
          }
        });
        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }


  // _.forEach(_.filter(graph.nodes,matchUnmarkedNode),function(x){visit(x);});

  // The list is now ordered ! (Hopefully)
  //  We write the order in the nodes
  _.forEach(orderingList, function(node, index) {
    // console.log(index + "     " + node.content.content);
    node.executionOrder = index;
  });
  // console.log("There are "+orderingList.length+" nodes");
}


// TODO
// Here we solve the cases where several signals come or go from the same node with the same port number.
function resolveMultiplePorts(graph) {
  // var matchNode = function(x) {
  //   if (x.content === undefined) return false;
  //   return x.hasUniquePorts !== true && x.finished !== true;
  // };
  //
  // var b = _.find(graph.nodes, matchNode);
  // while (b !== undefined) {
  //   var i;
  //   // TODO extend i in case bigger interactions happen !
  //   var edgesNameList = {};
  //   for (i = 0; i < 1000; i++)  {
  //
  //     var incomingEdgesforCurrentI = _.filter(graph.edges, {
  //       type: 'DataFlowEdge',
  //       from: {
  //         finished: false
  //       },
  //       to: b,
  //       toIndex: i,
  //       finished: false
  //     });
  //     var outgoingEdgesforCurrentI = _.filter(graph.edges, {
  //       type: 'DataFlowEdge',
  //       to: {
  //         finished: false
  //       },
  //       from: b,
  //       fromIndex: i,
  //       finished: false
  //     });
  //   }
  //   if (_.isEmpty(incomingEdgesforCurrentI) && _.isEmpty(outgoingEdgesforCurrentI)) {
  //     //TODO We sequentially did the arguments of the node until we found a i for which there is no argument.
  //     // We are probably finished but are we sure ??....
  //     break;
  //   } else if ((incomingEdgesforCurrentI.length === 1 && outgoingEdgesforCurrentI.length === 0) || (incomingEdgesforCurrentI.length === 0 && outgoingEdgesforCurrentI.length === 1)) {
  //     // Nothing to do here, this port has no problem :-)
  //   } else if (incomingEdgesforCurrentI.length > 1 && outgoingEdgesforCurrentI.length === 0) {
  //     // Here we have a problem: several signals on the same port
  //     var inputPortCodeTemplate = "";
  //     var inputPortPorts = ['out'];
  //     _.forEach(incomingEdgesforCurrentI, function(x) {
  //       inputPortCodeTemplate = inputPortCodeTemplate + '';
  //       inputPortPorts.push('in');
  //     });
  //
  //   } else if (incomingEdgesforCurrentI.length === 0 && outgoingEdgesforCurrentI.length > 1) {} else {
  //     // TODO Same port used as multiple input and output...
  //   }
  //
  // }
  //
  // b.hasUniquePorts = true;
  //
  // var b = _.find(graph.nodes, matchNode);
}





// TODO finish tht
function instantiateTemplates(graph) {
  var matchNode = function(x) {
    if (x.content === undefined) return false;
    return x.content.type === "InteractionNative" && x.finished !== true && x.codeGeneration === undefined;
  };

  var b = _.find(graph.nodes, matchNode);
  while (b !== undefined) {
    var i;
    // TODO extend i in case bigger interactions happen !
    var edgesNameList = {};
    for (i = 0; i < 1000; i++)  {

      var incomingEdgesforCurrentI = _.filter(graph.edges, {
        type: 'DataFlowEdge',
        from: {
          finished: false
        },
        to: b,
        toIndex: i,
        finished: false
      });
      var outgoingEdgesforCurrentI = _.filter(graph.edges, {
        type: 'DataFlowEdge',
        to: {
          finished: false
        },
        from: b,
        fromIndex: i,
        finished: false
      });

      if (_.isEmpty(incomingEdgesforCurrentI) && _.isEmpty(outgoingEdgesforCurrentI)) {
        //TODO We sequentially did the arguments of the node until we found a i for which there is no argument.
        // We are probably finished but are we sure ??....
        break;
      } else if (incomingEdgesforCurrentI.length === 1 && outgoingEdgesforCurrentI.length === 0) {
        edgesNameList["a" + i] = incomingEdgesforCurrentI[0].id;
      } else if (incomingEdgesforCurrentI.length === 0 && outgoingEdgesforCurrentI.length === 1) {
        edgesNameList["a" + i] = outgoingEdgesforCurrentI[0].id;
      } else {
        throw 'Error: a node has several edges going on the same port'
      }
    }


    b.codeGeneration = {
      'js': _.template(b.content.content)(edgesNameList)
    };

    var b = _.find(graph.nodes, matchNode);
  }
}


function generateJsCode(graph, header) {
  var matchNode = function(x) {
    return x.codeGeneration !== undefined && x.executionOrder !== undefined && x.finished !== true;
  };

  var matchFlows = function(x) {
    return x.type === 'DataFlowEdge' && x.finished !== true && x.to.finished !== true && x.from.finished !== true;
  };

  var matchStateNode = function(x) {
    return x.containsAState === true && x.finished !== true;
  };


  var conf = {
    'edgesCode': _.map(_.filter(graph.edges, matchFlows), function(x) {
      return "var " + x.id + " = inactive;\n"
    }).join(""),
    'nodesCode': _.pluck(_.pluck(_.sortBy(_.filter(graph.nodes, matchNode), 'executionOrder'), 'codeGeneration'), 'js').join("\n"),
    'statesCode': _.map(_.pluck(_.filter(graph.nodes, matchStateNode), 'id'), function(x) {
      return x + ":null"
    }).join(",\n"),
    'customHeader': header,
    'standardHeader': jsStandardHeader
  };

  var transTemplate = "\
///////////////////////////////////////////////////////////////////////\n\
//Standard LIDL Header\n\n\
<%= standardHeader%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Custom LIDL Header\n\n\
<%= customHeader%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Declaration of variables\n\n\
<%= edgesCode%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Code of the DAG\n\n\
<%= nodesCode%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Return statement\n\n\
  return {\n\
      memo: {},\n\
      state: nextState,\n\
      args: {},\n\
      inter: theInterface\n\
    };\n";


  var initTemplate = "return {\n\
      memo: {},\n\
      state: {<%= statesCode%>},\n\
      args: {},\n\
      inter: {}\n\
    };\n";


  var transCode = _.template(transTemplate)(conf);
  var initCode = _.template(initTemplate)(conf);
  // console.log("==================================================================");
  // console.log(transCode);
  // console.log("==================================================================");
  // console.log(initCode);
  // console.log("==================================================================");
  return {
    transitionFunction: new Function("data", transCode),
    initializationFunction: new Function(initCode)
  };
}



var jsStandardHeader = '\
function clone(a){if(!a)return a;var c,b=[Number,String,Boolean];if(b.forEach(function(b){a instanceof b&&(c=b(a))}),"undefined"==typeof c)if("[object Array]"===Object.prototype.toString.call(a))c=[],a.forEach(function(a,b,d){c[b]=clone(a)});else if("object"==typeof a)if(a.nodeType&&"function"==typeof a.cloneNode)var c=a.cloneNode(!0);else if(a.prototype)c=a;else if(a instanceof Date)c=new Date(a);else{c={};for(var d in a)c[d]=clone(a[d])}else c=a;return c}\n\
\n\
var theInterface = clone(data.inter);\n\
var previousState = data.state;\n\
var nextState = clone(previousState);\n\
var active = 1;\n\
var inactive = null;\n\
';



module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.generateJsCode = generateJsCode;
module.exports.compileToGraph = compileToGraph;
