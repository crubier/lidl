"use strict"

import operator from'../operator.js'

export default function addOperatorTypeAnnotation(graph) {
    graph
    .matchNodes({type:'Interaction',content: {type: "InteractionSimple"}})
    .forEach(x => {
      x.content.operatorType = operator.parse(x.content.operator);})
    .commit();
}
