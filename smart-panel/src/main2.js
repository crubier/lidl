import React, {
  Children,
  PropTypes,
  Component
} from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

import Immutable from 'immutable'

import testModel from './testModel2';
import Model from './model';











export default class Main extends Component {

  constructor(props){
    super(props);
  }

  state = {
    model:this.props.data.model
  };

  changeHandler(ev){
    console.log('changeHandler '+ev.type);
    console.log(this.state.model);
    if(ev.type==='Select'){
      this.setState({model:simplify(select(this.state.model,_(ev.path).drop().value(),ev.index))});
    } else if (ev.type==='Close') {
      this.setState({model:simplify(close(this.state.model,_(ev.path).drop().value(),ev.index))});
    }
    console.log(this.state.model);

  }

  render() {
    return <SmartPanel onChange={this.changeHandler.bind(this)} data={{views:this.props.data.views,model:this.state.model}}/>;
  }
}










class SmartPanel extends Component {
  constructor(props){
    super(props);
  }
  handleSelect(ppath,index){
    this.props.onChange({type:'Select',path:ppath,index:index})
  }
  handleClose(ppath,index){
    this.props.onChange({type:'Close',path:ppath,index:index})
  }
  shouldComponentUpdate(nextProps, nextState){
    return !Immutable.is(this.props, nextProps) || !Immutable.is(this.state, nextState);
  }
  render(){
    let that = this;
    switch (_.get(that.props.data,that.props.path).type) {
        case "x":
          return <Split direction='row'>{_.map(_.get(that.props.data,that.props.path).content,(x,index)=>(<SmartPanel onChange={that.props.onChange} key={index} data={that.props.data} path={_(that.props.path).concat('content',index).value()}/>))}</Split>;
        case "y":
          return <Split direction='column'>{_.map(_.get(that.props.data,that.props.path).content,(x,index)=>(<SmartPanel onChange={that.props.onChange} key={index} data={that.props.data} path={_(that.props.path).concat('content',index).value()}/>))}</Split>;
        case "z":
          return <Multi onClose={this.handleClose.bind(this)}  onSelect={this.handleSelect.bind(this)} path={this.props.path} tabNames={_(_.get(that.props.data,that.props.path).content).map(x=>getName(that.props.data,x)).value()} selected={_.get(that.props.data,that.props.path).select}>{_.map(_.get(that.props.data,that.props.path).content,(x,index)=>(<SmartPanel onChange={that.props.onChange} key={index} data={that.props.data} path={_(that.props.path).concat('content',index).value()}/>))}</Multi>
        case "p":
          return  that.props.data.views[_.get(that.props.data,that.props.path).value].value;
        default:
          throw new Error ('Unknown element of type '+_.get(that.props.data,that.props.path).type+' in model');
    }
  }
}




class X extends Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState){
    return !Immutable.is(this.props, nextProps) || !Immutable.is(this.state, nextState);
  }
  render() {

  }
}





















class Split extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    separatorThickness:1
  };
  static propTypes = {
    direction:React.PropTypes.oneOf(['row', 'column']),
    separatorThickness:React.PropTypes.number,
    path:PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number]))
  };
  render() {
    let children = Children.toArray(this.props.children);
    let actualChildren = [];
    for(let i =0;i<children.length-1;i++) {
      actualChildren.push(children[i]);
      actualChildren.push(<Separator key={2*i+1} direction={this.props.direction}/>);
    }
    actualChildren.push(children[children.length-1]);
    return (<div ref='mainDiv' style={{flexGrow:1,alignSelf: 'stretch',height:'100%',width:'100%',display: 'flex',flexDirection: this.props.direction ,flexWrap: 'nowrap',backgroundColor:'rgb(255, 184, 148)'}}>
      {actualChildren}
    </div>)
  }
}




class Multi extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    selected:0,
  };
  static propTypes = {
    selected:React.PropTypes.number,
    tabNames:PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
    path:PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number]))
  };
  handleSelectTab(index){
    this.props.onSelect(this.props.path,index);
  }
  handleCloseTab(index){
    this.props.onClose(this.props.path,index);
  }
  handleDragOver(ev){
    console.log((ev.clientX - this.refs.mainDiv.offsetLeft)/(this.refs.mainDiv.offsetWidth));
  }
  render() {
    let children = Children.toArray(this.props.children);
    return (
    <div onDragOver={this.handleDragOver.bind(this)} ref='mainDiv' style={{flexGrow:1,alignSelf: 'stretch',height:'100%',width:'100%',display: 'flex',flexDirection: 'column' ,flexWrap: 'nowrap',backgroundColor:'rgb(255, 184, 148)'}}>
      <TabLine onClose={this.handleCloseTab.bind(this)} selectedIndex={this.props.selected} onSelect={this.handleSelectTab.bind(this)} tabNames={this.props.tabNames}/>
      {children[this.props.selected]}
    </div>)
  }
}



