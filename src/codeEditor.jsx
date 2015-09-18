var React = require('react');
var iii = require('iii');
var ScenarioEditor = require('./scenarioEditor.jsx');
var InteractionEditor = require('./interactionEditor.jsx');
//var TraceViewer = require('./traceViewer.jsx');
var Analyse = require('./analyse.jsx');

class CodeEditor extends React.Component {constructor(props) {
    super(props);
    this.state = {
      openedTab: 0,
    };
  }

  openTab0(e) {
    this.setState({
      openedTab: 0
    });
    console.log("openedTab ",this.state.openedTab)

  }

  openTab1(e) {
    this.setState({
      openedTab: 1
    });
    console.log("openedTab ",this.state.openedTab)
  }

  openTab2(e) {
    this.setState({
      openedTab: 2
    });
    console.log("openedTab ",this.state.openedTab)

  }

/*
  componentDidMount() {
    this.props.onScenarioChange(this.props.scenarioText);
    this.props.onInteractionChange(this.props.Interaction);

  }
*/





  render() {
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
            <span>Analyse</span>
          </div>
        </div>
        <div className="TabContent">


            <ScenarioEditor style={{
              display: this.state.openedTab === 0
                ? 'inline-block'
                : 'none'
            }} onScenarioChange={this.props.onScenarioChange} scenarioText={this.props.scenarioText} errorScenario={this.props.errorScenario} scenarioInvalid={this.props.scenarioInvalid} openedTab={this.props.openedTab} />

            <InteractionEditor style={{
              display: this.state.openedTab === 1
                ? 'inline-block'
                : 'none'
            }} openedTab={this.props.openedTab} onInteractionChange={this.props.onInteractionChange} errorInteraction={this.props.errorInteraction} Interaction={this.props.Interaction} />

            <Analyse style={{
              display: this.state.openedTab === 2
                ? 'inline-block'
                : 'none'
            }} openedTab={this.props.openedTab} stats={this.props.stats} compiledInteraction={this.props.compiledInteraction} />
        </div>
    </div>
    );
  }
}

CodeEditor.propTypes = {
  stats: React.PropTypes.object,
  errorInteraction: React.PropTypes.string,
  errorScenario: React.PropTypes.string,
  scenarioText: React.PropTypes.string,
  scenarioInvalid: React.PropTypes.string,
  Interaction: React.PropTypes.string,
  compiledInteraction:React.PropTypes.string,

};

CodeEditor.defaultProps = {
  stats: {variables:0,previous:0,identifiers:0,functions:0,compositions:0},
  errorInteraction: "",
  errorScenario: "",
  scenarioText: "[]",
  scenarioInvalid: "",
  Interaction: "interaction (test):{time:Number in,dimension:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}},keyboard:{Enter: Number in, Meta: Number in, Control: Number in, Alt: Number in, Shift: Number in, Left: Number in, Down: Number in, Right: Number in, Up: Number in}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
  compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})",

};

module.exports = CodeEditor;
