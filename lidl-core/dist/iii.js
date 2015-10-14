////////////////////////////////////////////////////////////////////////////////
//  ######  #     # #     # ####### ### #     # #######
//  #     # #     # ##    #    #     #  ##   ## #
//  #     # #     # # #   #    #     #  # # # # #
//  ######  #     # #  #  #    #     #  #  #  # #####
//  #   #   #     # #   # #    #     #  #     # #
//  #    #  #     # #    ##    #     #  #     # #
//  #     #  #####  #     #    #    ### #     # #######
//

var parser = require('./minilanggrammar.js');
var fs = require('fs');

var current=[];
var previous=[];


var interaction = "";
var scenario = [];


fs.readFile('test1.iii', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  interaction = data;
  evaluate(interaction);
});

function step(input) {
  preval = val;
  preact = act;
  val = input.val;
  act = input.act;
  evaluate(interaction);
}

function evaluate(interactionString) {
  var interaction = fromString(interactionString);
  var This = toString(interaction);

  if (typeof interaction == "string" || interaction instanceof String) {
    eval("Data(\"" + This + "\")");
  } else {
    var res = ""
    res += interaction.operator;
    res += "(";
    res += "\"" + This + "\"";

    for (var i = 0; i < interaction.operand.length; i++) {
      res += "," + "\"" + toString(interaction.operand[i]) + "\"";
    }

    res += ")";
    console.log(res);
    eval(res);

  }
}

function toString(interaction) {
  if (typeof interaction == 'string' || interaction instanceof String) {
    return interaction;
  } else {
    var res = interaction.operator;
    res += "("
    if (interaction.operand.length > 0) {
      res += toString(interaction.operand[0]);
      for (var i = 1; i < interaction.operand.length; i++) {
        res += "," + toString(interaction.operand[i]);
      }
    }
    res += ")"
    return res;
  }
}

function fromString(interactionString) {
  return parser.parse(interactionString);
}

function resolveTypes(interaction) {
  //TODO
  for (var i = 0; i < interaction.operand.length; i++) {
    resolveTypes(interaction.operands)
  }

}


////////////////////////////////////////////////////////////////////////////////
//  ###  #     #  #######  #######  ######      #      #####   #######  ###  #######  #     #
//   #   ##    #     #     #        #     #    # #    #     #     #      #   #     #  ##    #
//   #   # #   #     #     #        #     #   #   #   #           #      #   #     #  # #   #
//   #   #  #  #     #     #####    ######   #     #  #           #      #   #     #  #  #  #
//   #   #   # #     #     #        #   #    #######  #           #      #   #     #  #   # #
//   #   #    ##     #     #        #    #   #     #  #     #     #      #   #     #  #    ##
//  ###  #     #     #     #######  #     #  #     #   #####      #     ###  #######  #     #



////////////////////////////////////////////////////////////////////////////////
//  ######   #######   #####   #######  ######   #######  ###  #######  #     #
//  #     #  #        #     #  #        #     #     #      #   #     #  ##    #
//  #     #  #        #        #        #     #     #      #   #     #  # #   #
//  ######   #####    #        #####    ######      #      #   #     #  #  #  #
//  #   #    #        #        #        #           #      #   #     #  #   # #
//  #    #   #        #     #  #        #           #      #   #     #  #    ##
//  #     #  #######   #####   #######  #           #     ###  #######  #     #


function ReceptionPrevious(This, ReceptionA) {
  val[This] = preval[ReceptionA];
  act[This] = preact[ReceptionA];
  return true;
}

function NumberReceptionPrevious(This,NumberReceptionA) {

  this.getThis = function() {
    if(previous.hasOwnProperty(NumberReceptionA)) {
      current[This].receive = previous[NumberReceptionA].receive;
      return true;
    } else {
      return {store:"previous",property:NumberReceptionA};
    }
  };
}

