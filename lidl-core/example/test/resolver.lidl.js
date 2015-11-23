function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a){if(!a)return a;var c,b=[Number,String,Boolean];if(b.forEach(function(b){a instanceof b&&(c=b(a))}),"undefined"==typeof c)if("[object Array]"===Object.prototype.toString.call(a))c=[],a.forEach(function(a,b,d){c[b]=clone(a)});else if("object"==typeof a)if(a.nodeType&&"function"==typeof a.cloneNode)var c=a.cloneNode(!0);else if(a.prototype)c=a;else if(a instanceof Date)c=new Date(a);else{c={};for(var d in a)c[d]=clone(a[d])}else c=a;return c}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
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
  return ((x[0] !== null) ? x[0] : x[1]);
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

var identity = function(x){return x};

///////////////////////////////////////////////////////////////////////
//Declaration of variables


///////////////////////////////////////////////////////////////////////
//Code of the DAG


edge_495=theInterface.theOther;

edge_496 = edge_495;
edge_501 = edge_495;

edge_487=theInterface.theNumber;

edge_493 = edge_487;
edge_500 = edge_487;

edge_499=null;
if(edge_499===null ){
  edge_499 = edge_500;
} else if (edge_500 !== null){
  throw('error:multiple active assignment to the same interaction');
}if(edge_499===null ){
  edge_499 = edge_501;
} else if (edge_501 !== null){
  throw('error:multiple active assignment to the same interaction');
}
theInterface.theResult=edge_499;

edge_491=null;
if(edge_491===null ){
  edge_491 = edge_496;
} else if (edge_496 !== null){
  throw('error:multiple active assignment to the same interaction');
}if(edge_491===null ){
  edge_491 = edge_493;
} else if (edge_493 !== null){
  throw('error:multiple active assignment to the same interaction');
}
theInterface.theLast=edge_491;

///////////////////////////////////////////////////////////////////////
//Return statement

  return {
      memo: {},
      state: nextState,
      args: {},
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