"use strict"

import _ from 'lodash'

export  default function addInteractionToGraph(graph, interaction, definitionNode) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode =
        graph
        .addNode({
          type: 'Interaction',
          content: interaction,
          ports: []
        });

      graph
        .addEdge({
          type: 'DefinitionSubInteraction',
          from: {
            node: definitionNode
          },
          to: {
            node: rootNode
          }
        });

      _(interaction.operand)
        .map(operand => addInteractionToGraph(graph, operand, definitionNode))
        .forEach((x, index) => {
          graph
            .addEdge({
              type: 'InteractionOperand',
              content: interaction,
              from: {
                node: rootNode,
                index: index + 1
              },
              to: {
                node: x,
                index: 0
              }
            })
        })
        .commit();

      break;
    case 'InteractionNative':
      rootNode = graph.addNode({
        type: 'Interaction',
        content: interaction,
        ports: []
      });
      graph
        .addEdge({
          type: 'DefinitionSubInteraction',
          from: {
            node: definitionNode
          },
          to: {
            node: rootNode
          }
        });
      break;
    default:
      throw new Error('Trying to transform into a graph an invalid interaction of type '+interaction.type);
  }

  return rootNode;
}