function If(This, Condition, Then, Else) {
  evaluate(Condition);
  if (act[Condition] === true) {
    if (val[Condition] === true) {
      evaluate(Then);
      val[This] = val[Then];
      act[This] = act[Then];
    } else {
      evaluate(Else);
      val[This] = val[Else];
      act[This] = act[Else];
    }
  } else {
    act[This] = false;
  }
  return true;
}

function Add(This, A, B) {
  evaluate(A);
  evaluate(B);
  if (act[A] === true && act[b] === true) {
    val[This] = val[A] + val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }
  return true;
}


function Substract(This, A, B) {

  evaluate(A);
  evaluate(B);
  if (act[A] === true && act[b] === true) {
    val[This] = val[A] - val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }
  return true;
}

function Multiply(This, A, B) {

  evaluate(A);
  evaluate(B);
  if (act[A] === true && act[b] === true) {
    val[This] = val[A] * val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }
  return true;
}

// Divide
// number reception A
// number reception B
function Divide(This, A, B) {

  evaluate(A);
  evaluate(B);
  if (act[A] === true && act[b] === true && val[b] !== 0) {
    val[This] = val[A] / val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }
  return true;
}

function LessThan(This, A, B) {

  evaluate(A);
  evaluate(B);
  if (act[A] === true && act[b] === true) {
    val[This] = val[A] < val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }
  return true;
}

// FirstActiveOf
// reception A
function FirstActiveOf(This, A) {
  act[This] = false;
  for (var i = 1; i < arguments.length; i++) {
    evaluate(arguments[i]);
    if (act[arguments[i]] === true) {
      act[This] = act[arguments[i]];
      val[This] = val[arguments[i]];
      break;
    }
  }
  return true;
}

// ReceiveEither
// reception A
function ReceiveEither(This, A) {
  var c = Math.floor(Math.random() * (arguments.length - 1) + 1);
  evaluate(arguments[c]);
  act[This] = act[arguments[c]];
  val[This] = val[arguments[c]];
  return true;
}

function IsActive(This, A) {
  evaluate(A);
  val[This] = act[A];
  act[This] = true;
  return true;
}

//TODO the evaluate() calls
function ReceptionCurrentValueOf(This, ReceptionA) {
  act[This] = act[A] || preact[This];
  if (act[A] === true) {
    val[This] = val[A];
  } else {
    val[This] = preval[This];
  }
  return true;
}

function VoidReceptionIsTrue(This,BooleanReceptionA) {
  evaluate(BooleanReceptionA);
  act[This]=act[BooleanReceptionA] && val[BooleanReceptionA];
  return true;
}

function VoidReceptionNot(This,VoidReceptionA){
  evaluate(VoidReceptionA);
  act[This]=!act[VoidReceptionA];
  return true;
}

////////////////////////////////////////////////////////////////////////////////
//  #######  #     #  ###   #####    #####   ###  #######  #     #
//  #        ##   ##   #   #     #  #     #   #   #     #  ##    #
//  #        # # # #   #   #        #         #   #     #  # #   #
//  #####    #  #  #   #    #####    #####    #   #     #  #  #  #
//  #        #     #   #         #        #   #   #     #  #   # #
//  #        #     #   #   #     #  #     #   #   #     #  #    ##
//  #######  #     #  ###   #####    #####   ###  #######  #     #


function EmitToEither(This, A, B) {
  if (Math.random() < 0.5) {
    val[A] = val[This];
    act[A] = act[This];
    evaluate(A);
  } else {
    val[B] = val[This];
    act[B] = act[This];
    evaluate(B);
  }

  return true;
}

function EmitToAll(This, A, B) {

  val[A] = val[This];
  act[A] = act[This];
  val[B] = val[This];
  act[B] = act[This];
  evaluate(A);
  evaluate(B);
  return true;
}

function Activation(This, A) {
  if (act[This]) {
    act[A] = val[This];
  } else {
    act[A] = false;
  }
  return true;
}

function VoidEmissionAffect(This, ReceptionA, EmissionB) {
  evaluate(ReceptionA);
  if (act[This]) {
    act[EmissionB] = act[ReceptionA];
    val[EmissionB] = val[ReceptionA];
  }
  evaluate(EmissionB);
  return true;
}

