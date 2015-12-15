module.exports=`<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>LIDL Canvas</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    html,
    body,
    canvas {
      overflow-y: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      border: none;
    }
  </style>
</head>

<body>
  <canvas id="iiicanvas" style="cursor:none;margin:0px;border:none;padding:0px;width:100vw;height:100vh;" width="1024" height="768" />
  <script>
    ///////////////////////////////////////////////////////////
    // DEBUT  CODE iii Canvas

    var iiicanvas = document.getElementById('iiicanvas');

    iiicanvas.addEventListener("contextmenu", function(e) {
      if (e.preventDefault !== undefined)
        e.preventDefault();
      if (e.stopPropagation !== undefined)
        e.stopPropagation();
      return false;
    }, false);

    // Mouse events
    iiicanvas.addEventListener("mousemove", mouse, false);
    iiicanvas.addEventListener("mousedown", mouse, false);
    iiicanvas.addEventListener("mouseup", mouse, false);
    iiicanvas.addEventListener("wheel", mouse, false);

    // Global
    window.addEventListener("resize", resize, false);

    // Keyboard events
    iiicanvas.addEventListener("keydown", keydown, false);
    iiicanvas.addEventListener("keyup", keyup, false);

    // // Touch events
    iiicanvas.addEventListener("touchcancel", touch, false);
    iiicanvas.addEventListener("touchend", touch, false);
    iiicanvas.addEventListener("touchmove", touch, false);
    iiicanvas.addEventListener("touchstart", touch, false);

    var current = initScenario();
    resize();

    // FIN  CODE iii Canvas
    ///////////////////////////////////////////////////////////




    function initScenario() {
      var current = initializationFunction();
      current.inter = {
        layout: {
          width: 640,
          height: 480,
          x: 0,
          y: 0
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
      };
      return current;
    }









    function scenarioChanged() {

      // Compute the transition function using the lidl code
      current = transitionFunction(current);
      iiicanvas.width = current.inter.layout.width;
      iiicanvas.height = current.inter.layout.height;
      // Clear the Canvas
      iiicanvas.getContext("2d").clearRect(0, 0, current.inter.layout.width, current.inter.layout.height);
      // Draw graphics in the canvas
      draw(iiicanvas.getContext("2d"), current.inter.graphics);

    }





    function mouse(e) {
      var target = e.target;
      var rect = iiicanvas.getBoundingClientRect();
      var offsetX = (e.clientX - rect.left) * (current.inter.layout.width / rect.width);
      var offsetY = (e.clientY - rect.top) * (current.inter.layout.height / rect.height);
      current.inter.time = e.timeStamp;
      current.inter.mouse = {
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
      };
      scenarioChanged();
    }





    function resize(e) {
      var rect = iiicanvas.getBoundingClientRect();
      current.inter.layout = {
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0
      }
      if(e!==undefined){
        current.inter.time = e.timeStamp;
      }
      scenarioChanged();
    }

    function keydown(e) {
      var key;
      if (event.key !== undefined) {
        key = event.key;
      } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
        key = event.keyCode;
      }
      key = key.toLowerCase();
      if (current.inter.keyboard[key] !== true) {
        var theKeyboard = current.inter.keyboard;
        theKeyboard[key] = true;
        current.inter.time = e.timeStamp;
        current.inter.keyboard = theKeyboard;
      }
      scenarioChanged();
    }

    function keyup(e) {
      var key;
      if (event.key !== undefined) {
        key = event.key;
      } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
        key = event.keyCode;
      }
      key = key.toLowerCase();
      if (current.inter.keyboard[key] !== false) {
        var theKeyboard = current.inter.keyboard;
        theKeyboard[key] = false;
        current.inter.time = e.timeStamp;
        current.inter.keyboard = theKeyboard;
      }
      scenarioChanged();
    }


    function touch(e) {
      var rect = iiicanvas.getBoundingClientRect();
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
      current.inter.time = e.timeStamp;
      current.inter.touch = touches;
      scenarioChanged();
    }









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
          throw new Error("unexpected graphic element type \\"" + object.type + "\\"");
      }

    }









    // Generated by LIDL

    function transitionFunction(data) {
      <%=transitionFunction%>
    }

    function initializationFunction(data) {
      <%=initializationFunction%>
    }
  </script>
</body>

</html>
`
