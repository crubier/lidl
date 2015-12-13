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
var edge_3109 = inactive;
var edge_3114 = inactive;
var edge_3118 = inactive;
var edge_3119 = inactive;
var edge_3120 = inactive;
var edge_3123 = inactive;
var edge_3124 = inactive;
var edge_3128 = inactive;
var edge_3130 = inactive;
var edge_3132 = inactive;
var edge_3134 = inactive;
var edge_3136 = inactive;
var edge_3138 = inactive;
var edge_3139 = inactive;
var edge_3140 = inactive;
var edge_3141 = inactive;
var edge_3143 = inactive;
var edge_3144 = inactive;
var edge_3145 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_3105
edge_3136 = 4;
// node_3103
edge_3132 = 3;
// node_3101
edge_3119 = 1;
// node_3099
edge_3114 = whenThenElse;
// node_3097
edge_3109 = isEqual;
// node_3089
edge_3138 = active;
// node_3137
edge_3139 = edge_3138;
edge_3140 = edge_3138;
edge_3141 = edge_3138;
// node_3064
edge_3118=theArgs.t;
// node_3117
edge_3120 = {};
edge_3120['a'] = edge_3118;
edge_3120['b'] = edge_3119;
// node_3107
if(edge_3139 === active && edge_3109!==null && edge_3109!==undefined) {edge_3123 = edge_3109(edge_3120);}
// node_3121
edge_3124 = {};
edge_3124['cond'] = edge_3123;
edge_3124['source'] = edge_3141;
// node_3112
if(edge_3140 === active && edge_3114!==null && edge_3114!==undefined) {edge_3128 = edge_3114(edge_3124);}
// node_3125
edge_3130 = edge_3128['a'];
edge_3134 = edge_3128['b'];
// node_3133
if(edge_3134 === active) {edge_3145 = edge_3136;}
// node_3129
if(edge_3130 === active) {edge_3144 = edge_3132;}
// node_3142
edge_3143=null;
if(edge_3143===null ){
  edge_3143 = edge_3144;
} else if (edge_3144 !== null){
  throw ('error:multiple active assignments to the same signal edge_3143 : '+edge_3143 + ' and ' + edge_3144);
}if(edge_3143===null ){
  edge_3143 = edge_3145;
} else if (edge_3145 !== null){
  throw ('error:multiple active assignments to the same signal edge_3143 : '+edge_3143 + ' and ' + edge_3145);
}
// node_3066
theInterface=edge_3143;


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