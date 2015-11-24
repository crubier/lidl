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

var edge_2211 = inactive;
var edge_2215 = inactive;
var edge_2217 = inactive;
var edge_2219 = inactive;
var edge_2220 = inactive;
var edge_2223 = inactive;
var edge_2224 = inactive;
var edge_2225 = inactive;
var edge_2227 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2227 = active;

// We dont care about edge_2227, this is a fake receiver node

edge_2219=theInterface.theOther;

edge_2220 = edge_2219;
edge_2225 = edge_2219;

edge_2211=theInterface.theNumber;

edge_2217 = edge_2211;
edge_2224 = edge_2211;

edge_2223=null;
if(edge_2223===null ){
  edge_2223 = edge_2224;
} else if (edge_2224 !== null){
  throw('error:multiple active assignments to the same signal edge_2223 : '+edge_2223 + ' and ' + edge_2224);
}if(edge_2223===null ){
  edge_2223 = edge_2225;
} else if (edge_2225 !== null){
  throw('error:multiple active assignments to the same signal edge_2223 : '+edge_2223 + ' and ' + edge_2225);
}
theInterface.theResult=edge_2223;

edge_2215=null;
if(edge_2215===null ){
  edge_2215 = edge_2220;
} else if (edge_2220 !== null){
  throw('error:multiple active assignments to the same signal edge_2215 : '+edge_2215 + ' and ' + edge_2220);
}if(edge_2215===null ){
  edge_2215 = edge_2217;
} else if (edge_2217 !== null){
  throw('error:multiple active assignments to the same signal edge_2215 : '+edge_2215 + ' and ' + edge_2217);
}
theInterface.theLast=edge_2215;

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