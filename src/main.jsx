var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');



class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={listOfAtoms:[],error:""};
  }

  onCodeChange(newCode) {
    this.evaluateCode(newCode);
  }

  evaluateCode(code){
    try {
      var newModel = iii.parser.parse(code,{startRule:"interface"});
      this.setState({error:""});
      console.log("new=", newModel);
      var listOfAtoms=iii.interfaces.listOfAtoms(newModel,"main");
      console.log(JSON.stringify(listOfAtoms));
      //this.setState({model:newModel});
      this.setState({listOfAtoms:listOfAtoms});
      console.log(JSON.stringify(this.state.listOfAtoms));

    } catch (errorMessage) {
      this.setState({error:errorMessage});
      console.log(errorMessage);
    }
  }

  evaluateScenario(scenario) {
    /* TODO meme esprit que evaluateCode */
    try {
      JSON.parse(scenario);
    }
    catch (errorMessage) {
      console.log(errorMessage);
    }
  }

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }


  render() {
    return (
      <div className="Main">
        <CodeEditor error={this.state.error} code={this.state.code} onCodeChange={this.onCodeChange.bind(this)} model={this.state.model}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms}/> /* TODO on doit aussi passer le scenario en prop  */
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
