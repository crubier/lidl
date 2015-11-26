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

var edge_1054 = inactive;
var edge_1059 = inactive;
var edge_1061 = inactive;
var edge_1064 = inactive;
var edge_1069 = inactive;
var edge_1072 = inactive;
var edge_1080 = inactive;
var edge_1085 = inactive;
var edge_1086 = inactive;
var edge_1087 = inactive;
var edge_1088 = inactive;
var edge_1089 = inactive;
var edge_1090 = inactive;
var edge_1092 = inactive;
var edge_1094 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1094 = inactive; //Fake sender node

edge_1064 = return1;

edge_1059 = isActive;

edge_1054 = boolNot;

edge_1085 = active;

edge_1086 = edge_1085;
edge_1087 = edge_1085;
edge_1088 = edge_1085;
edge_1089 = edge_1085;
edge_1090 = edge_1085;

if(edge_1089 === active) {
edge_1069 = previousState['state_1066'];
}

if(edge_1088 === active && edge_1064!==null && edge_1064!==undefined) {edge_1072 = edge_1064(edge_1094);}

if(edge_1090 === active) {
nextState['state_1066'] = edge_1072;
}

if(edge_1087 === active && edge_1059!==null && edge_1059!==undefined) {edge_1061 = edge_1059(edge_1069);}

if(edge_1086 === active && edge_1054!==null && edge_1054!==undefined) {edge_1080 = edge_1054(edge_1061);}

theInterface.theResult=edge_1080;

edge_1092=theInterface.theNumber;

// We dont care about edge_1092, this is a fake receiver node

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
      state: {state_1066:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};