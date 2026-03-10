import _ from "lodash";

function edgeKey(e) {
  return `${e.from.index}:${e.to.index}:${e.to.node.id}`;
}

// During this phase we add the folowing decoration to nodes:
// - finished if the node is to be deleted from the graph
// - referentialTransparencySolved if the node is the result of the merger of other nodes.
export default function referentialTransparencyInstances(graph) {
  // First we mark all nodes as not referentialTransparencySolved
  graph
    .matchNodes({
      type: "InteractionInstance",
      content: { type: "InteractionSimple" },
    })
    .forEach((theNode) => {
      theNode.referentialTransparencySolved = false;
      theNode.referentialTransparencySolvable = // Only leaves are solvable intially
        graph
          .matchUndirectedEdges({
            type: "InteractionInstanceOperand",
            from: { node: theNode },
          })
          .filter((e) => e.from.index > 0)
          .size() == 0;
    })
    .commit();

  // Build operator index: group InteractionInstance nodes by operator string
  const operatorIndex: Map<string, any[]> = new Map();
  graph
    .matchNodes({
      type: "InteractionInstance",
      content: { type: "InteractionSimple" },
    })
    .forEach((n) => {
      const op = n.content.operator;
      let group = operatorIndex.get(op);
      if (!group) {
        group = [];
        operatorIndex.set(op, group);
      }
      group.push(n);
    })
    .commit();

  graph.reduceNodes(
    {
      type: "InteractionInstance",
      content: { type: "InteractionSimple" },
      referentialTransparencySolved: false,
      referentialTransparencySolvable: true,
    },
    (theResult, theNode) => {
      let theChildrenEdges = graph
        .matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: { node: theNode },
        })
        .filter((e) => e.from.index > 0)
        .value();

      const theChildrenKeys = new Set(theChildrenEdges.map(edgeKey));

      // Use operator index instead of full graph scan
      const candidates = operatorIndex.get(theNode.content.operator) || [];
      let similarNodes = candidates.filter((n) => {
        if (n.finished) return false;

        // Compare children using Set-based comparison
        const nChildrenEdges = graph
          .matchUndirectedEdges({
            type: "InteractionInstanceOperand",
            from: { node: n },
          })
          .filter((e) => e.from.index > 0)
          .value();

        if (nChildrenEdges.length !== theChildrenKeys.size) return false;

        const nKeys = new Set(nChildrenEdges.map(edgeKey));
        if (nKeys.size !== theChildrenKeys.size) return false;
        for (const key of nKeys) {
          if (!theChildrenKeys.has(key)) return false;
        }
        return true;
      });

      // We create a node to merge all the nodes similar to theNode
      let newNode = graph.addNode(theNode);

      // Add new node to operator index
      let group = operatorIndex.get(theNode.content.operator);
      if (group) group.push(newNode);

      // Attach the newNode to the definition theNode is in
      graph
        .matchDirectedEdges({
          type: "DefinitionInteraction",
          to: { node: theNode },
        })
        .forEach((e) =>
          graph.addEdge({
            type: "DefinitionInteraction",
            from: e.from,
            to: { node: newNode },
          }),
        )
        .commit();

      // Attach newNode to children of theNode
      _(theChildrenEdges)
        .forEach((ce) => {
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: { node: newNode, index: ce.from.index, ports: ce.from.ports },
            to: ce.to,
          });
        })
        .commit();

      newNode.referentialTransparencySolved = true;
      newNode.referentialTransparencySolvable = false;

      // We link them together
      _(similarNodes)
        .forEach((similarNode) => {
          graph
            .matchUndirectedEdges({
              type: "InteractionInstanceOperand",
              from: { node: similarNode, index: 0 },
            })
            .forEach((edgeFromSimilarNode) => {
              graph.addEdge({
                type: "InteractionInstanceOperand",
                from: {
                  node: newNode,
                  index: edgeFromSimilarNode.from.index,
                  ports: edgeFromSimilarNode.from.ports,
                },
                to: edgeFromSimilarNode.to,
              });
            })
            .commit();
          graph.finish(similarNode);
        })
        .commit();

      // We find new potential solvable nodes
      graph
        .matchNodes({
          type: "InteractionInstance",
          content: { type: "InteractionSimple" },
          referentialTransparencySolved: false,
          referentialTransparencySolvable: false,
        })
        .filter((n) => {
          return (
            graph
              .matchUndirectedEdges({
                type: "InteractionInstanceOperand",
                from: { node: n },
              })
              .filter((x) => x.from.index > 0)
              .every((x) => {
                return x.to.node.referentialTransparencySolved === true;
              })
          );
        })
        .forEach((n) => {
          n.referentialTransparencySolvable = true;
        })
        .commit();
    },
  );
}
