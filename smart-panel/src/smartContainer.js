"use strict";
import React, {
  Children,
  PropTypes,
  Component
} from 'react';
import Immutable, {Map, List} from 'immutable';

import SmartPanel from './SmartPanel';

export default class SmartContainer extends Component {

  constructor(props){
    super(props);
    if(this.props.model===undefined) {
      this.state = {model:Immutable.fromJS({
        "type": "z",
        "weight": 1,
        "select": 0,
        "content": Children.map(this.props.children,c=>({"type":"p","weight":1,"value":c.props.panelId}))
      })};
    } else {
      this.state = {model:Immutable.fromJS(this.props.model)};
    }
  }

  handleChange(ev){
    switch (ev.type) {
      case 'Select':
        console.log(ev.path + " >> select " +ev.index );
        this.setState({model:select(this.state.model,ev.path,ev.index)});
        break;
      default:

    }
  }

  render(){
    return <SmartPanel onChange={this.handleChange.bind(this)} model={this.state.model} views={Children.toArray(this.props.children)} path={Immutable.fromJS([])} position={Immutable.fromJS({top:0,left:0,width:1024,height:768})}/>;
  }
}

function select (model,ppath,index){
  if(ppath.isEmpty()) {
    return model.set('select',index);
  }else {
    return model.set('content',model.get('content').set(index,select(model.get('content').get(index),ppath.shift().shift(),index)));
  }
}
