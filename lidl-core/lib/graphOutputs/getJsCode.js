"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



getJsCode;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function getJsCode(graph, header) {

  var nodesCode = 
  graph.
  matchNodes({ type: 'InteractionInstance', codeGenerated: true, hasExecutionOrder: true }).
  sortBy('executionOrder').
  pluck('codeGeneration').
  pluck('js').
  join('\n');

  var edgeTemplate = _lodash2.default.template("var <%=id%> = inactive;");
  var edgesCode = 
  graph.
  matchDirectedEdges({ type: 'InteractionInstanceOperand' }).
  map(edgeTemplate).
  join('\n');

  var stateTemplate = _lodash2.default.template("<%=stateVariableName%>:null");
  var statesCode = 
  graph.
  matchNodes({ type: 'InteractionInstance', containsAState: true }).
  unique('stateVariableName').
  map(stateTemplate).
  join(",\n");

  // console.log(edgesCode);

  var conf = { 
    'edgesCode': edgesCode, 
    'nodesCode': nodesCode, 
    'statesCode': statesCode, 
    'customHeader': header, 
    'standardHeader': jsStandardHeader };


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
      args: theArgs,\n\
      inter: theInterface\n\
    };\n";


  var initTemplate = "return {\n\
      memo: {},\n\
      state: {<%= statesCode%>},\n\
      args: {},\n\
      inter: {}\n\
    };\n";


  var transCode = _lodash2.default.template(transTemplate)(conf);
  var initCode = _lodash2.default.template(initTemplate)(conf);
  // console.log("==================================================================");
  // console.log(transCode);
  // console.log("==================================================================");
  // console.log(initCode);
  // console.log("==================================================================");
  return { 
    source: _lodash2.default.template(jsSourceTemplate)({ 
      transitionFunction: transCode, 
      initializationFunction: initCode }), 

    partialSource: { 
      transitionFunction: transCode, 
      initializationFunction: initCode } };}






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