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
var edge_3179 = inactive;
var edge_3184 = inactive;
var edge_3188 = inactive;
var edge_3189 = inactive;
var edge_3190 = inactive;
var edge_3193 = inactive;
var edge_3194 = inactive;
var edge_3198 = inactive;
var edge_3200 = inactive;
var edge_3202 = inactive;
var edge_3204 = inactive;
var edge_3206 = inactive;
var edge_3208 = inactive;
var edge_3209 = inactive;
var edge_3210 = inactive;
var edge_3211 = inactive;
var edge_3213 = inactive;
var edge_3214 = inactive;
var edge_3215 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_3175
edge_3206 = 4;
// node_3173
edge_3202 = 3;
// node_3171
edge_3189 = 1;
// node_3169
edge_3184 = whenThenElse;
// node_3167
edge_3179 = isEqual;
// node_3159
edge_3208 = active;
// node_3207
edge_3209 = edge_3208;
edge_3210 = edge_3208;
edge_3211 = edge_3208;
// node_3131
edge_3188=theArgs.t;
// node_3187
edge_3190 = {};
edge_3190['a'] = edge_3188;
edge_3190['b'] = edge_3189;
// node_3177
if(edge_3209 === active && edge_3179!==null && edge_3179!==undefined) {edge_3193 = edge_3179(edge_3190);}
// node_3191
edge_3194 = {};
edge_3194['cond'] = edge_3193;
edge_3194['source'] = edge_3211;
// node_3182
if(edge_3210 === active && edge_3184!==null && edge_3184!==undefined) {edge_3198 = edge_3184(edge_3194);}
// node_3195
edge_3200 = edge_3198['a'];
edge_3204 = edge_3198['b'];
// node_3203
if(edge_3204 === active) {edge_3215 = edge_3206;}
// node_3199
if(edge_3200 === active) {edge_3214 = edge_3202;}
// node_3212
edge_3213=null;
if(edge_3213===null ){
  edge_3213 = edge_3214;
} else if (edge_3214 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3213 : '+edge_3213 + ' and ' + edge_3214);
}if(edge_3213===null ){
  edge_3213 = edge_3215;
} else if (edge_3215 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3213 : '+edge_3213 + ' and ' + edge_3215);
}
// node_3133
theInterface=edge_3213;


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