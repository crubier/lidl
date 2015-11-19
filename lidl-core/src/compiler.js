var serializer = require('./serializer.js');
var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var interfacs = require('./interfaces.js');
var parser = require('./parser.js');
var operator = require('./operator.js');
var _ = require('lodash');
var compilationResult = require('./compilerExampleResult.js');

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

  var mainDef = parser.parse(source)[0];

  // TODO reduce the amount of processing on the next three lines and transform it into graph operations instead
  var graphInteraction = interactionToGraph(identifiers.reduceIdentifiers(interactions.expand(mainDef).interaction));
  //TODO Make it possible to compile interactiosn that have arguments and not just a single interface
  var graphInterface = interfaceToGraph(mainDef.signature.interfac);
  var graph = mergeByRootNode(graphInteraction, graphInterface);


  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);
  linkIdentifiers(graph);
  behaviourSeparation(graph);
  functionLiteralLinking(graph);
  functionAppliationLinking(graph);
  previousNextLinking(graph);
  matchingCompositionReduction(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  createDataFlowDirection(graph);
  nonMatchingDecompositionCompilation(graph);
  createDataFlowDirection(graph);
  orderGraph(graph);
  instantiateTemplates(graph);
  return graph;
}

// Function to export graph into the dot format to visualise them
function graphToDot(graph) {
  var res = "graph lidl{";
  _.forEach(graph.nodes, function(x) {
    if (x.id === 'root') {
      res += (x.id + ' [shape=circle, label="root", fillcolor=yellow];');
      return;
    }
    if (x.interaction.type === 'InteractionSimple') {
      res += (x.id + ' [shape=ellipse, label="' + x.id + '\n' +x.interaction.operator + '", fillcolor=' + (x.finished ? '"blue"' : '"white"') + '];');
      return;
    }
    if (x.interaction.type === 'InteractionNative') {
      res += (x.id + ' [shape=box, label="' + ((x.executionOrder !== undefined) ? (x.executionOrder) : "") + "\n" + x.interaction.content + '", fillcolor=' + (x.finished ? '"blue"' : '"gray"') + '];');
      return;
    }
  });
  _.forEach(graph.edges, function(x) {
    if (x.type === 'AstEdge') {
      res += (x.from.id + ' -> ' + x.to.id + ' [label="' + /*x.type+ */ '", headlabel="' + x.toIndex + '", taillabel="' + x.fromIndex + '", dir="forward", arrowHead="normal"];');
      return;
    }
    if (x.type === 'DataFlowEdge') {
      res += (x.from.id + ' -> ' + x.to.id + ' [headlabel="' + x.toIndex + '", taillabel="' + x.fromIndex + '", dir="forward", arrowHead="normal", arrowsize=2, color="red"];');
      return;
    }
  });
  res += ('}');
  return res;
}

function interactionToGraph(interaction) {
  switch (interaction.type) {
    case 'InteractionSimple':
      {
        var result = {};
        var sub = _.map(interaction.operand, interactionToGraph);
        var rootNode = {
          type: 'InteractionNode',
          id: _.uniqueId("node"),
          interaction: interaction,
          finished: false
        };
        var newnodes = [rootNode];
        result.nodes = newnodes.concat(_.flatten(_.map(sub, 'nodes')));

        var newedges = _.flatten(_.map(sub, function(x, index) {
          // Add the edges to and from the current node
          return [{
            type: 'AstEdge',
            id: _.uniqueId("edge"),
            from: rootNode,
            fromIndex: (index + 1),
            to: x.root,
            toIndex: 0
          }, {
            type: 'AstEdge',
            id: _.uniqueId("edge"),
            from: x.root,
            fromIndex: 0,
            to: rootNode,
            toIndex: (index + 1)
          }];
        }));
        result.edges = newedges.concat(_.flatten(_.map(sub, 'edges')));

        result.root = rootNode;
        return result;
      }
    case 'InteractionNative':
      {
        return {
          'nodes': {
            type: 'InteractionNode',
            id: _.uniqueId("node"),
            interaction: interaction,
            finished: false
          },
          'edges': []
        };
      }
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }

}


