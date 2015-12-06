"use strict";
import React, {
  Children,
  PropTypes,
  Component
} from 'react';
import Immutable, {Map, List} from 'immutable';

let style = {position:'absolute',left:0,top:0,right:0,bottom:0};

let tabHeight = 32;
let separatorThickness = 8;

// Function to get the name of a model as the concat of names of all views in a model
function getName(model,views) {
  switch (model.get('type')) {
    case "x":
    case "y":
    case "z":
      return model
        .get('content')
        .map(x=>getName(x,views))
        .join(', ');
      break;
    case "p":
      let res =  Children
        .toArray(views)
        .filter(c=>(c.props.panelId===model.get('value')))
        .map(c=>c.props.panelName)
        .join(', ');
      return res;
      break;
    default:
      throw new Error ('Trying to get the name of an invalid entity (type should be x,y,z,or p)');
      break;
  }
}

export default class SmartPanel extends Component {

  handleChange(){

  }
  handleDrop(e){
    if(e.dataTransfer.getData("type")==='tab'){
      e.preventDefault();
      console.log(e.dataTransfer.getData("type"));

    }
  }
  handleDragOver(e){
    console.log((e.clientX - this.refs.mainDiv.offsetLeft)/(this.refs.mainDiv.offsetWidth));
    e.preventDefault();
  }
  render(){
    // console.log(this.props.model.toJS());
      switch (this.props.model.get('type')) {

      case 'p':
        // console.log('p');

        let content =
        Children
        .toArray(this.props.views)
        .filter(c=>(c.props.panelId===this.props.model.get('value')));
        return (
          <div
            ref='mainDiv'
            onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {content}
          </div>);
        break;





      case 'z':

        let totalWeightz =
        this.props.model
        .get('content')
        .reduce(((total,submodel,index) => (total+submodel.get('weight'))),0);

        let zelements =
        this.props.model
        .get('content')
        .reduce((reduction,submodel,index)=>{
            let sizeOfCurrent = this.props.position.get('width') * submodel.get('weight') / totalWeightz ;
            let positionOfCurrent = reduction.totalPosition.last();
            let newElems = reduction.elems.push(
              <Tab
              key={index}
              onChange={this.props.onChange}
              model={submodel}
              views={this.props.views}
              path={this.props.path.push(index)}
              position={this.props.position.set('top',0).set('left',positionOfCurrent).set('width',sizeOfCurrent)}/>
            );
            return {totalPosition:reduction.totalPosition.push(positionOfCurrent+sizeOfCurrent),elems:newElems};
         },{totalPosition:List([0]),elems:List([])});
        // console.log(zelements.totalPosition.toJS());
        return  (
          <div
            ref='mainDiv'
            onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            <div style={{position:'absolute', left:0,width:this.props.position.get('width'),top:0,height:tabHeight}}>{zelements.elems.toJS()}</div>
            <SmartPanel
              onChange={this.props.onChange}
              model={this.props.model.get('content').find(x=>x.get('select'))}
              views={this.props.views}
              path={this.props.path.push(this.props.model.select)}
              position={this.props.position.set('height',this.props.position.get('height')-tabHeight).set('top',tabHeight).set('left',0)}/>
          </div>);
        break;


      case 'x':

        let totalWeightx =
        this.props.model
        .get('content')
        .reduce(((total,submodel,index) => (total+submodel.get('weight'))),0);

        let xelements =
        this.props.model
        .get('content')
        .reduce((reduction,submodel,index)=>{
            let sizeOfCurrent = this.props.position.get('width') * submodel.get('weight') / totalWeightx ;
            let positionOfCurrent = reduction.totalPosition.last();
            let newElems = reduction.elems.push(
              <SmartPanel
              key={index}
              onChange={this.props.onChange}
              model={submodel}
              views={this.props.views}
              path={this.props.path.push(index)}
              position={this.props.position.set('top',0).set('left',positionOfCurrent).set('width',sizeOfCurrent)}/>
            );
            return {totalPosition:reduction.totalPosition.push(positionOfCurrent+sizeOfCurrent),elems:newElems};
         },{totalPosition:List([0]),elems:List([])});

        let xSep =
        xelements.totalPosition
        .shift()
        .pop()
        .map((x,index)=>{
          return <SepX key={'sep'+index} onChange={this.props.onChange} path={this.props.path.push(index+0.5)} position={this.props.position.set('left',x)}/>
        })

        return  (
          <div
            ref='mainDiv'
            onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {xelements.elems.toJS()}
            {xSep}
          </div>);
        break;


        case 'y':
        let totalWeighty =
        this.props.model
        .get('content')
        .reduce(((total,submodel,index) => (total+submodel.get('weight'))),0);

        let yelements =
        this.props.model
        .get('content')
        .reduce((reduction,submodel,index)=>{
            let sizeOfCurrent = this.props.position.get('height') * submodel.get('weight') / totalWeighty ;
            let positionOfCurrent = reduction.totalPosition.last();
            let newElems = reduction.elems.push(
              <SmartPanel
              key={index}
              onChange={this.props.onChange}
              model={submodel}
              views={this.props.views}
              path={this.props.path.push(index)}
              position={this.props.position.set('left',0).set('top',positionOfCurrent).set('height',sizeOfCurrent)}/>
            );
            return {totalPosition:reduction.totalPosition.push(positionOfCurrent+sizeOfCurrent),elems:newElems};
         },{totalPosition:List([0]),elems:List([])});

         let ySep =
         yelements.totalPosition
         .shift()
         .pop()
         .map((x,index)=>{
           return <SepY key={'sep'+index} onChange={this.props.onChange} path={this.props.path.push(index+0.5)} position={this.props.position.set('top',x)}/>
         })

        return  (
          <div
            ref='mainDiv'
            onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {yelements.elems.toJS()}
            {ySep}
          </div>);
        break;


      default:
        throw new Error ('Trying to display an invalid entity (type should be x,y,z,or p)');
        break;
    }
  }
}



