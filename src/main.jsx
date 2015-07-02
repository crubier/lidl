var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');
var iii = require('iii');



class Main extends React.Component {


  constructor(props) {
    super(props);
    this.state={code:"{a:Number in,b:Number out}"};
  }

  onCodeChange(newCode) {
    this.evaluateCode(newCode);
  }

  evaluateCode(code){
    try {
      var newModel = iii.parser.parse(code,{startRule:"interface"});
      this.setState({error:""});
      // Recuperer cela pour que cela mette a jour le tableau
      console.log(JSON.stringify(iii.interfaces.listOfAtoms(newModel,"main")));
    } catch (errorMessage) {
      this.setState({error:errorMessage});
      console.log(errorMessage);
    }
  }

  getErrorMessage() {
    return this.state.error;
  }

  render() {
    return (
      <div className="Main">
        <CodeEditor error={this.state.error} code={this.state.code} onCodeChange={this.onCodeChange.bind(this)}/>
        <TraceViewer />
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
