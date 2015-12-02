"use strict"

import identifiers  from'./identifiers.js';
import interactions from'./interactions.js';
import serializer from'./serializer.js';
import operator from'./operator.js';
import Graph from'./g.js';
import _ from 'lodash';



export function expand(ast){
  return _(ast)
  // .tap(x=>console.log("aaaaaaaaaa"))
  // .tap(x=>console.log(serializer.serialize(x[0].interaction)))
  .map(lidlDef=>interactions.expand(lidlDef))
  // .tap(x=>console.log("bbbbbbbbbb"))
  // .tap(x=>console.log(serializer.serialize(x[0].interaction)))
  .map(lidlDef=>
    _(lidlDef)
    .assign({interaction:identifiers.reduceIdentifiers(lidlDef.interaction)})
    .value())
  .value();
}





export function newExpand(ast){
  let graph = new Graph();

  let rootDefinitionNode = addDefinitionToGraph(graph,ast);
  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);
  linkInteractionsToDefinitions(graph);

  computeDefinitionDependencies(graph);

  // instantiateDefinitionInteraction(graph,rootDefinitionNode)

  return graph;
}







function addOperatorTypeAnnotation(graph) {
    graph
    .matchNodes({type:'Interaction',content: {type: "InteractionSimple"}})
    .forEach(x => {
      x.content.operatorType = operator.parse(x.content.operator);})
    .commit();
}

function addDefinitionToGraph(graph, definition) {
  let rootNode =
  graph
  .addNode({type:'Definition',content: definition,instantiated:false});

  _(definition.definitions)
  .map(subDefinition=> addDefinitionToGraph(graph, subDefinition))
  .forEach((subDefinitionNode, index) => {
    graph
    .addEdge({type:'DefinitionDefinition',from:{node:rootNode,index:(index+1)},to:{node:subDefinitionNode,index:0}})
  })
  .commit();

  _(definition.signature.operand)
    .map(operand=> graph.addNode({type:'SignatureOperandElement',content:operand}))
    .forEach((operandNode, index) => {
      graph
      .addEdge({type:'SignatureOperand',from:{node:rootNode,index:(index+1)},to:{node:operandNode,index:0}})
    })
    .commit();


  graph
  .addEdge({type:'DefinitionInteraction',from:{node:rootNode},to:{node:addInteractionToGraph(graph,definition.interaction,rootNode)}})

  return rootNode;
}

function addInteractionToGraph(graph, interaction,definitionNode) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode =
      graph
      .addNode({type:'Interaction',content: interaction});

      graph
      .addEdge({type:'DefinitionSubInteraction',from:{node:definitionNode},to:{node:rootNode}});

      _(interaction.operand)
      .map(operand=> addInteractionToGraph(graph, operand,definitionNode))
      .forEach((x, index) => {
        graph
        .addEdge({type:'InteractionOperand',content:interaction,from:{node:rootNode,index:index+1},to:{node:x,index:0}})
      })
      .commit();

      break;
    case 'InteractionNative':
      rootNode = graph.addNode({type:'Interaction',content: interaction});
      graph
      .addEdge({type:'DefinitionSubInteraction',from:{node:definitionNode},to:{node:rootNode}});
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }

  return rootNode;
}




function findParentDefinition(graph,definitionNode) {
  return
  graph
  .findDirectedEdge({type:'DefinitionDefinition',to:{node:definitionNode}})
  .from.node;
}






// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {
  // First we mark all nodes as not referentialTransparencySolved
  graph
  .matchNodes({type: 'Interaction',content: {type: 'InteractionSimple'}})
  .forEach( (theNode) => {
    theNode.referentialTransparencySolved=false;
    theNode.referentialTransparencySolvable = // Only leaves are solvable intially
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:theNode}})
      .filter(e=>e.from.index>0)
      .size() == 0;})
  .commit();

  graph
  .reduceNodes({type: 'Interaction',content: {type: 'InteractionSimple'},referentialTransparencySolved: false,referentialTransparencySolvable:true},
  (theResult,theNode)=>{
    // console.log("========------------------------------------===");
    // console.log(theNode.id+ " "+theNode.content.operator);
    // console.log("==+++++++++++++++++++++===");
    let theChildrenEdges =
    graph
    .matchUndirectedEdges({type:'InteractionOperand',from:{node:theNode}})
    .filter(e=>e.from.index>0) // Only children, not the parent which has index 0
    .value();

    // Find the definition this interaction is part of
    let parentDef =
    graph
    .findDirectedEdge({type:'DefinitionSubInteraction',to:{node:theNode}})
    .from.node;

    let similarNodes =
    graph
    .matchNodes({type:'Interaction',content:{operator:theNode.content.operator}}) // Same operator
    .reject(n=> // Within the same definition
      _.isUndefined(
        graph
        .findDirectedEdge({type:'DefinitionSubInteraction',from:{node:parentDef},to:{node:n}})))
    .filter(n=> // All chidren of similarNode are children of theNode
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
      .filter(e=>e.from.index>0) // We check for similarity of children only, not parents !
      .every(e=>
        _(theChildrenEdges)
        .filter({from:{index:e.from.index},to:{index:e.to.index,node:e.to.node}})
        .size()===1))
    .filter(n=> // All children of theNode are children of the similarNode
      _(theChildrenEdges)
      .every(ce=>
        graph
        .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
        .filter(e=>e.from.index>0)
        .filter({from:{index:ce.from.index},to:{index:ce.to.index,node:ce.to.node}})
        .size()===1))
    .value();


    // We create a node to merge all the nodes similar to theNode
    // TODO Merge nodes differently than tjust picking the first
    // for example put all syntactic locations of nodes to improve traceback
    let newNode =
    graph
    .addNode(_.omit(_.omit(theNode,'finished'),'id'));

    // Attach the newNode to the definition theNode is in
    graph
    .matchDirectedEdges({type:'DefinitionInteraction',to:{node:theNode}})
    .forEach(e=>
      graph
      .addEdge({type:'DefinitionInteraction',from:e.from,to:{node:newNode}}))
    .commit();

    // Attach the newNode to the definition theNode is in
    graph
    .matchDirectedEdges({type:'DefinitionSubInteraction',to:{node:theNode}})
    .forEach(e=>
      graph
      .addEdge({type:'DefinitionSubInteraction',from:e.from,to:{node:newNode}}))
    .commit();


    // Attach newNode to children of theNode
    _(theChildrenEdges)
    .forEach(ce=>{
      graph
      .addEdge({type:'InteractionOperand',from:{node:newNode,index:ce.from.index,ports:ce.from.ports},to:ce.to});})
    .commit();

    newNode.referentialTransparencySolved = true;
    newNode.referentialTransparencySolvable = false;

    // We link them together
    _(similarNodes)
    .forEach(similarNode=>{
      graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:similarNode,index:0}})
      .forEach(edgeFromSimilarNode=>{
        // console.log()
        graph
        .addEdge({type:'InteractionOperand',from:{node:newNode,index:edgeFromSimilarNode.from.index,ports:edgeFromSimilarNode.from.ports},to:edgeFromSimilarNode.to});})
      .commit();
      graph
      .finish(similarNode);})
    .commit();

      // We find new potential solvable nodes
    graph
    .matchNodes({type: 'Interaction',content: {type: 'InteractionSimple'},referentialTransparencySolved: false,referentialTransparencySolvable:false})
    .filter(n=>{
      return graph
      .matchUndirectedEdges({type:'InteractionOperand',from:{node:n}})
      .filter(x=>(x.from.index>0))
      // .tap(x=>{console.log("xxxx");console.log(_.map(x,y=>(y.from.index+ " " +y.to.node.id +" "+y.to.node.content.operator+ " "+y.to.node.referentialTransparencySolved)))})
      .every(x=>{return x.to.node.referentialTransparencySolved ===true;});})
    .forEach(n=>{n.referentialTransparencySolvable=true;})
    .commit();

  });
}













function linkInteractionsToDefinitions(graph) {
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
      throw new Error ('Could not find definition for interaction with operator '+theNode.content.operator);
    }

  });

}









