var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var _ = require('lodash');
var rowNumber=0;

function nbrOfPrevious(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfPrevious(x);
    if (iii.operator.parse(interaction.operator) === "Previous") {
      total++;
    }
  });
  return total;
}

function nbrOfIdentifiers(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfIdentifiers(x);
    if (iii.operator.parse(interaction.operator) === "Identifier") {
      total++;
    }
  });
  return total;
}

function nbrOfFunctions(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfFunctions(x);
    if (iii.operator.parse(interaction.operator) === "Function") {
      total++;
    }
  });
  return total;
}

function nbrOfCompositions(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfCompositions(x);
    if (iii.operator.parse(interaction.operator) === "Composition") {
      total++;
    }
  });
  return total;
}

class Main extends React.Component {constructor(props) {
    super(props);
    this.state = {
      listOfAtoms: [],
      errorInteraction: "",
      errorScenario: "",
      Interaction: "interaction (test):{time:Number in,size:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
      scenario: '[]',
      compiledInteraction: "({x:(previous(#0)),y:(#0),z:(#1)})",
      tableRowNumber:5,
      stats: {
        variables: 0,
        previous: 0,
        identifiers: 0,
        functions: 0,
        compositions:0
      }
    };
  }


  addToScenario(mainInterfaceState){
    console.log("dorra",mainInterfaceState.size.width)
    var theScenario=this.state.scenario;
    var element={time:mainInterfaceState.time,mouse : {
        buttons: mainInterfaceState.mouse.buttons,
        position: {
            x: mainInterfaceState.mouse.position.x,
            y: mainInterfaceState.mouse.position.y
        },
        wheel: {
            x: (mainInterfaceState.mouse.wheel.x !== undefined && mainInterfaceState.mouse.wheel.x !== null) ? mainInterfaceState.mouse.wheel.x : 0,
            y: (mainInterfaceState.mouse.wheel.y !== undefined && mainInterfaceState.mouse.wheel.y !== null) ? mainInterfaceState.mouse.wheel.y : 0,
            z: (mainInterfaceState.mouse.wheel.z !== undefined && mainInterfaceState.mouse.wheel.z !== null) ? mainInterfaceState.mouse.wheel.z : 0
        }
    },
    size:{
        width:mainInterfaceState.size.width,
        height:mainInterfaceState.size.height
    },
    keyboard: {
        "U+0041": false,
        "U+0040": false,
        "U+0026": false,
        "U+00E9": false,
        "U+0022": false,
        "U+0027": false,
        "U+0028": false,
        "U+00A7": false,
        "U+00E8": false,
        "U+0021": false,
        "U+00E7": false,
        "U+00E0": false,
        "U+0029": false,
        "U+002D": false,
        "U+0009": true,
        "U+005A": false,
        "U+0045": false,
        "U+0052": false,
        "U+0054": false,
        "U+0059": false,
        "U+0055": false,
        "U+0049": false,
        "U+004F": false,
        "U+0050": false,
        "Unidentified": false,
        "U+0024": false,
        "Enter": false,
        "Meta": false,
        "Control": false,
        "Alt": false,
        "Shift": false,
        "U+0051": false,
        "U+0053": false,
        "U+0044": false,
        "U+0046": false,
        "U+0047": false,
        "U+0048": false,
        "U+004A": false,
        "U+004B": false,
        "U+004C": false,
        "U+004D": false,
        "U+00F9": false,
        "U+0020": false,
        "U+003C": false,
        "U+0057": false,
        "U+0058": false,
        "U+0043": false,
        "U+0056": false,
        "U+0042": false,
        "U+004E": false,
        "U+002C": false,
        "U+003B": false,
        "U+003A": false,
        "U+003D": false,
        "Left": false,
        "Down": false,
        "Right": false,
        "Up": false,
        "U+001B": false,
        "F1": false,
        "F2": false,
        "F3": false,
        "F4": false,
        "F5": false,
        "F6": false,
        "F7": false,
        "F8": false,
        "F9": false,
        "F10": false,
        "F11": false,
        "F12": false
    }}
        console.log( "dddd",JSON.stringify(element));
    theScenario=theScenario.push(element);
    /*
    this.setState({
      scenario: theScenario
    });*/

    this.evaluateScenario(JSON.stringify(this.state.scenario));
  }

