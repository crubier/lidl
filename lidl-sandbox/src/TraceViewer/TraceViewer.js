import React, {
  PropTypes,
  Component
}
from 'react';

var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/json');
require('brace/theme/chrome');

export default class TraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (<div style={{width:"100%"}}>
    <AceEditor
      mode="json"
      theme="chrome"
      width="100%"
      value={JSON.stringify(this.props.value,null,2)}
      readOnly={true}
      name="traceViewerAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
    </div>);
  }
}
