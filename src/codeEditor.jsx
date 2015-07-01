var React = require('react');

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state={openedTab:0};
  }

  openTab0(){
    this.setState({openedTab:0});
  }

  openTab1(){
    this.setState({openedTab:1});
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
          <textarea defaultValue={this.props.code} name="code"  style={{display:this.state.openedTab===0?'inline':'none'}}/>
          <textarea defaultValue={this.props.scenario} name="scenario" style={{display:this.state.openedTab===1?'inline':'none'}}/>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {code:React.PropTypes.string,scenario:React.PropTypes.string,};

CodeEditor.defaultProps =  {code:"This is some code",scenario:"This is a scenario"};

module.exports = CodeEditor;
