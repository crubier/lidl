"use strict";

const inactive = null;
const active = "active";

class Affectation {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }
  set interface(val) {
    if(val===active) {
      this.a.interface = this.b.interface;
      return;
    }else if(val===inactive){
      this.a.interface = inactive;
      return;
    } else {
      throw new Error('Invalid value');
      return;
    }
  }
  get interface() {
    throw new Error('Trying to read from an input');
  }
}

class Application {
  constructor(a,f,b) {
    this.f = f;
    this.a = a;
    this.b = b;
  }
  set interface(val) {
    if(val===active) {
      this.a.interface = this.f.interface(this.b.interface);
      return;
    }else if(val===inactive){
      this.a.interface = inactive;
      return;
    } else {
      throw new Error('Invalid value');
      return;
    }
  }
  get interface() {
    throw new Error('Trying to read from an input');
  }
}

class State {
  constructor(a,b) {
    this.a = a;
    this.b = b;
    this.state = inactive;
  }
  set interface(val) {
    if(val===active) {
      this.a.interface = this.state;
      this.state = this.b.interface;
      return;
    }else if(val===inactive){
      this.a.interface = inactive;
      return;
    } else {
      throw new Error('Invalid value');
      return;
    }
  }
  get interface() {
    throw new Error('Trying to read from an input');
  }
}

class Literal {
  constructor(a) {
    this.value = a;
  }
  get interface() {
    return this.value;
  }
  set interface(val){
    throw new Error('Trying to write to an output');
  }
}

class Sink {
  constructor(a) {
    this.name = a;
  }
  set interface(val) {
    console.log(val);
  }
  get interface() {
    throw new Error('Trying to read from an input');
  }
}


// let a = new Affectation(new Sink(), new Literal(5));
let a = new Application(new Sink(), new Literal(Math.cos) ,new Literal(5));
a.interface = active;
a.interface = active;
a.interface = inactive;
a.interface = active;

console.log("ok");
