import defaultHeader from './Defaults/header'
import defaultCode from './Defaults/lidlcode'
import defaultScenario from './Defaults/scenario'
import Lidl from 'lidl-core'

export default {
  lidlCode: defaultCode,
  error:null,

  lidlAst: Lidl.parser.parse(defaultCode) ,

  lidlExpandedAst:{},

  lidlGraph:{},

  headerCode: defaultHeader,

  lidlCompiled:{},

  scenarioCode: defaultScenario,

  scenario: JSON.parse(defaultScenario),

  generatedCode: "",

  trace:[]


}
