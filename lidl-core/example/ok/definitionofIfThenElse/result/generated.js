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
    return Math.pow(x.a,x.b);
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
    return (x.a===x.b)?true:false;
  } else {
    return inactive;
  }
};


var boolNot = function(x) {
  if (isActive(x) ) {
    return !x;
  } else {
    return inactive;
  }
};

var ifThenElse = function(x) {
  if (isActive(x) ) {
    if (isActive(x.cond) ) {
      if(x.cond ===true) {
        return x.a;
      } else if(x.cond ===false) {
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
  if (isActive(x) ) {
    if (isActive(x.cond) ) {
      if(x.cond === true) {
        return {a:active,b:inactive};
      } else if(x.cond ===false) {
        return {a:inactive,b:active};
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
  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,m:x,n:x,o:x,p:x};
};


var cursor = function(mouse){
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


///////////////////////////////////////////////////////////////////////
// Declaration of variables (Edges of the graph)
var edge_3890 = inactive;
var edge_3895 = inactive;
var edge_3905 = inactive;
var edge_3906 = inactive;
var edge_3907 = inactive;
var edge_3909 = inactive;
var edge_3911 = inactive;
var edge_3915 = inactive;
var edge_3917 = inactive;
var edge_3919 = inactive;
var edge_3921 = inactive;
var edge_3923 = inactive;
var edge_3925 = inactive;
var edge_3926 = inactive;
var edge_3927 = inactive;
var edge_3928 = inactive;
var edge_3930 = inactive;
var edge_3931 = inactive;
var edge_3932 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_3885
edge_3923 = 4;
// node_3882
edge_3919 = 3;
// node_3879
edge_3906 = 1;
// node_3877
edge_3895 = whenThenElse;
// node_3875
edge_3890 = isEqual;
// node_3866
edge_3925 = active;
// node_3924
edge_3926 = edge_3925;
edge_3927 = edge_3925;
edge_3928 = edge_3925;
// node_3846
edge_3905=theArgs.t;
// node_3904
edge_3907 = {};
edge_3907['a'] = edge_3905;
edge_3907['b'] = edge_3906;
// node_3888
if(edge_3926 === active && edge_3890!==null && edge_3890!==undefined) {edge_3909 = edge_3890(edge_3907);}
// node_3908
edge_3911 = {};
edge_3911['cond'] = edge_3909;
edge_3911['source'] = edge_3928;
// node_3893
if(edge_3927 === active && edge_3895!==null && edge_3895!==undefined) {edge_3915 = edge_3895(edge_3911);}
// node_3912
edge_3917 = edge_3915['a'];
edge_3921 = edge_3915['b'];
// node_3920
if(edge_3921 === active) {edge_3932 = edge_3923;}
// node_3916
if(edge_3917 === active) {edge_3931 = edge_3919;}
// node_3929
edge_3930=null;
if(edge_3930===null ){
  edge_3930 = edge_3931;
} else if (edge_3931 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3930 : '+edge_3930 + ' and ' + edge_3931);
}if(edge_3930===null ){
  edge_3930 = edge_3932;
} else if (edge_3932 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3930 : '+edge_3930 + ' and ' + edge_3932);
}
// node_3848
theInterface=edge_3930;


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