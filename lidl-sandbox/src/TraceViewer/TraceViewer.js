import React, {
  PropTypes,
  Component
}
from 'react';

import Table from '../Table/Table';

var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/json');
require('brace/theme/chrome');

export default class TraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if (this.props.value === null || this.props.traceAst ===null) {
      return  <div><p>Nothing yet</p></div>;
    } else  {
    return (<div style={{width:"100%"}}>

    <Table style={{width:"100%"}} columns={[
            {"displayName": 'interface.theNumber', "path": 'inter.theNumber'},
{"displayName": 'interface.theResult', "path": 'inter.theResult'}
          ]} data={this.props.traceAst} />

    <AceEditor
      mode="json"
      theme="chrome"
      width="100%"
      value={this.props.value}
      readOnly={true}
      name="traceViewerAce"
      showPrintMargin={false}
      showGutter={true}
      editorProps={{$blockScrolling: true}}
    />
<div>

</div>
    </div>);}
  }
}