function computeDefinitionDependencies (graph) {
  // First we create dependency links between definitions nodes
  // For each definition
  graph
  .matchNodes({type: 'Definition'})
  .forEach(defNode=>{
    defNode.markedDuringDefinitionGraphOrdering = false;
    // For each of its sub interactions
    graph
    .matchDirectedEdges({type:'DefinitionSubInteraction',from:{node:defNode},to:{node:{isCustom:true}}})
    .pluck('to.node')
    .forEach(subInteractionNode=>{
      // Find the definition of this sub interaction
      let subInteractionDefNode=
      graph
      .findDirectedEdge({type:'InteractionDefinition',from:{node:subInteractionNode}})
      .to.node;

      // Add a dependency from the definition to the definition of the sub interaction
      if(_.isUndefined(graph.findDirectedEdge({type:'DefinitionDependency',from:{node:defNode},to:{node:subInteractionDefNode}}))){
        graph
        .addEdge({type:'DefinitionDependency',from:{node:defNode},to:{node:subInteractionDefNode}});
      }
    })
    .commit();
  })
  .commit()

  let orderingList = [];

  // TODO Maybe we can only visit the root definition instead of all of them
  // Then we create a graph ordering of all definition nodes according to the dependency relationship
  graph
  .reduceNodes({type:'Definition',markedDuringDefinitionGraphOrdering:false},
  (theResult,theNode)=>{
    visitDef(theNode);
  });

  function visitDef(n) {
    if (n.temporarilyMarkedDuringDefinitionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error ("the definition structure contains circular definitions");//+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringDefinitionGraphOrdering !== true) {
        n.temporarilyMarkedDuringDefinitionGraphOrdering = true;
        graph
        .matchNodes(m=>
          graph
          .matchDirectedEdges({type: 'DefinitionDependency',from: {node:n},to: {node:m}})
          .size() > 0)
        .forEach(visitDef)
        .commit();

        n.markedDuringDefinitionGraphOrdering = true;
        n.temporarilyMarkedDuringDefinitionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }



// Finally, we expand all definitions, in order.
  _(orderingList)
  .reverse() // reverse the list in order to expand most basic interactions first
  .forEach(defNode=>{
    instantiateDefinitionInteraction(graph,defNode);
  })
  .commit();


}






// Here we expand the whole interaction expression of a definition
function instantiateDefinitionInteraction(graph,definitionNode) {
    console.log('=================== instantiate '+definitionNode.content.signature.operator);

  // Find the root Interaction
  let rootInteraction =
  graph
  .findDirectedEdge({type:'DefinitionInteraction',from:{node:definitionNode}})
  .to.node;

  // Mark all subinteractions as not visited
  graph
  .matchDirectedEdges({type:'DefinitionSubInteraction',from:{node:definitionNode}})
  .forEach(edge=>{edge.to.node.markedDuringInteractionGraphOrdering = false;})
  .commit()



  let orderingList = [];

  // Then we create a graph ordering of all interaction nodes according to the dependency relationship
  // Find all sub interactions of the current definition
  graph
  .reduceDirectedEdges({type:'DefinitionSubInteraction',from:{node:definitionNode},to:{node:{markedDuringInteractionGraphOrdering:false}}},
  (theResult,theEdge)=>{
    visitInteraction(theEdge.to.node);
  });

  function visitInteraction(n) {
    if (n.temporarilyMarkedDuringInteractionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error ("The interaction structure contains cycles");//+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringInteractionGraphOrdering !== true) {
        n.temporarilyMarkedDuringInteractionGraphOrdering = true;
        graph
        .matchNodes(m=>
          graph
          .matchDirectedEdges({type: 'InteractionOperand',from: {node:n},to: {node:m}})
          .size() > 0)
        .forEach(visitInteraction)
        .commit();

        n.markedDuringInteractionGraphOrdering = true;
        n.temporarilyMarkedDuringInteractionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }


  _(orderingList)
  .reverse() // reverse the list in order to expand most basic interactions first
  .forEach(interNode=>{
    // console.log(interNode.content.operator);
    // instantiateDefinitionInteraction(graph,defNode);
    instantiateInteraction(graph,interNode);
  })
  .commit();



  // instantiateInteraction(graph,rootInteraction);
  //
  //
  // definitionNode.instantiated = true;
  //
  // graph
  // .reduceNodes({type:'Interaction',content:{type:'InteractionSimple',operatorType:'Custom'},hasDefinition:false},
  //   (theResult,theNode)=>
  //
  // return instantiatedInteractionNode;
}



// Here we expand a single interaction node
function instantiateInteraction(graph,interactionNode) {
  // console.log(interactionNode.content.operator);

  // First we get all the InteractionOperand Edges that go from and to this interaction
  // The sub Interactions are already instantiated
  let interactionoperandEdgesFrom =
  graph
  .matchDirectedEdges({type:'InteractionInstanceOperand',from:{node:interactionNode}})
  .value();
  // The super Interactions are not instantiated yet
  let interactionoperandEdgesTo =
  graph
  .matchDirectedEdges({type:'InteractionOperand',to:{node:interactionNode}})
  .value();

  if (interactionNode.isBase) {
    console.log("BAS "+interactionNode.content.operator);
    // Base interaction, we just instantiate it and link it

    // So first we create the instance
    let newNode =
    graph
    .addNode({type:'InteractionInstance',content:interactionNode.content});

    // Then we link the instance

    // First to the sub Interactions (which are already instantiated)
    _(interactionoperandEdgesFrom)
    .forEach(edge=>{
      graph
      .addEdge({type:'InteractionInstanceOperand',from:{node:newNode},to:edge.to})
      })
    .commit();

    // Then to the super Interactions (which are not instantiated)
    _(interactionoperandEdgesTo)
    .forEach(edge=>{
      graph
      .addEdge({type:'InteractionInstanceOperand',to:{node:newNode},from:edge.from})
      })
    .commit();

    // interactionNode.instantiated = true;
    return newNode;
  } else if (interactionNode.isCustom) {
console.log("CUS "+interactionNode.content.operator);

    // let defNode =
    // graph
    // .findDirectedEdge({type: 'InteractionDefinition',from:{node:interactionNode}})
    // .to.node;
    //
    // if(defNode.instantiated !== true) {
    //   instantiateDefinitionInteraction(graph,defNode);
    // }



  } else if (interactionNode.isArgument) {
console.log("ARG "+interactionNode.content.operator);

  } else {
    throw new Error ('Could not instantiate interaction '+interactionNode.content.operator+ " "+interactionNode.id+ " because it is not an argument, a base interaction or a custom defined interaction");
  }

}























































//
//
//
//
//
//
//
// // Fully expand an interaction definition into a composition of base interactions
// function expandDefinition(interactionDefinition) {
//
//   let definitions =
//     _(interactionDefinition.definition)
//     .map(expandDefinition)
//     .value();
//
//   var interactionDefinitionWithChildrenExpanded = {
//     type: "Definition",
//     interaction: interactionDefinition.interaction,
//     signature: interactionDefinition.signature,
//     definitions: definitions,
//     parent: interactionDefinition.parent
//   };
//
//   var interaction = interactionDefinition.interaction;
//
//   var interactionsToExpandAlongWithTheirMatchingDefinition;
//
//   do {
//     interactionsToExpandAlongWithTheirMatchingDefinition =
//       _(listNonBaseInteractions(interaction))
//       .map(findMatchingDefinition)
//
//       _.filter(
//         _.map(listNonBaseInteractions(interaction),
//           function(x) {
//             return {
//               interaction: x,
//               definition: findMatchingDefinition(x, interactionDefinitionWithChildrenExpanded)
//             };
//           }),
//         function(y) {
//           return !isDefinitionOfAnArgument(y.definition) && y.interaction.type === "InteractionSimple";
//         });
//
//     // For each of these interactions to expand, we instatiate them
//     _.forEach(interactionsToExpandAlongWithTheirMatchingDefinition, function(x) {
//       interaction = instantiate(interaction, x.definition);
//     });
//   } while (interactionsToExpandAlongWithTheirMatchingDefinition.length > 0);
//
//   return {
//     type: "Definition",
//     interaction: interaction,
//     signature: interactionDefinition.signature,
//     definitions: definitions,
//     parent: interactionDefinition.parent
//   };
// }
//
//
//
//
//
//
// // Gives a list of non base interactions in an interaction expression
// function listNonBaseInteractions(interaction) {
//   return _(interaction.operand)
//     .map(listNonBaseInteractions)
//     .flatten()
//     .concat(isBaseInteraction(interaction)?[]:[interaction])
//     .value();
// }
//
// Checks if a given interaction is a base interaction

//
//
//
// // Finds the definition that matches an interaction, in the context of an interaction definition
// function findMatchingDefinition(interaction, interactionDefinition) {
//
//   // First case : No definition
//   if (interactionDefinition === undefined) {
//     throw new Error("could not find definition matching interaction " + serializer.serialize(interaction));
//   }
//
//   if (interaction.type === 'InteractionNative') {
//     return {
//       type: "Definition",
//       interaction: interaction,
//       signature: "function",
//       definitions: [],
//       parent: null
//     };
//   }
//
//
//   // Second case : The interaction definition specifies that it is an argument (not really possible ?)
//   if (isDefinitionOfAnArgument(interactionDefinition)) {
//     return "Argument";
//   }
//
//
//
//   // Third case : The interaction is an argument of the definition
//   if (_.any(interactionDefinition.signature.operand, "name", interaction.operator)) {
//     // return {type:'Definition',interaction:"Argument",signature:{operand:[{"name":interaction.operator}]}}; /* TODO precise this return value*/
//     return "Argument"; /* TODO problem is here !*/
//   }
//
//
//   // Fourth case : The interaction is defined within the sub definitions of the definition
//   for (var i = 0; i < interactionDefinition.definitions.length; i++) {
//     if (interactionMatchesDefinition(interaction, interactionDefinition.definitions[i])) {
//       return interactionDefinition.definitions[i];
//     }
//   }
//
//   // Fifth case: The interaction is defined in the context of the parent definition (the definition is a sub definition of its parent)
//   if (interactionDefinition.parent !== undefined)
//     return findMatchingDefinition(interaction, interactionDefinition.parent);
//
//   throw new Error("cannot find definition of interaction " + interaction.operator);
// }
//
// // Checks if an interaction definition states that an interaction is an argument
// function isDefinitionOfAnArgument(definition) {
//   // {type:'Definition',interaction:interaction,signature:{type:'Signature',interface:interface,operator:temp.operator,operand:temp.operand},definitions:(definitions===null?[]:definitions)};
//   return definition === "Argument";
// }
//



// module.exports.expand =expand;
