"use strict"

import _ from 'lodash'

import {portIsOnlyMadeOf} from '../ports'

export default function nonMatchingCompositionCompilation(graph) {
  // Then we find composition nodes and reduce them
  graph
  .matchNodes({type:'InteractionInstance',content: {type: 'InteractionSimple',operatorType:'Composition'}})
  // .forEach(x=>{console.log(x.ports);console.log(x.content.operator);})
  .filter(x=>(portIsOnlyMadeOf(x.ports[0],'out')||portIsOnlyMadeOf(x.ports[0],'in')))
  .forEach(theNode=>{

        let isCompo = portIsOnlyMadeOf(theNode.ports[0],'out');

        // console.log("NODE ! "+theNode.id +" "+ JSON.stringify(theNode.ports));

        let code = isCompo?"<%=a0%> = {};\n":"";
        let ports = [isCompo?'out':'in'];

        let compositionElementNameWithTheirIndex =
        graph
        .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode}})
        .reject(theEdge=>_.isUndefined(theEdge.from.compositionElementName))
        .forEach(theEdge=>{if(theEdge.to.node===theNode){throw new Error('Error:Loop on a composition interaction '+theNode.content.operator);}})
        .map(theEdge=>({compositionElementName:theEdge.from.compositionElementName, index:theEdge.from.index}))
        .groupBy('index')
        .map(theElement=>
          _(theElement)
          .tap(x=>{if(_.size(_.unique(x,y=>y.compositionElementName))>1){throw new Error('Error: there are different edges with the same index but different compositionElementName');}})
          .unique(z=>(z.compositionElementName))
          .first())
        .value();

// console.log("  "+JSON.stringify(compositionElementNameWithTheirIndex));

      _(compositionElementNameWithTheirIndex)
      .forEach((el)=>{
        if(isCompo){
          code = code.concat("<%=a0%>['" + el.compositionElementName + "'] = <%=a" + el.index + "%>;\n");
          ports[el.index] = 'in';
        }else {
          code = code.concat("<%=a" + el.index + "%> = <%=a0%>['" + el.compositionElementName + "'];\n");
          ports[el.index] = 'out';
        }})
      .commit();

        // console.log("  "+code);
// console.log("  "+JSON.stringify(ports));

      let newNode = graph
      .addNode({type:'InteractionInstance',content:{
          'type': 'InteractionNative',
          'content': code
        },ports:ports});

      graph
      .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theNode}})
      // .reject(theEdge=>_.isUndefined(theEdge.from.compositionElementName))
      .forEach(theEdge=>{
        graph
        .addEdge({type:'InteractionInstanceOperand',from:{
node:newNode,
index:theEdge.from.index,
port:(isCompo?((theEdge.from.index===0)?'out':'in'):((theEdge.from.index===0)?'in':'out'))},to:theEdge.to});})
      .commit();

      graph
      .finish(theNode);
  })
  .commit();

  // Then we find decomposition nodes and reduce them

  //TODO loop

}
