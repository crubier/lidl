"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 




expandDefinitions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _interactions = require('../interactions.js');var _interactions2 = _interopRequireDefault(_interactions);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _typeof(obj) {return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;}function expandDefinitions(graph) {
  // First we create dependency links between definitions nodes
  // For each definition
  graph.
  matchNodes({ 
    type: 'Definition' }).

  forEach(function (defNode) {
    defNode.markedDuringDefinitionGraphOrdering = false;
    // For each of its sub interactions
    graph.
    matchDirectedEdges({ 
      type: 'DefinitionSubInteraction', 
      from: { 
        node: defNode }, 

      to: { 
        node: { 
          isCustom: true } } }).



    pluck('to.node').
    forEach(function (subInteractionNode) {
      // Find the definition of this sub interaction
      var subInteractionDefNode = 
      graph.
      findDirectedEdge({ 
        type: 'InteractionDefinition', 
        from: { 
          node: subInteractionNode } }).


      to.node;

      // Add a dependency from the definition to the definition of the sub interaction
      if (_lodash2.default.isUndefined(graph.findDirectedEdge({ 
        type: 'DefinitionDependency', 
        from: { 
          node: defNode }, 

        to: { 
          node: subInteractionDefNode } }))) 

      {
        graph.
        addEdge({ 
          type: 'DefinitionDependency', 
          from: { 
            node: defNode }, 

          to: { 
            node: subInteractionDefNode } });}}).




    commit();}).

  commit();

  var orderingList = [];

  // TODO Maybe we can only visit the root definition instead of all of them
  // Then we create a graph ordering of all definition nodes according to the dependency relationship
  graph.
  reduceNodes({ 
    type: 'Definition', 
    markedDuringDefinitionGraphOrdering: false }, 
  function (theResult, theNode) {
    visitDef(theNode);});


  function visitDef(n) {
    if (n.temporarilyMarkedDuringDefinitionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("the definition structure contains circular definitions"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
        if (n.markedDuringDefinitionGraphOrdering !== true) {
          n.temporarilyMarkedDuringDefinitionGraphOrdering = true;
          graph.
          matchNodes(function (m) {return (
              graph.
              matchDirectedEdges({ 
                type: 'DefinitionDependency', 
                from: { 
                  node: n }, 

                to: { 
                  node: m } }).


              size() > 0);}).
          forEach(visitDef).
          commit();

          n.markedDuringDefinitionGraphOrdering = true;
          n.temporarilyMarkedDuringDefinitionGraphOrdering = false;
          orderingList.unshift(n);}}}







  // Finally, we expand all definitions, in order.
  (0, _lodash2.default)(orderingList).
  reverse() // reverse the list in order to expand most basic interactions first
  .forEach(function (defNode) {
    instantiateDefinitionInteraction(graph, defNode);}).

  commit();}









// Here we expand the whole interaction expression of a definition
function instantiateDefinitionInteraction(graph, definitionNode) {
  // console.log('=================== instantiate '+definitionNode.content.signature.operator);

  // Find the root Interaction
  var rootInteraction = 
  graph.
  findDirectedEdge({ 
    type: 'DefinitionInteraction', 
    from: { 
      node: definitionNode } }).


  to.node;

  rootInteraction.isRootOfDefiniton = true;

  // Mark all subinteractions as not visited
  graph.
  matchDirectedEdges({ 
    type: 'DefinitionSubInteraction', 
    from: { 
      node: definitionNode } }).


  forEach(function (edge) {
    edge.to.node.markedDuringInteractionGraphOrdering = false;}).

  commit();



  var orderingList = [];

  // Then we create a graph ordering of all interaction nodes according to the dependency relationship
  // Find all sub interactions of the current definition
  graph.
  reduceDirectedEdges({ 
    type: 'DefinitionSubInteraction', 
    from: { 
      node: definitionNode }, 

    to: { 
      node: { 
        markedDuringInteractionGraphOrdering: false } } }, 


  function (theResult, theEdge) {
    visitInteraction(theEdge.to.node);});


  function visitInteraction(n) {
    if (n.temporarilyMarkedDuringInteractionGraphOrdering === true) {
      //TODO Add traceback to initial AST (change code everywhere in order to add traceability)
      throw new Error("The interaction structure contains cycles"); //+_(stack).concat([n]).map('id').join(" -> ");
    } else {
        if (n.markedDuringInteractionGraphOrdering !== true) {
          n.temporarilyMarkedDuringInteractionGraphOrdering = true;
          graph.
          matchNodes(function (m) {return (
              graph.
              matchDirectedEdges({ 
                type: 'InteractionOperand', 
                from: { 
                  node: n }, 

                to: { 
                  node: m } }).


              size() > 0);}).
          forEach(visitInteraction).
          commit();

          n.markedDuringInteractionGraphOrdering = true;
          n.temporarilyMarkedDuringInteractionGraphOrdering = false;
          orderingList.unshift(n);}}}






  (0, _lodash2.default)(orderingList).
  reverse() // reverse the list in order to expand most basic interactions first
  .forEach(function (interNode) {
    // console.log(interNode.content.operator);
    // instantiateDefinitionInteraction(graph,defNode);
    var newNodes = 
    instantiateInteraction(graph, interNode);

    (0, _lodash2.default)(newNodes).
    forEach(function (n) {
      graph.
      addEdge({ 
        type: 'DefinitionSubInteractionInstance', 
        from: { 
          node: definitionNode }, 

        to: { 
          node: n } });}).



    commit();}).

  commit();

  //TODO uncomment this
  // Link to the root interaction instance
  var instantiatedRoot = 
  graph.
  findDirectedEdge({ 
    type: 'DefinitionSubInteractionInstance', 
    from: { 
      node: definitionNode }, 

    to: { 
      node: { 
        isRootOfDefiniton: true } } }).



  to.node;

  graph.
  addEdge({ 
    type: 'DefinitionInteractionInstance', 
    from: { 
      node: definitionNode }, 

    to: { 
      node: instantiatedRoot } });}








// Here we expand a single interaction node
function instantiateInteraction(graph, interactionNode) {
  // console.log(interactionNode.content.operator);

  // First we get all the InteractionOperand Edges that go from and to this interaction
  // The sub Interactions are already instantiated
  var interactionoperandEdgesFrom = 
  graph.
  matchDirectedEdges({ 
    type: 'InteractionInstanceOperand', 
    from: { 
      node: interactionNode } }).


  value();
  // The super Interactions are not instantiated yet
  var interactionoperandEdgesTo = 
  graph.
  matchDirectedEdges({ 
    type: 'InteractionOperand', 
    to: { 
      node: interactionNode } }).


  value();






  if (interactionNode.isBase) {var _ret = (function () {







      // console.log("BAS "+interactionNode.content.operator);
      // Base interaction, we just instantiate it and link it
      // So first we create the instance
      var newNode = 
      graph.
      addNode({ 
        type: 'InteractionInstance', 
        isRootOfDefiniton: interactionNode.isRootOfDefiniton, 
        isArgument: false, 
        content: interactionNode.content, 
        ports: interactionNode.ports });

      // Then we link the instance
      graph.
      addEdge({ 
        type: 'InteractionInstanceInteraction', 
        from: { 
          node: newNode }, 

        to: { 
          node: interactionNode } });


      // First to the sub Interactions (which are already instantiated)
      (0, _lodash2.default)(interactionoperandEdgesFrom).
      forEach(function (edge) {
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          from: { 
            node: newNode, 
            index: edge.from.index }, 

          to: edge.to });}).


      commit();
      // Then to the super Interactions (which are not instantiated)
      (0, _lodash2.default)(interactionoperandEdgesTo).
      forEach(function (edge) {
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          to: { 
            node: newNode, 
            index: edge.to.index }, 

          from: edge.from });}).


      commit();
      // interactionNode.instantiated = true;
      graph.finish(interactionNode);
      return { v: [newNode] };})();if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;} else 








  if (interactionNode.isArgument) {var _ret2 = (function () {






      // console.log("ARG "+interactionNode.content.operator);
      // So first we create the instance
      var newNode = 
      graph.
      addNode({ 
        type: 'InteractionInstance', 
        isRootOfDefiniton: interactionNode.isRootOfDefiniton, 
        isArgument: true, 
        content: interactionNode.content, 
        ports: interactionNode.ports });

      // Then we link the instance
      graph.
      addEdge({ 
        type: 'InteractionInstanceInteraction', 
        from: { 
          node: newNode }, 

        to: { 
          node: interactionNode } });


      // To the definition it is an agument of
      var argNode = 
      graph.
      findDirectedEdge({ 
        type: 'InteractionDefinition', 
        from: { 
          node: interactionNode } }).


      to.node;

      var defPort = 
      graph.
      findDirectedEdge({ 
        type: 'SignatureOperand', 
        to: { 
          node: argNode } }).


      from;

      graph.
      addEdge({ 
        type: 'InteractionInstanceIsOperandOf', 
        from: { 
          node: newNode }, 

        to: defPort });


      // Then to the super Interactions (which are not instantiated)
      (0, _lodash2.default)(interactionoperandEdgesTo).
      forEach(function (edge) {
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          to: { 
            node: newNode, 
            index: edge.to.index }, 

          from: edge.from });}).


      commit();

      graph.finish(interactionNode);
      // interactionNode.instantiated = true;
      return { v: [newNode] };})();if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;} else 







  if (interactionNode.isCustom) {var _ret3 = (function () {








      // console.log("CUS "+interactionNode.content.operator);

      var defNode = 
      graph.
      findDirectedEdge({ 
        type: 'InteractionDefinition', 
        from: { 
          node: interactionNode } }).


      to.node;

      // let subNodes

      var defInteractionInstanceNodes = 
      graph.
      matchDirectedEdges({ 
        type: 'DefinitionSubInteractionInstance', 
        from: { 
          node: defNode } }).


      map(function (x) {return x.to.node;}).
      value();

      var defInteractionInstanceEdges = 
      graph.
      matchDirectedEdges({ 
        type: 'InteractionInstanceOperand' }).

      filter(function (e) {return _lodash2.default.includes(defInteractionInstanceNodes, e.to.node) && _lodash2.default.includes(defInteractionInstanceNodes, e.from.node);}).
      value();

      var defInteractionInstanceIsOperandOf = 
      graph.
      matchDirectedEdges({ 
        type: 'InteractionInstanceIsOperandOf' }).

      filter(function (e) {return _lodash2.default.includes(defInteractionInstanceNodes, e.from.node);}).
      value();
      //
      // console.log(defInteractionInstanceIsOperandOf);
      //
      var graphToCopy = { 
        nodes: defInteractionInstanceNodes, 
        edges: _lodash2.default.union(defInteractionInstanceEdges, defInteractionInstanceIsOperandOf) };

      // console.log(graphToCopy);
      var newSubGraph = 
      copy(graph, graphToCopy);
      // console.log("    fff  ");
      // console.log(newSubGraph);
      // console.log("      ");
      //Find the root
      var rootOfDef = 
      (0, _lodash2.default)(newSubGraph.nodes).
      find({ 
        isRootOfDefiniton: true });


      rootOfDef.isRootOfDefiniton = interactionNode.isRootOfDefiniton;

      // Link the root
      (0, _lodash2.default)(interactionoperandEdgesTo).
      forEach(function (edge) {
        graph.
        addEdge({ 
          type: 'InteractionInstanceOperand', 
          to: { 
            node: rootOfDef, 
            index: edge.to.index }, 

          from: edge.from });}).


      commit();
      //
      // Find the args
      var argsOfDef = 
      (0, _lodash2.default)(newSubGraph.nodes).
      filter({ 
        isArgument: true }).

      map(function (nod) {
        var directArg = 
        graph.
        findDirectedEdge({ 
          type: 'InteractionInstanceIsOperandOf', 
          from: { 
            node: nod }, 

          to: { 
            node: defNode } });


        // console.log(directArg);
        if (_lodash2.default.isUndefined(directArg)) {
          return { 
            node: nod, 
            index: undefined };} else 

        {
          //         console.log("hhhhhhh");
          // console.log(directArg);
          return { 
            node: nod, 
            index: directArg.to.index };}}).



      reject(function (x) {return _lodash2.default.isUndefined(x.index);}).
      value();

      // console.log(argsOfDef);

      // Link the args
      (0, _lodash2.default)(argsOfDef).
      forEach(function (el) {
        // console.log(el);
        // Get the edges that come out of the interaction we are replacing
        (0, _lodash2.default)(interactionoperandEdgesFrom).
        filter({ 
          from: { 
            index: el.index } }).


        forEach(function (edge) {
          // Get the edges that come in the current argument
          graph.
          matchDirectedEdges({ 
            type: 'InteractionInstanceOperand', 
            to: { 
              node: el.node } }).


          forEach(function (ed) {
            // Add the edge going from the node that refer this argument in the subgraph to the nodes that represent this argument in the main graph
            graph.
            addEdge({ 
              type: 'InteractionInstanceOperand', 
              from: ed.from, 
              to: edge.to });}).


          commit();}).

        commit();

        // We delete the argument  interaction node
        graph.
        finish(el.node);}).

      commit();

      graph.finish(interactionNode);
      return { v: newSubGraph.nodes };})();if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;} else 

  {
    throw new Error('Could not instantiate interaction ' + interactionNode.content.operator + " " + interactionNode.id + " because it is not an argument, a base interaction or a custom defined interaction");}}












// Duplicates a subgraph
function copy(graph, subgraph) {

  var newNodes = 
  (0, _lodash2.default)(subgraph.nodes).
  map(function (n) {return graph.addNode(n);}).
  value();

  // Find the copied (or not) version of a node
  function copied(nod) {
    var k = (0, _lodash2.default)(subgraph.nodes).findIndex(nod);
    if (k >= 0) {
      return newNodes[k];} else 
    {
      return nod;}}



  var newEdges = 
  (0, _lodash2.default)(subgraph.edges).
  map(function (e) {return graph.addEdge(_lodash2.default.assign(_lodash2.default.clone(e), { 
      from: _lodash2.default.assign(_lodash2.default.clone(e.from), { 
        node: copied(e.from.node) }), 

      to: _lodash2.default.assign(_lodash2.default.clone(e.to), { 
        node: copied(e.to.node) }) }));}).


  value();

  return { 
    nodes: newNodes, 
    edges: newEdges };}