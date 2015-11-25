import React, {
  PropTypes,
  Component
}
from 'react';


var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/javascript');
require('brace/theme/chrome');



export default class GeneratedCodeViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (<div style={{width:"100%"}}>
    <AceEditor
      mode="javascript"
      theme="chrome"
      value = {this.props.value}
      width="100%"
      readOnly={true}
      name="generatedEditorAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
    </div>);
  }
}
