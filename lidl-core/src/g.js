"use strict";

import _ from 'lodash'

import {
  serialize
}
from './serializer'


class Graph {


  ///////////////////////////////////////////////////////////////////////////////
  constructor(nodes, edges) {
    this.nodes = nodes === undefined ? [] : nodes;
    this.edges = edges === undefined ? [] : edges;
    this.nodeTypeIndex = nodes === undefined ? {} : _(nodes).groupBy('type').value();
    this.edgeTypeIndex = edges === undefined ? {} : _(edges).groupBy('type').value();
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph

  addNode(node) {
    var res = _.assign(_.omit(_.omit(_.clone(node), 'id'), 'finished'), {
      id: _.uniqueId('node_'),
      finished: false,
      incomingEdges: [],
      outgoingEdges: [],
      incomingEdgeTypeIndex: {},
      outgoingEdgeTypeIndex: {}
    });
    if (res.type === undefined || res.type === null) res.type = "";
    // Update graph index
    this.nodes.push(res);
    if (this.nodeTypeIndex[res.type] === undefined) this.nodeTypeIndex[res.type] = [];
    this.nodeTypeIndex[res.type].push(res);
    return res;
  }

  addEdge(edge) {
    var res = _.assign(_.omit(_.omit(_.clone(edge), 'id'), 'finished'), {
      id: _.uniqueId('edge_'),
      finished: false
    });
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
    return res;
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in parallel"
  // Match all unfinished nodes that comply to a pattern
  matchNodes(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) {
        return _(this.nodes).filter(this.nodeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) {
        return _(this.nodeTypeIndex[pattern.type]).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      } else {
        return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      }
    }
    // Match all unfinished edges that comply to a pattern
  matchDirectedEdges(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) { // No pattern, we return all edges of the graph
        return _(this.edges).filter(this.edgeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) { // We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else if (pattern.to.node.incomingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) { // The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else {
          return _(this.edgeTypeIndex[pattern.type])
            .filter(this.edgeIsNotFinished.bind(this))
            .filter(pattern);
        }
      } else { // We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else if (pattern.to.node.incomingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .filter(pattern);
          }
        } else {
          return _(this.edges)
            .filter(this.edgeIsNotFinished.bind(this))
            .filter(pattern);
        }
      }
    }
    // Match all unfinished edges and their opposite that comply to a pattern
  matchUndirectedEdges(pattern) {
    return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).unique("id");
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in series"
  // Find a node that comply to a pattern
  findNode(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) {
        return _(this.nodes)
          .filter(this.nodeIsNotFinished.bind(this))
          .first();
      } else if (pattern.type !== undefined) {
        return _(this.nodeTypeIndex[pattern.type])
          .filter(this.nodeIsNotFinished.bind(this))
          .find(pattern);
      } else {
        return _(this.nodes)
          .filter(this.nodeIsNotFinished.bind(this))
          .find(pattern);
      }

    }
    // Find an edge that comply to a pattern
  findDirectedEdge(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) { // No pattern, we return all edges of the graph
        return _(this.edges).find(this.edgeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) { // We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else if (pattern.to.node.incomingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) { // The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else { // The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return _(this.edgeTypeIndex[pattern.type])
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else {
          return _(this.edgeTypeIndex[pattern.type])
            .filter(this.edgeIsNotFinished.bind(this))
            .find(pattern);
        }
      } else { // We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else if (pattern.to.node.incomingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.from.node.outgoingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) { // The node is an actual graph node with indexes and stuff
            return _(pattern.to.node.incomingEdges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          } else {
            return _(this.edges)
              .filter(this.edgeIsNotFinished.bind(this))
              .find(pattern);
          }
        } else {
          return _(this.edges)
            .filter(this.edgeIsNotFinished.bind(this))
            .find(pattern);
        }
      }
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
    return e.finished === true || this.nodeIsFinished(e.to.node) || this.nodeIsFinished(e.from.node);
  }

  edgeIsNotFinished(e) {
    return !(this.edgeIsFinished(e));
  }






  toDotWithParamaters(def) {
    var nodeDefaults = {
      shape: 'ellipse',
      style: 'filled',
      color: '#b0b0b0',
      fontname: "Times",
      label: 'Node'
    };
    var edgeDefaults = {
      arrowsize: 1,
      arrowHead: 'normal',
      color: '#333333',
      fontname: "Times-Italic",
      label: 'Edge',
      headlabel: '',
      taillabel: ''
    };

    var nodeTemplate = _.template('<%=id%> [shape="<%=shape%>", style="<%=style%>", color="<%=color%>", fontname="<%=fontname%>", label="<%=label%>" ]\n');
    var directedEdgeTemplate = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');
    var undirectedEdgeTemplate = _.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');


    var that = this;

    var res = "digraph g{";

    _(def.nodes)
      .forEach((desc, key) => {
        that
          .matchNodes({
            type: key
          })
          .map(x => _.assign(_.clone(nodeDefaults), {
            id: x.id,
            color: desc.color
          }, desc.transform(x)))
          .forEach((x) => {
            res += nodeTemplate(x);
          })
          .commit();
      })
      .commit();

    _(def.directedEdges)
      .forEach((desc, key) => {
        that
          .matchDirectedEdges({
            type: key
          })
          .map(x => _.assign(_.clone(edgeDefaults), {
            id: x.id,
            color: desc.color,
            from: x.from,
            to: x.to
          }, desc.transform(x)))
          .forEach((x) => {
            res += directedEdgeTemplate(x);
          })
          .commit();
      })
      .commit();

    _(def.undirectedEdges)
      .forEach((desc, key) => {
        that
          .matchUndirectedEdges({
            type: key
          })
          .map(x => _.assign(_.clone(edgeDefaults), {
            id: x.id,
            color: desc.color,
            from: x.from,
            to: x.to
          }, desc.transform(x)))
          .forEach((x) => {
            res += undirectedEdgeTemplate(x);
          })
          .commit();
      })
      .commit();

    res += ('}');
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Export graph into the dot format to visualise them
  toDot() {
    return this.toDotWithParamaters({
      nodes: {
        Interaction: {
          color: "#ffd1d1",
          transform: (x) => ({
            label: (x.content.operatorType + '\n' + x.content.operator.replace(/"/g,""))
          })
        },
        InteractionInstance: {
          color: "#ffed8e",
          transform: (x) => ({
            shape: (x.content.type === 'InteractionSimple') ? "ellipse" : 'box',
            color: (x.content.type === 'InteractionSimple') ? "#ffde2f" : "#dff1f2",
            fontname: (x.content.type === 'InteractionSimple') ? 'Times' : 'Courier',
            label: x.id + '\n' + ((x.content.type === 'InteractionSimple') ? (x.content.operatorType + '\n' + x.content.operator.replace(/"/g,"")) : (x.content.content.replace(/"/g,""))) + "\n" + ((x.ports).map((x, i) => (i + ": " + serialize(x))).join('\n'))
          })
        },
        InteractionDefinition: {
          color: "#afe7ff",
          transform: (x) => ({
            label: x.content.signature.operator
          })
        },
        InterfaceDefinition: {
          color: "#afffe4",
          transform: (x) => ({
            label: x.content.signature
          })
        },
        InteractionSignatureOperandElement: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.content.name
          })
        },
        Interface: {
          color: "#2fcdff",
          transform: (x) => ({
            label: (x.content.type === 'InterfaceAtomic') ? (x.name + ' : ' + serialize(x.content)) : (x.name)
          })
        }
      },
      directedEdges: {
        DefinitionSubInteractionInstance: {
          color: "#ffd3b3",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionInteractionInstance: {
          color: "#ff6b00",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionInstanceIsOperandOf: {
          color: "#00ff03",
          transform: (x) => ({
            label: x.to.index
          })
        },
        InteractionInstanceInteraction: {
          color: "#ffa800",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionOperand: {
          color: "#d00000",
          transform: (x) => ({
            label: x.from.index
          })
        },
        DefinitionInteraction: {
          color: "#ff0000",
          transform: (x) => ({
            label: x.from.index
          })
        },
        DefinitionSubInteraction: {
          color: "#ffd5d5",
          transform: (x) => ({
            label: ""
          })
        },
        SignatureOperand: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InteractionSignatureOperandElementInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionSubInterface: {
          color: "#bef9ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceElement: {
          color: "#008cff",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InterfaceInteractionInstance: {
          color: "#e300ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionDefinition: {
          color: "#81ddff",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InteractionDefinition: {
          color: "#e681ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceDefinition: {
          color: "#2bff00",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionDefinitionDependency: {
          color: "#0040ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceDefinitionDependency: {
                  color: "#b5ff00",
                  transform: (x) => ({
                    label: ""
                  })
                },
        InteractionInstanceDataDependency: {
          color: "#ddd2ff",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionInstanceOrdering: {
          color: "#cc00ff",
          transform: (x) => ({
            label: x.executionOrder
          })
        }
      },
      undirectedEdges: {
        InteractionInstanceOperand: {
          color: "#9d8400",
          transform: (x) => ({
            label: x.id,
            headlabel: x.to.index + (_.isUndefined(x.to.ports) ? '' : (': ' + serialize(x.to.ports))) + (_.isUndefined(x.to.compositionElementName) ? '' : (': ' + x.to.compositionElementName)),
            taillabel: x.from.index + (_.isUndefined(x.from.ports) ? '' : (': ' + serialize(x.from.ports))) + (_.isUndefined(x.from.compositionElementName) ? '' : (': ' + x.from.compositionElementName))
          })
        },
      }
    });
  }

  toDot2() {
    return this.toDotWithParamaters({
      nodes: {
        port: {
          color: "#94ff87",
          transform: (x) => ({
            label: x.ports.compositionElementName + '\n' + x.node.content.operator + x.node.content.content
          })
        },
        coPort: {
          color: "#dce7f9",
          transform: (x) => ({
            label: x.ports.coCompositionElementName + '\n' + x.node.content.operator + x.node.content.content
          })
        },

      },
      directedEdges: {
        normal: {
          color: "#000000",
          transform: (x) => ({
            label: ""
          })
        },
        loop: {
          color: "#ff0000",
          transform: (x) => ({
            label: ""
          })
        },
        closure: {
          color: "#c79999",
          transform: (x) => ({
            label: ""
          })
        },
      },
      undirectedEdges: {}
    });
  }

}

module.exports = Graph;