function interfaceToGraph(interfac, prefx) {
  var prefix = (prefx === undefined || prefx === null) ? "" : prefx;
  switch (interfac.type) {
    case "InterfaceAtomic":
      {
        var theNode;
        if (interfac.direction === "in") {
          theNode = {
            type: 'InteractionNode',
            id: _.uniqueId("node"),
            interaction: {
              type: "InteractionNative",
              content: "<%=a0%>=theInterface" + prefix + ";\n"
            },
            ports: ["out"],
            finished: false
          };
        } else {
          theNode = {
            type: 'InteractionNode',
            id: _.uniqueId("node"),
            interaction: {
              type: "InteractionNative",
              content: "theInterface" + prefix + "=<%=a0%>;\n"
            },
            ports: ["in"],
            finished: false
          };
        }
        return {
          edges: [],
          nodes: [theNode],
          root: theNode
        };
      }
    case "InterfaceComposite":
      {
        var result = {};
        var sub = _.map(interfac.element, function(x) {
          return interfaceToGraph(x.value, prefix + "." + x.key);
        });
        var rootNode = {
          type: 'InteractionNode',
          id: _.uniqueId("node"),
          interaction: {
            type: "InteractionSimple",
            operator: interfacs.toOperator(interfac)
          },
          finished: false
        };
        var newnodes = [rootNode];
        result.nodes = newnodes.concat(_.flatten(_.map(sub, 'nodes')));

        var newedges = _.flatten(_.map(sub, function(x, index) {
          // Add the edges to and from the current node
          return [{
            type: 'AstEdge',
            id: _.uniqueId("edge"),
            from: rootNode,
            fromIndex: (index + 1),
            to: x.root,
            toIndex: 0
          }, {
            type: 'AstEdge',
            id: _.uniqueId("edge"),
            from: x.root,
            fromIndex: 0,
            to: rootNode,
            toIndex: (index + 1)
          }];
        }));
        result.edges = newedges.concat(_.flatten(_.map(sub, 'edges')));

        result.root = rootNode;
        return result;
      }
    default:
      throw "Cant transform this interface to a graph. Is it an interface really ?";
  }
}


function mergeByRootNode(graph1, graph2) {


  var root1 = graph1.root;
  var root2 = graph2.root;
  var graph = {
    nodes: graph1.nodes.concat(graph2.nodes),
    edges: graph1.edges.concat(graph2.edges),
    root: graph1.root
  };

  var edge1 = {
    type: 'AstEdge',
    id: _.uniqueId("edge"),
    from: root1,
    fromIndex: 0,
    to: root2,
    toIndex: 0
  };

  var edge2 = {
    type: 'AstEdge',
    id: _.uniqueId("edge"),
    to: root1,
    toIndex: 0,
    from: root2,
    fromIndex: 0
  };

  graph.edges.push(edge1);
  graph.edges.push(edge2);
  return graph;
}




function addOperatorTypeAnnotation(graph) {
  _.forEach(graph.nodes, function(x) {
    if (x.interaction) {
      if (x.interaction.type === "InteractionSimple") {
        x.interaction.operatorType = operator.parse(x.interaction.operator);
      }
    }
  });
}





// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {

  var matchNode = function(x) {
    return (x.type === "InteractionNode" && x.interaction !== undefined && x.interaction.type === 'InteractionSimple' && x.referentialTransparencySolved !== true && x.finished !== true);
  };

  var n = _.find(graph.nodes, matchNode);

  while (n !== undefined) {

    var matchNodeSimilarToN = function(x) {
      return (x.type === "InteractionNode" && x.interaction !== undefined && x.interaction.type === 'InteractionSimple' && x.referentialTransparencySolved !== true && x.finished !== true && _.isEqual(x.interaction, n.interaction, function(a, b) {
        return interactions.compare(a, b) === 0;
      }));
    };

    var nodesSimilarToN = _.filter(graph.nodes, matchNodeSimilarToN); //That should includes n itself

    var newNode = {
      type: 'InteractionNode',
      id: _.uniqueId("node"),
      interaction: n.interaction,
      referentialTransparencySolved: true,
      finished: false
    }

    graph.nodes.push(newNode);

    var edgesGoingToNodesSimilarToN = _.filter(graph.edges, function(x) {
      return _.includes(nodesSimilarToN, x.to);
    });

    _.forEach(edgesGoingToNodesSimilarToN, function(e1) {
      var edge1 = {
        type: 'AstEdge',
        id: _.uniqueId("edge"),
        from: e1.from,
        fromIndex: e1.fromIndex,
        to: newNode,
        toIndex: e1.toIndex
      };
      graph.edges.push(edge1);
    });

    var edgesGoingFromNodesSimilarToN = _.filter(graph.edges, function(x) {
      return _.includes(nodesSimilarToN, x.from);
    });

    _.forEach(edgesGoingFromNodesSimilarToN, function(e1) {
      var edge1 = {
        type: 'AstEdge',
        id: _.uniqueId("edge"),
        from: newNode,
        fromIndex: e1.fromIndex,
        to: e1.to,
        toIndex: e1.toIndex
      };
      graph.edges.push(edge1);
    });

    _.forEach(nodesSimilarToN, function(n1) {
      n1.finished = true;
    });

    n = _.find(graph.nodes, matchNode)
  }


}

