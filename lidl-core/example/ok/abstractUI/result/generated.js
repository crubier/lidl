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
var isActive = function(_) {
  return (_ !== null && _ !== undefined);
};

var cool = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return {
      sum: (_.a + _.b),
      diff: (_.a - _.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(_) {
  return (isActive(_.a) ? _.a : _.b);
};

var return0 = function(_) {
  return 0;
};


var return1 = function(_) {
  return 1;
};

var addition = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a + _.b;
  } else {
    return inactive;
  }
};

var multiplication = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a * _.b;
  } else {
    return inactive;
  }
};

var substraction = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a - _.b;
  } else {
    return inactive;
  }
};

var division = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a / _.b;
  } else {
    return inactive;
  }
};

var remainder = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a % _.b;
  } else {
    return inactive;
  }
};

var power = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return Math.pow(_.a, _.b);
  } else {
    return inactive;
  }
};

var addOne = function(_) {
  if (isActive(_))
    return _ + 1;
  else {
    return inactive;
  }
};

var identity = function(_) {
  return _;
};

var isEqual = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return (_.a === _.b) ? true : false;
  } else {
    return inactive;
  }
};


var boolNot = function(_) {
  if (isActive(_)) {
    return !_;
  } else {
    return inactive;
  }
};

var boolAnd = function(_) {
  if (isActive(_) && isActive(_.a) && isActive(_.b)) {
    return _.a && _.b;
  } else {
    return inactive;
  }
};

var boolOr = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return _.a || _.b;
  } else {
    return inactive;
  }
};

var boolXor = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return ( _.a && !_.b ) || ( !_.a && _.b ) ;
  } else {
    return inactive;
  }
};


var ifThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return _.a;
      } else if (_.cond === false) {
        return _.b;
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


var whenThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (_.cond === false) {
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


var all = function(_) {
  return {
    a: _,
    b: _,
    c: _,
    d: _,
    e: _,
    f: _,
    g: _,
    h: _,
    i: _,
    j: _,
    k: _,
    l: _,
    m: _,
    n: _,
    o: _,
    p: _
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

var toString = function(_){
  if(isActive(_)){
    return _+"";
  } else {
    return inactive;
  }
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
          x: button.layout.x,
          y: button.layout.y,
          width: button.layout.width,
          height: button.layout.height
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
          x: button.layout.x + button.layout.width / 2,
          y: button.layout.y + button.layout.height / 2
        }
      }]
    }
  };
  return button;
}




var label = function(_) {
  var label = {
        type: "fill",
        style: "rgba(56, 56, 56, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: _.text,
          x: _.layout.x + _.layout.width / 2,
          y: _.layout.y + _.layout.height / 2
        }
      };
  return label;
}



var group = function(elements) {
  var group = {
      type: "group",
      content: [elements.a,elements.b ]
    };
  return group;
}

