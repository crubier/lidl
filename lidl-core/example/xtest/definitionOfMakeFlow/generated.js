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

var edge_1715 = inactive;
var edge_1725 = inactive;
var edge_1726 = inactive;
var edge_1741 = inactive;
var edge_1771 = inactive;
var edge_1772 = inactive;
var edge_1773 = inactive;
var edge_1777 = inactive;
var edge_1778 = inactive;
var edge_1779 = inactive;
var edge_1784 = inactive;
var edge_1786 = inactive;
var edge_1787 = inactive;
var edge_1788 = inactive;
var edge_1789 = inactive;
var edge_1790 = inactive;
var edge_1791 = inactive;
var edge_1792 = inactive;
var edge_1793 = inactive;
var edge_1794 = inactive;
var edge_1795 = inactive;
var edge_1796 = inactive;
var edge_1797 = inactive;
var edge_1799 = inactive;
var edge_1800 = inactive;
var edge_1801 = inactive;
var edge_1803 = inactive;
var edge_1804 = inactive;
var edge_1805 = inactive;
var edge_1807 = inactive;
var edge_1808 = inactive;
var edge_1809 = inactive;
var edge_1811 = inactive;
var edge_1813 = inactive;
var edge_1815 = inactive;
var edge_1817 = inactive;
var edge_1819 = inactive;
var edge_1820 = inactive;
var edge_1821 = inactive;
var edge_1823 = inactive;
var edge_1825 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1825 = inactive; //Fake sender node

edge_1823 = inactive; //Fake sender node

edge_1715 = return1;

edge_1725 = boolNot;

edge_1799 = isActive;

edge_1800 = edge_1799;
edge_1801 = edge_1799;

edge_1803 = ifThenElse;

edge_1804 = edge_1803;
edge_1805 = edge_1803;

edge_1786 = active;

edge_1787 = edge_1786;
edge_1788 = edge_1786;
edge_1789 = edge_1786;
edge_1790 = edge_1786;
edge_1791 = edge_1786;
edge_1792 = edge_1786;
edge_1793 = edge_1786;
edge_1794 = edge_1786;
edge_1795 = edge_1786;
edge_1796 = edge_1786;
edge_1797 = edge_1786;

if(edge_1795 === active) {
edge_1773 = previousState['state_1745'];
}

if(edge_1793 === active) {
edge_1741 = previousState['state_1738'];
}

if(edge_1789 === active && edge_1801!==null && edge_1801!==undefined) {edge_1726 = edge_1801(edge_1741);}

if(edge_1790 === active && edge_1725!==null && edge_1725!==undefined) {edge_1771 = edge_1725(edge_1726);}

if(edge_1788 === active && edge_1715!==null && edge_1715!==undefined) {edge_1807 = edge_1715(edge_1823);}

edge_1808 = edge_1807;
edge_1809 = edge_1807;

edge_1772 = {};
edge_1772['cond'] = edge_1771;
edge_1772['a'] = edge_1809;
edge_1772['b'] = edge_1773;

if(edge_1791 === active && edge_1804!==null && edge_1804!==undefined) {edge_1778 = edge_1804(edge_1772);}

if(edge_1794 === active) {
nextState['state_1738'] = edge_1808;
}

edge_1811=theInterface.theNumber;

edge_1817 = edge_1811;
edge_1813 = edge_1811;

edge_1815=null;
if(edge_1815===null ){
  edge_1815 = edge_1825;
} else if (edge_1825 !== null){
  throw ('error:multiple active assignments to the same signal edge_1815 : '+edge_1815 + ' and ' + edge_1825);
}if(edge_1815===null ){
  edge_1815 = edge_1817;
} else if (edge_1817 !== null){
  throw ('error:multiple active assignments to the same signal edge_1815 : '+edge_1815 + ' and ' + edge_1817);
}
if(edge_1787 === active && edge_1800!==null && edge_1800!==undefined) {edge_1777 = edge_1800(edge_1815);}

edge_1779 = {};
edge_1779['cond'] = edge_1777;
edge_1779['a'] = edge_1813;
edge_1779['b'] = edge_1778;

if(edge_1792 === active && edge_1805!==null && edge_1805!==undefined) {edge_1784 = edge_1805(edge_1779);}

if(edge_1797 === active) {edge_1819 = edge_1784;}

edge_1820 = edge_1819;
edge_1821 = edge_1819;

if(edge_1796 === active) {
nextState['state_1745'] = edge_1821;
}

theInterface.theResult=edge_1820;

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
      state: {state_1738:null,
state_1745:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};