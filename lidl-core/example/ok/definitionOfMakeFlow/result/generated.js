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


var isInactive = function(y){return !isActive(y);};


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
var edge_10151 = inactive;
var edge_10203 = inactive;
var edge_10205 = inactive;
var edge_10223 = inactive;
var edge_10225 = inactive;
var edge_10229 = inactive;
var edge_10231 = inactive;
var edge_10233 = inactive;
var edge_10237 = inactive;
var edge_10239 = inactive;
var edge_10243 = inactive;
var edge_10245 = inactive;
var edge_10247 = inactive;
var edge_10251 = inactive;
var edge_10262 = inactive;
var edge_10263 = inactive;
var edge_10264 = inactive;
var edge_10265 = inactive;
var edge_10266 = inactive;
var edge_10267 = inactive;
var edge_10268 = inactive;
var edge_10269 = inactive;
var edge_10270 = inactive;
var edge_10271 = inactive;
var edge_10272 = inactive;
var edge_10273 = inactive;
var edge_10274 = inactive;
var edge_10276 = inactive;
var edge_10277 = inactive;
var edge_10278 = inactive;
var edge_10280 = inactive;
var edge_10281 = inactive;
var edge_10282 = inactive;
var edge_10284 = inactive;
var edge_10285 = inactive;
var edge_10286 = inactive;
var edge_10288 = inactive;
var edge_10289 = inactive;
var edge_10290 = inactive;
var edge_10292 = inactive;
var edge_10293 = inactive;
var edge_10294 = inactive;
var edge_10296 = inactive;
var edge_10297 = inactive;
var edge_10298 = inactive;
var edge_10300 = inactive;
var edge_10301 = inactive;
var edge_10302 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_10139
edge_10284 = 1;
// node_10283
edge_10285 = edge_10284;
edge_10286 = edge_10284;
// node_10136
edge_10280 = whenThenElse;
// node_10279
edge_10281 = edge_10280;
edge_10282 = edge_10280;
// node_10134
edge_10151 = boolNot;
// node_10131
edge_10276 = isActive;
// node_10275
edge_10277 = edge_10276;
edge_10278 = edge_10276;
// node_10102
edge_10262 = active;
// node_10261
edge_10263 = edge_10262;
edge_10264 = edge_10262;
edge_10265 = edge_10262;
edge_10266 = edge_10262;
edge_10267 = edge_10262;
edge_10268 = edge_10262;
edge_10269 = edge_10262;
edge_10270 = edge_10262;
edge_10271 = edge_10262;
edge_10272 = edge_10262;
edge_10273 = edge_10262;
edge_10274 = edge_10262;
// node_10177
if(edge_10270 === active) {
edge_10245 = previousState['state_10176'];
}
// node_10173
if(edge_10269 === active) {
nextState['state_10169'] = edge_10285;
}
// node_10170
if(edge_10268 === active) {
edge_10203 = previousState['state_10169'];
}
// node_10144
if(edge_10263 === active && edge_10277!==null && edge_10277!==undefined) {edge_10205 = edge_10277(edge_10203);}
// node_10149
if(edge_10264 === active && edge_10151!==null && edge_10151!==undefined) {edge_10223 = edge_10151(edge_10205);}
// node_10222
edge_10225 = {};
edge_10225['cond'] = edge_10223;
edge_10225['source'] = edge_10272;
// node_10154
if(edge_10265 === active && edge_10281!==null && edge_10281!==undefined) {edge_10229 = edge_10281(edge_10225);}
// node_10226
edge_10239 = edge_10229['a'];
edge_10243 = edge_10229['b'];
// node_10242
if(edge_10243 !== inactive) {edge_10294 = edge_10245;}
// node_10238
if(edge_10239 !== inactive) {edge_10293 = edge_10286;}
// node_10291
edge_10292=null;
if(edge_10292===null ){
  edge_10292 = edge_10293;
} else if (edge_10293 !== null){
  throw new Error('Multiple active assignments to the same signal edge_10292 : '+edge_10292 + ' and ' + edge_10293);
}if(edge_10292===null ){
  edge_10292 = edge_10294;
} else if (edge_10294 !== null){
  throw new Error('Multiple active assignments to the same signal edge_10292 : '+edge_10292 + ' and ' + edge_10294);
}
// node_9828
edge_10288=theInterface.theNumber;
// node_10287
edge_10289 = edge_10288;
edge_10290 = edge_10288;
// node_10159
if(edge_10266 === active && edge_10278!==null && edge_10278!==undefined) {edge_10231 = edge_10278(edge_10289);}
// node_10230
edge_10233 = {};
edge_10233['cond'] = edge_10231;
edge_10233['source'] = edge_10273;
// node_10164
if(edge_10267 === active && edge_10282!==null && edge_10282!==undefined) {edge_10237 = edge_10282(edge_10233);}
// node_10234
edge_10247 = edge_10237['a'];
edge_10251 = edge_10237['b'];
// node_10250
if(edge_10251 !== inactive) {edge_10302 = edge_10292;}
// node_10246
if(edge_10247 !== inactive) {edge_10301 = edge_10290;}
// node_10299
edge_10300=null;
if(edge_10300===null ){
  edge_10300 = edge_10301;
} else if (edge_10301 !== null){
  throw new Error('Multiple active assignments to the same signal edge_10300 : '+edge_10300 + ' and ' + edge_10301);
}if(edge_10300===null ){
  edge_10300 = edge_10302;
} else if (edge_10302 !== null){
  throw new Error('Multiple active assignments to the same signal edge_10300 : '+edge_10300 + ' and ' + edge_10302);
}
// node_10255
if(edge_10274 !== inactive) {edge_10296 = edge_10300;}
// node_10295
edge_10297 = edge_10296;
edge_10298 = edge_10296;
// node_10180
if(edge_10271 === active) {
nextState['state_10176'] = edge_10298;
}
// node_9830
theInterface.theResult=edge_10297;


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
      state: {state_10169:null,
state_10176:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};