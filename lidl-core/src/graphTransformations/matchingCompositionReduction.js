"use strict"

import _ from 'lodash'
import sat from '../satSolver.js'
var Graph = require('../g.js');

// For a given composition Node, find all the Composition Nodes that match it, Along with the condition to match them, determined by the affectations between the two composition Nodes
// If there is no affectation between them, the condition is always true
// If there is one affectation between them, the condition is this affectation activation
// If there are  more than on affectation between them, it is more complicated
function findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, node) {
  // TODO use

  // Parameter fromWhichSide is 1 or 2, depending on which side of the "=" we are coming from.
  // We visit only nodes on the other side of the "=" sign (hence the "3-fromWhichSide" expressions )
  function visitTheAffectation(n, fromWhichSide) {

    n.temporarilyMarkedDuringCompositionTraversal = true;

    let conditionForCurrentAffectation =
      graph
      .matchUndirectedEdges({
        type: 'InteractionInstanceOperand',
        from: {
          node: n,
          index: 0
        },
        to: {
          node: {
            type: 'InteractionInstance'
          }
        }
      })
      .map(e => e.to)
      .value();

    let compos =
      graph
      .matchUndirectedEdges({
        type: 'InteractionInstanceOperand',
        from: {
          node: n
        },
        to: {
          index: 0,
          node: {
            type: 'InteractionInstance',
            unSuitableForCompositionReduction: false,
            content: {
              type: 'InteractionSimple',
              operatorType: 'Composition'
            }
          }
        }
      })
      .filter(e => ((e.from.index === (3 - fromWhichSide)) && e.to.node.temporarilyMarkedDuringCompositionTraversal !== true))
      .map(e => ({
        compositionNode: e.to.node,
        condition: conditionForCurrentAffectation
      }))
      .value();

    let otheraffects =
      graph
      .matchUndirectedEdges({
        typae: 'InteractionInstanceOperand',
        from: {
          node: n
        },
        to: {
          node: {
            type: 'InteractionInstance',
            content: {
              type: 'InteractionSimple',
              operatorType: 'Affectation'
            }
          }
        }
      })
      .filter(e => (e.from.index === (3 - fromWhichSide)) && (e.to.index === 1 || e.to.index === 2) && (e.to.node.temporarilyMarkedDuringCompositionTraversal !== true))
      .map(e => visitTheAffectation(e.to.node))
      .flatten()
      .map(x => ({
        compositionNode: x.compositionNode,
        condition: x.condition.concat(conditionForCurrentAffectation)
      }))
      .value();

    n.temporarilyMarkedDuringCompositionTraversal = false;

    return compos.concat(otheraffects);

  }

  node.temporarilyMarkedDuringCompositionTraversal = true;
  //
  let compos =
    graph
    .matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: node,
        index: 0
      },
      to: {
        index: 0,
        node: {
          type: 'InteractionInstance',
          unSuitableForCompositionReduction: false,
          content: {
            type: 'InteractionSimple',
            operatorType: 'Composition'
          }
        }
      }
    })
    .map(e => {
      graph.finish(e);
      return {
        compositionNode: e.to.node,
        condition: []
      };
    })
    .value();

  let otheraffects =
    graph
    .matchUndirectedEdges({
      type: 'InteractionInstanceOperand',
      from: {
        node: node,
        index: 0
      },
      to: {
        node: {
          type: 'InteractionInstance',
          content: {
            type: 'InteractionSimple',
            operatorType: 'Affectation'
          }
        }
      }
    })
    .filter(e => (e.to.index === 1 || e.to.index === 2))
    .map(e => {
      graph.finish(e);
      return visitTheAffectation(e.to.node, e.to.index);
    })
    .flatten()
    .value();


  node.temporarilyMarkedDuringCompositionTraversal = false;

  let res = compos.concat(otheraffects);


  return res;


  // return compos;

}



