import React, {
  PropTypes,
  Component
} from 'react';

import Model from './Model';

import _ from 'lodash';

// import Node from './Node';


export default class Graph extends Component {

  static PropTypes = {
    graph:PropTypes.object.isRequired
  };

  static defaultProps = {
    graph:{
      nodes : _.range(100).map((x)=>({label:"A"+x})),
      edges:[{from:0,to:1,labelFrom:"x",labelTo:"y",label:"5"}]
    },
    dimensions:{width:800,height:800}
  };

  state = {
    model: new Model(this.props.graph),
    view:{position:{x:this.props.dimensions.width/2,y:this.props.dimensions.height/2},zoom:1},
    mouseDown:{clientPosition:{x:0,y:0},viewPosition:{x:0,y:0}},
    dragging:false
  };

  onMouseDown(event) {
    this.setState({dragging:true,mouseDown:{clientPosition:{x:event.clientX,y:event.clientY},viewPosition:this.state.view.position}});
  }

  onMouseUp(event) {
    this.setState({dragging:false});
  }

  onMouseMove(event) {
    if(this.state.dragging){
      this.setState({view:{position:{
        x:(event.clientX-this.state.mouseDown.clientPosition.x)/(this.state.view.zoom)+this.state.mouseDown.viewPosition.x,
        y:(event.clientY-this.state.mouseDown.clientPosition.y)/(this.state.view.zoom)+this.state.mouseDown.viewPosition.y
      },zoom:this.state.view.zoom}});
    }
  }

  pageToElement(coord) {
    let rect=this.refs.theGraph.getBoundingClientRect();
    return {x:coord.x-rect.left,y:coord.y-rect.top};
  }

  pageToGraph(coord) {
   return this.elementToGraph(this.pageToElement(coord));
  }

  elementToGraph(coord) {
    return {
      x:-(this.state.view.position.x)+(coord.x)/(this.state.view.zoom),
      y:-(this.state.view.position.y)+(coord.y)/(this.state.view.zoom)
    };
  }

  onWheel(event) {
    let ratio = Math.pow(1.005,event.deltaY);
    let dest = this.pageToGraph({x:event.pageX,y:event.pageY});
    event.preventDefault();
    this.setState({view:{
      position:{
        x:(this.state.view.position.x)*(ratio)-(dest.x)*(1-ratio),
        y:(this.state.view.position.y)*(ratio)-(dest.y)*(1-ratio)
      },
      zoom:(this.state.view.zoom)/(ratio)
    }});

  }

  render() {
    let nodes = this.state.model.nodes.map((x,n)=>(
      <circle key={n} cx={x.physics.position.x} cy={x.physics.position.y} r={20} fill={'rgba(0, 0, 0, 0.1)'} />
    ));
    return (
      <svg ref={"theGraph"} width={this.props.dimensions.width} height={this.props.dimensions.height} style={{cursor: 'pointer'}} onWheel={this.onWheel.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)}>
        <g transform={"scale("+this.state.view.zoom+") translate("+this.state.view.position.x+","+this.state.view.position.y+")"}>
        {nodes}
        </g>
      </svg>
    );
  }
}



















// Mouse position relative to the element
// not working on IE7 and below
function mousePositionElement(e) {
  let target = e.target;
  let rect = target.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top;
  return {x:offsetX,y:offsetY};
}
