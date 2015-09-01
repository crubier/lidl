var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var scenarioInvalidException=require('./ScenarioInvalidException.js');
var modelInterfaceInitial = {"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"a","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"e","value":{"type":"InterfaceAtomic","data":{"type":"DataAtomic","name":"Number"},"direction":"in"}}]}},{"type":"InterfaceCompositeElement","key":"b","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"c","value":{"type":"InterfaceComposite","element":[{"type":"InterfaceCompositeElement","key":"d","value":{"type":"InterfaceAtomic","data":{"type":"DataAtomic","name":"Number"},"direction":"in"}}]}}]}}]};

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={listOfAtoms:[],errorInterface:"",errorInteraction:"",errorSnario:"",Interaction:"interaction (test):Number out with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",modelInterface:modelInterfaceInitial,modelScenario:[]};
  }

  onInterfaceChange(newInterface) {
    this.evaluateInterface(newInterface);
  }

  onInteractionChange(newInteraction) {
    this.evaluateInteraction(newInteraction);
  }

  onScenarioChange(newScenario) {
    this.evaluateScenario(newScenario);
  }

  evaluateInteraction(Interaction){
    try {
      var newModelInteraction = iii.parser.parse(Interaction);


        var newModelInterface = newModelInteraction[0].signature.interface
        this.setState({errorInterface:""});
        var listOfAtoms=iii.interfaces.listOfAtoms(newModelInterface,"main");
        this.setState({modelInterface:newModelInterface});
        this.setState({listOfAtoms:listOfAtoms});

        //console.log(JSON.stringify(this.state.listOfAtoms));


      this.setState({errorInteraction:"",Interaction:Interaction});

    } catch (errorMessage) {
      this.setState({errorInteraction:JSON.stringify(errorMessage)});
      console.log(errorMessage);
    }

  }

  evaluateInterface(Interface){
    try {
      var newModelInterface = iii.parser.parse(Interface,{startRule:"interface"});
      this.setState({errorInterface:""});
      var listOfAtoms=iii.interfaces.listOfAtoms(newModelInterface,"main");
      this.setState({modelInterface:newModelInterface});
      this.setState({listOfAtoms:listOfAtoms});

      //console.log(JSON.stringify(this.state.listOfAtoms));

    } catch (errorMessage) {
      this.setState({errorInterface:errorMessage});

    }
  }

  evaluateScenario(scenario) {
    /* TODO meme esprit que evaluateCode */

    try {
      var newModelScenario =JSON.parse(scenario);
      this.setState({modelScenario:newModelScenario});
      // var listOfValues=scenarioChecker.check(this.state.modelCode,newModelScenario,"main");
      // console.log("resultat =",JSON.stringify(listOfValues));
      this.setState({errorScenario:""});
      // this.setState({listOfValues:listOfValues});
      // enlever les models

  }catch (errorMessage) {
      console.log("erreur", errorMessage);
      this.setState({errorScenario:errorMessage});


  }
}

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }



  render() {
    return (
      <div className="Main">
        <CodeEditor errorInteraction={this.state.errorInteraction} errorScenario={this.state.errorScenario} errorInterface={this.state.errorInterface} Interface={this.state.Interface} Interaction={this.state.Interaction} evaluateInterface={this.evaluateInterface.bind(this)} evaluateScenario={this.evaluateScenario.bind(this)} onInteractionChange={this.onInteractionChange.bind(this)} onInterfaceChange={this.onInterfaceChange.bind(this)} modelInterface={this.state.modelInterface} modelScenario={this.state.modelScenario} scenario={this.state.scenario} onScenarioChange={this.onScenarioChange.bind(this)}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms} scenario={this.state.modelScenario}/> /* TODO on doit aussi passer le scenario en prop  */
      </div>
    );
  }
}


React.render(<Main/>, document.getElementById("main"));
