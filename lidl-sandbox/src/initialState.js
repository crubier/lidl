import defaultHeader from './defaultHeader'

export default {
  lidlCode: "interaction\n  (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}\nis\n  ({theNumber:(variable theNumber)theOther:(variable theNumber)theResult:(variable theNumber)theLast:(variable theNumber)})",
  lidlCodeError:null,
  lidlAst: {},
  lidlExpandedAst:{},
  lidlGraph:{},
  lidlCompiled:{},
  scenarioCode: {},
  scenarioModel: {},
  generatedCode: "",
  headerCode: defaultHeader
}
