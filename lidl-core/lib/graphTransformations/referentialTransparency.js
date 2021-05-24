"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =






referentialTransparency;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
function referentialTransparency(graph) {// First we mark all nodes as not referentialTransparencySolved
  graph.matchNodes({ type: 'Interaction', content: { type: 'InteractionSimple' } }).forEach(function (theNode) {
    theNode.referentialTransparencySolved = false;
    theNode.referentialTransparencySolvable = // Only leaves are solvable intially
    graph.
    matchUndirectedEdges({ type: 'InteractionOperand', from: { node: theNode } }).
    filter(function (e) {return e.from.index > 0;}).
    size() == 0;}).
  commit();

  graph.
  reduceNodes({ type: 'Interaction', content: { type: 'InteractionSimple' }, referentialTransparencySolved: false, referentialTransparencySolvable: true },
  function (theResult, theNode) {
    // console.log("========------------------------------------===");
    // console.log(theNode.id+ " "+theNode.content.operator);
    // console.log("==+++++++++++++++++++++===");
    var theChildrenEdges =
    graph.
    matchUndirectedEdges({ type: 'InteractionOperand', from: { node: theNode } }).
    filter(function (e) {return e.from.index > 0;}) // Only children, not the parent which has index 0
    .value();

    // Find the definition this interaction is part of
    var parentDef =
    graph.
    findDirectedEdge({ type: 'DefinitionSubInteraction', to: { node: theNode } }).
    from.node;

    var similarNodes =
    graph.
    matchNodes({ type: 'Interaction', content: { operator: theNode.content.operator } }) // Same operator
    .reject(function (n) {return (// Within the same definition
        _lodash2.default.isUndefined(
        graph.
        findDirectedEdge({ type: 'DefinitionSubInteraction', from: { node: parentDef }, to: { node: n } })));}).
    filter(function (n) {return (// All chidren of similarNode are children of theNode
        graph.
        matchUndirectedEdges({ type: 'InteractionOperand', from: { node: n } }).
        filter(function (e) {return e.from.index > 0;}) // We check for similarity of children only, not parents !
        .every(function (e) {return (
            (0, _lodash2.default)(theChildrenEdges).
            filter({ from: { index: e.from.index }, to: { index: e.to.index, node: e.to.node } }).
            size() === 1);}));}).
    filter(function (n) {return (// All children of theNode are children of the similarNode
        (0, _lodash2.default)(theChildrenEdges).
        every(function (ce) {return (
            graph.
            matchUndirectedEdges({ type: 'InteractionOperand', from: { node: n } }).
            filter(function (e) {return e.from.index > 0;}).
            filter({ from: { index: ce.from.index }, to: { index: ce.to.index, node: ce.to.node } }).
            size() === 1);}));}).
    value();


    // We create a node to merge all the nodes similar to theNode
    // TODO Merge nodes differently than tjust picking the first
    // for example put all syntactic locations of nodes to improve traceback
    var newNode =
    graph.
    addNode(theNode);

    // Attach the newNode to the definition theNode is in
    graph.
    matchDirectedEdges({ type: 'DefinitionInteraction', to: { node: theNode } }).
    forEach(function (e) {return (
        graph.
        addEdge({ type: 'DefinitionInteraction', from: e.from, to: { node: newNode } }));}).
    commit();

    // Attach the newNode to the definition theNode is in
    graph.
    matchDirectedEdges({ type: 'DefinitionSubInteraction', to: { node: theNode } }).
    forEach(function (e) {return (
        graph.
        addEdge({ type: 'DefinitionSubInteraction', from: e.from, to: { node: newNode } }));}).
    commit();


    // Attach newNode to children of theNode
    (0, _lodash2.default)(theChildrenEdges).
    forEach(function (ce) {
      graph.
      addEdge({ type: 'InteractionOperand', from: { node: newNode, index: ce.from.index, ports: ce.from.ports }, to: ce.to });}).
    commit();

    newNode.referentialTransparencySolved = true;
    newNode.referentialTransparencySolvable = false;

    // We link them together
    (0, _lodash2.default)(similarNodes).
    forEach(function (similarNode) {
      graph.
      matchUndirectedEdges({ type: 'InteractionOperand', from: { node: similarNode, index: 0 } }).
      forEach(function (edgeFromSimilarNode) {
        // console.log()
        graph.
        addEdge({ type: 'InteractionOperand', from: { node: newNode, index: edgeFromSimilarNode.from.index, ports: edgeFromSimilarNode.from.ports }, to: edgeFromSimilarNode.to });}).
      commit();
      graph.
      finish(similarNode);}).
    commit();

    // We find new potential solvable nodes
    graph.
    matchNodes({ type: 'Interaction', content: { type: 'InteractionSimple' }, referentialTransparencySolved: false, referentialTransparencySolvable: false }).
    filter(function (n) {
      return graph.
      matchUndirectedEdges({ type: 'InteractionOperand', from: { node: n } }).
      filter(function (x) {return x.from.index > 0;})
      // .tap(x=>{console.log("xxxx");console.log(_.map(x,y=>(y.from.index+ " " +y.to.node.id +" "+y.to.node.content.operator+ " "+y.to.node.referentialTransparencySolved)))})
      .every(function (x) {return x.to.node.referentialTransparencySolved === true;});}).
    forEach(function (n) {n.referentialTransparencySolvable = true;}).
    commit();

  });
}