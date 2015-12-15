import React, {
  PropTypes,
  Component
}
from 'react';
// import _ from 'lodash';
// import exampleResult from './compilerExampleResult';
import CircularProgress  from 'material-ui/lib/circular-progress'

// Generic retained mode rendering
function draw(ctx, object) {
    var i;
    switch (object.type) {
        case "move":
            ctx.moveTo(object.x, object.y);
            break;
        case "line":
            ctx.lineTo(object.x, object.y);
            break;
        case "cubic":
            ctx.bezierCurveTo(object.cp1x, object.cp1y, object.cp2x, object.cp2y, object.x, object.y);
            break;
        case "quadratic":
            ctx.quadraticCurveTo(object.cpx, object.cpy, object.x, object.y);
            break;
        case "arc":
            ctx.arcTo(object.x1, object.y1, object.x2, object.y2, object.radius);
            break;
        case "begin":
            ctx.beginPath();
            break;
        case "close":
            ctx.closePath();
            break;
        case "path":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        case "rect":
            ctx.beginPath();
            ctx.rect(object.x, object.y, object.width, object.height);
            break;
        case "shadow":
            ctx.save();
            ctx.shadowBlur = object.blur;
            ctx.shadowColor = object.color;
            ctx.shadowOffsetX = object.offset.x;
            ctx.shadowOffsetY = object.offset.y;
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "fill":
            ctx.save();
            ctx.fillStyle = object.style;
            draw(ctx, object.content);
            ctx.fill();
            ctx.restore();
            break;
        case "stroke":
            ctx.save();
            ctx.strokeStyle = object.style;
            draw(ctx, object.content);
            ctx.stroke();
            ctx.restore();
            break;
        case "clip":
            ctx.save();
            draw(ctx, object.region);
            ctx.clip();
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "transform":
            ctx.save();
            ctx.transform(object.a, object.b, object.c, object.d, object.e, object.f);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "scale":
            ctx.save();
            ctx.scale(object.width, object.height);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "translate":
            ctx.save();
            ctx.translate(object.x, object.y);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "rotate":
            ctx.save();
            ctx.rotate(object.angle);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "group":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        case "text":
            //TODO improve text alignement options using ctx.textMeasure()
            ctx.textAlign = object.textAlign;
            ctx.textBaseline = object.textBaseline;
            ctx.font = object.font;
            ctx.beginPath();
            ctx.fillText(object.text, object.x, object.y);
            break;
        default:
            throw new Error("unexpected graphic element type \"" + object.type + "\"");
    }

}

export default class Canvas extends Component {

  constructor(props){
    super(props);
    this.state = {
      mainInterfaceState: {
        layout: {
          width: this.props.position.width,
          height: this.props.position.height,
          x:0,
          y:0
        },
        time: 0,
        mouse: {
          buttons: 0,
          position: {
            x: 0,
            y: 0
          },
          wheel: {
            x: 0,
            y: 0,
            z: 0
          }
        },
        keyboard: {
          "Enter": false,
          "Meta": false,
          "Control": false,
          "Alt": false,
          "Shift": false,
          "Left": false,
          "Down": false,
          "Right": false,
          "Up": false
        },
        touch: [],
        graphics: {
          type: "group",
          content: []
        }
      },
      lidlOut:{memo:{},state:{},inter:{},args:{}}
    };
  }

  static defaultProps = {
    position:{top:0,left:0,width:1024,height:768}
  };

  mouse(e) {
var container=this.refs.container;
    var target = e.target;
    var rect = this.refs.iiicanvas.getBoundingClientRect();
    var offsetX = (e.clientX - rect.left)*(this.state.mainInterfaceState.layout.width/rect.width);
    var offsetY = (e.clientY - rect.top)*(this.state.mainInterfaceState.layout.height/rect.height);
    this.setState({
      mainInterfaceState:{
        layout : {
        width: container.offsetWidth,
        height: container.offsetHeight,
        x:0,
        y:0
    },
        time:e.timeStamp,
        mouse : {
          buttons: e.buttons,
          position: {
              x: offsetX,
              y: offsetY
          },
          wheel: {
              x: (e.deltaX !== undefined && e.deltaX !== null) ? e.deltaX : 0,
              y: (e.deltaY !== undefined && e.deltaY !== null) ? e.deltaY : 0,
              z: (e.deltaZ !== undefined && e.deltaZ !== null) ? e.deltaZ : 0
          }
        },
        keyboard:this.state.mainInterfaceState.keyboard,
        touch:this.state.mainInterfaceState.touch,
        graphics:this.state.mainInterfaceState.graphics
      }
    });
    this.scenarioChanged();
  }

