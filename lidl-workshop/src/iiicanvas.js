var canvas = document.getElementById("canvas");

if (!Date.now) {
Date.now = function() { return new Date().getTime(); };
}

function contextmenu(e) {
    if (e.preventDefault !== undefined)
        e.preventDefault();
    if (e.stopPropagation !== undefined)
        e.stopPropagation();
    return false;
}

function mouse(e) {
    var target = e.target;
    var rect = canvas.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var offsetY = e.clientY - rect.top;
    mainInterface.mouse = {
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
    mainInterface.time = e.timeStamp;
    timeStep();
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
    if (mainInterface.keyboard[key] !== true) {
        mainInterface.keyboard[key] = true;
        mainInterface.time = e.timeStamp;
        timeStep();
    }
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
    if (mainInterface.keyboard[key] !== false) {
        mainInterface.keyboard[key] = false;
        mainInterface.time = e.timeStamp;
        timeStep();
    }
}


function resize(e) {
    mainInterface.size = {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight
    };
    mainInterface.time = e.timeStamp;
    timeStep();
}

function devicemotion(e) {
    // acceleration Read only	DeviceAcceleration	The acceleration of the device. This value has taken into account the effect of gravity and removed it from the figures. This value may not exist if the hardware doesn't know how to remove gravity from the acceleration data.
    // accelerationIncludingGravity	DeviceAcceleration Read only	The acceleration of the device. This value includes the effect of gravity, and may be the only value available on devices that don't have a gyroscope to allow them to properly remove gravity from the data.
    // interval Read only	double	The interval, in milliseconds, at which the DeviceMotionEvent is fired. The next event will be fired in approximately this amount of time.
    // rotationRate Read only	DeviceRotationRate
    //TODO
}

function deviceorientation(e) {
    //   alpha Read only	double (float)	The current orientation of the device around the Z axis; that is, how far the device is rotated around a line perpendicular to the device.
    // beta Read only	double (float)	The current orientation of the device around the X axis; that is, how far the device is tipped forward or backward.
    // gamma Read only	double (float)	The current orientation of the device around the Y axis; that is, how far the device is turned left or right.
    // absolute Read only	boolean	This value is true if the orientation is provided as a difference between the device coordinate frame and the Earth coordinate frame; if the device can't detect the Earth coordinate frame, this value is false.
    mainInterface.device.orientation = {
        alpha: (e.alpha !== undefined && e.alpha !== null) ? e.alpha : 0,
        beta: (e.beta !== undefined && e.beta !== null) ? e.beta : 0,
        gamma: (e.gamma !== undefined && e.gamma !== null) ? e.gamma : 0
    };
    mainInterface.time = e.timeStamp;
    timeStep();
}

function devicelight(e) {
    //   value Read only	Double (float)	The sensor data for proximity in centimeters (cm).
    // min Read only	Double (float)	The minimum value in the range the sensor detects (if available, 0 otherwise).
    // max Read only	Double (float)	The maximum value in the range the sensor detects (if available, 0 otherwise).
    mainInterface.device.light = e.light;
    mainInterface.time = e.timeStamp;
    timeStep();
}

function deviceproximity(e) {
    // value Read only	Double (float)	The sensor data for ambient light in Lux.
    // min Read only	Double (float)	The minimum value in the range the sensor detects (if available, 0 otherwise).
    // max Read only
    mainInterface.device.proximity = e.proximity;
    mainInterface.time = e.timeStamp;
    timeStep();
}

function touch(e) {
    var rect = canvas.getBoundingClientRect();
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
    mainInterface.touch = touches;
    mainInterface.time = e.timeStamp;
    timeStep();
}



// III stuff

function timeStep() {
    canvas.setAttribute('width', mainInterface.size.width);
    canvas.setAttribute('height', mainInterface.size.height);
    iiiStep();
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, mainInterface.size.width, mainInterface.size.height);
    draw(ctx, mainInterface.graphics);
    // console.log(JSON.stringify(mainInterface));
}


var mainInterface;
var state;

