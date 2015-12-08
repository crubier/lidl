"use strict"


import _ from 'lodash'


export default function linkInteractionsToDefinitions(graph) {
  // Mark all nodes as not having a definition
  graph
  .matchNodes({type:'Interaction',content:{type:'InteractionSimple'}})
  .forEach(theNode=>{
    if(theNode.content.operatorType === 'Custom') {
      theNode.hasDefinition=false;
    } else {
      theNode.hasDefinition=true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
    }
  })
  .commit();

  graph
  .reduceNodes({type:'Interaction',content:{type:'InteractionSimple',operatorType:'Custom'},hasDefinition:false},
    (theResult,theNode)=>{

    let edgeToParent =
    graph
    .findDirectedEdge({type:'DefinitionSubInteraction',to:{node:theNode}});

    while( ! _.isUndefined(edgeToParent) ) {

      let parentDef = edgeToParent.from.node;

      // First case : Interaction definition is a child of current definition
      let childDefs =
      graph
      .matchDirectedEdges({type:'DefinitionDefinition',from:{node:parentDef}})
      .pluck("to.node")
      .filter(defNode=>defNode.content.signature.operator === theNode.content.operator)
      .value();
      if(_.size(childDefs)>1) {
        throw new Error('LIDL does not support polymorphism yet (for interaction operator ' + theNode.content.operator + ')');
      } else if(_.size(childDefs) === 1) {
        graph
        .addEdge({type:'InteractionDefinition',from:{node:theNode},to:{node:_.first(childDefs)}});
        theNode.hasDefinition=true;
        theNode.isArgument = false;
        theNode.isCustom = true;
        theNode.isBase = false;
        break;
      }


      // Second case : Interaction definition is an argument ( aka operand) of current definition
      let argPos =
      _(parentDef.content.signature.operand)
      .pluck("name")
      .indexOf(theNode.content.operator) + 1;
      if(argPos > 0 ) {
        let argNode =
        graph
        .findDirectedEdge({type:'SignatureOperand',from:{node:parentDef,index:argPos}})
        .to.node;
        graph
        .addEdge({type:'InteractionDefinition',from:{node:theNode},to:{node:argNode}});
        theNode.hasDefinition=true;
        theNode.isArgument = true;
        theNode.isCustom = false;
        theNode.isBase = false;
        break;
      }

      // Third case: Interaction is maybe defined in a parent definition
      edgeToParent =
      graph
      .findDirectedEdge({type:'DefinitionDefinition',to:{node:parentDef}});

    }

    if(! theNode.hasDefinition) {
      // If the node has no definition then we consider it as a identifier
      theNode.content.operator= '#'+theNode.content.operator;
      theNode.content.operatorType='Identifier';
      theNode.hasDefinition=true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
      // throw new Error ('Could not find definition for interaction with operator '+theNode.content.operator);
    }

  });

}
