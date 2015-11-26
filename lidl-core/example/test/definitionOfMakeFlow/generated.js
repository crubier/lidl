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

var edge_1834 = inactive;
var edge_1841 = inactive;
var edge_1845 = inactive;
var edge_1851 = inactive;
var edge_1881 = inactive;
var edge_1883 = inactive;
var edge_1884 = inactive;
var edge_1887 = inactive;
var edge_1888 = inactive;
var edge_1891 = inactive;
var edge_1896 = inactive;
var edge_1898 = inactive;
var edge_1899 = inactive;
var edge_1900 = inactive;
var edge_1901 = inactive;
var edge_1902 = inactive;
var edge_1903 = inactive;
var edge_1904 = inactive;
var edge_1905 = inactive;
var edge_1906 = inactive;
var edge_1907 = inactive;
var edge_1908 = inactive;
var edge_1909 = inactive;
var edge_1911 = inactive;
var edge_1912 = inactive;
var edge_1913 = inactive;
var edge_1915 = inactive;
var edge_1916 = inactive;
var edge_1917 = inactive;
var edge_1919 = inactive;
var edge_1921 = inactive;
var edge_1923 = inactive;
var edge_1925 = inactive;
var edge_1927 = inactive;
var edge_1929 = inactive;
var edge_1931 = inactive;
var edge_1933 = inactive;
var edge_1935 = inactive;
var edge_1936 = inactive;
var edge_1937 = inactive;
var edge_1939 = inactive;
var edge_1941 = inactive;
var edge_1943 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1943 = inactive; //Fake sender node

edge_1941 = inactive; //Fake sender node

edge_1939 = inactive; //Fake sender node

edge_1845 = return1;

edge_1834 = boolNot;

edge_1915 = isActive;

edge_1916 = edge_1915;
edge_1917 = edge_1915;

edge_1911 = ifThenElse;

edge_1912 = edge_1911;
edge_1913 = edge_1911;

edge_1898 = active;

edge_1899 = edge_1898;
edge_1900 = edge_1898;
edge_1901 = edge_1898;
edge_1902 = edge_1898;
edge_1903 = edge_1898;
edge_1904 = edge_1898;
edge_1905 = edge_1898;
edge_1906 = edge_1898;
edge_1907 = edge_1898;
edge_1908 = edge_1898;
edge_1909 = edge_1898;

if(edge_1907 === active) {
edge_1891 = previousState['state_1856'];
}

if(edge_1905 === active) {
edge_1851 = previousState['state_1848'];
}

if(edge_1904 === active && edge_1845!==null && edge_1845!==undefined) {edge_1919 = edge_1845(edge_1939);}

edge_1925 = edge_1919;
edge_1921 = edge_1919;

edge_1923=null;
if(edge_1923===null ){
  edge_1923 = edge_1941;
} else if (edge_1941 !== null){
  throw ('error:multiple active assignments to the same signal edge_1923 : '+edge_1923 + ' and ' + edge_1941);
}if(edge_1923===null ){
  edge_1923 = edge_1925;
} else if (edge_1925 !== null){
  throw ('error:multiple active assignments to the same signal edge_1923 : '+edge_1923 + ' and ' + edge_1925);
}
if(edge_1906 === active) {
nextState['state_1848'] = edge_1923;
}

if(edge_1903 === active && edge_1917!==null && edge_1917!==undefined) {edge_1841 = edge_1917(edge_1851);}

if(edge_1902 === active && edge_1834!==null && edge_1834!==undefined) {edge_1888 = edge_1834(edge_1841);}

edge_1887 = {};
edge_1887['cond'] = edge_1888;
edge_1887['a'] = edge_1921;
edge_1887['b'] = edge_1891;

if(edge_1901 === active && edge_1913!==null && edge_1913!==undefined) {edge_1884 = edge_1913(edge_1887);}

edge_1927=theInterface.theNumber;

edge_1933 = edge_1927;
edge_1929 = edge_1927;

edge_1931=null;
if(edge_1931===null ){
  edge_1931 = edge_1943;
} else if (edge_1943 !== null){
  throw ('error:multiple active assignments to the same signal edge_1931 : '+edge_1931 + ' and ' + edge_1943);
}if(edge_1931===null ){
  edge_1931 = edge_1933;
} else if (edge_1933 !== null){
  throw ('error:multiple active assignments to the same signal edge_1931 : '+edge_1931 + ' and ' + edge_1933);
}
if(edge_1900 === active && edge_1916!==null && edge_1916!==undefined) {edge_1883 = edge_1916(edge_1931);}

edge_1881 = {};
edge_1881['cond'] = edge_1883;
edge_1881['a'] = edge_1929;
edge_1881['b'] = edge_1884;

if(edge_1899 === active && edge_1912!==null && edge_1912!==undefined) {edge_1896 = edge_1912(edge_1881);}

if(edge_1909 === active) {edge_1935 = edge_1896;}

edge_1936 = edge_1935;
edge_1937 = edge_1935;

if(edge_1908 === active) {
nextState['state_1856'] = edge_1936;
}

theInterface.theResult=edge_1937;

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
      state: {state_1848:null,
state_1856:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};