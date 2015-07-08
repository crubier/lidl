var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');
var scenarioChecker = require('./scenarioChecker.js');


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={listOfAtoms:[],errorCode:"",errorSnario:""};
  }

  onCodeChange(newCode) {
    this.evaluateCode(newCode);
  }

  onScenarioChange(newScenario) {
    console.log(newScenario);
    this.evaluateScenario(newScenario);
  }

  evaluateCode(code){
    try {
      var newModelCode = iii.parser.parse(code,{startRule:"interface"});
      this.setState({errorCode:""});
      //console.log("new=", newModelCode);
      var listOfAtoms=iii.interfaces.listOfAtoms(newModelCode,"main");

      //console.log(JSON.stringify(listOfAtoms));
      this.setState({modelCode:newModelCode});
      this.setState({listOfAtoms:listOfAtoms});
      //console.log(JSON.stringify(this.state.listOfAtoms));

    } catch (errorMessage) {
      this.setState({errorCode:errorMessage});
      console.log(errorMessage);
    }
  }

  evaluateScenario(scenario) {
    /* TODO meme esprit que evaluateCode */

    try {
      var newModelScenario =JSON.parse(scenario);
      this.setState({errorScenario:""});
      console.log("1 =",this.state.errorScenario);
      console.log("JSON.PARSE");
      console.log(newModelScenario);
      console.log("gastli =",this.state.modelCode);
      scenarioChecker.check(this.state.modelCode,newModelScenario,"main");
      //var newModelScenario=scenarioChecker.check(this.state.modelCode,parseScenario,"main");
      this.setState({modelScenario:newModelScenario});

    }
    catch (errorMessage) {
      this.setState({errorScenario:errorMessage});
      console.log("2 =",this.state.errorScenario);

    }
  }

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }


  render() {
    return (
      <div className="Main">
        <CodeEditor errorScenario={this.state.errorScenario} errorCode={this.state.errorCode} code={this.state.code} onCodeChange={this.onCodeChange.bind(this)} modelCode={this.state.modelCode} modelScenario={this.state.modelScenario} scenario={this.state.scenario} onScenarioChange={this.onScenarioChange.bind(this)}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms} /> /* TODO on doit aussi passer le scenario en prop  */
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
