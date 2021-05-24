'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
































isInterface = isInterface;exports.














isDirection = isDirection;exports.







oppositeDirection = oppositeDirection;exports.










isAtomic = isAtomic;exports.





isComposite = isComposite;exports.




isUndefined = isUndefined;exports.



clone = clone;exports.



compareInterface = compareInterface;exports.





conjugateInterface = conjugateInterface;exports.
























receptionInterface = receptionInterface;exports.
























emissionInterface = emissionInterface;exports.

























globalisationInterface = globalisationInterface;exports.








































transformDataTypeIntoInterface = transformDataTypeIntoInterface;exports.
























localisationInterface = localisationInterface;exports.





















listOfAtoms = listOfAtoms;exports.





















toOperator = toOperator;exports.












madeOnlyOf = madeOnlyOf;exports.



















isCompatible = isCompatible;exports.

















































subInterface = subInterface;exports.





mergeInterface = mergeInterface;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _data = require('./data.js');var _serializer = require('./serializer');var _extendableError = require('./extendableError');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // now I can extend
// class ExtendableError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = this.constructor.name;
//     this.message = message;
//     Error.captureStackTrace(this, this.constructor.name)
//   }
// }
var InvalidInterfaceError = function (_ExtendableError) {_inherits(InvalidInterfaceError, _ExtendableError);function InvalidInterfaceError(m) {_classCallCheck(this, InvalidInterfaceError);return _possibleConstructorReturn(this, (InvalidInterfaceError.__proto__ || Object.getPrototypeOf(InvalidInterfaceError)).call(this, m));}return InvalidInterfaceError;}(_extendableError.ExtendableError);var IncompatibleInterfaceError = function (_ExtendableError2) {_inherits(IncompatibleInterfaceError, _ExtendableError2);function IncompatibleInterfaceError(m) {_classCallCheck(this, IncompatibleInterfaceError);return _possibleConstructorReturn(this, (IncompatibleInterfaceError.__proto__ || Object.getPrototypeOf(IncompatibleInterfaceError)).call(this, m));}return IncompatibleInterfaceError;}(_extendableError.ExtendableError);function isInterface(obj) {if (obj.type) {switch (obj.type) {case "InterfaceAtomic":case "InterfaceComposite":return true;default:return false;}} else {return false;}}; // Directions
function isDirection(obj) {if (obj === "in" || obj === "out") {return true;} else {return false;}};function oppositeDirection(direction) {switch (direction) {case "in":return "out";case "out":return "in";default:throw "Trying to find the opposite of an invalid direction (in or out)";}};function isAtomic(inter) {if (_lodash2.default.isUndefined(inter)) return false;return inter.type === 'InterfaceAtomic';}function isComposite(inter) {if (_lodash2.default.isUndefined(inter)) return false;return inter.type === 'InterfaceComposite';}function isUndefined(inter) {return inter === undefined || inter === null;}function clone(inter) {return _lodash2.default.clone(inter);}function compareInterface(interface1, interface2) {}; // Interface operations
function conjugateInterface(theInterface) {if (_lodash2.default.isUndefined(theInterface)) return undefined;switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: oppositeDirection(theInterface.direction) };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: conjugateInterface(field.value) };}) };default:throw new Error("Trying to get the conjugation of something which is not an interface: " + (0, _serializer.serialize)(theInterface));}};function receptionInterface(theInterface) {if (_lodash2.default.isUndefined(theInterface)) return undefined;switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: "in" };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: receptionInterface(field.value) };}) };default:throw "Trying to get the reception of something which is not an interface";}};function emissionInterface(theInterface) {if (_lodash2.default.isUndefined(theInterface)) return undefined;switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: "out" };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: emissionInterface(field.value) };}) };default:throw "Trying to get the emission of something which is not an interface";}}; //TODO
function globalisationInterface(theInterface) {if (_lodash2.default.isUndefined(theInterface)) return undefined;switch (theInterface.type) {case "InterfaceAtomic":return theInterface;case "InterfaceComposite":var madeOf = madeOnlyOf(theInterface);if (madeOf === undefined) {return { type: "InterfaceComposite", element: (0, _lodash2.default)(theInterface.element).map(function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: globalisationInterface(field.value) };}).value() };} else {return { type: "InterfaceAtomic", direction: madeOf, data: { type: "DataComposite", element: (0, _lodash2.default)(theInterface.element).map(function (field) {return { type: 'DataCompositeElement', key: field.key, value: globalisationInterface(field.value).data };}).value() } };}default:throw "Trying to get the globalisation of something which is not an interface: " + theInterface;}};function transformDataTypeIntoInterface(data, direction) {if (_lodash2.default.isUndefined(data)) return undefined;switch (data.type) {case 'DataComposite':return { type: "InterfaceComposite", element: (0, _lodash2.default)(data.element).map(function (x) {return { type: "InterfaceCompositeElement", key: x.key, value: transformDataTypeIntoInterface(x.value, direction) };}).value() };break;default:return { type: "InterfaceAtomic", data: data, direction: direction };}}function localisationInterface(theInterface) {if (_lodash2.default.isUndefined(theInterface)) return undefined;switch (theInterface.type) {case "InterfaceAtomic":return transformDataTypeIntoInterface(theInterface.data, theInterface.direction);case "InterfaceComposite":return { type: 'InterfaceComposite', element: (0, _lodash2.default)(theInterface.element).map(function (x) {return _lodash2.default.assign(_lodash2.default.clone(x), { value: localisationInterface(x.value) });}).value() };default:throw "Trying to get the localisation of something which is not an interface: " + theInterface;}};function listOfAtoms(theInterface, prefix) {switch (theInterface.type) {case "InterfaceAtomic":return [{ name: prefix, data: theInterface.data, direction: theInterface.direction }];case "InterfaceComposite":var res = [];var i = 0; // TODO Clean that, make it functional
      for (i = 0; i < theInterface.element.length; i++) {res = _lodash2.default.union(res, listOfAtoms(theInterface.element[i].value, prefix + "." + theInterface.element[i].key));}return res;default:throw "Trying to get the list of atomic interfaces of something which is not an interface";}} // Transforms the interface into an operator for an interaction