  resize(e) {
    var container=this.refs.container;
    this.setState({mainInterfaceState:{layout : {
        width: container.offsetWidth,
        height: container.offsetHeight,
        x:0,
        y:0
    },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
    this.scenarioChanged();
  }

  keydown(e) {
var container=this.refs.container;
    var key;
    if (event.key !== undefined) {
        key = event.key;
    } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        key = event.keyCode;
    }
    key=key.toLowerCase();
    if (this.state.mainInterfaceState.keyboard[key] !== true) {
      var theKeyboard=this.state.mainInterfaceState.keyboard;
      theKeyboard[key]=true;
      this.setState({mainInterfaceState:{layout : {
        width: container.offsetWidth,
        height: container.offsetHeight,
        x:0,
        y:0
    },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
    }
    this.scenarioChanged();
  }

  keyup(e) {
var container=this.refs.container;
    var key;
    if (event.key !== undefined) {
        key = event.key;
    } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        key = event.keyCode;
    }
    key=key.toLowerCase();
    if (this.state.mainInterfaceState.keyboard[key] !== false) {
      var theKeyboard=this.state.mainInterfaceState.keyboard;
      theKeyboard[key]=false;
      this.setState({mainInterfaceState:{layout : {
        width: container.offsetWidth,
        height: container.offsetHeight,
        x:0,
        y:0
    },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
    }
    this.scenarioChanged();
  }


  touch(e) {
var container=this.refs.container;
    var rect = this.refs.iiicanvas.getBoundingClientRect();
    var i;
    var touches = [];
    for (i = 0; i < e.touches.length; i++) {
        touches[i] = {};
        var offsetX = e.touches[i].clientX - rect.left;
        var offsetY = e.touches[i].clientY - rect.top;
        touches[i].position = {
            x: offsetX,
            y: offsetY
        };
        touches[i].identifier = e.touches[i].identifier;
        touches[i].radius = {
            x: e.touches[i].radiusX,
            y: e.touches[i].radiusY
        };
        touches[i].rotationAngle = e.touches[i].rotationAngle;
        touches[i].force = e.touches[i].force;
    }
    this.setState({mainInterfaceState:{layout : {
        width: container.offsetWidth,
        height: container.offsetHeight,
        x:0,
        y:0
    },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch : touches,graphics:this.state.mainInterfaceState.graphics}});
    this.scenarioChanged();
  }

  scenarioChanged() {
    // console.log("Canvas");
    // Create the input interface
    let lidlIn = {
      memo:this.state.lidlOut.memo,
      state:this.state.lidlOut.state,
      args:this.state.lidlOut.args,
      inter: this.state.mainInterfaceState
    }
    // Compute the transition function using the lidl code
    let lidlOut = this.transitionFunction(lidlIn);
    // Get the canvas
    let canvas = this.refs.iiicanvas;
    // Clear the Canvas
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    // Draw graphics in the canvas
    draw(canvas.getContext("2d"),lidlOut.inter.graphics);
    //Set state of component for next execution step
    this.setState({lidlOut:lidlOut,mainInterfaceState:lidlOut.inter});

    // this.props.addToScenario(this.state.mainInterfaceState);
  }

  componentDidMount() {
    ///////////////////////////////////////////////////////////
    // DEBUT  CODE iii Canvas

    var iiicanvas = this.refs.iiicanvas;
    iiicanvas.addEventListener("contextmenu", function(e) {
      if (e.preventDefault !== undefined)
          e.preventDefault();
      if (e.stopPropagation !== undefined)
          e.stopPropagation();
      return false;
    }, false);

    // Mouse events
    iiicanvas.addEventListener("mousemove", this.mouse.bind(this), false);
    iiicanvas.addEventListener("mousedown", this.mouse.bind(this), false);
    iiicanvas.addEventListener("mouseup", this.mouse.bind(this), false);
    iiicanvas.addEventListener("wheel", this.mouse.bind(this), false);

    // Global
    window.addEventListener("resize", this.resize.bind(this), false);

    // Keyboard events
    iiicanvas.addEventListener("keydown", this.keydown.bind(this), false);
    iiicanvas.addEventListener("keyup", this.keyup.bind(this), false);

    // // Touch events
    iiicanvas.addEventListener("touchcancel", this.touch.bind(this), false);
    iiicanvas.addEventListener("touchend", this.touch.bind(this), false);
    iiicanvas.addEventListener("touchmove", this.touch.bind(this), false);
    iiicanvas.addEventListener("touchstart", this.touch.bind(this), false);

    // FIN  CODE iii Canvas
    ///////////////////////////////////////////////////////////


        if ( (this.props.code !==null)  && (this.props.code !== undefined)) {
          // console.log("DidMount");
          this.transitionFunction=new Function("data",this.props.code.partialSource.transitionFunction);
          this.initializationFunction=new Function("data",this.props.code.partialSource.initializationFunction);
          // console.log("OKOKOK");
          // console.log(this.initializationFunction());
          this.setState({lidlOut:this.initializationFunction()});
        }

    this.resize({timeStamp:0});


  }

  componentWillReceiveProps (nextProps){
    if ( (nextProps.code !==null)  && (nextProps.code !== undefined)) {
      // console.log("WillReceiveProps");
      this.transitionFunction=new Function("data",nextProps.code.partialSource.transitionFunction);
      this.initializationFunction=new Function("data",nextProps.code.partialSource.initializationFunction);
      // console.log("OKOKOK");
      // console.log(this.initializationFunction());
      this.setState({lidlOut:this.initializationFunction()});
    }
  }


  render() {
    // if ( this.props.code ===null  || this.props.code ===undefined) {
    //     return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    //   } else  {
    return (
        <div ref="container" style={{overflow:'hidden',position:'absolute',top:'0',left:'0',bottom:'0',right:'0'}}>
          <canvas
            ref="iiicanvas"
            style={{'backgroundColor':'rgb(217, 217, 217)' ,cursor:'none',position:'absolute',top:'0',left:'0',width:this.state.mainInterfaceState.layout.width,height:this.state.mainInterfaceState.layout.height}}
            contentEditable="true"
            tabIndex="1"
            width={this.state.mainInterfaceState.layout.width}
            height={this.state.mainInterfaceState.layout.height} ></canvas>
        </div>
    );
    // }
  }
}
