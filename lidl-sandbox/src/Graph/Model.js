// import Parallel  from 'paralleljs';

import glMatrix from 'gl-matrix';

// glMatrix.setMatrixArrayType(Float64Array);

const vec2 = glMatrix.vec2;

// var p = new Parallel('forwards');
//
// // Spawn a remote job (we'll see more on how to use then later)
// p.spawn(function (data) {
//   data = data.split('').reverse().join('');
//   return data;
// }).then(function (data) {
//   console.log(data) // logs sdrawrof
// });

const initA = 100;
const initB = 0.5;
const initC = 3.672295;
export default class Model {

  nodes = [];
  edges = [];
  physics = {
    spring: 1,
    charge: 400000,
    mass: 1,
    friction1: 0,
    friction0: 2,
    center: 0.01,
    dt: 30/(60.0),
    targetVelocity: 50,
    state: {}
  };

  constructor(options) {
    this.nodes = options.nodes;
    this.edges = options.edges;
    this.init();
  }

  init() {

    let ini = (theNodes) => ({
      position: theNodes.map(vec2.create),
      velocity: theNodes.map(vec2.create)
      // acceleration: theNodes.map(vec2.create)
    });

    this.physics.state = {
      current: ini(this.nodes),
      k1: ini(this.nodes),
      v2: ini(this.nodes),
      k2: ini(this.nodes),
      v3: ini(this.nodes),
      k3: ini(this.nodes),
      v4: ini(this.nodes),
      k4: ini(this.nodes),
      sk: ini(this.nodes),
      t:0
    };

    this.physics.state.current.position.map((x, n) => (vec2.set(x,
        initA * Math.sqrt(n + initB) * Math.cos(initC * Math.sqrt(n + initB)),
        initA * Math.sqrt(n + initB) * Math.sin(initC * Math.sqrt(n + initB))
      )));

  }

  // Runge Kutta 4
  f(yprime, y, t) {


    // Charge
    let dist = 0;
    let force = 0;
    let rel = vec2.create();
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.set(yprime.velocity[i],0.0,0.0);
      for (let j = 0; j < i; j++) {
        dist = vec2.distance(y.position[i],y.position[j]);
        force = this.physics.charge / (dist * dist);
        vec2.subtract(rel,y.position[i], y.position[j]);
        vec2.normalize(rel,rel);
        vec2.scaleAndAdd(yprime.velocity[i],yprime.velocity[i],rel,force);
        vec2.scaleAndAdd(yprime.velocity[j],yprime.velocity[j],rel,-force);
      }
    }

    // // Spring
    for (let k = 0; k < this.edges.length; k++) {
      let i = this.edges[k].from;
      let j = this.edges[k].to;
      if (i !== j) {
        force = this.physics.spring;
        vec2.subtract(rel,y.position[i], y.position[j]);
        vec2.scaleAndAdd(yprime.velocity[i],yprime.velocity[i],rel,-force);
        vec2.scaleAndAdd(yprime.velocity[j],yprime.velocity[j],rel,force);
      }
    }

    // Centripetal
    let centralAttractor = vec2.create(0,0);
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.subtract(rel,y.position[i], centralAttractor);
      force = this.physics.center;
      vec2.scaleAndAdd(yprime.velocity[i],yprime.velocity[i],rel,-force);
    }

    // Friction
    for (let i = 0; i < this.nodes.length; i++) {
      force = this.physics.friction0 + this.physics.friction1 * vec2.length(y.velocity[i]);
      vec2.scaleAndAdd(yprime.velocity[i],yprime.velocity[i],y.velocity[i],-force);
    }

    // Mass
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.scale(yprime.velocity[i],yprime.velocity[i],1.0/(this.physics.mass));
    }

    // Derivatives
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.copy(yprime.position[i],y.velocity[i]);
    }

  }

  integrate(ynplus1, yn, yprime, dt) {
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.scaleAndAdd(ynplus1.position[i], yn.position[i], yprime.position[i], dt);
      vec2.scaleAndAdd(ynplus1.velocity[i], yn.velocity[i], yprime.velocity[i], dt);
    }
  }

  sumofks(sk, k1, k2, k3, k4) {
    for (let i = 0; i < this.nodes.length; i++) {
      vec2.copy(sk.position[i], k1.position[i]);
      vec2.scaleAndAdd(sk.position[i], sk.position[i], k2.position[i], 2);
      vec2.scaleAndAdd(sk.position[i], sk.position[i], k3.position[i], 2);
      vec2.add(sk.position[i], sk.position[i], k4.position[i]);
      vec2.copy(sk.velocity[i], k1.velocity[i]);
      vec2.scaleAndAdd(sk.velocity[i], sk.velocity[i], k2.velocity[i], 2);
      vec2.scaleAndAdd(sk.velocity[i], sk.velocity[i], k3.velocity[i], 2);
      vec2.add(sk.velocity[i], sk.velocity[i], k4.velocity[i]);
    }
  }

  rk4(ynplus1, yn, sk, k1, v2, k2, v3, k3, v4, k4, dt, tn) {
    this.f(k1, yn, tn);
    this.integrate(v2, yn, k1, dt / 2.);
    this.f(k2, v2, tn + dt / 2.);
    this.integrate(v3, yn, k2, dt / 2.);
    this.f(k3, v3, tn + dt / 2.);
    this.integrate(v4, yn, k3, dt);
    this.f(k4, v4, tn + dt);
    this.sumofks(sk, k1, k2, k3, k4);
    this.integrate(ynplus1, yn, sk, dt / 6.);
  }


  step() {
    this.rk4(
      this.physics.state.current,
      this.physics.state.current,
      this.physics.state.sk,
      this.physics.state.k1,
      this.physics.state.v2,
      this.physics.state.k2,
      this.physics.state.v3,
      this.physics.state.k3,
      this.physics.state.v4,
      this.physics.state.k4,
      this.physics.dt,
      this.physics.state.t
    );

    this.physics.state.t = this.physics.state.t+this.physics.dt;

    // let max = 0.1;
    // for (let i = 0; i < this.nodes.length; i++) {
    //   max = Math.max(max, vec2.length(this.physics.state.current.velocity[i]));
    // }
    // // let newDt=(this.physics.targetVelocity)/(Math.max(max,this.physics.targetVelocity));
    // // let dtAdjustTau = 100;
    // // this.physics.dt = this.physics.dt*(1-(1)/(dtAdjustTau))+newDt*((1)/(dtAdjustTau));
    // if(max<5) {
    //   // console.log("Layoutcomplete");
    //   return true;
    // } else {
    //   // console.log(this.physics.dt + " "+ max);
    // }
  }

}
