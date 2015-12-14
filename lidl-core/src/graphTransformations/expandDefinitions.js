"use strict"

import _ from 'lodash'
import interactions from '../interactions';
import {serialize} from '../serializer';

export default function expandDefinitions(graph) {
  // First we create dependency links between definitions nodes
  // For each definition
  graph
    .matchNodes({
      type: 'InteractionDefinition'
    })
    .forEach(defNode => {
      defNode.markedDuringDefinitionGraphOrdering = false;
      // For each of its sub interactions
      graph
        .matchDirectedEdges({
          type: 'DefinitionSubInteraction',
          from: {
            node: defNode
          },
          to: {
            node: {
              isCustom: true
            }
          }
        })
        .pluck('to.node')
        .forEach(subInteractionNode => {
          // Find the definition of this sub interaction
          let subInteractionDefNode =
            graph
            .findDirectedEdge({
              type: 'InteractionDefinition',
              from: {
                node: subInteractionNode
              }
            })
            .to.node;

          // Add a dependency from the definition to the definition of the sub interaction
          if (_.isUndefined(graph.findDirectedEdge({
              type: 'DefinitionDependency',
              from: {
                node: defNode
              },
              to: {
                node: subInteractionDefNode
              }
            }))) {
            graph
              .addEdge({
                type: 'DefinitionDependency',
                from: {
                  node: defNode
                },
                to: {
                  node: subInteractionDefNode
                }
              });
          }
        })
        .commit();
    })
    .commit()

  let orderingList = [];

  // TODO Maybe we can only visit the root definition instead of all of them
  // Then we create a graph ordering of all definition nodes according to the dependency relationship
  graph
    .reduceNodes({
      type: 'InteractionDefinition',
      markedDuringDefinitionGraphOrdering: false
    }, (theResult, theNode) => {
      visitDef(theNode);
    });

  function visitDef(n) {
    if (n.temporarilyMarkedDuringDefinitionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("the definition structure contains circular definitions"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringDefinitionGraphOrdering !== true) {
        n.temporarilyMarkedDuringDefinitionGraphOrdering = true;
        graph
          .matchNodes(m =>
            graph
            .matchDirectedEdges({
              type: 'DefinitionDependency',
              from: {
                node: n
              },
              to: {
                node: m
              }
            })
            .size() > 0)
          .forEach(visitDef)
          .commit();

        n.markedDuringDefinitionGraphOrdering = true;
        n.temporarilyMarkedDuringDefinitionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }



  // Finally, we expand all definitions, in order.
  _(orderingList)
    .reverse() // reverse the list in order to expand most basic interction definitions first
    .forEach(defNode => {
      instantiateDefinitionInteraction(graph, defNode);
    })
    .commit();


}






// Here we expand the whole interaction expression of a definition
// stack is a list of definitions
function instantiateDefinitionInteraction(graph, definitionNode) {
  // console.log('=================== instantiate '+definitionNode.content.signature.operator);

  // Find the root Interaction
  let rootInteraction =
    graph
    .findDirectedEdge({
      type: 'DefinitionInteraction',
      from: {
        node: definitionNode
      }
    })
    .to.node;

  rootInteraction.isRootOfDefiniton = true;

  // Mark all subinteractions as not visited
  graph
    .matchDirectedEdges({
      type: 'DefinitionSubInteraction',
      from: {
        node: definitionNode
      }
    })
    .forEach(edge => {
      edge.to.node.markedDuringInteractionGraphOrdering = false;
    })
    .commit()



  let orderingList = [];

  // Then we create a graph ordering of all interaction nodes according to the dependency relationship
  // Find all sub interactions of the current definition
  graph
    .reduceDirectedEdges({
      type: 'DefinitionSubInteraction',
      from: {
        node: definitionNode
      },
      to: {
        node: {
          markedDuringInteractionGraphOrdering: false
        }
      }
    }, (theResult, theEdge) => {
      visitInteraction(theEdge.to.node);
    });

  function visitInteraction(n) {
    if (n.temporarilyMarkedDuringInteractionGraphOrdering === true) {
      throw new Error("The interaction structure contains cycles"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringInteractionGraphOrdering !== true) {
        n.temporarilyMarkedDuringInteractionGraphOrdering = true;
        graph
          .matchNodes(m =>
            graph
            .matchDirectedEdges({
              type: 'InteractionOperand',
              from: {
                node: n
              },
              to: {
                node: m
              }
            })
            .size() > 0)
          .forEach(visitInteraction)
          .commit();

        n.markedDuringInteractionGraphOrdering = true;
        n.temporarilyMarkedDuringInteractionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }


  _(orderingList)
    .reverse() // reverse the list in order to expand most basic interactions first
    .forEach(interNode => {
      // console.log(interNode.content.operator);
      // instantiateDefinitionInteraction(graph,defNode);
      let newNodes =
        instantiateInteraction(graph, interNode,definitionNode);

      _(newNodes)
        .forEach(n => {
          graph
            .addEdge({
              type: 'DefinitionSubInteractionInstance',
              from: {
                node: definitionNode
              },
              to: {
                node: n
              }
            });
        })
        .commit();
    })
    .commit();

  // Link to the root interaction instance
  let instantiatedRoot =
    graph
    .findDirectedEdge({
      type: 'DefinitionSubInteractionInstance',
      from: {
        node: definitionNode
      },
      to: {
        node: {
          isRootOfDefiniton: true
        }
      }
    })
    .to.node;

  graph
    .addEdge({
      type: 'DefinitionInteractionInstance',
      from: {
        node: definitionNode
      },
      to: {
        node: instantiatedRoot
      }
    });


}



// Here we expand a single interaction node
function instantiateInteraction(graph, interactionNode,stackDefNode) {
  // console.log(interactionNode.content.operator);

  // First we get all the InteractionOperand Edges that go from and to this interaction
  // The sub Interactions are already instantiated
  let interactionoperandEdgesFrom =
    graph
    .matchDirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: interactionNode
      }
    })
    .value();
  // The super Interactions are not instantiated yet
  let interactionoperandEdgesTo =
    graph
    .matchDirectedEdges({
      type: 'InteractionOperand',
      to: {
        node: interactionNode
      }
    })
    .value();





  if (interactionNode.isBase) {







    // console.log("BAS "+interactionNode.content.operator);
    // Base interaction, we just instantiate it and link it
    // So first we create the instance
    let newNode =
      graph
      .addNode({
        type: 'InteractionInstance',
        isRootOfDefiniton: interactionNode.isRootOfDefiniton,
        isArgument: false,
        content: interactionNode.content,
        ports: interactionNode.ports
      });
    // Then we link the instance
    graph
      .addEdge({
        type: 'InteractionInstanceInteraction',
        from: {
          node: newNode
        },
        to: {
          node: interactionNode
        }
      })
      // First to the sub Interactions (which are already instantiated)
    _(interactionoperandEdgesFrom)
      .forEach(edge => {
        graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: newNode,
              index: edge.from.index
            },
            to: edge.to
          })
      })
      .commit();
    // Then to the super Interactions (which are not instantiated)
    _(interactionoperandEdgesTo)
      .forEach(edge => {
        graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            to: {
              node: newNode,
              index: edge.to.index
            },
            from: edge.from
          })
      })
      .commit();
    // interactionNode.instantiated = true;
    graph.finish(interactionNode);



    let res = [newNode];

    _(res)
    .forEach(n=>{
      if(_.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack=[];
      }
      n.content.meta.stack.push(interactionNode);

    })
    .commit();
    return res;








  } else if (interactionNode.isArgument) {






    // console.log("ARG "+interactionNode.content.operator);
    // So first we create the instance
    let newNode =
      graph
      .addNode({
        type: 'InteractionInstance',
        isRootOfDefiniton: interactionNode.isRootOfDefiniton,
        isArgument: true,
        content: interactionNode.content,
        ports: interactionNode.ports
      });
    // Then we link the instance
    graph
      .addEdge({
        type: 'InteractionInstanceInteraction',
        from: {
          node: newNode
        },
        to: {
          node: interactionNode
        }
      })
      // To the definition it is an agument of
    let argNode =
      graph
      .findDirectedEdge({
        type: 'InteractionDefinition',
        from: {
          node: interactionNode
        }
      })
      .to.node;

    let defPort =
      graph
      .findDirectedEdge({
        type: 'SignatureOperand',
        to: {
          node: argNode
        }
      })
      .from;

    graph
      .addEdge({
        type: 'InteractionInstanceIsOperandOf',
        from: {
          node: newNode
        },
        to: defPort
      });

    // Then to the super Interactions (which are not instantiated)
    _(interactionoperandEdgesTo)
      .forEach(edge => {
        graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            to: {
              node: newNode,
              index: edge.to.index
            },
            from: edge.from
          });
      })
      .commit();

    graph.finish(interactionNode);
    // interactionNode.instantiated = true;

    let res = [newNode];

    _(res)
    .forEach(n=>{
      if(_.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack=[];
      }
      n.content.meta.stack.push(interactionNode);

    })
    .commit();
    return res;









  } else if (interactionNode.isCustom) {








    // console.log("CUS "+interactionNode.content.operator);

    let defNode =
      graph
      .findDirectedEdge({
        type: 'InteractionDefinition',
        from: {
          node: interactionNode
        }
      })
      .to.node;

    // let subNodes

    let defInteractionInstanceNodes =
      graph
      .matchDirectedEdges({
        type: 'DefinitionSubInteractionInstance',
        from: {
          node: defNode
        }
      })
      .map(x => (x.to.node))
      .value();

    // Copy edges of type InteractionInstanceOperand
    let defInteractionInstanceEdges =
      graph
      .matchDirectedEdges({
        type: 'InteractionInstanceOperand'
      })
      .filter(e => (_.includes(defInteractionInstanceNodes, e.to.node) && _.includes(defInteractionInstanceNodes, e.from.node)))
      .value();

    // Copy edges of type InteractionInstanceIsOperandOf
    let defInteractionInstanceIsOperandOf =
      graph
      .matchDirectedEdges({
        type: 'InteractionInstanceIsOperandOf'
      })
      .filter(e => (_.includes(defInteractionInstanceNodes, e.from.node)))
      .value();
    //
    // console.log(defInteractionInstanceIsOperandOf);
    //
    let graphToCopy = {
      nodes: defInteractionInstanceNodes,
      edges: _.union(defInteractionInstanceEdges, defInteractionInstanceIsOperandOf)
    };
    // console.log(graphToCopy);
    let newSubGraph =
      copy(graph, graphToCopy);
    // console.log("    fff  ");
    // console.log(newSubGraph);
    // console.log("      ");
    //Find the root
    let rootOfDef =
      _(newSubGraph.nodes)
      .find({
        isRootOfDefiniton: true
      });

    rootOfDef.isRootOfDefiniton = interactionNode.isRootOfDefiniton;

    // Link the root
    _(interactionoperandEdgesTo)
      .forEach(edge => {
        graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            to: {
              node: rootOfDef,
              index: edge.to.index
            },
            from: edge.from
          });
      })
      .commit();
    //
    // Find the args
    let argsOfDef =
      _(newSubGraph.nodes)
      .filter({
        isArgument: true
      })
      .map(nod => {
        let directArg =
          graph
          .findDirectedEdge({
            type: 'InteractionInstanceIsOperandOf',
            from: {
              node: nod
            },
            to: {
              node: defNode
            }
          });
        // console.log(directArg);
        if (_.isUndefined(directArg)) {
          return {
            node: nod,
            index: undefined
          };
        } else {
          //         console.log("hhhhhhh");
          // console.log(directArg);
          return {
            node: nod,
            index: directArg.to.index
          };
        }
      })
      .reject(x => _.isUndefined(x.index))
      .value();

    // console.log(argsOfDef);

    // Link the args
    _(argsOfDef)
      .forEach(el => {
        // console.log(el);
        // Get the edges that come out of the interaction we are replacing
        _(interactionoperandEdgesFrom)
          .filter({
            from: {
              index: el.index
            }
          })
          .forEach(edge => {
            // Get the edges that come in the current argument
            graph
              .matchDirectedEdges({
                type: 'InteractionInstanceOperand',
                to: {
                  node: el.node
                }
              })
              .forEach(ed => {
                // Add the edge going from the node that refer this argument in the subgraph to the nodes that represent this argument in the main graph
                graph
                  .addEdge({
                    type: 'InteractionInstanceOperand',
                    from: ed.from,
                    to: edge.to
                  });
              })
              .commit();
          })
          .commit();

        // We delete the argument  interaction node
        graph
          .finish(el.node);
      })
      .commit();

    graph.finish(interactionNode);

    let res = newSubGraph.nodes;

    _(res)
    .forEach(n=>{
      if(_.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack=[];
      }
      n.content.meta.stack.push(interactionNode);

    })
    .commit();
    return res;

    // return newSubGraph.nodes;

  } else {
    throw new Error('Could not instantiate interaction ' + interactionNode.content.operator + " " + interactionNode.id + " because it is not an argument, a base interaction or a custom defined interaction");
  }

}









// Duplicates a subgraph
function copy(graph, subgraph) {

  let newNodes =
    _(subgraph.nodes)
    .map(n => (graph.addNode(n)))
    .value();

  // Find the copied (or not) version of a node
  function copied(nod) {
    let k = _(subgraph.nodes).findIndex(nod);
    if (k >= 0) {
      return newNodes[k];
    } else {
      return nod;
    }
  }

  let newEdges =
    _(subgraph.edges)
    .map(e => graph.addEdge(_.assign(_.clone(e), {
      from: _.assign(_.clone(e.from), {
        node: copied(e.from.node)
      }),
      to: _.assign(_.clone(e.to), {
        node: copied(e.to.node)
      })
    })))
    .value();

  return {
    nodes: newNodes,
    edges: newEdges
  };
}
