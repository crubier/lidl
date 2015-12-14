function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
// Standard LIDL Header (Standard JS function definitions)
function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = "lidl_active_value";
var inactive = null;


///////////////////////////////////////////////////////////////////////
// Custom LIDL Header (Custom JS function definitions)
var isActive = function(x) {
  return (x !== null && x !== undefined);
};

var cool = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return {
      sum: (x.a + x.b),
      diff: (x.a - x.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(x) {
  return (isActive(x.a) ? x.a : x.b);
};

var return0 = function(x) {
  return 0;
};


var return1 = function(x) {
  return 1;
};

var addition = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a + x.b;
  } else {
    return inactive;
  }
};

var multiplication = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a * x.b;
  } else {
    return inactive;
  }
};

var substraction = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a - x.b;
  } else {
    return inactive;
  }
};

var division = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a / x.b;
  } else {
    return inactive;
  }
};

var remainder = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a % x.b;
  } else {
    return inactive;
  }
};

var power = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return Math.pow(x.a, x.b);
  } else {
    return inactive;
  }
};

var addOne = function(x) {
  if (isActive(x))
    return x + 1;
  else {
    return inactive;
  }
};

var identity = function(x) {
  return x;
};

var isEqual = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return (x.a === x.b) ? true : false;
  } else {
    return inactive;
  }
};


var boolNot = function(x) {
  if (isActive(x)) {
    return !x;
  } else {
    return inactive;
  }
};

