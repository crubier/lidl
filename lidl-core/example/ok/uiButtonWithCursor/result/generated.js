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
var edge_18668 = inactive;
var edge_18673 = inactive;
var edge_18678 = inactive;
var edge_18683 = inactive;
var edge_18748 = inactive;
var edge_18751 = inactive;
var edge_18752 = inactive;
var edge_18753 = inactive;
var edge_18756 = inactive;
var edge_18760 = inactive;
var edge_18762 = inactive;
var edge_18764 = inactive;
var edge_18767 = inactive;
var edge_18768 = inactive;
var edge_18771 = inactive;
var edge_18772 = inactive;
var edge_18775 = inactive;
var edge_18776 = inactive;
var edge_18780 = inactive;
var edge_18781 = inactive;
var edge_18782 = inactive;
var edge_18784 = inactive;
var edge_18785 = inactive;
var edge_18786 = inactive;
var edge_18787 = inactive;
var edge_18788 = inactive;
var edge_18789 = inactive;
var edge_18790 = inactive;
var edge_18791 = inactive;
var edge_18792 = inactive;
var edge_18794 = inactive;
var edge_18795 = inactive;
var edge_18796 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_18664
edge_18752 = "OK";
// node_18662
edge_18781 = 100;
// node_18660
edge_18780 = 200;
// node_18657
edge_18794 = 10;
// node_18793
edge_18795 = edge_18794;
edge_18796 = edge_18794;
// node_18777
edge_18782 = {};
edge_18782['x'] = edge_18795;
edge_18782['y'] = edge_18796;
edge_18782['width'] = edge_18780;
edge_18782['height'] = edge_18781;
// node_18655
edge_18751 = false;
// node_18749
edge_18753 = {};
edge_18753['layout'] = edge_18782;
edge_18753['text'] = edge_18752;
edge_18753['pushed'] = edge_18751;
// node_18653
edge_18683 = group;
// node_18651
edge_18678 = all;
// node_18649
edge_18673 = button;
// node_18647
edge_18668 = cursor;
// node_18618
edge_18784 = active;
// node_18783
edge_18785 = edge_18784;
edge_18786 = edge_18784;
edge_18787 = edge_18784;
edge_18788 = edge_18784;
edge_18789 = edge_18784;
edge_18790 = edge_18784;
edge_18791 = edge_18784;
edge_18792 = edge_18784;
// node_18676
if(edge_18787 === active && edge_18678!==null && edge_18678!==undefined) {edge_18756 = edge_18678(edge_18789);}
// node_18754
edge_18762 = edge_18756['a'];
// node_18671
if(edge_18786 === active && edge_18673!==null && edge_18673!==undefined) {edge_18775 = edge_18673(edge_18753);}
// node_18773
if(edge_18792 !== inactive) {edge_18776 = edge_18775;}
// node_18349
edge_18764=theInterface.mouse;
// node_18761
if(edge_18762 !== inactive) {edge_18768 = edge_18764;}
// node_18765
if(edge_18790 !== inactive) {edge_18767 = edge_18768;}
// node_18666
if(edge_18785 === active && edge_18668!==null && edge_18668!==undefined) {edge_18771 = edge_18668(edge_18767);}
// node_18769
if(edge_18791 !== inactive) {edge_18772 = edge_18771;}
// node_18757
edge_18760 = {};
edge_18760['a'] = edge_18772;
edge_18760['b'] = edge_18776;
// node_18681
if(edge_18788 === active && edge_18683!==null && edge_18683!==undefined) {edge_18748 = edge_18683(edge_18760);}
// node_18351
theInterface.graphics=edge_18748;


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