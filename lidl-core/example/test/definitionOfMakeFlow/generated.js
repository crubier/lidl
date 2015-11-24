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

var edge_1649 = inactive;
var edge_1657 = inactive;
var edge_1671 = inactive;
var edge_1678 = inactive;
var edge_1682 = inactive;
var edge_1688 = inactive;
var edge_1718 = inactive;
var edge_1720 = inactive;
var edge_1721 = inactive;
var edge_1724 = inactive;
var edge_1725 = inactive;
var edge_1728 = inactive;
var edge_1730 = inactive;
var edge_1731 = inactive;
var edge_1732 = inactive;
var edge_1733 = inactive;
var edge_1734 = inactive;
var edge_1735 = inactive;
var edge_1736 = inactive;
var edge_1739 = inactive;
var edge_1740 = inactive;
var edge_1741 = inactive;
var edge_1742 = inactive;
var edge_1744 = inactive;
var edge_1745 = inactive;
var edge_1746 = inactive;
var edge_1748 = inactive;
var edge_1749 = inactive;
var edge_1750 = inactive;
var edge_1752 = inactive;
var edge_1754 = inactive;
var edge_1756 = inactive;
var edge_1758 = inactive;
var edge_1760 = inactive;
var edge_1762 = inactive;
var edge_1764 = inactive;
var edge_1766 = inactive;
var edge_1768 = inactive;
var edge_1770 = inactive;
var edge_1772 = inactive;
var edge_1774 = inactive;
var edge_1776 = inactive;
var edge_1777 = inactive;
var edge_1778 = inactive;
var edge_1780 = inactive;
var edge_1782 = inactive;
var edge_1784 = inactive;
var edge_1786 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1786 = inactive; //Fake sender node

edge_1784 = inactive; //Fake sender node

edge_1782 = inactive; //Fake sender node

edge_1780 = inactive; //Fake sender node

edge_1682 = return1;

edge_1671 = boolNot;

edge_1748 = isActive;

edge_1749 = edge_1748;
edge_1750 = edge_1748;

edge_1744 = ifThenElse;

edge_1745 = edge_1744;
edge_1746 = edge_1744;

edge_1649 = identity;

edge_1730 = active;

edge_1731 = edge_1730;
edge_1732 = edge_1730;
edge_1733 = edge_1730;
edge_1734 = edge_1730;
edge_1735 = edge_1730;
edge_1736 = edge_1730;
edge_1777 = edge_1730;
edge_1778 = edge_1730;
edge_1739 = edge_1730;
edge_1740 = edge_1730;
edge_1741 = edge_1730;
edge_1742 = edge_1730;

edge_1776=null;
if(edge_1776===null ){
  edge_1776 = edge_1777;
} else if (edge_1777 !== null){
  throw('error:multiple active assignments to the same signal edge_1776 : '+edge_1776 + ' and ' + edge_1777);
}if(edge_1776===null ){
  edge_1776 = edge_1778;
} else if (edge_1778 !== null){
  throw('error:multiple active assignments to the same signal edge_1776 : '+edge_1776 + ' and ' + edge_1778);
}
if(edge_1776 === active && edge_1682!==null && edge_1682!==undefined) {edge_1752 = edge_1682(edge_1780);}

edge_1758 = edge_1752;
edge_1754 = edge_1752;

edge_1756=null;
if(edge_1756===null ){
  edge_1756 = edge_1782;
} else if (edge_1782 !== null){
  throw('error:multiple active assignments to the same signal edge_1756 : '+edge_1756 + ' and ' + edge_1782);
}if(edge_1756===null ){
  edge_1756 = edge_1758;
} else if (edge_1758 !== null){
  throw('error:multiple active assignments to the same signal edge_1756 : '+edge_1756 + ' and ' + edge_1758);
}
if(edge_1741 === active) {
edge_1728 = previousState['state_1693'];
}

if(edge_1740 === active) {
nextState['state_1685'] = edge_1756;
}

if(edge_1739 === active) {
edge_1688 = previousState['state_1685'];
}

if(edge_1736 === active && edge_1750!==null && edge_1750!==undefined) {edge_1678 = edge_1750(edge_1688);}

if(edge_1735 === active && edge_1671!==null && edge_1671!==undefined) {edge_1725 = edge_1671(edge_1678);}

edge_1724 = {};
edge_1724['cond'] = edge_1725;
edge_1724['a'] = edge_1754;
edge_1724['b'] = edge_1728;

if(edge_1734 === active && edge_1746!==null && edge_1746!==undefined) {edge_1721 = edge_1746(edge_1724);}

edge_1768=theInterface.theNumber;

edge_1774 = edge_1768;
edge_1770 = edge_1768;

edge_1772=null;
if(edge_1772===null ){
  edge_1772 = edge_1786;
} else if (edge_1786 !== null){
  throw('error:multiple active assignments to the same signal edge_1772 : '+edge_1772 + ' and ' + edge_1786);
}if(edge_1772===null ){
  edge_1772 = edge_1774;
} else if (edge_1774 !== null){
  throw('error:multiple active assignments to the same signal edge_1772 : '+edge_1772 + ' and ' + edge_1774);
}
if(edge_1733 === active && edge_1749!==null && edge_1749!==undefined) {edge_1720 = edge_1749(edge_1772);}

edge_1718 = {};
edge_1718['cond'] = edge_1720;
edge_1718['a'] = edge_1770;
edge_1718['b'] = edge_1721;

if(edge_1732 === active && edge_1745!==null && edge_1745!==undefined) {edge_1657 = edge_1745(edge_1718);}

if(edge_1731 === active && edge_1649!==null && edge_1649!==undefined) {edge_1760 = edge_1649(edge_1657);}

edge_1766 = edge_1760;
edge_1762 = edge_1760;

edge_1764=null;
if(edge_1764===null ){
  edge_1764 = edge_1784;
} else if (edge_1784 !== null){
  throw('error:multiple active assignments to the same signal edge_1764 : '+edge_1764 + ' and ' + edge_1784);
}if(edge_1764===null ){
  edge_1764 = edge_1766;
} else if (edge_1766 !== null){
  throw('error:multiple active assignments to the same signal edge_1764 : '+edge_1764 + ' and ' + edge_1766);
}
if(edge_1742 === active) {
nextState['state_1693'] = edge_1764;
}

theInterface.theResult=edge_1762;

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
      state: {state_1685:null,
state_1693:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};