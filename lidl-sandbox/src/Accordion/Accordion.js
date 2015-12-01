"use strict";
import React, {
  PropTypes,
  Component,
  Children
}
from 'react';
import _ from 'lodash'


export class Accordion extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (<div>
      {this.props.children}
      </div>
    );
  }
}

export class AccordionItem extends Component {

  constructor(props){
    super(props);
  }

  defaultProps = {
    expanded:false
  };

  state = {
    expanded:this.props.expanded
  };

  toggleExpanded(){
    this.setState({expanded:!this.state.expanded});
  }

  render(){
    return (<div>
      <h3 className={"react-sanfona-item-title"} onClick={this.toggleExpanded.bind(this)}> {this.props.title} </h3>
      {this.state.expanded?this.props.children:""}
      </div>
    );
  }
}
