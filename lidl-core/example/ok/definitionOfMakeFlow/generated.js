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
var edge_4514 = inactive;
var edge_4515 = inactive;
var edge_4536 = inactive;
var edge_4566 = inactive;
var edge_4567 = inactive;
var edge_4568 = inactive;
var edge_4571 = inactive;
var edge_4573 = inactive;
var edge_4574 = inactive;
var edge_4579 = inactive;
var edge_4581 = inactive;
var edge_4582 = inactive;
var edge_4583 = inactive;
var edge_4584 = inactive;
var edge_4585 = inactive;
var edge_4586 = inactive;
var edge_4587 = inactive;
var edge_4588 = inactive;
var edge_4589 = inactive;
var edge_4590 = inactive;
var edge_4591 = inactive;
var edge_4593 = inactive;
var edge_4594 = inactive;
var edge_4595 = inactive;
var edge_4597 = inactive;
var edge_4598 = inactive;
var edge_4599 = inactive;
var edge_4601 = inactive;
var edge_4602 = inactive;
var edge_4603 = inactive;
var edge_4605 = inactive;
var edge_4607 = inactive;
var edge_4609 = inactive;
var edge_4611 = inactive;
var edge_4613 = inactive;
var edge_4614 = inactive;
var edge_4615 = inactive;
var edge_4617 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_4504
edge_4601 = 1;
// node_4600
edge_4602 = edge_4601;
edge_4603 = edge_4601;
// node_4501
edge_4597 = ifThenElse;
// node_4596
edge_4598 = edge_4597;
edge_4599 = edge_4597;
// node_4499
edge_4514 = boolNot;
// node_4496
edge_4593 = isActive;
// node_4592
edge_4594 = edge_4593;
edge_4595 = edge_4593;
// node_4479
edge_4581 = active;
// node_4580
edge_4582 = edge_4581;
edge_4583 = edge_4581;
edge_4584 = edge_4581;
edge_4585 = edge_4581;
edge_4586 = edge_4581;
edge_4587 = edge_4581;
edge_4588 = edge_4581;
edge_4589 = edge_4581;
edge_4590 = edge_4581;
edge_4591 = edge_4581;
// node_4541
if(edge_4589 === active) {
edge_4568 = previousState['state_4540'];
}
// node_4537
if(edge_4588 === active) {
nextState['state_4533'] = edge_4602;
}
// node_4534
if(edge_4587 === active) {
edge_4536 = previousState['state_4533'];
}
// node_4507
if(edge_4582 === active && edge_4594!==null && edge_4594!==undefined) {edge_4515 = edge_4594(edge_4536);}
// node_4512
if(edge_4583 === active && edge_4514!==null && edge_4514!==undefined) {edge_4566 = edge_4514(edge_4515);}
// node_4564
edge_4567 = {};
edge_4567['cond'] = edge_4566;
edge_4567['a'] = edge_4603;
edge_4567['b'] = edge_4568;
// node_4517
if(edge_4584 === active && edge_4598!==null && edge_4598!==undefined) {edge_4571 = edge_4598(edge_4567);}
// node_4295
edge_4605=theInterface.theNumber;
// node_4604
edge_4611 = edge_4605;
edge_4607 = edge_4605;
// node_4608
edge_4609=null;
if(edge_4609===null ){
  edge_4609 = edge_4617;
} else if (edge_4617 !== null){
  throw ('error:multiple active assignments to the same signal edge_4609 : '+edge_4609 + ' and ' + edge_4617);
}if(edge_4609===null ){
  edge_4609 = edge_4611;
} else if (edge_4611 !== null){
  throw ('error:multiple active assignments to the same signal edge_4609 : '+edge_4609 + ' and ' + edge_4611);
}// node_4522
if(edge_4585 === active && edge_4595!==null && edge_4595!==undefined) {edge_4573 = edge_4595(edge_4609);}
// node_4569
edge_4574 = {};
edge_4574['cond'] = edge_4573;
edge_4574['a'] = edge_4607;
edge_4574['b'] = edge_4571;
// node_4528
if(edge_4586 === active && edge_4599!==null && edge_4599!==undefined) {edge_4579 = edge_4599(edge_4574);}
// node_4575
if(edge_4591 === active) {edge_4613 = edge_4579;}
// node_4612
edge_4614 = edge_4613;
edge_4615 = edge_4613;
// node_4544
if(edge_4590 === active) {
nextState['state_4540'] = edge_4615;
}
// node_4297
theInterface.theResult=edge_4614;


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
      state: {state_4533:null,
state_4540:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};