class Separator extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    separatorThickness:1,
    activeSeparatorThickness:9
  };
  static propTypes = {
    direction:React.PropTypes.oneOf(['row', 'column']),
    separatorThickness:React.PropTypes.number,
    activeSeparatorThickness:React.PropTypes.number
  };
  state = {
    over: false
  }
  handleMouseEnter () {
    this.setState({over:true});
  }
  handleMouseLeave () {
    this.setState({over:false});
  }
  handleDrag(ev){
    // console.log("handleDrag");
    // console.log(ev);
  }
  handleDragStart(ev){
    // console.log("handleDragStart");
    // console.log(ev);
  }
  handleDragEnd(ev){
    // console.log("handleDragEnd");
    // console.log(ev);
  }
  render() {
    let thickness = (this.state.over)?(this.props.activeSeparatorThickness):(this.props.separatorThickness);
    let color = (this.state.over)?'rgb(110, 110, 110)':'rgb(167, 167, 167)';
    if(this.props.direction === 'row') {
      return <div draggable="true" onDragEnd={this.handleDragEnd.bind(this)} onDragStart={this.handleDragStart.bind(this)} onDrag={this.handleDrag.bind(this)} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={{flexGrow:0,alignSelf: 'stretch',minWidth:thickness+'px',maxWidth:thickness+'px', width:thickness+'px',margin:{left:0,top:0,right:0,bottom:0},backgroundColor:color,cursor:'ew-resize'}}></div>
    }else {
      return <div draggable="true" onDragEnd={this.handleDragEnd.bind(this)} onDragStart={this.handleDragStart.bind(this)} onDrag={this.handleDrag.bind(this)} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={{flexGrow:0,alignSelf: 'stretch',minHeight:thickness+'px',maxHeight:thickness+'px',height:thickness+'px',margin:{left:0,top:0,right:0,bottom:0},backgroundColor:color,cursor:'ns-resize'}}></div>
    }
  }
}






class TabLine extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    tabHeight:30
  };
  static propTypes = {
    tabHeight:PropTypes.number,
    tabNames:PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
    selectedIndex:PropTypes.number.isRequired
  };
  handleSelect(index){
    this.props.onSelect(index);
  }
  handleClose(index){
    this.props.onClose(index);
  }
  render() {
    let color = 'rgb(88, 88, 88)';
    let children = Children.toArray(this.props.children);
    return (<div ref='mainDiv' style={{height:this.props.tabHeight,maxHeight:this.props.tabHeight,minHeight:this.props.tabHeight,width:'100%',display: 'flex',flexDirection: this.props.direction ,flexWrap: 'nowrap',backgroundColor:color}}>
      {this.props.tabNames.map((name,index)=><Tab onClose={this.handleClose.bind(this)} onSelect={this.handleSelect.bind(this)} selected={this.props.selectedIndex===index} key={name+index} index={index} name={name}/>)}
    </div>);
  }
}



class Tab extends Component {
  constructor(props){
    super(props);
  }
  static propTypes = {
    name:PropTypes.string.isRequired,
    index:PropTypes.number.isRequired,
    onSelect:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
    selected:PropTypes.bool.isRequired
  };
  state = {
    over: false
  }
  handleMouseEnter () {
    this.setState({over:true});
  }
  handleMouseLeave () {
    this.setState({over:false});
  }
  handleSelect(e) {
    e.stopPropagation();
    this.props.onSelect(this.props.index);
  }
  handleClose(e) {
    e.stopPropagation();
    this.props.onClose(this.props.index);
  }
  render() {
    let color = (this.props.selected)?('rgb(235, 235, 235)'):((this.state.over)?'rgb(191, 191, 191)':'rgb(210, 210, 210)');
    return (
    <div onClick={this.handleSelect.bind(this)} ref='mainDiv' onMouseEnter={this.handleMouseEnter.bind(this)} onMouseOver={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={{cursor:'default',flexGrow:1,flexShrink:0,backgroundColor:color,textAlign:'center',padding:'8px',display: 'flex',flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
    {this.state.over?<svg onClick={this.handleClose.bind(this)} fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="rgba(0, 0, 0, 0)"/>
    </svg>:<svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>}
    <span style={{cursor:'default',WebkitUserSelect:'none',userSelect:'none'}}>{this.props.name}</span>
    <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>);
  }
}








ReactDOM.render(<Main data={testModel}/>, document.getElementById("main"));