class SepX extends Component {
  constructor(props){
    super(props);
  }
  state = {
    over: false,
    dragging:false
  }
  handleMouseEnter () {
    this.setState({over:true});
  }
  handleMouseOver (e) {
    this.setState({over:true});
  }
  handleMouseLeave () {
    this.setState({over:false,dragging:false});
  }
  handleMouseOut(e){
  this.setState({over:false,dragging:false});

  }
  handleDragStart(e){
    // this.setState({dragging:true});
    //   e.dataTransfer.setData("fromPath", JSON.stringify(this.props.path.toJS()));
    //   e.dataTransfer.setData("type", 'sep');
    //   e.dataTransfer.effectAllowed = "move";
  }
  handleDragEnd(e){
    // this.setState({dragging:false});
      // if(e.dataTransfer.dropEffect!=='none')
      // this.props.onClose(this.props.index);
  }
  handleMouseMove(e){
//     console.log(e.button);
// console.log(e.buttons);
// console.log(e.button);
let val =(e.clientX - this.refs.mainDiv.offsetLeft)/(this.refs.mainDiv.offsetWidth)
// console.log(val);
if(this.state.dragging) {
  // console.log(this.props.path);
  this.props.onChange({type:'MoveSeparator',path:this.props.path,value:val});
}
  }

handleMouseDown(e){
this.setState({dragging:true});

}
handleMouseUp(e){
this.setState({dragging:false});

}
  render(){
    let color = (this.state.dragging)?('rgba(0, 0, 0, 0)'):((this.state.over)?'rgba(0, 0, 0, 0)':'rgba(0, 0, 0, 0)');
    let sepThickness = (this.state.dragging)?(100*separatorThickness):((this.state.over)?4*separatorThickness:separatorThickness);

    return <div
      ref={'mainDiv'}
      draggable={false}
      onMouseMove={this.handleMouseMove.bind(this)}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseOver={this.handleMouseOver.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}
onMouseOut={this.handleMouseOut.bind(this)}
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseUp={this.handleMouseUp.bind(this)}
      onDragEnd={this.handleDragEnd.bind(this)}
      onDragStart={this.handleDragStart.bind(this)}
      style={{...style, cursor:'ew-resize', userSelect:'none',WebkitUserSelect:'none', zIndex:1000, backgroundColor:color, left:this.props.position.get('left')-sepThickness/2,top:0,width:sepThickness,height:this.props.position.get('height')}}
      />
  }

}





