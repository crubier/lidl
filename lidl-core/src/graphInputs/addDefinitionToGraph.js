"use strict"

import _ from 'lodash'


import addInteractionDefinitionToGraph from './addInteractionDefinitionToGraph'
import addInterfaceDefinitionToGraph from './addInterfaceDefinitionToGraph'


export default function addDefinitionToGraph(graph, definition) {
  
  if (definition.type === 'InteractionDefinition') {
    return addInteractionDefinitionToGraph(graph, definition);
  } else if (definition.type === 'InterfaceDefinition') {
    return addInterfaceDefinitionToGraph(graph, definition);
  }
}
