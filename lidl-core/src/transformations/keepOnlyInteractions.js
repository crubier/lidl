"use strict"

import _ from 'lodash'

export default function keepOnlyInteractions(graph){
  graph
  .matchNodes()
  .reject({type:'InteractionInstance'})
  .forEach(n=>{
    graph
    .finish(n);})
  .commit();
}
