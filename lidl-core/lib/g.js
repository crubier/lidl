"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);

var _serializer = require('./serializer');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var





Graph = function () {


  ///////////////////////////////////////////////////////////////////////////////
  function Graph(nodes, edges) {_classCallCheck(this, Graph);
    this.nodes = nodes === undefined ? [] : nodes;
    this.edges = edges === undefined ? [] : edges;
    this.nodeTypeIndex = nodes === undefined ? {} : (0, _lodash2.default)(nodes).groupBy('type').value();
    this.edgeTypeIndex = edges === undefined ? {} : (0, _lodash2.default)(edges).groupBy('type').value();
  }


  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph
  _createClass(Graph, [{ key: 'addNode', value: function addNode(
    node) {
      var res = _lodash2.default.assign(_lodash2.default.omit(_lodash2.default.omit(_lodash2.default.clone(node), 'id'), 'finished'), {
        id: _lodash2.default.uniqueId('node_'),
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
      return res;
    } }, { key: 'addEdge', value: function addEdge(

    edge) {
      var res = _lodash2.default.assign(_lodash2.default.omit(_lodash2.default.omit(_lodash2.default.clone(edge), 'id'), 'finished'), {
        id: _lodash2.default.uniqueId('edge_'),
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
      return res;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in parallel"
    // Match all unfinished nodes that comply to a pattern
  }, { key: 'matchNodes', value: function matchNodes(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) {
        return (0, _lodash2.default)(this.nodes).filter(this.nodeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) {
        return (0, _lodash2.default)(this.nodeTypeIndex[pattern.type]).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      } else {
        return (0, _lodash2.default)(this.nodes).filter(this.nodeIsNotFinished.bind(this)).filter(pattern);
      }
    }
    // Match all unfinished edges that comply to a pattern
  }, { key: 'matchDirectedEdges', value: function matchDirectedEdges(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).filter(pattern);
      if (pattern === undefined) {// No pattern, we return all edges of the graph
        return (0, _lodash2.default)(this.edges).filter(this.edgeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) {// We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {// The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else {
          return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
          filter(this.edgeIsNotFinished.bind(this)).
          filter(pattern);
        }
      } else {// We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            filter(pattern);
          }
        } else {
          return (0, _lodash2.default)(this.edges).
          filter(this.edgeIsNotFinished.bind(this)).
          filter(pattern);
        }
      }
    }
    // Match all unfinished edges and their opposite that comply to a pattern
  }, { key: 'matchUndirectedEdges', value: function matchUndirectedEdges(pattern) {
      return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).unique("id");
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Functions that match and do things "in series"
    // Find a node that comply to a pattern
  }, { key: 'findNode', value: function findNode(pattern) {
      // Naive: return _(this.nodes).filter(this.nodeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) {
        return (0, _lodash2.default)(this.nodes).
        filter(this.nodeIsNotFinished.bind(this)).
        first();
      } else if (pattern.type !== undefined) {
        return (0, _lodash2.default)(this.nodeTypeIndex[pattern.type]).
        filter(this.nodeIsNotFinished.bind(this)).
        find(pattern);
      } else {
        return (0, _lodash2.default)(this.nodes).
        filter(this.nodeIsNotFinished.bind(this)).
        find(pattern);
      }

    }
    // Find an edge that comply to a pattern
  }, { key: 'findDirectedEdge', value: function findDirectedEdge(pattern) {
      // Naive: return _(this.edges).filter(this.edgeIsNotFinished.bind(this)).find(pattern);
      if (pattern === undefined) {// No pattern, we return all edges of the graph
        return (0, _lodash2.default)(this.edges).find(this.edgeIsNotFinished.bind(this));
      } else if (pattern.type !== undefined) {// We have a pattern and it specifies a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {// The pattern specifies a source node
          if (pattern.from.node.outgoingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdgeTypeIndex !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {// The node is not an actual node but a pattern, it does not have indexes, but it has a type
            return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else {
          return (0, _lodash2.default)(this.edgeTypeIndex[pattern.type]).
          filter(this.edgeIsNotFinished.bind(this)).
          find(pattern);
        }
      } else {// We have a pattern but it does not specify a type of edge
        if (pattern.from !== undefined && pattern.to !== undefined && pattern.from.node !== undefined && pattern.to.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else if (pattern.from !== undefined && pattern.from.node !== undefined) {
          if (pattern.from.node.outgoingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.from.node.outgoingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else if (pattern.to !== undefined && pattern.to.node !== undefined) {
          if (pattern.to.node.incomingEdges !== undefined) {// The node is an actual graph node with indexes and stuff
            return (0, _lodash2.default)(pattern.to.node.incomingEdges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          } else {
            return (0, _lodash2.default)(this.edges).
            filter(this.edgeIsNotFinished.bind(this)).
            find(pattern);
          }
        } else {
          return (0, _lodash2.default)(this.edges).
          filter(this.edgeIsNotFinished.bind(this)).
          find(pattern);
        }
      }
    }
    // Find an edge or its opposite that comply to a pattern
  }, { key: 'findUndirectedEdge', value: function findUndirectedEdge(pattern) {
      var res = this.findDirectedEdge(pattern);
      if (!_lodash2.default.isUndefined(res)) return res;
      return this.inverse(this.findDirectedEdge(this.inverse(pattern)));
    }


    // Maps on those.
    // Note that the functions need to mutate the graph
    // otherwise the call will loop forever
  }, { key: 'reduceNodes', value: function reduceNodes(pattern, iteratee, accumulator, thisArg) {
      var current = this.findNode(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _lodash2.default.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findNode(pattern);
      }
      return (0, _lodash2.default)(result);
    } }, { key: 'reduceDirectedEdges', value: function reduceDirectedEdges(
    pattern, iteratee, accumulator, thisArg) {
      var current = this.findDirectedEdge(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _lodash2.default.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findDirectedEdge(pattern);
      }
      return (0, _lodash2.default)(result);
    } }, { key: 'reduceUndirectedEdges', value: function reduceUndirectedEdges(
    pattern, iteratee, accumulator, thisArg) {
      var current = this.findUndirectedEdge(pattern);
      var result = accumulator === undefined ? [] : accumulator;
      var boundIteratee = _lodash2.default.bind(iteratee, thisArg);
      var i = 0;
      while (current !== undefined) {
        result = boundIteratee(result, current, i);
        current = this.findUndirectedEdge(pattern);
      }
      return (0, _lodash2.default)(result);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Get the inverse of an edge without mutating it
  }, { key: 'inverse', value: function inverse(edge) {
      if (_lodash2.default.isUndefined(edge) || _lodash2.default.isNull(edge)) return;
      var res = _lodash2.default.clone(edge);
      var _from = res.from;
      var _to = res.to;
      res.from = _to;
      res.to = _from;
      if (_lodash2.default.isUndefined(res.from)) delete res.from;
      if (_lodash2.default.isUndefined(res.to)) delete res.to;
      return res;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Remove finished elements from the graph
  }, { key: 'clean', value: function clean() {
      _lodash2.default.remove(this.edges, this.edgeIsFinished.bind(this));
      _lodash2.default.remove(this.nodes, this.nodeIsFinished.bind(this));
    }

    // finish a node or an edge
  }, { key: 'finish', value: function finish(x) {
      x.finished = true;
      return x;
    }

    // Check if a node is finished
  }, { key: 'nodeIsFinished', value: function nodeIsFinished(n) {
      return n.finished === true;
    } }, { key: 'nodeIsNotFinished', value: function nodeIsNotFinished(

    n) {
      return !this.nodeIsFinished(n);
    }

    // Check if an edge is finished
  }, { key: 'edgeIsFinished', value: function edgeIsFinished(e) {
      return e.finished === true || this.nodeIsFinished(e.to.node) || this.nodeIsFinished(e.from.node);
    } }, { key: 'edgeIsNotFinished', value: function edgeIsNotFinished(

    e) {
      return !this.edgeIsFinished(e);
    } }, { key: 'toDotWithParamaters', value: function toDotWithParamaters(






    def) {
      var nodeDefaults = {
        shape: 'ellipse',
        style: 'filled',
        color: '#b0b0b0',
        fontname: "Times",
        label: 'Node' };

      var edgeDefaults = {
        arrowsize: 1,
        arrowHead: 'normal',
        color: '#333333',
        fontname: "Times-Italic",
        label: 'Edge',
        headlabel: '',
        taillabel: '' };


      var nodeTemplate = _lodash2.default.template('<%=id%> [shape="<%=shape%>", style="<%=style%>", color="<%=color%>", fontname="<%=fontname%>", label="<%=label%>" ]\n');
      var directedEdgeTemplate = _lodash2.default.template('<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');
      var undirectedEdgeTemplate = _lodash2.default.template('<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n');


      var that = this;

      var res = "digraph g{";

      (0, _lodash2.default)(def.nodes).
      forEach(function (desc, key) {
        that.
        matchNodes({
          type: key }).

        map(function (x) {return _lodash2.default.assign(_lodash2.default.clone(nodeDefaults), {
            id: x.id,
            color: desc.color },
          desc.transform(x));}).
        forEach(function (x) {
          res += nodeTemplate(x);
        }).
        commit();
      }).
      commit();

      (0, _lodash2.default)(def.directedEdges).
      forEach(function (desc, key) {
        that.
        matchDirectedEdges({
          type: key }).

        map(function (x) {return _lodash2.default.assign(_lodash2.default.clone(edgeDefaults), {
            id: x.id,
            color: desc.color,
            from: x.from,
            to: x.to },
          desc.transform(x));}).
        forEach(function (x) {
          res += directedEdgeTemplate(x);
        }).
        commit();
      }).
      commit();

      (0, _lodash2.default)(def.undirectedEdges).
      forEach(function (desc, key) {
        that.
        matchUndirectedEdges({
          type: key }).

        map(function (x) {return _lodash2.default.assign(_lodash2.default.clone(edgeDefaults), {
            id: x.id,
            color: desc.color,
            from: x.from,
            to: x.to },
          desc.transform(x));}).
        forEach(function (x) {
          res += undirectedEdgeTemplate(x);
        }).
        commit();
      }).
      commit();

      res += '}';
      return res;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Export graph into the dot format to visualise them
  }, { key: 'toDot', value: function toDot() {
      return this.toDotWithParamaters({
        nodes: {
          Interaction: {
            color: "#ffd1d1",
            transform: function transform(x) {return {
                label: x.content.operatorType + '\n' + x.content.operator.replace(/"/g, "") };} },


          InteractionInstance: {
            color: "#ffed8e",
            transform: function transform(x) {return {
                shape: x.content.type === 'InteractionSimple' ? "ellipse" : 'box',
                color: x.content.type === 'InteractionSimple' ? "#ffde2f" : "#dff1f2",
                fontname: x.content.type === 'InteractionSimple' ? 'Times' : 'Courier',
                label: x.id + '\n' + (x.content.type === 'InteractionSimple' ? x.content.operatorType + '\n' + x.content.operator.replace(/"/g, "") : x.content.content.replace(/"/g, "")) + "\n" + x.ports.map(function (x, i) {return i + ": " + (0, _serializer.serialize)(x);}).join('\n') };} },


          InteractionDefinition: {
            color: "#afe7ff",
            transform: function transform(x) {return {
                label: x.content.signature.operator };} },


          InterfaceDefinition: {
            color: "#afffe4",
            transform: function transform(x) {return {
                label: x.content.signature };} },


          InteractionSignatureOperandElement: {
            color: "#2fffc7",
            transform: function transform(x) {return {
                label: x.content.name };} },


          Interface: {
            color: "#2fcdff",
            transform: function transform(x) {return {
                label: x.content.type === 'InterfaceAtomic' ? x.name + ' : ' + (0, _serializer.serialize)(x.content) : x.name };} } },



        directedEdges: {
          DefinitionSubInteractionInstance: {
            color: "#ffd3b3",
            transform: function transform(x) {return {
                label: "" };} },


          DefinitionInteractionInstance: {
            color: "#ff6b00",
            transform: function transform(x) {return {
                label: "" };} },


          InteractionInstanceIsOperandOf: {
            color: "#00ff03",
            transform: function transform(x) {return {
                label: x.to.index };} },


          InteractionInstanceInteraction: {
            color: "#ffa800",
            transform: function transform(x) {return {
                label: "" };} },


          InteractionOperand: {
            color: "#d00000",
            transform: function transform(x) {return {
                label: x.from.index };} },


          DefinitionInteraction: {
            color: "#ff0000",
            transform: function transform(x) {return {
                label: x.from.index };} },


          DefinitionSubInteraction: {
            color: "#ffd5d5",
            transform: function transform(x) {return {
                label: "" };} },


          SignatureOperand: {
            color: "#2fffc7",
            transform: function transform(x) {return {
                label: x.from.index };} },


          InteractionSignatureOperandElementInterface: {
            color: "#00e8ff",
            transform: function transform(x) {return {
                label: "" };} },


          DefinitionInterface: {
            color: "#00e8ff",
            transform: function transform(x) {return {
                label: "" };} },


          DefinitionSubInterface: {
            color: "#bef9ff",
            transform: function transform(x) {return {
                label: "" };} },


          InterfaceElement: {
            color: "#008cff",
            transform: function transform(x) {return {
                label: x.from.index };} },


          InterfaceInteractionInstance: {
            color: "#e300ff",
            transform: function transform(x) {return {
                label: "" };} },


          DefinitionDefinition: {
            color: "#81ddff",
            transform: function transform(x) {return {
                label: x.from.index };} },


          InteractionDefinition: {
            color: "#e681ff",
            transform: function transform(x) {return {
                label: "" };} },


          InterfaceDefinition: {
            color: "#2bff00",
            transform: function transform(x) {return {
                label: "" };} },


          InteractionDefinitionDependency: {
            color: "#0040ff",
            transform: function transform(x) {return {
                label: "" };} },


          InterfaceDefinitionDependency: {
            color: "#b5ff00",
            transform: function transform(x) {return {
                label: "" };} },


          InteractionInstanceDataDependency: {
            color: "#ddd2ff",
            transform: function transform(x) {return {
                label: "" };} },


          InteractionInstanceOrdering: {
            color: "#cc00ff",
            transform: function transform(x) {return {
                label: x.executionOrder };} } },



        undirectedEdges: {
          InteractionInstanceOperand: {
            color: "#9d8400",
            transform: function transform(x) {return {
                label: x.id,
                headlabel: x.to.index + (_lodash2.default.isUndefined(x.to.ports) ? '' : ': ' + (0, _serializer.serialize)(x.to.ports)) + (_lodash2.default.isUndefined(x.to.compositionElementName) ? '' : ': ' + x.to.compositionElementName),
                taillabel: x.from.index + (_lodash2.default.isUndefined(x.from.ports) ? '' : ': ' + (0, _serializer.serialize)(x.from.ports)) + (_lodash2.default.isUndefined(x.from.compositionElementName) ? '' : ': ' + x.from.compositionElementName) };} } } });




    } }, { key: 'toDot2', value: function toDot2()

    {
      return this.toDotWithParamaters({
        nodes: {
          port: {
            color: "#94ff87",
            transform: function transform(x) {return {
                label: x.ports.compositionElementName + '\n' + x.node.content.operator + x.node.content.content };} },


          coPort: {
            color: "#dce7f9",
            transform: function transform(x) {return {
                label: x.ports.coCompositionElementName + '\n' + x.node.content.operator + x.node.content.content };} } },




        directedEdges: {
          normal: {
            color: "#000000",
            transform: function transform(x) {return {
                label: "" };} },


          loop: {
            color: "#ff0000",
            transform: function transform(x) {return {
                label: "" };} },


          closure: {
            color: "#c79999",
            transform: function transform(x) {return {
                label: "" };} } },



        undirectedEdges: {} });

    } }]);return Graph;}();



module.exports = Graph;