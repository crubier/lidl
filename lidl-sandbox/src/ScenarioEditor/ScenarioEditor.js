import React, {
  PropTypes,
  Component
}
from 'react';


var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/json');
require('brace/theme/chrome');

export default class ScenarioEditor extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.value === null) {
            return <div><p>Nothing yet</p></div>;
          } else {
    return (<div style={{width:"100%"}}>
    <AceEditor
      mode="json"
      theme="chrome"
      width="100%"
      onChange={this.props.onChange}
      value={this.props.value}
      name="scenarioEditorAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
    </div>);}
  }
}
