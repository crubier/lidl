// File automatically generated when performing     npm run build   
// It contains examples of lidl code from the example/ok folder
module.exports={
header:`var isActive = function(_) {
  return (_ !== null && _ !== undefined);
};

var cool = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return {
      sum: (_.a + _.b),
      diff: (_.a - _.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(_) {
  return (isActive(_.a) ? _.a : _.b);
};

var return0 = function(_) {
  return 0;
};


var return1 = function(_) {
  return 1;
};

var addition = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a + _.b;
  } else {
    return inactive;
  }
};

var multiplication = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a * _.b;
  } else {
    return inactive;
  }
};

var substraction = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a - _.b;
  } else {
    return inactive;
  }
};

var division = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a / _.b;
  } else {
    return inactive;
  }
};

var remainder = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a % _.b;
  } else {
    return inactive;
  }
};

var power = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return Math.pow(_.a, _.b);
  } else {
    return inactive;
  }
};

var addOne = function(_) {
  if (isActive(_))
    return _ + 1;
  else {
    return inactive;
  }
};

var identity = function(_) {
  return _;
};

var isEqual = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return (_.a === _.b) ? true : false;
  } else {
    return inactive;
  }
};


var boolNot = function(_) {
  if (isActive(_)) {
    return !_;
  } else {
    return inactive;
  }
};

var boolAnd = function(_) {
  if (isActive(_) && isActive(_.a) && isActive(_.b)) {
    return _.a && _.b;
  } else {
    return inactive;
  }
};

var boolOr = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return _.a || _.b;
  } else {
    return inactive;
  }
};

var boolXor = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return ( _.a && !_.b ) || ( !_.a && _.b ) ;
  } else {
    return inactive;
  }
};


var ifThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return _.a;
      } else if (_.cond === false) {
        return _.b;
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


var whenThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (_.cond === false) {
        return {
          a: inactive,
          b: active
        };
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


var all = function(_) {
  return {
    a: _,
    b: _,
    c: _,
    d: _,
    e: _,
    f: _,
    g: _,
    h: _,
    i: _,
    j: _,
    k: _,
    l: _,
    m: _,
    n: _,
    o: _,
    p: _
  };
};


var cursor = function(mouse) {
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



var button = function(button) {
  var button = {
    type: "shadow",
    blur: button.pushed ? 10 : 20,
    offset: {
      x: 0,
      y: button.pushed ? 2 : 4
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "group",
      content: [{
        type: "fill",
        style: "rgba(0, 171, 255, 1)",
        content: {
          type: "rect",
          x: button.layout.x,
          y: button.layout.y,
          width: button.layout.width,
          height: button.layout.height
        }
      }, {
        type: "fill",
        style: "rgba(255, 255, 255, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: button.text,
          x: button.layout.x + button.layout.width / 2,
          y: button.layout.y + button.layout.height / 2
        }
      }]
    }
  };
  return button;
}




var label = function(_) {
  var label = {
        type: "fill",
        style: "rgba(56, 56, 56, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: _.text,
          x: _.layout.x + _.layout.width / 2,
          y: _.layout.y + _.layout.height / 2
        }
      };
  return label;
}



var group = function(elements) {
  var group = {
      type: "group",
      content: [elements.a,elements.b ]
    };
  return group;
}

// Checks if a point is inside a rectangle (picking)
var isInside = function(_){
  if(isActive(_) && isActive(_.point) && isActive(_.rect)){
    return _.point.x >= _.rect.x && _.point.x <= _.rect.x + _.rect.width && _.point.y >= _.rect.y && _.point.y <= _.rect.y + _.rect.height;
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var columnElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {x:_.rect.x,y:_.rect.y+_.interval.start*_.rect.height,width:_.rect.width,height:_.rect.height*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var rowElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {y:_.rect.y,x:_.rect.x+_.interval.start*_.rect.width,height:_.rect.height,width:_.rect.width*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is inset with a margin inside a bigger rectangle
var inset = function(_){
  if(isActive(_) && isActive(_.margin) && isActive(_.rect)){
    return {x:_.rect.x + _.margin,y:_.rect.y + _.margin,width:_.rect.width-2*_.margin,height:_.rect.height-2*_.margin};
  } else {
    return inactive;
  }
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
      ( (result1)!)
      with behaviour
      (
        apply
        (return1)
        to
        ( (ok)!)
        and get
        ( (result1)?)
      )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( (result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( (result of (a)+(b))?)
      )
    )

is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
  with behaviour
    (
      ((theResult)?) =((the magic number )+((theNumber)!))
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
      theNumber:  ((x)?)
      theResult:  ((y)!)
    })
    with behaviour
    (apply (add one) to ((x)!) and get ((y)?) )
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
      theNumber:((x)?)
      theOther:((y)?)
      theResult:((z)!)
    })
   with behaviour
    (apply
      (addition)
      to
      ({a:((x)!)b:((y)!)})
      and get
      ((z)?)
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
      theNumber:( (theNumber)?)
      theOther:( (y)?)
      theResult:( (theResult)!)
      theLast:( (wow)!)
    })
  with behaviour
    ( apply (cool)
      to
      ({a:( (theNumber)!)b:( (y)!)})
      and get
      ({sum:( (theResult)?)diff:( (wow)?)})
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
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?)= previous (x))
    )

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (a)==(b))!)
      with behaviour
      (apply (is equal) to ({a:(a),b:(b)}) and get ( (result of (a)==(b))?) )
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      ((#not (a)) !)
      with behaviour
      (apply (boolean negation) to (a) and get ((#not (a))?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean} out is (function isActive)
  is
    (
      ( (#(a) is active)!)
      with behaviour
      (apply (is active) to (a) and get ( (#(a) is active)?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( (result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( (result of (a)+(b))?)
      )
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

is
  ({
    theNumber:((theNumber)?)
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
    name: 'Definition Of Make Flow',
fileName: 'example/ok/definitionOfMakeFlow',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?)= previous (x))
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      ((#not (a))!)
      with behaviour
      ((boolean negation)  (a) = ((#not (a))?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean}out is (function isActive)
  is
    (
      ((#(a) is active)!)
      with behaviour
      (apply (is active) to (a) and get ((#(a) is active)?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ((result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ((result of (a)+(b))?)
      )
    )


  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

  interaction
    (all (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (function all)
        to
        ((variable all (a) (b))!)
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
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ((result of (u)==(v))?) )
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
      ((activation of when (cond) then (a) else (b) )?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:((activation of when (cond) then (a) else (b)) !)   })
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
  is
    (
      ( (result of if (cond) then (x) else (y)) !)
      with behaviour
      (
        when
        (cond)
        then
        (( (result of if (cond) then (x) else (y) )?) = (x))
        else
        (( (result of if (cond) then (x) else (y) )?) = (y))
      )
    )

  interaction
    (make (x:Number ref) flow initially from (y:Number in)):Activation in
  is
    (
      ((x)?) = (
                  ((new (x))!)
                  fallback to
                  (if (init) then (y) else (previous ((x)!)) )
                )
    )


is
  (
    ({
      theNumber:((new ( y ))?)
      theResult:(( y )!)
    })
    with behaviour
    (make ( y ) flow initially from (1) )
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
    name: 'Definition Of Previous',
fileName: 'example/ok/definitionOfPrevious',
     code : `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      ( ((the previous(x))?) = previous (x))
    )

