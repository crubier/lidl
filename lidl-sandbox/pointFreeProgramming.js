// Point free programming approach 2

"use strict"

//////////////////////////////////////////////////////////////////////////////////
// Utils
function clone(obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}



//////////////////////////////////////////////////////////////////////////////////
// Functionals
// Constant value function
function cons(value) {
  return function(a) {
    return value;
  }
}

// Get name of variable in context, defaulting to parent contexts
function the(field) {
  return function(a) {
    let context = a;
    while (context[field] === undefined || context[field] === null) {
      if (context._parent === undefined || context._parent === null) throw new Error('No field called ' + field + ' in context: ' + JSON.stringify(context));
      context = context._parent;
    }
    return context[field];
  }
}

// Augment a context with values, compose data
function comp(arg) {
  return function(a) {
    let res = {};
    for (let prop in arg) {
      if (arg.hasOwnProperty(prop)) {
        res[prop] = arg[prop](a);
      }
    }
    return res;
  }
}

// Get n-th parent context
function it(n){
  return function(a) {
      let context = a;
      let i = n;
      while (i > 0) {
        if (context._parent === undefined || context._parent === null) throw new Error('No parent in context: ' + JSON.stringify(context));
        context = context._parent;
        i--;
      }
      return context;
    }
}



// Closure
function close(arg, context) {
  return function(a) {
    let newContext = clone(context(a));
    newContext._parent = a;
    if (!isFunction(arg)) throw new Error('Function called is not a function: ' + JSON.stringify(arg));
    return arg(newContext);
  }
}

// Function composition
function of() {
  let funcs = arguments;
  return function(a) {
    let res = a;
    for (let i = funcs.length - 1; i >= 0; i--) {
      res = funcs[i](res);
    }
    return res;
  };
}






//////////////////////////////////////////////////////////////////////////////////
// Base functions
// Sum
function sum(point) {
  return function(a) {
    return the("left")(point)(a) + the("right")(point)(a);
  }
}

// Difference
function sub(point) {
  return function(a) {
    return the("left")(point)(a) - the("right")(point)(a);
  }
}

// Mul
function mul(point) {
  return function(a) {
    return the("left")(point)(a) * the("right")(point)(a);
  }
}

// ifthenelse
function cond(point) {
  return function(a) {
    return the("if")(point)(a) ? the("then")(point)(a) : the("else")(point)(a);
  }
}


function gt(point) {
  return function(a) {
    return the("left")(point)(a) > the("right")(point)(a);
  };
}

function lt(point) {
  return function(a) {
    return the("left")(point)(a) < the("right")(point)(a);
  };
}

function gte(point) {
  return function(a) {
    return the("left")(point)(a) >= the("right")(point)(a);
  };
}

function lte(point) {
  return function(a) {
    return the("left")(point)(a) <= the("right")(point)(a);
  };
}

function eq(point) {
  return function(a) {
    return the("left")(point)(a) === the("right")(point)(a);
  };
}

function neq(point) {
  return function(a) {
    return the("left")(point)(a) !== the("right")(point)(a);
  };
}

function and(point) {
  return function(a) {
    return the("left")(point)(a) && the("right")(point)(a);
  };
}

function or(point) {
  return function(a) {
    return the("left")(point)(a) || the("right")(point)(a);
  };
}

// Array concatenation
function concat(point) {
  return function(a) {
    let i = 0;
    var res = [];
    for (i = 0; i < point.length; i++) {
      res = res.concat(point[i](a));
    }
    return res;
  };
}

// first element of array
function first(point) {
  return function(a) {
    return it(0)(point)(a)[0];
  }
}

// first element of array
function empty(point) {
  return function(a) {
    return it(0)(point)(a).length == 0;
  }
}


// Filter
function filter(point) {
  return function(a) {
    return the("list")(point)(a).filter(function(element, index, list) {
      return the("func")(point)({
        _parent: a, // For closures, we keep values that are in scope
        index: index,
        element: element,
        list: list
      });
    });
  };
}

