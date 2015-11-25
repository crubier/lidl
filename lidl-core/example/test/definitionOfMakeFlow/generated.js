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

var edge_966 = inactive;
var edge_974 = inactive;
var edge_988 = inactive;
var edge_995 = inactive;
var edge_999 = inactive;
var edge_1005 = inactive;
var edge_1035 = inactive;
var edge_1037 = inactive;
var edge_1038 = inactive;
var edge_1041 = inactive;
var edge_1042 = inactive;
var edge_1045 = inactive;
var edge_1047 = inactive;
var edge_1048 = inactive;
var edge_1049 = inactive;
var edge_1050 = inactive;
var edge_1051 = inactive;
var edge_1052 = inactive;
var edge_1053 = inactive;
var edge_1054 = inactive;
var edge_1055 = inactive;
var edge_1056 = inactive;
var edge_1057 = inactive;
var edge_1058 = inactive;
var edge_1060 = inactive;
var edge_1061 = inactive;
var edge_1062 = inactive;
var edge_1064 = inactive;
var edge_1065 = inactive;
var edge_1066 = inactive;
var edge_1068 = inactive;
var edge_1070 = inactive;
var edge_1072 = inactive;
var edge_1074 = inactive;
var edge_1076 = inactive;
var edge_1078 = inactive;
var edge_1080 = inactive;
var edge_1082 = inactive;
var edge_1084 = inactive;
var edge_1086 = inactive;
var edge_1088 = inactive;
var edge_1090 = inactive;
var edge_1092 = inactive;
var edge_1094 = inactive;
var edge_1096 = inactive;
var edge_1098 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1098 = inactive; //Fake sender node

edge_1096 = inactive; //Fake sender node

edge_1094 = inactive; //Fake sender node

edge_1092 = inactive; //Fake sender node

edge_999 = return1;

edge_988 = boolNot;

edge_1064 = isActive;

edge_1065 = edge_1064;
edge_1066 = edge_1064;

edge_1060 = ifThenElse;

edge_1061 = edge_1060;
edge_1062 = edge_1060;

edge_966 = identity;

edge_1047 = active;

edge_1048 = edge_1047;
edge_1049 = edge_1047;
edge_1050 = edge_1047;
edge_1051 = edge_1047;
edge_1052 = edge_1047;
edge_1053 = edge_1047;
edge_1054 = edge_1047;
edge_1055 = edge_1047;
edge_1056 = edge_1047;
edge_1057 = edge_1047;
edge_1058 = edge_1047;

if(edge_1057 === active) {
edge_1045 = previousState['state_1010'];
}

if(edge_1055 === active) {
edge_1005 = previousState['state_1002'];
}

if(edge_1054 === active && edge_999!==null && edge_999!==undefined) {edge_1068 = edge_999(edge_1092);}

edge_1074 = edge_1068;
edge_1070 = edge_1068;

edge_1072=null;
if(edge_1072===null ){
  edge_1072 = edge_1094;
} else if (edge_1094 !== null){
  throw ('error:multiple active assignments to the same signal edge_1072 : '+edge_1072 + ' and ' + edge_1094);
}if(edge_1072===null ){
  edge_1072 = edge_1074;
} else if (edge_1074 !== null){
  throw ('error:multiple active assignments to the same signal edge_1072 : '+edge_1072 + ' and ' + edge_1074);
}
if(edge_1056 === active) {
nextState['state_1002'] = edge_1072;
}

if(edge_1053 === active && edge_1066!==null && edge_1066!==undefined) {edge_995 = edge_1066(edge_1005);}

if(edge_1052 === active && edge_988!==null && edge_988!==undefined) {edge_1042 = edge_988(edge_995);}

edge_1041 = {};
edge_1041['cond'] = edge_1042;
edge_1041['a'] = edge_1070;
edge_1041['b'] = edge_1045;

if(edge_1051 === active && edge_1062!==null && edge_1062!==undefined) {edge_1038 = edge_1062(edge_1041);}

edge_1084=theInterface.theNumber;

edge_1090 = edge_1084;
edge_1086 = edge_1084;

edge_1088=null;
if(edge_1088===null ){
  edge_1088 = edge_1098;
} else if (edge_1098 !== null){
  throw ('error:multiple active assignments to the same signal edge_1088 : '+edge_1088 + ' and ' + edge_1098);
}if(edge_1088===null ){
  edge_1088 = edge_1090;
} else if (edge_1090 !== null){
  throw ('error:multiple active assignments to the same signal edge_1088 : '+edge_1088 + ' and ' + edge_1090);
}
if(edge_1050 === active && edge_1065!==null && edge_1065!==undefined) {edge_1037 = edge_1065(edge_1088);}

edge_1035 = {};
edge_1035['cond'] = edge_1037;
edge_1035['a'] = edge_1086;
edge_1035['b'] = edge_1038;

if(edge_1049 === active && edge_1061!==null && edge_1061!==undefined) {edge_974 = edge_1061(edge_1035);}

if(edge_1048 === active && edge_966!==null && edge_966!==undefined) {edge_1076 = edge_966(edge_974);}

edge_1082 = edge_1076;
edge_1078 = edge_1076;

edge_1080=null;
if(edge_1080===null ){
  edge_1080 = edge_1096;
} else if (edge_1096 !== null){
  throw ('error:multiple active assignments to the same signal edge_1080 : '+edge_1080 + ' and ' + edge_1096);
}if(edge_1080===null ){
  edge_1080 = edge_1082;
} else if (edge_1082 !== null){
  throw ('error:multiple active assignments to the same signal edge_1080 : '+edge_1080 + ' and ' + edge_1082);
}
if(edge_1058 === active) {
nextState['state_1010'] = edge_1080;
}

theInterface.theResult=edge_1078;

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
      state: {state_1002:null,
state_1010:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};