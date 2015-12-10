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
var edge_5615 = inactive;
var edge_5620 = inactive;
var edge_5624 = inactive;
var edge_5625 = inactive;
var edge_5626 = inactive;
var edge_5629 = inactive;
var edge_5630 = inactive;
var edge_5634 = inactive;
var edge_5636 = inactive;
var edge_5639 = inactive;
var edge_5641 = inactive;
var edge_5644 = inactive;
var edge_5646 = inactive;
var edge_5647 = inactive;
var edge_5648 = inactive;
var edge_5649 = inactive;
var edge_5651 = inactive;
var edge_5655 = inactive;
var edge_5657 = inactive;
var edge_5659 = inactive;
var edge_5660 = inactive;
var edge_5661 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_5611
edge_5644 = 4;
// node_5609
edge_5639 = 3;
// node_5607
edge_5625 = 1;
// node_5605
edge_5620 = whenThenElse;
// node_5603
edge_5615 = isEqual;
// node_5595
edge_5646 = active;
// node_5645
edge_5647 = edge_5646;
edge_5648 = edge_5646;
edge_5649 = edge_5646;
// node_5570
edge_5624=theArgs.t;
// node_5623
edge_5626 = {};
edge_5626['a'] = edge_5624;
edge_5626['b'] = edge_5625;
// node_5613
if(edge_5647 === active && edge_5615!==null && edge_5615!==undefined) {edge_5629 = edge_5615(edge_5626);}
// node_5627
edge_5630 = {};
edge_5630['cond'] = edge_5629;
edge_5630['source'] = edge_5649;
// node_5618
if(edge_5648 === active && edge_5620!==null && edge_5620!==undefined) {edge_5634 = edge_5620(edge_5630);}
// node_5631
edge_5636 = edge_5634['a'];
edge_5641 = edge_5634['b'];
// node_5640
if(edge_5641 === active) {edge_5659 = edge_5644;}
// node_5658
edge_5660 = edge_5659;
edge_5661 = edge_5659;
// node_5635
if(edge_5636 === active) {edge_5651 = edge_5639;}
// node_5650
edge_5657 = edge_5651;
edge_5661 = edge_5651;
// node_5654
edge_5655=null;
if(edge_5655===null ){
  edge_5655 = edge_5660;
} else if (edge_5660 !== null){
  throw ('error:multiple active assignments to the same signal edge_5655 : '+edge_5655 + ' and ' + edge_5660);
}if(edge_5655===null ){
  edge_5655 = edge_5657;
} else if (edge_5657 !== null){
  throw ('error:multiple active assignments to the same signal edge_5655 : '+edge_5655 + ' and ' + edge_5657);
}// node_5572
theInterface=edge_5655;


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