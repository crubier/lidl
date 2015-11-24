"use strict"
var serializer = require('./serializer.js');
var identifiers = require('./identifiers.js');
var interactions = require('./interactions.js');
var interfacs = require('./interfaces.js');
var parser = require('./parser.js');
var operator = require('./operator.js');
var _ = require('lodash');
var compilationResult = require('./compilerExampleResult.js');
var Graph = require('./g.js');

// var neo4j = require('neo4j');

function compileToJs(source, header) {
  //TODO Actual compilation

  return generateJsCode(compileToGraph(source), header);

}



function compileToIii(source) {
  return serializer.serialize(
    identifiers.reduceIdentifiers(
      interactions.expand(
        parser.parse(
          source
        )[0]
      ).interaction
    )
  );
}

function compileToGraph(source,upto) {
    // console.log("===========================================")
  var graph = new Graph();
  var mainDef = parser.parse(source)[0];



  // TODO reduce the amount of processing on the next three lines and transform it into graph operations instead
  var interaction = addInteractionToGraph(graph, identifiers.reduceIdentifiers(interactions.expand(mainDef).interaction));
  //TODO Make it possible to compile interactions that have arguments and not just a single interface
  var interfac = addInterfaceToGraph(graph, mainDef.signature.interfac, 'theInterface');

  mergeByRootNode(graph, interaction, interfac);


  addOperatorTypeAnnotation(graph);
  referentialTransparency(graph);

  if(upto == 'referentialTransparency') return graph;

  linkIdentifiers(graph);
  voidInteractionCreation(graph);
  behaviourSeparation(graph);
  functionLiteralLinking(graph);
  functionApplicationLinking(graph);
  previousNextLinking(graph);
  tagCompositionElementEdges(graph);

  //TODO Should loop that, either in the method or here
  matchingCompositionReduction(graph);
  matchingCompositionReduction(graph);
  matchingCompositionReduction(graph);
  // ... until fixed point

//TODO Should loop that too
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  createDataFlowDirection(graph);
  nonMatchingCompositionCompilation(graph);
  // ... until fixed point ... but always end with another:
  createDataFlowDirection(graph);


  removeDuplicateEdge(graph);
  resolveMultiplePorts(graph);
  instantiateTemplates(graph);
  orderGraph(graph);

  return graph;
}



function addInteractionToGraph(graph, interaction) {
  var rootNode;
  switch (interaction.type) {
    case 'InteractionSimple':
      rootNode = graph.addNode({type:'ast',content: interaction,ports:[]});
      let nodeOfOperand = _.map(interaction.operand, operand=> addInteractionToGraph(graph, operand));
      _(nodeOfOperand)
      .forEach((x, index) => {
        graph
        .addEdge({type:'ast',content:interaction,from:{node:rootNode,index:index+1},to:{node:x,index:0}})
      })
      .commit()
      break;
    case 'InteractionNative':
      rootNode = graph.addNode({type:'ast',content: interaction,ports:[]});
      break;
    default:
      throw new Error('trying to transform into a graph invalid interaction');
  }
  return rootNode;
}


function addInterfaceToGraph(graph, interfac, prefix) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      if (interfac.direction === "in") {
        rootNode =
        graph
        .addNode({type:'ast', content:{
          type: "InteractionNative",
          content: "<%=a0%>=" + prefix + ";\n"
        }, ports:["out"]});
      } else {
        rootNode =
        graph
        .addNode({type:'ast',content: {
          type: "InteractionNative",
          content: "" + prefix + "=<%=a0%>;\n"
        }, ports:["in"]});
      }
      break;
    case "InterfaceComposite":
      let nodeOfElement = _.map(interfac.element, x => addInterfaceToGraph(graph, x.value, prefix + "." + x.key));
      rootNode =
      graph
      .addNode({type:'ast', content:{
        type: "InteractionSimple",
        operator: interfacs.toOperator(interfac)
      },ports:_.map(nodeOfElement,'ports')});
      _.forEach(nodeOfElement, (x, index) => graph.addEdge({type:'ast',content:interfac, from:{node: rootNode,index:index+1}, to:{node:x,index:0}}));
      break;
    default:
      throw "Cant transform this interface to a graph. Is it an interface really ?";
  }
  return rootNode;
}


function mergeByRootNode(graph, g1, g2) {
  graph
  .addEdge({type:'ast',content: 'root',from:{node:g1,index:0},to:{node:g2,index:0}});
}


function addOperatorTypeAnnotation(graph) {
    graph
    .matchNodes({type:'ast',content: {type: "InteractionSimple"}})
    .forEach(x => (x.content.operatorType = operator.parse(x.content.operator)))
    .commit();
}





// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {
  // First we mark all nodes as not referentialTransparencySolved
  graph
  .matchNodes({type: 'ast',content: {type: 'InteractionSimple'}})
  .forEach( (theNode) => {
    theNode.referentialTransparencySolved=false;
    theNode.referentialTransparencySolvable = // Only leaves are solvable intially
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode}})
      .filter(e=>e.from.index>0)
      .size() == 0;})
  .commit();


  graph
  .reduceNodes({type: 'ast',content: {type: 'InteractionSimple'},referentialTransparencySolved: false,referentialTransparencySolvable:true},
  (theResult,theNode)=>{

    let theChildrenEdges =
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode}})
    .filter(e=>e.from.index>0) // Only children, not the parent which has index 0
    .value();

      let similarNodes =
      graph
      .matchNodes({type:'ast',content:{operator:theNode.content.operator}}) // Same operator
      .filter(n=> // All chidren of similarNode are children of theNode
        graph
        .matchUndirectedEdges({type:'ast',from:{node:n}})
        .filter(e=>e.from.index>0) // We check for similarity of children only, not parents !
        .every(e=>
          _(theChildrenEdges)
          .filter({from:{index:e.from.index},to:{index:e.to.index,node:e.to.node}})
          .size()===1))
      .filter(n=> // All children of theNode are children of the similarNode
        _(theChildrenEdges)
        .every(ce=>
          graph
          .matchUndirectedEdges({type:'ast',from:{node:n}})
          .filter(e=>e.from.index>0)
          .filter({from:{index:ce.from.index},to:{index:ce.to.index,node:ce.to.node}})
          .size()===1))
      .value();


          // We create a node to merge all the similar nodes
          // TODO Merge nodes differently than tjust picking the first
          // for example put all syntactic locations of nodes to improve traceback
          let newNode =
          graph
          .addNode(_.omit(_.omit(theNode,'finished'),'id'));

          _(theChildrenEdges)
          .forEach(ce=>{
            graph
            .addEdge({type:'ast',from:{node:newNode,index:ce.from.index,ports:ce.from.ports},to:ce.to});})
          .commit();

          newNode.referentialTransparencySolved = true;

          // We link them together
          _(similarNodes)
          .forEach(similarNode=>{
            graph
            .matchUndirectedEdges({type:'ast',from:{node:similarNode,index:0}})
            .forEach(edgeFromSimilarNode=>{
              // console.log()
              graph
              .addEdge({type:'ast',from:{node:newNode,index:edgeFromSimilarNode.from.index,ports:edgeFromSimilarNode.from.ports},to:edgeFromSimilarNode.to});
              edgeFromSimilarNode.to.node.referentialTransparencySolvable = true;})
            .commit();
            graph
            .finish(similarNode);})
          .commit();
  });
}


function OLDreferentialTransparency(graph) {

  // First we mark all nodes as not referentialTransparencySolved
  graph
  .matchNodes({type: 'ast',content: {type: 'InteractionSimple'}})
  .forEach( (theNode) => {theNode.referentialTransparencySolved=false;})
  .commit();

  graph
  .reduceNodes({type: 'ast',content: {type: 'InteractionSimple'},referentialTransparencySolved: false},
    (theResult,theNode)=>{
    let newNode =
      graph
      .addNode({type: 'ast',content: theNode.content,referentialTransparencySolved: true,ports:theNode.ports});
    let nodesSimilarToTheNode =
      graph
      .matchNodes({type:'ast',content: {type: 'InteractionSimple'},referentialTransparencySolved: false})
      .filter(x=>_.isEqual(x.content, theNode.content,(a, b)=>(interactions.compare(a, b) === 0)))
      .forEach(x=>{
        newNode.ports=mergePortList(newNode.ports,x.ports);
        graph
        .matchUndirectedEdges({type:'ast',to:{node:x}})
        .forEach(y=>
          graph
          .addEdge({type:'ast',from:y.from,to:{node:newNode,index:y.to.index}}))
        .commit();})
      .forEach(x=>graph.finish(x))
      .tap(x=>(theNode.referentialTransparencySolved=true))
      .commit();
    });
}


function linkIdentifiers(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Identifier'}},
    (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
    .map(e1=>
      graph
      .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
      .filter(x=>(x.id > e1.id)) // Only one way
      .map(e2=>
        graph
        .addEdge({type:'ast',from:e1.from,to:e2.from}))
      .commit())
    .commit();
    graph
    .finish(theNode);
    });
}



// Here we create nodes for interactions that are empty
function voidInteractionCreation(graph) {

  graph
  .reduceNodes({content:{operatorType:"Void"}},
  (theResut,theNode)=>{
    let newNode = graph
      .addNode({content: {'type': 'InteractionNative', 'content': '/*Nothing, there was a void interaction*/\n'},ports: [],isVoid: true});
    graph
    .matchUndirectedEdges({type:'ast',to:{node:theNode,index:0}})
    .forEach(x=>graph
      .addEdge({type:'ast',from:x,to:{node:newNode,index:x.to.index}}))
    .commit();
    graph
    .finish(theNode);

  });
}


