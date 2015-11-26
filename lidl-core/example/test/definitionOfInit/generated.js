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

var edge_1214 = inactive;
var edge_1219 = inactive;
var edge_1221 = inactive;
var edge_1224 = inactive;
var edge_1229 = inactive;
var edge_1232 = inactive;
var edge_1240 = inactive;
var edge_1245 = inactive;
var edge_1246 = inactive;
var edge_1247 = inactive;
var edge_1248 = inactive;
var edge_1249 = inactive;
var edge_1250 = inactive;
var edge_1252 = inactive;
var edge_1254 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1254 = inactive; //Fake sender node

edge_1224 = return1;

edge_1219 = isActive;

edge_1214 = boolNot;

edge_1245 = active;

edge_1246 = edge_1245;
edge_1247 = edge_1245;
edge_1248 = edge_1245;
edge_1249 = edge_1245;
edge_1250 = edge_1245;

if(edge_1249 === active) {
edge_1229 = previousState['state_1226'];
}

if(edge_1248 === active && edge_1224!==null && edge_1224!==undefined) {edge_1232 = edge_1224(edge_1254);}

if(edge_1250 === active) {
nextState['state_1226'] = edge_1232;
}

if(edge_1247 === active && edge_1219!==null && edge_1219!==undefined) {edge_1221 = edge_1219(edge_1229);}

if(edge_1246 === active && edge_1214!==null && edge_1214!==undefined) {edge_1240 = edge_1214(edge_1221);}

theInterface.theResult=edge_1240;

edge_1252=theInterface.theNumber;

// We dont care about edge_1252, this is a fake receiver node

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
      state: {state_1226:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};