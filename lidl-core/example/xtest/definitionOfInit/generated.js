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

var edge_1000 = inactive;
var edge_1004 = inactive;
var edge_1009 = inactive;
var edge_1010 = inactive;
var edge_1015 = inactive;
var edge_1018 = inactive;
var edge_1025 = inactive;
var edge_1029 = inactive;
var edge_1030 = inactive;
var edge_1031 = inactive;
var edge_1032 = inactive;
var edge_1033 = inactive;
var edge_1034 = inactive;
var edge_1036 = inactive;
var edge_1038 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1038 = inactive; //Fake sender node

edge_1000 = return1;

edge_1004 = isActive;

edge_1009 = boolNot;

edge_1029 = active;

edge_1030 = edge_1029;
edge_1031 = edge_1029;
edge_1032 = edge_1029;
edge_1033 = edge_1029;
edge_1034 = edge_1029;

if(edge_1033 === active) {
edge_1015 = previousState['state_1012'];
}

if(edge_1031 === active && edge_1004!==null && edge_1004!==undefined) {edge_1010 = edge_1004(edge_1015);}

if(edge_1032 === active && edge_1009!==null && edge_1009!==undefined) {edge_1025 = edge_1009(edge_1010);}

if(edge_1030 === active && edge_1000!==null && edge_1000!==undefined) {edge_1018 = edge_1000(edge_1038);}

if(edge_1034 === active) {
nextState['state_1012'] = edge_1018;
}

theInterface.theResult=edge_1025;

edge_1036=theInterface.theNumber;

// We dont care about edge_1036, this is a fake receiver node

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
      state: {state_1012:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};