function behaviourSeparation(graph) {
  let activeSource =
    graph
    .addNode({type:'ast',content: {type: 'InteractionNative',content: '<%=a0%> = active;\n'},ports: ["out"]});

  graph
  .reduceNodes({type:'ast',content:{operatorType:"Behaviour"}},
  (theResut,theNode)=>{
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:2}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:activeSource,index:0},to:x.to}))
    .commit();
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode,index:1}})
      .forEach(y=>
        graph
        .addEdge({type:'ast',from:x.to,to:y.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}



function functionLiteralLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Function'}},
  (theResult,theNode)=>{
    let funcName = theNode.content.operator.substring(8);
    let source =
      graph
      .addNode({type:'ast',content:{type: 'InteractionNative','content': '<%=a0%> = ' + funcName + ';\n'},ports: ["out"]});
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source,index:0},to:x.to}))
    .commit();
    graph
    .finish(theNode);
  });

}



function functionApplicationLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'FunctionApplication'}},
  (theResult,theNode)=>{
    let source =
      graph
      .addNode({type:'ast',content:{type: 'InteractionNative',content: 'if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}\n'},ports: ["in", "in", "in", "out"]});
    _(_.range(4))
    .forEach(i=>
      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode,index:i}})
      .forEach(x=>
        graph
        .addEdge({type:'ast',from:{node:source,index:i},to:x.to}))
      .commit())
    .commit();
    graph
    .finish(theNode);
  });
}


function previousNextLinking(graph) {
  graph
  .reduceNodes({type:'ast',content:{operatorType:'Previous'}},
  (theResult,theNode)=>{
    let stateId = _.uniqueId('state_');

    // Add a first node to get from state variable
    let source =
      graph
      .addNode({type:'ast',containsAState:true,stateVariableName:stateId,content:{'type': 'InteractionNative','content': "if(<%=a0%> === active) {\n<%=a1%> = previousState['" + stateId + "'];\n}\n"},ports: ["in", "out"]});
    // Add edge to first port
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source,index:0},to:x.to}))
    .commit();
    // Add edge to second port
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:1}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source,index:1},to:x.to}))
    .commit();


    // Add a second node to set state variable
    let source2 =
      graph
      .addNode({type:'ast',containsAState:true,stateVariableName:stateId,content:{'type': 'InteractionNative','content': "if(<%=a0%> === active) {\nnextState['" + stateId + "'] = <%=a1%>;\n}\n"},ports: ["in", "in"]});
      // Add edge to first port
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:0}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source2,index:0},to:x.to}))
    .commit();
      // Add edge to second port
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode,index:2}})
    .forEach(x=>
      graph
      .addEdge({type:'ast',from:{node:source2,index:1},to:x.to}))
    .commit();


    graph
    .finish(theNode);
  });

}




