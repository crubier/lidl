// Point free programming approach 1

function theX(point) {
  return point.x;
}

function ArrayToXY(point) {
  return function(a) {
    return {x:point[0](a),y:point[1](a)};
  }
}

function ArrayToX(point) {
  return function(a) {
    return {x:point[0](a)};
  }
}

function theY(point) {
  return point.y;
}

function theHeight(point) {
  return point.height;
}

function theAge(point) {
  return point.age;
}

function theSpeed(point) {
  return point.speed;
}

function theFirst(point) {
  return point.first;
}

function theSecond(point) {
  return point.second;
}

function theName(point) {
  return point.name;
}

function theElement(point) {
  return point.element;
}

function theIndex(point) {
  return point.index;
}

function theArray(point) {
  return point.array;
}

function theList(point) {
  return point.list;
}

function theAccumulation(point) {
  return point.accumulation;
}

function theNumber(point) {
  return point.number;
}

function minustwo(point) {
  return -2;
}

function minusone(point) {
  return -1;
}

function zero(point) {
  return 0;
}

function one(point) {
  return 1;
}

function two(point) {
  return 2;
}

function three(point) {
  return 3;
}

function it(point) {
  return point;
}

function identity(point) {
  return point;
}

function theInput(point) {
  return point;
}



function gt(point) {
  return function(a) {
    return point[0](a) > point[1](a);
  };
}

function lt(point) {
  return function(a) {
    return point[0](a) < point[1](a);
  };
}

function gte(point) {
  return function(a) {
    return point[0](a) >= point[1](a);
  };
}

function lte(point) {
  return function(a) {
    return point[0](a) <= point[1](a);
  };
}

function eq(point) {
  return function(a) {
    return point[0](a) === point[1](a);
  };
}

function neq(point) {
  return function(a) {
    return point[0](a) !== point[1](a);
  };
}

function and(point) {
  return function(a) {
    return point[0](a) && point[1](a);
  };
}

function or(point) {
  return function(a) {
    return point[0](a) || point[1](a);
  };
}

function sum(point) {
  return function(a) {
    return point[0](a) + point[1](a);
  }
}

function mult(point) {
  return function(a) {
    return point[0](a) * point[1](a);
  }
}

// Create singleton array
function singleton(point) {
  return function(a) {
    return [point[0](a)];
  }
}

// first element of array
function first(point) {
  return function(a) {
    return point[0](a)[0];
  }
}

// Array concatenation
function concat(point) {
  return function(a) {
    let i =0;
    var res = [];
    for(i=0;i<point.length;i++){
      res=res.concat(point[i](a));
    }
    return res;
  };
}

// List creation
function list(point) {
  return function(a) {
    let i =0;
    let res = [];
    for(i=0;i<point.length;i++){
      res.push(point[i](a));
    }
    return res;
  };
}

function iff(point) {
  return function(a) {
      return res;
    };
}

// Function composition
function of(point) {
  return function(a) {
    let i =0;
    let res = a;
    for(i=point.length-1;i>=0;i--){
      res=point[i](res);
    }
    return res;
  };
}

function filter(point) {
  return function(a) {
    return point[1](a).filter(function(element, index, list) {
      return point[0]({
        ...a, // For closures, we keep values that are in scope
        index: index,
        element: element,
        list: list
      });
    });
  };
}

function map(point) {
  return function(a) {
    return point[1](a).map(function(element, index, list) {
      return point[0]({
        ...a, // For closures, we keep values that are in scope
        index: index,
        element: element,
        list: list
      });
    });
  };
}

function fold(point) {
  return function(a) {
    return point[1](a).reduce(function(accumulation,element, index, list) {
      return point[0]({
        ...a, // For closures, we keep values that are in scope
        accumulation:accumulation,
        index: index,
        element: element,
        list: list
      });
    },point[2](a));
  };
}




var small = filter([gt([first([theX]),theElement]), theX]);
var large = filter([lt([first([theX]),theElement]), theX]);
var mid   = filter([eq([first([theX]),theElement]), theX]);
// var nqsort = of([asX,concat([small,mid,large])]);
var nqsort = ArrayToX([concat([small,mid,large])]);
var qsort = ArrayToX(concat([nqsort([small]),mid,nqsort([large])]));

// console.log(list([zero,one,one,zero])(67));
// console.log(first([list([zero,one,one,zero])])(67));
console.log(nqsort({x:[-1,-2,0,3,2,1]}));
// console.log(concat([small,mid,large])({list:[-1,-2,0,3,2,1],number:0}));
// console.log(concat([small,mid,large])({list:[-1,-2,0,3,2,1],number:0}));
// console.log(qsort({list:[-1,-2,0,3,2,1],number:0}));

// > qsort []	= []
// > qsort (x:xs) = qsort small ++ mid ++ qsort large
// >   where
// >     small = [y | y<-xs, y<x]
// >     mid   = [y | y<-xs, y==x] ++ [x]
// >     large = [y | y<-xs, y>x]



// var f;
// // (( ((theAge)of(theFirst)) + ((theHeight)of(theFirst)) ) > ((theSpeed) of (theSecond))
// f = gt([sum([of([theAge,theFirst]),of([theHeight,theFirst])]),of([theSpeed,theSecond])]);
// console.log(f({first:{age:30,height:180,speed:40},second:{age:34,height:180,speed:211}}));
//
// // ( map ((theName) of (theElement)) for elements of ( filter (theInput) by keeping only elements where (((theAge) of (theElement)) is greater than (zero))))
// f = map([of([theName, theElement]),filter([gt([of([theAge,theElement]), zero]), theInput])]);
// console.log(f([{
//   age: -1,
//   name: "bob"
// }, {
//   age: 0,
//   name: "joe"
// }, {
//   age: 1,
//   name: "lol"
// }, {
//   age: 2,
//   name: "pouk"
// }, {
//   age: 3,
//   name: "pok"
// }]));
//
// // (fold (((theAge)of(theElement))+(theAccumulation)) for elements of (theInput) with accumulation starting at (zero) )
// f = fold([sum([of([theAge,theElement]),theAccumulation]),theInput,zero]);
// console.log(f([{
//   age: -1,
//   name: "bob"
// }, {
//   age: 0,
//   name: "joe"
// }, {
//   age: 1,
//   name: "lol"
// }, {
//   age: 2,
//   name: "pouk"
// }, {
//   age: 3,
//   name: "pok"
// }]));
