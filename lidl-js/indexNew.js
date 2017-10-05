#! /usr/bin/env node --harmony-async-await
// Need node 7

///////////////////////////////////////////////////////////////////////////////
// data
//   Boolean
// is
//   (true) | (false)
//
//
// Construction
//
// interaction
//   (true): Boolean out
const true_Boolean_out = ()=>{
  return () => (true);
}
// interaction
//   (false): Boolean out
const false_Boolean_out = ()=>{
  return () => (false);
}
//
//
// Comparison
//
// interaction
//   (is true): {value: Boolean in, result: Boolean out}
const istrue_value_Boolean_in_result_Boolean_out = ()=>{
  let temp;
  return {
    value: (value)=>(temp=value),
    result: ()=>(temp==true)
  };
}
// interaction
//   (is false): {value: Boolean in, result: Boolean out}
const isfalse_value_Boolean_in_result_Boolean_out = ()=>{
  let temp;
  return {
    value: (value)=>(temp=value),
    result: ()=>(temp==false)
  };
}
//
//
// Mutation
//
// interaction
//   (set to true): {before: Boolean in, after: Boolean out}
const settotrue_before_Boolean_in_after_Boolean_out = ()=>{
  return {
    value: (value)=>(null),
    result: ()=>(true)
  };
}
// interaction
//   (set to false): {before: Boolean in, after: Boolean out}
const settofalse_before_Boolean_in_after_Boolean_out = ()=>{
  return {
    value: (value)=>(null),
    result: ()=>(false)
  };
}
// interaction
//   (negate): {before: Boolean in, after: Boolean out}
const negate_before_Boolean_in_after_Boolean_out = ()=>{
  let temp;
  return {
    value: (value)=>(temp=value),
    result: ()=>(!temp)
  };
}
///////////////////////////////////////////////////////////////////////////////

// Base interactions
const affectation_Activation_in = (a,b)=>{
  return (value)=>{
    if(value){
      return a(b());
    }else{
      return null;
    }
  };
}

const mutate_Activation_in = (bef,mut,aft)=>{
  return (value)=>{
    if(value){
      let before = bef();
      mut.before(before);
      after = mut.after();
      aft(after);
      return null;
    }else{
      return null;
    }
  };
}

const print_Any_in = (a)=>{
  return (value)=>(console.log(a+": "+value));
}

async function bob(x){
  return 5;
}


///////////////////////////////////////////////////////////////////////////////
///////////
let main = affectation_Activation_in(print_Any_in("X"),true_Boolean_out())

main(true);

///////////
let a = istrue_value_Boolean_in_result_Boolean_out();
a.value(true);
console.log(a.result());
