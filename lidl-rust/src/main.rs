#[allow(dead_code)]
#[allow(unused_imports)]

use std::fmt::Debug;
use std::marker::PhantomData;

#[derive(Debug,Copy, Clone)]
enum Activation {Active}

// impl<T:Display> Display for Option<T> {
//     fn fmt(&self, f: &mut Formatter) -> Result {
//         write!(f, "active")
//     }
// }

// Define interfaces
trait Out<T> {
    fn get(&self) -> &T;
}
trait In<T> {
    fn set(&self,&T);
}
trait Construction<T>: Out<T> {}
trait Destruction<T>: In<T> {}
trait Mutation<T> {
    fn before_set(&self, &T);
    fn after_get(&self) -> &T;
}
trait Comparison<T> {
    fn value_set(&self, &T);
    fn result_get(&self) -> &bool;
}


// Define interactions



// Source
// Interaction
struct Source<T> {
    value : T
}
// Interface
impl<T> Out<T> for Source<T> {
    fn get(&self)-> &T{
        &self.value
    }
}



// Sink
// Interaction
struct Sink<T> {
    name : &'static str,
    value : PhantomData<T>
}
// Interface
impl<T:Debug> In<T> for Sink<T> {
    fn set(&self, val: &T){
        println!("{}: {:?}",&self.name,val );
    }
}



// Affect
// Interaction
struct Affect<T, U: In<T>, V:Out<T>> {
    a:  U,
    b:  V,
    value: PhantomData<T>
}
// Interface
impl <T:Copy, U: In<T>, V:Out<T>> In<Option<Activation>> for Affect<T,U,V>{
    fn set(&self, val: &Option<Activation>){
        match *val {
            Some(Activation::Active) => {self.a.set(self.b.get())},
            None => {}
        }
    }
}



// Apply
// Interaction
struct Apply<S,T, U: In<S>, V:Out<T>, W:?Sized > where W:Out< Fn(T)->S> {
    y:  U,
    f:  W,
    x:  V,
    valuex: PhantomData<S>,
    valuey: PhantomData<T>
}
// // Interface
// impl <S:Copy, T:Copy, U: In<S>, V:Out<T>, W:Out<Fn(V)->U>> In<Option<Activation>> for Apply<S,T,U,V,W>{
//     fn set(&self, val: &Option<Activation>){
//         match *val {
//             Some(Activation::Active) => {self.y.set(self.f.get()(self.x.get()))},
//             None => {}
//         }
//     }
// }





// All
// Interaction
struct All<T> {
    a:  T,
    b:  T
}
// Interface
impl<U,T:In<U>> In<U> for All<T> {
    fn set(&self, val: &U){
        self.a.set(val);
        self.b.set(val);
    }
}









// value: Activable<Void>

fn main() {
    use Activation::*;

    println!("{}",Source{value:"Joe"}.get());

    Sink{name:"foo",value:PhantomData}.set(&8);

    All{a:Sink{name:"bar",value:PhantomData},b:Sink{name:"baz",value:PhantomData}}.set(&10);

    Affect{a:Sink{name:"qux",value:PhantomData},b:Source{value:&32},value:PhantomData}.set(&Some(Active));

    Affect{a:Sink{name:"quux",value:PhantomData},b:Source{value:&32},value:PhantomData}.set(&None);

}
