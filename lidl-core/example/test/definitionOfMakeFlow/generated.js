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

var edge_1184 = inactive;
var edge_1191 = inactive;
var edge_1195 = inactive;
var edge_1201 = inactive;
var edge_1231 = inactive;
var edge_1233 = inactive;
var edge_1234 = inactive;
var edge_1237 = inactive;
var edge_1238 = inactive;
var edge_1241 = inactive;
var edge_1246 = inactive;
var edge_1248 = inactive;
var edge_1249 = inactive;
var edge_1250 = inactive;
var edge_1251 = inactive;
var edge_1252 = inactive;
var edge_1253 = inactive;
var edge_1254 = inactive;
var edge_1255 = inactive;
var edge_1256 = inactive;
var edge_1257 = inactive;
var edge_1258 = inactive;
var edge_1259 = inactive;
var edge_1261 = inactive;
var edge_1262 = inactive;
var edge_1263 = inactive;
var edge_1265 = inactive;
var edge_1266 = inactive;
var edge_1267 = inactive;
var edge_1269 = inactive;
var edge_1271 = inactive;
var edge_1273 = inactive;
var edge_1275 = inactive;
var edge_1277 = inactive;
var edge_1279 = inactive;
var edge_1281 = inactive;
var edge_1283 = inactive;
var edge_1285 = inactive;
var edge_1286 = inactive;
var edge_1287 = inactive;
var edge_1289 = inactive;
var edge_1291 = inactive;
var edge_1293 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1293 = inactive; //Fake sender node

edge_1291 = inactive; //Fake sender node

edge_1289 = inactive; //Fake sender node

edge_1195 = return1;

edge_1184 = boolNot;

edge_1265 = isActive;

edge_1266 = edge_1265;
edge_1267 = edge_1265;

edge_1261 = ifThenElse;

edge_1262 = edge_1261;
edge_1263 = edge_1261;

edge_1248 = active;

edge_1249 = edge_1248;
edge_1250 = edge_1248;
edge_1251 = edge_1248;
edge_1252 = edge_1248;
edge_1253 = edge_1248;
edge_1254 = edge_1248;
edge_1255 = edge_1248;
edge_1256 = edge_1248;
edge_1257 = edge_1248;
edge_1258 = edge_1248;
edge_1259 = edge_1248;

if(edge_1257 === active) {
edge_1241 = previousState['state_1206'];
}

if(edge_1255 === active) {
edge_1201 = previousState['state_1198'];
}

if(edge_1254 === active && edge_1195!==null && edge_1195!==undefined) {edge_1269 = edge_1195(edge_1289);}

edge_1275 = edge_1269;
edge_1271 = edge_1269;

edge_1273=null;
if(edge_1273===null ){
  edge_1273 = edge_1291;
} else if (edge_1291 !== null){
  throw ('error:multiple active assignments to the same signal edge_1273 : '+edge_1273 + ' and ' + edge_1291);
}if(edge_1273===null ){
  edge_1273 = edge_1275;
} else if (edge_1275 !== null){
  throw ('error:multiple active assignments to the same signal edge_1273 : '+edge_1273 + ' and ' + edge_1275);
}
if(edge_1256 === active) {
nextState['state_1198'] = edge_1273;
}

if(edge_1253 === active && edge_1267!==null && edge_1267!==undefined) {edge_1191 = edge_1267(edge_1201);}

if(edge_1252 === active && edge_1184!==null && edge_1184!==undefined) {edge_1238 = edge_1184(edge_1191);}

edge_1237 = {};
edge_1237['cond'] = edge_1238;
edge_1237['a'] = edge_1271;
edge_1237['b'] = edge_1241;

if(edge_1251 === active && edge_1263!==null && edge_1263!==undefined) {edge_1234 = edge_1263(edge_1237);}

edge_1277=theInterface.theNumber;

edge_1283 = edge_1277;
edge_1279 = edge_1277;

edge_1281=null;
if(edge_1281===null ){
  edge_1281 = edge_1293;
} else if (edge_1293 !== null){
  throw ('error:multiple active assignments to the same signal edge_1281 : '+edge_1281 + ' and ' + edge_1293);
}if(edge_1281===null ){
  edge_1281 = edge_1283;
} else if (edge_1283 !== null){
  throw ('error:multiple active assignments to the same signal edge_1281 : '+edge_1281 + ' and ' + edge_1283);
}
if(edge_1250 === active && edge_1266!==null && edge_1266!==undefined) {edge_1233 = edge_1266(edge_1281);}

edge_1231 = {};
edge_1231['cond'] = edge_1233;
edge_1231['a'] = edge_1279;
edge_1231['b'] = edge_1234;

if(edge_1249 === active && edge_1262!==null && edge_1262!==undefined) {edge_1246 = edge_1262(edge_1231);}

if(edge_1259 === active) {edge_1285 = edge_1246;}

edge_1286 = edge_1285;
edge_1287 = edge_1285;

if(edge_1258 === active) {
nextState['state_1206'] = edge_1286;
}

theInterface.theResult=edge_1287;

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
      state: {state_1198:null,
state_1206:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};