//TODO This Might eventually be the source of Bugs and has not been tested on edges cases
// Here we take several paths that go to composition interactions and simplfy them based on their conditions
function simplifyPathExpression(graph, p) {

  let reduced =
    _(p)
    .groupBy('compositionNode.id') // We group path that go to the same target
    .map(x => // For each of these groups
      ({
        compositionNode: x[0].compositionNode, // Merge target interactions by taking the first
        condition: _(x).pluck('condition').map(y => _.unique(y, z => (z.node.id + " " + z.index))).value() // Merge conditions, and remove duplicates conditions from paths
      })
    )
    .flatten()
    // Now the condition for each target is an array (disjunction) of paths (conjunction)
    .forEach(x => {


      let allConds =
        _(x.condition)
        .flatten()
        .map(c => ({
          cond: c,
          stringRep: (c.node.id + " " + c.index)
        }))
        .unique('stringRep')
        .value();

      if (allConds.length == 0) {
        x.simplifiedCond = null;
      } else {
        if (allConds.length == 1) { // We do not have to create a new Synthetic node in this case
          x.simplifiedCond = x.condition[0][0];
        } else {

          let satProblem =
            _(x.condition)
            .map(y => (
              _(y)
              .map(c => (c.node.id + " " + c.index))
              .value()))
            .value();


          //           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
          //           console.log(_.pluck(allConds,'stringRep'));
          // console.log(satProblem);
          //           console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
          let solution = sat.solvePath(_.pluck(allConds, 'stringRep'), satProblem);
          // console.log(solution);
          // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

          let newNode =
            graph
            .addNode({
              type: 'InteractionInstance',
              content: {
                type: 'InteractionNative',
                content: "TBD"
              }
            });

          let allEdgesToConds =
            _(allConds)
            .map((c, index) => ({
              cond: c.cond,
              stringRep: c.stringRep,
              edge: graph.addEdge({
                type: 'InteractionInstanceOperand',
                from: {
                  index: (index + 1),
                  node: newNode,
                  ports: {type:'InterfaceAtomic',direction:'in',data:{type:'DataAtomic',name:'Activation'}}
                },
                to: c.cond
              })
            }))
            .value();

          let code = _(solution)
            .map(s => {
              let solcode = "if( ";
              solcode = solcode +
                _(s)
                .map((value, index) => ('( <%=a' + (index + 1) + '%>' + ' === ' + (value ? 'active' : 'inactive') + ' )'))
                .join(' && ');
              solcode = solcode + ") {\n  <%=a0%> = active;\n} else {\n  <%=a0%> = inactive;\n}";
              return solcode;
            })
            .join("\n");

          // console.log(code);
          newNode.content.content = code;
          newNode.ports = [{type:'InterfaceAtomic',direction:'out',data:{type:'DataAtomic',name:'Activation'}}].concat(_.map(allConds, {type:'InterfaceAtomic',direction:'in',data:{type:'DataAtomic',name:'Activation'}}));

          // console.log('ffffffffffffffffffffffffffffffffffffffffffffffffff');

          x.simplifiedCond = {
            index: 0,
            node: newNode,
            ports: {type:'InterfaceAtomic',direction:'out',data:{type:'DataAtomic',name:'Activation'}}
          };

        }
      }



    })
    .value();

  // compositionNode

  // returns something which contains a key "simplified cond" which is a graph node that regroupd all conditions

  return reduced;
}





