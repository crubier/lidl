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

var edge_1864 = inactive;
var edge_1872 = inactive;
var edge_1886 = inactive;
var edge_1893 = inactive;
var edge_1897 = inactive;
var edge_1903 = inactive;
var edge_1933 = inactive;
var edge_1935 = inactive;
var edge_1936 = inactive;
var edge_1939 = inactive;
var edge_1940 = inactive;
var edge_1943 = inactive;
var edge_1945 = inactive;
var edge_1946 = inactive;
var edge_1947 = inactive;
var edge_1948 = inactive;
var edge_1949 = inactive;
var edge_1950 = inactive;
var edge_1951 = inactive;
var edge_1952 = inactive;
var edge_1953 = inactive;
var edge_1954 = inactive;
var edge_1955 = inactive;
var edge_1956 = inactive;
var edge_1958 = inactive;
var edge_1959 = inactive;
var edge_1960 = inactive;
var edge_1962 = inactive;
var edge_1963 = inactive;
var edge_1964 = inactive;
var edge_1966 = inactive;
var edge_1968 = inactive;
var edge_1970 = inactive;
var edge_1972 = inactive;
var edge_1974 = inactive;
var edge_1976 = inactive;
var edge_1978 = inactive;
var edge_1980 = inactive;
var edge_1982 = inactive;
var edge_1984 = inactive;
var edge_1986 = inactive;
var edge_1988 = inactive;
var edge_1990 = inactive;
var edge_1992 = inactive;
var edge_1994 = inactive;
var edge_1996 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1996 = inactive; //Fake sender node

edge_1994 = inactive; //Fake sender node

edge_1992 = inactive; //Fake sender node

edge_1990 = inactive; //Fake sender node

edge_1897 = return1;

edge_1886 = boolNot;

edge_1962 = isActive;

edge_1963 = edge_1962;
edge_1964 = edge_1962;

edge_1958 = ifThenElse;

edge_1959 = edge_1958;
edge_1960 = edge_1958;

edge_1864 = identity;

edge_1945 = active;

edge_1946 = edge_1945;
edge_1947 = edge_1945;
edge_1948 = edge_1945;
edge_1949 = edge_1945;
edge_1950 = edge_1945;
edge_1951 = edge_1945;
edge_1952 = edge_1945;
edge_1953 = edge_1945;
edge_1954 = edge_1945;
edge_1955 = edge_1945;
edge_1956 = edge_1945;

if(edge_1955 === active) {
edge_1943 = previousState['state_1908'];
}

if(edge_1953 === active) {
edge_1903 = previousState['state_1900'];
}

if(edge_1952 === active && edge_1897!==null && edge_1897!==undefined) {edge_1966 = edge_1897(edge_1990);}

edge_1972 = edge_1966;
edge_1968 = edge_1966;

edge_1970=null;
if(edge_1970===null ){
  edge_1970 = edge_1992;
} else if (edge_1992 !== null){
  throw ('error:multiple active assignments to the same signal edge_1970 : '+edge_1970 + ' and ' + edge_1992);
}if(edge_1970===null ){
  edge_1970 = edge_1972;
} else if (edge_1972 !== null){
  throw ('error:multiple active assignments to the same signal edge_1970 : '+edge_1970 + ' and ' + edge_1972);
}
if(edge_1954 === active) {
nextState['state_1900'] = edge_1970;
}

if(edge_1951 === active && edge_1964!==null && edge_1964!==undefined) {edge_1893 = edge_1964(edge_1903);}

if(edge_1950 === active && edge_1886!==null && edge_1886!==undefined) {edge_1940 = edge_1886(edge_1893);}

edge_1939 = {};
edge_1939['cond'] = edge_1940;
edge_1939['a'] = edge_1968;
edge_1939['b'] = edge_1943;

if(edge_1949 === active && edge_1960!==null && edge_1960!==undefined) {edge_1936 = edge_1960(edge_1939);}

edge_1982=theInterface.theNumber;

edge_1988 = edge_1982;
edge_1984 = edge_1982;

edge_1986=null;
if(edge_1986===null ){
  edge_1986 = edge_1996;
} else if (edge_1996 !== null){
  throw ('error:multiple active assignments to the same signal edge_1986 : '+edge_1986 + ' and ' + edge_1996);
}if(edge_1986===null ){
  edge_1986 = edge_1988;
} else if (edge_1988 !== null){
  throw ('error:multiple active assignments to the same signal edge_1986 : '+edge_1986 + ' and ' + edge_1988);
}
if(edge_1948 === active && edge_1963!==null && edge_1963!==undefined) {edge_1935 = edge_1963(edge_1986);}

edge_1933 = {};
edge_1933['cond'] = edge_1935;
edge_1933['a'] = edge_1984;
edge_1933['b'] = edge_1936;

if(edge_1947 === active && edge_1959!==null && edge_1959!==undefined) {edge_1872 = edge_1959(edge_1933);}

if(edge_1946 === active && edge_1864!==null && edge_1864!==undefined) {edge_1974 = edge_1864(edge_1872);}

edge_1980 = edge_1974;
edge_1976 = edge_1974;

edge_1978=null;
if(edge_1978===null ){
  edge_1978 = edge_1994;
} else if (edge_1994 !== null){
  throw ('error:multiple active assignments to the same signal edge_1978 : '+edge_1978 + ' and ' + edge_1994);
}if(edge_1978===null ){
  edge_1978 = edge_1980;
} else if (edge_1980 !== null){
  throw ('error:multiple active assignments to the same signal edge_1978 : '+edge_1978 + ' and ' + edge_1980);
}
if(edge_1956 === active) {
nextState['state_1908'] = edge_1978;
}

theInterface.theResult=edge_1976;

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
      state: {state_1900:null,
state_1908:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};