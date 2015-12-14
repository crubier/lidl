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
var edge_7984 = inactive;
var edge_8036 = inactive;
var edge_8038 = inactive;
var edge_8056 = inactive;
var edge_8058 = inactive;
var edge_8062 = inactive;
var edge_8064 = inactive;
var edge_8066 = inactive;
var edge_8070 = inactive;
var edge_8072 = inactive;
var edge_8076 = inactive;
var edge_8078 = inactive;
var edge_8080 = inactive;
var edge_8084 = inactive;
var edge_8095 = inactive;
var edge_8096 = inactive;
var edge_8097 = inactive;
var edge_8098 = inactive;
var edge_8099 = inactive;
var edge_8100 = inactive;
var edge_8101 = inactive;
var edge_8102 = inactive;
var edge_8103 = inactive;
var edge_8104 = inactive;
var edge_8105 = inactive;
var edge_8106 = inactive;
var edge_8107 = inactive;
var edge_8109 = inactive;
var edge_8110 = inactive;
var edge_8111 = inactive;
var edge_8113 = inactive;
var edge_8114 = inactive;
var edge_8115 = inactive;
var edge_8117 = inactive;
var edge_8118 = inactive;
var edge_8119 = inactive;
var edge_8121 = inactive;
var edge_8122 = inactive;
var edge_8123 = inactive;
var edge_8125 = inactive;
var edge_8126 = inactive;
var edge_8127 = inactive;
var edge_8129 = inactive;
var edge_8130 = inactive;
var edge_8131 = inactive;
var edge_8133 = inactive;
var edge_8134 = inactive;
var edge_8135 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_7972
edge_8117 = 1;
// node_8116
edge_8118 = edge_8117;
edge_8119 = edge_8117;
// node_7969
edge_8113 = whenThenElse;
// node_8112
edge_8114 = edge_8113;
edge_8115 = edge_8113;
// node_7967
edge_7984 = boolNot;
// node_7964
edge_8109 = isActive;
// node_8108
edge_8110 = edge_8109;
edge_8111 = edge_8109;
// node_7935
edge_8095 = active;
// node_8094
edge_8096 = edge_8095;
edge_8097 = edge_8095;
edge_8098 = edge_8095;
edge_8099 = edge_8095;
edge_8100 = edge_8095;
edge_8101 = edge_8095;
edge_8102 = edge_8095;
edge_8103 = edge_8095;
edge_8104 = edge_8095;
edge_8105 = edge_8095;
edge_8106 = edge_8095;
edge_8107 = edge_8095;
// node_8010
if(edge_8103 === active) {
edge_8078 = previousState['state_8009'];
}
// node_8006
if(edge_8102 === active) {
nextState['state_8002'] = edge_8118;
}
// node_8003
if(edge_8101 === active) {
edge_8036 = previousState['state_8002'];
}
// node_7977
if(edge_8096 === active && edge_8110!==null && edge_8110!==undefined) {edge_8038 = edge_8110(edge_8036);}
// node_7982
if(edge_8097 === active && edge_7984!==null && edge_7984!==undefined) {edge_8056 = edge_7984(edge_8038);}
// node_8055
edge_8058 = {};
edge_8058['cond'] = edge_8056;
edge_8058['source'] = edge_8105;
// node_7987
if(edge_8098 === active && edge_8114!==null && edge_8114!==undefined) {edge_8062 = edge_8114(edge_8058);}
// node_8059
edge_8072 = edge_8062['a'];
edge_8076 = edge_8062['b'];
// node_8075
if(edge_8076 === active) {edge_8127 = edge_8078;}
// node_8071
if(edge_8072 === active) {edge_8126 = edge_8119;}
// node_8124
edge_8125=null;
if(edge_8125===null ){
  edge_8125 = edge_8126;
} else if (edge_8126 !== null){
  throw new Error('Multiple active assignments to the same signal edge_8125 : '+edge_8125 + ' and ' + edge_8126);
}if(edge_8125===null ){
  edge_8125 = edge_8127;
} else if (edge_8127 !== null){
  throw new Error('Multiple active assignments to the same signal edge_8125 : '+edge_8125 + ' and ' + edge_8127);
}
// node_7661
edge_8121=theInterface.theNumber;
// node_8120
edge_8122 = edge_8121;
edge_8123 = edge_8121;
// node_7992
if(edge_8099 === active && edge_8111!==null && edge_8111!==undefined) {edge_8064 = edge_8111(edge_8122);}
// node_8063
edge_8066 = {};
edge_8066['cond'] = edge_8064;
edge_8066['source'] = edge_8106;
// node_7997
if(edge_8100 === active && edge_8115!==null && edge_8115!==undefined) {edge_8070 = edge_8115(edge_8066);}
// node_8067
edge_8080 = edge_8070['a'];
edge_8084 = edge_8070['b'];
// node_8083
if(edge_8084 === active) {edge_8135 = edge_8125;}
// node_8079
if(edge_8080 === active) {edge_8134 = edge_8123;}
// node_8132
edge_8133=null;
if(edge_8133===null ){
  edge_8133 = edge_8134;
} else if (edge_8134 !== null){
  throw new Error('Multiple active assignments to the same signal edge_8133 : '+edge_8133 + ' and ' + edge_8134);
}if(edge_8133===null ){
  edge_8133 = edge_8135;
} else if (edge_8135 !== null){
  throw new Error('Multiple active assignments to the same signal edge_8133 : '+edge_8133 + ' and ' + edge_8135);
}
// node_8088
if(edge_8107 === active) {edge_8129 = edge_8133;}
// node_8128
edge_8130 = edge_8129;
edge_8131 = edge_8129;
// node_8013
if(edge_8104 === active) {
nextState['state_8009'] = edge_8131;
}
// node_7663
theInterface.theResult=edge_8130;


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
      state: {state_8002:null,
state_8009:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};