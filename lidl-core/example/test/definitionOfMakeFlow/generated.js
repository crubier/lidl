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

var edge_1655 = inactive;
var edge_1663 = inactive;
var edge_1677 = inactive;
var edge_1684 = inactive;
var edge_1703 = inactive;
var edge_1736 = inactive;
var edge_1738 = inactive;
var edge_1739 = inactive;
var edge_1742 = inactive;
var edge_1743 = inactive;
var edge_1749 = inactive;
var edge_1751 = inactive;
var edge_1752 = inactive;
var edge_1753 = inactive;
var edge_1754 = inactive;
var edge_1755 = inactive;
var edge_1756 = inactive;
var edge_1757 = inactive;
var edge_1760 = inactive;
var edge_1761 = inactive;
var edge_1762 = inactive;
var edge_1763 = inactive;
var edge_1765 = inactive;
var edge_1766 = inactive;
var edge_1767 = inactive;
var edge_1769 = inactive;
var edge_1770 = inactive;
var edge_1771 = inactive;
var edge_1773 = inactive;
var edge_1777 = inactive;
var edge_1778 = inactive;
var edge_1779 = inactive;
var edge_1781 = inactive;
var edge_1791 = inactive;
var edge_1793 = inactive;
var edge_1794 = inactive;
var edge_1795 = inactive;
var edge_1796 = inactive;
var edge_1798 = inactive;
var edge_1800 = inactive;
var edge_1802 = inactive;
var edge_1804 = inactive;
var edge_1806 = inactive;
var edge_1808 = inactive;
var edge_1810 = inactive;
var edge_1812 = inactive;
var edge_1814 = inactive;
var edge_1815 = inactive;
var edge_1816 = inactive;
var edge_1818 = inactive;
var edge_1819 = inactive;
var edge_1820 = inactive;
var edge_1821 = inactive;
var edge_1822 = inactive;
var edge_1824 = inactive;
var edge_1826 = inactive;
var edge_1828 = inactive;
var edge_1830 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1830 = inactive; //Fake sender node

edge_1828 = inactive; //Fake sender node

edge_1826 = inactive; //Fake sender node

edge_1824 = inactive; //Fake sender node

edge_1773 = return1;

edge_1778 = edge_1773;
edge_1779 = edge_1773;

edge_1777=null;
if(edge_1777===null ){
  edge_1777 = edge_1778;
} else if (edge_1778 !== null){
  throw('error:multiple active assignments to the same signal edge_1777 : '+edge_1777 + ' and ' + edge_1778);
}if(edge_1777===null ){
  edge_1777 = edge_1779;
} else if (edge_1779 !== null){
  throw('error:multiple active assignments to the same signal edge_1777 : '+edge_1777 + ' and ' + edge_1779);
}
edge_1677 = boolNot;

edge_1769 = isActive;

edge_1770 = edge_1769;
edge_1771 = edge_1769;

edge_1765 = ifThenElse;

edge_1766 = edge_1765;
edge_1767 = edge_1765;

edge_1655 = identity;

edge_1751 = active;

edge_1752 = edge_1751;
edge_1753 = edge_1751;
edge_1754 = edge_1751;
edge_1755 = edge_1751;
edge_1756 = edge_1751;
edge_1757 = edge_1751;
edge_1815 = edge_1751;
edge_1816 = edge_1751;
edge_1760 = edge_1751;
edge_1761 = edge_1751;
edge_1762 = edge_1751;
edge_1763 = edge_1751;

edge_1814=null;
if(edge_1814===null ){
  edge_1814 = edge_1815;
} else if (edge_1815 !== null){
  throw('error:multiple active assignments to the same signal edge_1814 : '+edge_1814 + ' and ' + edge_1815);
}if(edge_1814===null ){
  edge_1814 = edge_1816;
} else if (edge_1816 !== null){
  throw('error:multiple active assignments to the same signal edge_1814 : '+edge_1814 + ' and ' + edge_1816);
}
if(edge_1814 === active && edge_1777!==null && edge_1777!==undefined) {edge_1781 = edge_1777(edge_1824);}

edge_1793 = edge_1781;
edge_1794 = edge_1781;
edge_1795 = edge_1781;
edge_1796 = edge_1781;
edge_1819 = edge_1781;
edge_1820 = edge_1781;
edge_1821 = edge_1781;
edge_1822 = edge_1781;

