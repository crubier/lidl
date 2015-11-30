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

var edge_1527 = inactive;
var edge_1528 = inactive;
var edge_1543 = inactive;
var edge_1573 = inactive;
var edge_1574 = inactive;
var edge_1575 = inactive;
var edge_1579 = inactive;
var edge_1580 = inactive;
var edge_1581 = inactive;
var edge_1586 = inactive;
var edge_1588 = inactive;
var edge_1589 = inactive;
var edge_1590 = inactive;
var edge_1591 = inactive;
var edge_1592 = inactive;
var edge_1593 = inactive;
var edge_1594 = inactive;
var edge_1595 = inactive;
var edge_1596 = inactive;
var edge_1597 = inactive;
var edge_1598 = inactive;
var edge_1600 = inactive;
var edge_1601 = inactive;
var edge_1602 = inactive;
var edge_1604 = inactive;
var edge_1605 = inactive;
var edge_1606 = inactive;
var edge_1608 = inactive;
var edge_1609 = inactive;
var edge_1610 = inactive;
var edge_1612 = inactive;
var edge_1614 = inactive;
var edge_1616 = inactive;
var edge_1618 = inactive;
var edge_1620 = inactive;
var edge_1621 = inactive;
var edge_1622 = inactive;
var edge_1624 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1624 = inactive; //Fake sender node

edge_1608 = 1;

edge_1609 = edge_1608;
edge_1610 = edge_1608;

edge_1527 = boolNot;

edge_1600 = isActive;

edge_1601 = edge_1600;
edge_1602 = edge_1600;

edge_1604 = ifThenElse;

edge_1605 = edge_1604;
edge_1606 = edge_1604;

edge_1588 = active;

edge_1589 = edge_1588;
edge_1590 = edge_1588;
edge_1591 = edge_1588;
edge_1592 = edge_1588;
edge_1593 = edge_1588;
edge_1594 = edge_1588;
edge_1595 = edge_1588;
edge_1596 = edge_1588;
edge_1597 = edge_1588;
edge_1598 = edge_1588;

if(edge_1596 === active) {
edge_1575 = previousState['state_1547'];
}

if(edge_1595 === active) {
nextState['state_1540'] = edge_1609;
}

if(edge_1594 === active) {
edge_1543 = previousState['state_1540'];
}

if(edge_1590 === active && edge_1602!==null && edge_1602!==undefined) {edge_1528 = edge_1602(edge_1543);}

if(edge_1591 === active && edge_1527!==null && edge_1527!==undefined) {edge_1573 = edge_1527(edge_1528);}

edge_1574 = {};
edge_1574['cond'] = edge_1573;
edge_1574['a'] = edge_1610;
edge_1574['b'] = edge_1575;

if(edge_1592 === active && edge_1605!==null && edge_1605!==undefined) {edge_1580 = edge_1605(edge_1574);}

edge_1612=theInterface.theNumber;

edge_1618 = edge_1612;
edge_1614 = edge_1612;

edge_1616=null;
if(edge_1616===null ){
  edge_1616 = edge_1624;
} else if (edge_1624 !== null){
  throw ('error:multiple active assignments to the same signal edge_1616 : '+edge_1616 + ' and ' + edge_1624);
}if(edge_1616===null ){
  edge_1616 = edge_1618;
} else if (edge_1618 !== null){
  throw ('error:multiple active assignments to the same signal edge_1616 : '+edge_1616 + ' and ' + edge_1618);
}
if(edge_1589 === active && edge_1601!==null && edge_1601!==undefined) {edge_1579 = edge_1601(edge_1616);}

edge_1581 = {};
edge_1581['cond'] = edge_1579;
edge_1581['a'] = edge_1614;
edge_1581['b'] = edge_1580;

if(edge_1593 === active && edge_1606!==null && edge_1606!==undefined) {edge_1586 = edge_1606(edge_1581);}

if(edge_1598 === active) {edge_1620 = edge_1586;}

edge_1621 = edge_1620;
edge_1622 = edge_1620;

if(edge_1597 === active) {
nextState['state_1547'] = edge_1622;
}

theInterface.theResult=edge_1621;

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
      state: {state_1540:null,
state_1547:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};