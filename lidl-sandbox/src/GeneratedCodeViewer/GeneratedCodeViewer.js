import React, {
  PropTypes,
  Component
}
from 'react';
import CircularProgress  from 'material-ui/lib/circular-progress'

var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/javascript');
require('brace/theme/chrome');



export default class GeneratedCodeViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.value === null) {
        return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
      } else {
    return (<div style={{width:"100%"}}>
    <AceEditor
      mode="javascript"
      theme="chrome"
      value = {this.props.value}
      width="100%"
      readOnly={true}
      name="generatedCodeViewerAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
    </div>);}
  }
}
