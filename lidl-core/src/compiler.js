var serializer = require('./serializer.js');
var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var interfacs = require('./interfaces.js');
var parser = require('./parser.js');
var operator = require('./operator.js');
var _ = require('lodash');
var compilationResult = require('./compilerExampleResult.js');

// var neo4j = require('neo4j');

function compileToJs(source) {
  //TODO Actual compilation


  // graphTransformation(compileToGraph(source));

  if (source) return source;
  else return compilationResult;
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
  return interactionToGraph(
    identifiers.reduceIdentifiers(
      interactions.expand(
        parser.parse(
          source
        )[0]
      ).interaction
    )
  );
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
      res += (x.id + ' [shape=ellipse, label="' + x.interaction.operator + '", fillcolor=' + (x.finished ? '"blue"' : '"white"') + '];');
      return;
    }
    if (x.interaction.type === 'InteractionNative') {
      res += (x.id + ' [shape=box, label="' + x.interaction.content + '"];');
      return;
    }
  });
  _.forEach(graph.edges, function(x) {
    res += (x.from.id + ' -> ' + x.to.id + ' [headlabel="' + x.toIndex + '", taillabel="' + x.fromIndex + '", dir="forward", arrowHead="normal"];');
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
            type: 'InterfaceNode',
            id: _.uniqueId("node"),
            interaction: {
              type: "InteractionNative",
              content: "<<a0>>=theInterface" + prefix + ";"
            },
            finished: false
          };
        } else {
          theNode = {
            type: 'InterfaceNode',
            id: _.uniqueId("node"),
            interaction: {
              type: "InteractionNative",
              content: "theInterface" + prefix + "=<<a0>>;"
            },
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
        var sub = _.map(interfac.component, function(x) {
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


function graphTransformation(graph) {
  addRootNode(graph);
  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);
  linkIdentifiers(graph);
  behaviourSeparation(graph);
  functionLiteralLinking(graph);
  functionCallLinking(graph);
}


function addRootNode(graph) {
  var rootn = {
    type: 'RootNode',
    id: 'root',
    finished: false
  };
  graph.nodes.push(rootn);
  var edge1 = {
    type: 'AstEdge',
    id: _.uniqueId("edge"),
    from: rootn,
    fromIndex: 0,
    to: graph.root,
    toIndex: 0
  };
  var edge2 = {
    type: 'AstEdge',
    id: _.uniqueId("edge"),
    to: rootn,
    toIndex: 0,
    from: graph.root,
    fromIndex: 0
  };
  graph.edges.push(edge1);
  graph.edges.push(edge2);
  graph.root = rootn;
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
    return (x.type === "InteractionNode" && x.interaction !== undefined && x.referentialTransparencySolved !== true && x.finished !== true);
  };

  var n = _.find(graph.nodes, matchNode);

  while (n !== undefined) {

    var matchNodeSimilarToN = function(x) {
      return (x.type === "InteractionNode" && x.interaction !== undefined && x.referentialTransparencySolved !== true && x.finished !== true && _.isEqual(x.interaction, n.interaction, function(a, b) {
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
      'content': '<<a0>> = active;'
    },
    'finished': false
  };
  graph.nodes.push(activeSource);

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
        'content': '<<a0>> = ' + funcName + ';'
      },
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



function functionCallLinking(graph) {
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
        'content': 'if(<<a0>>==active) {<<a3>> = <<a1>>(<<a2>>);};'
      },
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





module.exports.graphTransformation = graphTransformation;
module.exports.behaviourSeparation = behaviourSeparation;
module.exports.graphToDot = graphToDot;
module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.compileToGraph = compileToGraph;
module.exports.interactionToGraph = interactionToGraph;
