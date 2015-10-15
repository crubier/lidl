

// import Parallel  from 'paralleljs';

function distance(a,b){
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function sum(a,b) {
  return {x:a.x+b.x,y:a.y+b.y};
}

function difference(a,b) {
  return {x:a.x-b.x,y:a.y-b.y};
}

function mult(a,b) {
  return {x:a.x*b,y:a.y*b};
}

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
  edges=[];
  physics={spring:1,charge:1,mass:1,dt:0.1};

  constructor(options) {
      this.nodes = options.nodes;
      this.edges = options.edges;
      this.init();
    }

  init() {
    this.nodes = this.nodes.map((x,n)=>(Object.assign(x, {
    physics:{
      position:{x:initA*Math.sqrt(n+initB)*Math.cos(initC*Math.sqrt(n+initB)),y:initA*Math.sqrt(n+initB)*Math.sin(initC*Math.sqrt(n+initB))},
      velocity:{x:0,y:0},
      acceleration:{x:0,y:0}
    }})));
  }

  step(){
    for (let i=0;i<this.nodes.length;i++) {
      this.nodes[i].velocity={x:0,y:0};
      for (let j=0;j<i;j++) {
        let dist = distance(this.nodes[i].position,this.nodes[j].position);
        let force = this.physics.charge / (dist * dist * dist);
        let rel = difference(this.nodes[i].position,this.nodes[j].position);
        this.nodes[i].velocity = sum(this.nodes[i].velocity,mult(rel,force));
        this.nodes[j].velocity = sum(this.nodes[j].velocity,mult(rel,-force));
      }
    }
    for (let k=0;k<this.edges.length;k++) {
        let i = this.edges[k].from;
        let j = this.edges[k].to;
        let dist = distance(this.nodes[i].position,this.nodes[j].position);
        let force = this.physics.spring;
        let rel = difference(this.nodes[i].position,this.nodes[j].position);
        this.nodes[i].velocity = sum(this.nodes[i].velocity,mult(rel,-force));
        this.nodes[j].velocity = sum(this.nodes[j].velocity,mult(rel,force));
    }
    for (let i=0;i<this.nodes.length;i++) {
      this.nodes[i].position = sum(mult(this.nodes[j].velocity,this.physics.dt),this.nodes[j].position);
    }
  }

}
