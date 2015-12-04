"use strict"

import _ from 'lodash'

import createDataFlowDirection from './createDataFlowDirection'

import {mergePortList,portIsOnlyMadeOf,conjugatePort,portIsDefined} from '../ports'

// Here we solve the cases where several signals come or go from the same node with the same port number.
export default function resolveMultiplePorts(graph) {

  graph
  .matchUndirectedEdges({type:'InteractionInstanceOperand'})
  .forEach(theEdge=>{theEdge.from.multiResolved=false;theEdge.to.multiResolved=false;})
  .commit();


  // Resolve multiple output
  graph
  .reduceUndirectedEdges({type:'InteractionInstanceOperand',from:{multiResolved:false}},
    (theResult,theEdge)=>{
    let direct = portIsOnlyMadeOf( theEdge.from.ports,'out');
    let indirect = portIsOnlyMadeOf( theEdge.to.ports,'out');
    if(direct === indirect){
      // console.log('Useless edge '+theEdge.id);
      graph.finish(theEdge);
      return;
    };
    let theRightEdge = direct?_.clone(theEdge):graph.inverse(theEdge);

  // Now we have theRightEdge, with data that goes from its "from" to its "to"
  // theRightEdge is in the direction fo the data flow
    // Resolve multiple output on this edge origin
    let similarOutputEdges =
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',from:{node:theRightEdge.from.node,index:theRightEdge.from.index}})
    .forEach(theOtherEdge=>{
      theEdge.from.multiResolved=true;
    })
    .value();
    if(_(similarOutputEdges).size()>1) {
      // We have a multiple output condition
      let code = "";
      let ports = ["in"];
      _(similarOutputEdges)
      .forEach((similarEdge,index)=>{
        code = code + "<%=a"+(index+1)+"%> = <%=a0%>;\n";
        ports.push("out");
      })
      .commit();

      let newNode =
      graph
      .addNode({type:'InteractionInstance',content:{type:'InteractionNative',content:code},ports : ports});

      graph
      .addEdge({type:'InteractionInstanceOperand',from:{multiResolved:true,node:theRightEdge.from.node,index:theRightEdge.from.index},to:{multiResolved:true,node:newNode,index:0}});

      _(similarOutputEdges)
      .forEach((similarEdge,index)=>{
        graph
        .addEdge({type:'InteractionInstanceOperand',from:{multiResolved:true,node:newNode,index:index+1},to:similarEdge.to});
  // TODO I Should be able to do that
  // graph.finish(similarEdge);
  // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
  graph.finish(graph.findDirectedEdge({id:similarEdge.id}));
      })
      .commit();
    }else if(_(similarOutputEdges).size()<1) {
      throw new Error ('what ? that should be impossible');
    }

    // Resolve multiple input on this edge destination
    let similarInputEdges =
    graph
    .matchUndirectedEdges({type:'InteractionInstanceOperand',to:{node:theRightEdge.to.node,index:theRightEdge.to.index}})
    .forEach(theOtherEdge=>{
      //TODO SCANDAL REMOVE THE NEXT LINE
      theEdge.from.multiResolved=true;

      theEdge.to.multiResolved=true;})
    .value();
    if(_(similarInputEdges).size()>1) {
      // We have a multiple input condition
        let code = "<%=a0%>=null;\n";
        let ports = ["out"];
        _(similarInputEdges)
        .forEach((similarEdge,index)=>{
          code = code + "if(<%=a0%>===null ){\n  <%=a0%> = <%=a"+(index+1)+"%>;\n} else if (<%=a"+(index+1)+"%> !== null){\n  throw ('error:multiple active assignments to the same signal <%=a0%> : '+<%=a0%> + ' and ' + <%=a"+(index+1)+"%>);\n}";
          ports.push("in");
        })
        .commit();

        let newNode =
        graph
        .addNode({type:'InteractionInstance',content:{type:'InteractionNative',content:code},ports : ports});

        graph
        .addEdge({type:'InteractionInstanceOperand',to:{multiResolved:true,node:theRightEdge.to.node,index:theRightEdge.to.index},from:{multiResolved:true,node:newNode,index:0}});

        _(similarInputEdges)
        .forEach((similarEdge,index)=>{
          graph
          .addEdge({type:'InteractionInstanceOperand',to:{multiResolved:true,node:newNode,index:index+1},from:similarEdge.from});
          // console.log("finishing edge "+similarEdge.id);
          // TODO I Should be able to do that
          // graph.finish(similarEdge);
          // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
          graph.finish(graph.findDirectedEdge({id:similarEdge.id}));
        })
        .commit();



      }else if(_(similarInputEdges).size()<1) {
        throw new Error ('what ? that should be impossible');
      }

      createDataFlowDirection(graph);



  });


}
