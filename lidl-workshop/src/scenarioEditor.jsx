var React = require('react');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var _ = require ('lodash');

function errorScenario(scenario){

  try{
    JSON.parse(scenario);
    return "";
  }catch(error) {
    return error.message;

  }
}

class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  scenarioChanged(e) {
    this.props.onScenarioChange(e.target.value);
  }

  render() {
    var errorClasse;
    var errorMessage;
    var errScenario=errorScenario(this.props.scenarioText);
    if(errScenario==""){
      if(_.every(_.flatten(scenarioChecker.check(this.props.Interface, JSON.parse(this.props.scenarioText), "main")))){
        errorClasse="info";
        errorMessage="Valid scenario";
      }else{
        errorClasse="warning";
        errorMessage="Scenario does not match the definition";
      }

    }else{
      errorClasse="error";
      errorMessage=errScenario;
    }

    return (

      <div  className="scenarioEditor">
          <textarea id="scenario" value={this.props.scenarioText}  name="scenario" onChange={this.scenarioChanged.bind(this)} />
            <p className ={errorClasse }>{errorMessage}</p>


          </div>


    );
  }
  }

  ScenarioEditor.propTypes = {
    scenarioText: React.PropTypes.string,
    Interface : React.PropTypes.object,

  };

  ScenarioEditor.defaultProps = {
    scenarioText: "[]",
    Interface :[],

  };

  module.exports = ScenarioEditor;