setTimeout(function() {
    console.log("iii System Initialized");
    state = {startTime:Date.now()};
    mainInterface = {
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
        time: 0,
        touch: [],
        size: {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
        },
        device: {
            orientation: {
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            light: 0,
            proximity: 0
        },
        keyboard: {
            "U+0041": false,
            "U+0040": false,
            "U+0026": false,
            "U+00E9": false,
            "U+0022": false,
            "U+0027": false,
            "U+0028": false,
            "U+00A7": false,
            "U+00E8": false,
            "U+0021": false,
            "U+00E7": false,
            "U+00E0": false,
            "U+0029": false,
            "U+002D": false,
            "U+0009": true,
            "U+005A": false,
            "U+0045": false,
            "U+0052": false,
            "U+0054": false,
            "U+0059": false,
            "U+0055": false,
            "U+0049": false,
            "U+004F": false,
            "U+0050": false,
            "Unidentified": false,
            "U+0024": false,
            "Enter": false,
            "Meta": false,
            "Control": false,
            "Alt": false,
            "Shift": false,
            "U+0051": false,
            "U+0053": false,
            "U+0044": false,
            "U+0046": false,
            "U+0047": false,
            "U+0048": false,
            "U+004A": false,
            "U+004B": false,
            "U+004C": false,
            "U+004D": false,
            "U+00F9": false,
            "U+0020": false,
            "U+003C": false,
            "U+0057": false,
            "U+0058": false,
            "U+0043": false,
            "U+0056": false,
            "U+0042": false,
            "U+004E": false,
            "U+002C": false,
            "U+003B": false,
            "U+003A": false,
            "U+003D": false,
            "Left": false,
            "Down": false,
            "Right": false,
            "Up": false,
            "U+001B": false,
            "F1": false,
            "F2": false,
            "F3": false,
            "F4": false,
            "F5": false,
            "F6": false,
            "F7": false,
            "F8": false,
            "F9": false,
            "F10": false,
            "F11": false,
            "F12": false
        },
        graphics: {}
    };
    // Mouse events
    canvas.addEventListener("mousemove", mouse, false);
    canvas.addEventListener("mousedown", mouse, false);
    canvas.addEventListener("mouseup", mouse, false);
    canvas.addEventListener("wheel", mouse, false);

    // Prevent context menu
    canvas.addEventListener("contextmenu", contextmenu, false);

    // Touch events
    canvas.addEventListener("touchcancel", touch, false);
    canvas.addEventListener("touchend", touch, false);
    canvas.addEventListener("touchmove", touch, false);
    canvas.addEventListener("touchstart", touch, false);

    // Keyboard events
    canvas.addEventListener("keydown", keydown, false);
    canvas.addEventListener("keyup", keyup, false);

    // Global
    window.addEventListener("resize", resize, false);

    // Device
    // window.addEventListener("devicemotion", devicemotion, false);
    window.addEventListener("deviceorientation", deviceorientation, false);
    window.addEventListener("devicelight", devicelight, false);
    window.addEventListener("deviceproximity", deviceproximity, false);

    window.setInterval(function(){
      mainInterface.time = Date.now();
      timeStep();
    }, 1000/60);


}, 100);


function iiiStep() {

    var cursor = {
        type: "shadow",
        blur: mainInterface.mouse.buttons===0?20:10,
        offset: {
            x: 0,
            y: mainInterface.mouse.buttons===0?4:2
        },
        color: "rgba(0, 0, 0, 0.5)",
        content: {
            type: "translate",
            x: mainInterface.mouse.position.x,
            y: mainInterface.mouse.position.y,
            content: {
          type: "scale",
          width: mainInterface.mouse.buttons===0?1:0.8,
          height: mainInterface.mouse.buttons===0?1:0.8,
            content: {
                type: "fill",
                style: "rgba(200, 0, 200, 1)",
                content: {
                    type: "path",
                    content: [{
                        type: "begin"
                    }, {
                        type: "move",
                        x: 0,
                        y: 0
                    }, {
                        type: "line",
                        x: 0,
                        y: 15
                    }, {
                        type: "line",
                        x: 10.6,
                        y: 10.6
                    }, {
                        type: "close"
                    }]
                }}
            }
        }
    };

    var buttonheight=Math.min(Math.max (mainInterface.size.height - 500, 100),400);

    var buttonPushed = mainInterface.mouse.buttons == 1;

    var theButton = {
        type: "shadow",
        blur: buttonPushed?10:20,
        offset: {
            x: 0,
            y: buttonPushed?2:4
        },
        color: "rgba(0, 0, 0, 0.5)",
        content:{
            type: "group",
            content: [{
                    type: "fill",
                    style: "rgba(0, 171, 255, 1)",
                    content: {
                        type: "rect",
                        x: 60,
                        y: 100,
                        width: mainInterface.size.width - 120,
                        height: buttonheight
                    }
                },
                {
                    type: "fill",
                    style: "rgba(255, 255, 255, 1)",
                    content: {
                        type: "text",
                        textAlign: "center",
                        font:"200 30px Helvetica neue",
                        text: "Button",
                        x: mainInterface.size.width / 2,
                        y: 100+buttonheight/2
                    }
                }

            ]
        }};

    var theWindow = {
        type: "shadow",
        blur: 20,
        offset: {
            x: 0,
            y: 4
        },
        color: "rgba(0, 0, 0, 0.5)",
        content: {
            type: "group",
            content: [{
                    type: "fill",
                    style: "rgba(255, 255, 255, 1)",
                    content: {
                        type: "rect",
                        x: 30,
                        y: 30,
                        width: mainInterface.size.width - 60,
                        height: mainInterface.size.height - 60
                    }
                },
                {
                    type: "fill",
                    style: "rgba(50, 50, 50, 1)",
                    content: {
                        type: "text",
                        textAlign: "center",
                        font:"200 30px Helvetica neue",
                        text: "Time elapsed " + ((mainInterface.time - state.startTime) / 1000.0),
                        x: mainInterface.size.width / 2,
                        y: 70
                    }
                },
                theButton

            ]
        }
    };



    mainInterface.graphics = {
        type: "group",
        content: [
            theWindow,
            cursor
        ]
    };



}



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