function linkIdentifiers(graph) {
  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return (x.interaction.operatorType === "Identifier" && x.finished !== true);
  };
  var n = _.find(graph.nodes, matchNode);
  while (n !== undefined) {


    var edgesGoingToN = _.filter(graph.edges, function(x) {
      return x.to === n && x.toIndex == 0;
    });

    _.forEach(edgesGoingToN, function(e1) {
      _.forEach(edgesGoingToN, function(e2) {
        if (e1 !== e2) {
          var edge1 = {
            type: 'AstEdge',
            id: _.uniqueId("edge"),
            from: e1.from,
            fromIndex: e1.fromIndex,
            to: e2.from,
            toIndex: e2.fromIndex
          };
          graph.edges.push(edge1);
        }
      });
    });

    n.finished = true;

    n = _.find(graph.nodes, matchNode);

  }
}









function behaviourSeparation(graph) {
  var activeSource = {
    'id': 'activesource',
    'interaction': {
      'type': 'InteractionNative',
      'content': '<%=a0%> = active;\n'
    },
    ports: ["out"],
    'finished': false
  };


  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return (x.interaction.operatorType === "Behaviour" && x.finished !== true);
  };

  var b = _.find(graph.nodes, matchNode);

  while (b !== undefined) {

    var a0 = _.find(graph.edges, {
      'from': b,
      'type': 'AstEdge',
      'fromIndex': 0,
      'to': {
        'finished': false
      }
    });
    var a1 = _.find(graph.edges, {
      'from': b,
      'type': 'AstEdge',
      'fromIndex': 1,
      'to': {
        'finished': false
      }
    });
    var a2 = _.find(graph.edges, {
      'from': b,
      'type': 'AstEdge',
      'fromIndex': 2,
      'to': {
        'finished': false
      }
    });

    if (a0 === undefined || a1 === undefined || a2 === undefined) {
      console.log("A behaviour interaction does not have the right connections for transformation. Consider changing the Behaviour transformation graph transform (Put lodash _.forEach instead of _.find)");
    }

    graph.nodes.push(activeSource);

    var edge1 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: activeSource,
      fromIndex: 0,
      to: a2.to,
      toIndex: 0
    };
    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: activeSource,
      toIndex: 0,
      from: a2.to,
      fromIndex: 0
    };

    graph.edges.push(edge1);
    graph.edges.push(edge2);




    var edge3 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: a0.to,
      fromIndex: a0.toIndex,
      to: a1.to,
      toIndex: a1.toIndex
    };

    var edge4 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: a0.to,
      toIndex: a0.toIndex,
      from: a1.to,
      fromIndex: a1.toIndex
    };

    graph.edges.push(edge3);
    graph.edges.push(edge4);

    b.finished = true;

    b = _.find(graph.nodes, matchNode);

  }


}




