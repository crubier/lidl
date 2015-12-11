"use strict"

import _ from 'lodash'


import {
  mergeInterface,
  isAtomic,
  conjugateInterface
}
from '../interfaces'

export default function previousNextLinking(graph) {
  graph
    .reduceNodes({
      type: 'InteractionInstance',
      content: {
        operatorType: 'Previous'
      }
    }, (theResult, theNode) => {
      let stateId = _.uniqueId('state_');

      // Add a first node to get from state variable
      let source =
        graph
        .addNode({
          type: 'InteractionInstance',
          containsAState: true,
          stateVariableName: stateId,
          content: {
            'type': 'InteractionNative',
            'content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\n}\n"
          },
          ports: [{
            type: 'InterfaceAtomic',
            direction: "in",
            data: {
              type: 'DataAtomic',
              name: 'Activation'
            }
          }, undefined]
        });
      // Add edge to first ports
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 0
          }
        })
        .forEach(x =>
          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source,
              index: 0
            },
            to: x.to
          }))
        .commit();
      // Add edge to second ports
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 1
          }
        })
        .forEach(x =>{
          source.ports[1] = mergeInterface(source.ports[1], conjugateInterface(x.to.node.ports[x.to.index]));
          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source,
              index: 1
            },
            to: x.to
          });})
        .commit();


      // Add a second node to set state variable
      let source2 =
        graph
        .addNode({
          type: 'InteractionInstance',
          containsAState: true,
          stateVariableName: stateId,
          content: {
            'type': 'InteractionNative',
            'content': "if(<%=a0%> === active) {\nnextState['" + stateId + "'] = <%=a1%>;\n}\n"
          },
          ports: [{
            type: 'InterfaceAtomic',
            direction: "in",
            data: {
              type: 'DataAtomic',
              name: 'Activation'
            }
          }, undefined]
        });
      // Add edge to first ports
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 0
          }
        })
        .forEach(x =>
          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source2,
              index: 0
            },
            to: x.to
          }))
        .commit();
      // Add edge to second ports
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 2
          }
        })
        .forEach(x =>{
          source2.ports[1] = mergeInterface(source2.ports[1], conjugateInterface(x.to.node.ports[x.to.index]));
          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source2,
              index: 1
            },
            to: x.to
          });})
        .commit();


      graph
        .finish(theNode);
    });

}
