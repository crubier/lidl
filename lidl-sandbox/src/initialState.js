import defaultHeader from './Defaults/header'
import defaultCode from './Defaults/lidlcode'
import defaultScenario from './Defaults/scenario'
import Lidl from 'lidl-core'

export default {

  fileName:'autoSave',
  listOfFiles:[],

  error:null,

  lidl: Lidl.examples.lidl[0].code,

  lidlAst: null ,

  expandedLidlAst:null,

  expandedLidl:null,

  graph:null,

  displayGraphUpTo:'addDefinitionToGraph',
  displayGraph:null,

  header: Lidl.examples.header,

  js : null,

  cleanJs :null,

  scenario: Lidl.examples.lidl[0].scenario,

  scenarioAst: null,

  traceAst :null,

  trace:null


}
