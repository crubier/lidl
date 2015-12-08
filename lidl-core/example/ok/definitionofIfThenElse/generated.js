function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = "lidl_active_value";
var inactive = null;

///////////////////////////////////////////////////////////////////////
//Custom LIDL Header

var isActive = function(x) {
  return (x !== null && x !== undefined);
};

var cool = function(x) {
  if (isActive(x[0]) && isActive(x[1])) {
    return {
      sum: (x[0] + x[1]),
      diff: (x[0] - x[1])
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(x) {
  return (isActive(x[0]) ? x[0] : x[1]);
};

var return0 = function(x) {
  return 0;
};


var return1 = function(x) {
  return 1;
};

var addition = function(x) {
  if (isActive(x[0]) && isActive(x[1])) {
    return x[0] + x[1];
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
//Declaration of variables

var edge_5301 = inactive;
var edge_5306 = inactive;
var edge_5310 = inactive;
var edge_5311 = inactive;
var edge_5312 = inactive;
var edge_5315 = inactive;
var edge_5316 = inactive;
var edge_5320 = inactive;
var edge_5322 = inactive;
var edge_5325 = inactive;
var edge_5327 = inactive;
var edge_5330 = inactive;
var edge_5332 = inactive;
var edge_5333 = inactive;
var edge_5334 = inactive;
var edge_5335 = inactive;
var edge_5337 = inactive;
var edge_5341 = inactive;
var edge_5343 = inactive;
var edge_5345 = inactive;
var edge_5346 = inactive;
var edge_5347 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_5330 = 4;

edge_5325 = 3;

edge_5311 = 1;

edge_5306 = whenThenElse;

edge_5301 = isEqual;

edge_5332 = active;

edge_5333 = edge_5332;
edge_5334 = edge_5332;
edge_5335 = edge_5332;

edge_5310=theArgs.t;

edge_5312 = {};
edge_5312['a'] = edge_5310;
edge_5312['b'] = edge_5311;

if(edge_5333 === active && edge_5301!==null && edge_5301!==undefined) {edge_5315 = edge_5301(edge_5312);}

edge_5316 = {};
edge_5316['cond'] = edge_5315;
edge_5316['source'] = edge_5335;

if(edge_5334 === active && edge_5306!==null && edge_5306!==undefined) {edge_5320 = edge_5306(edge_5316);}

edge_5322 = edge_5320['a'];
edge_5327 = edge_5320['b'];

if(edge_5327 === active) {edge_5345 = edge_5330;}

edge_5346 = edge_5345;
edge_5347 = edge_5345;

if(edge_5322 === active) {edge_5337 = edge_5325;}

edge_5343 = edge_5337;
edge_5347 = edge_5337;

edge_5341=null;
if(edge_5341===null ){
  edge_5341 = edge_5346;
} else if (edge_5346 !== null){
  throw ('error:multiple active assignments to the same signal edge_5341 : '+edge_5341 + ' and ' + edge_5346);
}if(edge_5341===null ){
  edge_5341 = edge_5343;
} else if (edge_5343 !== null){
  throw ('error:multiple active assignments to the same signal edge_5341 : '+edge_5341 + ' and ' + edge_5343);
}
theInterface=edge_5341;

///////////////////////////////////////////////////////////////////////
//Return statement

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