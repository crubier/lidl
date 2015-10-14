function isInside(x) {
  if(x === null) {
    return null;
  } else {
    if (x.rect===null || x.point === null) {
      return null;
    }
    else {
      return x.point.x >= x.rect.x && x.point.x <= x.rect.x + x.rect.width &&x.point.y >= x.rect.y && x.point.y <= x.rect.y + x.rect.height;
    }
  }
}

function and(x) {
  if(x === null) {
    return null;
  } else {
    if (x.a!==null && x.b !== null){
      return a && b;
    } else if ((x.a===null && x.b === false) || (x.b===null && x.a === false)) {
      return false;
    } else {
      return null;
    }
  }
}

function not(x) {
  if(x === null) {
    return null;
  } else {
    return !x;
  }
}

function restrictRange(x) {
  return Math.min(Math.max(x.val, x.min), x.max);
}


function ifthenelse(x) {
  if(x === null) {
    return null;
  } else {
    if(x.cond ===null) {
      return null;
    } else {
      if(x.cond) {
        return x.a;
      } else {
        return x.b;
      }
    }
  }
}

function transitionFunction(data) {

  var mainInterface = data.inter;

  var previousState = data.state;

  // input for next
  var e0 = {
    val: mainInterface.dimension.height - 500,
    min:100,
    max:400
  };

  // formulat for button height
  var e1 = restrictRange(e0);

  // size of the button
  var e2 =  {
    x: 60,
    y: 100,
    width: mainInterface.dimension.width - 120,
    height: e1
  };

  // previously the button was pushed
  var e3 = previousState.pushed;

  // input for next
  var e5 = {
    point:mainInterface.mouse.position,
    rect:e2
  };

  // cursor inside button
  var e6 = isInside(e5);

  // input for next
  var e7 = {
    a:e6,
    b:mainInterface.mouse.buttons !== 0
  };

  //  button clicked = mouse clicked and cursor inside button
  var e8 = and(e7);

  // button not previously pushed
  var e9 = not(e3);

  // input for next
  var e10 = {
    cond:e8,
    a:e9,
    b:e3
  };

  // if click on button the pushed = not previously pushed
  var e11 = ifthenelse(e10);


  var cursor = {
    type: "shadow",
    blur: mainInterface.mouse.buttons === 0 ? 20 : 10,
    offset: {
      x: 0,
      y: mainInterface.mouse.buttons === 0 ? 4 : 2
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "translate",
      x: mainInterface.mouse.position.x,
      y: mainInterface.mouse.position.y,
      content: {
        type: "scale",
        width: mainInterface.mouse.buttons === 0 ? 1 : 0.8,
        height: mainInterface.mouse.buttons === 0 ? 1 : 0.8,
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
          }
        }
      }
    }
  };

  var theButton = {
    type: "shadow",
    blur: e8 ? 10 : 20,
    offset: {
      x: 0,
      y: e8 ? 2 : 4
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "group",
      content: [{
        type: "fill",
        style: "rgba(0, 171, 255, 1)",
        content: {
          type: "rect",
          x: e2.x,
          y: e2.y,
          width: e2.width,
          height: e2.height
        }
      }, {
        type: "fill",
        style: "rgba(255, 255, 255, 1)",
        content: {
          type: "text",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: e11?"Hello World !":"Bye world ...",
          x: mainInterface.dimension.width / 2,
          y: 100 + e2.height / 2
        }
      }]
    }
  };


  var theGraphics = {
    type: "group",
    content: [
      theButton,
      cursor
    ]
  };

  return {
    memo: {},
    state: {
      pushed:e11
    },
    args: {},
    inter: {
      time: mainInterface.time,
      mouse: mainInterface.mouse,
      dimension: mainInterface.dimension,
      touch: mainInterface.touch,
      device: mainInterface.device,
      keyboard: mainInterface.keyboard,
      graphics: theGraphics
    }
  };

}

function initializationFunction() {
  return {
    memo: {},
    state: {
      pushed:false
    },
    args: {},
    inter: {
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
      dimension: {
        width: 640,
        height: 480
      },
      touch: [],
      device: {
        orientation: {
          alpha: 0,
          beta: 0,
          gamma: 0
        },
        light: 0,
        proximity: 0
      },
      keyboard: {},
      graphics: {}
    }
  };
}


module.exports = {
  transitionFunction: transitionFunction,
  initializationFunction: initializationFunction
};