var ifThenElse = function(x) {
  if (isActive(x)) {
    if (isActive(x.cond)) {
      if (x.cond === true) {
        return x.a;
      } else if (x.cond === false) {
        return x.b;
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var whenThenElse = function(x) {
  if (isActive(x)) {
    if (isActive(x.cond)) {
      if (x.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (x.cond === false) {
        return {
          a: inactive,
          b: active
        };
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var all = function(x) {
  return {
    a: x,
    b: x,
    c: x,
    d: x,
    e: x,
    f: x,
    g: x,
    h: x,
    i: x,
    j: x,
    k: x,
    l: x,
    m: x,
    n: x,
    o: x,
    p: x
  };
};


var cursor = function(mouse) {
  var cursor = {
    type: "shadow",
    blur: mouse.buttons === 0 ? 20 : 10,
    offset: {
      x: 0,
      y: mouse.buttons === 0 ? 4 : 2
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "translate",
      x: mouse.position.x,
      y: mouse.position.y,
      content: {
        type: "scale",
        width: mouse.buttons === 0 ? 1 : 0.8,
        height: mouse.buttons === 0 ? 1 : 0.8,
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
  return cursor;
}



var button = function(button) {
  var button = {
    type: "shadow",
    blur: button.pushed ? 10 : 20,
    offset: {
      x: 0,
      y: button.pushed ? 2 : 4
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "group",
      content: [{
        type: "fill",
        style: "rgba(0, 171, 255, 1)",
        content: {
          type: "rect",
          x: button.x,
          y: button.y,
          width: button.width,
          height: button.height
        }
      }, {
        type: "fill",
        style: "rgba(255, 255, 255, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: button.text,
          x: button.x + button.width / 2,
          y: button.y + button.height / 2
        }
      }]
    }
  };
  return button;
}

var group = function(elements) {
  var group = {
      type: "group",
      content: [elements.a,elements.b ]
    };
  return group;
}


///////////////////////////////////////////////////////////////////////
// Declaration of variables (Edges of the graph)
var edge_5420 = inactive;
var edge_5472 = inactive;
var edge_5474 = inactive;
var edge_5492 = inactive;
var edge_5494 = inactive;
var edge_5498 = inactive;
var edge_5500 = inactive;
var edge_5502 = inactive;
var edge_5506 = inactive;
var edge_5508 = inactive;
var edge_5512 = inactive;
var edge_5514 = inactive;
var edge_5516 = inactive;
var edge_5520 = inactive;
var edge_5531 = inactive;
var edge_5532 = inactive;
var edge_5533 = inactive;
var edge_5534 = inactive;
var edge_5535 = inactive;
var edge_5536 = inactive;
var edge_5537 = inactive;
var edge_5538 = inactive;
var edge_5539 = inactive;
var edge_5540 = inactive;
var edge_5541 = inactive;
var edge_5542 = inactive;
var edge_5543 = inactive;
var edge_5545 = inactive;
var edge_5546 = inactive;
var edge_5547 = inactive;
var edge_5549 = inactive;
var edge_5550 = inactive;
var edge_5551 = inactive;
var edge_5553 = inactive;
var edge_5554 = inactive;
var edge_5555 = inactive;
var edge_5557 = inactive;
var edge_5558 = inactive;
var edge_5559 = inactive;
var edge_5561 = inactive;
var edge_5562 = inactive;
var edge_5563 = inactive;
var edge_5565 = inactive;
var edge_5566 = inactive;
var edge_5567 = inactive;
var edge_5569 = inactive;
var edge_5570 = inactive;
var edge_5571 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_5408
edge_5553 = 1;
// node_5552
edge_5554 = edge_5553;
edge_5555 = edge_5553;
// node_5405
edge_5549 = whenThenElse;
// node_5548
edge_5550 = edge_5549;
edge_5551 = edge_5549;
// node_5403
edge_5420 = boolNot;
// node_5400
edge_5545 = isActive;
// node_5544
edge_5546 = edge_5545;
edge_5547 = edge_5545;
// node_5371
edge_5531 = active;
// node_5530
edge_5532 = edge_5531;
edge_5533 = edge_5531;
edge_5534 = edge_5531;
edge_5535 = edge_5531;
edge_5536 = edge_5531;
edge_5537 = edge_5531;
edge_5538 = edge_5531;
edge_5539 = edge_5531;
edge_5540 = edge_5531;
edge_5541 = edge_5531;
edge_5542 = edge_5531;
edge_5543 = edge_5531;
// node_5446
if(edge_5539 === active) {
edge_5514 = previousState['state_5445'];
}
// node_5442
if(edge_5538 === active) {
nextState['state_5438'] = edge_5554;
}
// node_5439
if(edge_5537 === active) {
edge_5472 = previousState['state_5438'];
}
// node_5413
if(edge_5532 === active && edge_5546!==null && edge_5546!==undefined) {edge_5474 = edge_5546(edge_5472);}
// node_5418
if(edge_5533 === active && edge_5420!==null && edge_5420!==undefined) {edge_5492 = edge_5420(edge_5474);}
// node_5491
edge_5494 = {};
edge_5494['cond'] = edge_5492;
edge_5494['source'] = edge_5541;
// node_5423
if(edge_5534 === active && edge_5550!==null && edge_5550!==undefined) {edge_5498 = edge_5550(edge_5494);}
// node_5495
edge_5508 = edge_5498['a'];
edge_5512 = edge_5498['b'];
// node_5511
if(edge_5512 === active) {edge_5563 = edge_5514;}
// node_5507
if(edge_5508 === active) {edge_5562 = edge_5555;}
// node_5560
edge_5561=null;
if(edge_5561===null ){
  edge_5561 = edge_5562;
} else if (edge_5562 !== null){
  throw new Error('Multiple active assignments to the same signal edge_5561 : '+edge_5561 + ' and ' + edge_5562);
}if(edge_5561===null ){
  edge_5561 = edge_5563;
} else if (edge_5563 !== null){
  throw new Error('Multiple active assignments to the same signal edge_5561 : '+edge_5561 + ' and ' + edge_5563);
}
// node_5097
edge_5557=theInterface.theNumber;
// node_5556
edge_5558 = edge_5557;
edge_5559 = edge_5557;
// node_5428
if(edge_5535 === active && edge_5547!==null && edge_5547!==undefined) {edge_5500 = edge_5547(edge_5558);}
// node_5499
edge_5502 = {};
edge_5502['cond'] = edge_5500;
edge_5502['source'] = edge_5542;
// node_5433
if(edge_5536 === active && edge_5551!==null && edge_5551!==undefined) {edge_5506 = edge_5551(edge_5502);}
// node_5503
edge_5516 = edge_5506['a'];
edge_5520 = edge_5506['b'];
// node_5519
if(edge_5520 === active) {edge_5571 = edge_5561;}
// node_5515
if(edge_5516 === active) {edge_5570 = edge_5559;}
// node_5568
edge_5569=null;
if(edge_5569===null ){
  edge_5569 = edge_5570;
} else if (edge_5570 !== null){
  throw new Error('Multiple active assignments to the same signal edge_5569 : '+edge_5569 + ' and ' + edge_5570);
}if(edge_5569===null ){
  edge_5569 = edge_5571;
} else if (edge_5571 !== null){
  throw new Error('Multiple active assignments to the same signal edge_5569 : '+edge_5569 + ' and ' + edge_5571);
}
// node_5524
if(edge_5543 === active) {edge_5565 = edge_5569;}
// node_5564
edge_5566 = edge_5565;
edge_5567 = edge_5565;
// node_5449
if(edge_5540 === active) {
nextState['state_5445'] = edge_5567;
}
// node_5099
theInterface.theResult=edge_5566;


///////////////////////////////////////////////////////////////////////
// Return statement
  return {
      memo: {},
      state: nextState,
      args: theArgs,
      inter: theInterface
    };

}

function initializationFunction(data){
return {
      memo: {},
      state: {state_5438:null,
state_5445:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};