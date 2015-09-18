var React = require('react');
var _ = require('lodash');

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
            ctx.font = object.font;
            ctx.beginPath();
            ctx.fillText(object.text, object.x, object.y);
            break;
        default:
            throw new Error("unexpected graphic element type \"" + object.type + "\"");
    }

}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    mainInterfaceState:{dimension:{
        width:500,
        height:500
    },time:0,mouse: {
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
      },keyboard: {
        "Enter": false,
        "Meta": false,
        "Control": false,
        "Alt": false,
        "Shift": false,
        "Left": false,
        "Down": false,
        "Right": false,
        "Up": false
    },touch: [],
    graphics: {
      type: "group",
      content: [  ]
    }
  },

};
}

  mouse(e) {
      var target = e.target;
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse : {
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
      },keyboard:this.state.mainInterfaceState.keyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
      this.scenarioChanged();
  }

  resize(e) {

      var canvas=React.findDOMNode(this.refs.iiicanvas);
      this.setState({mainInterfaceState:{dimension : {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight
      },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});

      this.scenarioChanged();
  }




  keydown(e) {

      var key;
      if (event.key !== undefined) {
          key = event.key;
      } else if (event.keyIdentifier !== undefined) {
          key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
          key = event.keyCode;
      }
      if (this.state.mainInterfaceState.keyboard[key] !== true) {
        var theKeyboard=this.state.mainInterfaceState.keyboard;
        theKeyboard[key]=true;
        this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
      }
      this.scenarioChanged();
  }

  keyup(e) {

      var key;
      if (event.key !== undefined) {
          key = event.key;
      } else if (event.keyIdentifier !== undefined) {
          key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
          key = event.keyCode;
      }
      if (this.state.mainInterfaceState.keyboard[key] !== false) {
        var theKeyboard=this.state.mainInterfaceState.keyboard;
        theKeyboard[key]=false;
        this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,graphics:this.state.mainInterfaceState.graphics}});
      }
      this.scenarioChanged();
  }


  touch(e) {
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
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
      this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch : touches,graphics:this.state.mainInterfaceState.graphics}});
      this.scenarioChanged();
  }

  scenarioChanged() {
    this.props.addToScenario(this.state.mainInterfaceState);
  }

  componentDidMount() {
    ///////////////////////////////////////////////////////////
    // DEBUT  CODE iii Canvas

    var iiicanvas = React.findDOMNode(this.refs.iiicanvas);
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
  }


  render() {

    return (
        <div className="canvasEditor" >
        <canvas ref="iiicanvas" contentEditable="true" tabIndex="1"  width={window.innerWidth/2} height={window.innerHeight-60} ></canvas>
        </div>
    );
  }
}
  Canvas.propTypes = {
  };

  Canvas.defaultProps = {
  };
  module.exports = Canvas;
