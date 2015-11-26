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

var edge_1113 = inactive;
var edge_1118 = inactive;
var edge_1120 = inactive;
var edge_1123 = inactive;
var edge_1128 = inactive;
var edge_1131 = inactive;
var edge_1139 = inactive;
var edge_1144 = inactive;
var edge_1145 = inactive;
var edge_1146 = inactive;
var edge_1147 = inactive;
var edge_1148 = inactive;
var edge_1149 = inactive;
var edge_1151 = inactive;
var edge_1153 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1153 = inactive; //Fake sender node

edge_1123 = return1;

edge_1118 = isActive;

edge_1113 = boolNot;

edge_1144 = active;

edge_1145 = edge_1144;
edge_1146 = edge_1144;
edge_1147 = edge_1144;
edge_1148 = edge_1144;
edge_1149 = edge_1144;

if(edge_1148 === active) {
edge_1128 = previousState['state_1125'];
}

if(edge_1147 === active && edge_1123!==null && edge_1123!==undefined) {edge_1131 = edge_1123(edge_1153);}

if(edge_1149 === active) {
nextState['state_1125'] = edge_1131;
}

if(edge_1146 === active && edge_1118!==null && edge_1118!==undefined) {edge_1120 = edge_1118(edge_1128);}

if(edge_1145 === active && edge_1113!==null && edge_1113!==undefined) {edge_1139 = edge_1113(edge_1120);}

theInterface.theResult=edge_1139;

edge_1151=theInterface.theNumber;

// We dont care about edge_1151, this is a fake receiver node

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
      state: {state_1125:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};