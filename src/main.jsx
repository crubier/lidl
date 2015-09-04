var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var operator = require('iii/dist/operator.js');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var scenarioInvalidException=require('./ScenarioInvalidException.js');
var _ = require('lodash');
var nbrPrevious=0;
var me=this;
console.log("me ",me);

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={listOfAtoms:[],errorInterface:"",errorInteraction:"",errorScenario:"",Interface: "{a:{e:Number in},b:{c:{d:Number in}}}",Interaction:"interaction (test):Number out with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",scenario:'[{"a":{"e":2},"b":{"c":{"d":5}}},{"a":{"e":1}},{"a":{"e":0},"b":{"c":{"d":-5}}},{},{"b":{"c":{"d":10}}}]',compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})"};
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
/*
  nbrOfPrevious(newInteraction){
    var total=0;
    console.log("hi",newInteraction[0].interaction.operand.length);
    var length=newInteraction[0].interaction.operand.length;
    _.forEach(newInteraction[0].interaction.operand,function(x){
      console.log("foreach");
      console.log(x);
      total+= nbrOfPrevious(x);
      if(iii.operator.parse(newInteraction[0].interaction.operator)==="previous"){
        console.log("ok");
        total++;
      }
    });
    console.log("total =",total);
    return total;
  }

*/


nbrOfPrevious(newInteraction){
  var total=0;
  console.log("hi",newInteraction.operand.length);
  var length=newInteraction.operand.length;
  _.forEach(newInteraction.operand,function(x){
    console.log("foreach");
    console.log(x);
    total+= this.nbrOfPrevious(x);
    console.log(operator);
    if(operator.parse(newInteraction.operator)==="previous"){
      console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      total++;
    }
  }.bind(this));
  console.log("total =",total);
  return total;
}


  evaluateInteraction(Interaction){
    try {
      var newModelInteraction = iii.parser.parse(Interaction);
      var newModelInterface = newModelInteraction[0].signature.interface;
      this.setState({errorInterface:""});
      var listOfAtoms=iii.interfaces.listOfAtoms(newModelInterface,"main");
      this.setState({Interface:newModelInterface});
      this.setState({listOfAtoms:listOfAtoms});
      this.setState({errorInteraction:"",Interaction:Interaction});
      var compiled=iii.compiler.compileToIii(this.state.Interaction);
      this.setState({compiledInteraction:compiled});
      var compiledInter=document.getElementById("compiledI");
      compiledInter.value=compiled;
      var elemI=document.getElementById("errorI");
      elemI.value="";
      console.log("dorrra");

      console.log("length  ",newModelInteraction.length);

      _.forEach(newModelInteraction,function(x){
        console.log("cccccc");
        nbrPrevious+=this.nbrOfPrevious(x.interaction);
        console.log("sadok");
      }.bind(this));

      //var nbrPrevious=this.nbrOfPrevious(newModelInteraction[0].interaction);
      var nbrPrev=document.getElementById("nbrPrevious");
      nbrPrev.value="Number of previous : "+nbrPrevious;
      console.log("doa");


    } catch (errorMessage) {
      this.setState({errorInteraction:JSON.stringify(errorMessage)});
      var compiledInter=document.getElementById("compiledI");
      compiledInter.value=errorMessage;
      console.log(errorMessage);
      var elemI=document.getElementById("errorI");
      elemI.value=errorMessage;
    }

  }

  evaluateInterface(Interface){
    try {
      var newModelInterface = iii.parser.parse(Interface,{startRule:"interface"});
      this.setState({errorInterface:""});
      var listOfAtoms=iii.interfaces.listOfAtoms(newModelInterface,"main");
      this.setState({Interface:newModelInterface});
      this.setState({listOfAtoms:listOfAtoms});
    } catch (errorMessage) {
      this.setState({errorInterface:errorMessage});

    }
  }

  evaluateScenario(scenario) {
    /* TODO meme esprit que evaluateCode */

    try {
      var newModelScenario =JSON.parse(scenario);
      this.setState({scenario:newModelScenario});
      // var listOfValues=scenarioChecker.check(this.state.modelCode,newModelScenario,"main");
      // console.log("resultat =",JSON.stringify(listOfValues));
      this.setState({errorScenario:""});
      // this.setState({listOfValues:listOfValues});
      // enlever les models
      var elem=document.getElementById("errorS");
      elem.value="";

  }catch (errorMessage) {

      this.setState({errorScenario:errorMessage});
      var elem=document.getElementById("errorS");
      elem.value=errorMessage;
      console.log("erreur main", this.state.errorScenario);

  }
}

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }


  render() {
    return (
      <div className="Main">
        <CodeEditor errorInteraction={this.state.errorInteraction} errorScenario={this.state.errorScenario} errorInterface={this.state.errorInterface} Interface={this.state.Interface} Interaction={this.state.Interaction} evaluateInterface={this.evaluateInterface.bind(this)} evaluateScenario={this.evaluateScenario.bind(this)} onInteractionChange={this.onInteractionChange.bind(this)} onInterfaceChange={this.onInterfaceChange.bind(this)} scenario={this.state.scenario} onScenarioChange={this.onScenarioChange.bind(this)}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms} scenario={this.state.scenario}/> /* TODO on doit aussi passer le scenario en prop  */
      </div>
    );
  }
}


React.render(<Main/>, document.getElementById("main"));
