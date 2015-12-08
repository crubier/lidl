import Lidl from 'lidl-core'
import Immutable from 'immutable'

export default {

  fileName:'autoSave',
  listOfFiles:[],

  error:Immutable.fromJS([]),

  lidl: Lidl.examples.lidl[0].code,

  lidlAst: null ,

  expandedLidlAst:null,

  expandedLidl:null,

  metrics:null,

  graph:null,

  displayGraphs:Immutable.fromJS({}),

  header: Lidl.examples.header,

  js : null,

  cleanJs :null,

  scenario: Lidl.examples.lidl[0].scenario,

  scenarioAst: null,

  traceAst :null,

  trace:null,

  position:null


}
