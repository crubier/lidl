'use strict'; // File automatically generated when performing     npm run build   
// It contains examples of lidl code from the example/ok folder
module.exports = { 
  header: 'var isActive = function(x) {\n  return (x !== null && x !== undefined);\n};\n\nvar cool = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return {\n      sum: (x.a + x.b),\n      diff: (x.a - x.b)\n    };\n  } else {\n    return {\n      sum: inactive,\n      diff: inactive\n    };\n  }\n};\n\nvar fallback = function(x) {\n  return (isActive(x.a) ? x.a : x.b);\n};\n\nvar return0 = function(x) {\n  return 0;\n};\n\n\nvar return1 = function(x) {\n  return 1;\n};\n\nvar addition = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return x.a + x.b;\n  } else {\n    return inactive;\n  }\n};\n\nvar multiplication = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return x.a * x.b;\n  } else {\n    return inactive;\n  }\n};\n\nvar substraction = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return x.a - x.b;\n  } else {\n    return inactive;\n  }\n};\n\nvar division = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return x.a / x.b;\n  } else {\n    return inactive;\n  }\n};\n\nvar remainder = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return x.a % x.b;\n  } else {\n    return inactive;\n  }\n};\n\nvar power = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return Math.pow(x.a,x.b);\n  } else {\n    return inactive;\n  }\n};\n\nvar addOne = function(x) {\n  if (isActive(x))\n    return x + 1;\n  else {\n    return inactive;\n  }\n};\n\nvar identity = function(x) {\n  return x;\n};\n\nvar isEqual = function(x) {\n  if (isActive(x.a) && isActive(x.b)) {\n    return (x.a===x.b)?true:false;\n  } else {\n    return inactive;\n  }\n};\n\n\nvar boolNot = function(x) {\n  if (isActive(x) ) {\n    return !x;\n  } else {\n    return inactive;\n  }\n};\n\nvar ifThenElse = function(x) {\n  if (isActive(x) ) {\n    if (isActive(x.cond) ) {\n      if(x.cond ===true) {\n        return x.a;\n      } else if(x.cond ===false) {\n        return x.b;\n      } else {\n        return inactive;\n      }\n    } else {\n      return inactive;\n    }\n  } else {\n    return inactive;\n  }\n};\n\n\nvar whenThenElse = function(x) {\n  if (isActive(x) ) {\n    if (isActive(x.cond) ) {\n      if(x.cond === true) {\n        return {a:active,b:inactive};\n      } else if(x.cond ===false) {\n        return {a:inactive,b:active};\n      } else {\n        return inactive;\n      }\n    } else {\n      return inactive;\n    }\n  } else {\n    return inactive;\n  }\n};\n\n\nvar all = function(x) {\n  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,m:x,n:x,o:x,p:x};\n};\n\n\nvar cursor = function(mouse){\n  var cursor = {\n    type: "shadow",\n    blur: mouse.buttons === 0 ? 20 : 10,\n    offset: {\n      x: 0,\n      y: mouse.buttons === 0 ? 4 : 2\n    },\n    color: "rgba(0, 0, 0, 0.5)",\n    content: {\n      type: "translate",\n      x: mouse.position.x,\n      y: mouse.position.y,\n      content: {\n        type: "scale",\n        width: mouse.buttons === 0 ? 1 : 0.8,\n        height: mouse.buttons === 0 ? 1 : 0.8,\n        content: {\n          type: "fill",\n          style: "rgba(200, 0, 200, 1)",\n          content: {\n            type: "path",\n            content: [{\n              type: "begin"\n            }, {\n              type: "move",\n              x: 0,\n              y: 0\n            }, {\n              type: "line",\n              x: 0,\n              y: 15\n            }, {\n              type: "line",\n              x: 10.6,\n              y: 10.6\n            }, {\n              type: "close"\n            }]\n          }\n        }\n      }\n    }\n  };\n  return cursor;\n}\n\n', 






































































































































































































  lidl: [{ 
    name: 'Affectation Expression', 
    fileName: 'example/ok/affectationExpression', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction\n    (the magic number):Number out\n  with\n    interaction (return1):{Void->Number} out is (function return1)\n  is\n    (\n      (variable result1)\n      with behaviour\n      (\n        apply\n        (return1)\n        to\n        (variable ok)\n        and get\n        (variable result1)\n      )\n    )\n\n  interaction\n    ((a:Number in)+(b:Number in)):Number out\n  with\n    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)\n  is\n    (\n      (variable result of (a)+(b))\n      with behaviour\n      (\n        apply\n        (addition)\n        to\n        ({a:(a)b:(b)})\n        and get\n        (variable result of (a)+(b))\n      )\n    )\n\nis\n  (\n    ({\n      theNumber:(# theNumber)\n      theResult:(# theResult)}\n    )\n  with behaviour\n    (\n      (# theResult) =((the magic number )+(# theNumber))\n    )\n  )\n', 



















































    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 51 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 79 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 43 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 68 }\n  }\n]\n' }, 






















  { 
    name: 'Arguments', 
    fileName: 'example/ok/arguments', 
    code: 'interaction\n  (bob(a:Number in)):Number out\nis\n  (a)\n', 




    scenario: '[\n  {\n    "args":  {"a":28},\n    "inter":  28\n  },\n  {\n    "args":  {"a":2},\n    "inter":  2\n  },\n  {\n    "args":  {"a":3},\n    "inter":  3\n  },\n  {\n    "args":  {"a":6},\n    "inter":  6\n  }\n]\n' }, 


















  { 
    name: 'Compilation Example Thesis', 
    fileName: 'example/ok/compilationExampleThesis', 
    code: 'interaction\n  (My Simple User Interface):{theNumber: Number in, theResult: Number out}\nwith\n  interaction (add one):{Number->Number}out is (function addOne)\nis\n  (\n    ({\n        theNumber:  (x)\n        theResult:  (y)\n      })\n    with behaviour\n    (apply (add one) to (x) and get (y))\n  )\n', 













    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 51 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 79 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 43 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 68 }\n  }\n]\n' }, 






















  { 
    name: 'Composition 2 X 1', 
    fileName: 'example/ok/composition2x1', 
    code: 'interaction\n  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out}\nwith\n  interaction\n    (addition):{{a:Number,b:Number}->Number}out\n  is\n    (function addition)\nis\n  (\n    ({\n      theNumber:(x)\n      theOther:(y)\n      theResult:(z)\n    })\n   with behaviour\n    (apply\n      (addition)\n      to\n      ({a:(x)b:(y)})\n      and get\n      (z)\n    )\n  )\n', 























    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117 }\n  }\n]\n' }, 






















  { 
    name: 'Composition 2 X 2', 
    fileName: 'example/ok/composition2x2', 
    code: 'interaction\n  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out}\nwith\n interaction\n  (cool):{{a:Number,b:Number}->{sum:Number,diff:Number}} out\n  is\n  (function cool)\nis\n  (\n    ({\n      theNumber:(variable theNumber)\n      theOther:(variable y)\n      theResult:(variable theResult)\n      theLast:(variable wow)\n    })\n  with behaviour\n    ( apply (cool)\n      to\n      ({a:(variable theNumber)b:(variable y)})\n      and get\n      ({sum:(variable theResult)diff:(variable wow)})\n    )\n  )\n', 























    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100,"theLast":0 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80,"theLast":76 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null,"theLast":null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54,"theLast":30 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117,"theLast":17 }\n  }\n]\n' }, 






















  { 
    name: 'Definition Of Init', 
    fileName: 'example/ok/definitionOfInit', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Boolean out}\nwith\n\n  interaction\n    (previous (x:Number in)):Number out\n  is\n    (\n      (variable previous(x))\n      with behaviour\n      (get(variable previous(x))from previous and set (x) for next)\n    )\n\n  interaction\n    ((a:Number in)==(b:Number in)):Boolean out\n  with\n    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)\n  is\n    (\n      (variable result of (a)==(b))\n      with behaviour\n      (apply (is equal) to ({a:(a),b:(b)}) and get (variable result of (a)==(b)) )\n    )\n\n  interaction\n    (not(a:Boolean in)):Boolean out\n  with\n    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)\n  is\n    (\n      (variable not (a))\n      with behaviour\n      (apply (boolean negation) to (a) and get (variable not (a)) )\n    )\n\n  interaction\n    ((a:Number in) is active):Boolean out\n  with\n    interaction (is active):{Number->Boolean} out is (function isActive)\n  is\n    (\n      (variable  (a) is active)\n      with behaviour\n      (apply (is active) to (a) and get (variable (a) is active) )\n    )\n\n  interaction\n    ((a:Number in)+(b:Number in)):Number out\n  with\n    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)\n  is\n    (\n      (variable result of (a)+(b))\n      with behaviour\n      (\n        apply\n        (addition)\n        to\n        ({a:(a)b:(b)})\n        and get\n        (variable result of (a)+(b))\n      )\n    )\n\n  interaction\n    (init):Boolean out\n  is\n    ( not ( (previous(1) ) is active ) )\n\nis\n  ({\n    theNumber:(variable theNumber)\n    theResult:(init)\n  })\n', 










































































    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": true }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": false }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": false }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": false }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": false }\n  }\n]\n' }, 






















  { 
    name: 'Definition Of Previous', 
    fileName: 'example/ok/definitionOfPrevious', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction\n    (previous (x:Number in)):Number out\n  is\n    (\n      (variable previous(x))\n      with behaviour\n      (get(variable previous(x))from previous and set (x) for next)\n    )\n\nis\n  ({\n    theNumber:(variable theNumber)\n    theResult:(previous(variable theNumber))\n  })\n', 


















    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 42 }\n  }\n]\n' }, 






















  { 
    name: 'Definitionof If Then Else', 
    fileName: 'example/ok/definitionofIfThenElse', 
    code: 'interaction\n (test (t:Number in)):Number out\nwith\n\n\n  interaction\n    ((u:Number in)==(v:Number in)):Boolean out\n  with\n    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)\n  is\n    (\n      (variable result of (u)==(v))\n      with behaviour\n      (apply (is equal) to ({a:(u),b:(v)}) and get (variable result of (u)==(v)) )\n    )\n\n\n  interaction\n    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in\n  with\n    interaction\n      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out\n    is\n      (function whenThenElse)\n  is\n    (\n      (variable activation of when (cond) then (a) else (b))\n      with behaviour\n      (\n        apply\n        (whenThenElse)\n        to\n        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })\n        and get\n        ({a:(a) b:(b)})\n      )\n    )\n\n    interaction\n      (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out\n    is\n    (\n      (variable result of if (cond) then (x) else (y))\n      with behaviour\n      (\n        when\n        (cond)\n        then\n        ((variable result of if (cond) then (x) else (y)) = (x))\n        else\n        ((variable result of if (cond) then (x) else (y)) = (y))\n      )\n    )\n\nis\n  (if((t)==(1))then(3)else(4))\n', 
























































    scenario: '[\n  {\n    "args":  {"t":0},\n    "inter":  4\n  },\n  {\n    "args":  {"t":1},\n    "inter":  3\n  },\n  {\n    "args":  {"t":2},\n    "inter":  4\n  },\n  {\n    "args":  {"t":3},\n    "inter":  4\n  }\n]\n' }, 


















  { 
    name: 'Dereferencing', 
    fileName: 'example/ok/dereferencing', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction\n    ((x:{theNumber:Number in,theResult:Number out}).theNumber):Number out\n  is\n    ((variable (x).theNumber) with behaviour (({theNumber:(variable (x).theNumber)})=(x)))\n\n  interaction\n    ((x:{theNumber:Number in,theResult:Number out}).theResult):Number in\n  is\n    ((variable (x).theResult) with behaviour ((x)=({theResult:(variable (x).theResult)})))\n\n\nis\n  (\n    (variable this)\n    with behaviour\n    (((variable this).theResult)=((variable this).theNumber) )\n  )\n', 





















    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 42 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 67 }\n  }\n]\n' }, 






















  { 
    name: 'Fake Affectation', 
    fileName: 'example/ok/fakeAffectation', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n  interaction\n    ((a:Number out)=fake=(b:Number in)):Activation in\n  with\n    interaction (identity):{Number->Number}out is (function identity)\n  is\n    (apply (identity) to (b) and get (a))\nis\n  (\n    (\n    {theNumber:(variable theNumber)theResult:(variable theResult)}\n    )\n  with behaviour\n    ((variable theResult)=fake=(variable theNumber))\n  )\n', 

















    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 42 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 67 }\n  }\n]\n' }, 






















  { 
    name: 'Function Application', 
    fileName: 'example/ok/functionApplication', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n  interaction (add one):{Number->Number}out is (function addOne)\nis\n  (\n    ({\n      theNumber:(variable theNumber)\n      theResult:(variable theResult)\n    })\n    with behaviour\n    (apply(add one) to (variable theNumber) and get (variable theResult))\n  )\n', 













    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 51 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 79 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 43 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 68 }\n  }\n]\n' }, 






















  { 
    name: 'Less Problematic Definition Of Make Flow', 
    fileName: 'example/ok/lessProblematicDefinitionOfMakeFlow', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction\n    (previous (x:Number in)):Number out\n  is\n    (\n      (variable previous(x))\n      with behaviour\n      (get(variable previous(x))from previous and set (x) for next)\n    )\n\n  interaction\n    (not(a:Boolean in)):Boolean out\n  with\n    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)\n  is\n    (\n      (variable not (a))\n      with behaviour\n      (apply (boolean negation) to (a) and get (variable not (a)) )\n    )\n\n  interaction\n    ((a:Number in) is active):Boolean out\n  with\n    interaction (is active):{Number->Boolean}out is (function isActive)\n  is\n    (\n      (variable  (a) is active)\n      with behaviour\n      (apply (is active) to (a) and get (variable  (a) is active) )\n    )\n\n  interaction\n    ((a:Number in)+(b:Number in)):Number out\n  with\n    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)\n  is\n    (\n      (variable result of (a)+(b))\n      with behaviour\n      (\n        apply\n        (addition)\n        to\n        ({a:(a)b:(b)})\n        and get\n        (variable result of (a)+(b))\n      )\n    )\n\n\n  interaction\n    (init):Boolean out\n  is\n    ( not ( (previous(1) ) is active ) )\n\n  interaction\n    (all (a:Activation out) else (b:Activation out)):Activation in\n  is\n    (\n      (variable all (a) (b))\n      with behaviour\n      (\n        apply\n        (function all)\n        to\n        (variable all (a) (b))\n        and get\n        ({a:(a) b:(b)})\n      )\n    )\n\n  interaction\n    ( (a:Number in) fallback to (b:Number in)):Number out\n  is\n    (\n      if ((a) is active)\n      then (a)\n      else (b)\n    )\n\n  interaction\n    (new (x:Number ref)):Number ref\n  is\n    (variable new (x))\n\n  interaction\n    ((u:Number in)==(v:Number in)):Boolean out\n  with\n    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)\n  is\n    (\n      (variable result of (u)==(v))\n      with behaviour\n      (apply (is equal) to ({a:(u),b:(v)}) and get (variable result of (u)==(v)) )\n    )\n\n\n  interaction\n    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in\n  with\n    interaction\n      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out\n    is\n      (function whenThenElse)\n  is\n    (\n      (variable activation of when (cond) then (a) else (b))\n      with behaviour\n      (\n        apply\n        (whenThenElse)\n        to\n        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })\n        and get\n        ({a:(a) b:(b)})\n      )\n    )\n\n  interaction\n    (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out\n  is\n    (\n      (variable result of if (cond) then (x) else (y))\n      with behaviour\n      (\n        when\n        (cond)\n        then\n        ((variable result of if (cond) then (x) else (y)) = (x))\n        else\n        ((variable result of if (cond) then (x) else (y)) = (y))\n      )\n    )\n\n\nis\n  (\n    ({\n      theNumber:(new (variable theNumber))\n      theResult:(variable theNumber)\n    })\n    with behaviour\n    ( (variable theNumber)  =   (  (new (variable theNumber)) fallback to  (if (init) then (1) else (previous (variable theNumber) ) ) ))\n  )\n', 




















































































































































    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": 1 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": 1 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 67 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": -4,  "theResult": -4 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": -4 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": -4 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": -4 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 42 }\n  }\n]\n' }, 










































  { 
    name: 'Literals', 
    fileName: 'example/ok/literals', 
    code: 'interaction\n  (ok literal):Number out\nwith\n\n  interaction\n    ((a:Number in) + (b:Number in)):Number out\n  with\n    interaction\n      (addition):{{a:Number,b:Number}->Number}out\n    is\n      (function addition)\n  is\n    ((# (a)+(b)) with behaviour ((addition)({a:(a)b:(b)})=(#(a)+(b))))\n\nis\n  ((9)+(9))\n', 
















    scenario: '\n[\n  {\n    "args": {},\n    "inter" : 18\n  },\n  {\n  "args": {},\n  "inter" : 18\n},\n{\n  "args": {},\n  "inter" : 18\n},\n{\n  "args": {},\n  "inter" : 18\n}\n]\n' }, 



















  { 
    name: 'Real Affectation Expression', 
    fileName: 'example/ok/realAffectationExpression', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)\n\n  interaction\n    ((a:Number in)+(b:Number in)):Number out\n  is\n    ((variable result of (a)+(b))with behaviour\n    (apply(addition)\n    to ({a:(a)b:(b)})\n    and get (variable result of (a)+(b))))\n\nis\n  (\n    (\n    {theResult:(theResult)theNumber:(theNumber)}\n    )\n  with behaviour\n    ((theResult)=((1)+(theNumber)))\n  )\n', 






















    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 51 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 79 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 43 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 68 }\n  }\n]\n' }, 






















  { 
    name: 'Referential Transparency', 
    fileName: 'example/ok/referentialTransparency', 
    code: 'interaction\n  (main):{theNumber:Number in,theResult:Number out}\nwith\n\n  interaction (z):Number out\n  is (variable y b)\n\n  interaction (y):Number out\n  is (variable y b)\n\n  interaction (x):Number out\n  is (variable b)\nis\n  ({\n    theNumber:(variable x (y) (variable b))\n    theResult:(variable x (z) (x))\n  })\n', 

















    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 42 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 67 }\n  }\n]\n' }, 






















  { 
    name: 'Resolver', 
    fileName: 'example/ok/resolver', 
    code: 'interaction\n  (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}\nis\n  ({\n    theNumber:(variable theNumber)\n    theOther:(variable theNumber)\n    theResult:(variable theNumber)\n    theLast:(variable theNumber)\n  })\n', 









    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50, "theOther":null, "theResult": 50, "theLast": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theOther":null,"theResult": 78 , "theLast": 78}\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null, "theOther":null, "theResult": null, "theLast": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null, "theOther":42, "theResult": 42, "theLast": 42 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67, "theOther":null, "theResult": 67, "theLast": 67 }\n  }\n]\n' }, 






















  { 
    name: 'Simple', 
    fileName: 'example/ok/simple', 
    code: 'interaction\n  (main):{theNumber:Number in,theResult:Number out}\nis\n  ({\n    theNumber:(x)\n    theResult:(x)\n  })\n', 







    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 42 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 67 }\n  }\n]\n' }, 






















  { 
    name: 'Simple Func', 
    fileName: 'example/ok/simpleFunc', 
    code: 'interaction\n  (bob):{theNumber:Number in,theResult:Number out}\nwith\n  interaction\n    (bob(x:Number in)):Number out\n  with\n    interaction\n      (addOne):{Number->Number}out\n    is\n      (function addOne)\n  is\n    ((result of bob(x)) with behaviour ((addOne)(x)=(result of bob(x))))\nis\n  ({theNumber:(a),theResult:(bob(a))})\n', 














    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": 51 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 79 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": 43 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 68 }\n  }\n]\n' }, 






















  { 
    name: 'Simple Previous Next', 
    fileName: 'example/ok/simplePreviousNext', 
    code: 'interaction\n  (main):{theNumber:Number in,theResult:Number out}\nis\n  (\n    ({\n      theNumber:(x)\n      theResult:(y)\n    })\n    with behaviour\n    (get (y) from previous and set (x) for next)\n  )\n', 











    scenario: '[\n  {\n    "args":  {},\n    "inter":  { "theNumber": 50,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 78,  "theResult": 50 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": null,  "theResult": 78 }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 42,  "theResult": null }\n  },\n  {\n    "args":  {},\n    "inter":  { "theNumber": 67,  "theResult": 42 }\n  }\n]\n' }, 






















  { 
    name: 'Sum Of Previous', 
    fileName: 'example/ok/sumOfPrevious', 
    code: 'interaction\n  (wow (a:Number in)):Number out\nwith\n\n  interaction\n    ((a:Number in) + (b:Number in)):Number out\n  with\n    interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)\n  is\n    ((# (a)+(b)) with behaviour ((addition)({a:(a)b:(b)})=(#(a)+(b))))\n\n  interaction\n    (previous(a:Number in)):Number out\n  is\n    ((# previous (a)) with behaviour ((# previous (a)) = previous (a)))\n\nis\n    ((previous(a))+(previous(a)))\n', 


















    scenario: '\n[\n  {\n    "args": {\n      "a": 1\n    },\n    "inter" : null\n  },\n  {\n    "args": {\n      "a": 8\n    },\n    "inter" : 2\n  },\n   {\n    "args": {\n      "a": 6\n    },\n    "inter" : 16\n  }\n]\n' }] };