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
var edge_14482 = inactive;
var edge_14487 = inactive;
var edge_14492 = inactive;
var edge_14497 = inactive;
var edge_14562 = inactive;
var edge_14564 = inactive;
var edge_14567 = inactive;
var edge_14568 = inactive;
var edge_14569 = inactive;
var edge_14570 = inactive;
var edge_14573 = inactive;
var edge_14577 = inactive;
var edge_14579 = inactive;
var edge_14581 = inactive;
var edge_14584 = inactive;
var edge_14585 = inactive;
var edge_14588 = inactive;
var edge_14589 = inactive;
var edge_14592 = inactive;
var edge_14593 = inactive;
var edge_14595 = inactive;
var edge_14596 = inactive;
var edge_14597 = inactive;
var edge_14598 = inactive;
var edge_14599 = inactive;
var edge_14600 = inactive;
var edge_14601 = inactive;
var edge_14602 = inactive;
var edge_14603 = inactive;
var edge_14605 = inactive;
var edge_14606 = inactive;
var edge_14607 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_14478
edge_14569 = "OK";
// node_14476
edge_14568 = 100;
// node_14474
edge_14567 = 200;
// node_14471
edge_14605 = 10;
// node_14604
edge_14606 = edge_14605;
edge_14607 = edge_14605;
// node_14469
edge_14564 = false;
// node_14563
edge_14570 = {};
edge_14570['x'] = edge_14606;
edge_14570['y'] = edge_14607;
edge_14570['width'] = edge_14567;
edge_14570['height'] = edge_14568;
edge_14570['text'] = edge_14569;
edge_14570['pushed'] = edge_14564;
// node_14467
edge_14497 = group;
// node_14465
edge_14492 = all;
// node_14463
edge_14487 = button;
// node_14461
edge_14482 = cursor;
// node_14432
edge_14595 = active;
// node_14594
edge_14596 = edge_14595;
edge_14597 = edge_14595;
edge_14598 = edge_14595;
edge_14599 = edge_14595;
edge_14600 = edge_14595;
edge_14601 = edge_14595;
edge_14602 = edge_14595;
edge_14603 = edge_14595;
// node_14490
if(edge_14598 === active && edge_14492!==null && edge_14492!==undefined) {edge_14573 = edge_14492(edge_14600);}
// node_14571
edge_14579 = edge_14573['a'];
// node_14485
if(edge_14597 === active && edge_14487!==null && edge_14487!==undefined) {edge_14592 = edge_14487(edge_14570);}
// node_14590
if(edge_14603 === active) {edge_14593 = edge_14592;}
// node_14166
edge_14581=theInterface.mouse;
// node_14578
if(edge_14579 === active) {edge_14585 = edge_14581;}
// node_14582
if(edge_14601 === active) {edge_14584 = edge_14585;}
// node_14480
if(edge_14596 === active && edge_14482!==null && edge_14482!==undefined) {edge_14588 = edge_14482(edge_14584);}
// node_14586
if(edge_14602 === active) {edge_14589 = edge_14588;}
// node_14574
edge_14577 = {};
edge_14577['a'] = edge_14589;
edge_14577['b'] = edge_14593;
// node_14495
if(edge_14599 === active && edge_14497!==null && edge_14497!==undefined) {edge_14562 = edge_14497(edge_14577);}
// node_14168
theInterface.graphics=edge_14562;


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
      state: {},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};