// File automatically generated when performing     npm run build   
// It contains examples of lidl code from the example/test folder
module.exports={
header:`var isActive = function(x) {
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

`,
lidl:[{
     code : `interaction (bob):{theNumber:Number in,theResult:Number out}
with

  interaction (1):Number out is
  ((variable result1) with behaviour (apply (function return1) to (variable ok) and get (variable result1)   ))

  interaction ((a:Number in)+(b:Number in)):Number out is
  ((variable result of (a)+(b))with behaviour
  (apply(function addition)
    to ({
      0:(a)
      1:(b)
    })
    and get (variable result of (a)+(b))))

is
  (
    (
    {theNumber:(variable theNumber)theResult:(variable theResult)}
    )
  with behaviour
    ((variable theResult)=((1)+(variable theNumber)))
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
     code : `interaction (bob):{theNumber:Number in,theOther:Number in,theResult:Number out} is
(
({theNumber:(variable theNumber)theOther:(variable y)theResult:(variable theResult)})
 with behaviour
(apply(function addition)
to ({0:(variable theNumber)
1:(variable y)})
 and get (variable theResult)))
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
     code : `interaction (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out} is
  (
    ({
      theNumber:(variable theNumber)
      theOther:(variable y)
      theResult:(variable theResult)
      theLast:(variable wow)
    })
  with behaviour
    (apply (function cool) to ({0:(variable theNumber)1:(variable y)}) and get ({sum:(variable theResult)diff:(variable wow)}) )
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
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      (variable previous(x))
      with behaviour
      (get(variable previous(x))from previous and set (x) for next)
    )

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  is
    (
      (variable result of (a)==(b))
      with behaviour
      (apply (function isEqual) to ({a:(a),b:(b)}) and get (variable result of (a)==(b)) )
    )

  interaction
    (not(a:Boolean in)):Boolean out
  is
    (
      (variable not (a))
      with behaviour
      (apply (function boolNot) to (a) and get (variable not (a)) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  is
    (
      (variable  (a) is active)
      with behaviour
      (apply (function isActive) to (a) and get (variable  (a) is active) )
    )

  interaction
    (1):Number out
  is
    ((variable the number 1) with behaviour (apply (function return1) to (variable nothing) and get (variable the number 1)   ))

  interaction
    ((a:Number in)+(b:Number in)):Number out
  is
    (
      (variable result of (a)+(b))
      with behaviour
      (apply(function addition)to ({0:(a)1:(b)}) and get (variable result of (a)+(b)))
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

is
  ({
    theNumber:(variable theNumber)
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
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      (variable previous(x))
      with behaviour
      (get(variable previous(x))from previous and set (x) for next)
    )

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  is
    (
      (variable result of (a)==(b))
      with behaviour
      (apply (function isEqual) to ({a:(a),b:(b)}) and get (variable result of (a)==(b)) )
    )

  interaction
    (not(a:Boolean in)):Boolean out
  is
    (
      (variable not (a))
      with behaviour
      (apply (function boolNot) to (a) and get (variable not (a)) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  is
    (
      (variable  (a) is active)
      with behaviour
      (apply (function isActive) to (a) and get (variable  (a) is active) )
    )

  interaction
    (1):Number out
  is
    ((variable the number 1) with behaviour (apply (function return1) to (variable nothing) and get (variable the number 1)   ))

  interaction
    ((a:Number in)+(b:Number in)):Number out
  is
    (
      (variable result of (a)+(b))
      with behaviour
      (apply(function addition)to ({0:(a)1:(b)}) and get (variable result of (a)+(b)))
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

  interaction
    (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
  is
  (
    (variable result of if (cond) then (a) else (b))
    with behaviour
    (
      apply
      (function ifThenElse)
      to
      ({  cond:(cond)  a:(a)  b:(b)  })
      and get
      (variable result of if (cond) then (a) else (b))
    )
  )

  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  is
    (
      (variable activation of when (cond) then (a) else (b))
      with behaviour
      (
        apply
        (function whenThenElse)
        to
        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    (all (a:Activation out) else (b:Activation out)):Activation in
  is
    (
      (variable all (a) (b))
      with behaviour
      (
        apply
        (function all)
        to
        (variable all (a) (b))
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    ( (a:Number in) fallback to (b:Number in)):Number out
  is
    (
      if ((a) is active)
      then (a)
      else (b)
    )

  interaction
    ( (a:Number in) fallback to (b:Number in) fallback to (c:Number in)):Number out
  is
    (((a) fallback to (b)) fallback to (c))

  interaction
    (new (x:Number in)):Number in
  is
    (variable new (x))




  interaction
    (make (x:Number out) flow initially from (y:Number in)):Activation in
  is
    ( (x)  =   (  (new (x)) fallback to  (if (init) then (y) else (previous (x)) ) ) )





is
  (
    ({
      theNumber:(new (variable theNumber))
      theResult:(variable theNumber)
    })
    with behaviour
    (make (variable theNumber) flow initially from (1) )
  )
`,
     scenario : `[
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 1 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 1 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": -4,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  }
]
`
},{
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      (variable previous(x))
      with behaviour
      (get(variable previous(x))from previous and set (x) for next)
    )

is
  ({
    theNumber:(variable theNumber)
    theResult:(previous(variable theNumber))
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
     code : `interaction
 (test (t:Number in)):Number out
with


  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  is
    (
      (variable result of (u)==(v))
      with behaviour
      (apply (function isEqual) to ({a:(u),b:(v)}) and get (variable result of (u)==(v)) )
    )


interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  is
    (
      (variable activation of when (cond) then (a) else (b))
      with behaviour
      (
        apply
        (function whenThenElse)
        to
        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
    is
    (
      (variable result of if (cond) then (x) else (y))
      with behaviour
      (
        when
        (cond)
        then
        ((variable result of if (cond) then (x) else (y)) = (x))
        else
        ((variable result of if (cond) then (x) else (y)) = (y))
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
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

    interaction
        ((x:{theNumber:Number in,theResult:Number out}).theNumber):Number out
    is
        ((variable (x).theNumber) with behaviour (({theNumber:(variable (x).theNumber)})=(x)))

 interaction
        ((x:{theNumber:Number in,theResult:Number out}).theResult):Number in
    is
        ((variable (x).theResult) with behaviour ((x)=({theResult:(variable (x).theResult)})))


is
  (
    (variable this)
    with behaviour
    (((variable this).theResult)=((variable this).theNumber) )
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
     code : `interaction (bob):{theNumber:Number in,theResult:Number out}
with
  interaction ((a:Number out)=fake=(b:Number in)):Activation in is
  (apply (function identity) to (b) and get (a))
is
  (
    (
    {theNumber:(variable theNumber)theResult:(variable theResult)}
    )
  with behaviour
    ((variable theResult)=fake=(variable theNumber))
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
     code : `interaction (bob):{theNumber:Number in,theResult:Number out} is
( (
{theNumber:(variable theNumber)theResult:(variable theResult)}
) with behaviour
(apply(function addOne) to (variable theNumber) and get (variable theResult)))
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
     code : `interaction
 (test (a:Number in)):{theNumber:Number in,theResult:Number out}
with


  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  is
    (
      (variable result of (a)==(b))
      with behaviour
      (apply (function isEqual) to ({a:(a),b:(b)}) and get (variable result of (a)==(b)) )
    )


interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  is
    (
      (variable activation of when (cond) then (a) else (b))
      with behaviour
      (
        apply
        (function whenThenElse)
        to
        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
    is
    (
      (variable result of if (cond) then (a) else (b))
      with behaviour
      (
        when
        (cond)
        then
        ((variable result of if (cond) then (a) else (b)) = (a))
        else
        ((variable result of if (cond) then (a) else (b)) = (b))
      )
    )

is
  (if((a)==(1))then({theNumber:(variable xzw),theResult:(variable xzw)})else({theNumber:(variable uvwys),theResult:(-8000)}))
`,
     scenario : `[
  {
    "args":  {"a":0},
    "inter":  4
  },
  {
    "args":  {"a":1},
    "inter":  3
  },
  {
    "args":  {"a":2},
    "inter":  4
  },
  {
    "args":  {"a":3},
    "inter":  4
  }
]
`
},{
     code : `interaction (ok literal):Number out
with

interaction ((a:Number in) + (b:Number in)):Number out
is ((# (a)+(b)) with behaviour ((function addition)({0:(a)1:(b)})=(#(a)+(b))))

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
     code : `interaction (bob):{theNumber:Number in,theResult:Number out}
with

  interaction (1):Number out is
  ((variable result1) with behaviour (apply (function return1) to (variable ok) and get (variable result1)   ))

  interaction ((a:Number in)+(b:Number in)):Number out is
  ((variable result of (a)+(b))with behaviour
  (apply(function addition)
    to ({
      0:(a)
      1:(b)
    })
    and get (variable result of (a)+(b))))

is
  (
    (
    {theResult:(variable theResult)theNumber:(variable theNumber)}
    )
  with behaviour
    ((variable theResult)=((1)+(variable theNumber)))
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
     code : `
    interaction (main):{theNumber:Number in,theResult:Number out}

    with

      interaction (z):Number out
      is (variable y b)

      interaction (y):Number out
      is (variable y b)

      interaction (x):Number out
      is (variable b)
    is

        ({
          theNumber:(variable x (y) (variable b))
          theResult:(variable x (z) (x))
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
     code : `interaction (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}
is
    (
    {theNumber:(variable theNumber)
    theOther:(variable theNumber)
    theResult:(variable theNumber)
    theLast:(variable theNumber)}
    )
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
     code : `

    interaction (main):{theNumber:Number in,theResult:Number out}

    is

        ({
          theNumber:(variable x)
          theResult:(variable x)
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
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction
    (bob(x:Number in)):Number out
  is
    ((# bob (x)) with behaviour ((function addOne)(x)=(# bob (x))))
is
  ({theNumber:(#a),theResult:(bob(#a))})
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
     code : `

    interaction (main):{theNumber:Number in,theResult:Number out}

    is

        (({
          theNumber:(variable x)
          theResult:(variable y)
        }) with behaviour (
get (variable y) from previous and set (variable x) for next
)
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
     code : `interaction (wow (a:Number in)):Number out
with

interaction ((a:Number in) + (b:Number in)):Number out
is ((# (a)+(b)) with behaviour ((function addition)({0:(a)1:(b)})=(#(a)+(b))))

interaction (previous(a:Number in)):Number out
is ((# previous (a)) with behaviour ((# previous (a)) = previous (a)))
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
}]
};