  onInteractionChange(newInteraction) {
    this.evaluateInteraction(newInteraction);
  }

  onScenarioChange(newScenario) {
    this.evaluateScenario(newScenario);
  }


  evaluateInteraction(Interaction) {
    try {
      var newModelDefinitions = iii.parser.parse(Interaction);
      var newModelInterface = newModelDefinitions[0].signature.interface;
      var listOfAtoms = iii.interfaces.listOfAtoms(newModelInterface, "main");
      this.setState({
        listOfAtoms: listOfAtoms
      });
      this.setState({
        errorInteraction: "",
        Interaction: Interaction
      });
      var compiled = iii.compiler.compileToIii(Interaction);
      this.setState({
        compiledInteraction: compiled
      });
      this.setState({
        Interaction: Interaction,
        stats: {
          variables: 0,
          previous: nbrOfPrevious(iii.identifiers.reduceIdentifiers(iii.interactions.expand(newModelDefinitions[0]).interaction)),
          identifiers: 0,
          functions: 0,
          compositions:0
        }
      });
    } catch (errorMessage) {
      this.setState({
        errorInteraction: ""+errorMessage
      });
      console.log(errorMessage);
    }

  }

  evaluateScenario(scenario) {
    try {
      true==false
      var newModelScenario = JSON.parse(scenario);
      var newModelDefinitions = iii.parser.parse(this.state.Interaction);
      var newModelInterface = newModelDefinitions[0].signature.interface;
      console.log(JSON.stringify(scenarioChecker.check(newModelInterface,newModelScenario,"main")));
      var test=scenarioChecker.check(newModelInterface,newModelScenario,"main");
      console.log("sabra "+JSON.stringify(test));
      console.log("test ",_.includes(test,false));
      _.includes(test,false)==false;
      this.setState({
        scenario: newModelScenario
      });

      this.setState({
        errorScenario: "",
      });
      rowNumber=newModelScenario.length;
      this.setState({
        tableRowNumber: rowNumber
      });
    } catch (errorMessage) {

      this.setState({
        errorScenario: ""+errorMessage

      });


    }
  }

  listOfAtoms(newModel) {
    return iii.interfaces.listOfAtoms(newModel, "main");
  }



  backward(){
      if(rowNumber>0){
        rowNumber=rowNumber-1;
      }
      this.setState({tableRowNumber:rowNumber});
  }

  forward(){
      if(rowNumber<this.state.scenario.length){
        rowNumber=rowNumber+1;
      }
      this.setState({tableRowNumber:rowNumber});

  }
  fastBackward(){
      rowNumber=0;
      this.setState({tableRowNumber:rowNumber});
  }
  fastForward(){
      rowNumber=this.state.scenario.length;
      this.setState({tableRowNumber:rowNumber});
    }

  render() {
    return (
      <div className="Main">
        <CodeEditor Interaction={this.state.Interaction}  errorInteraction={this.state.errorInteraction}  errorScenario={this.state.errorScenario} evaluateInteraction={this.evaluateInteraction.bind(this)} evaluateScenario={this.evaluateScenario.bind(this)} onInteractionChange={this.onInteractionChange.bind(this)} onScenarioChange={this.onScenarioChange.bind(this)} scenario={this.state.scenario}
        stats={this.state.stats} compiledInteraction={this.state.compiledInteraction} />
        <TraceViewer listOfAtoms={this.state.listOfAtoms} scenario={this.state.scenario} tableRowNumber={this.state.tableRowNumber} fastForward={this.fastForward.bind(this)} fastBackward={this.fastBackward.bind(this)} backward={this.backward.bind(this)} forward={this.forward.bind(this)} addToScenario={this.addToScenario.bind(this)}/>
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
