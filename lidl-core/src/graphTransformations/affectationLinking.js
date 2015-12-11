"use strict"

import _ from 'lodash'

import {
  mergeInterface, madeOnlyOf, conjugateInterface, isUndefined
}
from '../interfaces'

export default function affectationLinking(graph) {
  // Mark all as linkable
  graph
    .matchNodes({
      type: 'InteractionInstance',
      content: {
        type: 'InteractionSimple',
        operatorType: 'Affectation'
      }
    })
    .forEach(theNode => {
      theNode.potentiallyAffectationLinkable = true;
    })
    .commit();


  // reduce
  graph
    .reduceNodes({
      type: 'InteractionInstance',
      potentiallyAffectationLinkable: true,
      content: {
        type: 'InteractionSimple',
        operatorType: 'Affectation'
      }
    }, (theResult, theNode) => {
      theNode.ports[0] = {
        type: 'InterfaceAtomic',
        data: {
          type: 'DataAtomic',
          name: 'Activation'
        },
        direction: 'in'
      }; // The ports 0 of affectations is  activation in : affectation are behaviours
      if (!isUndefined(theNode.ports[1]) && !isUndefined(theNode.ports[2])) {
        if (madeOnlyOf(theNode.ports[1])=== 'out' && madeOnlyOf(theNode.ports[2])=== 'in') {
          let source =
            graph
            .addNode({
              type: 'InteractionInstance',
              content: {
                type: 'InteractionNative',
                content: 'if(<%=a0%> === active) {<%=a1%> = <%=a2%>;}\n'
              },
              ports: theNode.ports
            });

          _(_.range(3))
            .forEach(i =>
              graph
              .matchUndirectedEdges({
                type: 'InteractionInstanceOperand',
                from: {
                  node: theNode,
                  index: i
                }
              })
              .forEach(x =>
                graph
                .addEdge({
                  type: 'InteractionInstanceOperand',
                  from: {
                    node: source,
                    index: i
                  },
                  to: x.to
                }))
              .commit())
            .commit();

          graph
            .finish(theNode);
        } else if (madeOnlyOf(theNode.ports[1])=== 'in' && madeOnlyOf(theNode.ports[2])=== 'out') {
          let source =
            graph
            .addNode({
              type: 'InteractionInstance',
              content: {
                type: 'InteractionNative',
                content: 'if(<%=a0%> === active) {<%=a2%> = <%=a1%>;}\n'
              },
              ports: theNode.ports
            });

          _(_.range(3))
            .forEach(i =>
              graph
              .matchUndirectedEdges({
                type: 'InteractionInstanceOperand',
                from: {
                  node: theNode,
                  index: i
                }
              })
              .forEach(x =>
                graph
                .addEdge({
                  type: 'InteractionInstanceOperand',
                  from: {
                    node: source,
                    index: i
                  },
                  to: x.to
                }))
              .commit())
            .commit();

          graph
            .finish(theNode);
        } else if (madeOnlyOf(theNode.ports[1])=== 'in' && madeOnlyOf(theNode.ports[2])=== 'in') {
          // The affectation node does not make sense
          //TODO throw errors maybe
          graph
            .finish(theNode);
        } else if (madeOnlyOf(theNode.ports[1])=== 'out' && madeOnlyOf(theNode.ports[2])=== 'out') {

          graph
            .finish(theNode);
        } else {
          theNode.potentiallyAffectationLinkable = false;
        }
      } else {
        if (!isUndefined(theNode.ports[1])) {
          // if (madeOnlyOf(theNode.ports[1])=== 'out') {
            theNode.ports[2] = conjugateInterface(theNode.ports[1]);
          // }
          // if (madeOnlyOf(theNode.ports[1])=== 'in') {
          //   theNode.ports[2] = conjugateInterface(theNode.ports[1]);
          // }
        } else if (!isUndefined(theNode.ports[2])) {
          // if (madeOnlyOf(theNode.ports[2])=== 'out') {
            theNode.ports[1] = conjugateInterface(theNode.ports[2]);
          // }
          // if (madeOnlyOf(theNode.ports[2])=== 'in') {
          //   theNode.ports[1] = conjugateInterface(theNode.ports[2]);
          // }
        } else {
          theNode.potentiallyAffectationLinkable = false;
        }
      }
    });



}