function functionLiteralLinking(graph) {
  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return (x.interaction.operatorType === "Function" && x.finished !== true);
  };
  var b = _.find(graph.nodes, matchNode);

  while (b !== undefined) {

    var funcName = b.interaction.operator.substring(8);
    var functionSource = {
      'id': 'functionsource' + funcName,
      'interaction': {
        'type': 'InteractionNative',
        'content': '<%=a0%> = ' + funcName + ';\n'
      },
      ports: ["out"],
      'finished': false
    };
    graph.nodes.push(functionSource);

    var a0 = _.find(graph.edges, {
      'from': b,
      type: 'AstEdge',
      'fromIndex': 0,
      'to': {
        'finished': false
      }
    });

    var edge1 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: functionSource,
      fromIndex: 0,
      to: a0.to,
      toIndex: a0.toIndex
    };

    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: functionSource,
      toIndex: 0,
      from: a0.to,
      fromIndex: a0.toIndex
    };

    graph.edges.push(edge1);
    graph.edges.push(edge2);

    b.finished = true;

    b = _.find(graph.nodes, matchNode);

  }
}




function functionAppliationLinking(graph) {
  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return (x.interaction.operatorType === "FunctionApplication" && x.finished !== true);
  };
  var b = _.find(graph.nodes, matchNode);

  while (b !== undefined) {

    var functionApplicationSource = {
      'id': _.uniqueId("node"),
      'interaction': {
        'type': 'InteractionNative',
        'content': 'if(<%=a0%> === active) {<%=a3%> = <%=a1%>(<%=a2%>);}\n'
      },
      ports: ["in", "in", "in", "out"],
      'finished': false
    };
    graph.nodes.push(functionApplicationSource);

    var a0 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 0,
      'to': {
        'finished': false
      }
    });
    var a1 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 1,
      'to': {
        'finished': false
      }
    });
    var a2 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 2,
      'to': {
        'finished': false
      }
    });
    var a3 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 3,
      'to': {
        'finished': false
      }
    });

    if (a0 === undefined || a1 === undefined || a2 === undefined || a3 === undefined) {
      console.log("A Function application interaction does not have the right connections for transformation. Consider changing the Behaviour transformation graph transform (Put lodash _.forEach instead of _.find)");
      console.log(a0);
      console.log(a1);
      console.log(a2);
      console.log(a3);
    }

    var edge1 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: functionApplicationSource,
      fromIndex: 0,
      to: a0.to,
      toIndex: a0.toIndex
    };

    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: functionApplicationSource,
      toIndex: 0,
      from: a0.to,
      fromIndex: a0.toIndex
    };

    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var edge3 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: functionApplicationSource,
      fromIndex: 1,
      to: a1.to,
      toIndex: a1.toIndex
    };

    var edge4 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: functionApplicationSource,
      toIndex: 1,
      from: a1.to,
      fromIndex: a1.toIndex
    };

    graph.edges.push(edge3);
    graph.edges.push(edge4);

    var edge5 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: functionApplicationSource,
      fromIndex: 2,
      to: a2.to,
      toIndex: a2.toIndex
    };

    var edge6 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: functionApplicationSource,
      toIndex: 2,
      from: a2.to,
      fromIndex: a2.toIndex
    };

    graph.edges.push(edge5);
    graph.edges.push(edge6);

    var edge7 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: functionApplicationSource,
      fromIndex: 3,
      to: a3.to,
      toIndex: a3.toIndex
    };

    var edge8 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: functionApplicationSource,
      toIndex: 3,
      from: a3.to,
      fromIndex: a3.toIndex
    };

    graph.edges.push(edge7);
    graph.edges.push(edge8);

    b.finished = true;

    b = _.find(graph.nodes, matchNode);

  }
}