function VoidEmissionWhen(This, VoidReceptionA, VoidEmissionB) {
  evaluate(VoidReceptionA);
  if (act[This] && act[VoidReceptionA]) {
    act[VoidEmissionB] = true;
  } else {
    act[VoidEmissionB] = false;
  }
  evaluate(VoidEmissionB);
  return true;
}

function VoidEmissionAnyway(This,VoidEmissionA) {
  act[VoidEmissionA] = true;
  evaluate(VoidEmissionA);
  return true;
}

function VoidEmissionAll(This, VoidEmissionA) {
  for (var i = 1; i < arguments.length; i++) {
    act[arguments[i]] = act[This];
  }
  for (var i = 1; i < arguments.length; i++) {
    evaluate(arguments[i]);
  }
  return true;
}

// Either
// interaction A
function VoidEmissionEither(This, VoidEmissionA) {
  for (var i = 1; i < arguments.length; i++) {
    act[arguments[i]] = false;
  }
  var c = Math.floor(Math.random() * (arguments.length - 1) + 1);
  act[arguments[c]] = act[This];
  for (var i = 1; i < arguments.length; i++) {
    evaluate(arguments[i]);
  }
  return true;
}



////////////////////////////////////////////////////////////////////////////////
//  ######      #     #######     #
//  #     #    # #       #       # #
//  #     #   #   #      #      #   #
//  #     #  #     #     #     #     #
//  #     #  #######     #     #######
//  #     #  #     #     #     #     #
//  ######   #     #     #     #     #


function NumberDataNumber(This,Identifier) {


}





////////////////////////////////////////////////////////////////////////////////
//  ####### ######     #     #####  #     #
//     #    #     #   # #   #     # #     #
//     #    #     #  #   #  #       #     #
//     #    ######  #     #  #####  #######
//     #    #   #   #######       # #     #
//     #    #    #  #     # #     # #     #
//     #    #     # #     #  #####  #     #


//
//
// ////////////////////////////////////////////////////////////////////////////////
// // Behavior Previous
// // Definition
// function Previous () {
// 	this.internal={value:{}};
// 	this.input={input:{}};
// 	this.output = {output:{}};
// }
// // Transition function
// // Uses this.input and this.internal to compute this.output and this.internal
// Previous.prototype.transition = function () {
// 	if(this.input.input.active) {
// 		this.internal.value.value = this.input.input.value;
// 	}
// 	this.internal.value.active = true;
// 	this.output.output = this.internal.value;
// 	return null;
// }
// ////////////////////////////////////////////////////////////////////////////////
// // Behavior Triggered
// // Definition
// function Triggered () {
// 	this.internal={};
// 	this.input={input:{}};
// 	this.output = {output:{}};
// }
// // Transition function
// // Uses this.input and this.internal to compute this.output and this.internal
// Triggered.prototype.transition = function () {
// 	this.output.output.active = true;
// 	this.output.output.value = this.input.input.active;
// 	return null;
// }
// ////////////////////////////////////////////////////////////////////////////////
// // Behavior Activate
// // Definition
// function Activate () {
// 	this.internal={};
// 	this.input={active:{},value:{}};
// 	this.output = {output:{}};
// }
// // Transition function
// // Uses this.input and this.internal to compute this.output and this.internal
// Activate.prototype.transition = function () {
// 	this.output.output.active = true;
// 	this.output.output.value = this.input.input.active;
// 	return null;
// }
// ////////////////////////////////////////////////////////////////////////////////
// // Behavior Round
// // Definition
// function Round () {
// 	this.internal={};
// 	this.input={value:{},step:{}};
// 	this.output = {output:{}};
// }
// // Transition function
// // Uses this.input and this.internal to compute this.output and this.internal
// Round.prototype.transition = function () {
// 	this.output.output.active = this.input.value.active && this.input.step.active;
// 	this.output.output.value = Math.round(this.input.value.active, this.input.step.active);
// 	return null;
// }
// ////////////////////////////////////////////////////////////////////////////////
