"use strict"

import _ from 'lodash'

export default function addDefinitionToGraph(graph, definition) {
  let rootNode =
  graph
  .addNode({type:'Definition',content: definition,instantiated:false});

  // Add sub defintions
  _(definition.definitions)
  .map(subDefinition=> addDefinitionToGraph(graph, subDefinition))
  .forEach((subDefinitionNode, index) => {
    graph
    .addEdge({type:'DefinitionDefinition',from:{node:rootNode,index:(index+1)},to:{node:subDefinitionNode,index:0}})
  })
  .commit();

  // Add arguments
  _(definition.signature.operand)
  .map(operand=> {
    let operandNode =
    graph
    .addNode({type:'SignatureOperandElement',content:operand});

    // console.log(operand.interfac);
    let operandInterfaceNode =
    addInterfaceToGraph(graph,operand.interfac,'theArgs.'+operand.name,rootNode);

    graph
    .addEdge({type:'SignatureOperandElementInterface',from:{node:operandNode},to:{node:operandInterfaceNode}});
    return operandNode;
  })
  .forEach((operandNode, index) => {
    graph
    .addEdge({type:'SignatureOperand',from:{node:rootNode,index:(index+1)},to:{node:operandNode,index:0}})
  })
  .commit();


  // Add interface
  let interfaceNode =
  addInterfaceToGraph(graph,definition.signature.interfac,'theInterface',rootNode);

  graph
  .addEdge({type:'DefinitionInterface',from:{node:rootNode},to:{node:interfaceNode}});


  // Add interaction
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
      .addNode({type:'Interaction',content: interaction,ports:[]});

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
      rootNode = graph.addNode({type:'Interaction',content: interaction,ports:[]});
      graph
      .addEdge({type:'DefinitionSubInteraction',from:{node:definitionNode},to:{node:rootNode}});
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }

  return rootNode;
}


function addInterfaceToGraph(graph, interfac,prefix,definitionNode) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":

        rootNode =
        graph
        .addNode({type:'Interface', name:prefix,content:interfac});

      break;
    case "InterfaceComposite":
      rootNode =
      graph
      .addNode({type:'Interface', name:prefix, content:interfac});

      let nodeOfElement =
      _(interfac.element)
      .map (x => addInterfaceToGraph(graph, x.value, prefix + "." + x.key,definitionNode))
      .value();



      _(nodeOfElement)
      .forEach((x, index) =>
        graph
        .addEdge({type:'InterfaceElement', from:{node: rootNode,index:index+1}, to:{node:x,index:0}}))
      .commit();
      break;
    default:
      throw new Error("Cant transform this interface to a graph. Is it an interface really ?");
  }

        graph
        .addEdge({type:'DefinitionSubInterface',from:{node:definitionNode},to:{node:rootNode}});
  return rootNode;
}