// Map
function map(point) {
  return function(a) {
    return the("list")(point)(a).map(function(element, index, list) {
      return the("func")(point)({
        _parent: a, // For closures, we keep values that are in scope
        index: index,
        element: element,
        list: list
      });
    });
  };
}

// Fold / Reduce
function reduce(point) {
  return function(a) {
    return the("list")(point)(a).reduce(function(accumulation, element, index, list) {
      return the("func")(point)({
        _parent: a, // For closures, we keep values that are in scope
        accumulation: accumulation,
        index: index,
        element: element,
        list: list
      });
    }, the("initial")(point)(a));
  };
}





//
// let succ = (x) => (
//   // begin point free code
//   cond({
//     'if': eq({
//       left: the("val"),
//       right: cons(0)
//     }),
//     'then': comp({
//       val: cons(0)
//     }),
//     'else': close(succ, comp({
//       val: sub({
//         left: the("val"),
//         right: cons(1)
//       })
//     }))
//   })
//   // End Point free code
//   (x));
//
// console.log(succ({
//   val: 5
// }))
//
//
//
//
// let count = (x) => (
//   // begin point free code
//   cond({
//     'if': eq({
//       left: the("val"),
//       right: cons(0)
//     }),
//     'then': comp({
//       val: cons(0)
//     }),
//     'else': comp({
//       val: sum({
//         left: of(the("val"), close(count, comp({
//           val: sub({
//             left: the("val"),
//             right: cons(1)
//           })
//         }))),
//         right: cons(1)
//       })
//     })
//   })
//   // End Point free code
//   (x));
//
// console.log(count({
//   val: 5
// }))
//
//
//
//
//
// let factorial = (x) => (
//   // begin point free code
//   cond({
//     'if': eq({
//       left: the("val"),
//       right: cons(0)
//     }),
//     'then': comp({
//       val: cons(1)
//     }),
//     'else': comp({
//       val: mul({
//         left: of(the("val"), close(factorial, comp({
//           val: sub({
//             left: the("val"),
//             right: cons(1)
//           })
//         }))),
//         right: the("val")
//       })
//     })
//   })
//   // End Point free code
//   (x));
//
// console.log(factorial({
//   val: 5
// }))
//
//
//
//
// let small = filter({func:lt({left:the("element"),right:first(the("val"))}),list:the("val")});
// let large = filter({func:gt({left:the("element"),right:first(the("val"))}),list:the("val")});
// let mid = filter({func:eq({left:the("element"),right:first(the("val"))}),list:the("val")});
//
// console.log(small({val:[0,1,2,-3,4,6,-6]}));
// console.log(mid({val:[0,1,2,-3,4,6,-6]}));
// console.log(large({val:[0,1,2,-3,4,6,-6]}));
//
// let qsort = (x) => (
//   // begin point free code
//   cond({
//     'if': empty(the("val")),
//     'then': comp({
//       val: cons([])
//     }),
//     'else': comp({
//       val: concat([
//         of(the("val"),close(qsort,comp({val:small}))),
//         mid,
//         of(the("val"),close(qsort,comp({val:large})))
//       ])
//     })
//   })
//   // End Point free code
//   (x));
//
// // Works !
// console.log(qsort({
//   val: [0,1,2,-3,4,6,-6]
// }))



let small = filter({func:lt({left:the("element"),right:first(it(1))}),list:it(0)});
let mid   = filter({func:eq({left:the("element"),right:first(it(1))}),list:it(0)});
let large = filter({func:gt({left:the("element"),right:first(it(1))}),list:it(0)});


console.log(small([0,1,2,-3,4,6,-6]));
console.log(  mid([0,1,2,-3,4,6,-6]));
console.log(large([0,1,2,-3,4,6,-6]));

let qsort = (x) => (
  // begin point free code
  cond({
    'if': empty(it(0)),
    'then': cons([]),
    'else': concat([
        of(qsort,small),
        mid,
        of(qsort,large)
    ])
  })
  // End Point free code
  (x));

// Works !
console.log(qsort([0,1,2,-3,6,4,-6]))






