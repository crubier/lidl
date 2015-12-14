"use strict"


import _ from 'lodash'


export default function linkInterfacesToDefinitions(graph) {
  // Mark all nodes as not having a definition
  graph
    .matchNodes({
      type: 'Interface',
      content: {
        type: 'InterfaceNamed'
      }
    })
    .forEach(theNode => {
      theNode.hasDefinition = false;
    })
    .commit();



  graph
    .reduceNodes({
      type: 'Interface',
      content: {
        type: 'InterfaceNamed'
      },
      hasDefinition: false
    }, (theResult, theNode) => {

      let edgeToParent =
        graph
        .findDirectedEdge({
          type: 'DefinitionSubInterface',
          to: {
            node: theNode
          }
        });

      while (!_.isUndefined(edgeToParent)) {

        let parentDef = edgeToParent.from.node;

        // First case : Interface definition is a child of current definition
        let childDefs =
          graph
          .matchDirectedEdges({
            type: 'DefinitionDefinition',
            from: {
              node: parentDef
            }
          })
          .pluck("to.node")
          .filter(defNode => defNode.content.signature === theNode.content.name)
          .value();
        if (_.size(childDefs) > 1) {
          throw new Error('LIDL does not support polymorphism yet (for interface ' + theNode.content.name + ')');
        } else if (_.size(childDefs) === 1) {
          graph
            .addEdge({
              type: 'InterfaceDefinition',
              from: {
                node: theNode
              },
              to: {
                node: _.first(childDefs)
              }
            });
          theNode.hasDefinition = true;
          break;
        }


        // Second case: Interface is maybe defined in a parent definition
        edgeToParent =
          graph
          .findDirectedEdge({
            type: 'DefinitionDefinition',
            to: {
              node: parentDef
            }
          });

      }

      if (!theNode.hasDefinition) {
        throw new Error ('Could not find definition for interface named '+theNode.content.name);
      }

    });

}
