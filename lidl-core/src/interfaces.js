var _ = require('lodash');

var isInterface = function(obj) {
  if (obj.type) {
    switch (obj.type) {
      case "InterfaceAtomic":
      case "InterfaceComposite":
        return true;
      default:
        return false;
    }
  } else {
    return false;
  }
};

// Directions
var isDirection = function(obj) {
  if(obj === "in" || obj === "out") {
    return true;
  } else {
    return false;
  }
};

var oppositeDirection = function(direction) {
  switch (direction) {
    case "in":
      return "out";
    case "out":
      return "in";
    default:
      throw "Trying to find the opposite of an invalid direction (in or out)";
  }
};

var compareInterface = function(interface1,interface2) {

};


// Interface operations
var conjugateInterface = function(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type:"InterfaceAtomic",
        datatype:theInterface.datatype,
        direction:oppositeDirection(theInterface.direction)
      };
    case "InterfaceComposite":
      return {
        type:"InterfaceComposite",
        component:_.map(theInterface.component, function(field){
          return {
            type:"InterfaceCompositeField",
            key:field.key,
            value: conjugateInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the conjugation of something which is not an interface";
  }
};

var receptionInterface = function(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type:"InterfaceAtomic",
        datatype:theInterface.datatype,
        direction:"in"
      };
    case "InterfaceComposite":
      return {
        type:"InterfaceComposite",
        component:_.map(theInterface.component, function(field){
          return {
            type:"InterfaceCompositeField",
            key:field.key,
            value: receptionInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the reception of something which is not an interface";
  }
};

var emissionInterface = function(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type:"InterfaceAtomic",
        datatype:theInterface.datatype,
        direction:"out"
      };
    case "InterfaceComposite":
      return {
        type:"InterfaceComposite",
        component:_.map(theInterface.component, function(field){
          return {
            type:"InterfaceCompositeField",
            key:field.key,
            value: emissionInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the emission of something which is not an interface";
  }
};

//TODO
var globalisationInterface = function(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return theInterface;
    case "InterfaceComposite":
      return {
        type:"InterfaceComposite",
        component:_.map(theInterface.component, function(field){
          return {
            type:"InterfaceCompositeField",
            key:field.key,
            value: emissionInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the globalisation of something which is not an interface";
  }
};

function listOfAtoms(theInterface,prefix) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return [{name:prefix,data:theInterface.data,direction:theInterface.direction}];
    case "InterfaceComposite":
      var res = [];
      var i = 0;
      // TODO Clean that, make it functional
      for(i=0;i<theInterface.element.length;i++){
        res = _.union(res,listOfAtoms(theInterface.element[i].value,prefix+"."+theInterface.element[i].key));
      }
      return res;
    default:
      throw "Trying to get the list of atomic interfaces of something which is not an interface";
  }
}



module.exports = {
  conjugate:conjugateInterface,
  listOfAtoms:listOfAtoms,
  receptionInterface:receptionInterface,
  emissionInterface:emissionInterface
};
