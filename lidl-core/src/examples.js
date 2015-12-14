// File automatically generated when performing     npm run build   
// It contains examples of lidl code from the example/ok folder
module.exports={
header:`var isActive = function(x) {
  return (x !== null && x !== undefined);
};

var cool = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return {
      sum: (x.a + x.b),
      diff: (x.a - x.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(x) {
  return (isActive(x.a) ? x.a : x.b);
};

var return0 = function(x) {
  return 0;
};


var return1 = function(x) {
  return 1;
};

var addition = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a + x.b;
  } else {
    return inactive;
  }
};

var multiplication = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a * x.b;
  } else {
    return inactive;
  }
};

var substraction = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a - x.b;
  } else {
    return inactive;
  }
};

var division = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a / x.b;
  } else {
    return inactive;
  }
};

var remainder = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return x.a % x.b;
  } else {
    return inactive;
  }
};

var power = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return Math.pow(x.a,x.b);
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


var cursor = function(mouse){
  var cursor = {
    type: "shadow",
    blur: mouse.buttons === 0 ? 20 : 10,
    offset: {
      x: 0,
      y: mouse.buttons === 0 ? 4 : 2
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "translate",
      x: mouse.position.x,
      y: mouse.position.y,
      content: {
        type: "scale",
        width: mouse.buttons === 0 ? 1 : 0.8,
        height: mouse.buttons === 0 ? 1 : 0.8,
        content: {
          type: "fill",
          style: "rgba(200, 0, 200, 1)",
          content: {
            type: "path",
            content: [{
              type: "begin"
            }, {
              type: "move",
              x: 0,
              y: 0
            }, {
              type: "line",
              x: 0,
              y: 15
            }, {
              type: "line",
              x: 10.6,
              y: 10.6
            }, {
              type: "close"
            }]
          }
        }
      }
    }
  };
  return cursor;
}

`,
lidl:[{
    name: 'Affectation Expression',
fileName: 'example/ok/affectationExpression',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (the magic number):Number out
  with
    interaction (return1):{Void->Number} out is (function return1)
  is
    (
      ( result1!)
      with behaviour
      (
        apply
        (return1)
        to
        ( ok!)
        and get
        ( result1?)
      )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( result of (a)+(b)!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( result of (a)+(b)?)
      )
    )

is
  (
    ({
      theNumber:(theNumber?)
      theResult:(theResult!)
    })
  with behaviour
    (
      (theResult?) =((the magic number )+(theNumber!))
    )
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
},{
    name: 'Arguments',
fileName: 'example/ok/arguments',
     code : `interaction
  (bob(a:Number in)):Number out
is
  (a)
`,
     scenario : `[
  {
    "args":  {"a":28},
    "inter":  28
  },
  {
    "args":  {"a":2},
    "inter":  2
  },
  {
    "args":  {"a":3},
    "inter":  3
  },
  {
    "args":  {"a":6},
    "inter":  6
  }
]
`
},{
    name: 'Compilation Example Thesis',
fileName: 'example/ok/compilationExampleThesis',
     code : `interaction
  (My Simple User Interface):{theNumber: Number in, theResult: Number out}
with
  interaction (add one):{Number->Number}out is (function addOne)
is
  (
    ({
        theNumber:  (x?)
        theResult:  (y!)
      })
    with behaviour
    (apply (add one) to (x!) and get (y?))
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
},{
    name: 'Composition 2 X 1',
fileName: 'example/ok/composition2x1',
     code : `interaction
  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out}
with
  interaction
    (addition):{{a:Number,b:Number}->Number}out
  is
    (function addition)
is
  (
    ({
      theNumber:(x?)
      theOther:(y?)
      theResult:(z!)
    })
   with behaviour
    (apply
      (addition)
      to
      ({a:(x!)b:(y!)})
      and get
      (z?)
    )
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117 }
  }
]
`
},{
    name: 'Composition 2 X 2',
fileName: 'example/ok/composition2x2',
     code : `interaction
  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out}
with
 interaction
  (cool):{{a:Number,b:Number}->{sum:Number,diff:Number}} out
  is
  (function cool)
