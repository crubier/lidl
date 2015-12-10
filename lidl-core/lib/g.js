"use strict";var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var _ = require('lodash');var 




Graph = (function () {


  ///////////////////////////////////////////////////////////////////////////////
  function Graph(nodes, edges) {_classCallCheck(this, Graph);
    this.nodes = nodes === undefined ? [] : nodes;
    this.edges = edges === undefined ? [] : edges;
    this.nodeTypeIndex = nodes === undefined ? {} : _(nodes).groupBy('type').value();
    this.edgeTypeIndex = edges === undefined ? {} : _(edges).groupBy('type').value();}



  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph
  _createClass(Graph, [{ key: 'addNode', value: function addNode(
    node) {
      var res = _.assign(_.omit(_.omit(_.clone(node), 'id'), 'finished'), { 
        id: _.uniqueId('node_'), 
        finished: false, 
        incomingEdges: [], 
        outgoingEdges: [], 
        incomingEdgeTypeIndex: {}, 
        outgoingEdgeTypeIndex: {} });

      if (res.type === undefined || res.type === null) res.type = "";
      // Update graph index
      this.nodes.push(res);
      if (this.nodeTypeIndex[res.type] === undefined) this.nodeTypeIndex[res.type] = [];
      this.nodeTypeIndex[res.type].push(res);
      return res;} }, { key: 'addEdge', value: function addEdge(


    edge) {
      var res = _.assign(_.omit(_.omit(_.clone(edge), 'id'), 'finished'), { 
        id: _.uniqueId('edge_'), 
        finished: false });

      if (res.type === undefined || res.type === null) res.type = "";
      // Update graph index
      this.edges.push(res);
      if (this.edgeTypeIndex[res.type] === undefined) this.edgeTypeIndex[res.type] = [];
      this.edgeTypeIndex[res.type].push(res);
      // Update index of nodes at each end
      // If the index for this type does not exist we create it
      res.from.node.outgoingEdges.push(res);
      if (res.from.node.outgoingEdgeTypeIndex[res.type] === undefined) res.from.node.outgoingEdgeTypeIndex[res.type] = [];
      res.from.node.outgoingEdgeTypeIndex[res.type].push(res);
      // If the index for this type does not exist we create it
      res.to.node.incomingEdges.push(res);
      if (res.to.node.incomingEdgeTypeIndex[res.type] === undefined) res.to.node.incomingEdgeTypeIndex[res.type] = [];
      res.to.node.incomingEdgeTypeIndex[res.type].push(res);
      return res;}



    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in parallel"
    // Match all unfinished nodes that comply to a pattern
  }, { key: 'matchNodes', value: function matchNodes(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) {
        return _(this.nodes).filter(this.nodeIsNotFinished.bind(this));} else 
      if (pattern.type !== undefined) {
        return _(this.nodeTypeIndex[pattern.type]).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);} else 
      {
        return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);}}


    // Match all unfinished edges that comply to a pattern
  }, { key: 'matchDirectedEdges', value: function matchDirectedEdges(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) {// No pattern, we return all edges of the graph
        return _(this.edges).filter(this.edgeIsNotFinished.bind(this));} else 
      if (pattern.type !== undefined) {// We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        if (pattern.from !== undefined && pattern.from.node !== undefined) {// The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        {
          return _(this.edgeTypeIndex[pattern.type]).
          filter(this.edgeIsNotFinished.bind(this)).
          filter(pattern);}} else 

      {// We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);}} else 

        {
          return _(this.edges).
          filter(this.edgeIsNotFinished.bind(this)).
          filter(pattern);}}}



    // Match all unfinished edges and their opposite that comply to a pattern
  }, { key: 'matchUndirectedEdges', value: function matchUndirectedEdges(pattern) {
      return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).unique("id");}



    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in series"
    // Find a node that comply to a pattern
  }, { key: 'findNode', value: function findNode(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) {
        return _(this.nodes).
        filter(this.nodeIsNotFinished.bind(this)).
        first();} else 
      if (pattern.type !== undefined) {
        return _(this.nodeTypeIndex[pattern.type]).
        filter(this.nodeIsNotFinished.bind(this)).
        find(pattern);} else 
      {
        return _(this.nodes).
        filter(this.nodeIsNotFinished.bind(this)).
        find(pattern);}}



    // Find an edge that comply to a pattern
  }, { key: 'findDirectedEdge', value: function findDirectedEdge(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) {// No pattern, we return all edges of the graph
        return _(this.edges).find(this.edgeIsNotFinished.bind(this));} else 
      if (pattern.type !== undefined) {// We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        if (pattern.from !== undefined && pattern.from.node !== undefined) {// The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        {
          return _(this.edgeTypeIndex[pattern.type]).
          filter(this.edgeIsNotFinished.bind(this)).
          find(pattern);}} else 

      {// We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);} else 
          {
            return _(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);}} else 

        {
          return _(this.edges).
          filter(this.edgeIsNotFinished.bind(this)).
          find(pattern);}}}



    // Find an edge or its opposite that comply to a pattern
  }, { key: 'findUndirectedEdge', value: function findUndirectedEdge(pattern) {
      var res = this.findDirectedEdge(pattern);
      if (!_.isUndefined(res)) return res;
      return this.inverse(this.findDirectedEdge(this.inverse(pattern)));}



    // Maps on those.
    // Note that the functions need to mutate the graph
    // otherwise the call will loop forever
  }, { key: 'reduceNodes', value: function reduceNodes(pattern, iteratee, accumulator, thisArg) {
      var current = this.findNode(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findNode(pattern);}

      return _(result);} }, { key: 'reduceDirectedEdges', value: function reduceDirectedEdges(

    pattern, iteratee, accumulator, thisArg) {
      var current = this.findDirectedEdge(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findDirectedEdge(pattern);}

      return _(result);} }, { key: 'reduceUndirectedEdges', value: function reduceUndirectedEdges(

    pattern, iteratee, accumulator, thisArg) {
      var current = this.findUndirectedEdge(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findUndirectedEdge(pattern);}

      return _(result);}


    ///////////////////////////////////////////////////////////////////////////////
    // Get the inverse of an edge without mutating it
  }, { key: 'inverse', value: function inverse(edge) {
      if (_.isUndefined(edge) || _.isNull(edge)) return;
      var res = _.clone(edge);
      var _from = res.from;
      var _to = res.to;
      res.from = _to;
      res.to = _from;
      if (_.isUndefined(res.from)) delete res.from;
      if (_.isUndefined(res.to)) delete res.to;
      return res;}


    ///////////////////////////////////////////////////////////////////////////////
    // Remove finished elements from the graph
  }, { key: 'clean', value: function clean() {
      _.remove(this.edges, this.edgeIsFinished.bind(this));
      _.remove(this.nodes, this.nodeIsFinished.bind(this));}


    // finish a node or an edge
  }, { key: 'finish', value: function finish(x) {
      x.finished = true;
      return x;}


    // Check if a node is finished
  }, { key: 'nodeIsFinished', value: function nodeIsFinished(n) {
      return n.finished === true;} }, { key: 'nodeIsNotFinished', value: function nodeIsNotFinished(


    n) {
      return !this.nodeIsFinished(n);}


    // Check if an edge is finished
  }, { key: 'edgeIsFinished', value: function edgeIsFinished(e) {
      return e.finished === true || this.nodeIsFinished(e.to.node) || this.nodeIsFinished(e.from.node);} }, { key: 'edgeIsNotFinished', value: function edgeIsNotFinished(


    e) {
      return !this.edgeIsFinished(e);}

























    ///////////////////////////////////////////////////////////////////////////////
    // Export graph into the dot format to visualise them
    //TODO use toDotWithParamaters
  }, { key: 'toDotGeneric', value: function toDotGeneric() {
      var res = "digraph g{";

      var nodeTemplate = _.template('<%=id%> [shape=box, style=filled, color="0.66 0.1 1.0", fontname="Courier", label="<%=label%>" ]\n');

      this.
      matchNodes().
      map(function (x) {return { 
          id: x.id, 
          label: JSON.stringify(_.assign(x, { 
            content: { 
              operator: x.content.operator } })).

          replace(/\"/g, ' ') };}).

      forEach(function (x) {return res += nodeTemplate(x);}).
      commit();

      var edgeTemplate = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="Times-Italic", arrowsize=2, color="0.83 1.0 1.0", label="<%=id%>", headlabel="<%=to.index%>", taillabel="<%=from.index%>" ]\n');

      this.
      matchDirectedEdges().
      forEach(function (x) {return res += edgeTemplate(x);}).
      commit();


      res += '}';
      return res;} }, { key: 'toDotWithParamaters', value: function toDotWithParamaters(


    def) {
      var nodeDefaults = { shape: 'ellipse', style: 'filled', color: '#b0b0b0', fontname: "Times", label: 'Node' };
      var edgeDefaults = { arrowsize: 1, arrowHead: 'normal', color: '#333333', fontname: "Times-Italic", label: 'Edge', headlabel: '', taillabel: '' };

      var nodeTemplate = _.template('<%=id%> [shape="<%=shape%>", style="<%=style%>", color="<%=color%>", fontname="<%=fontname%>", label="<%=label%>" ]\n');
      var directedEdgeTemplate = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');
      var undirectedEdgeTemplate = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');


      var that = this;

      var res = "digraph g{";

      _(def.nodes).
      forEach(function (desc, key) {
        that.
        matchNodes({ type: key }).
        map(function (x) {return _.assign(_.clone(nodeDefaults), { id: x.id, color: desc.color }, desc.transform(x));}).
        forEach(function (x) {res += nodeTemplate(x);}).
        commit();}).

      commit();

      _(def.directedEdges).
      forEach(function (desc, key) {
        that.
        matchDirectedEdges({ type: key }).
        map(function (x) {return _.assign(_.clone(edgeDefaults), { id: x.id, color: desc.color, from: x.from, to: x.to }, desc.transform(x));}).
        forEach(function (x) {res += directedEdgeTemplate(x);}).
        commit();}).

      commit();

      _(def.undirectedEdges).
      forEach(function (desc, key) {
        that.
        matchUndirectedEdges({ type: key }).
        map(function (x) {return _.assign(_.clone(edgeDefaults), { id: x.id, color: desc.color, from: x.from, to: x.to }, desc.transform(x));}).
        forEach(function (x) {res += undirectedEdgeTemplate(x);}).
        commit();}).

      commit();

      res += '}';
      return res;}


    ///////////////////////////////////////////////////////////////////////////////
    // Export graph into the dot format to visualise them
  }, { key: 'toDotDef', value: function toDotDef() {
      return this.toDotWithParamaters({ 
        nodes: { 
          Interaction: { color: "#ffd1d1", transform: function transform(x) {return { label: x.content.operator };} }, 
          InteractionInstance: { color: "#ffed8e", transform: function transform(x) {return { shape: x.content.type === 'InteractionSimple' ? "ellipse" : 'box', color: x.content.type === 'InteractionSimple' ? "#ffde2f" : "#dff1f2", fontname: x.content.type === 'InteractionSimple' ? 'Times' : 'Courier', label: x.content.type === 'InteractionSimple' ? x.content.operator : x.content.content };} }, 
          Definition: { color: "#afe7ff", transform: function transform(x) {return { label: x.content.signature.operator };} }, 
          SignatureOperandElement: { color: "#2fffc7", transform: function transform(x) {return { label: x.content.name };} }, 
          Interface: { color: "#2fcdff", transform: function transform(x) {return { label: x.content.type === 'InterfaceAtomic' ? x.name + ' : ' + x.content.direction : x.name };} } }, 

        directedEdges: { 
          DefinitionSubInteractionInstance: { color: "#ffd3b3", transform: function transform(x) {return { label: "" };} }, 
          DefinitionInteractionInstance: { color: "#ff6b00", transform: function transform(x) {return { label: "" };} }, 
          InteractionInstanceIsOperandOf: { color: "#00ff03", transform: function transform(x) {return { label: x.to.index };} }, 
          InteractionInstanceInteraction: { color: "#ffa800", transform: function transform(x) {return { label: "" };} }, 
          InteractionOperand: { color: "#d00000", transform: function transform(x) {return { label: x.from.index };} }, 
          DefinitionInteraction: { color: "#ff0000", transform: function transform(x) {return { label: x.from.index };} }, 
          DefinitionSubInteraction: { color: "#ffd5d5", transform: function transform(x) {return { label: "" };} }, 
          SignatureOperand: { color: "#2fffc7", transform: function transform(x) {return { label: x.from.index };} }, 
          SignatureOperandElementInterface: { color: "#00e8ff", transform: function transform(x) {return { label: "" };} }, 
          DefinitionInterface: { color: "#00e8ff", transform: function transform(x) {return { label: "" };} }, 
          DefinitionSubInterface: { color: "#bef9ff", transform: function transform(x) {return { label: "" };} }, 
          InterfaceElement: { color: "#008cff", transform: function transform(x) {return { label: x.from.index };} }, 
          InterfaceInteractionInstance: { color: "#e300ff", transform: function transform(x) {return { label: "" };} }, 
          DefinitionDefinition: { color: "#81ddff", transform: function transform(x) {return { label: x.from.index };} }, 
          InteractionDefinition: { color: "#e681ff", transform: function transform(x) {return { label: "" };} }, 
          DefinitionDependency: { color: "#0040ff", transform: function transform(x) {return { label: "" };} }, 
          InteractionInstanceDataDependency: { color: "#ddd2ff", transform: function transform(x) {return { label: "" };} }, 
          InteractionInstanceOrdering: { color: "#cc00ff", transform: function transform(x) {return { label: x.executionOrder };} } }, 

        undirectedEdges: { 
          InteractionInstanceOperand: { color: "#9d8400", transform: function transform(x) {return { label: "", headlabel: x.to.index + (_.isUndefined(x.to.ports) ? '' : ': ' + x.to.ports) + (_.isUndefined(x.to.compositionElementName) ? '' : ': ' + x.to.compositionElementName), taillabel: x.from.index + (_.isUndefined(x.from.ports) ? '' : ': ' + x.from.ports) + (_.isUndefined(x.from.compositionElementName) ? '' : ': ' + x.from.compositionElementName) };} } } });}




    ///////////////////////////////////////////////////////////////////////////////
    // Export graph into the dot format to visualise them
    //TODO use toDotWithParamaters
  }, { key: 'toDot', value: function toDot() {
      var nodeTemplate = _.template('');
      var res = "digraph g{";

      var nodeTemplate1 = _.template('<%=id%> [shape=ellipse, style=filled, color="#ffd1d1", label="<%=id%>\n<%=content.operatorType%>\n<%=content.operator%>" ]\n');

      this.matchNodes({ 
        type: 'ast', 
        content: { 
          type: 'InteractionSimple' } }).

      forEach(function (x) {return res += nodeTemplate1(x);}).commit();


      var nodeTemplate2 = _.template('<%=id%> [shape=box, style=filled, color="#d1f1ff", fontname="Courier", label="<%=id%>\n<%=executionOrder%>\n<%=content.content%>" ]\n');

      this.matchNodes({ 
        type: 'ast', 
        content: { 
          type: 'InteractionNative' } }).

      map(function (x) {return _.assign(_.clone(x), { 
          executionOrder: 0 });}).
      forEach(function (x) {return res += nodeTemplate2(x);}).commit();


      var edgeTemplate1 = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="Times-Italic", label="<%=id%>",  headlabel="<%=to.label%>", taillabel="<%=from.label%>" ]\n');

      this.matchUndirectedEdges({ 
        type: 'ast' })

      // .map((x) => _.assign(x,{flabel:(x.from.compositionElementName )? (x.from.index + " " + x.from.compositionElementName) :  ("no"+x.from.index) ,tlabel:(x.to.compositionElementName) ? (x.to.index + " " + x.to.compositionElementName) : ("no"+x.to.index)}))
      .map(function (x) {
        var res = _.clone(x);
        res.to = _.clone(res.to);
        // console.log(JSON.stringify(res.to.compositionElementName));
        if (_.isUndefined(res.to.compositionElementName)) {
          if (_.isUndefined(res.to.coCompositionElementName)) {
            res.to.label = "" + res.to.index;} else 
          {
            res.to.label = "co-" + res.to.coCompositionElementName;}} else 

        {
          res.to.label = "di-" + res.to.compositionElementName;}

        res.from = _.clone(res.from);
        if (_.isUndefined(res.from.compositionElementName)) {
          if (_.isUndefined(res.from.coCompositionElementName)) {
            res.from.label = "" + res.from.index;} else 
          {
            res.from.label = "co-" + res.from.coCompositionElementName;}} else 

        {
          res.from.label = "di-" + res.from.compositionElementName;}

        // console.log(res.from.label + "  "+res.to.label);
        return res;}).

      forEach(function (x) {return res += edgeTemplate1(x);}).commit();


      var edgeTemplate2 = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="Times-Italic", arrowsize=2, color="#ff0000", label="<%=id%>", headlabel="<%=to.index%>", taillabel="<%=from.index%>" ]\n');

      this.matchDirectedEdges({ 
        type: 'dataflow' }).
      forEach(function (x) {return res += edgeTemplate2(x);}).commit();


      res += '}';
      return res;}


    //TODO use toDotWithParamaters
  }, { key: 'toInternalDot', value: function toInternalDot() {
      var nodeTemplate = _.template('');
      var res = "digraph g{";

      var nodeTemplate1 = _.template('<%=id%> [shape=ellipse, style=filled, color="#ffd1d1", label="<%=id%>\n<%=label%>" ]\n');

      this.
      matchNodes().
      map(function (x) {
        var res = _.clone(x);
        // console.log('-----*****--------------');
        // console.log(x.port);
        // x.port = _.clone(x.port);
        // console.log(JSON.stringify(res.to.compositionElementName));
        if (_.isUndefined(x.port.compositionElementName)) {
          if (_.isUndefined(x.port.coCompositionElementName)) {
            res.label = "" + x.port.index;} else 
          {
            res.label = "co-" + x.port.coCompositionElementName;}} else 

        {
          res.label = "di-" + x.port.compositionElementName;}

        return res;}).

      forEach(function (x) {return res += nodeTemplate1(x);}).commit();


      var edgeTemplate1 = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="Times-Italic", label="<%=type%>" ]\n');

      this.matchUndirectedEdges().

      forEach(function (x) {return res += edgeTemplate1(x);}).commit();


      res += '}';
      return res;} }]);return Graph;})();




module.exports = Graph;