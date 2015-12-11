"use strict"

import _ from 'lodash'

import {madeOnlyOf,conjugateInterface,subInterface} from '../interfaces'

export default function nonMatchingCompositionCompilation(graph) {
  // Then we find composition nodes and reduce them
  graph
  .matchNodes({type:'InteractionInstance',content: {type: 'InteractionSimple',operatorType:'Composition'}})
  // .forEach(x=>{console.log(x.ports);console.log(x.content.operator);})
  .filter(x=>((madeOnlyOf(x.ports[0])==='out')||(madeOnlyOf(x.ports[0])==='in')))
  .forEach(theNode=>{

        let isCompo = madeOnlyOf(theNode.ports[0])==='out';

        // console.log("NODE ! "+theNode.id +" "+ JSON.stringify(theNode.ports));

        let code = isCompo?"<%=a0%> = {};\n":"";
        let ports = [theNode.ports[0]];

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
          ports[el.index] = conjugateInterface( subInterface(theNode.ports[0],el.compositionElementName));
        }else {
          code = code.concat("<%=a" + el.index + "%> = <%=a0%>['" + el.compositionElementName + "'];\n");
          ports[el.index] = conjugateInterface( subInterface(theNode.ports[0],el.compositionElementName));
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
        .addEdge({
          type:'InteractionInstanceOperand',
          from:{
            node:newNode,
            index:theEdge.from.index
          },
          to:theEdge.to});
        })
      .commit();

      graph
      .finish(theNode);
  })
  .commit();

  // Then we find decomposition nodes and reduce them

  //TODO loop

}
