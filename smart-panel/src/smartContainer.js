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
        this.setState({model:simplify(select(this.state.model,ev.path,ev.index))});
        break;
      case 'Close':
        this.setState({model:simplify(close(this.state.model,ev.path,ev.index))});
        break;
      case 'TabDrop':
        this.setState({model:simplify(add(this.state.model,ev.path,ev.index,ev.viewId))});
        break;
      default:

    }
  }

  render(){
    return <SmartPanel onChange={this.handleChange.bind(this)} model={this.state.model} views={Children.toArray(this.props.children)} path={Immutable.fromJS([])} position={Immutable.fromJS({top:0,left:0,width:window.innerWidth,height:window.innerHeight})}/>;
  }
}

// Select a given tab
function select (model,ppath,index){
  var res;
  if(ppath.isEmpty()) {
    res= model
      .set('select',index);
  } else {
    res= model
      .set('content',model
        .get('content')
        .set(ppath.first(),
          select(model.get('content').get(ppath.first()),ppath.shift(),index)));
  }
  return res;
}

// Close a given tab
function close (model,ppath,index){
  var res;
  if(ppath.isEmpty()) {
    res= model
      .set('content',model
        .get('content').delete(index));
  } else {
    res= model
      .set('content',model
        .get('content')
        .set(ppath.first(),
          close(model.get('content').get(ppath.first()),ppath.shift(),index)));
  }
  return res;
}

// Add a tab with a given view
function add (model,ppath,index,viewId){
  var res;
  if(ppath.isEmpty()) {
    res= model
      .set('content',model
        .get('content').splice(index,0,Immutable.fromJS({type:'p',value:viewId})));
  } else {
    res= model
      .set('content',model
        .get('content')
        .set(ppath.first(),
          add(model.get('content').get(ppath.first()),ppath.shift(),index,viewId)));
  }
  return res;
}

function simplify(model) {
  var res;
  switch (model.get('type')) {
    case "x":
    case "y":
    case "z":
      res= model.set('content',
        model
        .get('content')
        .map(simplify)
        .filter((el) => (el.get('type')==="p" || el.get('content').size > 0))
        .map((el) => {
          if (el.get('type') === model.get('type')) {
            return el
              .get('content')
              .map(x => x.set('weight',el.get('weight') * x.get('weight')));
          } else {
            return List([el]);
          }
        })
        .flatten(true));
      if(res.get('select')>=res.get('content').size)
        res=res.set('select',res.get('content').size-1);
      if(res.get('select')<0)
        res=res.set('select',0);
      break;
    case "p":
      res= model;
      break;
  }
  return res;
}
