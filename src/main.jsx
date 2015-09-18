var React = require('react');
var ScenarioEditor = require('./scenarioEditor.jsx');
var InteractionEditor = require('./interactionEditor.jsx');
var Analyse = require('./analyse.jsx');
var Canvas= require('./canvas.jsx');
var VariablesTable= require('./variablesTable.jsx');

var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var _ = require('lodash');
var compExample=require('./compExample.js');

var rowNumber = 0;

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

function interactionToLowerCase(interaction){
  interaction=interaction.toLowerCase();

  var indice=interaction.indexOf("number");

  while(indice!=(-1)){
      var interaction= interaction.replace("number", "Number");
      indice=interaction.indexOf("number");
  }
  return interaction;
}

class Main extends React.Component {constructor(props) {
    super(props);
    this.state = {
      listOfAtoms: [],
      errorInteraction: "",
      errorScenario: "",
      scenarioInvalid: "",
      Interaction: "interaction (test):{time:Number in,dimension:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}},keyboard:{Enter: Number in, Meta: Number in, Control: Number in, Alt: Number in, Shift: Number in, Left: Number in, Down: Number in, Right: Number in, Up: Number in}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
      compiledInteraction: "({x:(previous(#0)),y:(#0),z:(#1)})",
      tableRowNumber: 5,
      trace:[],
      stats: {
        variables: 0,
        previous: 0,
        identifiers: 0,
        functions: 0,
        compositions: 0
      },
      scenarioText:'[{"time" :0}]',
      compilationResult:{
        transitionFunction:function(x){return x;},
        initializationFunction:function(){return {}}
      }

    };
  }


  componentDidMount() {
    this.onScenarioChange(this.state.scenarioText);
    this.onInteractionChange(this.state.Interaction);

  }
  addToScenario(mainInterfaceState) {
    var theScenario = JSON.parse(this.state.scenarioText);
    var element = {
      time: mainInterfaceState.time,
      mouse: {
        buttons: mainInterfaceState.mouse.buttons,
        position: {
          x: mainInterfaceState.mouse.position.x,
          y: mainInterfaceState.mouse.position.y
        },
        wheel: {
          x: (mainInterfaceState.mouse.wheel.x !== undefined && mainInterfaceState.mouse.wheel.x !== null)
            ? mainInterfaceState.mouse.wheel.x
            : 0,
          y: (mainInterfaceState.mouse.wheel.y !== undefined && mainInterfaceState.mouse.wheel.y !== null)
            ? mainInterfaceState.mouse.wheel.y
            : 0,
          z: (mainInterfaceState.mouse.wheel.z !== undefined && mainInterfaceState.mouse.wheel.z !== null)
            ? mainInterfaceState.mouse.wheel.z
            : 0
        }
      },
      dimension: {
        width: mainInterfaceState.dimension.width,
        height: mainInterfaceState.dimension.height
      },

      keyboard: mainInterfaceState.keyboard,
      touch: mainInterfaceState.touch
    }
    theScenario.push(element);

    this.setState({
      scenarioText: JSON.stringify(theScenario)
    });
    this.evaluateScenario(this.state.scenarioText);
  }

  onInteractionChange(newInteraction) {
    this.evaluateInteraction(newInteraction);
  }

  onScenarioChange(newScenario) {
    this.evaluateScenario(newScenario);
  }

  evaluateInteraction(Interaction) {
    try {
      var newModelDefinitions = iii.parser.parse(interactionToLowerCase(Interaction));

      var newModelInterface = newModelDefinitions[0].signature.interface;

      var listOfAtoms = iii.interfaces.listOfAtoms(newModelInterface, "main");
      this.setState({
        listOfAtoms: listOfAtoms
      });

      this.setState({
        errorInteraction: "",

      });
      var compiled = iii.compiler.compileToIii(interactionToLowerCase(Interaction));
      this.setState({
        compiledInteraction: compiled
      });
      this.setState({
        Interaction: interactionToLowerCase(Interaction),
        stats: {
          variables: 0,
          previous: nbrOfPrevious(iii.identifiers.reduceIdentifiers(iii.interactions.expand(newModelDefinitions[0]).interaction)),
          identifiers: 0,
          functions: 0,
          compositions: 0
        },
        compilationResult:compExample

      });
      this.runInteractionOnScenario();

    } catch (errorMessage) {
      this.setState({
        errorInteraction: "" + errorMessage
      });

    }

  }

  runInteractionOnScenario(){
    var trace= [this.state.compilationResult.initializationFunction()];
    for(var i=1; i<JSON.parse(this.state.scenarioText).length;i++){
       trace.push(this.state.compilationResult.transitionFunction({
         memo: trace[i-1].memo,
         state:trace[i-1].state,
         args: {},
         inter: JSON.parse(this.state.scenarioText)[i]
       }));
    }
    this.setState({trace:trace}) ;

  }

  evaluateScenario(scenario) {
    try {

      this.setState({scenarioText:scenario});
      var newModelScenario = JSON.parse(scenario);
      var newModelDefinitions = iii.parser.parse(interactionToLowerCase(this.state.Interaction));
      var newModelInterface = newModelDefinitions[0].signature.interface;
      var checker = true;
      var test = scenarioChecker.check(newModelInterface, newModelScenario, "main");
      _.map(test, function(n) {
        for (var i = 0; i < n.length; i++) {
          if (n[i] == false) {
            checker = false
          }
        }
      });
      if (checker == false) {
        this.setState({
          scenarioInvalid: "scenario does not match the definition"
        });
      } else {
        this.setState({
          scenarioInvalid: ""
        });
      }

      this.setState({
        errorScenario: ""
      });
      rowNumber = newModelScenario.length;
      this.setState({
        tableRowNumber: rowNumber
      });
      this.runInteractionOnScenario();
    } catch (errorMessage) {

      this.setState({
        errorScenario: "" + errorMessage

      });
    }
  }

  listOfAtoms(newModel) {
    return iii.interfaces.listOfAtoms(newModel, "main");
  }

  backward() {
    if (rowNumber > 0) {
      rowNumber = rowNumber - 1;
    }
    this.setState({
      tableRowNumber: rowNumber
    });
  }

  forward() {
    if (rowNumber < JSON.parse(this.state.scenarioText).length) {
      rowNumber = rowNumber + 1;
    }
    this.setState({
      tableRowNumber: rowNumber
    });

  }
  fastBackward() {
    rowNumber = 0;
    this.setState({
      tableRowNumber: rowNumber
    });
  }
  fastForward() {
    rowNumber = JSON.parse(this.state.scenarioText).length;
    this.setState({
      tableRowNumber: rowNumber
    });
  }

  render() {
    return (
      <div className="Main" overflow={"scroll"}>
            <ScenarioEditor style={{
              display: this.state.openedTab === 0
                ? 'inline-block'
                : 'none'
            }} onScenarioChange={this.onScenarioChange.bind(this)} scenarioText={this.state.scenarioText} errorScenario={this.state.errorScenario} scenarioInvalid={this.state.scenarioInvalid}  />

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

            <VariablesTable  backward={this.backward.bind(this)} fastBackward={this.fastBackward.bind(this)} fastForward={this.fastForward.bind(this)} forward={this.forward.bind(this)} listOfAtoms={this.state.listOfAtoms} scenario={this.state.scenario} tableRowNumber={this.state.tableRowNumber}  />

          <Canvas  addToScenario={this.addToScenario.bind(this)}    />

      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