// Checks if a point is inside a rectangle (picking)
var isInside = function(_){
  if(isActive(_) && isActive(_.point) && isActive(_.rect)){
    return _.point.x >= _.rect.x && _.point.x <= _.rect.x + _.rect.width && _.point.y >= _.rect.y && _.point.y <= _.rect.y + _.rect.height;
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var columnElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {x:_.rect.x,y:_.rect.y+_.interval.start*_.rect.height,width:_.rect.width,height:_.rect.height*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var rowElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {y:_.rect.y,x:_.rect.x+_.interval.start*_.rect.width,height:_.rect.height,width:_.rect.width*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is inset with a margin inside a bigger rectangle
var inset = function(_){
  if(isActive(_) && isActive(_.margin) && isActive(_.rect)){
    return {x:_.rect.x + _.margin,y:_.rect.y + _.margin,width:_.rect.width-2*_.margin,height:_.rect.height-2*_.margin};
  } else {
    return inactive;
  }
}


///////////////////////////////////////////////////////////////////////
// Declaration of variables (Edges of the graph)
var edge_4317 = inactive;
var edge_4322 = inactive;
var edge_4327 = inactive;
var edge_4337 = inactive;
var edge_4357 = inactive;
var edge_4415 = inactive;
var edge_4423 = inactive;
var edge_4432 = inactive;
var edge_4452 = inactive;
var edge_4454 = inactive;
var edge_4476 = inactive;
var edge_4478 = inactive;
var edge_4482 = inactive;
var edge_4484 = inactive;
var edge_4486 = inactive;
var edge_4490 = inactive;
var edge_4494 = inactive;
var edge_4496 = inactive;
var edge_4499 = inactive;
var edge_4501 = inactive;
var edge_4504 = inactive;
var edge_4506 = inactive;
var edge_4508 = inactive;
var edge_4510 = inactive;
var edge_4514 = inactive;
var edge_4519 = inactive;
var edge_4524 = inactive;
var edge_4530 = inactive;
var edge_4531 = inactive;
var edge_4534 = inactive;
var edge_4535 = inactive;
var edge_4536 = inactive;
var edge_4537 = inactive;
var edge_4538 = inactive;
var edge_4539 = inactive;
var edge_4540 = inactive;
var edge_4541 = inactive;
var edge_4542 = inactive;
var edge_4543 = inactive;
var edge_4544 = inactive;
var edge_4545 = inactive;
var edge_4546 = inactive;
var edge_4547 = inactive;
var edge_4548 = inactive;
var edge_4549 = inactive;
var edge_4550 = inactive;
var edge_4552 = inactive;
var edge_4553 = inactive;
var edge_4554 = inactive;
var edge_4556 = inactive;
var edge_4557 = inactive;
var edge_4558 = inactive;
var edge_4560 = inactive;
var edge_4561 = inactive;
var edge_4562 = inactive;
var edge_4564 = inactive;
var edge_4565 = inactive;
var edge_4566 = inactive;
var edge_4568 = inactive;
var edge_4569 = inactive;
var edge_4570 = inactive;
var edge_4572 = inactive;
var edge_4576 = inactive;
var edge_4578 = inactive;
var edge_4580 = inactive;
var edge_4581 = inactive;
var edge_4584 = inactive;
var edge_4585 = inactive;
var edge_4586 = inactive;
var edge_4588 = inactive;
var edge_4589 = inactive;
var edge_4590 = inactive;
var edge_4592 = inactive;
var edge_4593 = inactive;
var edge_4594 = inactive;
var edge_4596 = inactive;
var edge_4597 = inactive;
var edge_4598 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_4313
edge_4423 = "-";
// node_4311
edge_4415 = "+";
// node_4308
edge_4508 = 0;
// node_4302
edge_4560 = 1;
// node_4559
edge_4561 = edge_4560;
edge_4562 = edge_4560;
// node_4300
edge_4357 = all;
// node_4297
edge_4556 = whenThenElse;
// node_4555
edge_4557 = edge_4556;
edge_4558 = edge_4556;
// node_4295
edge_4337 = boolNot;
// node_4292
edge_4552 = isActive;
// node_4551
edge_4553 = edge_4552;
edge_4554 = edge_4552;
// node_4290
edge_4327 = substraction;
// node_4288
edge_4322 = addition;
// node_4286
edge_4317 = toString;
// node_4246
edge_4534 = active;
// node_4533
edge_4535 = edge_4534;
edge_4536 = edge_4534;
edge_4537 = edge_4534;
edge_4538 = edge_4534;
edge_4539 = edge_4534;
edge_4540 = edge_4534;
edge_4541 = edge_4534;
edge_4542 = edge_4534;
edge_4543 = edge_4534;
edge_4544 = edge_4534;
edge_4545 = edge_4534;
edge_4546 = edge_4534;
edge_4547 = edge_4534;
edge_4548 = edge_4534;
edge_4549 = edge_4534;
edge_4550 = edge_4534;
// node_4371
if(edge_4547 === active) {
nextState['state_4367'] = edge_4561;
}
// node_4368
if(edge_4546 === active) {
edge_4452 = previousState['state_4367'];
}
// node_4361
if(edge_4544 === active) {
edge_4564 = previousState['state_4360'];
}
// node_4563
edge_4565 = edge_4564;
edge_4566 = edge_4564;
// node_4470
edge_4568 = {};
edge_4568['a'] = edge_4565;
edge_4568['b'] = edge_4562;
// node_4567
edge_4569 = edge_4568;
edge_4570 = edge_4568;
// node_4355
if(edge_4543 === active && edge_4357!==null && edge_4357!==undefined) {edge_4494 = edge_4357(edge_4548);}
// node_4491
edge_4524 = edge_4494['a'];
edge_4530 = edge_4494['b'];
// node_4330
if(edge_4538 === active && edge_4553!==null && edge_4553!==undefined) {edge_4454 = edge_4553(edge_4452);}
// node_4335
if(edge_4539 === active && edge_4337!==null && edge_4337!==undefined) {edge_4476 = edge_4337(edge_4454);}
// node_4475
edge_4478 = {};
edge_4478['cond'] = edge_4476;
edge_4478['source'] = edge_4549;
// node_4340
if(edge_4540 === active && edge_4557!==null && edge_4557!==undefined) {edge_4482 = edge_4557(edge_4478);}
// node_4479
edge_4506 = edge_4482['a'];
edge_4510 = edge_4482['b'];
// node_4509
if(edge_4510 !== inactive) {edge_4590 = edge_4566;}
// node_4505
if(edge_4506 !== inactive) {edge_4589 = edge_4508;}
// node_4587
edge_4588=null;
if(edge_4588===null ){
  edge_4588 = edge_4589;
} else if (edge_4589 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4588 : '+edge_4588 + ' and ' + edge_4589);
}if(edge_4588===null ){
  edge_4588 = edge_4590;
} else if (edge_4590 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4588 : '+edge_4588 + ' and ' + edge_4590);
}
// node_4325
if(edge_4537 === active && edge_4327!==null && edge_4327!==undefined) {edge_4504 = edge_4327(edge_4570);}
// node_4320
if(edge_4536 === active && edge_4322!==null && edge_4322!==undefined) {edge_4499 = edge_4322(edge_4569);}
// node_3808
edge_4501=theInterface.valueManipulation.decrementButton.click;
// node_4500
if(edge_4501 !== inactive) {edge_4580 = edge_4504;}
// node_4579
edge_4581 = edge_4580;
edge_4586 = edge_4580;
// node_3806
theInterface.valueManipulation.decrementButton.text=edge_4423;
// node_3800
edge_4496=theInterface.valueManipulation.incrementButton.click;
// node_4495
if(edge_4496 !== inactive) {edge_4572 = edge_4499;}
// node_4571
edge_4578 = edge_4572;
edge_4585 = edge_4572;
// node_4583
edge_4584=null;
if(edge_4584===null ){
  edge_4584 = edge_4585;
} else if (edge_4585 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4584 : '+edge_4584 + ' and ' + edge_4585);
}if(edge_4584===null ){
  edge_4584 = edge_4586;
} else if (edge_4586 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4584 : '+edge_4584 + ' and ' + edge_4586);
}
// node_4575
edge_4576=null;
if(edge_4576===null ){
  edge_4576 = edge_4581;
} else if (edge_4581 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4576 : '+edge_4576 + ' and ' + edge_4581);
}if(edge_4576===null ){
  edge_4576 = edge_4578;
} else if (edge_4578 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4576 : '+edge_4576 + ' and ' + edge_4578);
}
// node_4345
if(edge_4541 === active && edge_4554!==null && edge_4554!==undefined) {edge_4484 = edge_4554(edge_4576);}
// node_4483
edge_4486 = {};
edge_4486['cond'] = edge_4484;
edge_4486['source'] = edge_4550;
// node_4350
if(edge_4542 === active && edge_4558!==null && edge_4558!==undefined) {edge_4490 = edge_4558(edge_4486);}
// node_4487
edge_4514 = edge_4490['a'];
edge_4519 = edge_4490['b'];
// node_4518
if(edge_4519 !== inactive) {edge_4598 = edge_4588;}
// node_4513
if(edge_4514 !== inactive) {edge_4597 = edge_4584;}
// node_4595
edge_4596=null;
if(edge_4596===null ){
  edge_4596 = edge_4597;
} else if (edge_4597 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4596 : '+edge_4596 + ' and ' + edge_4597);
}if(edge_4596===null ){
  edge_4596 = edge_4598;
} else if (edge_4598 !== null){
  throw new Error('Multiple active assignments to the same signal edge_4596 : '+edge_4596 + ' and ' + edge_4598);
}
// node_4523
if(edge_4524 !== inactive) {edge_4592 = edge_4596;}
// node_4591
edge_4593 = edge_4592;
edge_4594 = edge_4592;
// node_4529
if(edge_4530 !== inactive) {edge_4531 = edge_4594;}
// node_4315
if(edge_4535 === active && edge_4317!==null && edge_4317!==undefined) {edge_4432 = edge_4317(edge_4531);}
// node_4364
if(edge_4545 === active) {
nextState['state_4360'] = edge_4593;
}
// node_3798
theInterface.valueManipulation.incrementButton.text=edge_4415;
// node_3793
theInterface.valueLabel.text=edge_4432;


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
      state: {state_4360:null,
state_4367:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};