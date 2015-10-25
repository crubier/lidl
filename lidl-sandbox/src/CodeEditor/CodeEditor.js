import React, {
  PropTypes,
  Component
}
from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



export default class CodeEditor extends Component {

  render() {
return (<div style={{width:"100%"}}>
<ReactCSSTransitionGroup transitionName="block" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
<h1> Code </h1>
</ReactCSSTransitionGroup>
<textarea id="code" value = {"Bobie"} name="code" style={{width:"100%"}}/>
</div>);

  }
}
