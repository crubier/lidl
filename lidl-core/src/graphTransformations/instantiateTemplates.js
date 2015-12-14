"use strict"

import _ from 'lodash'

import {
  madeOnlyOf,
  conjugateInterface
}
from '../interfaces'

export default function instantiateTemplates(graph) {

  graph
    .matchNodes({
      type: 'InteractionInstance'
    })
    .forEach(n => {
      n.shouldDoCodeGeneration = true;
      n.codeGeneration = false;
    })
    .commit();

  graph
    .reduceNodes({
      type: 'InteractionInstance',
      content: {
        type: "InteractionNative"
      },
      shouldDoCodeGeneration: true
    }, (theResult, theNode) => {

      let theArgs = {};
      let shouldGenerate = true;

      _(theNode.ports)
        .forEach((ports, index) => {
          // Normally there should be no duplicated edges, we assume there arent any, and use graph.find to find the only one:
          let edge =
            graph
            .findUndirectedEdge({
              type: 'InteractionInstanceOperand',
              from: {
                node: theNode,
                index: index
              }
            });
          if (edge === undefined) {
            //TODO This node is missing some links and we are going to create them like it's nothing : lol
            // console.log("Missing links on node but whatever, I am creating fake nodes for them "+theNode.id);
            if (madeOnlyOf(ports) === 'in') {
              // console.log("IN");
              // Create a node that keep sending inactive values
              let newNode =
                graph
                .addNode({
                  type: 'InteractionInstance',
                  content: {
                    type: "InteractionNative",
                    content: "<%=a0%> = inactive; //Fake sender node\n"
                  },
                  shouldDoCodeGeneration: true,
                  codeGeneration:false,
                  ports: [conjugateInterface(ports)]
                });
              // newNode.content.content = '// ' + newNode.id + '\n' + newNode.content.content;
              edge =
                graph
                .addEdge({
                  type: 'InteractionInstanceOperand',
                  from: {
                    node: newNode,
                    index: 0,
                    ports: conjugateInterface(ports)
                  },
                  to: {
                    node: theNode,
                    index: index,
                    ports: ports
                  }
                });
            } else if (madeOnlyOf(ports) === 'out') {
              // console.log("OUT");
              // Create a node that receives the value
              let newNode =
                graph
                .addNode({
                  type: 'InteractionInstance',
                  content: {
                    type: "InteractionNative",
                    content: "// We dont care about <%=a0%>, this is a fake receiver node\n"
                  },
                  shouldDoCodeGeneration: true,
                  codeGeneration:false,
                  ports: [conjugateInterface(ports)]
                });
              // newNode.content.content = '// ' + newNode.id + '\n' + newNode.content.content;
              edge =
                graph
                .addEdge({
                  type: 'InteractionInstanceOperand',
                  to: {
                    node: newNode,
                    index: 0,
                    ports: conjugateInterface(ports)
                  },
                  from: {
                    node: theNode,
                    index: index,
                    ports: ports
                  }
                });
            } else {
              edge = {id:''};
              // throw new Error('A node of the DAG ('+theNode.id+') is missing a connexion (on port '+index+') with a composite interface (edge: '+JSON.stringify(edge)+' )');
            }
          }
          theArgs["a" + index] = edge.id;
        })
        .commit();

      if (shouldGenerate) {
        // console.log(theArgs)
        theNode.codeGeneration = {
          'js': '// ' + theNode.id + '\n' + _.template(theNode.content.content)(theArgs)
        };
        theNode.codeGenerated = true;
      }

      theNode.shouldDoCodeGeneration = false;

    });

}
