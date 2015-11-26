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

var edge_1542 = inactive;
var edge_1546 = inactive;
var edge_1548 = inactive;
var edge_1550 = inactive;
var edge_1551 = inactive;
var edge_1554 = inactive;
var edge_1555 = inactive;
var edge_1556 = inactive;
var edge_1558 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1558 = active;

// We dont care about edge_1558, this is a fake receiver node

edge_1550=theInterface.theOther;

edge_1551 = edge_1550;
edge_1556 = edge_1550;

edge_1542=theInterface.theNumber;

edge_1548 = edge_1542;
edge_1555 = edge_1542;

edge_1554=null;
if(edge_1554===null ){
  edge_1554 = edge_1555;
} else if (edge_1555 !== null){
  throw ('error:multiple active assignments to the same signal edge_1554 : '+edge_1554 + ' and ' + edge_1555);
}if(edge_1554===null ){
  edge_1554 = edge_1556;
} else if (edge_1556 !== null){
  throw ('error:multiple active assignments to the same signal edge_1554 : '+edge_1554 + ' and ' + edge_1556);
}
theInterface.theResult=edge_1554;

edge_1546=null;
if(edge_1546===null ){
  edge_1546 = edge_1551;
} else if (edge_1551 !== null){
  throw ('error:multiple active assignments to the same signal edge_1546 : '+edge_1546 + ' and ' + edge_1551);
}if(edge_1546===null ){
  edge_1546 = edge_1548;
} else if (edge_1548 !== null){
  throw ('error:multiple active assignments to the same signal edge_1546 : '+edge_1546 + ' and ' + edge_1548);
}
theInterface.theLast=edge_1546;

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