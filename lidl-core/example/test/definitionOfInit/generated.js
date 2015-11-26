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

var edge_1198 = inactive;
var edge_1203 = inactive;
var edge_1205 = inactive;
var edge_1208 = inactive;
var edge_1213 = inactive;
var edge_1216 = inactive;
var edge_1224 = inactive;
var edge_1229 = inactive;
var edge_1230 = inactive;
var edge_1231 = inactive;
var edge_1232 = inactive;
var edge_1233 = inactive;
var edge_1234 = inactive;
var edge_1236 = inactive;
var edge_1238 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1238 = inactive; //Fake sender node

edge_1208 = return1;

edge_1203 = isActive;

edge_1198 = boolNot;

edge_1229 = active;

edge_1230 = edge_1229;
edge_1231 = edge_1229;
edge_1232 = edge_1229;
edge_1233 = edge_1229;
edge_1234 = edge_1229;

if(edge_1233 === active) {
edge_1213 = previousState['state_1210'];
}

if(edge_1232 === active && edge_1208!==null && edge_1208!==undefined) {edge_1216 = edge_1208(edge_1238);}

if(edge_1234 === active) {
nextState['state_1210'] = edge_1216;
}

if(edge_1231 === active && edge_1203!==null && edge_1203!==undefined) {edge_1205 = edge_1203(edge_1213);}

if(edge_1230 === active && edge_1198!==null && edge_1198!==undefined) {edge_1224 = edge_1198(edge_1205);}

theInterface.theResult=edge_1224;

edge_1236=theInterface.theNumber;

// We dont care about edge_1236, this is a fake receiver node

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
      state: {state_1210:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};