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
var edge_3413 = inactive;
var edge_3418 = inactive;
var edge_3433 = inactive;
var edge_3434 = inactive;
var edge_3435 = inactive;
var edge_3437 = inactive;
var edge_3438 = inactive;
var edge_3443 = inactive;
var edge_3445 = inactive;
var edge_3447 = inactive;
var edge_3449 = inactive;
var edge_3451 = inactive;
var edge_3453 = inactive;
var edge_3454 = inactive;
var edge_3455 = inactive;
var edge_3456 = inactive;
var edge_3458 = inactive;
var edge_3459 = inactive;
var edge_3460 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_3407
edge_3451 = 4;
// node_3403
edge_3447 = 3;
// node_3399
edge_3434 = 1;
// node_3397
edge_3418 = whenThenElse;
// node_3395
edge_3413 = isEqual;
// node_3384
edge_3453 = active;
// node_3452
edge_3454 = edge_3453;
edge_3455 = edge_3453;
edge_3456 = edge_3453;
// node_3360
edge_3433=theArgs.t;
// node_3432
edge_3435 = {};
edge_3435['a'] = edge_3433;
edge_3435['b'] = edge_3434;
// node_3411
if(edge_3454 === active && edge_3413!==null && edge_3413!==undefined) {edge_3437 = edge_3413(edge_3435);}
// node_3436
edge_3438 = {};
edge_3438['cond'] = edge_3437;
edge_3438['source'] = edge_3456;
// node_3416
if(edge_3455 === active && edge_3418!==null && edge_3418!==undefined) {edge_3443 = edge_3418(edge_3438);}
// node_3440
edge_3445 = edge_3443['a'];
edge_3449 = edge_3443['b'];
// node_3448
if(edge_3449 === active) {edge_3460 = edge_3451;}
// node_3444
if(edge_3445 === active) {edge_3459 = edge_3447;}
// node_3457
edge_3458=null;
if(edge_3458===null ){
  edge_3458 = edge_3459;
} else if (edge_3459 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3458 : '+edge_3458 + ' and ' + edge_3459);
}if(edge_3458===null ){
  edge_3458 = edge_3460;
} else if (edge_3460 !== null){
  throw new Error('Multiple active assignments to the same signal edge_3458 : '+edge_3458 + ' and ' + edge_3460);
}
// node_3362
theInterface=edge_3458;


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