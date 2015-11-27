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

var edge_2177 = inactive;
var edge_2178 = inactive;
var edge_2193 = inactive;
var edge_2223 = inactive;
var edge_2224 = inactive;
var edge_2225 = inactive;
var edge_2229 = inactive;
var edge_2230 = inactive;
var edge_2231 = inactive;
var edge_2236 = inactive;
var edge_2238 = inactive;
var edge_2239 = inactive;
var edge_2240 = inactive;
var edge_2241 = inactive;
var edge_2242 = inactive;
var edge_2243 = inactive;
var edge_2244 = inactive;
var edge_2245 = inactive;
var edge_2246 = inactive;
var edge_2247 = inactive;
var edge_2248 = inactive;
var edge_2250 = inactive;
var edge_2251 = inactive;
var edge_2252 = inactive;
var edge_2254 = inactive;
var edge_2255 = inactive;
var edge_2256 = inactive;
var edge_2258 = inactive;
var edge_2259 = inactive;
var edge_2260 = inactive;
var edge_2262 = inactive;
var edge_2264 = inactive;
var edge_2266 = inactive;
var edge_2268 = inactive;
var edge_2270 = inactive;
var edge_2271 = inactive;
var edge_2272 = inactive;
var edge_2274 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2274 = inactive; //Fake sender node

edge_2258 = 1;

edge_2259 = edge_2258;
edge_2260 = edge_2258;

edge_2177 = boolNot;

edge_2250 = isActive;

edge_2251 = edge_2250;
edge_2252 = edge_2250;

edge_2254 = ifThenElse;

edge_2255 = edge_2254;
edge_2256 = edge_2254;

edge_2238 = active;

edge_2239 = edge_2238;
edge_2240 = edge_2238;
edge_2241 = edge_2238;
edge_2242 = edge_2238;
edge_2243 = edge_2238;
edge_2244 = edge_2238;
edge_2245 = edge_2238;
edge_2246 = edge_2238;
edge_2247 = edge_2238;
edge_2248 = edge_2238;

if(edge_2246 === active) {
edge_2225 = previousState['state_2197'];
}

if(edge_2245 === active) {
nextState['state_2190'] = edge_2259;
}

if(edge_2244 === active) {
edge_2193 = previousState['state_2190'];
}

if(edge_2240 === active && edge_2252!==null && edge_2252!==undefined) {edge_2178 = edge_2252(edge_2193);}

if(edge_2241 === active && edge_2177!==null && edge_2177!==undefined) {edge_2223 = edge_2177(edge_2178);}

edge_2224 = {};
edge_2224['cond'] = edge_2223;
edge_2224['a'] = edge_2260;
edge_2224['b'] = edge_2225;

if(edge_2242 === active && edge_2255!==null && edge_2255!==undefined) {edge_2230 = edge_2255(edge_2224);}

edge_2262=theInterface.theNumber;

edge_2268 = edge_2262;
edge_2264 = edge_2262;

edge_2266=null;
if(edge_2266===null ){
  edge_2266 = edge_2274;
} else if (edge_2274 !== null){
  throw ('error:multiple active assignments to the same signal edge_2266 : '+edge_2266 + ' and ' + edge_2274);
}if(edge_2266===null ){
  edge_2266 = edge_2268;
} else if (edge_2268 !== null){
  throw ('error:multiple active assignments to the same signal edge_2266 : '+edge_2266 + ' and ' + edge_2268);
}
if(edge_2239 === active && edge_2251!==null && edge_2251!==undefined) {edge_2229 = edge_2251(edge_2266);}

edge_2231 = {};
edge_2231['cond'] = edge_2229;
edge_2231['a'] = edge_2264;
edge_2231['b'] = edge_2230;

if(edge_2243 === active && edge_2256!==null && edge_2256!==undefined) {edge_2236 = edge_2256(edge_2231);}

if(edge_2248 === active) {edge_2270 = edge_2236;}

edge_2271 = edge_2270;
edge_2272 = edge_2270;

if(edge_2247 === active) {
nextState['state_2197'] = edge_2272;
}

theInterface.theResult=edge_2271;

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
      state: {state_2190:null,
state_2197:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};