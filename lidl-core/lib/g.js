"use strict";var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var _ = require('lodash');var 

Graph = (function () {


  ///////////////////////////////////////////////////////////////////////////////
  function Graph(nodes, edges) {_classCallCheck(this, Graph);
    this.nodes = nodes === undefined ? [] : nodes;
    this.edges = edges === undefined ? [] : edges;}



  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph
  _createClass(Graph, [{ key: 'addNode', value: function addNode(
    node) {
      var res = _.assign(_.omit(_.omit(_.clone(node), 'id'), 'finished'), { 
        id: _.uniqueId('node_'), 
        finished: false });

      this.nodes.push(res);
      return res;} }, { key: 'addEdge', value: function addEdge(


    edge) {
      var res = _.assign(_.omit(_.omit(_.clone(edge), 'id'), 'finished'), { 
        id: _.uniqueId('edge_'), 
        finished: false });

      this.edges.push(res);
      return res;} }, { key: 'oldAddNode', value: function oldAddNode(


    type, data, ports) {
      var res = { 
        type: type, 
        id: _.uniqueId(type + '_'), 
        content: data, 
        ports: ports, 
        finished: false };

      this.nodes.push(res);
      return res;} }, { key: 'oldaddEdge', value: function oldaddEdge(


    type, data, nodeA, nodeB, indexA, indexB) {
      var res = { 
        type: type, 
        id: _.uniqueId(type + '_'), 
        finished: false, 
        content: data, 
        from: { 
          node: nodeA, 
          index: indexA }, 

        to: { 
          node: nodeB, 
          index: indexB } };


      this.edges.push(res);
      return res;}


    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in parallel"
    // Match all unfinished nodes that comply to a pattern
  }, { key: 'matchNodes', value: function matchNodes(pattern) {
      return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);}

    // Match all unfinished edges that comply to a pattern
  }, { key: 'matchDirectedEdges', value: function matchDirectedEdges(pattern) {
      return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).filter(pattern);}

    // Match all unfinished edges and their opposite that comply to a pattern
  }, { key: 'matchUndirectedEdges', value: function matchUndirectedEdges(pattern) {
      return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).unique("id");}



    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in series"
    // Find a node that comply to a pattern
  }, { key: 'findNode', value: function findNode(pattern) {
      return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).find(pattern);}

    // Find an edge that comply to a pattern
  }, { key: 'findDirectedEdge', value: function findDirectedEdge(pattern) {
      return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).find(pattern);}

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
      return e.finished === true || e.to.node.finished === true || e.from.node.finished === true;} }, { key: 'edgeIsNotFinished', value: function edgeIsNotFinished(


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