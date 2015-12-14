"use strict"

import _ from 'lodash'
import interactions from '../interfaces';
import {serialize} from '../serializer';

// This follow the pattern used in Expand Interactions
export default function expandInterfaces(graph) {
  // First we create dependency links between definitions nodes
  // For each definition
  graph
    .matchNodes({
      type: 'InterfaceDefinition'
    })
    .forEach(defNode => {
      defNode.markedDuringInterfaceDefinitionGraphOrdering = false;
      // For each of its sub interfaces
      graph
        .matchDirectedEdges({
          type: 'DefinitionSubInterface',
          from: {
            node: defNode
          },
          to: {
            node: {
              hasDefinition: true
            }
          }
        })
        .pluck('to.node')
        .forEach(subInterfaceNode => {
          // Find the definition of this sub interaction
          let subInterfaceDefNode =
            graph
            .findDirectedEdge({
              type: 'InterfaceDefinition',
              from: {
                node: subInterfaceNode
              }
            })
            .to.node;

          // Add a dependency from the definition to the definition of the sub interaction
          if (_.isUndefined(graph.findDirectedEdge({
              type: 'InterfaceDefinitionDependency',
              from: {
                node: defNode
              },
              to: {
                node: subInterfaceDefNode
              }
            }))) {
            graph
              .addEdge({
                type: 'InterfaceDefinitionDependency',
                from: {
                  node: defNode
                },
                to: {
                  node: subInterfaceDefNode
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
      type: 'InterfaceDefinition',
      markedDuringInterfaceDefinitionGraphOrdering: false
    }, (theResult, theNode) => {
      visitDef(theNode);
    });

  function visitDef(n) {
    if (n.temporarilyMarkedDuringInterfaceDefinitionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("the definition structure contains circular definitions"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringInterfaceDefinitionGraphOrdering !== true) {
        n.temporarilyMarkedDuringInterfaceDefinitionGraphOrdering = true;
        graph
          .matchNodes(m =>
            graph
            .matchDirectedEdges({
              type: 'InterfaceDefinitionDependency',
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

        n.markedDuringInterfaceDefinitionGraphOrdering = true;
        n.temporarilyMarkedDuringInterfaceDefinitionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }



  // Finally, we expand all definitions, in order.
  _(orderingList)
    .reverse() // reverse the list in order to expand most basic interction definitions first
    .forEach(defNode => {
      instantiateInterfaceDefinitionInterface(graph, defNode);
    })
    .commit();



}



function instantiateInterfaceDefinitionInterface(graph,defNode) {
  console.log("expanding "+defNode.content.signature);
}
