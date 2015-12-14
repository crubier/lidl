"use strict"

import _ from 'lodash'

import addInterfaceToGraph from './addInterfaceToGraph'
import addInteractionToGraph from './addInteractionToGraph'
import addDefinitionToGraph from './addDefinitionToGraph'

export default function addInteractionDefinitionToGraph(graph, definition) {
  let rootNode =
    graph
    .addNode({
      type: 'InteractionDefinition',
      content: definition,
      instantiated: false
    });

  // Add sub defintions
  _(definition.definitions)
    .map(subDefinition => addDefinitionToGraph(graph, subDefinition))
    .forEach((subDefinitionNode, index) => {
      graph
        .addEdge({
          type: 'DefinitionDefinition',
          from: {
            node: rootNode,
            index: (index + 1)
          },
          to: {
            node: subDefinitionNode,
            index: 0
          }
        })
    })
    .commit();

  // Add arguments
  _(definition.signature.operand)
    .map(operand => {
      let operandNode =
        graph
        .addNode({
          type: 'InteractionSignatureOperandElement',
          content: operand
        });

      // console.log(operand.interfac);
      let operandInterfaceNode =
        addInterfaceToGraph(graph, operand.interfac, 'theArgs.' + operand.name, rootNode);

      graph
        .addEdge({
          type: 'InteractionSignatureOperandElementInterface',
          from: {
            node: operandNode
          },
          to: {
            node: operandInterfaceNode
          }
        });
      return operandNode;
    })
    .forEach((operandNode, index) => {
      graph
        .addEdge({
          type: 'SignatureOperand',
          from: {
            node: rootNode,
            index: (index + 1)
          },
          to: {
            node: operandNode,
            index: 0
          }
        })
    })
    .commit();

  // Add interface
  let interfaceNode =
    addInterfaceToGraph(graph, definition.signature.interfac, 'theInterface', rootNode);

  graph
    .addEdge({
      type: 'DefinitionInterface',
      from: {
        node: rootNode
      },
      to: {
        node: interfaceNode
      }
    });


  // Add interaction
  graph
    .addEdge({
      type: 'DefinitionInteraction',
      from: {
        node: rootNode
      },
      to: {
        node: addInteractionToGraph(graph, definition.interaction, rootNode)
      }
    })

  return rootNode;

}
