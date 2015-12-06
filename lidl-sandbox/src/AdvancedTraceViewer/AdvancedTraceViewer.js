import React, {
  PropTypes,
  Component
}
from 'react';

var brace  = require('brace');
var AceEditor  = require('react-ace');

import CircularProgress  from 'material-ui/lib/circular-progress'

require('brace/mode/json');
require('brace/theme/chrome');

export default class AdvancedTraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if (this.props.value === null ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {
    return (<div style={{width:"100%",height:"100%"}}>

    <AceEditor
      mode="json"
      theme="chrome"
      width="100%"
      height="100%"
      value={this.props.value}
      readOnly={true}
      name="traceViewerAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: Infinity}}
    />

    </div>);}
  }
}
