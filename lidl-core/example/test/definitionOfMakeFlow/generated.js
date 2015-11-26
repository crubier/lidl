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

var edge_1965 = inactive;
var edge_1973 = inactive;
var edge_1987 = inactive;
var edge_1994 = inactive;
var edge_1998 = inactive;
var edge_2004 = inactive;
var edge_2034 = inactive;
var edge_2036 = inactive;
var edge_2037 = inactive;
var edge_2040 = inactive;
var edge_2041 = inactive;
var edge_2044 = inactive;
var edge_2046 = inactive;
var edge_2047 = inactive;
var edge_2048 = inactive;
var edge_2049 = inactive;
var edge_2050 = inactive;
var edge_2051 = inactive;
var edge_2052 = inactive;
var edge_2053 = inactive;
var edge_2054 = inactive;
var edge_2055 = inactive;
var edge_2056 = inactive;
var edge_2057 = inactive;
var edge_2059 = inactive;
var edge_2060 = inactive;
var edge_2061 = inactive;
var edge_2063 = inactive;
var edge_2064 = inactive;
var edge_2065 = inactive;
var edge_2067 = inactive;
var edge_2069 = inactive;
var edge_2071 = inactive;
var edge_2073 = inactive;
var edge_2075 = inactive;
var edge_2077 = inactive;
var edge_2079 = inactive;
var edge_2081 = inactive;
var edge_2083 = inactive;
var edge_2085 = inactive;
var edge_2087 = inactive;
var edge_2089 = inactive;
var edge_2091 = inactive;
var edge_2093 = inactive;
var edge_2095 = inactive;
var edge_2097 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2097 = inactive; //Fake sender node

edge_2095 = inactive; //Fake sender node

edge_2093 = inactive; //Fake sender node

edge_2091 = inactive; //Fake sender node

edge_1998 = return1;

edge_1987 = boolNot;

edge_2063 = isActive;

edge_2064 = edge_2063;
edge_2065 = edge_2063;

edge_2059 = ifThenElse;

edge_2060 = edge_2059;
edge_2061 = edge_2059;

edge_1965 = identity;

edge_2046 = active;

edge_2047 = edge_2046;
edge_2048 = edge_2046;
edge_2049 = edge_2046;
edge_2050 = edge_2046;
edge_2051 = edge_2046;
edge_2052 = edge_2046;
edge_2053 = edge_2046;
edge_2054 = edge_2046;
edge_2055 = edge_2046;
edge_2056 = edge_2046;
edge_2057 = edge_2046;

if(edge_2056 === active) {
edge_2044 = previousState['state_2009'];
}

if(edge_2054 === active) {
edge_2004 = previousState['state_2001'];
}

if(edge_2053 === active && edge_1998!==null && edge_1998!==undefined) {edge_2067 = edge_1998(edge_2091);}

edge_2073 = edge_2067;
edge_2069 = edge_2067;

edge_2071=null;
if(edge_2071===null ){
  edge_2071 = edge_2093;
} else if (edge_2093 !== null){
  throw ('error:multiple active assignments to the same signal edge_2071 : '+edge_2071 + ' and ' + edge_2093);
}if(edge_2071===null ){
  edge_2071 = edge_2073;
} else if (edge_2073 !== null){
  throw ('error:multiple active assignments to the same signal edge_2071 : '+edge_2071 + ' and ' + edge_2073);
}
if(edge_2055 === active) {
nextState['state_2001'] = edge_2071;
}

if(edge_2052 === active && edge_2065!==null && edge_2065!==undefined) {edge_1994 = edge_2065(edge_2004);}

if(edge_2051 === active && edge_1987!==null && edge_1987!==undefined) {edge_2041 = edge_1987(edge_1994);}

edge_2040 = {};
edge_2040['cond'] = edge_2041;
edge_2040['a'] = edge_2069;
edge_2040['b'] = edge_2044;

if(edge_2050 === active && edge_2061!==null && edge_2061!==undefined) {edge_2037 = edge_2061(edge_2040);}

edge_2083=theInterface.theNumber;

edge_2089 = edge_2083;
edge_2085 = edge_2083;

edge_2087=null;
if(edge_2087===null ){
  edge_2087 = edge_2097;
} else if (edge_2097 !== null){
  throw ('error:multiple active assignments to the same signal edge_2087 : '+edge_2087 + ' and ' + edge_2097);
}if(edge_2087===null ){
  edge_2087 = edge_2089;
} else if (edge_2089 !== null){
  throw ('error:multiple active assignments to the same signal edge_2087 : '+edge_2087 + ' and ' + edge_2089);
}
if(edge_2049 === active && edge_2064!==null && edge_2064!==undefined) {edge_2036 = edge_2064(edge_2087);}

edge_2034 = {};
edge_2034['cond'] = edge_2036;
edge_2034['a'] = edge_2085;
edge_2034['b'] = edge_2037;

if(edge_2048 === active && edge_2060!==null && edge_2060!==undefined) {edge_1973 = edge_2060(edge_2034);}

if(edge_2047 === active && edge_1965!==null && edge_1965!==undefined) {edge_2075 = edge_1965(edge_1973);}

edge_2081 = edge_2075;
edge_2077 = edge_2075;

edge_2079=null;
if(edge_2079===null ){
  edge_2079 = edge_2095;
} else if (edge_2095 !== null){
  throw ('error:multiple active assignments to the same signal edge_2079 : '+edge_2079 + ' and ' + edge_2095);
}if(edge_2079===null ){
  edge_2079 = edge_2081;
} else if (edge_2081 !== null){
  throw ('error:multiple active assignments to the same signal edge_2079 : '+edge_2079 + ' and ' + edge_2081);
}
if(edge_2057 === active) {
nextState['state_2009'] = edge_2079;
}

theInterface.theResult=edge_2077;

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
      state: {state_2001:null,
state_2009:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};