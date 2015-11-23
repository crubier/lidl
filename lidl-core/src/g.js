"use strict";

let _ = require('lodash');

class Graph {


  ///////////////////////////////////////////////////////////////////////////////
  constructor() {
    this.nodes = [];
    this.edges = [];
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph

  addNode(node) {
    var res = _.assign({
      id: _.uniqueId('node_'),
      finished: false
    }, node);
    this.nodes.push(res);
    return res;
  }

  addEdge(edge) {
    var res = _.assign({
      id: _.uniqueId('edge_'),
      finished: false
    }, edge);
    this.edges.push(res);
    return res;
  }

  oldAddNode(type, data, ports) {
    var res = {
      type: type,
      id: _.uniqueId(type + '_'),
      content: data,
      ports: ports,
      finished: false
    };
    this.nodes.push(res);
    return res;
  }

  oldaddEdge(type, data, nodeA, nodeB, indexA, indexB) {
    var res = {
      type: type,
      id: _.uniqueId(type + '_'),
      finished: false,
      content: data,
      from: {
        node: nodeA,
        index: indexA
      },
      to: {
        node: nodeB,
        index: indexB
      }
    }
    this.edges.push(res);
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in parallel"
  // Match all unfinished nodes that comply to a pattern
  matchNodes(pattern) {
      return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
    }
    // Match all unfinished edges that comply to a pattern
  matchDirectedEdges(pattern) {
      return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).filter(pattern);
    }
    // Match all unfinished edges and their opposite that comply to a pattern
  matchUndirectedEdges(pattern) {
    return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).unique("id");
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in series"
  // Find a node that comply to a pattern
  findNode(pattern) {
      return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).find(pattern);
    }
    // Find an edge that comply to a pattern
  findDirectedEdge(pattern) {
      return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).find(pattern);
    }
    // Find an edge or its opposite that comply to a pattern
  findUndirectedEdge(pattern) {
    var res = this.findDirectedEdge(pattern);
    if (!_.isUndefined(res)) return res;
    return this.inverse(this.findDirectedEdge(this.inverse(pattern)));
  }


  // Maps on those.
  // Note that the functions need to mutate the graph
  // otherwise the call will loop forever
  reduceNodes(pattern, iteratee, accumulator, thisArg) {
    var current = this.findNode(pattern);
    var result = (accumulator === undefined) ? [] : accumulator;
    var boundIteratee = _.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findNode(pattern);
    }
    return _(result);
  }
  reduceDirectedEdges(pattern, iteratee, accumulator, thisArg) {
    var current = this.findDirectedEdge(pattern);
    var result = (accumulator === undefined) ? [] : accumulator;
    var boundIteratee = _.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findDirectedEdge(pattern);
    }
    return _(result);
  }
  reduceUndirectedEdges(pattern, iteratee, accumulator, thisArg) {
    var current = this.findUndirectedEdge(pattern);
    var result = (accumulator === undefined) ? [] : accumulator;
    var boundIteratee = _.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findUndirectedEdge(pattern);
    }
    return _(result);
  }





  ///////////////////////////////////////////////////////////////////////////////
  // Get the inverse of an edge without mutating it
  inverse(edge) {
    if (_.isUndefined(edge) || _.isNull(edge)) return;
    let res = _.clone(edge);
    let _from = res.from;
    let _to = res.to;
    res.from = _to;
    res.to = _from;
    if (_.isUndefined(res.from)) delete res.from;
    if (_.isUndefined(res.to)) delete res.to;
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Remove finished elements from the graph
  clean() {
    _.remove(this.edges, this.edgeIsFinished.bind(this));
    _.remove(this.nodes, this.nodeIsFinished.bind(this));
  }

  // finish a node or an edge
  finish(x) {
    x.finished = true;
    return x;
  }

  // Check if a node is finished
  nodeIsFinished(n) {
    return n.finished === true;
  }

  nodeIsNotFinished(n) {
    return !(this.nodeIsFinished(n));
  }

  // Check if an edge is finished
  edgeIsFinished(e) {
    return e.finished === true || e.to.node.finished === true || e.from.node.finished === true;
  }

  edgeIsNotFinished(e) {
    return !(this.edgeIsFinished(e));
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Export graph into the dot format to visualise them
  toDot() {
    let nodeTemplate = _.template('');
    var res = "digraph g{";

    var nodeTemplate1 = _.template('<%=id%> [shape=ellipse, style=filled, color="0.0 0.1 1.0", label="<%=id%>\n<%=content.operatorType%>\n<%=content.operator%>" ]\n');

    this.matchNodes({
      type: 'ast',
      content: {
        type: 'InteractionSimple'
      }
    }).forEach((x) => (res += nodeTemplate1(x))).commit();


    var nodeTemplate2 = _.template('<%=id%> [shape=box, style=filled, color="0.66 0.1 1.0", fontname="Courier", label="<%=id%>\n<%=executionOrder%>\n<%=content.content%>" ]\n');

    this.matchNodes({
      type: 'ast',
      content: {
        type: 'InteractionNative'
      }
    }).forEach((x) => (res += nodeTemplate2(x))).commit();


    var edgeTemplate1 = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="Times-Italic", label="<%=id%>",  headlabel="<%=to.index%>", taillabel="<%=from.index%>" ]\n');

    this.matchUndirectedEdges({
      type: 'ast'
    })
    // .map((x) => _.assign(x,{flabel:(x.from.compositionElementName )? (x.from.index + " " + x.from.compositionElementName) :  ("no"+x.from.index) ,tlabel:(x.to.compositionElementName) ? (x.to.index + " " + x.to.compositionElementName) : ("no"+x.to.index)}))
    .forEach((x) => (res += edgeTemplate1(x))).commit();


    var edgeTemplate2 = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="Times-Italic", arrowsize=2, color="0.83 1.0 1.0", label="<%=id%>", headlabel="<%=to.index%>", taillabel="<%=from.index%>" ]\n');

    this.matchDirectedEdges({
      type: 'dataflow'
    }).forEach((x) => (res += edgeTemplate2(x))).commit();


    res += ('}');
    return res;
  }

}

module.exports = Graph;
