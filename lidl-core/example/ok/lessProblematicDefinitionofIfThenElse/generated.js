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
var edge_6978 = inactive;
var edge_6983 = inactive;
var edge_7008 = inactive;
var edge_7009 = inactive;
var edge_7010 = inactive;
var edge_7013 = inactive;
var edge_7014 = inactive;
var edge_7016 = inactive;
var edge_7020 = inactive;
var edge_7021 = inactive;
var edge_7024 = inactive;
var edge_7026 = inactive;
var edge_7028 = inactive;
var edge_7029 = inactive;
var edge_7030 = inactive;
var edge_7031 = inactive;
var edge_7033 = inactive;
var edge_7034 = inactive;
var edge_7035 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_6974
edge_7026 = -8000;
// node_6972
edge_7009 = 1;
// node_6970
edge_6983 = whenThenElse;
// node_6968
edge_6978 = isEqual;
// node_6960
edge_7028 = active;
// node_7027
edge_7029 = edge_7028;
edge_7030 = edge_7028;
edge_7031 = edge_7028;
// node_6919
edge_7021=theInterface.theNumber;
// node_6917
edge_7008=theArgs.a;
// node_7007
edge_7010 = {};
edge_7010['a'] = edge_7008;
edge_7010['b'] = edge_7009;
// node_6976
if(edge_7029 === active && edge_6978!==null && edge_6978!==undefined) {edge_7013 = edge_6978(edge_7010);}
// node_7011
edge_7014 = {};
edge_7014['cond'] = edge_7013;
edge_7014['source'] = edge_7031;
// node_6981
if(edge_7030 === active && edge_6983!==null && edge_6983!==undefined) {edge_7016 = edge_6983(edge_7014);}
// node_7015
edge_7020 = edge_7016['a'];
edge_7024 = edge_7016['b'];
// node_7023
if(edge_7024 === active) {edge_7035 = edge_7026;}
// node_7019
if(edge_7020 === active) {edge_7034 = edge_7021;}
// node_7032
edge_7033=null;
if(edge_7033===null ){
  edge_7033 = edge_7034;
} else if (edge_7034 !== null){
  throw ('error:multiple active assignments to the same signal edge_7033 : '+edge_7033 + ' and ' + edge_7034);
}if(edge_7033===null ){
  edge_7033 = edge_7035;
} else if (edge_7035 !== null){
  throw ('error:multiple active assignments to the same signal edge_7033 : '+edge_7033 + ' and ' + edge_7035);
}// node_6921
theInterface.theResult=edge_7033;


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