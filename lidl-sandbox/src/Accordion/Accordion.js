"use strict";
import React, {
  PropTypes,
  Component,
  Children
}
from 'react';
import _ from 'lodash'

import Paper from 'material-ui/lib/paper'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import DefaultRawTheme  from 'material-ui/lib/styles/raw-themes/light-raw-theme'

import ColorManipulator from  'material-ui/lib/utils/color-manipulator'
// import Card  from 'material-ui/lib/card/card';
// import CardHeader from 'material-ui/lib/card/card-header';
// import CardText from 'material-ui/lib/card/card-text';
// import CardExpandable from 'material-ui/lib/card/card-expandable';


export class Accordion extends Component {

  constructor(props){
    super(props);
  }

  render(){

    return (<div style={this.props.style}>
      {this.props.children}
      </div>
    );
  }
}

export class AccordionItem extends Component {

  constructor(props){
    super(props);
  }

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  }

  defaultProps = {
    expanded:false
  };

  state = {
    expanded:this.props.expanded,
    // muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    muiTheme:  ThemeManager.getMuiTheme(DefaultRawTheme)
  };

  toggleExpanded(){
    this.setState({expanded:!this.state.expanded});
  }

  render(){
    return (



      <Paper zDepth={this.state.expanded?4:0} style={{backgroundColor:(this.state.expanded?"rgba(255, 255, 255, 1)":"rgba(255, 255, 255,0)"),margin:(this.state.expanded?"16px":"0px")}}>
      <h2 style={{color:(this.state.expanded?this.state.muiTheme.appBar.textColor:"rgb(91, 91, 91)"),backgroundColor:(this.state.expanded?this.state.muiTheme.appBar.color:"rgba(255, 255, 255, 0)"),fontWeight:300,textAlign:"center",padding:"10px",cursor:"pointer"}} onClick={this.toggleExpanded.bind(this)}> {this.props.title} </h2>
      <div style={{display:(this.state.expanded?"block":"none")}}>{this.props.children}</div>
      </Paper>

    );
  }
}
