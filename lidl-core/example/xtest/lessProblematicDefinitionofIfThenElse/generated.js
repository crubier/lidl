function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
//Standard LIDL Header

function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

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
  return x;
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
  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,m:x,n:x,o:x,p:x};
};

///////////////////////////////////////////////////////////////////////
//Declaration of variables

var edge_6611 = inactive;
var edge_6616 = inactive;
var edge_6657 = inactive;
var edge_6658 = inactive;
var edge_6659 = inactive;
var edge_6662 = inactive;
var edge_6663 = inactive;
var edge_6665 = inactive;
var edge_6673 = inactive;
var edge_6674 = inactive;
var edge_6677 = inactive;
var edge_6679 = inactive;
var edge_6681 = inactive;
var edge_6682 = inactive;
var edge_6683 = inactive;
var edge_6684 = inactive;
var edge_6686 = inactive;
var edge_6687 = inactive;
var edge_6688 = inactive;
var edge_6689 = inactive;
var edge_6691 = inactive;
var edge_6692 = inactive;
var edge_6693 = inactive;
var edge_6694 = inactive;
var edge_6696 = inactive;
var edge_6697 = inactive;
var edge_6698 = inactive;
var edge_6700 = inactive;
///////////////////////////////////////////////////////////////////////
//Code of the DAG

edge_6679 = -8000;

edge_6658 = 1;

edge_6616 = whenThenElse;

edge_6611 = isEqual;

edge_6681 = active;

edge_6682 = edge_6681;
edge_6683 = edge_6681;
edge_6684 = edge_6681;

edge_6674=theInterface.theNumber;

edge_6657=theArgs.a;

edge_6659 = {};
edge_6659['a'] = edge_6657;
edge_6659['b'] = edge_6658;

if(edge_6682 === active && edge_6611!==null && edge_6611!==undefined) {edge_6662 = edge_6611(edge_6659);}

edge_6663 = {};
edge_6663['cond'] = edge_6662;
edge_6663['source'] = edge_6684;

if(edge_6683 === active && edge_6616!==null && edge_6616!==undefined) {edge_6665 = edge_6616(edge_6663);}

edge_6686 = edge_6665['a'];
edge_6691 = edge_6665['b'];

edge_6692 = edge_6691;
edge_6693 = edge_6691;
edge_6694 = edge_6691;

edge_6687 = edge_6686;
edge_6688 = edge_6686;
edge_6689 = edge_6686;

if( ( edge_6694 === active ) && ( edge_6689 === active )) {
  edge_6700 = active;
} else {
  edge_6700 = inactive;
}
if( ( edge_6694 === active ) && ( edge_6689 === inactive )) {
  edge_6700 = active;
} else {
  edge_6700 = inactive;
}
if( ( edge_6694 === inactive ) && ( edge_6689 === active )) {
  edge_6700 = active;
} else {
  edge_6700 = inactive;
}
// We dont care about edge_6700, this is a fake receiver node

if( ( edge_6693 === active ) && ( edge_6688 === inactive )) {
  edge_6677 = active;
} else {
  edge_6677 = inactive;
}
if( ( edge_6693 === active ) && ( edge_6688 === active )) {
  edge_6677 = active;
} else {
  edge_6677 = inactive;
}
if(edge_6677 === active) {edge_6698 = edge_6679;}

if( ( edge_6687 === active ) && ( edge_6692 === active )) {
  edge_6673 = active;
} else {
  edge_6673 = inactive;
}
if( ( edge_6687 === active ) && ( edge_6692 === inactive )) {
  edge_6673 = active;
} else {
  edge_6673 = inactive;
}
if(edge_6673 === active) {edge_6697 = edge_6674;}

edge_6696=null;
if(edge_6696===null ){
  edge_6696 = edge_6697;
} else if (edge_6697 !== null){
  throw ('error:multiple active assignments to the same signal edge_6696 : '+edge_6696 + ' and ' + edge_6697);
}if(edge_6696===null ){
  edge_6696 = edge_6698;
} else if (edge_6698 !== null){
  throw ('error:multiple active assignments to the same signal edge_6696 : '+edge_6696 + ' and ' + edge_6698);
}
theInterface.theResult=edge_6696;

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
      state: {},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};