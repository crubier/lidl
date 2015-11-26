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

var edge_1538 = inactive;
var edge_1545 = inactive;
var edge_1549 = inactive;
var edge_1555 = inactive;
var edge_1585 = inactive;
var edge_1587 = inactive;
var edge_1588 = inactive;
var edge_1591 = inactive;
var edge_1592 = inactive;
var edge_1595 = inactive;
var edge_1600 = inactive;
var edge_1602 = inactive;
var edge_1603 = inactive;
var edge_1604 = inactive;
var edge_1605 = inactive;
var edge_1606 = inactive;
var edge_1607 = inactive;
var edge_1608 = inactive;
var edge_1609 = inactive;
var edge_1610 = inactive;
var edge_1611 = inactive;
var edge_1612 = inactive;
var edge_1613 = inactive;
var edge_1615 = inactive;
var edge_1616 = inactive;
var edge_1617 = inactive;
var edge_1619 = inactive;
var edge_1620 = inactive;
var edge_1621 = inactive;
var edge_1623 = inactive;
var edge_1625 = inactive;
var edge_1627 = inactive;
var edge_1629 = inactive;
var edge_1631 = inactive;
var edge_1633 = inactive;
var edge_1635 = inactive;
var edge_1637 = inactive;
var edge_1639 = inactive;
var edge_1640 = inactive;
var edge_1641 = inactive;
var edge_1643 = inactive;
var edge_1645 = inactive;
var edge_1647 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1647 = inactive; //Fake sender node

edge_1645 = inactive; //Fake sender node

edge_1643 = inactive; //Fake sender node

edge_1549 = return1;

edge_1538 = boolNot;

edge_1619 = isActive;

edge_1620 = edge_1619;
edge_1621 = edge_1619;

edge_1615 = ifThenElse;

edge_1616 = edge_1615;
edge_1617 = edge_1615;

edge_1602 = active;

edge_1603 = edge_1602;
edge_1604 = edge_1602;
edge_1605 = edge_1602;
edge_1606 = edge_1602;
edge_1607 = edge_1602;
edge_1608 = edge_1602;
edge_1609 = edge_1602;
edge_1610 = edge_1602;
edge_1611 = edge_1602;
edge_1612 = edge_1602;
edge_1613 = edge_1602;

if(edge_1611 === active) {
edge_1595 = previousState['state_1560'];
}

if(edge_1609 === active) {
edge_1555 = previousState['state_1552'];
}

if(edge_1608 === active && edge_1549!==null && edge_1549!==undefined) {edge_1623 = edge_1549(edge_1643);}

edge_1629 = edge_1623;
edge_1625 = edge_1623;

edge_1627=null;
if(edge_1627===null ){
  edge_1627 = edge_1645;
} else if (edge_1645 !== null){
  throw ('error:multiple active assignments to the same signal edge_1627 : '+edge_1627 + ' and ' + edge_1645);
}if(edge_1627===null ){
  edge_1627 = edge_1629;
} else if (edge_1629 !== null){
  throw ('error:multiple active assignments to the same signal edge_1627 : '+edge_1627 + ' and ' + edge_1629);
}
if(edge_1610 === active) {
nextState['state_1552'] = edge_1627;
}

if(edge_1607 === active && edge_1621!==null && edge_1621!==undefined) {edge_1545 = edge_1621(edge_1555);}

if(edge_1606 === active && edge_1538!==null && edge_1538!==undefined) {edge_1592 = edge_1538(edge_1545);}

edge_1591 = {};
edge_1591['cond'] = edge_1592;
edge_1591['a'] = edge_1625;
edge_1591['b'] = edge_1595;

if(edge_1605 === active && edge_1617!==null && edge_1617!==undefined) {edge_1588 = edge_1617(edge_1591);}

edge_1631=theInterface.theNumber;

edge_1637 = edge_1631;
edge_1633 = edge_1631;

edge_1635=null;
if(edge_1635===null ){
  edge_1635 = edge_1647;
} else if (edge_1647 !== null){
  throw ('error:multiple active assignments to the same signal edge_1635 : '+edge_1635 + ' and ' + edge_1647);
}if(edge_1635===null ){
  edge_1635 = edge_1637;
} else if (edge_1637 !== null){
  throw ('error:multiple active assignments to the same signal edge_1635 : '+edge_1635 + ' and ' + edge_1637);
}
if(edge_1604 === active && edge_1620!==null && edge_1620!==undefined) {edge_1587 = edge_1620(edge_1635);}

edge_1585 = {};
edge_1585['cond'] = edge_1587;
edge_1585['a'] = edge_1633;
edge_1585['b'] = edge_1588;

if(edge_1603 === active && edge_1616!==null && edge_1616!==undefined) {edge_1600 = edge_1616(edge_1585);}

if(edge_1613 === active) {edge_1639 = edge_1600;}

edge_1640 = edge_1639;
edge_1641 = edge_1639;

if(edge_1612 === active) {
nextState['state_1560'] = edge_1640;
}

theInterface.theResult=edge_1641;

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
      state: {state_1552:null,
state_1560:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};