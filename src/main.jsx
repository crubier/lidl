var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var estraverse= require('estraverse');
var iii = require('iii');



class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state={model:"dorrnnnnnnnnna"};
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

  listOfAtoms(newModel){
    return iii.interfaces.listOfAtoms(newModel,"main");
  }
  getErrorMessage() {
    return this.state.error;
  }

  render() {
    return (
      <div className="Main">
        <CodeEditor error={this.state.error} code={this.state.code} onCodeChange={this.onCodeChange.bind(this)} model={this.state.model}/>
        <TraceViewer listOfAtoms={this.state.listOfAtoms}/>
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
