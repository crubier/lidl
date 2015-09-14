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
    this.props.evaluateScenario(this.props.scenario);
    this.props.evaluateInteraction(this.props.Interaction);
  }


  scenarioChanged(e) {
    this.props.onScenarioChange(e.target.value);
  }
  interactionChanged(e) {
    this.props.onInteractionChange(e.target.value);
  }


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

          <textarea className={this.props.errorScenario !== ""
            ? "error"
            : ""} defaultValue={this.props.scenario} name="scenario" onChange={this.scenarioChanged.bind(this)} style={{
            display: this.state.openedTab === 0
              ? 'inline'
              : 'none'
          }}/>

            <textarea className={this.props.errorInteraction !== ""
              ? "error"
              : ""} defaultValue={this.props.Interaction} name="interaction" onChange={this.interactionChanged.bind(this)} style={{
              display: this.state.openedTab === 1
                ? 'inline'
                : 'none'
            }}/>


            <div className="Tab compiledInteraction" style={{
              display: this.state.openedTab === 2
                ? 'inline-block'
                : 'none'
            }} >{this.props.compiledInteraction}</div>

            <div className="errorScenario" style={{
              display: this.props.errorInteraction !== "" && this.state.openedTab === 1
                ? 'inline-block'
                : 'none'
            }} >{this.props.errorInteraction}</div>

            <div className="errorScenario" style={{
              display: this.props.errorScenario !== "" && this.state.openedTab === 0
                ? 'inline-block'
                : 'none'
            }} >{this.props.errorScenario}</div>

            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}>{ "Number of previous :" + this.props.stats.previous} </p>
            <br/>
            <br/>
            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}> { "Number of identifiers :" + this.props.stats.identifiers} </p>
            <br/>
            <br/>
            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}> { "Number of functions :" + this.props.stats.functions} </p>
            <br/>
            <br/>
            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}> { "Number of compositions :" + this.props.stats.compositions} </p>
            <br/>
            <br/>
            <p style={{
              display: this.state.openedTab === 2
                ? 'inline'
                : 'none'
            }}> { "Number of variables :" + (this.props.stats.identifiers+this.props.stats.previous)} </p>
            <br/>
            <br/>
          </div>
        </div>

    );
  }
}

CodeEditor.propTypes = {
  stats: React.PropTypes.object,
  errorInteraction: React.PropTypes.string,
  errorScenario: React.PropTypes.string,
  Interaction: React.PropTypes.string,
  compiledInteraction:React.PropTypes.string,

};

CodeEditor.defaultProps = {
  stats: {variables:0,previous:0,identifiers:0,functions:0,compositions:0},
  errorInteraction: "",
  errorScenario: "",
  Interaction: "interaction (test):{time:Number in,size:{width:Number in, height:Number in},mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
  scenario: '[]',
  compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})",

};

module.exports = CodeEditor;
