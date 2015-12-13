import _ from 'lodash';
import {
  compareData
}
from './data.js';

import {serialize} from './serializer';


// now I can extend
import {ExtendableError} from './extendableError'

// class ExtendableError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = this.constructor.name;
//     this.message = message;
//     Error.captureStackTrace(this, this.constructor.name)
//   }
// }

class InvalidInterfaceError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

class IncompatibleInterfaceError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

export function isInterface(obj) {
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
export function isDirection(obj) {
  if (obj === "in" || obj === "out") {
    return true;
  } else {
    return false;
  }
};

export function oppositeDirection(direction) {
  switch (direction) {
    case "in":
      return "out";
    case "out":
      return "in";
    default:
      throw "Trying to find the opposite of an invalid direction (in or out)";
  }
};

export function isAtomic(inter) {
  if(_.isUndefined(inter))return false;
  return inter.type === 'InterfaceAtomic';
}


export function isComposite(inter) {
  if(_.isUndefined(inter))return false;
  return inter.type === 'InterfaceComposite';
}

export function isUndefined(inter) {
  return inter === undefined || inter === null;
}

export function clone(inter) {
  return _.clone(inter);
}

export function compareInterface(interface1, interface2) {

};


// Interface operations
export function conjugateInterface(theInterface) {
  if(_.isUndefined(theInterface))return undefined;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type: "InterfaceAtomic",
        data: theInterface.data,
        direction: oppositeDirection(theInterface.direction)
      };
    case "InterfaceComposite":
      return {
        type: "InterfaceComposite",
        element: _.map(theInterface.element, function(field) {
          return {
            type: "InterfaceCompositeElement",
            key: field.key,
            value: conjugateInterface(field.value)
          };
        })
      };
    default:
      throw new Error("Trying to get the conjugation of something which is not an interface: "+serialize(theInterface));
  }
};

export function receptionInterface(theInterface) {
if(_.isUndefined(theInterface))return undefined;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type: "InterfaceAtomic",
        data: theInterface.data,
        direction: "in"
      };
    case "InterfaceComposite":
      return {
        type: "InterfaceComposite",
        element: _.map(theInterface.element, function(field) {
          return {
            type: "InterfaceCompositeElement",
            key: field.key,
            value: receptionInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the reception of something which is not an interface";
  }
};

export function emissionInterface(theInterface) {
if(_.isUndefined(theInterface))return undefined;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type: "InterfaceAtomic",
        data: theInterface.data,
        direction: "out"
      };
    case "InterfaceComposite":
      return {
        type: "InterfaceComposite",
        element: _.map(theInterface.element, function(field) {
          return {
            type: "InterfaceCompositeElement",
            key: field.key,
            value: emissionInterface(field.value)
          };
        })
      };
    default:
      throw "Trying to get the emission of something which is not an interface";
  }
};

//TODO
export function globalisationInterface(theInterface) {
if(_.isUndefined(theInterface))return undefined;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return theInterface;
    case "InterfaceComposite":
      let madeOf = madeOnlyOf(theInterface);
      if (madeOf === undefined) {
        return {
          type: "InterfaceComposite",
          element: _(theInterface.element)
            .map((field) => {
              return {
                type: "InterfaceCompositeElement",
                key: field.key,
                value: globalisationInterface(field.value)
              }
            })
            .value()
        };
      } else {
        return {
          type: "InterfaceAtomic",
          direction: madeOf,
          data: {
            type: "DataComposite",
            element: _(theInterface.element)
              .map((field) => ({
                type: 'DataCompositeElement',
                key: field.key,
                value: globalisationInterface(field.value).data
              }))
              .value()
          }
        };
      }
    default:
      throw "Trying to get the globalisation of something which is not an interface";
  }
};

export function transformDataTypeIntoInterface(data, direction) {
if(_.isUndefined(data))return undefined;
  switch (data.type) {
    case 'DataComposite':
      return {
        type: "InterfaceComposite",
        element: _(data.element)
          .map(x => ({
            type: "InterfaceCompositeElement",
            key: x.key,
            value: transformDataTypeIntoInterface(x.value, direction)
          }))
          .value()
      };

      break;
    default:
      return {
        type: "InterfaceAtomic",
        data: data,
        direction: direction
      };
  }
}

export function localisationInterface(theInterface) {
if(_.isUndefined(theInterface))return undefined;


  switch (theInterface.type) {

    case "InterfaceAtomic":
      return transformDataTypeIntoInterface(theInterface.data, theInterface.direction);
    case "InterfaceComposite":
      return {
        type: 'InterfaceComposite',
        element: _(theInterface.element)
          .map(x => _.assign(_.clone(x), {
            value: localisationInterface(x.value)
          }))
          .value()
      };
    default:
      throw "Trying to get the globalisation of something which is not an interface";
  }
};

