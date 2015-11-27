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

var edge_3963 = inactive;
var edge_3967 = inactive;
var edge_3968 = inactive;
var edge_3971 = inactive;
var edge_3973 = inactive;
var edge_3975 = inactive;
var edge_3976 = inactive;
var edge_3977 = inactive;
var edge_3979 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_3979 = active;

// We dont care about edge_3979, this is a fake receiver node

edge_3971=theInterface.theOther;

edge_3977 = edge_3971;
edge_3973 = edge_3971;

edge_3963=theInterface.theNumber;

edge_3976 = edge_3963;
edge_3968 = edge_3963;

edge_3975=null;
if(edge_3975===null ){
  edge_3975 = edge_3976;
} else if (edge_3976 !== null){
  throw ('error:multiple active assignments to the same signal edge_3975 : '+edge_3975 + ' and ' + edge_3976);
}if(edge_3975===null ){
  edge_3975 = edge_3977;
} else if (edge_3977 !== null){
  throw ('error:multiple active assignments to the same signal edge_3975 : '+edge_3975 + ' and ' + edge_3977);
}
theInterface.theResult=edge_3975;

edge_3967=null;
if(edge_3967===null ){
  edge_3967 = edge_3968;
} else if (edge_3968 !== null){
  throw ('error:multiple active assignments to the same signal edge_3967 : '+edge_3967 + ' and ' + edge_3968);
}if(edge_3967===null ){
  edge_3967 = edge_3973;
} else if (edge_3973 !== null){
  throw ('error:multiple active assignments to the same signal edge_3967 : '+edge_3967 + ' and ' + edge_3973);
}
theInterface.theLast=edge_3967;

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
      state: {},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};