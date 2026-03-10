import _ from "lodash";

import { serialize } from "./serializer";

// Lodash 4 compatibility shims for Lodash 3 chain behavior:
// 1) _.forEach on implicit chains auto-unwraps in Lodash 4, breaking
//    .forEach().value() and mid-chain .forEach() patterns. Re-wrap the result.
// 2) _.commit() was removed in Lodash 4. It forced lazy chain evaluation and
//    returned a new wrapper. We restore it as value() + re-wrap.
const _origForEach = _.prototype.forEach;
_.prototype.forEach = function (iteratee) {
  var result = _origForEach.call(this, iteratee);
  return result != null && typeof result === "object" ? _(result) : result;
};
_.prototype.commit = function () {
  return _(this.value());
};

class Graph {
  ///////////////////////////////////////////////////////////////////////////////
  nodes: any[];
  edges: any[];
  nodeTypeIndex: Map<string, Set<any>>;
  edgeTypeIndex: Map<string, Set<any>>;
  version: number;

  constructor(nodes?: any[], edges?: any[]) {
    this.nodes = nodes ?? [];
    this.edges = edges ?? [];
    this.version = 0;

    this.nodeTypeIndex = new Map();
    for (const n of this.nodes) {
      const type = n.type ?? "";
      let set = this.nodeTypeIndex.get(type);
      if (!set) {
        set = new Set();
        this.nodeTypeIndex.set(type, set);
      }
      if (!n.finished) set.add(n);
    }

    this.edgeTypeIndex = new Map();
    for (const e of this.edges) {
      const type = e.type ?? "";
      let set = this.edgeTypeIndex.get(type);
      if (!set) {
        set = new Set();
        this.edgeTypeIndex.set(type, set);
      }
      if (!e.finished) set.add(e);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Only way to add a node to the graph

  addNode(node: any): any {
    this.version++;
    const res: any = Object.assign({}, node);
    delete res.id;
    delete res.finished;
    res.id = _.uniqueId("node_");
    res.finished = false;
    res.incomingEdges = new Set();
    res.outgoingEdges = new Set();
    res.incomingEdgeTypeIndex = new Map();
    res.outgoingEdgeTypeIndex = new Map();
    if (res.type == null) res.type = "";
    this.nodes.push(res);
    let typeSet = this.nodeTypeIndex.get(res.type);
    if (!typeSet) {
      typeSet = new Set();
      this.nodeTypeIndex.set(res.type, typeSet);
    }
    typeSet.add(res);
    return res;
  }

  addEdge(edge: any): any {
    this.version++;
    const res: any = Object.assign({}, edge);
    delete res.id;
    delete res.finished;
    res.id = _.uniqueId("edge_");
    res.finished = false;
    if (res.type == null) res.type = "";
    this.edges.push(res);
    let typeSet = this.edgeTypeIndex.get(res.type);
    if (!typeSet) {
      typeSet = new Set();
      this.edgeTypeIndex.set(res.type, typeSet);
    }
    typeSet.add(res);
    // Per-node indexes
    const fromNode = res.from.node;
    fromNode.outgoingEdges.add(res);
    let fromTypeSet = fromNode.outgoingEdgeTypeIndex.get(res.type);
    if (!fromTypeSet) {
      fromTypeSet = new Set();
      fromNode.outgoingEdgeTypeIndex.set(res.type, fromTypeSet);
    }
    fromTypeSet.add(res);
    const toNode = res.to.node;
    toNode.incomingEdges.add(res);
    let toTypeSet = toNode.incomingEdgeTypeIndex.get(res.type);
    if (!toTypeSet) {
      toTypeSet = new Set();
      toNode.incomingEdgeTypeIndex.set(res.type, toTypeSet);
    }
    toTypeSet.add(res);
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Resolve the best edge source for a given pattern (already active-only)
  private _getEdgeSource(pattern: any): any[] {
    if (pattern.type !== undefined) {
      if (pattern.from?.node?.outgoingEdgeTypeIndex instanceof Map) {
        const set = pattern.from.node.outgoingEdgeTypeIndex.get(pattern.type);
        return set ? [...set] : [];
      }
      if (pattern.to?.node?.incomingEdgeTypeIndex instanceof Map) {
        const set = pattern.to.node.incomingEdgeTypeIndex.get(pattern.type);
        return set ? [...set] : [];
      }
      const set = this.edgeTypeIndex.get(pattern.type);
      return set ? [...set] : [];
    }
    if (pattern.from?.node?.outgoingEdges instanceof Set) {
      return [...pattern.from.node.outgoingEdges];
    }
    if (pattern.to?.node?.incomingEdges instanceof Set) {
      return [...pattern.to.node.incomingEdges];
    }
    return this.edges.filter((e) => !e.finished);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in parallel"

  matchNodes(pattern?: any): any {
    if (pattern === undefined) {
      return _(this.nodes.filter((n) => !n.finished));
    }
    if (pattern.type !== undefined) {
      const typeSet = this.nodeTypeIndex.get(pattern.type);
      return _(typeSet ? [...typeSet] : []).filter(pattern);
    }
    return _(this.nodes.filter((n) => !n.finished)).filter(pattern);
  }

  matchDirectedEdges(pattern?: any): any {
    if (pattern === undefined) {
      return _(this.edges.filter((e) => !e.finished));
    }
    return _(this._getEdgeSource(pattern)).filter(pattern);
  }

  matchUndirectedEdges(pattern?: any): any {
    return this.matchDirectedEdges(pattern)
      .union(
        this.matchDirectedEdges(this.inverse(pattern))
          .map(this.inverse.bind(this))
          .value(),
      )
      .uniqBy("id");
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Functions that match and do things "in series"

  findNode(pattern?: any): any {
    if (pattern === undefined) {
      for (const n of this.nodes) {
        if (!n.finished) return n;
      }
      return undefined;
    }
    if (pattern.type !== undefined) {
      const typeSet = this.nodeTypeIndex.get(pattern.type);
      return _(typeSet ? [...typeSet] : []).find(pattern);
    }
    return _(this.nodes.filter((n) => !n.finished)).find(pattern);
  }

  findDirectedEdge(pattern?: any): any {
    if (pattern === undefined) {
      for (const e of this.edges) {
        if (!e.finished) return e;
      }
      return undefined;
    }
    return _(this._getEdgeSource(pattern)).find(pattern);
  }

  findUndirectedEdge(pattern?: any): any {
    var res = this.findDirectedEdge(pattern);
    if (!_.isUndefined(res)) return res;
    return this.inverse(this.findDirectedEdge(this.inverse(pattern)));
  }

  // Maps on those.
  // Note that the functions need to mutate the graph
  // otherwise the call will loop forever
  reduceNodes(
    pattern: any,
    iteratee: Function,
    accumulator?: any,
    thisArg?: any,
  ): any {
    var current = this.findNode(pattern);
    var result = accumulator === undefined ? [] : accumulator;
    var boundIteratee = _.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findNode(pattern);
    }
    return _(result);
  }
  reduceDirectedEdges(
    pattern: any,
    iteratee: Function,
    accumulator?: any,
    thisArg?: any,
  ): any {
    var current = this.findDirectedEdge(pattern);
    var result = accumulator === undefined ? [] : accumulator;
    var boundIteratee = _.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findDirectedEdge(pattern);
    }
    return _(result);
  }
  reduceUndirectedEdges(
    pattern: any,
    iteratee: Function,
    accumulator?: any,
    thisArg?: any,
  ): any {
    var current = this.findUndirectedEdge(pattern);
    var result = accumulator === undefined ? [] : accumulator;
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
  inverse(edge: any): any {
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
  // Compact master arrays (indexes are maintained eagerly by finish())
  clean(): void {
    this.nodes = this.nodes.filter((n) => !n.finished);
    this.edges = this.edges.filter((e) => !e.finished);
  }

  finish(x: any): any {
    if (x.finished) return x;
    x.finished = true;
    this.version++;

    if (x.outgoingEdges instanceof Set) {
      // Finishing a node — remove from type index and cascade-finish edges
      const typeSet = this.nodeTypeIndex.get(x.type);
      if (typeSet) typeSet.delete(x);

      // Collect all unique incident edges before modifying
      const incidentEdges = new Set<any>();
      for (const e of x.outgoingEdges) incidentEdges.add(e);
      for (const e of x.incomingEdges) incidentEdges.add(e);

      for (const edge of incidentEdges) {
        if (!edge.finished) {
          edge.finished = true;
          this._removeEdgeFromIndexes(edge);
        }
      }

      x.outgoingEdges.clear();
      x.incomingEdges.clear();
      x.outgoingEdgeTypeIndex.clear();
      x.incomingEdgeTypeIndex.clear();
    } else {
      // Finishing an edge
      this._removeEdgeFromIndexes(x);
    }

    return x;
  }

  private _removeEdgeFromIndexes(edge: any): void {
    const typeSet = this.edgeTypeIndex.get(edge.type);
    if (typeSet) typeSet.delete(edge);

    const fromNode = edge.from.node;
    fromNode.outgoingEdges?.delete(edge);
    fromNode.outgoingEdgeTypeIndex?.get(edge.type)?.delete(edge);

    const toNode = edge.to.node;
    toNode.incomingEdges?.delete(edge);
    toNode.incomingEdgeTypeIndex?.get(edge.type)?.delete(edge);
  }

  // Check if a node is finished
  nodeIsFinished(n: any): boolean {
    return n.finished === true;
  }

  nodeIsNotFinished(n: any): boolean {
    return !this.nodeIsFinished(n);
  }

  // Check if an edge is finished
  edgeIsFinished(e: any): boolean {
    return (
      e.finished === true ||
      this.nodeIsFinished(e.to.node) ||
      this.nodeIsFinished(e.from.node)
    );
  }

  edgeIsNotFinished(e: any): boolean {
    return !this.edgeIsFinished(e);
  }

  toDotWithParamaters(def: any): string {
    var nodeDefaults = {
      shape: "ellipse",
      style: "filled",
      color: "#b0b0b0",
      fontname: "Times",
      label: "Node",
    };
    var edgeDefaults = {
      arrowsize: 1,
      arrowHead: "normal",
      color: "#333333",
      fontname: "Times-Italic",
      label: "Edge",
      headlabel: "",
      taillabel: "",
    };

    var nodeTemplate = _.template(
      '<%=id%> [shape="<%=shape%>", style="<%=style%>", color="<%=color%>", fontname="<%=fontname%>", label="<%=label%>" ]\n',
    );
    var directedEdgeTemplate = _.template(
      '<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n',
    );
    var undirectedEdgeTemplate = _.template(
      '<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]\n',
    );

    var that = this;

    var res = "digraph g{";

    _(def.nodes)
      .forEach((desc, key) => {
        that
          .matchNodes({
            type: key,
          })
          .map((x) =>
            _.assign(
              _.clone(nodeDefaults),
              {
                id: x.id,
                color: desc.color,
              },
              desc.transform(x),
            ),
          )
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
            type: key,
          })
          .map((x) =>
            _.assign(
              _.clone(edgeDefaults),
              {
                id: x.id,
                color: desc.color,
                from: x.from,
                to: x.to,
              },
              desc.transform(x),
            ),
          )
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
            type: key,
          })
          .map((x) =>
            _.assign(
              _.clone(edgeDefaults),
              {
                id: x.id,
                color: desc.color,
                from: x.from,
                to: x.to,
              },
              desc.transform(x),
            ),
          )
          .forEach((x) => {
            res += undirectedEdgeTemplate(x);
          })
          .commit();
      })
      .commit();

    res += "}";
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Export graph into the dot format to visualise them
  toDot(): string {
    return this.toDotWithParamaters({
      nodes: {
        Interaction: {
          color: "#ffd1d1",
          transform: (x) => ({
            label:
              x.content.operatorType +
              "\n" +
              x.content.operator.replace(/"/g, ""),
          }),
        },
        InteractionInstance: {
          color: "#ffed8e",
          transform: (x) => ({
            shape: x.content.type === "InteractionSimple" ? "ellipse" : "box",
            color:
              x.content.type === "InteractionSimple" ? "#ffde2f" : "#dff1f2",
            fontname:
              x.content.type === "InteractionSimple" ? "Times" : "Courier",
            label:
              x.id +
              "\n" +
              (x.content.type === "InteractionSimple"
                ? x.content.operatorType +
                  "\n" +
                  x.content.operator.replace(/"/g, "")
                : x.content.content.replace(/"/g, "")) +
              "\n" +
              x.ports.map((x, i) => i + ": " + serialize(x)).join("\n"),
          }),
        },
        InteractionDefinition: {
          color: "#afe7ff",
          transform: (x) => ({
            label: x.content.signature.operator,
          }),
        },
        InterfaceDefinition: {
          color: "#afffe4",
          transform: (x) => ({
            label: x.content.signature,
          }),
        },
        InteractionSignatureOperandElement: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.content.name,
          }),
        },
        Interface: {
          color: "#2fcdff",
          transform: (x) => ({
            label:
              x.content.type === "InterfaceAtomic"
                ? x.name + " : " + serialize(x.content)
                : x.name,
          }),
        },
      },
      directedEdges: {
        DefinitionSubInteractionInstance: {
          color: "#ffd3b3",
          transform: (x) => ({
            label: "",
          }),
        },
        DefinitionInteractionInstance: {
          color: "#ff6b00",
          transform: (x) => ({
            label: "",
          }),
        },
        InteractionInstanceIsOperandOf: {
          color: "#00ff03",
          transform: (x) => ({
            label: x.to.index,
          }),
        },
        InteractionInstanceInteraction: {
          color: "#ffa800",
          transform: (x) => ({
            label: "",
          }),
        },
        InteractionOperand: {
          color: "#d00000",
          transform: (x) => ({
            label: x.from.index,
          }),
        },
        DefinitionInteraction: {
          color: "#ff0000",
          transform: (x) => ({
            label: x.from.index,
          }),
        },
        DefinitionSubInteraction: {
          color: "#ffd5d5",
          transform: (x) => ({
            label: "",
          }),
        },
        SignatureOperand: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.from.index,
          }),
        },
        InteractionSignatureOperandElementInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: "",
          }),
        },
        DefinitionInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: "",
          }),
        },
        DefinitionSubInterface: {
          color: "#bef9ff",
          transform: (x) => ({
            label: "",
          }),
        },
        InterfaceElement: {
          color: "#008cff",
          transform: (x) => ({
            label: x.from.index,
          }),
        },
        InterfaceInteractionInstance: {
          color: "#e300ff",
          transform: (x) => ({
            label: "",
          }),
        },
        DefinitionDefinition: {
          color: "#81ddff",
          transform: (x) => ({
            label: x.from.index,
          }),
        },
        InteractionDefinition: {
          color: "#e681ff",
          transform: (x) => ({
            label: "",
          }),
        },
        InterfaceDefinition: {
          color: "#2bff00",
          transform: (x) => ({
            label: "",
          }),
        },
        InteractionDefinitionDependency: {
          color: "#0040ff",
          transform: (x) => ({
            label: "",
          }),
        },
        InterfaceDefinitionDependency: {
          color: "#b5ff00",
          transform: (x) => ({
            label: "",
          }),
        },
        InteractionInstanceDataDependency: {
          color: "#ddd2ff",
          transform: (x) => ({
            label: "",
          }),
        },
        InteractionInstanceOrdering: {
          color: "#cc00ff",
          transform: (x) => ({
            label: x.executionOrder,
          }),
        },
      },
      undirectedEdges: {
        InteractionInstanceOperand: {
          color: "#9d8400",
          transform: (x) => ({
            label: x.id,
            headlabel:
              x.to.index +
              (_.isUndefined(x.to.ports) ? "" : ": " + serialize(x.to.ports)) +
              (_.isUndefined(x.to.compositionElementName)
                ? ""
                : ": " + x.to.compositionElementName),
            taillabel:
              x.from.index +
              (_.isUndefined(x.from.ports)
                ? ""
                : ": " + serialize(x.from.ports)) +
              (_.isUndefined(x.from.compositionElementName)
                ? ""
                : ": " + x.from.compositionElementName),
          }),
        },
      },
    });
  }

  toDot2(): string {
    return this.toDotWithParamaters({
      nodes: {
        port: {
          color: "#94ff87",
          transform: (x) => ({
            label:
              x.ports.compositionElementName +
              "\n" +
              x.node.content.operator +
              x.node.content.content,
          }),
        },
        coPort: {
          color: "#dce7f9",
          transform: (x) => ({
            label:
              x.ports.coCompositionElementName +
              "\n" +
              x.node.content.operator +
              x.node.content.content,
          }),
        },
      },
      directedEdges: {
        normal: {
          color: "#000000",
          transform: (x) => ({
            label: "",
          }),
        },
        loop: {
          color: "#ff0000",
          transform: (x) => ({
            label: "",
          }),
        },
        closure: {
          color: "#c79999",
          transform: (x) => ({
            label: "",
          }),
        },
      },
      undirectedEdges: {},
    });
  }
}

export default Graph;
