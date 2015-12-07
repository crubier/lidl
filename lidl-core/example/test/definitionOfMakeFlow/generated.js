function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = "lidl_active_value";
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

var edge_3971 = inactive;
var edge_3972 = inactive;
var edge_3993 = inactive;
var edge_4023 = inactive;
var edge_4024 = inactive;
var edge_4025 = inactive;
var edge_4028 = inactive;
var edge_4030 = inactive;
var edge_4031 = inactive;
var edge_4036 = inactive;
var edge_4038 = inactive;
var edge_4039 = inactive;
var edge_4040 = inactive;
var edge_4041 = inactive;
var edge_4042 = inactive;
var edge_4043 = inactive;
var edge_4044 = inactive;
var edge_4045 = inactive;
var edge_4046 = inactive;
var edge_4047 = inactive;
var edge_4048 = inactive;
var edge_4050 = inactive;
var edge_4051 = inactive;
var edge_4052 = inactive;
var edge_4054 = inactive;
var edge_4055 = inactive;
var edge_4056 = inactive;
var edge_4058 = inactive;
var edge_4059 = inactive;
var edge_4060 = inactive;
var edge_4062 = inactive;
var edge_4064 = inactive;
var edge_4066 = inactive;
var edge_4068 = inactive;
var edge_4070 = inactive;
var edge_4071 = inactive;
var edge_4072 = inactive;
var edge_4074 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_4074 = inactive; //Fake sender node

edge_4058 = 1;

edge_4059 = edge_4058;
edge_4060 = edge_4058;

edge_4054 = ifThenElse;

edge_4055 = edge_4054;
edge_4056 = edge_4054;

edge_3971 = boolNot;

edge_4050 = isActive;

edge_4051 = edge_4050;
edge_4052 = edge_4050;

edge_4038 = active;

edge_4039 = edge_4038;
edge_4040 = edge_4038;
edge_4041 = edge_4038;
edge_4042 = edge_4038;
edge_4043 = edge_4038;
edge_4044 = edge_4038;
edge_4045 = edge_4038;
edge_4046 = edge_4038;
edge_4047 = edge_4038;
edge_4048 = edge_4038;

if(edge_4046 === active) {
edge_4025 = previousState['state_3997'];
}

if(edge_4045 === active) {
nextState['state_3990'] = edge_4059;
}

if(edge_4044 === active) {
edge_3993 = previousState['state_3990'];
}

if(edge_4039 === active && edge_4051!==null && edge_4051!==undefined) {edge_3972 = edge_4051(edge_3993);}

if(edge_4040 === active && edge_3971!==null && edge_3971!==undefined) {edge_4023 = edge_3971(edge_3972);}

edge_4024 = {};
edge_4024['cond'] = edge_4023;
edge_4024['a'] = edge_4060;
edge_4024['b'] = edge_4025;

if(edge_4041 === active && edge_4055!==null && edge_4055!==undefined) {edge_4028 = edge_4055(edge_4024);}

edge_4062=theInterface.theNumber;

edge_4068 = edge_4062;
edge_4064 = edge_4062;

edge_4066=null;
if(edge_4066===null ){
  edge_4066 = edge_4074;
} else if (edge_4074 !== null){
  throw ('error:multiple active assignments to the same signal edge_4066 : '+edge_4066 + ' and ' + edge_4074);
}if(edge_4066===null ){
  edge_4066 = edge_4068;
} else if (edge_4068 !== null){
  throw ('error:multiple active assignments to the same signal edge_4066 : '+edge_4066 + ' and ' + edge_4068);
}
if(edge_4042 === active && edge_4052!==null && edge_4052!==undefined) {edge_4030 = edge_4052(edge_4066);}

edge_4031 = {};
edge_4031['cond'] = edge_4030;
edge_4031['a'] = edge_4064;
edge_4031['b'] = edge_4028;

if(edge_4043 === active && edge_4056!==null && edge_4056!==undefined) {edge_4036 = edge_4056(edge_4031);}

if(edge_4048 === active) {edge_4070 = edge_4036;}

edge_4071 = edge_4070;
edge_4072 = edge_4070;

if(edge_4047 === active) {
nextState['state_3997'] = edge_4072;
}

theInterface.theResult=edge_4071;

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
      state: {state_3990:null,
state_3997:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};