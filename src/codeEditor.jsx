var React = require('react');


class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state={openedTab:0};
  }

  openTab0(e){
    this.setState({openedTab:0});

  }

  openTab1(e){
    this.setState({openedTab:1});
  }

  componentDidMount() {
     this.props.evaluateCode(this.props.code);
     this.props.evaluateScenario(this.props.scenario);
  }

  codeChanged(e){
    this.props.onCodeChange(e.target.value);
  }

  scenarioChanged(e){
    this.props.onScenarioChange(e.target.value);

  }



  render() {
    return (
      <div className="CodeEditor">
        <div className="Tabs">
          <div className={this.state.openedTab===0?'Tab active':'Tab'} onClick={this.openTab0.bind(this)}>
            <span>Code editor</span>
          </div>
          <div className={this.state.openedTab===1?'Tab active':'Tab'} onClick={this.openTab1.bind(this)}>
            <span>Scenario editor</span>
          </div>
        </div>
        <div className="TabContent">
          <textarea className={this.props.errorCode!==""?"error":""} defaultValue={this.props.code} name="code"  style={{display:this.state.openedTab===0?'inline':'none'}} onChange={this.codeChanged.bind(this)} />
          <textarea className={this.props.errorScenario!==""?"error":""} defaultValue={this.props.scenario} name="scenario" style={{display:this.state.openedTab===1?'inline':'none'}} onChange={this.scenarioChanged.bind(this)}/>1
        </div>

      </div>
    );
  }
}

CodeEditor.propTypes = {errorCode:React.PropTypes.string,errorScenario:React.PropTypes.string,code:React.PropTypes.string,scenario:React.PropTypes.string, modelCode:React.PropTypes.string, modelScenario:React.PropTypes.string,};

CodeEditor.defaultProps =  {errorCode:"",errorScenario:"",code:"{a:{e:Number in},b:{c:{d:Number in}}}",scenario:'[{"a":{"e":2},"b":{"c":{"d":5}}},{"a":{"e":1}},{"a":{"e":0},"b":{"c":{"d":-5}}},{},{"b":{"c":{"d":10}}}]',modelCode:"",modelScenario:""};

module.exports = CodeEditor;
