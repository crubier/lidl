function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a){if(!a)return a;var c,b=[Number,String,Boolean];if(b.forEach(function(b){a instanceof b&&(c=b(a))}),"undefined"==typeof c)if("[object Array]"===Object.prototype.toString.call(a))c=[],a.forEach(function(a,b,d){c[b]=clone(a)});else if("object"==typeof a)if(a.nodeType&&"function"==typeof a.cloneNode)var c=a.cloneNode(!0);else if(a.prototype)c=a;else if(a instanceof Date)c=new Date(a);else{c={};for(var d in a)c[d]=clone(a[d])}else c=a;return c}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = 1;
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
  return x
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
  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,l:x,n:x,o:x,p:x}
};

///////////////////////////////////////////////////////////////////////
//Declaration of variables

var edge_2500 = inactive;
var edge_2510 = inactive;
var edge_2511 = inactive;
var edge_2526 = inactive;
var edge_2556 = inactive;
var edge_2557 = inactive;
var edge_2558 = inactive;
var edge_2562 = inactive;
var edge_2563 = inactive;
var edge_2564 = inactive;
var edge_2569 = inactive;
var edge_2571 = inactive;
var edge_2572 = inactive;
var edge_2573 = inactive;
var edge_2574 = inactive;
var edge_2575 = inactive;
var edge_2576 = inactive;
var edge_2577 = inactive;
var edge_2578 = inactive;
var edge_2579 = inactive;
var edge_2580 = inactive;
var edge_2581 = inactive;
var edge_2582 = inactive;
var edge_2584 = inactive;
var edge_2585 = inactive;
var edge_2586 = inactive;
var edge_2588 = inactive;
var edge_2589 = inactive;
var edge_2590 = inactive;
var edge_2592 = inactive;
var edge_2593 = inactive;
var edge_2594 = inactive;
var edge_2596 = inactive;
var edge_2598 = inactive;
var edge_2600 = inactive;
var edge_2602 = inactive;
var edge_2604 = inactive;
var edge_2605 = inactive;
var edge_2606 = inactive;
var edge_2608 = inactive;
var edge_2610 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2610 = inactive; //Fake sender node

edge_2608 = inactive; //Fake sender node

edge_2500 = return1;

edge_2510 = boolNot;

edge_2584 = isActive;

edge_2585 = edge_2584;
edge_2586 = edge_2584;

edge_2588 = ifThenElse;

edge_2589 = edge_2588;
edge_2590 = edge_2588;

edge_2571 = active;

edge_2572 = edge_2571;
edge_2573 = edge_2571;
edge_2574 = edge_2571;
edge_2575 = edge_2571;
edge_2576 = edge_2571;
edge_2577 = edge_2571;
edge_2578 = edge_2571;
edge_2579 = edge_2571;
edge_2580 = edge_2571;
edge_2581 = edge_2571;
edge_2582 = edge_2571;

if(edge_2580 === active) {
edge_2558 = previousState['state_2530'];
}

if(edge_2578 === active) {
edge_2526 = previousState['state_2523'];
}

if(edge_2574 === active && edge_2586!==null && edge_2586!==undefined) {edge_2511 = edge_2586(edge_2526);}

if(edge_2575 === active && edge_2510!==null && edge_2510!==undefined) {edge_2556 = edge_2510(edge_2511);}

if(edge_2573 === active && edge_2500!==null && edge_2500!==undefined) {edge_2592 = edge_2500(edge_2608);}

edge_2593 = edge_2592;
edge_2594 = edge_2592;

edge_2557 = {};
edge_2557['cond'] = edge_2556;
edge_2557['a'] = edge_2594;
edge_2557['b'] = edge_2558;

if(edge_2576 === active && edge_2589!==null && edge_2589!==undefined) {edge_2563 = edge_2589(edge_2557);}

if(edge_2579 === active) {
nextState['state_2523'] = edge_2593;
}

edge_2596=theInterface.theNumber;

edge_2602 = edge_2596;
edge_2598 = edge_2596;

edge_2600=null;
if(edge_2600===null ){
  edge_2600 = edge_2610;
} else if (edge_2610 !== null){
  throw ('error:multiple active assignments to the same signal edge_2600 : '+edge_2600 + ' and ' + edge_2610);
}if(edge_2600===null ){
  edge_2600 = edge_2602;
} else if (edge_2602 !== null){
  throw ('error:multiple active assignments to the same signal edge_2600 : '+edge_2600 + ' and ' + edge_2602);
}
if(edge_2572 === active && edge_2585!==null && edge_2585!==undefined) {edge_2562 = edge_2585(edge_2600);}

edge_2564 = {};
edge_2564['cond'] = edge_2562;
edge_2564['a'] = edge_2598;
edge_2564['b'] = edge_2563;

if(edge_2577 === active && edge_2590!==null && edge_2590!==undefined) {edge_2569 = edge_2590(edge_2564);}

if(edge_2582 === active) {edge_2604 = edge_2569;}

edge_2605 = edge_2604;
edge_2606 = edge_2604;

if(edge_2581 === active) {
nextState['state_2530'] = edge_2606;
}

theInterface.theResult=edge_2605;

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
      state: {state_2523:null,
state_2530:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};