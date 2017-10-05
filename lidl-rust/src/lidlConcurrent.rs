#[allow(dead_code)]
#[allow(unused_imports)]

use std::fmt::Debug;
use std::marker::PhantomData;
use std::string::String;
use std::sync::mpsc::{Sender, Receiver};
use std::sync::mpsc;
use std::thread;


// Data

#[derive(Debug, Copy, Clone)]
enum Activation {
    Inactive,
    Active
}

#[derive(Debug, Copy, Clone)]
enum Boolean {
    Inactive,
    Active(bool)
}

#[derive(Debug, Copy, Clone)]
enum Number {
    Inactive,
    Active(f64)
}

#[derive(Debug, Clone)]
enum Text {
    Inactive,
    Active(String)
}


// // Interfaces
trait Interface {
    fn swap(&self) -> <T::Interface>;
}



struct In<T> {
    direct   : Receiver<T>,
    indirect : Sender<T>
}

impl<T> In<T> {
    pub fn new() -> In<T> {
        let (send, receive): (Sender<T>, Receiver<T>) = mpsc::channel();
        In {
            direct   : receive,
            indirect : send
        }
    }
}

struct Out<T> {
    direct   : Sender<T>,
    indirect : Receiver<T>
}

impl<T> Out<T> {
    pub fn new() -> Out<T> {
        let (send, receive): (Sender<T>, Receiver<T>) = mpsc::channel();
        In {
            direct   : send,
            indirect : receive
        }
    }
}


impl<T> Interface for In<T> {
    fn swap(&self) -> Interface {
        In {
            direct   : self.indirect,
            indirect : self.direct
        }
    }
}


impl<T> Interface for Out<T> {
    fn swap(&self) -> Interface {
        In {
            direct   : self.indirect,
            indirect : self.direct
        }
    }
}





// pub trait Foo {
//     type Bar;
//     type BarError;
//
//     fn bar(&self) -> Result<Self::Bar, Self::BarError>;
// }
//
// pub struct Thing;
//
// impl Foo for Thing {
//     type Bar = i32;
//     type BarError = ();
//
//     pub fn bar(&self) -> Result<i32, ()> {
//         Ok(78i32)
//     }
// }

//



fn main() {
    let a = In::<Number>::new();

}


//
// struct _withbehaviour_ <T> {
//
// }
