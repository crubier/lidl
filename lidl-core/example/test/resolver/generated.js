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

var edge_2886 = inactive;
var edge_2890 = inactive;
var edge_2892 = inactive;
var edge_2894 = inactive;
var edge_2895 = inactive;
var edge_2898 = inactive;
var edge_2899 = inactive;
var edge_2900 = inactive;
var edge_2902 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2902 = active;

// We dont care about edge_2902, this is a fake receiver node

edge_2894=theInterface.theOther;

edge_2895 = edge_2894;
edge_2900 = edge_2894;

edge_2886=theInterface.theNumber;

edge_2892 = edge_2886;
edge_2899 = edge_2886;

edge_2898=null;
if(edge_2898===null ){
  edge_2898 = edge_2899;
} else if (edge_2899 !== null){
  throw ('error:multiple active assignments to the same signal edge_2898 : '+edge_2898 + ' and ' + edge_2899);
}if(edge_2898===null ){
  edge_2898 = edge_2900;
} else if (edge_2900 !== null){
  throw ('error:multiple active assignments to the same signal edge_2898 : '+edge_2898 + ' and ' + edge_2900);
}
theInterface.theResult=edge_2898;

edge_2890=null;
if(edge_2890===null ){
  edge_2890 = edge_2895;
} else if (edge_2895 !== null){
  throw ('error:multiple active assignments to the same signal edge_2890 : '+edge_2890 + ' and ' + edge_2895);
}if(edge_2890===null ){
  edge_2890 = edge_2892;
} else if (edge_2892 !== null){
  throw ('error:multiple active assignments to the same signal edge_2890 : '+edge_2890 + ' and ' + edge_2892);
}
theInterface.theLast=edge_2890;

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
      state: {},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};