//
// var factoria = cond({
//   'if':eq({
//     left:the("val"),
//     right:cons(0)
//   }),
//   'then':comp({
//     val:cons(1)
//   }),
//   'else':comp({
//     val:mul({
//       left:the("val"),
//       right:close(
//         cons(2),
//         comp({
//           val:sum({
//             left:the("val"),
//             right:cons(-1)
//           })
//         })
//       )
//     })
//   })
// });
//
// // var factorial = cond({
// //   'if':eq({
// //     left:the("val"),
// //     right:cons(0)
// //   }),
// //   'then':comp({
// //     val:cons(1)
// //   }),
// //   'else':comp({
// //     val:mul({
// //       left:the("val"),
// //       right:close(
// //         factorial,
// //         comp({
// //           val:sum({
// //             left:the("val"),
// //             right:cons(-1)
// //           })
// //         })
// //       )
// //     })
// //   })
// // });
//
//
//
// function factorial (x){
//   return cond({
//     'if':eq({
//       left:the("val"),
//       right:cons(0)
//     }),
//     'then':comp({
//       val:cons(1)
//     }),
//     'else':comp({
//       val:mul({
//         left:the("val"),
//         right:close(
//           factorial,
//           comp({
//             val:sum({
//               left:the("val"),
//               right:cons(-1)
//             })
//           })
//         )
//       })
//     })
//   })(x);
// }
//
//
//
//
// // { val: [] }
// console.log(factoria({val:5}));
//
//
// console.log(close( factorial, comp({val:cons(5)}) )({val:5}));
//



//
// let small = filter({func:lt({left:the("element"),right:first(the("input"))}),list:the("input")});
// let large = filter({func:gt({left:the("element"),right:first(the("input"))}),list:the("input")});
// let mid = filter({func:eq({left:the("element"),right:first(the("input"))}),list:the("input")});
//
//
// let nqsort = comp({input:concat([small,mid,large])});
// // { input: [ -1, -2, 0, 0, 1, 1, 5, 3, 2 ] }
// console.log(nqsort({input:[1,-1,-2,0,5,0,3,1,2]}));
//
//
// let bqsort = cond({
//   'if':empty(the("input")),
//   'then':comp({input:cons([])}),
//   'else':comp({input:cons([1])})
// });
// // { input: [] }
// console.log(bqsort({input:[]}));
// // { input: [1] }
// console.log(bqsort({input:[4,7]}));
//
//
// let qsort = cond({
//   'if':empty(the("input")),
//   'then':comp({input:cons([])}),
//   'else':comp({input:concat([close(qsort,comp({input:small})),mid,close(qsort,comp({input:large}))])})
// });
// // { input: [ -2, -1, 0, 0, 1, 1, 2, 3, 5 ] }
// // console.log(qsort({input:[1,-1,-2,0,5,0,3,1,2]}));
//
//
//
// // {a:false,b:true}
// console.log(comp({"a":empty(the("a")),"b":empty(the("b"))})({a:[0,1,2],b:[]}))
//
//
// let mycond = cond({'if':the(0),'then':the(1),'else':the(2)});
// let myfunc = map({func:close(mycond,the("element")),list:the("input")});
// // ["no",9,-2]
// console.log(myfunc({input:[[false,"yes","no"],[false,7,9],[true,-2,-3]]}))
//
//
//
// // 3
// console.log(close(the("input"),cons({input:3}))({lol:7,input:5}));
//
// // 7
// console.log(close(the("input"),comp({input:the("lol")}))({lol:7,input:5}));
//
// // {a:"y",b:"x"}
// console.log(close(comp({a:the("a"),b:the("b")}),comp({a:the("b"),b:the("a")}))({a:"x",b:"y"}));
// console.log(close(comp({a:the("b"),b:the("a")}),comp({a:the("a"),b:the("b")}))({a:"x",b:"y"}));
//
//
//
// var ff = function(x){return (x>0)?(ff(x-1)*x):(1);}
// console.log(ff(5));
