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

  var mainDef = parser.parse(source)[0];

  var graph = new Graph();

  // TODO reduce the amount of processing on the next three lines and transform it into graph operations instead
  var interaction = addInteractionToGraph(graph, identifiers.reduceIdentifiers(interactions.expand(mainDef).interaction));
  //TODO Make it possible to compile interactiosn that have arguments and not just a single interface
  var interfac = addInterfaceToGraph(graph, mainDef.signature.interfac, 'theInterface');

  mergeByRootNode(graph,interaction, interfac);


  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);
  linkIdentifiers(graph);
  voidInteractionCreation(graph);
  behaviourSeparation(graph);
  functionLiteralLinking(graph);
  functionApplicationLinking(graph);
  previousNextLinking(graph);
  matchingCompositionReduction(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  createDataFlowDirection(graph);
  nonMatchingDecompositionCompilation(graph);
  createDataFlowDirection(graph);
  resolveMultiplePorts(graph);
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
    if (x.content.type === 'InteractionSimple' && x.finished !== true) {
      res += (x.id + ' [shape=ellipse, label="' + x.id + '\n' + x.content.operator + '", fillcolor=' + (x.finished ? '"blue"' : '"white"') + '];');
      return;
    }
    if (x.content.type === 'InteractionNative' && x.finished !== true) {
      res += (x.id + ' [shape=box, label="' + x.id + "\n" + ((x.executionOrder !== undefined) ? (x.executionOrder) : "") + "\n" + x.content.content + '", fillcolor=' + (x.finished ? '"blue"' : '"gray"') + '];');
      return;
    }
  });
  _.forEach(graph.edges, function(x) {
    if (x.type === 'AstEdge' && x.to.finished !== true && x.from.finished !== true) {
      res += (x.from.id + ' -> ' + x.to.id + ' [label="' + x.id + '", headlabel="' + x.toIndex + '", taillabel="' + x.fromIndex + '", dir="forward", arrowHead="normal"];');
      return;
    }
    if (x.type === 'DataFlowEdge' && x.finished !== true && x.to.finished !== true && x.from.finished !== true) {
      res += (x.from.id + ' -> ' + x.to.id + ' [label="' + x.id + '",headlabel="' + x.toIndex + '", taillabel="' + x.fromIndex + '", dir="forward", arrowHead="normal", arrowsize=2, color="red"];');
      return;
    }
  });
  res += ('}');
  return res;
}

function addInteractionToGraph(graph, interaction) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode = graph.addNode('ast', interaction);
      var nodeOfOperand = _.map(interaction.operand, function(operand) {
        return addInteractionToGraph(graph, operand);
      });
      _.forEach(nodeOfOperand, function(x, index) {
        graph.addEdge('ast', interaction, rootNode, x, 0, index);
      });
      break;
    case 'InteractionNative':
      rootNode = graph.addNode('ast', interaction);
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }
  return rootNode;
}


function addInterfaceToGraph(graph, interfac, prefx) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      if (interfac.direction === "in") {
        rootNode = graph.addNode('ast', {
          type: "InteractionNative",
          content: "<%=a0%>=" + prefix + ";\n"
        }, ["out"]);
      } else {
        rootNode = graph.addNode('ast', {
          type: "InteractionNative",
          content: "" + prefix + "=<%=a0%>;\n"
        }, ["in"]);
      }
      break;
    case "InterfaceComposite":
      {
        rootNode = graph.addNode('ast', {
          type: "InteractionSimple",
          operator: interfacs.toOperator(interfac)
        });
        var nodeOfElement = _.map(interfac.element, function(x) {
          return addInterfaceToGraph(graph, x.value, prefix + "." + x.key);
        });
        _.forEach(nodeOfElement, function(x, index) {
          graph.addEdge('ast', interfac, rootNode, x, 0, index);
        });
      }
    default:
      throw "Cant transform this interface to a graph. Is it an interface really ?";
  }
  return rootNode;
}


function mergeByRootNode(graph,g1, g2) {
  return graph.addEdge('ast','root',g1,g2,0,0);
}




function addOperatorTypeAnnotation(graph) {
  _.forEach(graph.nodes, function(x) {
    if (x.content) {
      if (x.content.type === "InteractionSimple") {
        x.content.operatorType = operator.parse(x.content.operator);
      }
    }
  });
}





// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {

  var matchNode = function(x) {
    return (x.type === "InteractionNode" && x.content !== undefined && x.content.type === 'InteractionSimple' && x.referentialTransparencySolved !== true && x.finished !== true);
  };

  var n = _.find(graph.nodes, matchNode);

  while (n !== undefined) {

    var matchNodeSimilarToN = function(x) {
      return (x.type === "InteractionNode" && x.content !== undefined && x.content.type === 'InteractionSimple' && x.referentialTransparencySolved !== true && x.finished !== true && _.isEqual(x.content, n.content, function(a, b) {
        return interactions.compare(a, b) === 0;
      }));
    };

    var nodesSimilarToN = _.filter(graph.nodes, matchNodeSimilarToN); //That should includes n itself

    var newNode = {
      type: 'InteractionNode',
      id: _.uniqueId("node"),
      content: n.content,
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
    if (x.content === undefined) return false;
    return (x.content.operatorType === "Identifier" && x.finished !== true);
  };
  var n = _.find(graph.nodes, matchNode);
  while (n !== undefined) {


    var edgesGoingToN = _.filter(graph.edges, function(x) {
      return x.to === n && x.toIndex == 0;
    });


    // if(edgesGoingToN)


    // General case
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




// Here we create nodes for interactions that are empty
function voidInteractionCreation(graph) {

  var matchNode = function(x) {
    if (x.content === undefined) return false;
    return (x.content.operatorType === "Void" && x.finished !== true);
  };

  var n = _.find(graph.nodes, matchNode);

  while (n !== undefined) {

    var newNode = {
      'id': _.uniqueId('node'),
      'interaction': {
        'type': 'InteractionNative',
        'content': '/*Nothing, there was a void interaction*/\n'
      },
      ports: [],
      isVoid: true,
      'finished': false
    };

    graph.nodes.push(newNode);

    _.forEach(graph.edges, function(x) {
      if (x.type === 'AstEdge' && x.to === n && x.toIndex === 0 && x.from.finished !== true) {
        var edge1 = {
          type: 'AstEdge',
          to: newNode,
          toIndex: x.toIndex,
          from: x.from,
          fromIndex: x.fromIndex
        };
        var edge2 = {
          type: 'AstEdge',
          from: newNode,
          fromIndex: x.toIndex,
          to: x.from,
          toIndex: x.fromIndex
        };
        graph.edges.push(edge1);
        graph.edges.push(edge2);
      }
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
    if (x.content === undefined) return false;
    return (x.content.operatorType === "Behaviour" && x.finished !== true);
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
    if (x.content === undefined) return false;
    return (x.content.operatorType === "Function" && x.finished !== true);
  };
  var b = _.find(graph.nodes, matchNode);

  while (b !== undefined) {

    var funcName = b.content.operator.substring(8);
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




function functionApplicationLinking(graph) {
  var matchNode = function(x) {
    if (x.content === undefined) return false;
    return (x.content.operatorType === "FunctionApplication" && x.finished !== true);
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
    if (x.content === undefined) return false;
    return (x.content.operatorType === "Previous" && x.finished !== true);
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
    if (x.from.content === undefined) return false;
    if (x.to.content === undefined) return false;
    if (x.toIndex !== 0) return false;
    if (x.fromIndex !== 0) return false;
    return (x.unSuitableForCompositionReduction !== true && x.from.content.operatorType === "Composition" && x.from.finished !== true &&
      x.to.content.operatorType === "Composition" && x.to.finished !== true && x.from.content.operator === x.to.content.operator);
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
        var dest1 = e1.to;
        var i1 = e1.toIndex;
        var dest2 = e2.to;
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
        } else if (dest1 === n2) {
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
        } else if (dest2 === n1) {
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
      toIndex: b.toIndex,
      finished: false
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
    if (x.finished === true) return false;
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.content === undefined) return false;
    if (x.to.content === undefined) return false;
    if (x.fromIndex !== 0) return false;
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
    if (x.finished === true) return false;
    if (x.to === undefined) return false;
    if (x.from === undefined) return false;
    if (x.from.finished === true) return false;
    if (x.to.finished === true) return false;
    if (x.from.content === undefined) return false;
    if (x.to.content === undefined) return false;
    if (x.toIndex !== 0) return false;
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
  console.log("==================================================================");
  console.log(transCode);
  console.log("==================================================================");
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



module.exports.graphToDot = graphToDot;
module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.generateJsCode = generateJsCode;
module.exports.compileToGraph = compileToGraph;
