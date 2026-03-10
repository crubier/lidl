import React, {
  PropTypes,
  Component
}
from 'react';
import CircularProgress  from 'material-ui/lib/circular-progress'

var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/text');
require('brace/theme/chrome');

export default class ExpandedCodeViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.value === null) {
          return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
        } else {
    return (<div style={{width:"100%",height:"100%"}}>
      <AceEditor
          mode="text"
          theme="chrome"
          width="100%"
          height="100%"
          readOnly={true}
          value={this.props.value}
          name="expandedCodeViewerAce"
          showPrintMargin={false}
          showGutter={true}
          editorProps={{$blockScrolling: Infinity}}
        />
    </div>);}

  }
}
