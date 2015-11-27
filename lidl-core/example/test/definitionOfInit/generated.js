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

var edge_1436 = inactive;
var edge_1440 = inactive;
var edge_1445 = inactive;
var edge_1446 = inactive;
var edge_1451 = inactive;
var edge_1454 = inactive;
var edge_1461 = inactive;
var edge_1465 = inactive;
var edge_1466 = inactive;
var edge_1467 = inactive;
var edge_1468 = inactive;
var edge_1469 = inactive;
var edge_1470 = inactive;
var edge_1472 = inactive;
var edge_1474 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_1474 = inactive; //Fake sender node

edge_1436 = return1;

edge_1440 = isActive;

edge_1445 = boolNot;

edge_1465 = active;

edge_1466 = edge_1465;
edge_1467 = edge_1465;
edge_1468 = edge_1465;
edge_1469 = edge_1465;
edge_1470 = edge_1465;

if(edge_1469 === active) {
edge_1451 = previousState['state_1448'];
}

if(edge_1467 === active && edge_1440!==null && edge_1440!==undefined) {edge_1446 = edge_1440(edge_1451);}

if(edge_1468 === active && edge_1445!==null && edge_1445!==undefined) {edge_1461 = edge_1445(edge_1446);}

if(edge_1466 === active && edge_1436!==null && edge_1436!==undefined) {edge_1454 = edge_1436(edge_1474);}

if(edge_1470 === active) {
nextState['state_1448'] = edge_1454;
}

theInterface.theResult=edge_1461;

edge_1472=theInterface.theNumber;

// We dont care about edge_1472, this is a fake receiver node

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
      state: {state_1448:null},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};