class SepY extends Component {
  constructor(props){
    super(props);
  }
  state = {
    over: false,
    dragging:false
  }
  handleMouseEnter () {
    this.setState({over:true});
  }
  handleMouseOver (e) {
    this.setState({over:true});
  }
  handleMouseLeave () {
    this.setState({over:false,dragging:false});
  }
  handleMouseOut(e){
  this.setState({over:false,dragging:false});

  }
  handleDragStart(e){
    // this.setState({dragging:true});
    //   e.dataTransfer.setData("fromPath", JSON.stringify(this.props.path.toJS()));
    //   e.dataTransfer.setData("type", 'sep');
    //   e.dataTransfer.effectAllowed = "move";
  }
  handleDragEnd(e){
    // this.setState({dragging:false});
      // if(e.dataTransfer.dropEffect!=='none')
      // this.props.onClose(this.props.index);
  }
  handleMouseMove(e){
//     console.log(e.button);
// console.log(e.buttons);
// console.log(e.button);
let val =(e.clientY - this.refs.mainDiv.offsetTop)/(this.refs.mainDiv.offsetHeight)
// console.log(val);
if(this.state.dragging) {
  console.log(val);
  this.props.onChange({type:'MoveSeparator',path:this.props.path,value:val});
}
  }

handleMouseDown(e){
this.setState({dragging:true});

}
handleMouseUp(e){
this.setState({dragging:false});

}
  render(){
    let color = (this.state.dragging)?('rgba(0, 0, 0, 0)'):((this.state.over)?'rgba(0, 0, 0, 0)':'rgba(0, 0, 0, 0)');
    let sepThickness = (this.state.dragging)?(100*separatorThickness):((this.state.over)?4*separatorThickness:separatorThickness);

    return <div
      ref={'mainDiv'}
      draggable={false}
      onMouseMove={this.handleMouseMove.bind(this)}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseOver={this.handleMouseOver.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}
onMouseOut={this.handleMouseOut.bind(this)}
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseUp={this.handleMouseUp.bind(this)}
      onDragEnd={this.handleDragEnd.bind(this)}
      onDragStart={this.handleDragStart.bind(this)}
      style={{...style, cursor:'ns-resize', userSelect:'none',WebkitUserSelect:'none', zIndex:1000, backgroundColor:color, top:this.props.position.get('top')-sepThickness/2,left:0,height:sepThickness,width:this.props.position.get('width')}}
      />
  }

}


class Tab extends Component {
  constructor(props){
    super(props);
  }
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
    this.props.onChange({type:'Select',path:this.props.path,val:true});
  }
  handleClose(e) {
    e.stopPropagation();
    this.props.onChange({type:'Close',path:this.props.path});
  }
  handleDrop(e){
console.log(e.dataTransfer.getData("type"));
    if(e.dataTransfer.getData("type")==='tab')
  {  e.preventDefault();
    e.dataTransfer.dropEffect='move';
    let fromPath = e.dataTransfer.getData("fromPath");
    this.props.onChange({type:'TabDrop',toPath:this.props.path,fromPath:Immutable.fromJS(JSON.parse(fromPath))});
}  }
handleDragOver(e){

// if(e.dataTransfer.getData("type")==='tab')
e.preventDefault();
}
  handleDragStart(e){
    e.dataTransfer.setData("fromPath", JSON.stringify(this.props.path.toJS()));
    e.dataTransfer.setData("type", 'tab');
    e.dataTransfer.effectAllowed = "move";
  }
  handleDragEnd(e){
    // if(e.dataTransfer.dropEffect!=='none')
    // this.props.onClose(this.props.index);
  }

  render() {
    let selected = this.props.model.get('select');
    let viewName = getName(this.props.model,this.props.views);
    let color = (selected)?('rgb(235, 235, 235)'):((this.state.over)?'rgb(191, 191, 191)':'rgb(210, 210, 210)');
    return (
    <div
      draggable="true"
      onDrop={this.handleDrop.bind(this)}
      onDragOver={this.handleDragOver.bind(this)}
      onDragEnd={this.handleDragEnd.bind(this)}
      onDragStart={this.handleDragStart.bind(this)}
      onClick={this.handleSelect.bind(this)}
      ref='mainDiv'
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseOver={this.handleMouseEnter.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}
      style={{cursor:'default',position:'absolute',left:this.props.position.get('left'),top:0,boxSizing: 'border-box' ,width:this.props.position.get('width'),minWidth:this.props.position.get('width'),maxWidth:this.props.position.get('width'),height:tabHeight,minHeight:tabHeight,maxHeight:tabHeight,backgroundColor:color,textAlign:'center',padding:'8px',display: 'flex',flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>

{this.state.over?<svg onClick={this.handleClose.bind(this)} fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="rgba(0, 0, 0, 0)"/>
    </svg>:<svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>}
    <span style={{cursor:'default',WebkitUserSelect:'none',userSelect:'none'}}>{viewName}</span>
    <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>);
  }
}
