// Point free programming approach 3

"use strict"

//////////////////////////////////////////////////////////////////////////////////
// Utils and polyfills
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
// Constant value functional
function cons(value) {
  return function(a) {
    return value;
  }
}
// Composition
function set(name,value) {
  return function(a) {
    let res={};
    res[name]= value(a);
    res._parent = a;
    return res;
  }
}
// Decomposition
function get(name) {
  return function(a) {
    let context = a;
    while (context[name] === undefined || context[name] === null) {
      if (context._parent === undefined || context._parent === null) throw new Error('No field called ' + name + ' in context: ' + JSON.stringify(context));
      context = context._parent;
    }
    return context[name];
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
// Function composition (series) / closure functional
function series() {
  let funcs = arguments;
  return function(a) {
    let context = a;
    for (let i = funcs.length - 1; i >= 0; i--) {
      let newContext = clone(funcs[i](context));
      newContext._parent = context;
      context = newContext;
    }
    return context;
  };
}
// Function parallel / closure functional
function parallel() {
  let funcs = arguments;
  return function(a) {
    let context = a;
    let res = {};
    for (let i = funcs.length - 1; i >= 0; i--) {
      let newContext = clone(funcs[i](context));
      newContext._parent = context;
      Object.assign(res, newContext);
    }
    return res;
  };
}

// Other
// Add parents to functions who dont have
function goup(f){
  return function(a) {
    let res = clone(f(a));
    function addparent(x){
        // for(let key in x){
        //   if(x.hasOwnProperty(key)) {
        //     if(!x[key]._parent)
        //     addparent(x[key])
        //   }
        // }
        if(!res._parent) res._parent = a;
      }
    addparent(res);
    return res;
  };
}
// Remove parents from function who do have
function godown(f){
  return function(a) {
    let res = clone(f(a));
    function removeparent(x){
      for(let key in x){
        if(x.hasOwnProperty(key)) {
          removeparent(x[key])
        }
      }
      if(x._parent) delete x._parent;
    }
    removeparent(res);
    return res;
  };
}

let print = (x) => console.log(JSON.stringify(x));

// Base Functions
var ifthenelse = goup((x) => set("val",cons(get("if")(x)?get("then")(x):get("else")(x)))());

var and = goup((x) => set("val",cons(get("left")(x) && get("right")(x) ))());
var or = goup((x) => set("val",cons(get("left")(x) || get("right")(x) ))());
var not = goup((x) => set("val",cons(!get("val")(x) ))());

var sum = goup((x) => set("val",cons(get("left")(x) + get("right")(x) ))());
var sub = goup((x) => set("val",cons(get("left")(x) - get("right")(x) ))());
var mult = goup((x) => set("val",cons(get("left")(x) * get("right")(x) ))());
var div = goup((x) => set("val",cons(get("left")(x) / get("right")(x) ))());

// print(and({left:true,right:true}));


// var map = goup((x) => set("val",  cons(get("list")(x).map((elem,index,list)=>(
//   series(
//     get("func")(x),
//     parallel(
//       set("element",cons(elem)),
//       set("index",cons(index)),
//       set("list",cons(list))
//     )(x)
//   ))  ))));



var mapl = goup((x) => set("val",  cons(get("list")(x).length) )());

var map = goup((x) => set("val",  cons(get("list")(x).map((elem,index,list)=>(
  series(
    get("func"),
    parallel(
      set("element",cons(elem)),
      set("index",cons(index)),
      set("list",cons(list))
    )(x))))
) )());

  // var map = goup((x) => set("val",cons(  get("list")(x).map( (elem,index,list)=>(
  //   get("func")(x)({element:elem,index:index,list:list})     ))  )));



// print(map({val:4}))

print(
  series(
    map,
    parallel(
      set("func",get("element")),
      set("list",get("val"))
    )
  )({val:[{x:5},{x:6}]}));

// console.log(
//   series(
//     map,
//     parallel(
//       set("func",series(get("x"),get("element"))),
//       set("list",get("val"))
//     )
//   )({val:[{x:5}]}));


// console.log(ifthenelse({"if":false,"then":99,"else":-1}));
// console.log(series(ifthenelse,parallel(set("if",get("a")),set("then",cons(99)),set("else",cons(0))))({a:true}));


// console.log(set("bob",cons(5))());
// console.log(set("joe",parallel(set("ouh",cons(7)),set("bob",get("aw"))))({"aw":4}));
// console.log(godown(set("joe",parallel(set("ouh",cons(7)),set("bob",get("aw")))))({"aw":4}));


// console.log(godown(godown(parallel(set("val",get("joe")),set("joe",get("bob")))))({bob:50,joe:30}))
// console.log(series(set("val",get("joe")),set("joe",get("bob")))({bob:50,joe:30}))
// console.log(goup(series(set("val",get("joe")),set("joe",get("bob"))))({bob:50,joe:30}))
// console.log(series(set("val",get("joe")),set("joe",get("bob")))({bob:50,joe:30}))
// console.log(cons("val",1)({loule:5}));
// console.log(series(it(0),cons("val",1))({loule:5}));
// console.log(series(it(0),it(0),cons("val",2))({loule:5}));
// console.log(series(it(0),it(0),cons("val",2))({loule:5}));
// console.log(series(it(2),it(0),cons("val",2))({loule:5}));
// console.log(parallel(cons("val",2),cons("lol",3))({loule:5}));
// console.log(series(cons("val",2),cons("lol",3))({loule:5}));
