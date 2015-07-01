var React = require('react');
var iii = require('iii');

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state={openedTab:0,error:false};
  }

  openTab0(e){
    this.setState({openedTab:0});
  }

  openTab1(e){
    this.setState({openedTab:1});
  }

  componentDidMount() {
    this.evaluateCode(this.props.code);
  }

  codeChanged(e){
    this.evaluateCode(e.target.value);
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

  render() {
    return (
      <div className="CodeEditor">
        <div className="Tabs">
          <div className={this.state.openedTab===0?'Tab active':'Tab'} onClick={this.openTab0.bind(this)}>
            <span>Code editor</span>
          </div>
          <div className={this.state.openedTab===1?'Tab active':'Tab'} onClick={this.openTab1.bind(this)}>
            <span>Scenario editor</span>
          </div>
        </div>
        <div className="TabContent">
          <textarea className={this.state.error?"error":""} defaultValue={this.props.code} name="code"  style={{display:this.state.openedTab===0?'inline':'none'}} onChange={this.codeChanged.bind(this)}/>
          <textarea defaultValue={this.props.scenario} name="scenario" style={{display:this.state.openedTab===1?'inline':'none'}}/>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {code:React.PropTypes.string,scenario:React.PropTypes.string,};

CodeEditor.defaultProps =  {code:"{a:Number in,b:Number out}",scenario:"This is a scenario"};

module.exports = CodeEditor;
