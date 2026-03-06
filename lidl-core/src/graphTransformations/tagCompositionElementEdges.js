"use strict";

import _ from "lodash";

export default function tagCompositionElementEdges(graph) {
  graph
    .matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: {
          type: "InteractionInstance",
          content: { type: "InteractionSimple", operatorType: "Composition" },
        },
      },
    })
    .forEach((theEdge) => {
      if (theEdge.from.index > 0)
        theEdge.from.compositionElementName = _.words(
          theEdge.from.node.content.operator,
          /[^,:\{\}\$]+/g,
        )[theEdge.from.index - 1];
    })
    .filter({
      to: {
        node: {
          type: "InteractionInstance",
          content: { type: "InteractionSimple", operatorType: "Composition" },
        },
      },
    })
    .forEach((theEdge) => {
      if (theEdge.to.index > 0)
        theEdge.to.compositionElementName = _.words(
          theEdge.to.node.content.operator,
          /[^,:\{\}\$]+/g,
        )[theEdge.to.index - 1];
    })
    .commit();
}
