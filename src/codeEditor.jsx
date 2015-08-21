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

  openTab2(e){
    this.setState({openedTab:2});

  }

  componentDidMount() {
     this.props.evaluateInterface(this.props.Interface);
     this.props.evaluateScenario(this.props.scenario);
  }

  interfaceChanged(e){
    this.props.onInterfaceChange(e.target.value);
  }

  scenarioChanged(e){
    this.props.onScenarioChange(e.target.value);

  }



  render() {
    return (
      <div className="CodeEditor">
        <div className="Tabs">
          <div className={this.state.openedTab===0?'Tab active':'Tab'} onClick={this.openTab0.bind(this)}>
            <span>Interface editor</span>
          </div>
          <div className={this.state.openedTab===1?'Tab active':'Tab'} onClick={this.openTab1.bind(this)}>
            <span>Scenario editor</span>
          </div>
          <div className={this.state.openedTab===2?'Tab active':'Tab'} onClick={this.openTab2.bind(this)}>
            <span>Interaction editor</span>
          </div>
        </div>
        <div className="TabContent">
          <textarea className={this.props.errorInterface!==""?"error":""} defaultValue={this.props.Interface} name="interface"  style={{display:this.state.openedTab===0?'inline':'none'}} onChange={this.interfaceChanged.bind(this)} />
          <textarea className={this.props.errorScenario!==""?"error":""} defaultValue={this.props.scenario} name="scenario" style={{display:this.state.openedTab===1?'inline':'none'}} onChange={this.scenarioChanged.bind(this)}/>1
        </div>

      </div>
    );
  }
}

CodeEditor.propTypes = {errorInterface:React.PropTypes.string,errorScenario:React.PropTypes.string,Interface:React.PropTypes.string,scenario:React.PropTypes.string, modelInterface:React.PropTypes.string, modelScenario:React.PropTypes.string,};

CodeEditor.defaultProps =  {errorInterface:"",errorScenario:"",Interface:"{a:{e:Number in},b:{c:{d:Number in}}}",scenario:'[{"a":{"e":2},"b":{"c":{"d":5}}},{"a":{"e":1}},{"a":{"e":0},"b":{"c":{"d":-5}}},{},{"b":{"c":{"d":10}}}]',modelInterface:"",modelScenario:""};

module.exports = CodeEditor;