function previousNextLinking(graph) {
  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return (x.interaction.operatorType === "Previous" && x.finished !== true);
  };
  var b = _.find(graph.nodes, matchNode);

  while (b !== undefined) {

    var newId = _.uniqueId("node")
    var previousNextSource = {
      'id': newId,
      'interaction': {
        'type': 'InteractionNative',
        'content': "if(<%=a0%> === active) {\n\
  <%=a1%> = previousState['" + newId + "'];\n\
  nextState['" + newId + "'] = <%=a2%>;\n\
}\n"
      },
      containsAState: true,
      ports: ["in", "out", "in"],
      'finished': false
    };
    graph.nodes.push(previousNextSource);

    var a0 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 0,
      'to': {
        'finished': false
      }
    });
    var a1 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 1,
      'to': {
        'finished': false
      }
    });
    var a2 = _.find(graph.edges, {
      'type': 'AstEdge',
      'from': b,
      'fromIndex': 2,
      'to': {
        'finished': false
      }
    });


    if (a0 === undefined || a1 === undefined || a2 === undefined) {
      console.log("A Previous next application interaction does not have the right connections for transformation. Consider changing the previous next transformation graph transform (Put lodash _.forEach instead of _.find)");
      console.log(a0);
      console.log(a1);
      console.log(a2);
    }

    var edge1 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: previousNextSource,
      fromIndex: 0,
      to: a0.to,
      toIndex: a0.toIndex
    };

    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: previousNextSource,
      toIndex: 0,
      from: a0.to,
      fromIndex: a0.toIndex
    };

    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var edge3 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: previousNextSource,
      fromIndex: 1,
      to: a1.to,
      toIndex: a1.toIndex
    };

    var edge4 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: previousNextSource,
      toIndex: 1,
      from: a1.to,
      fromIndex: a1.toIndex
    };

    graph.edges.push(edge3);
    graph.edges.push(edge4);

    var edge5 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      from: previousNextSource,
      fromIndex: 2,
      to: a2.to,
      toIndex: a2.toIndex
    };

    var edge6 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: previousNextSource,
      toIndex: 2,
      from: a2.to,
      fromIndex: a2.toIndex
    };

    graph.edges.push(edge5);
    graph.edges.push(edge6);

    b.finished = true;

    b = _.find(graph.nodes, matchNode);

  }
}





// TODO Extend functionality to deal with other nodes between composition interactions
// TODO Extend functionality to deal with cases where more than 2 compositions are matching (because of identifier elimination)
function matchingCompositionReduction(graph) {

  // Here we try to match edges that are in the middle of matching and facing compositions
  var matchEdge = function(x) {
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.interaction === undefined) return false;
    if (x.to.interaction === undefined) return false;
    if (x.toIndex !== 0) return false;
    if (x.fromIndex !== 0) return false;
    return (x.unSuitableForCompositionReduction !== true && x.from.interaction.operatorType === "Composition" && x.from.finished !== true &&
      x.to.interaction.operatorType === "Composition" && x.to.finished !== true && x.from.interaction.operator === x.to.interaction.operator);
  };
  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {

    // Get the composition nodes at the extremities of this edge
    var n1 = b.from;
    var n2 = b.to;

    var cond = true;

    // i is the index of the current component
    var i = 1;

    // For each i
    while (cond) {

      // Get i-th edge going from the first composition
      var e1 = _.find(graph.edges, {
        'type': 'AstEdge',
        'from': n1,
        'fromIndex': i,
        'to': {
          'finished': false
        }
      });
      // Get i-th edge going from the second composition
      var e2 = _.find(graph.edges, {
        'type': 'AstEdge',
        'from': n2,
        'fromIndex': i,
        'to': {
          'finished': false
        }
      });

      // We should have found the two edges that we want to merge
      if (e1 !== undefined && e2 !== undefined) {
        // Destinations of the edges we are replacing
        var dest1=e1.to;
        var i1 = e1.toIndex;
        var dest2=e2.to;
        var i2 = e2.toIndex;

        var targetEdge;

        // Special case ! Deal with cases when edges loop onto the very composition interaction that we are destroying !

        if (dest1 === n1) {
// first edge looping to first composition node
          targetEdge = _.find(graph.edges, {
                  'type': 'AstEdge',
                  'from': n2,
                  'fromIndex': i1,
                  'to': {
                    'finished': false
                  }
                });
          dest1 = targetEdge.to;
          i1 = targetEdge.toIndex;
        } else if (dest1 === n2){
// first edge looping to second composition node
          targetEdge = _.find(graph.edges, {
                  'type': 'AstEdge',
                  'from': n1,
                  'fromIndex': i1,
                  'to': {
                    'finished': false
                  }
                });
          dest1 = targetEdge.to;
          i1 = targetEdge.toIndex;
        }

        if (dest2 === n2) {
// second edge looping to first composition node
          targetEdge = _.find(graph.edges, {
                  'type': 'AstEdge',
                  'from': n1,
                  'fromIndex': i2,
                  'to': {
                    'finished': false
                  }
                });
          dest2 = targetEdge.to;
          i2 = targetEdge.toIndex;
        } else if (dest2 === n1){
// second edge looping to second composition node
          targetEdge = _.find(graph.edges, {
                  'type': 'AstEdge',
                  'from': n2,
                  'fromIndex': i2,
                  'to': {
                    'finished': false
                  }
                });
          dest2 = targetEdge.to;
          i2 = targetEdge.toIndex;
        }

// Now that we sorted the correct destination nodes even in corner cases which involve self-loops, we can connect the nodes in question
// General Case
        var edge1 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: dest1,
          toIndex: i1,
          from: dest2,
          fromIndex: i2
        };
        var edge2 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: dest2,
          toIndex: i2,
          from: dest1,
          fromIndex: i1
        };
        graph.edges.push(edge1);
        graph.edges.push(edge2);
        // console.log("ok");
        cond = true;
      } else {
        cond = false;
      }

      // Go to next pair of components
      i = i + 1;
    }