is
  (
    ({
      theNumber:( theNumber?)
      theOther:( y?)
      theResult:( theResult!)
      theLast:( wow!)
    })
  with behaviour
    ( apply (cool)
      to
      ({a:( theNumber!)b:( y!)})
      and get
      ({sum:( theResult?)diff:( wow?)})
    )
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100,"theLast":0 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80,"theLast":76 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null,"theLast":null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54,"theLast":30 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117,"theLast":17 }
  }
]
`
},{
    name: 'Definition Of Init',
fileName: 'example/ok/definitionOfInit',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Boolean out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      (previous(x)!)
      with behaviour
      ((previous(x)?)= previous (x))
    )

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      (result of (a)==(b)!)
      with behaviour
      (apply (is equal) to ({a:(a),b:(b)}) and get ( result of (a)==(b)?) )
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      (not (a) !)
      with behaviour
      (apply (boolean negation) to (a) and get (not (a)?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean} out is (function isActive)
  is
    (
      ( (a) is active!)
      with behaviour
      (apply (is active) to (a) and get ( (a) is active?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( result of (a)+(b)!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( result of (a)+(b)?)
      )
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

is
  ({
    theNumber:(variable theNumber?)
    theResult:(init)
  })
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": true }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": false }
  }
]
`
},{
    name: 'Definition Of Previous',
fileName: 'example/ok/definitionOfPrevious',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      (previous(x)!)
      with behaviour
      ( (previous(x)?) = previous (x))
    )

is
  ({
    theNumber:(theNumber?)
    theResult:(previous(theNumber!))
  })
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 42 }
  }
]
`
},{
    name: 'Definitionof If Then Else',
fileName: 'example/ok/definitionofIfThenElse',
     code : `interaction
 (test (t:Number in)):Number out
