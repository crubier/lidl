"use strict"

import _ from 'lodash'


export  default function addInterfaceToGraph(graph, interfac, prefix, definitionNode) {
  var rootNode;

  switch (interfac.type) {
    case "InterfaceAtomic":

      rootNode =
        graph
        .addNode({
          type: 'Interface',
          name: prefix,
          content: interfac
        });

      break;
    case "InterfaceComposite":
      rootNode =
        graph
        .addNode({
          type: 'Interface',
          name: prefix,
          content: interfac
        });

      let nodeOfElement =
        _(interfac.element)
        .map(x => addInterfaceToGraph(graph, x.value, prefix + "." + x.key, definitionNode))
        .value();

      _(nodeOfElement)
        .forEach((x, index) =>
          graph
          .addEdge({
            type: 'InterfaceElement',
            from: {
              node: rootNode,
              index: index + 1
            },
            to: {
              node: x,
              index: 0
            }
          }))
        .commit();
      break;
    case "InterfaceNamed":
      rootNode =
        graph
        .addNode({
          type: 'Interface',
          name: prefix,
          content: interfac
        });
      break;
    default:
      throw new Error("Cannot transform into a graph the interface of type "+interfac.type);
  }




  graph
    .addEdge({
      type: 'DefinitionSubInterface',
      from: {
        node: definitionNode
      },
      to: {
        node: rootNode
      }
    });
  return rootNode;
}