export function listOfAtoms(theInterface, prefix) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return [{
        name: prefix,
        data: theInterface.data,
        direction: theInterface.direction
      }];
    case "InterfaceComposite":
      var res = [];
      var i = 0;
      // TODO Clean that, make it functional
      for (i = 0; i < theInterface.element.length; i++) {
        res = _.union(res, listOfAtoms(theInterface.element[i].value, prefix + "." + theInterface.element[i].key));
      }
      return res;
    default:
      throw "Trying to get the list of atomic interfaces of something which is not an interface";
  }
}

// Transforms the interface into an operator for an interaction
export function toOperator(theInterface) {
  switch (theInterface.type) {
    case "InterfaceComposite":
      return '{' + _.reduce(_.map(theInterface.element, 'key'), function(total, value, index) {
        return total + value + ':$'
      }, "") + '}'
    case "InterfaceAtomic":
    default:
      throw "Trying to get the operator of something which is not a composite interface";
  }
}

// returns 'in' if the interface is only made of inputs, 'out' if only made of outputs and undefined if it is a mixed interface
export function madeOnlyOf(inter) {
if(_.isUndefined(inter))return undefined;
  switch (inter.type) {
    case "InterfaceComposite":
      let res = _(inter.element)
        .map(comp => (madeOnlyOf(comp.value)))
        .uniq()
        .value();
      if (res.length > 1) {
        return undefined;
      } else {
        return res[0];
      }
    case "InterfaceAtomic":
      return inter.direction;
    default:
      throw "Trying to get the madeOnlyOf of something which is not an interface: " + inter.type;
  }
}

export function isCompatible(int1, int2) {
  if(_.isUndefined(int1))return true;
  if(_.isUndefined(int2))return true;
  let i1 = localisationInterface(int1);
  let i2 = localisationInterface(int2);
  var res;
  switch (i1.type) {
    case "InterfaceAtomic":
      {
        switch (i2.type) {
          case "InterfaceAtomic":
            res = (compareData(i1.data, i2.data) && (i1.direction === oppositeDirection(i2.direction)));
            break;
          case "InterfaceComposite":
            res = false;
            break;
          default:
            throw "Trying to get the compatibility of something which is not an interface: " + i2.type;
        }
      }
      break;
    case "InterfaceComposite":
      {
        switch (i2.type) {
          case "InterfaceAtomic":
            res = false;
            break;
          case "InterfaceComposite":
            res = _(i1.element)
              .every(op1 => {
                let op2 = _(i2.element).find(op2 => op2.key === op1.key);
                if (op2 === undefined) {
                  return true;
                } else {
                  return isCompatible(op1.value, op2.value);
                }
              });
            break;
          default:
            throw "Trying to get the compatibility of something which is not an interface: " + i2.type;
        }
      }
      break;
    default:
      throw "Trying to get the compatibility of something which is not an interface: " + i1.type;
  }
  return res;
}

export function subInterface(interfac,elementName){
  return _(localisationInterface(interfac).element).find(x=>(x.key===elementName)).value;
}

// Merge the definitions of two interface in order to make a more complete one if it is possible. If no reconciliation is possible it throws
export function mergeInterface(x, y) {
  // console.log("merge");
  // console.log(x);
  // console.log(y);
  if (isCompatible(x, conjugateInterface(y))) {
      if (isComposite(x)) {
        if (isComposite(y)) {
          return {
            type: 'InterfaceComposite',
            element: _(x.element)
              .concat(y.element)
              .groupBy('key')
              .map((el, key) => (_.size(el) > 1 ? ({
                type: 'InterfaceCompositeElement',
                key: key,
                value: mergeInterface(el[0].value, el[1].value)
              }) : ({
                type: 'InterfaceCompositeElement',
                key: key,
                value: el[0].value
              })))
              .values()
              .value()
          };
        } else if (isAtomic(y)) {
          return mergeInterface(x,transformDataTypeIntoInterface(y.data,y.direction));
        } else if (isUndefined(y)) {
          return x;
        } else {
          throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + serialize(y));
        }
      } else if (isAtomic(x)) {
        if (isComposite(y)) {
          return mergeInterface(transformDataTypeIntoInterface(x.data,x.direction),y);
        } else if (isAtomic(y)) {
          return x; // or y, they should be equal in this case
        } else if (isUndefined(y)) {
          return x;
        } else {
          throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + serialize(y));
        }
      } else if (isUndefined(x)) {
        if (isComposite(y)) {
          return y;
        } else if (isAtomic(y)) {
          return y;
        } else if (isUndefined(y)) {
          return undefined;
        } else {
          throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + serialize(y));
        }
      } else {
        throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + serialize(x));
      }
    } else {
      throw new IncompatibleInterfaceError('Trying to merge incompatible interfaces: '+ serialize(x) + ' and '+serialize(y));
    }

  }
