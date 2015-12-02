import defaultHeader from './Defaults/header'
import defaultCode from './Defaults/lidlcode'
import defaultScenario from './Defaults/scenario'
import Lidl from 'lidl-core'

export default {

  fileName:'autoSave',
  listOfFiles:[],

  error:null,

  lidl: defaultCode,

  lidlAst: null ,

  expandedLidlAst:null,

  expandedLidl:null,

  graph:null,

  displayGraph:null,

  header: defaultHeader,

  js : null,

  cleanJs :null,

  scenario: defaultScenario,

  scenarioAst: null,

  traceAst :null,

  trace:null


}
