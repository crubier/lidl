var React = require('react');
var ReactDOM = require('react-dom');
var ScenarioEditor = require('./scenarioEditor.jsx');
var InteractionEditor = require('./interactionEditor.jsx');
var Analyse = require('./analyse.jsx');
var Canvas= require('./canvas.jsx');
var VariablesTable= require('./variablesTable.jsx');

var iii = require('iii');

var _ = require('lodash');
var compExample=require('./compExample.js');

var rowNumber = 0;




class Main extends React.Component {constructor(props) {
    super(props);
    this.state = {
      listOfAtoms: [],
      Interaction: "interaction (test):{time:Number in,dimension:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}},keyboard:{enter: Number in, meta: Number in, control: Number in, alt: Number in, shift: Number in, left: Number in, down: Number in, right: Number in, up: Number in}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
      compiledInteraction: "({x:(previous(#0)),y:(#0),z:(#1)})",
      tableRowNumber: 5,
      trace:[],
      scenarioText:'[{"time" :0}]',
      compilationResult:{
        transitionFunction:function(x){return x;},
        initializationFunction:function(){return {};}
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
          x: (mainInterfaceState.mouse.wheel.x !== undefined && mainInterfaceState.mouse.wheel.x !== null) ? mainInterfaceState.mouse.wheel.x : 0,
          y: (mainInterfaceState.mouse.wheel.y !== undefined && mainInterfaceState.mouse.wheel.y !== null) ? mainInterfaceState.mouse.wheel.y : 0,
          z: (mainInterfaceState.mouse.wheel.z !== undefined && mainInterfaceState.mouse.wheel.z !== null)? mainInterfaceState.mouse.wheel.z : 0
        }
      },
      dimension: {
        width: mainInterfaceState.dimension.width,
        height: mainInterfaceState.dimension.height
      },

      keyboard: mainInterfaceState.keyboard,
      touch: mainInterfaceState.touch
    };
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
    console.log("changeddd");
    try {
      var newModelDefinitions = iii.parser.parse(Interaction);

      var newModelInterface = newModelDefinitions[0].signature.interface;

      var listOfAtoms = iii.interfaces.listOfAtoms(newModelInterface, "main");
      this.setState({
        listOfAtoms: listOfAtoms
      });

      var compiled = iii.compiler.compileToIii(Interaction);
      this.setState({
        compiledInteraction: compiled
      });
      this.setState({
        Interaction: Interaction,
        compilationResult:compExample

      });
      this.runInteractionOnScenario();

    } catch (errorMessage) {
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
      rowNumber = newModelScenario.length;
      this.setState({
        tableRowNumber: rowNumber
      });
      this.runInteractionOnScenario();
    } catch (errorMessage) {
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
            <ScenarioEditor onScenarioChange={this.onScenarioChange.bind(this)} scenarioText={this.state.scenarioText}  Interface={iii.parser.parse(this.state.Interaction)[0].signature.interface}  />

            <InteractionEditor onInteractionChange={this.onInteractionChange.bind(this)} Interaction={this.state.Interaction} />

            <Analyse compiledInteraction={this.state.compiledInteraction} />

            <VariablesTable  backward={this.backward.bind(this)} fastBackward={this.fastBackward.bind(this)} fastForward={this.fastForward.bind(this)} forward={this.forward.bind(this)} listOfAtoms={this.state.listOfAtoms} scenario={this.state.scenario} tableRowNumber={this.state.tableRowNumber}  />

          <Canvas  addToScenario={this.addToScenario.bind(this)}    />

      </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById("main"));