// We connected all components, so the two composition nodes are finished
    n1.finished = true;
    n2.finished = true;
// And the edge is done
    b.unSuitableForCompositionReduction = true;
// Find the next potential edge
    b = _.find(graph.edges, matchEdge);

  }
}


function createDataFlowDirection(graph) {
  var matchEdge = function(x) {
    if (x.type !== 'AstEdge') return false;
    if (x.flowManaged === true) return false;
    if (x.to === undefined || x.toIndex === undefined) return false;
    if (x.from === undefined || x.fromIndex === undefined) return false;
    if (x.from.finished || x.to.finished) return false;
    if (x.to.ports === undefined) {
      x.to.ports = [];
      if (x.from.ports === undefined) {
        x.from.ports = [];
        return false;
      } else {
        return x.from.ports[x.fromIndex] === 'out';
      }
    } else {
      if (x.from.ports === undefined) {
        x.from.ports = [];
        return x.to.ports[x.toIndex] === 'in';
      } else {
        return x.to.ports[x.toIndex] === 'in' || x.from.ports[x.fromIndex] === 'out';
      }
    }
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {
    // console.log("Dataflow edge");
    var edge1 = {
      type: 'DataFlowEdge',
      from: b.from,
      fromIndex: b.fromIndex,
      to: b.to,
      toIndex: b.toIndex
    };
    if (!_.find(graph.edges, edge1)) {
      edge1.id = _.uniqueId("flow");
      // We add the edge only if it does not exist yet
      edge1.to.ports[edge1.toIndex] = 'in';
      edge1.from.ports[edge1.fromIndex] = 'out';
      graph.edges.push(edge1);
    }

    b.flowManaged = true;
    var b = _.find(graph.edges, matchEdge);
  }
}



function nonMatchingCompositionCompilation(graph) {
  var matchEdge = function(x) {
    if (x.type !== 'DataFlowEdge') return false;
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.interaction === undefined) return false;
    if (x.to.interaction === undefined) return false;
    if (x.fromIndex !== 0) return false;
    if (x.from.interaction.type !== 'InteractionSimple') return false;
    if (x.unsuitableForNonMatchingCompositionReduction === true) return false;
    if (x.from.interaction.operatorType !== "Composition") return false;
    return true;
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {


    // Get the composition nodes at the extremity of this edge
    var n1 = b.from;
    // console.log(">>>>>>>>" + n1.interaction.operator);

    var op = _.words(_.trim(n1.interaction.operator, '{}'), /[^:$]+/g);

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
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: b.to,
      toIndex: b.toIndex,
      from: newNode,
      fromIndex: 0
    };
    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: newNode,
      toIndex: 0,
      from: b.to,
      fromIndex: b.toIndex
    };
    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var i;

    for (i = 1; i <= op.length; i++) {

      _.forEach(_.filter(graph.edges, function(x) {
        return (x.type === 'AstEdge' && x.to === b.from && x.toIndex === i && x.from.finished !== true);
      }), function(x) {
        var edge3 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: x.from,
          toIndex: x.fromIndex,
          from: newNode,
          fromIndex: i
        };
        var edge4 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: newNode,
          toIndex: i,
          from: x.from,
          fromIndex: x.fromIndex
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
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.interaction === undefined) return false;
    if (x.to.interaction === undefined) return false;
    if (x.toIndex !== 0) return false;
    if (x.to.interaction.type !== 'InteractionSimple') return false;
    if (x.unsuitableForNonMatchingDecompositionReduction === true) return false;
    if (x.to.interaction.operatorType !== "Composition") return false;
    return true;
  };

  var b = _.find(graph.edges, matchEdge);

  while (b !== undefined) {


    // Get the composition nodes at the extremity of this edge
    var n1 = b.to;
    // console.log(">>>>>>>>" + n1.interaction.operator);

    var op = _.words(_.trim(n1.interaction.operator, '{}'), /[^:$]+/g);

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
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: b.from,
      toIndex: b.fromIndex,
      from: newNode,
      fromIndex: 0
    };
    var edge2 = {
      type: 'AstEdge',
      id: _.uniqueId("edge"),
      to: newNode,
      toIndex: 0,
      from: b.from,
      fromIndex: b.fromIndex
    };
    graph.edges.push(edge1);
    graph.edges.push(edge2);

    var i;

    for (i = 1; i <= op.length; i++) {

      _.forEach(_.filter(graph.edges, function(x) {
        return (x.type === 'AstEdge' && x.from === b.to && x.fromIndex === i && x.to.finished !== true);
      }), function(x) {
        var edge3 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: x.to,
          toIndex: x.toIndex,
          from: newNode,
          fromIndex: i
        };
        var edge4 = {
          type: 'AstEdge',
          id: _.uniqueId("edge"),
          to: newNode,
          toIndex: i,
          from: x.to,
          fromIndex: x.toIndex
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
              to: m
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
    // console.log(index + "     " + node.interaction.content);
    node.executionOrder = index;
  });
// console.log("There are "+orderingList.length+" nodes");
}



function instantiateTemplates(graph) {
  var matchNode = function(x) {
    if (x.interaction === undefined) return false;
    return x.interaction.type === "InteractionNative" && x.finished !== true && x.codeGeneration === undefined;
  };

  var b = _.find(graph.nodes, matchNode);
  while (b !== undefined) {
    var i;
    // TODO extend i in case bigger interactions happen !
    var edgesNameList = {};
    for (i = 0; i < 1000; i++)  {
      var edgeforCurrentI;
      edgeforCurrentI = _.find(graph.edges, {
        type: 'DataFlowEdge',
        from: {
          finished: false
        },
        to: b,
        toIndex: i
      });
      if (edgeforCurrentI == undefined) {
        edgeforCurrentI = _.find(graph.edges, {
          type: 'DataFlowEdge',
          to: {
            finished: false
          },
          from: b,
          fromIndex: i
        });
      }
      if (edgeforCurrentI == undefined) {
        break;
      }
      edgesNameList["a" + i] = edgeforCurrentI.id;
    }

    b.codeGeneration = {
      'js': _.template(b.interaction.content)(edgesNameList)
    };

    var b = _.find(graph.nodes, matchNode);
  }
}

function generateJsCode(graph, header) {
  var matchNode = function(x) {
    return x.codeGeneration !== undefined && x.executionOrder !== undefined && x.finished !== true;
  };

  var matchFlows = function(x) {
    return x.type === 'DataFlowEdge' && x.to.finished !== true && x.from.finished !== true;
  };

  var matchStateNode = function(x) {
    return x.containsAState === true && x.finished !== true;
  };


  var conf = {
    'edgesCode': _.map(_.filter(graph.edges, matchFlows), function(x) {
      return "var " + x.id + ";\n"
    }).join(""),
    'nodesCode': _.pluck(_.pluck(_.sortBy(_.filter(graph.nodes, matchNode), 'executionOrder'), 'codeGeneration'), 'js').join("\n"),
    'statesCode': _.map(_.pluck(_.filter(graph.nodes, matchStateNode), 'id'), function(x) {
      return x + ":null"
    }).join(",\n"),
    'customHeader': header,
    'standardHeader': jsStandardHeader
  };

  var transTemplate = "\
<%= standardHeader%>\n\
<%= customHeader%>\n\
<%= edgesCode%>\n\
<%= nodesCode%>\n\
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
var initCode=_.template(initTemplate)(conf);
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
var theInterface = clone(data.inter);\n\
var previousState = data.state;\n\
var nextState = clone(previousState);\n\
var active = 1;\n\
var inactive = null;\n\
';



module.exports.graphToDot = graphToDot;
module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.compileToGraph = compileToGraph;
module.exports.interactionToGraph = interactionToGraph;
