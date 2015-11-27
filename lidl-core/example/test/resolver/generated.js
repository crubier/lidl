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

var edge_4231 = inactive;
var edge_4235 = inactive;
var edge_4236 = inactive;
var edge_4239 = inactive;
var edge_4241 = inactive;
var edge_4243 = inactive;
var edge_4244 = inactive;
var edge_4245 = inactive;
var edge_4247 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_4247 = active;

// We dont care about edge_4247, this is a fake receiver node

edge_4239=theInterface.theOther;

edge_4245 = edge_4239;
edge_4241 = edge_4239;

edge_4231=theInterface.theNumber;

edge_4244 = edge_4231;
edge_4236 = edge_4231;

edge_4243=null;
if(edge_4243===null ){
  edge_4243 = edge_4244;
} else if (edge_4244 !== null){
  throw ('error:multiple active assignments to the same signal edge_4243 : '+edge_4243 + ' and ' + edge_4244);
}if(edge_4243===null ){
  edge_4243 = edge_4245;
} else if (edge_4245 !== null){
  throw ('error:multiple active assignments to the same signal edge_4243 : '+edge_4243 + ' and ' + edge_4245);
}
theInterface.theResult=edge_4243;

edge_4235=null;
if(edge_4235===null ){
  edge_4235 = edge_4236;
} else if (edge_4236 !== null){
  throw ('error:multiple active assignments to the same signal edge_4235 : '+edge_4235 + ' and ' + edge_4236);
}if(edge_4235===null ){
  edge_4235 = edge_4241;
} else if (edge_4241 !== null){
  throw ('error:multiple active assignments to the same signal edge_4235 : '+edge_4235 + ' and ' + edge_4241);
}
theInterface.theLast=edge_4235;

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