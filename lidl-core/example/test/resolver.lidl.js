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

edge_663 = active;

// We dont care about edge_663, this is a fake receiver node

edge_655=theInterface.theOther;

edge_656 = edge_655;
edge_661 = edge_655;

edge_647=theInterface.theNumber;

edge_653 = edge_647;
edge_660 = edge_647;

edge_659=null;
if(edge_659===null ){
  edge_659 = edge_660;
} else if (edge_660 !== null){
  throw('error:multiple active assignment to the same interaction');
}if(edge_659===null ){
  edge_659 = edge_661;
} else if (edge_661 !== null){
  throw('error:multiple active assignment to the same interaction');
}
theInterface.theResult=edge_659;

edge_651=null;
if(edge_651===null ){
  edge_651 = edge_656;
} else if (edge_656 !== null){
  throw('error:multiple active assignment to the same interaction');
}if(edge_651===null ){
  edge_651 = edge_653;
} else if (edge_653 !== null){
  throw('error:multiple active assignment to the same interaction');
}
theInterface.theLast=edge_651;

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