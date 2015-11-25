import React, {
  PropTypes,
  Component
}
from 'react';


var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/javascript');
require('brace/theme/chrome');

function onChange(newValue) {
  console.log('change',newValue)
}


export default class ScenarioEditor extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (<div style={{width:"100%"}}>
    <AceEditor
      mode="javascript"
      theme="chrome"
      width="100%"
      onChange={onChange}
      name="headerEditorAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
    </div>);
  }
}
