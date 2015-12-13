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
    forEach(function (ports, index) {
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
        if ((0, _interfaces.madeOnlyOf)(ports) === 'in') {
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
            codeGeneration: false, 
            ports: [(0, _interfaces.conjugateInterface)(ports)] });

          // newNode.content.content = '// ' + newNode.id + '\n' + newNode.content.content;
          edge = 
          graph.
          addEdge({ 
            type: 'InteractionInstanceOperand', 
            from: { 
              node: newNode, 
              index: 0, 
              ports: (0, _interfaces.conjugateInterface)(ports) }, 

            to: { 
              node: theNode, 
              index: index, 
              ports: ports } });} else 


        if ((0, _interfaces.madeOnlyOf)(ports) === 'out') {
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
            codeGeneration: false, 
            ports: [(0, _interfaces.conjugateInterface)(ports)] });

          // newNode.content.content = '// ' + newNode.id + '\n' + newNode.content.content;
          edge = 
          graph.
          addEdge({ 
            type: 'InteractionInstanceOperand', 
            to: { 
              node: newNode, 
              index: 0, 
              ports: (0, _interfaces.conjugateInterface)(ports) }, 

            from: { 
              node: theNode, 
              index: index, 
              ports: ports } });} else 


        {
          throw new Error('A node of the DAG is missing a connexion with a composite interface');}}


      theArgs["a" + index] = edge.id;}).

    commit();

    if (shouldGenerate) {
      // console.log(theArgs)
      theNode.codeGeneration = { 
        'js': '// ' + theNode.id + '\n' + _lodash2.default.template(theNode.content.content)(theArgs) };

      theNode.codeGenerated = true;}


    theNode.shouldDoCodeGeneration = false;});}