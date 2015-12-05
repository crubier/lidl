"use strict";
import React, {
  Children,
  PropTypes,
  Component
} from 'react';
import Immutable, {Map, List} from 'immutable';

let style = {position:'absolute',left:0,top:0,right:0,bottom:0};

let tabHeight = 32;

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

  handleTabClosed(index){
    this.props.onChange({type:'Close',path:this.props.path,index:index});
  }

  handleTabSelected(index){
    this.props.onChange({type:'Select',path:this.props.path,index:index});
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
          <div style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {content}
          </div>);
        break;





      case 'z':
        let tabs =
        this.props.model
        .get('content')
        .map((submodel,index)=>(<Tab
          key={index}
          name={getName(submodel,this.props.views)}
          index={index}
          onSelect={this.handleTabSelected.bind(this)}
          onClose={this.handleTabClosed.bind(this)}
          selected={this.props.model.get('select')===index}
          left={index*this.props.position.get('width') / this.props.model.get('content').size}
          width={this.props.position.get('width') / this.props.model.get('content').size}
          />));
        return  (
          <div style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            <div style={{position:'absolute', left:0,width:this.props.position.get('width'),top:0,height:tabHeight}}>{tabs}</div>
            <SmartPanel
              onChange={this.props.onChange}
              model={this.props.model.get('content').get(this.props.model.get('select'))}
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
            let positionOfCurrent = reduction.totalPosition;
            let newElems = reduction.elems.push(
              <SmartPanel
              key={index}
              onChange={this.props.onChange}
              model={submodel}
              views={this.props.views}
              path={this.props.path.push(index)}
              position={this.props.position.set('top',0).set('left',positionOfCurrent).set('width',sizeOfCurrent)}/>
            );
            return {totalPosition:positionOfCurrent+sizeOfCurrent,elems:newElems};
         },{totalPosition:0,elems:List([])})
        .elems.toJS();
        return  (
          <div style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {xelements}
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
            let positionOfCurrent = reduction.totalPosition;
            let newElems = reduction.elems.push(
              <SmartPanel
              key={index}
              onChange={this.props.onChange}
              model={submodel}
              views={this.props.views}
              path={this.props.path.push(index)}
              position={this.props.position.set('left',0).set('top',positionOfCurrent).set('height',sizeOfCurrent)}/>
            );
            return {totalPosition:positionOfCurrent+sizeOfCurrent,elems:newElems};
         },{totalPosition:0,elems:List([])})
        .elems.toJS();
        return  (
          <div style={{...style, left:this.props.position.get('left'),top:this.props.position.get('top'),width:this.props.position.get('width'),height:this.props.position.get('height')}}>
            {yelements}
          </div>);
        break;


      default:
        throw new Error ('Trying to display an invalid entity (type should be x,y,z,or p)');
        break;
    }
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
    selected:PropTypes.bool.isRequired,
    left:PropTypes.number.isRequired,
    width:PropTypes.number.isRequired
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
    <div draggable="true" onClick={this.handleSelect.bind(this)} ref='mainDiv' onMouseEnter={this.handleMouseEnter.bind(this)} onMouseOver={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={{cursor:'default',position:'absolute',left:this.props.left,top:0,boxSizing: 'border-box' ,width:this.props.width,minWidth:this.props.width,maxWidth:this.props.width,height:tabHeight,minHeight:tabHeight,maxHeight:tabHeight,backgroundColor:color,textAlign:'center',padding:'8px',display: 'flex',flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
    {this.state.over?<svg onClick={this.handleClose.bind(this)} fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="rgba(0, 0, 0, 0)"/>
    </svg>:<svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>}
    <span style={{cursor:'default',WebkitUserSelect:'none',userSelect:'none'}}>{this.props.name}</span>
    <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>);
  }
}
