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
        "select": true,
        "content": Children.map(this.props.children,(c,i)=>({"type":"p","weight":1,"select":(i===0),"value":c.props.panelId}))
      })};
    } else {
      this.state = {model:simplify(Immutable.fromJS(this.props.model))};
    }
  }

  static defaultProps = {
    position:{top:0,left:0,width:window.innerWidth,height:window.innerHeight}
  }

  handleChange(ev){
    switch (ev.type) {
      case 'Select':
        this.setState({model:simplify(select(this.state.model,ev.path,ev.val))});
        break;
      case 'Close':
        this.setState({model:simplify(close(this.state.model,ev.path))});
        break;
      case 'TabDrop':
        this.setState({model:simplify(add(this.state.model,ev.toPath,ev.fromPath))});
        break;
      case 'MoveSeparator':
        this.setState({model:move(this.state.model,ev.path,ev.value)});
        break;
      default:

    }
    this.props.onChange();
  }

  render(){
    return (
        <SmartPanel onChange={this.handleChange.bind(this)} model={this.state.model} views={Children.toArray(this.props.children)} path={Immutable.fromJS([])} position={Immutable.fromJS(this.props.position)}/>
      );
  }
}



// Move a separator
function move (model,ppath,val){
  var res;
  if(ppath.shift().isEmpty()) {

    var normVal = val*2-1;
    var indexBefore = Math.floor(ppath.first());
    var indexAfter = Math.ceil(ppath.first());
    var before = model.get('content').get(indexBefore);
    var after = model.get('content').get(indexAfter);
    var wBefore = before.get('weight');
    var wAfter = after.get('weight');
    var wtot = wBefore+wAfter;
    var newWBefore=wBefore + normVal * wtot * 0.2;
    var newWAfter=wAfter - normVal * wtot * 0.2;
// console.log("=======================================");
// console.log(ppath.first());
// console.log(indexBefore + "   " + indexAfter);
// console.log(wBefore + "   " + wAfter);
// console.log(newWBefore + "   " + newWAfter);

    res= model
      .set('content',model
        .get('content')
        .set(indexBefore,before.set('weight',newWBefore))
        .set(indexAfter,after.set('weight',newWAfter))
      );
  } else {
    res= model
      .set('content',model
        .get('content')
        .set(ppath.first(),
          move(model.get('content').get(ppath.first()),ppath.shift(),val)));
  }
// console.log('---------------------------------------')
// console.log(""+model);
//   console.log(""+res);
  return res;
}

// Select a given tab
function select (model,ppath,val){
  var res;
  if(ppath.isEmpty()) {
    res= model
      .set('select',val);
  } else {
    res= model
      .set('content',model
        .get('content')
        .map(x=>x.merge(Immutable.fromJS({select:false})))
        .set(ppath.first(),
          select(model.get('content').get(ppath.first()),ppath.shift(),val)));
  }
  return res;
}

// Close a given tab
function close (model,ppath){
  var res;
  if(ppath.shift().isEmpty()) {
    res= model
      .set('content',model
        .get('content').delete(ppath.first()));
  } else {
    res= model
      .set('content',model
        .get('content')
        .set(ppath.first(),
          close(model.get('content').get(ppath.first()),ppath.shift())));
  }
  return res;
}

// Add a tab with a given view
function add (model,toPath,fromPath){
  var res;
  if(toPath.isEmpty() && fromPath.isEmpty()) {
    // Moving a tab on itself
    res = model;
  } else if(toPath.isEmpty() || fromPath.isEmpty()) {
    // Moving a tab into a tab bar or something
    throw new Error('Incorrect configuration move');
  } else  if(toPath.first() === fromPath.first()){
    // Recursion, this is a sub problem
    res = model
      .set('content',model
        .get('content').set(toPath.first(),
          add(model.get('content').get(toPath.first()),toPath.shift(),fromPath.shift())));
  } else if (toPath.size === 1 && fromPath.size === 1){
    // Moving a tab within the same bar (reordering tabs)
    res = model
      .set('content',model
        .get('content')
        .delete(fromPath.first())
        .splice((toPath.first()>fromPath.first())?(toPath.first()-1):(toPath.first()),0,model.get('content').get(fromPath.first()))
    );
  } else {
    // Movign between distant tabs
    let inter = get(model,fromPath);
    res = set(model,toPath,inter);
    res= close(res,fromPath);
  }
  return res;
}

function get (model,thePath) {

  var res;
  if(thePath.isEmpty()) {
    res=  model;
  } else {
    res= get(model.get('content').get(thePath.first()),thePath.shift());
  }
  return res;
}

function set (model,thePath,value) {
  var res;
  if(thePath.shift().isEmpty()) {
    res = model.set('content',model.get('content').splice(thePath.first(),0,value));
  } else {
    res = model.set('content',model.get('content').set(thePath.first(),set(model.get('content').get(thePath.first()),thePath.shift(),value)))
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
          if (el.get('type') === model.get('type') && el.get('type')!=='z') {
            return el
              .get('content')
              .map(x => x.set('weight',el.get('weight') * x.get('weight')));
          } else {
            return List([el]);
          }
        })
        .flatten(true));
      if(res.get('content').size >0){
        if(res.get('content').filter(x=>x.get('select')).size>1){
          let actualSel=res.get('content').findIndex(x=>x.get('select'));
          res=res.set('content',res.get('content').map((x,index)=>x.set('select',index===actualSel)));
        }
        if(res.get('content').filter(x=>x.get('select')).size<1){
          res=res.mergeDeep(Immutable.fromJS({content:[{select:true}]}));
        }
      }
      break;
    case "p":
      res= model;
      break;
  }
  return res;
}
