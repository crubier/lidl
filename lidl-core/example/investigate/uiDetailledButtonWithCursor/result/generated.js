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
var edge_16756 = inactive;
var edge_16761 = inactive;
var edge_16766 = inactive;
var edge_16771 = inactive;
var edge_16836 = inactive;
var edge_16838 = inactive;
var edge_16841 = inactive;
var edge_16842 = inactive;
var edge_16843 = inactive;
var edge_16844 = inactive;
var edge_16847 = inactive;
var edge_16851 = inactive;
var edge_16853 = inactive;
var edge_16855 = inactive;
var edge_16858 = inactive;
var edge_16859 = inactive;
var edge_16862 = inactive;
var edge_16863 = inactive;
var edge_16866 = inactive;
var edge_16867 = inactive;
var edge_16869 = inactive;
var edge_16870 = inactive;
var edge_16871 = inactive;
var edge_16872 = inactive;
var edge_16873 = inactive;
var edge_16874 = inactive;
var edge_16875 = inactive;
var edge_16876 = inactive;
var edge_16877 = inactive;
var edge_16879 = inactive;
var edge_16880 = inactive;
var edge_16881 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_16752
edge_16843 = "OK";
// node_16750
edge_16842 = 100;
// node_16748
edge_16841 = 200;
// node_16745
edge_16879 = 10;
// node_16878
edge_16880 = edge_16879;
edge_16881 = edge_16879;
// node_16743
edge_16838 = false;
// node_16837
edge_16844 = {};
edge_16844['x'] = edge_16880;
edge_16844['y'] = edge_16881;
edge_16844['width'] = edge_16841;
edge_16844['height'] = edge_16842;
edge_16844['text'] = edge_16843;
edge_16844['pushed'] = edge_16838;
// node_16741
edge_16771 = group;
// node_16739
edge_16766 = all;
// node_16737
edge_16761 = button;
// node_16735
edge_16756 = cursor;
// node_16706
edge_16869 = active;
// node_16868
edge_16870 = edge_16869;
edge_16871 = edge_16869;
edge_16872 = edge_16869;
edge_16873 = edge_16869;
edge_16874 = edge_16869;
edge_16875 = edge_16869;
edge_16876 = edge_16869;
edge_16877 = edge_16869;
// node_16764
if(edge_16872 === active && edge_16766!==null && edge_16766!==undefined) {edge_16847 = edge_16766(edge_16874);}
// node_16845
edge_16853 = edge_16847['a'];
// node_16759
if(edge_16871 === active && edge_16761!==null && edge_16761!==undefined) {edge_16866 = edge_16761(edge_16844);}
// node_16864
if(edge_16877 === active) {edge_16867 = edge_16866;}
// node_16440
edge_16855=theInterface.mouse;
// node_16852
if(edge_16853 === active) {edge_16859 = edge_16855;}
// node_16856
if(edge_16875 === active) {edge_16858 = edge_16859;}
// node_16754
if(edge_16870 === active && edge_16756!==null && edge_16756!==undefined) {edge_16862 = edge_16756(edge_16858);}
// node_16860
if(edge_16876 === active) {edge_16863 = edge_16862;}
// node_16848
edge_16851 = {};
edge_16851['a'] = edge_16863;
edge_16851['b'] = edge_16867;
// node_16769
if(edge_16873 === active && edge_16771!==null && edge_16771!==undefined) {edge_16836 = edge_16771(edge_16851);}
// node_16442
theInterface.graphics=edge_16836;


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