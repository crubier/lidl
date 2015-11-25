import React, {
  PropTypes,
  Component
}
from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/text');
require('brace/theme/chrome');

function onChange(newValue) {
  console.log('change',newValue)
}

export default class CodeEditor extends Component {

  constructor(props){
    super(props);
  }

  render() {
return (<div style={{width:"100%"}}>
<AceEditor
    mode="text"
    theme="chrome"
    width="100%"
    onChange={onChange}
    name="codeEditorAce"
    showPrintMargin={false}
    showGutter={true}
    editorProps={{$blockScrolling: true}}
  />
</div>);

  }
}
