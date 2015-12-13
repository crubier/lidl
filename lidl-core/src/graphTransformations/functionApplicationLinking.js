"use strict"

import _ from 'lodash'

import {
  mergeInterface,
  isAtomic,
  conjugateInterface
}
from '../interfaces'

import {ExtendableError} from '../extendableError'

import {serialize} from '../serializer'

import {printInteractionInstanceNodeStack} from '../reporting'


export default function functionApplicationLinking(graph) {
  graph
    .reduceNodes({
      type: 'InteractionInstance',
      content: {
        operatorType: 'FunctionApplication'
      }
    }, (theResult, theNode) => {
      let source =
        graph
        .addNode({
          type: 'InteractionInstance',
          content: {
            type: 'InteractionNative',
            content: 'if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}\n'
          },
          ports: [{
              type: 'InterfaceAtomic',
              direction: "in",
              data: {
                type: 'DataAtomic',
                name: 'Activation'
              }
            }]
        });


      // Connect root
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

      // Connect function
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 1
          }
        })
        .forEach(x =>{
          source.ports[1] = mergeInterface(source.ports[1], conjugateInterface( x.to.node.ports[x.to.index]));
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

      if (!isAtomic(source.ports[1]) || source.ports[1].data.type !== 'DataFunction') throw new Error('Function application should receive functions as first argument, received the interface ' + JSON.stringify(source.ports[1]));
      // Infer in and out ports interfaces from interface of the function
      source.ports[2] = {
        type: 'InterfaceAtomic',
        direction: 'in',
        data: source.ports[1].data.domain
      };
      source.ports[3] = {
        type: 'InterfaceAtomic',
        direction: 'out',
        data: source.ports[1].data.codomain
      };

      // Connect input
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 2
          }
        })
        .forEach(x =>{
          try {
            source.ports[2] = mergeInterface(source.ports[2], conjugateInterface(x.to.node.ports[x.to.index]));
          } catch (e) {
            switch (e.name) {
              case "IncompatibleInterfaceError":
                break;
              case "InvalidInterfaceError":
                break;
              default:
            }
            throw new Error("While linking "+x.id+": "+ e.message+"\n"+printInteractionInstanceNodeStack(x.to.node)+"\n"+printInteractionInstanceNodeStack(x.from.node));
          }

          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source,
              index: 2
            },
            to: x.to
          });})
        .commit();

      // Connect output
      graph
        .matchUndirectedEdges({
          type: 'InteractionInstanceOperand',
          from: {
            node: theNode,
            index: 3
          }
        })
        .forEach(x =>{
          source.ports[3] = mergeInterface(source.ports[3], conjugateInterface(x.to.node.ports[x.to.index]));
          graph
          .addEdge({
            type: 'InteractionInstanceOperand',
            from: {
              node: source,
              index: 3
            },
            to: x.to
          });})
        .commit();

      graph
        .finish(theNode);
    });
}
