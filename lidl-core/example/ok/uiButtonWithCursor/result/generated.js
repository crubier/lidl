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
var edge_13896 = inactive;
var edge_13901 = inactive;
var edge_13906 = inactive;
var edge_13911 = inactive;
var edge_13976 = inactive;
var edge_13978 = inactive;
var edge_13981 = inactive;
var edge_13982 = inactive;
var edge_13983 = inactive;
var edge_13984 = inactive;
var edge_13987 = inactive;
var edge_13991 = inactive;
var edge_13993 = inactive;
var edge_13995 = inactive;
var edge_13998 = inactive;
var edge_13999 = inactive;
var edge_14002 = inactive;
var edge_14003 = inactive;
var edge_14006 = inactive;
var edge_14007 = inactive;
var edge_14009 = inactive;
var edge_14010 = inactive;
var edge_14011 = inactive;
var edge_14012 = inactive;
var edge_14013 = inactive;
var edge_14014 = inactive;
var edge_14015 = inactive;
var edge_14016 = inactive;
var edge_14017 = inactive;
var edge_14019 = inactive;
var edge_14020 = inactive;
var edge_14021 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_13892
edge_13983 = "OK";
// node_13890
edge_13982 = 100;
// node_13888
edge_13981 = 200;
// node_13885
edge_14019 = 10;
// node_14018
edge_14020 = edge_14019;
edge_14021 = edge_14019;
// node_13883
edge_13978 = false;
// node_13977
edge_13984 = {};
edge_13984['x'] = edge_14020;
edge_13984['y'] = edge_14021;
edge_13984['width'] = edge_13981;
edge_13984['height'] = edge_13982;
edge_13984['text'] = edge_13983;
edge_13984['pushed'] = edge_13978;
// node_13881
edge_13911 = group;
// node_13879
edge_13906 = all;
// node_13877
edge_13901 = button;
// node_13875
edge_13896 = cursor;
// node_13846
edge_14009 = active;
// node_14008
edge_14010 = edge_14009;
edge_14011 = edge_14009;
edge_14012 = edge_14009;
edge_14013 = edge_14009;
edge_14014 = edge_14009;
edge_14015 = edge_14009;
edge_14016 = edge_14009;
edge_14017 = edge_14009;
// node_13904
if(edge_14012 === active && edge_13906!==null && edge_13906!==undefined) {edge_13987 = edge_13906(edge_14014);}
// node_13985
edge_13993 = edge_13987['a'];
// node_13899
if(edge_14011 === active && edge_13901!==null && edge_13901!==undefined) {edge_14006 = edge_13901(edge_13984);}
// node_14004
if(edge_14017 === active) {edge_14007 = edge_14006;}
// node_13580
edge_13995=theInterface.mouse;
// node_13992
if(edge_13993 === active) {edge_13999 = edge_13995;}
// node_13996
if(edge_14015 === active) {edge_13998 = edge_13999;}
// node_13894
if(edge_14010 === active && edge_13896!==null && edge_13896!==undefined) {edge_14002 = edge_13896(edge_13998);}
// node_14000
if(edge_14016 === active) {edge_14003 = edge_14002;}
// node_13988
edge_13991 = {};
edge_13991['a'] = edge_14003;
edge_13991['b'] = edge_14007;
// node_13909
if(edge_14013 === active && edge_13911!==null && edge_13911!==undefined) {edge_13976 = edge_13911(edge_13991);}
// node_13582
theInterface.graphics=edge_13976;


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