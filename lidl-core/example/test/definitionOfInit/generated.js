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

var edge_1003 = inactive;
var edge_1008 = inactive;
var edge_1010 = inactive;
var edge_1013 = inactive;
var edge_1018 = inactive;
var edge_1021 = inactive;
var edge_1029 = inactive;
var edge_1034 = inactive;
var edge_1035 = inactive;
var edge_1036 = inactive;
var edge_1037 = inactive;
var edge_1038 = inactive;
var edge_1039 = inactive;
var edge_1041 = inactive;
var edge_1043 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1043 = inactive; //Fake sender node

edge_1013 = return1;

edge_1008 = isActive;

edge_1003 = boolNot;

edge_1034 = active;

edge_1035 = edge_1034;
edge_1036 = edge_1034;
edge_1037 = edge_1034;
edge_1038 = edge_1034;
edge_1039 = edge_1034;

if(edge_1038 === active) {
edge_1018 = previousState['state_1015'];
}

if(edge_1037 === active && edge_1013!==null && edge_1013!==undefined) {edge_1021 = edge_1013(edge_1043);}

if(edge_1039 === active) {
nextState['state_1015'] = edge_1021;
}

if(edge_1036 === active && edge_1008!==null && edge_1008!==undefined) {edge_1010 = edge_1008(edge_1018);}

if(edge_1035 === active && edge_1003!==null && edge_1003!==undefined) {edge_1029 = edge_1003(edge_1010);}

theInterface.theResult=edge_1029;

edge_1041=theInterface.theNumber;

// We dont care about edge_1041, this is a fake receiver node

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
      state: {state_1015:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};