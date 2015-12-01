import React, {
  PropTypes,
  Component
} from 'react';

import Model from './Model';

import _ from 'lodash';

import CircularProgress  from 'material-ui/lib/circular-progress'

const defNumber = 40;
const defConnectivity = 1.;

export default class Graph extends Component {

  constructor(props){
    super(props);
  }

  static PropTypes = {
    graph:PropTypes.object.isRequired
  };

  static defaultProps = {
    graph:{
      nodes : _.range(defNumber).map((x)=>({label:"A"+x})),
      edges: _.range(defConnectivity*defNumber).map((x)=>({from:Math.round(Math.random()*(defNumber-1)),to:Math.round(Math.random()*(defNumber-1)),labelFrom:"x",labelTo:"y",label:"5"}))
    },
    zoom:0.25,
    dimensions:{width:800,height:800}
  };

  state = {
    model: new Model(this.props.graph),
    dimensions:this.props.dimensions,
    view:{position:{x:this.props.dimensions.width/2/(this.props.zoom),y:this.props.dimensions.height/2/(this.props.zoom)},zoom:0.25},
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
    return {x:coord.x-rect.left-window.pageXOffset,y:coord.y-rect.top-window.pageYOffset};
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

  componentDidMount(){
      let that = this;
      var graphlayoutInterval = setInterval(function(){
        if(that.state.model.step())clearInterval(graphlayoutInterval);
        that.setState({model:that.state.model});

      }, (1000.0)/(30.0));
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
  }

  resize(){
    this.setState({dimensions:{width:this.refs.theGraphDiv.offsetWidth,height:800}});
  }

  componentWillReceiveProps(nexProps) {
    let that = this;
      that.setState({model: new Model(nexProps.graph)});
        var graphlayoutInterval = setInterval(function(){
          if(that.state.model.step())clearInterval(graphlayoutInterval);
          that.setState({model:that.state.model});

        }, (1000.0)/(30.0));
    this.resize();
  }

  render() {

    if(this.state.model.physics === null) {
        return  <div ref={"theGraphDiv"} style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
      } else {

    let nodesPos = this.state.model.physics.state.current.position;

    let nodes = this.state.model.nodes.map((pt,n)=>(
      <g key={"n"+n}>
        <circle cx={nodesPos[n][0]} cy={nodesPos[n][1]} r={20} fill={'rgba(209, 209, 209, 1)'} />
        <text x={nodesPos[n][0]} y={nodesPos[n][1]}  textAnchor={"middle"} style={{
      fontFamily: 'roboto',
      fontSize  : '10',
      stroke     : 'none',
      fill       : '#000000',
      alignmentBaseline:'central'
}}>{this.state.model.nodes[n].label}</text>
      </g>
    ));

    let edges = this.state.model.edges.map((x,n)=>(
      <line key={"e"+n} x1={nodesPos[x.from][0]} y1={nodesPos[x.from][1]}
          x2={nodesPos[x.to][0]} y2={nodesPos[x.to][1]}
          stroke="rgba(177, 177, 177, 1)"
          strokeWidth="1"/>
    ));

    return (
      <div ref={"theGraphDiv"}>
      <svg ref={"theGraph"} width={this.state.dimensions.width} height={this.state.dimensions.height} style={{cursor: 'pointer',backgroundColor:"rgba(249, 249, 249, 1)"}} viewBox={"0 0 "+this.state.dimensions.width+ " "+ this.state.dimensions.height}
 onWheel={this.onWheel.bind(this)} onMouseDown={this.onMouseDown.bind(this)}
 onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)}>
        <g transform={"scale("+this.state.view.zoom+") translate("+this.state.view.position.x+","+this.state.view.position.y+")"}>
        <g>
          {edges}
        </g>
          <g>
            {nodes}
          </g>
        </g>
      </svg>
</div>
    );}
  }
}
