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
// Declaration of variables (Edges of the graph)
var edge_4200 = inactive;
var edge_4201 = inactive;
var edge_4222 = inactive;
var edge_4252 = inactive;
var edge_4253 = inactive;
var edge_4254 = inactive;
var edge_4257 = inactive;
var edge_4259 = inactive;
var edge_4260 = inactive;
var edge_4265 = inactive;
var edge_4267 = inactive;
var edge_4268 = inactive;
var edge_4269 = inactive;
var edge_4270 = inactive;
var edge_4271 = inactive;
var edge_4272 = inactive;
var edge_4273 = inactive;
var edge_4274 = inactive;
var edge_4275 = inactive;
var edge_4276 = inactive;
var edge_4277 = inactive;
var edge_4279 = inactive;
var edge_4280 = inactive;
var edge_4281 = inactive;
var edge_4283 = inactive;
var edge_4284 = inactive;
var edge_4285 = inactive;
var edge_4287 = inactive;
var edge_4288 = inactive;
var edge_4289 = inactive;
var edge_4291 = inactive;
var edge_4293 = inactive;
var edge_4295 = inactive;
var edge_4297 = inactive;
var edge_4299 = inactive;
var edge_4300 = inactive;
var edge_4301 = inactive;
var edge_4303 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_4190
edge_4287 = 1;
// node_4286
edge_4288 = edge_4287;
edge_4289 = edge_4287;
// node_4187
edge_4283 = ifThenElse;
// node_4282
edge_4284 = edge_4283;
edge_4285 = edge_4283;
// node_4185
edge_4200 = boolNot;
// node_4182
edge_4279 = isActive;
// node_4278
edge_4280 = edge_4279;
edge_4281 = edge_4279;
// node_4165
edge_4267 = active;
// node_4266
edge_4268 = edge_4267;
edge_4269 = edge_4267;
edge_4270 = edge_4267;
edge_4271 = edge_4267;
edge_4272 = edge_4267;
edge_4273 = edge_4267;
edge_4274 = edge_4267;
edge_4275 = edge_4267;
edge_4276 = edge_4267;
edge_4277 = edge_4267;
// node_4227
if(edge_4275 === active) {
edge_4254 = previousState['state_4226'];
}
// node_4223
if(edge_4274 === active) {
nextState['state_4219'] = edge_4288;
}
// node_4220
if(edge_4273 === active) {
edge_4222 = previousState['state_4219'];
}
// node_4193
if(edge_4268 === active && edge_4280!==null && edge_4280!==undefined) {edge_4201 = edge_4280(edge_4222);}
// node_4198
if(edge_4269 === active && edge_4200!==null && edge_4200!==undefined) {edge_4252 = edge_4200(edge_4201);}
// node_4250
edge_4253 = {};
edge_4253['cond'] = edge_4252;
edge_4253['a'] = edge_4289;
edge_4253['b'] = edge_4254;
// node_4203
if(edge_4270 === active && edge_4284!==null && edge_4284!==undefined) {edge_4257 = edge_4284(edge_4253);}
// node_3981
edge_4291=theInterface.theNumber;
// node_4290
edge_4297 = edge_4291;
edge_4293 = edge_4291;
// node_4294
edge_4295=null;
if(edge_4295===null ){
  edge_4295 = edge_4303;
} else if (edge_4303 !== null){
  throw ('error:multiple active assignments to the same signal edge_4295 : '+edge_4295 + ' and ' + edge_4303);
}if(edge_4295===null ){
  edge_4295 = edge_4297;
} else if (edge_4297 !== null){
  throw ('error:multiple active assignments to the same signal edge_4295 : '+edge_4295 + ' and ' + edge_4297);
}// node_4208
if(edge_4271 === active && edge_4281!==null && edge_4281!==undefined) {edge_4259 = edge_4281(edge_4295);}
// node_4255
edge_4260 = {};
edge_4260['cond'] = edge_4259;
edge_4260['a'] = edge_4293;
edge_4260['b'] = edge_4257;
// node_4214
if(edge_4272 === active && edge_4285!==null && edge_4285!==undefined) {edge_4265 = edge_4285(edge_4260);}
// node_4261
if(edge_4277 === active) {edge_4299 = edge_4265;}
// node_4298
edge_4300 = edge_4299;
edge_4301 = edge_4299;
// node_4230
if(edge_4276 === active) {
nextState['state_4226'] = edge_4301;
}
// node_3983
theInterface.theResult=edge_4300;


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
      state: {state_4219:null,
state_4226:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};