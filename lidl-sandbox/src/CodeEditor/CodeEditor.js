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

export default class CodeEditor extends Component {

  constructor(props){
    super(props);
  }

    static PropTypes = {
      onChange:PropTypes.func.isRequired
    };


  render() {
    return (<div style={{width:"100%",height:"100%"}}>
      <AceEditor
          mode="text"
          theme="chrome"
          width="100%"
          height="100%"
          value={this.props.value}
          onChange={this.props.onChange}
          name="codeEditorAce"
          showPrintMargin={false}
          showGutter={true}
          editorProps={{$blockScrolling: true}}
        />
    </div>);

  }
}
