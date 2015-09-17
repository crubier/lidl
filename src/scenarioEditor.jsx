var React = require('react');
var iii = require('iii');

class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  scenarioChanged(e) {
    this.props.onScenarioChange(e.target.value);
  }

  render() {
    return (

      <div  className="scenarioEditor" style={{
        display: this.props.openedTab === 0
          ? 'inline-block'
          : 'none',
          overflow:"auto",
      }}>
          <textarea id="scenario" style={{
            display: this.props.openedTab === 0
              ? 'inline-block'
              : 'none',
              overflow:"auto",
          }} className={this.props.errorScenario !== ""
            ? "error"
            : ""} value={this.props.scenarioText}  name="scenario" onChange={this.scenarioChanged.bind(this)} />


            <div className="errorScenario" style={{
              display: this.props.openedTab === 0
                ? 'inline-block'
                : 'none',
                overflow:"auto",
            }} >{this.props.errorScenario}</div>

            <div className="errorScenario" style={{
              display: this.props.openedTab === 0
                ? 'inline-block'
                : 'none',
                overflow:"auto",
            }} >{this.props.scenarioInvalid}</div>

          </div>


    );
  }
  }

  ScenarioEditor.propTypes = {
    errorScenario: React.PropTypes.string,
    scenarioText: React.PropTypes.string,
    scenarioInvalid: React.PropTypes.string,
    openedTab: React.PropTypes.number,

  };

  ScenarioEditor.defaultProps = {
    errorScenario: "",
    scenarioText: "[]",
    scenarioInvalid: "",
    openedTab:0
  };

  module.exports = ScenarioEditor;