// This is an important graph transform. It deals with the mess of having several linked composition interaction
export default function matchingCompositionReduction(graph) {



  // // Mark all
  graph
    .matchNodes({
      type: 'InteractionInstance',
      content: {
        type: 'InteractionSimple'
      }
    })
    .forEach(theNode => {
      theNode.unSuitableForCompositionReduction = false;
      theNode.didCompositionReduction = false;
    })
    .commit();

  // Now that's tricky !
  // First we find composition nodes that arent treated yet
  graph
    .reduceNodes({
      type: 'InteractionInstance',
      unSuitableForCompositionReduction: false,
      content: {
        type: 'InteractionSimple',
        operatorType: 'Composition'
      }
    }, (theResult, n1) => {

      let matchingCompoNodes = simplifyPathExpression(graph, findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, n1));

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


      _(matchingCompoNodes)
        .forEach(x => {
          let n2 = x.compositionNode;
          // console.log("NULLLLSIMPLEONDDDDDDDD");
          // console.log(x.simplifiedCond);
          if (_.isNull(x.simplifiedCond)) {

            // console.log("ok");

            // No simplified condition because the two composition are linked directly
            // For each edge going to the matching node, we add an edge that goes to the current node with a special label on the port so we dont confuse with edges that already go to it
            graph
              .matchUndirectedEdges({
                type: 'InteractionInstanceOperand',
                from: {
                  node: n2
                }
              })
              .reject(e2 => _.isUndefined(e2.from.compositionElementName))
              .forEach(e2 => {
                // console.log(d2.id);
                let d2 = e2.to;
                // console.log(d2.node.id);
                if (d2.node === n2) d2 = {
                  node: n1,
                  coCompositionElementName: e2.to.compositionElementName,
                  isCoPort: true
                };
                // console.log(d2.node.id);
                graph
                  .addEdge({
                    type: 'InteractionInstanceOperand',
                    from: {
                      node: n1,
                      coCompositionElementName: e2.from.compositionElementName,
                      isCoPort: true
                    },
                    to: d2
                  });
              })
              .commit();

            // We can mark this node as done
            n1.didCompositionReduction = true;
            n2.didCompositionReduction = true;
          } else {
            // There are affectation nodes between the two composition but
            // We have a simplified condition available at x.simplifiedCond

            // console.log("pb");
            graph
              .matchUndirectedEdges({
                type: 'InteractionInstanceOperand',
                from: {
                  node: n2
                }
              })
              .reject(e2 => _.isUndefined(e2.from.compositionElementName))
              .forEach(e2 => {

                let d2 = e2.to;
                if (d2.node === n2) d2 = {
                  node: n1,
                  coCompositionElementName: e2.to.compositionElementName,
                  isCoPort: true
                };

                let intermedAffectation =
                  graph
                  .addNode({
                    type: 'InteractionInstance',
                    content: {
                      type: 'InteractionSimple',
                      operator: '$=$',
                      operatorType: 'Affectation'
                    },
                    ports: [{type:'InterfaceAtomic',direction:'in',data:{type:'DataAtomic',name:'Activation'}}]
                  })

                graph
                  .addEdge({
                    type: 'InteractionInstanceOperand',
                    from: {
                      node: n1,
                      coCompositionElementName: e2.from.compositionElementName,
                      isCoPort: true
                    },
                    to: {
                      node: intermedAffectation,
                      index: 1
                    }
                  });

                graph
                  .addEdge({
                    type: 'InteractionInstanceOperand',
                    from: {
                      node: intermedAffectation,
                      index: 2
                    },
                    to: d2
                  });

                graph
                  .addEdge({
                    type: 'InteractionInstanceOperand',
                    from: {
                      node: intermedAffectation,
                      index: 0
                    },
                    to: x.simplifiedCond
                  });
              })
              .commit();
            // We can mark this node as done
            n1.didCompositionReduction = true;
            n2.didCompositionReduction = true;
            // We have to add custom affectation and use the sat solver
            // throw new Error ("The condition of a multiple assignement between compositions failed to be simplified");
          }


        })
        .commit();


      n1.unSuitableForCompositionReduction = true;

    });


  // gexport(graph,"bob");

  // Now its time to reduce all this mess !
  graph
    .matchNodes({
      type: 'InteractionInstance',
      didCompositionReduction: true
    })
    .forEach(n1 => {
      // console.log("-----------------------------------------------");
      // console.log(n1.id);
      // gexport(graph,n1.id);

      // Lets build a graph of the situation inside the Composition Node. Wiring between ports and co ports
      // Each Node of the internal graph represents a port of the Composition node
      let internalGraph = new Graph();
      internalGraph.type = 'internal';

      let coPortsFrom =
        graph
        .matchDirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: n1
          }
        })
        .filter(x => (x.from.isCoPort === true))
        .map(x => ({
          port: x.from,
          closed: false
        }))
        .value();

      let coPortsTo =
        graph
        .matchDirectedEdges({
          type: 'InteractionInstanceOperand',
          to: {
            node: n1
          }
        })
        .filter(x => (x.to.isCoPort === true))
        .map(x => ({
          port: x.to,
          closed: false
        }))
        .value();

      let coPortNodes = {};
      _([coPortsFrom, coPortsTo])
        .flatten()
        .sortBy("port.coCompositionElementName")
        .unique(true, "port.coCompositionElementName")
        .forEach(x => {
          coPortNodes[x.port.coCompositionElementName] = internalGraph.addNode(x);
        })
        .commit();

      let portsFrom =
        graph
        .matchDirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: n1
          }
        })
        .filter(x => (x.from.isCoPort !== true))
        .map(x => ({
          port: x.from,
          closed: false
        }))
        .value();

      let portsTo =
        graph
        .matchDirectedEdges({
          type: 'InteractionInstanceOperand',
          to: {
            node: n1
          }
        })
        .filter(x => (x.to.isCoPort !== true))
        .map(x => ({
          port: x.to,
          closed: false
        }))
        .value();

      let portNodes = {};
      _([portsFrom, portsTo])
        .flatten()
        .sortBy("port.compositionElementName")
        .unique(true, "port.compositionElementName")
        .forEach(x => {
          portNodes[x.port.compositionElementName] = internalGraph.addNode(x);
        })
        .commit();

      //
      // console.log('-----------------------------------');
      // gexport(internalGraph,n1.id+"internal-1");

      // Connect Ports with their respective coPorts in the internal graph, this is semantics of the composition
      internalGraph
        .matchNodes({
          port: {
            isCoPort: true
          }
        })
        .forEach(n1 => {
          internalGraph
            .matchNodes({
              port: {
                compositionElementName: n1.port.coCompositionElementName
              }
            })
            .filter(x => (x.port.isCoPort !== true))
            .forEach(n2 =>
              internalGraph.addEdge({
                type: 'normal',
                mul: true,
                from: {
                  node: n1
                },
                to: {
                  node: n2
                }
              }))
            .commit();
        })
        .commit();

      // Add loops between ports of the composition node to the internal graph
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: n1
          },
          to: {
            node: n1
          }
        })
        // .forEach(e=>{
        //         console.log('aaaaa '+e.id+ " "+e.from.compositionElementName+ " "+e.from.coCompositionElementName+ " "+e.to.compositionElementName+ " "+e.to.coCompositionElementName);
        // })
        .reject(e => ((_.isUndefined(e.from.compositionElementName) && _.isUndefined(e.from.coCompositionElementName)) || (_.isUndefined(e.to.compositionElementName) && _.isUndefined(e.to.coCompositionElementName))))
        .forEach(e => {
          // console.log('iiii '+e.id);
          let origin = (e.from.isCoPort === true) ? coPortNodes[e.from.coCompositionElementName] : portNodes[e.from.compositionElementName];
          let dest = (e.to.isCoPort === true) ? coPortNodes[e.to.coCompositionElementName] : portNodes[e.to.compositionElementName];
          internalGraph.addEdge({
            type: 'loop',
            mul: true,
            from: {
              node: origin
            },
            to: {
              node: dest
            }
          });
        })
        .commit();

      // console.log('-----------------------------------');
      // gexport(internalGraph,n1.id+"internal-2");

      // Transitively close the internal graph
      internalGraph
        .reduceNodes({
          closed: false
        }, (theResult, theNode) => {
          // console.log("  > "+theNode.id);
          internalGraph
            .matchUndirectedEdges({
              from: {
                node: theNode
              },
              to: {
                node: {
                  closed: false
                }
              }
            })
            .forEach(e1 => {
              internalGraph
                .matchUndirectedEdges({
                  from: {
                    node: theNode
                  },
                  to: {
                    node: {
                      closed: false
                    }
                  }
                })
                .filter(e2 => (e2.id > e1.id))
                .forEach(e2 => {
                  // console.log("close "+e1.to.node.id+" "+e2.to.node.id);
                  // gexport(internalGraph,n1.id+"close "+e1.id);
                  if (_.isEmpty(internalGraph.findUndirectedEdge({
                      from: {
                        node: e1.to.node
                      },
                      to: {
                        node: e2.to.node
                      }
                    }))) {
                    internalGraph
                      .addEdge({
                        type: 'closure',
                        mul: true,
                        from: {
                          node: e1.to.node
                        },
                        to: {
                          node: e2.to.node
                        }
                      });
                  }
                })
                .commit();
            })
            .commit();
          theNode.closed = true;
        });

      // console.log('-----------------------------------');
      //           gexport(internalGraph,n1.id+"internal-3");

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
      internalGraph
        .matchUndirectedEdges({
          from: {
            node: {
              port: {}
            }
          },
          to: {
            node: {
              port: {}
            }
          }
        })
        // .tap(x=>{console.log("internal ");console.log(x);})
        .filter(x => (x.to.node.port.isCoPort !== true && x.from.node.port.isCoPort === true))
        .forEach(internalEdge => {
          // console.log("xxxx")
          graph
            .matchUndirectedEdges({
              from: {
                node: n1,
                coCompositionElementName: internalEdge.from.node.port.coCompositionElementName
              }
            })
            .forEach(coEdge => {
              graph
                .matchUndirectedEdges({
                  from: {
                    node: n1,
                    compositionElementName: internalEdge.to.node.port.compositionElementName
                  }
                })
                .forEach(edge => {
                  // console.log("ADD  "+coEdge.to.node.id+" "+edge.to.node.id);
                  graph
                    .addEdge({
                      type: 'InteractionInstanceOperand',
                      from: coEdge.to,
                      to: edge.to
                    });
                })
                .commit();
            })
            .commit();
        })
        .commit();
    })
    .commit();

  // Finally we finish the treated composition nodes
  graph
    .matchNodes({
      type: 'InteractionInstance',
      didCompositionReduction: true,
      content: {
        type: 'InteractionSimple',
        operatorType: 'Composition'
      }
    })
    .forEach(theNode => {
      // console.log('finish');
      // console.log(theNode);
      graph.finish(theNode);
    })
    .commit();


  // TODO LOOP all this until fixed point (no new composition matches)


}
