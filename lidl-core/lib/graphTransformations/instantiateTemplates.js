"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 









instantiateTemplates;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interfaces = require('../interfaces');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function instantiateTemplates(graph) {

  graph.
  matchNodes({ 
    type: 'InteractionInstance' }).

  forEach(function (n) {
    n.shouldDoCodeGeneration = true;
    n.codeGeneration = false;}).

  commit();

  graph.
  reduceNodes({ 
    type: 'InteractionInstance', 
    content: { 
      type: "InteractionNative" }, 

    shouldDoCodeGeneration: true }, 
  function (theResult, theNode) {

    var theArgs = {};
    var shouldGenerate = true;

    (0, _lodash2.default)(theNode.ports).
    forEach(function (port, index) {
      // Normally there should be no duplicated edges, we assume there arent any, and use graph.find to find the only one:
      var edge = 
      graph.
      findUndirectedEdge({ 
        type: 'InteractionInstanceOperand', 
        from: { 
          node: theNode, 
          index: index } });


      if (edge === undefined) {
        //TODO This node is missing some links and we are going to create them like it's nothing : lol
        // console.log("Missing links on node but whatever, I am creating fake nodes for them "+theNode.id);
        if ((0, _interfaces.madeOnlyOf)(port) === 'in') {
          // console.log("IN");
          // Create a node that keep sending inactive values
          var newNode = 
          graph.
          addNode({ 
            type: 'InteractionInstance', 
            content: { 
              type: "InteractionNative", 
              content: "<%=a0%> = inactive; //Fake sender node\n" }, 

            shouldDoCodeGeneration: true, 
            ports: [(0, _interfaces.conjugateInterface)(port)] });

          newNode.content = '// ' + newNode.id + '\n' + newNode.content;
          edge = 
          graph.
          addEdge({ 
            type: 'InteractionInstanceOperand', 
            from: { 
              node: newNode, 
              index: 0, 
              ports: (0, _interfaces.conjugateInterface)(port) }, 

            to: { 
              node: theNode, 
              index: index, 
              ports: port } });} else 


        if ((0, _interfaces.madeOnlyOf)(port) === 'out') {
          // console.log("OUT");
          // Create a node that receives the value
          var newNode = 
          graph.
          addNode({ 
            type: 'InteractionInstance', 
            content: { 
              type: "InteractionNative", 
              content: "// We dont care about <%=a0%>, this is a fake receiver node\n" }, 

            shouldDoCodeGeneration: true, 
            ports: [(0, _interfaces.conjugateInterface)(port)] });

          newNode.content = '// ' + newNode.id + '\n' + newNode.content;
          edge = 
          graph.
          addEdge({ 
            type: 'InteractionInstanceOperand', 
            to: { 
              node: newNode, 
              index: 0, 
              ports: (0, _interfaces.conjugateInterface)(port) }, 

            from: { 
              node: theNode, 
              index: index, 
              ports: port } });} else 


        {
          throw new Error('A node of the DAG is missing a connexion with a composite interace');}}


      theArgs["a" + index] = edge.id;}).

    commit();

    if (shouldGenerate) {
      // console.log(theArgs)
      theNode.codeGeneration = { 
        'js': '// ' + theNode.id + '\n' + _lodash2.default.template(theNode.content.content)(theArgs) };

      theNode.codeGenerated = true;}


    theNode.shouldDoCodeGeneration = false;});}