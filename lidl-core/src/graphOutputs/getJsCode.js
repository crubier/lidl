"use strict"

import _ from 'lodash'

export default function getJsCode(graph, header) {

  var nodesCode =
  graph
  .matchNodes({type:'InteractionInstance',codeGenerated:true,hasExecutionOrder:true})
  .sortBy('executionOrder')
  .map(n=>n.codeGeneration.js)
  .join('');

  var edgeTemplate = _.template("var <%=id%> = inactive;");
  var edgesCode =
  graph
  .matchDirectedEdges({type:'InteractionInstanceOperand'})
  .map(edgeTemplate)
  .join('\n');

  var stateTemplate = _.template("<%=stateVariableName%>:null");
  var statesCode =
  graph
  .matchNodes({type:'InteractionInstance',containsAState:true})
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
// Standard LIDL Header (Standard JS function definitions)\n\
<%= standardHeader%>\n\n\
///////////////////////////////////////////////////////////////////////\n\
// Custom LIDL Header (Custom JS function definitions)\n\
<%= customHeader%>\n\n\
///////////////////////////////////////////////////////////////////////\n\
// Declaration of variables (Edges of the graph)\n\
<%= edgesCode%>\n\n\
///////////////////////////////////////////////////////////////////////\n\
// Data flow processing (Nodes of the graph)\n\
<%= nodesCode%>\n\n\
///////////////////////////////////////////////////////////////////////\n\
// Return statement\n\
  return {\n\
      memo: {},\n\
      state: nextState,\n\
      args: theArgs,\n\
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
    partialSource:{
      transitionFunction:  transCode ,
      initializationFunction: initCode
    }
  };
}



var jsStandardHeader = '\
function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}\n\
\n\
var theInterface = clone(data.inter);\n\
var previousState = data.state;\n\
var nextState = clone(previousState);\n\
var theArgs = clone(data.args);\n\
var active = "lidl_active_value";\n\
var inactive = null;\n\
';

var jsSourceTemplate =
'function transitionFunction(data){\n<%=transitionFunction%>\n}\n\nfunction initializationFunction(data){\n<%=initializationFunction%>\n}\n\nmodule.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};';