edge_1818=null;
if(edge_1818===null ){
  edge_1818 = edge_1819;
} else if (edge_1819 !== null){
  throw('error:multiple active assignments to the same signal edge_1818 : '+edge_1818 + ' and ' + edge_1819);
}if(edge_1818===null ){
  edge_1818 = edge_1820;
} else if (edge_1820 !== null){
  throw('error:multiple active assignments to the same signal edge_1818 : '+edge_1818 + ' and ' + edge_1820);
}if(edge_1818===null ){
  edge_1818 = edge_1821;
} else if (edge_1821 !== null){
  throw('error:multiple active assignments to the same signal edge_1818 : '+edge_1818 + ' and ' + edge_1821);
}if(edge_1818===null ){
  edge_1818 = edge_1822;
} else if (edge_1822 !== null){
  throw('error:multiple active assignments to the same signal edge_1818 : '+edge_1818 + ' and ' + edge_1822);
}
edge_1791=null;
if(edge_1791===null ){
  edge_1791 = edge_1826;
} else if (edge_1826 !== null){
  throw('error:multiple active assignments to the same signal edge_1791 : '+edge_1791 + ' and ' + edge_1826);
}if(edge_1791===null ){
  edge_1791 = edge_1793;
} else if (edge_1793 !== null){
  throw('error:multiple active assignments to the same signal edge_1791 : '+edge_1791 + ' and ' + edge_1793);
}if(edge_1791===null ){
  edge_1791 = edge_1794;
} else if (edge_1794 !== null){
  throw('error:multiple active assignments to the same signal edge_1791 : '+edge_1791 + ' and ' + edge_1794);
}if(edge_1791===null ){
  edge_1791 = edge_1795;
} else if (edge_1795 !== null){
  throw('error:multiple active assignments to the same signal edge_1791 : '+edge_1791 + ' and ' + edge_1795);
}if(edge_1791===null ){
  edge_1791 = edge_1796;
} else if (edge_1796 !== null){
  throw('error:multiple active assignments to the same signal edge_1791 : '+edge_1791 + ' and ' + edge_1796);
}
if(edge_1762 === active) {
edge_1749 = previousState['state_1711'];
}

if(edge_1761 === active) {
nextState['state_1700'] = edge_1791;
}

if(edge_1760 === active) {
edge_1703 = previousState['state_1700'];
}

if(edge_1757 === active && edge_1771!==null && edge_1771!==undefined) {edge_1684 = edge_1771(edge_1703);}

if(edge_1756 === active && edge_1677!==null && edge_1677!==undefined) {edge_1743 = edge_1677(edge_1684);}

edge_1742 = {};
edge_1742['cond'] = edge_1743;
edge_1742['a'] = edge_1818;
edge_1742['b'] = edge_1749;

if(edge_1755 === active && edge_1767!==null && edge_1767!==undefined) {edge_1739 = edge_1767(edge_1742);}

edge_1806=theInterface.theNumber;

edge_1812 = edge_1806;
edge_1808 = edge_1806;

edge_1810=null;
if(edge_1810===null ){
  edge_1810 = edge_1830;
} else if (edge_1830 !== null){
  throw('error:multiple active assignments to the same signal edge_1810 : '+edge_1810 + ' and ' + edge_1830);
}if(edge_1810===null ){
  edge_1810 = edge_1812;
} else if (edge_1812 !== null){
  throw('error:multiple active assignments to the same signal edge_1810 : '+edge_1810 + ' and ' + edge_1812);
}
if(edge_1754 === active && edge_1770!==null && edge_1770!==undefined) {edge_1738 = edge_1770(edge_1810);}

edge_1736 = {};
edge_1736['cond'] = edge_1738;
edge_1736['a'] = edge_1808;
edge_1736['b'] = edge_1739;

if(edge_1753 === active && edge_1766!==null && edge_1766!==undefined) {edge_1663 = edge_1766(edge_1736);}

if(edge_1752 === active && edge_1655!==null && edge_1655!==undefined) {edge_1798 = edge_1655(edge_1663);}

edge_1804 = edge_1798;
edge_1800 = edge_1798;

edge_1802=null;
if(edge_1802===null ){
  edge_1802 = edge_1828;
} else if (edge_1828 !== null){
  throw('error:multiple active assignments to the same signal edge_1802 : '+edge_1802 + ' and ' + edge_1828);
}if(edge_1802===null ){
  edge_1802 = edge_1804;
} else if (edge_1804 !== null){
  throw('error:multiple active assignments to the same signal edge_1802 : '+edge_1802 + ' and ' + edge_1804);
}
if(edge_1763 === active) {
nextState['state_1711'] = edge_1802;
}

theInterface.theResult=edge_1800;

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
      state: {state_1700:null,
state_1711:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};