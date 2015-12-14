"use strict"

import _ from 'lodash'

import addInterfaceToGraph from './addInterfaceToGraph'
import addDefinitionToGraph from './addDefinitionToGraph'


export  default function addInterfaceDefinitionToGraph(graph, definition) {
  let rootNode =
    graph
    .addNode({
      type: 'InterfaceDefinition',
      content: definition,
      instantiated: false
    });

  let interfacNode = addInterfaceToGraph(graph, definition.interfac, definition.signature, rootNode);

  graph
    .addEdge({
      type: 'DefinitionInterface',
      from: {
        node: rootNode
      },
      to: {
        node: interfacNode
      }
    });

  return rootNode;
}