function toOperator(theInterface) {switch (theInterface.type) {case "InterfaceComposite":return '{' + _lodash2.default.reduce(_lodash2.default.map(theInterface.element, 'key'), function (total, value, index) {return total + value + ':$';}, "") + '}';case "InterfaceAtomic":default:throw "Trying to get the operator of something which is not a composite interface";}} // returns 'in' if the interface is only made of inputs, 'out' if only made of outputs and undefined if it is a mixed interface
function madeOnlyOf(inter) {if (_lodash2.default.isUndefined(inter)) return undefined;switch (inter.type) {case "InterfaceComposite":var res = (0, _lodash2.default)(inter.element).map(function (comp) {return madeOnlyOf(comp.value);}).uniq().value();if (res.length > 1) {return undefined;} else {return res[0];}case "InterfaceAtomic":return inter.direction;default:throw "Trying to get the madeOnlyOf of something which is not an interface: " + inter.type;}}function isCompatible(int1, int2) {if (_lodash2.default.isUndefined(int1)) return true;if (_lodash2.default.isUndefined(int2)) return true;console.log("Is compatible");var i1 = localisationInterface(int1);var i2 = localisationInterface(int2);var res;switch (i1.type) {case "InterfaceAtomic":{switch (i2.type) {case "InterfaceAtomic":res = (0, _data.compareData)(i1.data, i2.data) && i1.direction === oppositeDirection(i2.direction);break;case "InterfaceComposite":res = false;break;default:throw "Trying to get the compatibility of something which is not an interface: " + i2.type;}}break;case "InterfaceComposite":{switch (i2.type) {case "InterfaceAtomic":res = false;break;case "InterfaceComposite":res = (0, _lodash2.default)(i1.element).every(function (op1) {var op2 = (0, _lodash2.default)(i2.element).find(function (op2) {return op2.key === op1.key;});if (op2 === undefined) {return true;} else {return isCompatible(op1.value, op2.value);}});break;default:throw "Trying to get the compatibility of something which is not an interface: " + i2.type;}}break;default:throw "Trying to get the compatibility of something which is not an interface: " + i1.type;}return res;}function subInterface(interfac, elementName) {console.log("subInterface");return (0, _lodash2.default)(localisationInterface(interfac).element).find(function (x) {return x.key === elementName;}).value;} // Merge the definitions of two interface in order to make a more complete one if it is possible. If no reconciliation is possible it throws
function mergeInterface(x, y) {// console.log("merge");
  // console.log(x);
  // console.log(y);
  if (isCompatible(x, conjugateInterface(y))) {if (isComposite(x)) {if (isComposite(y)) {return { type: 'InterfaceComposite', element: (0, _lodash2.default)(x.element).concat(y.element).groupBy('key').map(function (el, key) {return _lodash2.default.size(el) > 1 ? { type: 'InterfaceCompositeElement', key: key, value: mergeInterface(el[0].value, el[1].value) } : { type: 'InterfaceCompositeElement', key: key, value: el[0].value };}).

          values().
          value() };

      } else if (isAtomic(y)) {
        return mergeInterface(x, transformDataTypeIntoInterface(y.data, y.direction));
      } else if (isUndefined(y)) {
        return x;
      } else {
        throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + (0, _serializer.serialize)(y));
      }
    } else if (isAtomic(x)) {
      if (isComposite(y)) {
        return mergeInterface(transformDataTypeIntoInterface(x.data, x.direction), y);
      } else if (isAtomic(y)) {
        return x; // or y, they should be equal in this case
      } else if (isUndefined(y)) {
        return x;
      } else {
        throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + (0, _serializer.serialize)(y));
      }
    } else if (isUndefined(x)) {
      if (isComposite(y)) {
        return y;
      } else if (isAtomic(y)) {
        return y;
      } else if (isUndefined(y)) {
        return undefined;
      } else {
        throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + (0, _serializer.serialize)(y));
      }
    } else {
      throw new InvalidInterfaceError('Trying to merge with something which is not an interface: ' + (0, _serializer.serialize)(x));
    }
  } else {
    throw new IncompatibleInterfaceError('Trying to merge incompatible interfaces: ' + (0, _serializer.serialize)(x) + ' and ' + (0, _serializer.serialize)(y));
  }

}