"use strict"

import {conjugateInterface, toOperator, mergeInterface, subInterface} from '../interfaces.js'
import _ from 'lodash'

// This transformation transforms interfaces into appropriate interaction instances

export default function instantiateInterfaces(graph, defNode) {

  graph
    .matchNodes({
      type: 'Interface'
    })
    .forEach(n => {
      n.markedDuringInterfaceGraphOrdering = false;
    })
    .commit();

  let orderingList = [];

  // TODO Maybe we can only visit the root definition instead of all of them
  // Then we create a graph ordering of all definition nodes according to the dependency relationship
  graph
    .reduceNodes({
      type: 'Interface',
      markedDuringInterfaceGraphOrdering: false
    }, (theResult, theNode) => {
      visitInterface(theNode);
    });

  function visitInterface(n) {
    if (n.temporarilyMarkedDuringInterfaceGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("the interface structure contains cycles"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringInterfaceGraphOrdering !== true) {
        n.temporarilyMarkedDuringInterfaceGraphOrdering = true;
        graph
          .matchNodes(m =>
            graph
            .matchDirectedEdges({
              type: 'InterfaceElement',
              from: {
                node: n
              },
              to: {
                node: m
              }
            })
            .size() > 0)
          .forEach(visitInterface)
          .commit();

        n.markedDuringInterfaceGraphOrdering = true;
        n.temporarilyMarkedDuringInterfaceGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }

  // console.log('XXXXXX');
  // console.log(orderingList);

  // Finally, we expand all definitions, in order.
  _(orderingList)
    .reverse() // reverse the list in order to expand most basic interactions first
    .map(interfaceNode => {
      instantiateInterface(graph, interfaceNode);
    })
    .commit();



  // Instantiate main interface

  // Instantiate arguments
}

function instantiateInterface(graph, interfacNode) {
  // console.log("Instantiate");
  // console.log(interfacNode.name);

  let prefix = interfacNode.name;

  let interfac = interfacNode.content;

  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      if (interfac.direction === "in") {
        rootNode =
          graph
          .addNode({
            type: 'InteractionInstance',
            content: {
              type: "InteractionNative",
              content: "<%=a0%>=" + prefix + ";\n"
            },
            ports: [conjugateInterface(interfac)]
          });
      } else {
        rootNode =
          graph
          .addNode({
            type: 'InteractionInstance',
            content: {
              type: "InteractionNative",
              content: "" + prefix + "=<%=a0%>;\n"
            },
            ports: [conjugateInterface(interfac)]
          });
      }
      break;
    case "InterfaceComposite":

      // Find nodes that corespond to sub interfaces of this interface, if everything goes well, they should already be instantiated
      let nodeOfElement =
        graph
        .matchDirectedEdges({
          type: 'InterfaceElement',
          from: {
            node: interfacNode
          }
        })
        .map(edge => {
          let edgeToInstance =
            graph
            .findDirectedEdge({
              type: 'InterfaceInteractionInstance',
              from: {
                node: edge.to.node
              }
            })
            // console.log(edgeToInstance);
          return {
            index: edge.from.index,
            node: edgeToInstance.to.node
          };
        })
        .sortBy('index')
        .value();

      // console.log(nodeOfElement);

      // Create the node that correspond to the interaction that instantiates this interface
      rootNode =
        graph
        .addNode({
          type: 'InteractionInstance',
          content: {
            type: "InteractionSimple",
            operator: toOperator(interfac),
            operatorType: 'Composition'
          },
          ports: [conjugateInterface(interfac)]
        });

      // for each child element
      _(nodeOfElement)
        .forEach((x) => {
          x.node.ports[0]=mergeInterface(x.node.ports[0], conjugateInterface(subInterface(interfac,interfac.element[x.index - 1].key)) )
          rootNode.ports[x.index] = conjugateInterface(x.node.ports[0]);
          graph
            .addEdge({
              type: 'InteractionInstanceOperand',
              content: interfac,
              from: {
                node: rootNode,
                index: x.index,
                compositionElementName: interfac.element[x.index - 1].key,
                ports: rootNode.ports[x.index]
              },
              to: {
                node: x.node,
                index: 0,
                ports:x.node.ports[0]
              }
            })
        })
        .commit();

      break;
    default:
      throw new Error("Cant transform this interface to a graph. Is it an interface really ?");
  }

  graph
    .addEdge({
      type: 'InterfaceInteractionInstance',
      from: {
        node: interfacNode
      },
      to: {
        node: rootNode
      }
    });
  return rootNode;
}
