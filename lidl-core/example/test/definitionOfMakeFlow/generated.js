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

var edge_1993 = inactive;
var edge_2001 = inactive;
var edge_2015 = inactive;
var edge_2022 = inactive;
var edge_2026 = inactive;
var edge_2032 = inactive;
var edge_2062 = inactive;
var edge_2064 = inactive;
var edge_2065 = inactive;
var edge_2068 = inactive;
var edge_2069 = inactive;
var edge_2072 = inactive;
var edge_2074 = inactive;
var edge_2075 = inactive;
var edge_2076 = inactive;
var edge_2077 = inactive;
var edge_2078 = inactive;
var edge_2079 = inactive;
var edge_2080 = inactive;
var edge_2081 = inactive;
var edge_2082 = inactive;
var edge_2083 = inactive;
var edge_2084 = inactive;
var edge_2085 = inactive;
var edge_2087 = inactive;
var edge_2088 = inactive;
var edge_2089 = inactive;
var edge_2091 = inactive;
var edge_2092 = inactive;
var edge_2093 = inactive;
var edge_2095 = inactive;
var edge_2097 = inactive;
var edge_2099 = inactive;
var edge_2101 = inactive;
var edge_2103 = inactive;
var edge_2105 = inactive;
var edge_2107 = inactive;
var edge_2109 = inactive;
var edge_2111 = inactive;
var edge_2113 = inactive;
var edge_2115 = inactive;
var edge_2117 = inactive;
var edge_2119 = inactive;
var edge_2121 = inactive;
var edge_2123 = inactive;
var edge_2125 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_2125 = inactive; //Fake sender node

edge_2123 = inactive; //Fake sender node

edge_2121 = inactive; //Fake sender node

edge_2119 = inactive; //Fake sender node

edge_2026 = return1;

edge_2015 = boolNot;

edge_2091 = isActive;

edge_2092 = edge_2091;
edge_2093 = edge_2091;

edge_2087 = ifThenElse;

edge_2088 = edge_2087;
edge_2089 = edge_2087;

edge_1993 = identity;

edge_2074 = active;

edge_2075 = edge_2074;
edge_2076 = edge_2074;
edge_2077 = edge_2074;
edge_2078 = edge_2074;
edge_2079 = edge_2074;
edge_2080 = edge_2074;
edge_2081 = edge_2074;
edge_2082 = edge_2074;
edge_2083 = edge_2074;
edge_2084 = edge_2074;
edge_2085 = edge_2074;

if(edge_2084 === active) {
edge_2072 = previousState['state_2037'];
}

if(edge_2082 === active) {
edge_2032 = previousState['state_2029'];
}

if(edge_2081 === active && edge_2026!==null && edge_2026!==undefined) {edge_2095 = edge_2026(edge_2119);}

edge_2101 = edge_2095;
edge_2097 = edge_2095;

edge_2099=null;
if(edge_2099===null ){
  edge_2099 = edge_2121;
} else if (edge_2121 !== null){
  throw ('error:multiple active assignments to the same signal edge_2099 : '+edge_2099 + ' and ' + edge_2121);
}if(edge_2099===null ){
  edge_2099 = edge_2101;
} else if (edge_2101 !== null){
  throw ('error:multiple active assignments to the same signal edge_2099 : '+edge_2099 + ' and ' + edge_2101);
}
if(edge_2083 === active) {
nextState['state_2029'] = edge_2099;
}

if(edge_2080 === active && edge_2093!==null && edge_2093!==undefined) {edge_2022 = edge_2093(edge_2032);}

if(edge_2079 === active && edge_2015!==null && edge_2015!==undefined) {edge_2069 = edge_2015(edge_2022);}

edge_2068 = {};
edge_2068['cond'] = edge_2069;
edge_2068['a'] = edge_2097;
edge_2068['b'] = edge_2072;

if(edge_2078 === active && edge_2089!==null && edge_2089!==undefined) {edge_2065 = edge_2089(edge_2068);}

edge_2111=theInterface.theNumber;

edge_2117 = edge_2111;
edge_2113 = edge_2111;

edge_2115=null;
if(edge_2115===null ){
  edge_2115 = edge_2125;
} else if (edge_2125 !== null){
  throw ('error:multiple active assignments to the same signal edge_2115 : '+edge_2115 + ' and ' + edge_2125);
}if(edge_2115===null ){
  edge_2115 = edge_2117;
} else if (edge_2117 !== null){
  throw ('error:multiple active assignments to the same signal edge_2115 : '+edge_2115 + ' and ' + edge_2117);
}
if(edge_2077 === active && edge_2092!==null && edge_2092!==undefined) {edge_2064 = edge_2092(edge_2115);}

edge_2062 = {};
edge_2062['cond'] = edge_2064;
edge_2062['a'] = edge_2113;
edge_2062['b'] = edge_2065;

if(edge_2076 === active && edge_2088!==null && edge_2088!==undefined) {edge_2001 = edge_2088(edge_2062);}

if(edge_2075 === active && edge_1993!==null && edge_1993!==undefined) {edge_2103 = edge_1993(edge_2001);}

edge_2109 = edge_2103;
edge_2105 = edge_2103;

edge_2107=null;
if(edge_2107===null ){
  edge_2107 = edge_2123;
} else if (edge_2123 !== null){
  throw ('error:multiple active assignments to the same signal edge_2107 : '+edge_2107 + ' and ' + edge_2123);
}if(edge_2107===null ){
  edge_2107 = edge_2109;
} else if (edge_2109 !== null){
  throw ('error:multiple active assignments to the same signal edge_2107 : '+edge_2107 + ' and ' + edge_2109);
}
if(edge_2085 === active) {
nextState['state_2037'] = edge_2107;
}

theInterface.theResult=edge_2105;

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
      state: {state_2029:null,
state_2037:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};