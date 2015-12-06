function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

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

///////////////////////////////////////////////////////////////////////
//Declaration of variables

var edge_4998 = inactive;
var edge_5003 = inactive;
var edge_5007 = inactive;
var edge_5008 = inactive;
var edge_5009 = inactive;
var edge_5012 = inactive;
var edge_5013 = inactive;
var edge_5017 = inactive;
var edge_5019 = inactive;
var edge_5022 = inactive;
var edge_5024 = inactive;
var edge_5027 = inactive;
var edge_5029 = inactive;
var edge_5030 = inactive;
var edge_5031 = inactive;
var edge_5032 = inactive;
var edge_5034 = inactive;
var edge_5038 = inactive;
var edge_5040 = inactive;
var edge_5042 = inactive;
var edge_5043 = inactive;
var edge_5044 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_5027 = 4;

edge_5022 = 3;

edge_5008 = 1;

edge_5003 = whenThenElse;

edge_4998 = isEqual;

edge_5029 = active;

edge_5030 = edge_5029;
edge_5031 = edge_5029;
edge_5032 = edge_5029;

edge_5007=theArgs.t;

edge_5009 = {};
edge_5009['a'] = edge_5007;
edge_5009['b'] = edge_5008;

if(edge_5030 === active && edge_4998!==null && edge_4998!==undefined) {edge_5012 = edge_4998(edge_5009);}

edge_5013 = {};
edge_5013['cond'] = edge_5012;
edge_5013['source'] = edge_5032;

if(edge_5031 === active && edge_5003!==null && edge_5003!==undefined) {edge_5017 = edge_5003(edge_5013);}

edge_5019 = edge_5017['a'];
edge_5024 = edge_5017['b'];

if(edge_5024 === active) {edge_5042 = edge_5027;}

edge_5043 = edge_5042;
edge_5044 = edge_5042;

if(edge_5019 === active) {edge_5034 = edge_5022;}

edge_5040 = edge_5034;
edge_5044 = edge_5034;

edge_5038=null;
if(edge_5038===null ){
  edge_5038 = edge_5043;
} else if (edge_5043 !== null){
  throw ('error:multiple active assignments to the same signal edge_5038 : '+edge_5038 + ' and ' + edge_5043);
}if(edge_5038===null ){
  edge_5038 = edge_5040;
} else if (edge_5040 !== null){
  throw ('error:multiple active assignments to the same signal edge_5038 : '+edge_5038 + ' and ' + edge_5040);
}
theInterface=edge_5038;

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