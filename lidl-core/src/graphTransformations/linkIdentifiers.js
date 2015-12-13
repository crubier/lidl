"use strict"

import _ from 'lodash'

export default function linkIdentifiers(graph) {
  graph
    .reduceNodes({
      type: 'InteractionInstance',
      content: {
        operatorType: 'Identifier'
      }
    }, (theResut, theNode) => {

      if (!_(theNode.content.operator).endsWith('?') && !_(theNode.content.operator).endsWith('!')) {
        // Simple identifier situation
        graph
          .matchUndirectedEdges({
            type: 'InteractionInstanceOperand',
            to: {
              node: theNode,
              index: 0
            }
          })
          .map(e1 =>
            graph
            .matchUndirectedEdges({
              type: 'InteractionInstanceOperand',
              to: {
                node: theNode,
                index: 0
              }
            })
            .filter(x => (x.id > e1.id)) // Only one way
            .map(e2 =>
              graph
              .addEdge({
                type: 'InteractionInstanceOperand',
                from: e1.from,
                to: e2.from,
                createdByEliminatingIdentifier: true,
                meta: theNode.meta
              }))
            .commit())
          .commit();
        graph
          .finish(theNode);
      } else {
        // Oriented identifier situation (identifiers with ! or ? in the end, like (x?) or (my var !)  )

        

        //Similar situation to referential transparency, we need to find nodes with matching operators and children
        let theChildrenEdges =
          graph
          .matchUndirectedEdges({
            type: 'InteractionInstanceOperand',
            from: {
              node: theNode
            }
          })
          .filter(e => e.from.index > 0) // Only children, not the parent which has index 0
          .value();


        // We find the node which has the opposite situation (? instead of ! or vice versa)
        let operator = theNode.content.operator;
        let suffix = operator.slice(-1);
        let coSuffix = (suffix === '!') ? '?' : '!';
        let coOperator = operator.slice(0, -1) + coSuffix;
        let coNode =
          graph
          .matchNodes({
            type: 'InteractionInstance',
            content: {
              operator: coOperator
            }
          }) // Co operator
          .filter(n => // All chidren of similarNode are children of theNode
            graph
            .matchUndirectedEdges({
              type: 'InteractionInstanceOperand',
              from: {
                node: n
              }
            })
            .filter(e => e.from.index > 0) // We check for similarity of children only, not parents !
            .every(e =>
              _(theChildrenEdges)
              .filter({
                from: {
                  index: e.from.index
                },
                to: {
                  index: e.to.index,
                  node: e.to.node
                }
              })
              .size() === 1))
          .filter(n => // All children of theNode are children of the similarNode
            _(theChildrenEdges)
            .every(ce =>
              graph
              .matchUndirectedEdges({
                type: 'InteractionInstanceOperand',
                from: {
                  node: n
                }
              })
              .filter(e => e.from.index > 0)
              .filter({
                from: {
                  index: ce.from.index
                },
                to: {
                  index: ce.to.index,
                  node: ce.to.node
                }
              })
              .size() === 1))
            .tap(x=>{
              if(x.length > 1) {
                throw new Error ('Fatal: referentialTransparency failed, we found more than one similar coNodes for an identifier');
              }})
          .first();


        //
        // console.log(theNode.content.operator);
        // console.log(coNode.content.operator);

        graph
          .matchUndirectedEdges({
            type: 'InteractionInstanceOperand',
            to: {
              node: theNode,
              index: 0
            }
          })
          .map(e1 =>
            graph
            .matchUndirectedEdges({
              type: 'InteractionInstanceOperand',
              to: {
                node: coNode,
                index: 0
              }
            })
            .map(e2 =>
              graph
              .addEdge({
                type: 'InteractionInstanceOperand',
                from: e1.from,
                to: e2.from,
                createdByEliminatingIdentifier: true,
                meta: theNode.meta //TODO merge meta of theNode and coNode
              }))
            .commit())
          .commit();

        graph
          .finish(theNode);

        graph
          .finish(coNode);



      }


    });
}