with


  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      (variable result of (u)==(v)!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get (variable result of (u)==(v)?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction
      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out
    is
      (function whenThenElse)
  is
    (
      (variable activation of when (cond) then (a) else (b)?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b)!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
    is
    (
      (variable result of if (cond) then (x) else (y)?)
      with behaviour
      (
        when
        (cond)
        then
        ((variable result of if (cond) then (x) else (y)!) = (x))
        else
        ((variable result of if (cond) then (x) else (y)!) = (y))
      )
    )

is
  (if((t)==(1))then(3)else(4))
`,
     scenario : `[
  {
    "args":  {"t":0},
    "inter":  4
  },
  {
    "args":  {"t":1},
    "inter":  3
  },
  {
    "args":  {"t":2},
    "inter":  4
  },
  {
    "args":  {"t":3},
    "inter":  4
  }
]
`
},{
    name: 'Dereferencing',
fileName: 'example/ok/dereferencing',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    ((x:{theNumber:Number in,theResult:Number out}).theNumber):Number out
  is
    (((x).theNumber!) with behaviour (({theNumber:((x).theNumber?)})=(x)))

  interaction
    ((x:{theNumber:Number in,theResult:Number out}).theResult):Number in
  is
    (((x).theResult!) with behaviour ((x)=({theResult:((x).theResult?)})))

is
  (
    (variable this?)
    with behaviour
    (((variable this!).theResult)=((variable this!).theNumber) )
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
},{
    name: 'Fake Affectation',
fileName: 'example/ok/fakeAffectation',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction
    ((a:Number out)=fake=(b:Number in)):Activation in
  with
    interaction (identity):{Number->Number}out is (function identity)
  is
    (apply (identity) to (b) and get (a))
is
  (
    ({
      theNumber:(theNumber?)
      theResult:(theResult!)
    })
  with behaviour
    ((theResult?)=fake=(theNumber!))
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
},{
    name: 'Function Application',
fileName: 'example/ok/functionApplication',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction (add one):{Number->Number}out is (function addOne)
is
  (
    ({
      theNumber:(theNumber?)
      theResult:(theResult!)
    })
    with behaviour
    (apply(add one) to (theNumber!) and get (theResult?))
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
},{
    name: 'Literals',
fileName: 'example/ok/literals',
     code : `interaction
  (ok literal):Number out
with

  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction
      (addition):{{a:Number,b:Number}->Number}out
    is
      (function addition)
  is
    (((a)+(b)!) with behaviour ((addition)({a:(a)b:(b)})=((a)+(b)?)))

is
  ((9)+(9))
`,
     scenario : `
[
  {
    "args": {},
    "inter" : 18
  },
  {
  "args": {},
  "inter" : 18
},
{
  "args": {},
  "inter" : 18
},
{
  "args": {},
  "inter" : 18
}
]
`
},{
    name: 'Problematic Definitionof If Then Else',
fileName: 'example/ok/problematicDefinitionofIfThenElse',
     code : `interaction
 (test (a:Number in)):{theNumber:Number in,theResult:Number out}
with


  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (isEqual):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      (result of (a)==(b)!)
      with behaviour
      (apply (isEqual) to ({a:(a),b:(b)}) and get (result of (a)==(b)?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out is (function whenThenElse)
  is
    (
      (activation of when (cond) then (a) else (b)?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:(activation of when (cond) then (a) else (b)!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
    is
      (
        (result of if (cond) then (a) else (b)!)
        with behaviour
        (
          when
          (cond)
          then
          ((result of if (cond) then (a) else (b)?) = (a))
          else
          ((result of if (cond) then (a) else (b)?) = (b))
        )
      )

is
  (if((a)==(1))then({theNumber:(b?),theResult:(b!)})else({theNumber:(b?),theResult:(-8000)}))
`,
     scenario : `[
  {
    "args":  {"t":0},
    "inter":  4
  },
  {
    "args":  {"t":1},
    "inter":  3
  },
  {
    "args":  {"t":2},
    "inter":  4
  },
  {
    "args":  {"t":3},
    "inter":  4
  }
]
`
},{
    name: 'Real Affectation Expression',
fileName: 'example/ok/realAffectationExpression',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)

  interaction
    ((a:Number in)+(b:Number in)):Number out
  is
    (
      (variable result of (a)+(b)!)
      with behaviour
      (
        apply (addition)
        to ({a:(a)b:(b)})
        and get (variable result of (a)+(b)?)
      )
    )

is
  (
    ({
      theNumber:(theNumber?)
      theResult:(theResult!)
    })
    with behaviour
    ((theResult?)=((1)+(theNumber!)))
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
},{
    name: 'Referential Transparency',
fileName: 'example/ok/referentialTransparency',
     code : `interaction
  (main):{theNumber:Number in,theResult:Number out}
with

  interaction (z):Number out
  is (variable y b?)

  interaction (y):Number out
  is (variable y b?)

  interaction (x):Number out
  is (variable b!)
is
  ({
    theNumber:(variable x (y) (variable b!)?)
    theResult:(variable x (z) (x)!)
  })
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
},{
    name: 'Resolver',
fileName: 'example/ok/resolver',
     code : `interaction
  (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}
is
  ({
    theNumber:(x?)
    theOther:(x?)
    theResult:(x!)
    theLast:(x!)
  })
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50, "theOther":null, "theResult": 50, "theLast": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theOther":null,"theResult": 78 , "theLast": 78}
  },
  {
    "args":  {},
    "inter":  { "theNumber": null, "theOther":null, "theResult": null, "theLast": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null, "theOther":42, "theResult": 42, "theLast": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67, "theOther":null, "theResult": 67, "theLast": 67 }
  }
]
`
},{
    name: 'Simple',
fileName: 'example/ok/simple',
     code : `interaction
  (main):{theNumber:Number in,theResult:Number out}
is
  ({
    theNumber:(x?)
    theResult:(x!)
  })
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
},{
    name: 'Simple Func',
fileName: 'example/ok/simpleFunc',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction
    (bob(x:Number in)):Number out
  with
    interaction
      (addOne):{Number->Number}out
    is
      (function addOne)
  is
    ((result of bob(x)!) with behaviour ((addOne)(x)=(result of bob(x)?)))
is
  ({theNumber:(a?),theResult:(bob(a!))})
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
},{
    name: 'Simple Previous Next',
fileName: 'example/ok/simplePreviousNext',
     code : `interaction
  (main):{theNumber:Number in,theResult:Number out}
is
  (
    ({
      theNumber:(x?)
      theResult:(y!)
    })
    with behaviour
    (get (y?) from previous and set (x!) for next)
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 42 }
  }
]
`
},{
    name: 'Sum Of Previous',
fileName: 'example/ok/sumOfPrevious',
     code : `interaction
  (wow (a:Number in)):Number out
with

  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)
  is
    (((a)+(b)!) with behaviour ((addition)({a:(a)b:(b)})=((a)+(b)?)))

  interaction
    (previous(a:Number in)):Number out
  is
    ((previous (a)!) with behaviour ((previous (a)?) = previous (a)))

is
    ((previous(a))+(previous(a)))
`,
     scenario : `
[
  {
    "args": {
      "a": 1
    },
    "inter" : null
  },
  {
    "args": {
      "a": 8
    },
    "inter" : 2
  },
   {
    "args": {
      "a": 6
    },
    "inter" : 16
  }
]
`
},{
    name: 'Ui Cursor',
fileName: 'example/ok/uiCursor',
     code : `interaction
  (cursor of (mouse:Mouse in)):Graphics out
with
  interaction (cursor):{Mouse->Graphics}out is (function cursor)
is
  ((cursor of (mouse)!)
  with behaviour
  ((cursor)(mouse)=(cursor of (mouse)?)))
`,
     scenario : `[{
  "args": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      }
    }
  },
  "inter": {
    "type": "shadow",
    "blur": 20,
    "offset": {
      "x": 0,
      "y": 4
    },
    "color": "rgba(0, 0, 0, 0.5)",
    "content": {
      "type": "translate",
      "x": 42,
      "y": 63,
      "content": {
        "type": "scale",
        "width": 1,
        "height": 1,
        "content": {
          "type": "fill",
          "style": "rgba(200, 0, 200, 1)",
          "content": {
            "type": "path",
            "content": [{
              "type": "begin"
            }, {
              "type": "move",
              "x": 0,
              "y": 0
            }, {
              "type": "line",
              "x": 0,
              "y": 15
            }, {
              "type": "line",
              "x": 10.6,
              "y": 10.6
            }, {
              "type": "close"
            }]
          }
        }
      }
    }
  }
}, {
  "args": {
    "mouse": {
      "buttons": 1,
      "position": {
        "x": 31,
        "y": 89
      }
    }
  },
  "inter": {
    "type": "shadow",
    "blur": 10,
    "offset": {
      "x": 0,
      "y": 2
    },
    "color": "rgba(0, 0, 0, 0.5)",
    "content": {
      "type": "translate",
      "x": 31,
      "y": 89,
      "content": {
        "type": "scale",
        "width": 0.8,
        "height": 0.8,
        "content": {
          "type": "fill",
          "style": "rgba(200, 0, 200, 1)",
          "content": {
            "type": "path",
            "content": [{
              "type": "begin"
            }, {
              "type": "move",
              "x": 0,
              "y": 0
            }, {
              "type": "line",
              "x": 0,
              "y": 15
            }, {
              "type": "line",
              "x": 10.6,
              "y": 10.6
            }, {
              "type": "close"
            }]
          }
        }
      }
    }
  }
}]
`
},{
    name: 'Ui Empty With Cursor',
fileName: 'example/ok/uiEmptyWithCursor',
     code : `interaction
  (empty UI with cursor):{
        mouse: {
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        } in,
        graphics: Graphics out
      }

with

  interaction
    (cursor of (mouse:{
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        } in)):Graphics out
  with
    interaction (cursor):{{
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        }->Graphics}out is (function cursor)
  is
    (
      (cursor of (mouse)!)
      with behaviour
      ((cursor)(mouse)=(cursor of (mouse)?))
    )


is
  ({
        mouse: (mouse?)
        graphics: (cursor of (mouse!))
  })
`,
     scenario : `[{
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "shadow",
      "blur": 20,
      "offset": {
        "x": 0,
        "y": 4
      },
      "color": "rgba(0, 0, 0, 0.5)",
      "content": {
        "type": "translate",
        "x": 42,
        "y": 63,
        "content": {
          "type": "scale",
          "width": 1,
          "height": 1,
          "content": {
            "type": "fill",
            "style": "rgba(200, 0, 200, 1)",
            "content": {
              "type": "path",
              "content": [{
                "type": "begin"
              }, {
                "type": "move",
                "x": 0,
                "y": 0
              }, {
                "type": "line",
                "x": 0,
                "y": 15
              }, {
                "type": "line",
                "x": 10.6,
                "y": 10.6
              }, {
                "type": "close"
              }]
            }
          }
        }
      }
    }
  }
}]
`
}]
};