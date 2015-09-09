var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');
var scenarioChecker = require('./scenario.js');
var _ = require('lodash');
var rowNumber=5;

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
      Interaction: "interaction (test):{a:{e:Number in},b:{c:{d:Number in}}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
      scenario: '[{"a":{"e":2},"b":{"c":{"d":5}}},{"a":{"e":1}},{"a":{"e":0},"b":{"c":{"d":-5}}},{},{"b":{"c":{"d":10}}}]',
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
      var newModelScenario = JSON.parse(scenario);
      this.setState({
        scenario: newModelScenario
      });

      this.setState({
        errorScenario: "",
      });
      rowNumber=newModelScenario.length;
      console.log("ee",this.state.scenario);
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
        <TraceViewer listOfAtoms={this.state.listOfAtoms} scenario={this.state.scenario} tableRowNumber={this.state.tableRowNumber} fastForward={this.fastForward.bind(this)} fastBackward={this.fastBackward.bind(this)} backward={this.backward.bind(this)} forward={this.forward.bind(this)}/>
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
