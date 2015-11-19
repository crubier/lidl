"use strict"

let _ = require('lodash');

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  matchNodes(obj){
    return _.filter(_.filter(this.nodes,this.nodeIsNotFinished),obj);
  }

  matchDirectedEdges(obj){
    return _.filter(_.filter(this.edges,this.edgeIsNotFinished),obj);
  }

  matchUndirectedEdges(obj){
    return _.union(
      this.matchDirectedEdges(obj),
      _.map(this.matchDirectedEdges(this.inverse(obj)), this.inverse)
      );
  }

  addNode(type, data,ports) {
    var res = {
      type: type,
      id: _.uniqueId('node_' + type),
      content: data,
      ports:ports,
      finished: false
    };
    this.nodes.push(res);
    return res;
  }

  addEdge(type, data, nodeA, nodeB, indexA, indexB) {
    var res = {
      type: type,
      id: _.uniqueId('edge_' + type),
      finished: false,
      content:data,
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

  inverse(edge) {
    if(edge ===undefined || edge ===null) return ;
    var res = _.clone(edge);
    var _from = res.from;
    var _to = res.to;
    res.from = _to;
    res.to = _from;
    if(res.from ===undefined) delete res.from;
    if(res.to ===undefined) delete res.to;
    return res;
  }

  clean() {
    _.remove(this.edges,edgeIsFinished);
    _.remove(this.nodes,nodeIsFinished);
  }

  finish(x){
    x.finished=true;
    return x;
  }

  nodeIsFinished(n) {
    return n.finished ===true;
  }

  nodeIsNotFinished(n) {
    return n.finished !==true;
  }

  edgeIsFinished(e) {
    return e.finished===true || e.to.node.finished===true || e.from.node.finished===true;
  }

  edgeIsNotFinished(e) {
    return e.finished!==true & e.to.node.finished!==true && e.from.node.finished!==true;
  }


}

module.exports = Graph;
