"use strict";

const inactive = null;
const active = "active";

// Simple mono directional affectation Interaction
class Affectation {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }
  async interfaceIn(val) {
    let b = await this.b.interfaceOut();
    if(val===active) {
      return await this.a.interfaceIn(b);
    } else if (val===inactive){
      return await this.a.interfaceIn(inactive);
    } else {
      throw new Error('Invalid value');
    }
  }
}

// Function application interaction
class Application {
  constructor(y,f,x) {
    this.y = y;
    this.f = f;
    this.x = x;
  }
  async interfaceIn(val) {
    let [f,x] = await Promise.all([this.f.interfaceOut(),this.x.interfaceOut()]);
    if(val===active) {
      return await this.y.interfaceIn( f(x));
    } else if (val===inactive){
      return await this.y.interfaceIn(inactive);
    } else {
      throw new Error('Invalid value');
    }
  }
}

// Previous next interaction
class State {
  constructor(a,b) {
    this.a = a;
    this.b = b;
    this.state = inactive;
  }
  async interfaceIn(val) {
    if(val===active) {
      [,this.state] = await Promise.all([this.a.interfaceIn(this.state),this.b.interfaceOut()]);
      return;
    }else if(val===inactive){
      [,] = await Promise.all([this.a.interfaceIn(inactive),this.b.interfaceOut()]);
      return;
    } else {
      throw new Error('Invalid value');
    }
  }
}

// Interaction that outputs a constant value
class Literal {
  constructor(a) {
    this.value = a;
  }
  async interfaceOut() {
    return this.value;
  }
}

// Interaction that outputs the index of the current instant, starting from 0
class Instant {
  constructor() {
    this.value = 0;
  }
  async interfaceOut() {
    return this.value++;
  }
}

// Interaction that outputs the number of milliseconds between 1970-01-01 and now
class Now {
  constructor() {
  }
  async interfaceOut() {
    return Date.now();
  }
}

// Interaction that logs the incoming signal to console
class Sink {
  constructor(a) {
    this.name = a;
  }
  async interfaceIn(val) {
    return console.log(this.name +": " + val);
  }
}


class InputPort {
  constructor(variable) {
    this.variable = variable;
  }
  async interfaceIn(x) {
    this.variable.receiveValue(x);
    return;
  }
}

class OutputPort {
  constructor(variable) {
    this.variable = variable;
  }
  async interfaceOut() {
    return this.variable.sendValue();
  }
}

// Variable interactions to make the bridge between interactions
class Variable {

  // Create a variable
  constructor(name) {
    this.name = name;
    this.inputPorts = [];
    this.outputPorts = [];
    this.reset();
  }

  // Create an interaction that consists in writing to this variable
  in(){
    let port = new InputPort(this);
    this.inputPorts.push(port);
  }

  // Create an interaction that consists in reading from this variable
  out(){
    let port = new InputPort(this);
    this.outputPorts.push(port);
  }

  // Reset the state of the variable between each instant
  reset(){
    this.potentialValues = [];
    this.valuesToSend = [];
    this.phase = "input"
  }

  // Resolve actual value depending on input values
  resolve(){
    // Active potential values
    let activeValues = this.potentialValues.filter((x)=>(x!==inactive))
    // Three different cases
    if(activeValues.length===0) {
      this.valuesToSend = outputPorts.map((x)=>(inactive));
      this.phase = "output";
    } else if(activeValues.length===1)  {
      this.valuesToSend = outputPorts.map((x)=>(activeValues[0]));
      this.phase = "output";
    } else {
      this.valuesToSend = outputPorts.map((x)=>(inactive));
      this.phase = "output";
      throw new Error('Multiple potential values for variable '+this.name);
    }
  }

  // Receive a value sent by one of the input ports for the variable
  receiveValue(v) {
    if(phase==="input") {
      this.potentialValues.push(v);
      if(this.potentialValues.length>=this.inputPorts.length){
        this.resolve();
      }
    } else {
      throw new Error('Variable '+this.name+' receiving value during phase '+phase);
    }
  }

  // Send a value to one of the output ports for the variable
  sendValue() {
    if(phase==="output") {
      let res = this.valuesToSend.pop(v);
      if(this.valuesToSend.length<=0){
        this.reset();
      }
      return res;
    } else {
      throw new Error('Variable '+this.name+' sending value during phase '+phase);
    }
  }
}


// let a = new Affectation(new Sink(), new Literal(5));



async function test() {
  let a = new Sink("TestA");
  a.interfaceIn("okookok");

  let b = new Literal("TestB: kjojoj")
  console.log(await b.interfaceOut());

  let c = new Affectation(new Sink("TestC") ,new Literal(5));
  await c.interfaceIn(active);
  await c.interfaceIn(active);
  await c.interfaceIn(inactive);
  await c.interfaceIn(active);

  let d = new Application(new Sink("TestD"), new Literal(Math.cos) ,new Literal(5));
  await d.interfaceIn(active);
  await d.interfaceIn(active);
  await d.interfaceIn(inactive);
  await d.interfaceIn(active);

  let e = new State(new Sink("TestE") ,new Instant());
  await e.interfaceIn(active);
  await e.interfaceIn(active);
  await e.interfaceIn(inactive);
  await e.interfaceIn(inactive);
  await e.interfaceIn(active);
  await e.interfaceIn(inactive);
  await e.interfaceIn(active);
  await e.interfaceIn(active);

  let f = new Application(new Sink("TestF"), new Literal(Math.floor) ,new Now());
  await f.interfaceIn(active);
  await f.interfaceIn(active);
  await f.interfaceIn(inactive);
  await f.interfaceIn(active);

  console.log("All tests ok");
  return ;
}

test();