is
  ({
    theNumber:((x)?)
    theResult:(previous((x)!))
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
      ( (result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ( (result of (u)==(v))?) )
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
      ( (activation of when (cond) then (a) else (b))?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:( (activation of when (cond) then (a) else (b))!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
    is
    (
      ( (result of if (cond) then (x) else (y))?)
      with behaviour
      (
        when
        (cond)
        then
        (( (result of if (cond) then (x) else (y))!) = (x))
        else
        (( (result of if (cond) then (x) else (y))!) = (y))
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
    (((#(x).theNumber)!) with behaviour (({theNumber:((#(x).theNumber)?)})=(x)))

  interaction
    ((x:{theNumber:Number in,theResult:Number out}).theResult):Number in
  is
    (((#(x).theResult)!) with behaviour ((x)=({theResult:((#(x).theResult)?)})))

is
  (
    ( (this)?)
    with behaviour
    ((( (this)!).theResult)=(( (this)!).theNumber) )
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
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
  with behaviour
    (((theResult)?)=fake=((theNumber)!))
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
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
    with behaviour
    (apply(add one) to ((theNumber)!) and get ((theResult)?))
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
    (((#(a)+(b))!) with behaviour ((addition)({a:(a)b:(b)})=((#(a)+(b))?)))

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
      ((result of (a)==(b))!)
      with behaviour
      (apply (isEqual) to ({a:(a),b:(b)}) and get ((result of (a)==(b))?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out is (function whenThenElse)
  is
    (
      ((activation of when (cond) then (a) else (b))?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:((activation of when (cond) then (a) else (b))!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
    is
      (
        ((result of if (cond) then (a) else (b))!)
        with behaviour
        (
          when
          (cond)
          then
          (((result of if (cond) then (a) else (b))?) = (a))
          else
          (((result of if (cond) then (a) else (b))?) = (b))
        )
      )

is
  (if((a)==(1))then({theNumber:((b)?),theResult:((b)!)})else({theNumber:((b)?),theResult:(-8000)}))
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
      ((variable result of (a)+(b))!)
      with behaviour
      (
        apply (addition)
        to ({a:(a)b:(b)})
        and get ((variable result of (a)+(b))?)
      )
    )

is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
    with behaviour
    (((theResult)?)=((1)+((theNumber)!)))
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
  is ((variable y b)?)

  interaction (y):Number out
  is ((variable y b)?)

  interaction (x):Number out
  is ((variable b)!)
is
  ({
    theNumber:(( x (y) ((variable b)!))?)
    theResult:(( x (z) (x))!)
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
    theNumber:((x)?)
    theOther:((x)?)
    theResult:((x)!)
    theLast:((x)!)
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
    theNumber:((x)?)
    theResult:((x)!)
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
    name: 'Simple Cursor Function',
fileName: 'example/ok/simpleCursorFunction',
     code : `interaction
  (cursor of (mouse:Mouse in)):Graphics out
with
  interaction (cursor):{Mouse->Graphics}out is (function cursor)
is
  (((#cursor of (mouse))!)
  with behaviour
  ((cursor)(mouse)=((#cursor of (mouse))?)))
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
    (((result of bob(x))!) with behaviour ((addOne)(x)=((result of bob(x))?)))
is
  ({theNumber:((a)?),theResult:(bob((a)!))})
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
      theNumber:((x)?)
      theResult:((y)!)
    })
    with behaviour
    ( ((y)?) = previous ((x)!) )
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
    (((result of (a)+(b))!) with behaviour ((addition)({a:(a)b:(b)})=((result of (a)+(b))?)))

  interaction
    (previous(a:Number in)):Number out
  is
    (((the previous (a))!) with behaviour (((the previous (a))?) = previous (a)))

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
    name: 'Ui Button',
fileName: 'example/ok/uiButton',
     code : `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (button widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (button widget)
`,
     scenario : `[{
  "memo": {},
  "state": {},
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
    "graphics":
    {
      "type": "shadow",
      "blur": 20,
      "offset": {
        "x": 0,
        "y": 4
      },
      "color": "rgba(0, 0, 0, 0.5)",
      "content": {
        "type": "group",
        "content": [{
          "type": "fill",
          "style": "rgba(0, 171, 255, 1)",
          "content": {
            "type": "rect",
            "x": 10,
            "y": 10,
            "width": 200,
            "height": 100
          }
        }, {
          "type": "fill",
          "style": "rgba(255, 255, 255, 1)",
          "content": {
            "type": "text",
            "textBaseline": "middle",
            "textAlign": "center",
            "font": "200 30px Helvetica neue",
            "text": "OK",
            "x": 110,
            "y": 60
          }
        }]
      }
    }
  }
}]
`
},{
    name: 'Ui Button With Cursor',
fileName: 'example/ok/uiButtonWithCursor',
     code : `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (group widget containing (a:{mouse:Mouse out,graphics:Graphics in}) and (b:{mouse:Mouse out,graphics:Graphics in})):{mouse:Mouse in,graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })

  interaction
    ((x:{mouse:Mouse out,graphics:Graphics in}).mouse):Mouse in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:Mouse out,graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))



  interaction
    (both (a:Mouse out) and (b:Mouse out)):Mouse in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (cursor):{Mouse->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )





  interaction
    (button widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (group widget containing (cursor widget) and (button widget))
`,
     scenario : `[{
  "memo": {},
  "state": {},
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
      "type": "group",
      "content": [{
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
      }, {
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "group",
          "content": [{
            "type": "fill",
            "style": "rgba(0, 171, 255, 1)",
            "content": {
              "type": "rect",
              "x": 10,
              "y": 10,
              "width": 200,
              "height": 100
            }
          }, {
            "type": "fill",
            "style": "rgba(255, 255, 255, 1)",
            "content": {
              "type": "text",
              "textBaseline": "middle",
              "textAlign": "center",
              "font": "200 30px Helvetica neue",
              "text": "OK",
              "x": 110,
              "y": 60
            }
          }]
        }
      }]
    }

  }
}]
`
},{
    name: 'Ui Cursor',
fileName: 'example/ok/uiCursor',
     code : `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (cursor widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (cursor):{Mouse->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )

is
  (cursor widget)
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
},{
    name: 'Ui Detailled Button With Cursor',
fileName: 'example/ok/uiDetailledButtonWithCursor',
     code : `interaction
  (simple UI):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
with

  interaction
    (group widget containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })

  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}).mouse):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))



  interaction
    (both (a:{buttons:Number, position:{x: Number,y:Number}} out) and (b:{buttons:Number, position:{x: Number,y:Number}} out)):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  with
    interaction (cursor):{{buttons:Number, position:{x: Number,y:Number}}->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )





  interaction
    (button widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (group widget containing (button widget) and (cursor widget) )
`,
     scenario : `[{
  "memo": {},
  "state": {},
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
      "type": "group",
      "content": [{
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "group",
          "content": [{
            "type": "fill",
            "style": "rgba(0, 171, 255, 1)",
            "content": {
              "type": "rect",
              "x": 10,
              "y": 10,
              "width": 200,
              "height": 100
            }
          }, {
            "type": "fill",
            "style": "rgba(255, 255, 255, 1)",
            "content": {
              "type": "text",
              "textBaseline": "middle",
              "textAlign": "center",
              "font": "200 30px Helvetica neue",
              "text": "OK",
              "x": 110,
              "y": 60
            }
          }]
        }
      }, {
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
      }]
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
      ((#cursor of (mouse))!)
      with behaviour
      ((cursor)(mouse)=((#cursor of (mouse))?))
    )


is
  ({
        mouse: ((mouse)?)
        graphics: (cursor of ((mouse)!))
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
},{
    name: 'Ui Layout Button Click',
fileName: 'example/ok/uiLayoutButtonClick',
     code : `interaction
  (simple UI):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
with

  interaction
    (two layers containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      layout:   (both2 ((a).layout) and ((b).layout))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })


  interaction
    (split column containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (columnElement):{{interval:{start:Number,end:Number},rect:{x:Number,y:Number,width:Number,height:Number}}->{x:Number,y:Number,width:Number,height:Number}} out is (function columnElement)
  is
    (
      ({
        mouse:    (both ((a).mouse) and ((b).mouse))
        layout:   ((the layout of split column containing (a) and (b))?)
        graphics: (graphics containing ((a).graphics) and ((b).graphics))
      })
      with behaviour
      (all
        ((columnElement)({interval:({start:(0)end:(0.5)})rect:((the layout of split column containing (a) and (b))!)})=((a).layout))
        ((columnElement)({interval:({start:(0.5)end:(1)})rect:((the layout of split column containing (a) and (b))!)})=((b).layout))
      )
    )


  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).mouse):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))

  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).layout):{x:Number,y:Number,width:Number,height:Number} in
  is
    (((result of (x).layout)!)
    with behaviour
    ((x)=({layout:((result of (x).layout)?)})))



  interaction
    (both (a:{buttons:Number, position:{x: Number,y:Number}} out) and (b:{buttons:Number, position:{x: Number,y:Number}} out)):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (both2 (a:{x:Number,y:Number,width:Number,height:Number} out) and (b:{x:Number,y:Number,width:Number,height:Number} out)):{x:Number,y:Number,width:Number,height:Number} in
  is
    (
      ( (#both2(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both2(a)and(b))!) )
        ( (b) = ((#both2(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (cursor):{{buttons:Number, position:{x: Number,y:Number}}->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )


  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (a)==(b))!)
      with behaviour
      (apply (is equal) to ({a:(a),b:(b)}) and get ( (result of (a)==(b))?) )
    )


  interaction
    ((a:Boolean in)and(b:Boolean in)):Boolean out
  with
    interaction (boolean and):{{a:Boolean,b:Boolean}->Boolean} out is (function boolAnd)
  is
    (
      ((result of (a)and(b))!)
      with behaviour
      (apply (boolean and) to ({a:(a),b:(b)}) and get ( (result of (a)and(b))?) )
    )

  interaction
    (add margin of (m:Number in) to (a:{x:Number,y:Number,width:Number,height:Number} in)):{x:Number,y:Number,width:Number,height:Number} out
  with
    interaction (inset):{{rect:{x:Number,y:Number,width:Number,height:Number},margin:Number}->{x:Number,y:Number,width:Number,height:Number}} out is (function inset)
  is
    (
      (((a)with added margin(m))!)
      with behaviour
      ((inset)({rect:(a)margin:(m)})=(((a)with added margin(m))?))
    )

  interaction
    ((thePoint:{x:Number,y:Number}in) is inside (theRectangle:{x:Number,y:Number,width:Number,height:Number}in)):Boolean out
  with
    interaction (func is inside): {{point:{x: Number,y:Number},rect:{x:Number,y:Number,width:Number,height:Number}}->Boolean} out is (function isInside)
  is
    (
      ((the result of (thePoint) is inside (theRectangle))!)
      with behaviour
      ((func is inside)({point:(thePoint),rect:(theRectangle)})=((the result of (thePoint) is inside (theRectangle))?))
    )


  interaction
    (button widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (button graphics function):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ({buttons:((the buttons of the mouse)?),position:((the position of the mouse)?)})
        layout:((the layout for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      (
        (button graphics function)
        ({
          layout:(add margin of (20) to ((the layout for button widget)!))
          text:("OK")
          pushed:(((the buttons of the mouse)!)==(1))
        })
        =
        ((the graphics for button widget)?)
      )
    )

  interaction
    (label widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (label graphics function):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function label)
  is
    (
      ({
        layout:((the layout for label widget)?)
        graphics: ((the graphics for label widget)!)
      })
      with behaviour
      (
        (label graphics function)
        ({
          layout:((the layout for label widget)!)
          text:("Label text")
        })
        =
        ((the graphics for label widget)?)
      )
    )



is
  (two layers containing
    (split column containing
      (button widget) and
      (label widget)) and
    (cursor widget)
  )
`,
     scenario : `[{
  "memo": {},
  "state": {},
  "args": {},
  "inter": {
    "layout": {
      "x": 0,
      "y": 0,
      "width": 1024,
      "height": 768
    },
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
      "type": "group",
      "content": [{
        "type": "group",
        "content": [{
          "type": "shadow",
          "blur": 20,
          "offset": {
            "x": 0,
            "y": 4
          },
          "color": "rgba(0, 0, 0, 0.5)",
          "content": {
            "type": "group",
            "content": [{
              "type": "fill",
              "style": "rgba(0, 171, 255, 1)",
              "content": {
                "type": "rect",
                "x": 20,
                "y": 20,
                "width": 984,
                "height": 344
              }
            }, {
              "type": "fill",
              "style": "rgba(255, 255, 255, 1)",
              "content": {
                "type": "text",
                "textBaseline": "middle",
                "textAlign": "center",
                "font": "200 30px Helvetica neue",
                "text": "OK",
                "x": 512,
                "y": 192
              }
            }]
          }
        }, {
          "type": "fill",
          "style": "rgba(56, 56, 56, 1)",
          "content": {
            "type": "text",
            "textBaseline": "middle",
            "textAlign": "center",
            "font": "200 30px Helvetica neue",
            "text": "Labeltext",
            "x": 512,
            "y": 576
          }
        }]
      }, {
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
      }]
    }
  }
}]
`
}]
};