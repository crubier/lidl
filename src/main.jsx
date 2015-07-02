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
    evaluateCode(newCode);
  }

  evaluateCode(code){
    try {
      var newModel = iii.parser.parse(code,{startRule:"interface"});
      this.setState({error:false});
      // Recuperer cela pour que cela mette a jour le tableau
      console.log(JSON.stringify(iii.interfaces.listOfAtoms(newModel,"main")));
    } catch (errorMessage) {
      this.setState({error:true});
      console.log(errorMessage);
    }
  }

  getErrorMessage() {
    // Retourner le message d'erreur
  }

  render() {
    return (
      <div className="Main">
        <CodeEditor error={this.getErrorMessage()} code={this.state.code} onCodeChange={this.changeCode.bind(this)}/>
        <TraceViewer />
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
