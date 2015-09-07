var React = require('react');
var SkyLight = require('react-skylight');
var iii = require('iii');

class CodeEditor extends React.Component {constructor(props) {
    super(props);
    this.state = {
      openedTab: 0
    };
  }

  openTab0(e) {
    this.setState({
      openedTab: 0
    });

  }

  openTab1(e) {
    this.setState({
      openedTab: 1
    });
  }

  openTab2(e) {
    this.setState({
      openedTab: 2
    });

  }



  componentDidMount() {
    this.props.evaluateInterface(this.props.Interface);
    this.props.evaluateScenario(this.props.scenario);
  }

  interfaceChanged(e) {
    this.props.onInterfaceChange(e.target.value);
  }

  scenarioChanged(e) {
    this.props.onScenarioChange(e.target.value);
  }
  interactionChanged(e) {
    this.props.onInteractionChange(e.target.value);
  }



  showCompiledMode() {
    this.refs.CompiledMode.show();
  }


  render() {
    //var compiledInteraction = iii.compiler.compileToIii(this.props.Interaction);
    return (
      <div className="CodeEditor">
        <div className="Tabs">
          <div className={this.state.openedTab === 0
            ? 'Tab active'
            : 'Tab'} onClick={this.openTab0.bind(this)}>
            <span> Scenario editor </span>
          </div>
          <div className={this.state.openedTab === 1
            ? 'Tab active'
            : 'Tab'} onClick={this.openTab1.bind(this)}>
            <span>Interaction editor</span>
          </div>
          <div className={this.state.openedTab === 2
            ? 'Tab active'
            : 'Tab'} onClick={this.openTab2.bind(this)}>
            <span>Compiled interaction</span>
          </div>
        </div>
        <div className="TabContent">

          <textarea className={this.props.errorScenario !== ""
            ? "error"
            : ""} defaultValue={this.props.scenario} name="scenario" onChange={this.scenarioChanged.bind(this)} style={{
            display: this.state.openedTab === 0
              ? 'inline'
              : 'none'
          }}/>


          <textarea disabled id="errorS" className="errorScenario" defaultValue={this.props.errorScenario} name="errorScenario"  style={{
            display: this.props.errorScenario !== "" && this.state.openedTab === 0
              ? 'inline'
              : 'none'
          }}/>


          <div>
            <textarea className={this.props.errorInteraction !== ""
              ? "error"
              : ""} defaultValue={this.props.Interaction} name="interaction" onChange={this.interactionChanged.bind(this)} style={{
              display: this.state.openedTab === 1
                ? 'inline'
                : 'none'
            }}/>

            <textarea disabled id="errorI" className="errorScenario" defaultValue={this.props.errorInteraction} name="errorInteraction"  style={{
              display: this.props.errorInteraction !== "" && this.state.openedTab === 1
                ? 'inline'
                : 'none'
            }}/>
            <textarea disabled id="compiledI" defaultValue={this.props.compiledInteraction} name="compiledInteraction" style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}/>


            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}> { "Number of previous :" + this.props.stats.previous} </p>

          </div>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
  stats: React.PropTypes.object,
  errorInteraction: React.PropTypes.string,
  errorInterface: React.PropTypes.string,
  errorScenario: React.PropTypes.string,
  Interface: React.PropTypes.string,
  Interaction: React.PropTypes.string,
  compiledInteraction:React.PropTypes.string,

};

CodeEditor.defaultProps = {
  stats: {variables:0,previous:0,identifiers:0,functions:0},
  errorInteraction: "",
  errorInterface: "",
  errorScenario: "",
  Interface: "{a:{e:Number in},b:{c:{d:Number in}}}",
  Interaction: "interaction (test):Number out with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
  scenario: '[{"a":{"e":2},"b":{"c":{"d":5}}},{"a":{"e":1}},{"a":{"e":0},"b":{"c":{"d":-5}}},{},{"b":{"c":{"d":10}}}]',
  compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})",

};

module.exports = CodeEditor;