function tagCompositionElementEdges(graph){

  graph
  .matchUndirectedEdges({type:'ast',from:{node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
  .forEach( theEdge => {
    if(theEdge.from.index>0)
    theEdge.from.compositionElementName =
      _(theEdge.from.node.content.operator)
      .words( /[^,:\{\}\$]+/g)[theEdge.from.index-1];
  })
  .filter({to:{node:{type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
  .forEach( theEdge => {
    if(theEdge.to.index>0)
    theEdge.to.compositionElementName =
      _(theEdge.to.node.content.operator)
      .words( /[^,:\{\}\$]+/g)[theEdge.to.index-1];
    })
  .commit();


}

// This is an important graph transform. It deals with the mess of having several linked composition interaction
function matchingCompositionReduction(graph) {



// // Mark all
  graph
  .matchNodes({type: 'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}})
  .forEach( theNode => {theNode.unSuitableForCompositionReduction=false;theNode.didCompositionReduction=false;})
  .commit();

  // Now that's tricky !
  // First we find composition nodes that arent treated yet
  graph
  .reduceNodes({type: 'ast',unSuitableForCompositionReduction:false,content: {type: 'InteractionSimple',operatorType:'Composition'}},
  (theResult,n1)=>{
    // We find the edges that could lead to composition nodes that match the current node AND that arent treated yet
    graph
    .matchUndirectedEdges({type: 'ast',from:{node:n1,index:0},to:{index:0,node:{type: 'ast',unSuitableForCompositionReduction:false,content: {type: 'InteractionSimple',operatorType:'Composition'}}}})
    .forEach(middleEdge=>{
      // We have the edge so now we know the matching composition node
      let n2= middleEdge.to.node;

      // For each edge going to the matching node, we add an edge that goes to the current node with a special label on the port so we dont confuse with edges that already go to it
      graph
      .matchUndirectedEdges({type: 'ast',from:{node:n2}})
      .reject(e2=>_.isUndefined(e2.from.compositionElementName))
      .forEach(e2=>{
        let d2 = e2.to;
        if(d2.node === n2)d2={node:n1,coCompositionElementName:e2.to.compositionElementName,isCoPort:true};
        graph
        .addEdge({type:'ast',from:{node:n1,coCompositionElementName:e2.from.compositionElementName,isCoPort:true},to:d2});})
      .commit();

      // We can mark this node as done
      n1.didCompositionReduction=true;
      n2.didCompositionReduction=true;})
    .commit();
    n1.unSuitableForCompositionReduction=true;

  });

  // Now its time to reduce all this mess !
  graph
  .matchNodes({type: 'ast',didCompositionReduction:true})
  .forEach(n1=>{
      // console.log("-----------------------------------------------");
      // console.log(n1.id);

      // Lets build a graph of the situation inside the Composition Node. Wiring between ports and co ports
      // Each Node of the internal graph represents a port of the Composition node
      let internalGraph = new Graph();

      let coPortsFrom =
      graph
      .matchDirectedEdges({type: 'ast',from:{node:n1}})
      .filter(x=>(x.from.isCoPort===true))
      .map(x=>({port:x.from,closed:false}))
      .value();

      let coPortsTo =
      graph
      .matchDirectedEdges({type: 'ast',to:{node:n1}})
      .filter(x=>(x.to.isCoPort===true))
      .map(x=>({port:x.from,closed:false}))
      .value();

      let coPortNodes = {};
      _([coPortsFrom,coPortsTo])
      .flatten()
      .sortBy("port.coCompositionElementName")
      .unique(true,"port.coCompositionElementName")
      .forEach(x=>{coPortNodes[x.port.coCompositionElementName]=internalGraph.addNode(x);})
      .commit();

      let portsFrom =
      graph
      .matchDirectedEdges({type: 'ast',from:{node:n1}})
      .filter(x=>(x.from.isCoPort!==true))
      .map(x=>({port:x.from,closed:false}))
      .value();

      let portsTo =
      graph
      .matchDirectedEdges({type: 'ast',to:{node:n1}})
      .filter(x=>(x.to.isCoPort!==true))
      .map(x=>({port:x.to,closed:false}))
      .value();

      let portNodes = {};
      _([portsFrom,portsTo])
      .flatten()
      .sortBy("port.compositionElementName")
      .unique(true,"port.compositionElementName")
      .forEach(x=>{portNodes[x.port.compositionElementName]=internalGraph.addNode(x);})
      .commit();

      // Connect Ports with their respective coPorts in the internal graph
      internalGraph
      .matchNodes({port:{isCoPort:true}})
      .forEach(n1=>{
        internalGraph
        .matchNodes({port:{compositionElementName:n1.port.coCompositionElementName}})
        .filter(x=>(x.port.isCoPort!==true))
        .forEach(n2=>
          internalGraph.addEdge({type:'normal',from:{node:n1},to:{node:n2}}))
        .commit();})
      .commit();

      // Add loops between ports of the composition node to the internal graph
      graph
      .matchUndirectedEdges({type: 'ast',from:{node:n1},to:{node:n1}})
      .reject(e=>(_.isUndefined((e.from.compositionElementName)&&_.isUndefined(e.from.coCompositionElementName))||(_.isUndefined(e.to.compositionElementName)&&_.isUndefined(e.to.coCompositionElementName))))
      .forEach(e=>{
        let origin = (e.from.isCoPort===true) ? coPortNodes[e.from.coCompositionElementName] : portNodes[e.from.compositionElementName];
        let dest = (e.to.isCoPort===true) ? coPortNodes[e.to.coCompositionElementName] : portNodes[e.to.compositionElementName];
        internalGraph.addEdge({type:'loop',from:{node:origin},to:{node:dest}});
      })
      .commit();

      // Transitively close the internal graph
      internalGraph
      .reduceNodes({closed:false},
        (theResult,theNode)=>{
          // console.log("  > "+theNode.id);
          internalGraph
          .matchUndirectedEdges({from:{node:theNode}})
          .forEach(e1=>{
            internalGraph
            .matchUndirectedEdges({from:{node:theNode}})
            .filter(e2=>(e2.id>e1.id))
            .forEach(e2=>{
              internalGraph
              .addEdge({type:'closure',from:{node:e1.to},to:{node:e2.to}});})
            .commit();})
          .commit();
          theNode.closed = true;});

      // Ok ! Now the internal graph is complete, we can start wiring edges in the main graph
      internalGraph
      .matchUndirectedEdges({from:{node:{port:{}}},to:{node:{port:{}}}})
      .filter(x=>(x.to.node.port.isCoPort!==true && x.from.node.port.isCoPort===true))
      .forEach(internalEdge=>{
        // console.log("xxxx")
        graph
        .matchUndirectedEdges({from:{node:n1,coCompositionElementName:internalEdge.from.node.port.coCompositionElementName}})
        .forEach(coEdge=>{
          graph
          .matchUndirectedEdges({from:{node:n1,compositionElementName:internalEdge.to.node.port.compositionElementName}})
          .forEach(edge=>{
            // console.log("ADD  "+coEdge.to.node.id+" "+edge.to.node.id);
            graph
            .addEdge({type:'ast',from:coEdge.to,to:edge.to});})
          .commit();})
        .commit();})
      .commit();})
    .commit();

  // Finally we finish the treated composition nodes
  graph
  .matchNodes({type: 'ast',didCompositionReduction:true,content: {type: 'InteractionSimple',operatorType:'Composition'}})
  .forEach( theNode => {graph.finish(theNode);})
  .commit();


// TODO LOOP all this until fixed point (no new composition matches)


}







function createDataFlowDirection(graph) {

// First we infer type of ports on edges from types of ports of nodes they lead to
  graph
  .matchUndirectedEdges({type:'ast'})
  .forEach((theEdge)=>{
    let portOnOrigin =
    _.cloneDeep(theEdge.from.node.ports[theEdge.from.index]);
    let portOnDestination =
    _.cloneDeep(theEdge.to.node.ports[theEdge.to.index]);
// Here we infer that port on one end are conjugated with ports on other end
// console.log("EDGE0 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
    try{
theEdge.from.ports = mergePortList(portOnOrigin,conjugatePort(portOnDestination));
// console.log("EDGE1 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}catch(e){
// console.log("X EDGE1 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}
try{
    theEdge.to.ports = mergePortList(portOnDestination,conjugatePort(portOnOrigin));
// console.log("EDGE2 "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}catch(e){
// console.log("X EDGE2 "+e+" "+theEdge.id +" "+ theEdge.from.index+" "+ portOnOrigin+" "+ theEdge.to.index + " " + portOnDestination);
}
  if(portIsOnlyMadeOf(theEdge.from.ports,"in") && portIsOnlyMadeOf(theEdge.to.ports,"in")){
    // console.log("in to in situation on edge " +theEdge.id );
    graph.finish(theEdge);
  }
  if(portIsOnlyMadeOf(theEdge.from.ports,"out") && portIsOnlyMadeOf(theEdge.to.ports,"out")){
      // console.log("out to out situation on edge " +theEdge.id + " from "+ theEdge.from.node.id+" to "+theEdge.to.node.id );
      graph.finish(theEdge);
    }
})
  .commit();

// Then we infer types of ports on Nodes from types of ports on edges that lead to them
  graph
  .matchNodes({type:'ast'})
  .forEach((theNode)=>{

// console.log("NODE0 "+theNode.id +" "+ JSON.stringify(theNode.ports));
    graph
    .matchUndirectedEdges({type:'ast',from:{node:theNode}})
    .forEach((theEdge)=>{
// try{
      theNode.ports[theEdge.from.index] = mergePortList(theNode.ports[theEdge.from.index], theEdge.from.ports);
// }catch(e){console.log("X NODE1 " +theNode.id + " " +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.from.index]) + " "+JSON.stringify(theEdge.from.ports));}
})
    .filter({type:'ast',to:{node:theNode}})
    .forEach((theEdge)=>{
// try{
      theNode.ports[theEdge.to.index] = mergePortList(theNode.ports[theEdge.to.index], theEdge.to.ports);
// }catch(e){console.log("X NODE2 " +theNode.id + " "  +theEdge.from.index +" "+JSON.stringify(theNode.ports[theEdge.to.index]) + " "+JSON.stringify(theEdge.to.ports));}
})
    .commit();


})
  .commit();

}





function nonMatchingCompositionCompilation(graph) {
  // Then we find composition nodes and reduce them
  graph
  .matchNodes({type:'ast',content: {type: 'InteractionSimple',operatorType:'Composition'}})
  .filter(x=>(x.ports[0]==='out'||x.ports[0]==='in'))
  .forEach(theNode=>{

        let isCompo = theNode.ports[0]==='out';

        // console.log("NODE ! "+theNode.id +" "+ JSON.stringify(theNode.ports));

        let code = isCompo?"<%=a0%> = {};\n":"";
        let ports = [isCompo?'out':'in'];

        let compositionElementNameWithTheirIndex =
        graph
        .matchUndirectedEdges({type:'ast',from:{node:theNode}})
        .reject(theEdge=>_.isUndefined(theEdge.from.compositionElementName))
        .forEach(theEdge=>{if(theEdge.to.node===theNode)throw('Error:Loop on a composition interaction');})
        .map(theEdge=>({compositionElementName:theEdge.from.compositionElementName, index:theEdge.from.index}))
        .groupBy('index')
        .map(theElement=>
          _(theElement)
          .tap(x=>{if(_.size(_.unique(x,y=>y.compositionElementName))>1)throw ('Error: there are different edges with the same index but different compositionElementName');})
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
        .addNode({type:'ast',content:{
            'type': 'InteractionNative',
            'content': code
          },ports:ports});

      graph
      .matchUndirectedEdges({type:'ast',from:{node:theNode}})
      // .reject(theEdge=>_.isUndefined(theEdge.from.compositionElementName))
      .forEach(theEdge=>{
        graph.addEdge({type:'ast',from:{node:newNode,index:theEdge.from.index},to:theEdge.to});})
      .commit();

      graph
      .finish(theNode);
  })
  .commit();

  // Then we find decomposition nodes and reduce them

  //TODO loop

}


//TODO Why do we even have to do that ? Investigate
function removeDuplicateEdge(graph) {

  graph
  .matchUndirectedEdges({type:'ast'})
  .forEach(edge=>{edge.maybeDuplicate=true;})
  .commit();

  graph
  .reduceUndirectedEdges({type:'ast',maybeDuplicate:true},
  (theResult,theEdge)=>{
    let identicalEdges =
    graph
    .matchUndirectedEdges({type:'ast',maybeDuplicate:true,from:{node:theEdge.from.node,index:theEdge.from.index},to:{node:theEdge.to.node,index:theEdge.to.index}})
    .value();

    _(identicalEdges)
    .rest()
    .forEach(identicalEdge=>{
      graph
      .finish(identicalEdge);})
    .commit();

    theEdge.maybeDuplicate = false;});
}




// Here we solve the cases where several signals come or go from the same node with the same port number.
function resolveMultiplePorts(graph) {

  graph
  .matchUndirectedEdges({type:'ast'})
  .forEach(theEdge=>{theEdge.from.multiResolved=false;theEdge.to.multiResolved=false;})
  .commit();


  // Resolve multiple output
  graph
  .reduceUndirectedEdges({type:'ast',from:{multiResolved:false}},
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
    .matchUndirectedEdges({type:'ast',from:{node:theRightEdge.from.node,index:theRightEdge.from.index}})
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
      .addNode({type:'ast',content:{type:'InteractionNative',content:code},ports : ports});

      graph
      .addEdge({type:'ast',from:{multiResolved:true,node:theRightEdge.from.node,index:theRightEdge.from.index},to:{multiResolved:true,node:newNode,index:0}});

      _(similarOutputEdges)
      .forEach((similarEdge,index)=>{
        graph
        .addEdge({type:'ast',from:{multiResolved:true,node:newNode,index:index+1},to:similarEdge.to});
  // TODO I Should be able to do that
  // graph.finish(similarEdge);
  // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
  graph.finish(graph.findDirectedEdge({id:similarEdge.id}));
      })
      .commit();
    }else if(_(similarOutputEdges).size()<1) {
      throw ('what ? that should be impossible');
    }

    // Resolve multiple input on this edge destination
    let similarInputEdges =
    graph
    .matchUndirectedEdges({type:'ast',to:{node:theRightEdge.to.node,index:theRightEdge.to.index}})
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
          code = code + "if(<%=a0%>===null ){\n  <%=a0%> = <%=a"+(index+1)+"%>;\n} else if (<%=a"+(index+1)+"%> !== null){\n  throw('error:multiple active assignments to the same signal <%=a0%> : '+<%=a0%> + ' and ' + <%=a"+(index+1)+"%>);\n}";
          ports.push("in");
        })
        .commit();

        let newNode =
        graph
        .addNode({type:'ast',content:{type:'InteractionNative',content:code},ports : ports});

        graph
        .addEdge({type:'ast',to:{multiResolved:true,node:theRightEdge.to.node,index:theRightEdge.to.index},from:{multiResolved:true,node:newNode,index:0}});

        _(similarInputEdges)
        .forEach((similarEdge,index)=>{
          graph
          .addEdge({type:'ast',to:{multiResolved:true,node:newNode,index:index+1},from:similarEdge.from});
          // console.log("finishing edge "+similarEdge.id);
          // TODO I Should be able to do that
          // graph.finish(similarEdge);
          // But i have to do the following instead because the graph.matchUndirectedEdges returns copies of the edges and not the edges themselves
          graph.finish(graph.findDirectedEdge({id:similarEdge.id}));
        })
        .commit();



      }else if(_(similarInputEdges).size()<1) {
        throw ('what ? that should be impossible');
      }

      createDataFlowDirection(graph);



  });



  // var matchNode = function(x) {
  //   if (x.content === undefined) return false;
  //   return x.hasUniquePorts !== true && x.finished !== true;
  // };
  //
  // var b = _.find(graph.nodes, matchNode);
  // while (b !== undefined) {
  //   var i;
  //   // TODO extend i in case bigger interactions happen !
  //   var edgesNameList = {};
  //   for (i = 0; i < 1000; i++)  {
  //
  //     var incomingEdgesforCurrentI = _.filter(graph.edges, {
  //       type: 'DataFlowEdge',
  //       from: {
  //         finished: false
  //       },
  //       to: b,
  //       toIndex: i,
  //       finished: false
  //     });
  //     var outgoingEdgesforCurrentI = _.filter(graph.edges, {
  //       type: 'DataFlowEdge',
  //       to: {
  //         finished: false
  //       },
  //       from: b,
  //       fromIndex: i,
  //       finished: false
  //     });
  //   }
  //   if (_.isEmpty(incomingEdgesforCurrentI) && _.isEmpty(outgoingEdgesforCurrentI)) {
  //     //TODO We sequentially did the arguments of the node until we found a i for which there is no argument.
  //     // We are probably finished but are we sure ??....
  //     break;
  //   } else if ((incomingEdgesforCurrentI.length === 1 && outgoingEdgesforCurrentI.length === 0) || (incomingEdgesforCurrentI.length === 0 && outgoingEdgesforCurrentI.length === 1)) {
  //     // Nothing to do here, this port has no problem :-)
  //   } else if (incomingEdgesforCurrentI.length > 1 && outgoingEdgesforCurrentI.length === 0) {
  //     // Here we have a problem: several signals on the same port
  //     var inputPortCodeTemplate = "";
  //     var inputPortPorts = ['out'];
  //     _.forEach(incomingEdgesforCurrentI, function(x) {
  //       inputPortCodeTemplate = inputPortCodeTemplate + '';
  //       inputPortPorts.push('in');
  //     });
  //
  //   } else if (incomingEdgesforCurrentI.length === 0 && outgoingEdgesforCurrentI.length > 1) {} else {
  //     // TODO Same port used as multiple input and output...
  //   }
  //
  // }
  //
  // b.hasUniquePorts = true;
  //
  // var b = _.find(graph.nodes, matchNode);
}






// TODO finish tht
function instantiateTemplates(graph) {

  graph
  .matchNodes({type:'ast'})
  .forEach(n=>{n.shouldDoCodeGeneration=true;n.codeGeneration=false;})
  .commit();

  graph
  .reduceNodes({type:'ast',content:{type:"InteractionNative"},shouldDoCodeGeneration:true},
  (theResult,theNode)=>{

    let theArgs = {};
    let shouldGenerate = true;

    _(theNode.ports)
    .forEach((port,index)=>{
      // Normally there should be no duplicated edges, we assume there arent any, and use graph.find to find the only one:
      let edge =
      graph
      .findUndirectedEdge({type:'ast',from:{node:theNode,index:index}});
      if(edge === undefined) {
        //TODO This node is missing some links and we are going to create them like it's nothing : lol
        // console.log("Missing links on node but whatever, I am creating fake nodes for them "+theNode.id);
        if(portIsOnlyMadeOf(port,'in')) {
          // console.log("IN");
          // Create a node that keep sending inactive values
          let newNode =
          graph
          .addNode({type:'ast',content:{type:"InteractionNative",content:"<%=a0%> = inactive; //Fake sender node\n"},shouldDoCodeGeneration:true,ports:['out']});
          edge =
          graph
          .addEdge({type:'ast',from:{node:newNode,index:0,ports:'out'},to:{node:theNode,index:index,ports:port}});
        } else if (portIsOnlyMadeOf(port,'out')) {
          // console.log("OUT");
          // Create a node that receives the value
          let newNode =
          graph
          .addNode({type:'ast',content:{type:"InteractionNative",content:"// We dont care about <%=a0%>, this is a fake receiver node\n"},shouldDoCodeGeneration:true,ports:['in']});
          edge =
          graph
          .addEdge({type:'ast',to:{node:newNode,index:0,ports:'in'},from:{node:theNode,index:index,ports:port}});
        } else {
          // console.log("Man this is too much for me, I am just a compiler");
        }
      }
      theArgs["a"+index]=edge.id;
    })
    .commit();

    if(shouldGenerate){
      // console.log(theArgs)
      theNode.codeGeneration = {'js': _.template(theNode.content.content)(theArgs)};
      theNode.codeGenerated = true;
    }

    theNode.shouldDoCodeGeneration = false;

  });

}





// Use tarjan algorithm to order the graph
function orderGraph(graph) {

  let orderingList = [];

  graph
  .matchNodes({type:'ast'})
  .forEach(x=>{x.markedDuringGraphOrdering=false;})
  .commit();

  graph
  .reduceNodes({markedDuringGraphOrdering:false},
  (theResult,theNode)=>{
    visit(theNode);
  });

  function visit(n) {

    if (n.temporarilyMarkedDuringGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw "Error, the DAG contains cycles : ";//+_(stack).concat([n]).map('id').join(" -> ");
    } else {
      if (n.markedDuringGraphOrdering !== true) {
        n.temporarilyMarkedDuringGraphOrdering = true;
        graph
        .matchNodes(m=>
          graph
          .matchUndirectedEdges({type: 'ast',from: {node:n},to: {node:m}})
          .filter(edge => portIsOnlyMadeOf(edge.from.ports,'out') && portIsOnlyMadeOf(edge.to.ports,'in') )
          .size() > 0)
        .forEach(visit)
        .commit();

        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);
      }
    }

  }

  // The list is now ordered ! (Hopefully)
  //  We write the order in the nodes
  _(orderingList)
  .forEach((node, ii) => {node.hasExecutionOrder=true;node.executionOrder = ii;})
  .commit();
  // .forEach(function(node, ii) {console.log("iii "+ii);node.hasExecutionOrder=true;node.executionOrder = ii;})
  // .forEach((node, index) =>{console.log(node.executionOrder);})
  // .commit();


}















function generateJsCode(graph, header) {


  var nodesCode =
  graph
  .matchNodes({type:'ast',codeGenerated:true,hasExecutionOrder:true})
  .sortBy('executionOrder')
  .pluck('codeGeneration')
  .pluck('js')
  .join('\n');

  var edgeTemplate = _.template("var <%=id%> = inactive;");
  var edgesCode =
  graph
  .matchDirectedEdges({type:'ast'})
  .map(edgeTemplate)
  .join('\n');

  var stateTemplate = _.template("<%=stateVariableName%>:null");
  var statesCode =
  graph
  .matchNodes({type:'ast',containsAState:true})
  .unique('stateVariableName')
  .map(stateTemplate)
  .join(",\n");

  // console.log(edgesCode);

  var conf = {
    'edgesCode': edgesCode,
    'nodesCode': nodesCode,
    'statesCode': statesCode,
    'customHeader': header,
    'standardHeader': jsStandardHeader
  };

  var transTemplate = "\
///////////////////////////////////////////////////////////////////////\n\
//Standard LIDL Header\n\n\
<%= standardHeader%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Custom LIDL Header\n\n\
<%= customHeader%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Declaration of variables\n\n\
<%= edgesCode%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Code of the DAG\n\n\
<%= nodesCode%>\n\
///////////////////////////////////////////////////////////////////////\n\
//Return statement\n\n\
  return {\n\
      memo: {},\n\
      state: nextState,\n\
      args: {},\n\
      inter: theInterface\n\
    };\n";


  var initTemplate = "return {\n\
      memo: {},\n\
      state: {<%= statesCode%>},\n\
      args: {},\n\
      inter: {}\n\
    };\n";


  var transCode = _.template(transTemplate)(conf);
  var initCode = _.template(initTemplate)(conf);
  // console.log("==================================================================");
  // console.log(transCode);
  // console.log("==================================================================");
  // console.log(initCode);
  // console.log("==================================================================");
  return {
    source:_.template(jsSourceTemplate)({
      transitionFunction:  transCode ,
      initializationFunction: initCode
    }),
    executable:{
      transitionFunction: new Function("data", transCode),
      initializationFunction: new Function(initCode)
    }
  };
}



var jsStandardHeader = '\
function clone(a){if(!a)return a;var c,b=[Number,String,Boolean];if(b.forEach(function(b){a instanceof b&&(c=b(a))}),"undefined"==typeof c)if("[object Array]"===Object.prototype.toString.call(a))c=[],a.forEach(function(a,b,d){c[b]=clone(a)});else if("object"==typeof a)if(a.nodeType&&"function"==typeof a.cloneNode)var c=a.cloneNode(!0);else if(a.prototype)c=a;else if(a instanceof Date)c=new Date(a);else{c={};for(var d in a)c[d]=clone(a[d])}else c=a;return c}\n\
\n\
var theInterface = clone(data.inter);\n\
var previousState = data.state;\n\
var nextState = clone(previousState);\n\
var active = 1;\n\
var inactive = null;\n\
';

var jsSourceTemplate =
'function transitionFunction(data){\n<%=transitionFunction%>\n}\n\nfunction initializationFunction(data){\n<%=initializationFunction%>\n}\n\nmodule.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};';











//TODO Interfaces instead of ports
function mergePortList(x, y) {
  if (_.isArray(x)) {
    if (_.isArray(y)) {
      let i = 0;
      let res = [];
      for (i = 0; i < Math.max(x.length, y.length); i++) {
        res[i] = mergePortList(x[i], y[i]);
      }
      return res;
    } else if (_.isString(y)) {
      // reduce interface to data type
      if(portIsOnlyMadeOf(x,y))return y;
    } else if (_.isUndefined(y)) {
      return _.clone(x);
    } else {
      throw "error : portLists should be strings or arrays of strings";
    }
  } else if (_.isString(x)) {
    if (_.isArray(y)) {
      // reduce interface to data type
      if(portIsOnlyMadeOf(y,x))return x;
    } else if (_.isString(y)) {
      if (x === y) return x
      else throw "error : trying to merge incompatible ports "+ x + " and "+ y;
    } else if (_.isUndefined(y)) {
      return x;
    } else {
      throw "error : portLists should be strings or arrays of strings";
    }
  } else if (_.isUndefined(x)) {
    if (_.isArray(y)) {
      return _.clone(y);
    } else if (_.isString(y)) {
      return y;
      throw "error : trying to merge incompatible ports "+ x + " and "+ y;
    } else if (_.isUndefined(y)) {
      return;
    } else {
      throw "error : portLists should be strings or arrays of strings";
    }
  } else {
    throw "error : portLists should be strings or arrays of strings";
  }
}

// Check if ports like ['in','in'] are compatible with 'in'
function portIsOnlyMadeOf(x,s){
  if (_.isArray(x)) {
    let i = 0;
    let res = true;
    for (i = 0; i < x.length; i++) {
      res = res && portIsOnlyMadeOf(x[i],s) ;
    }
    return res;
  } else if (_.isString(x)) {
    if(x===s){
      return true;
    }else {
      return false;
    }
  } else if (_.isUndefined(x)) {
    return false;
  } else {
    throw "error : port should be arrays of strings or strings";
  }
}

// ['in','out','out'] -> ['out','in','in']
function conjugatePort(x) {
  if (_.isArray(x)) {
    let i = 0;
    let res = [];
    for (i = 0; i < x.length; i++) {
      res[i] = conjugatePort(x[i]);
    }
    return res;
  } else if (_.isString(x)) {
    if(x==='in'){
      return'out'
    }else if (x==='out'){
      return 'in';
    }else {
      throw "error : port should be in our out or arrays of in and out";
    }
  } else if (_.isUndefined(x)) {
    return undefined;
  } else {
    throw "error : port should be arrays of strings or strings";
  }
}













module.exports.compileToIii = compileToIii;
module.exports.compileToJs = compileToJs;
module.exports.generateJsCode = generateJsCode;
module.exports.compileToGraph = compileToGraph;
