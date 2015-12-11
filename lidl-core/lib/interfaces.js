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







































localisationInterface = localisationInterface;exports.











































listOfAtoms = listOfAtoms;exports.





















toOperator = toOperator;exports.












madeOnlyOf = madeOnlyOf;exports.


















isCompatible = isCompatible;exports.














































mergeInterface = mergeInterface;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _data = require('./data.js');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function isInterface(obj) {if (obj.type) {switch (obj.type) {case "InterfaceAtomic":case "InterfaceComposite":return true;default:return false;}} else {return false;}}; // Directions
function isDirection(obj) {if (obj === "in" || obj === "out") {return true;} else {return false;}};function oppositeDirection(direction) {switch (direction) {case "in":return "out";case "out":return "in";default:throw "Trying to find the opposite of an invalid direction (in or out)";}};function isAtomic(inter) {return inter.type === 'InterfaceAtomic';}function isComposite(inter) {return inter.type === 'InterfaceComposite';}function isUndefined(inter) {return inter === undefined || inter === null;}function clone(inter) {return _lodash2.default.clone(inter);}function compareInterface(interface1, interface2) {}; // Interface operations
function conjugateInterface(theInterface) {switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: oppositeDirection(theInterface.direction) };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: conjugateInterface(field.value) };}) };default:throw "Trying to get the conjugation of something which is not an interface";}};function receptionInterface(theInterface) {switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: "in" };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: receptionInterface(field.value) };}) };default:throw "Trying to get the reception of something which is not an interface";}};function emissionInterface(theInterface) {switch (theInterface.type) {case "InterfaceAtomic":return { type: "InterfaceAtomic", data: theInterface.data, direction: "out" };case "InterfaceComposite":return { type: "InterfaceComposite", element: _lodash2.default.map(theInterface.element, function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: emissionInterface(field.value) };}) };default:throw "Trying to get the emission of something which is not an interface";}}; //TODO
function globalisationInterface(theInterface) {switch (theInterface.type) {case "InterfaceAtomic":return theInterface;case "InterfaceComposite":var madeOf = madeOnlyOf(theInterface);if (madeOf === undefined) {return { type: "InterfaceComposite", element: (0, _lodash2.default)(theInterface.element).map(function (field) {return { type: "InterfaceCompositeElement", key: field.key, value: globalisationInterface(field.value) };}).value() };} else {return { type: "InterfaceAtomic", direction: madeOf, data: { type: "DataComposite", element: (0, _lodash2.default)(theInterface.element).map(function (field) {return { type: 'DataCompositeElement', key: field.key, value: globalisationInterface(field.value) };}).value() } };}default:throw "Trying to get the globalisation of something which is not an interface";}};function localisationInterface(theInterface) {function transformDataTypeIntoInterface(data, direction) {switch (data.type) {case 'DataComposite':return { type: "InterfaceComposite", element: (0, _lodash2.default)(data.element).map(function (x) {return { type: "InterfaceCompositeElement", key: x.key, value: transformDataTypeIntoInterface(x.value, direction) };}).value() };break;default:return { type: "InterfaceAtomic", data: data, direction: direction };}}switch (theInterface.type) {case "InterfaceAtomic":return transformDataTypeIntoInterface(theInterface.data, theInterface.direction);case "InterfaceComposite":return { type: 'InterfaceComposite', element: (0, _lodash2.default)(theInterface.element).map(function (x) {return _lodash2.default.assign(_lodash2.default.clone(x), { value: localisationInterface(x.value) });}).value() };default:throw "Trying to get the globalisation of something which is not an interface";}};function listOfAtoms(theInterface, prefix) {switch (theInterface.type) {case "InterfaceAtomic":return [{ name: prefix, data: theInterface.data, direction: theInterface.direction }];case "InterfaceComposite":var res = [];var i = 0; // TODO Clean that, make it functional
      for (i = 0; i < theInterface.element.length; i++) {res = _lodash2.default.union(res, listOfAtoms(theInterface.element[i].value, prefix + "." + theInterface.element[i].key));}return res;default:throw "Trying to get the list of atomic interfaces of something which is not an interface";}} // Transforms the interface into an operator for an interaction
function toOperator(theInterface) {switch (theInterface.type) {case "InterfaceComposite":return '{' + _lodash2.default.reduce(_lodash2.default.map(theInterface.element, 'key'), function (total, value, index) {return total + value + ':$';}, "") + '}';case "InterfaceAtomic":default:throw "Trying to get the operator of something which is not a composite interface";}} // returns 'in' if the interface is only made of inputs, 'out' if only made of outputs and undefined if it is a mixed interface
function madeOnlyOf(inter) {switch (inter.type) {case "InterfaceComposite":var res = (0, _lodash2.default)(inter.element).map(function (comp) {return madeOnlyOf(comp.value);}).uniq().value();if (res.length > 1) {return;} else {return res[0];}case "InterfaceAtomic":return inter.direction;default:throw "Trying to get the madeOnlyOf of something which is not an interface: " + inter.type;}}function isCompatible(int1, int2) {var i1 = localisationInterface(int1);var i2 = localisationInterface(int2);var res;switch (i1.type) {case "InterfaceAtomic":{switch (i2.type) {case "InterfaceAtomic":res = (0, _data.compareData)(i1.data, i2.data) && i1.direction === oppositeDirection(i2.direction);break;case "InterfaceComposite":res = false;break;default:throw "Trying to get the compatibility of something which is not an interface: " + i2.type;}}break;case "InterfaceComposite":{switch (i2.type) {case "InterfaceAtomic":res = false;break;case "InterfaceComposite":res = (0, _lodash2.default)(i1.element).every(function (op1) {var op2 = (0, _lodash2.default)(i2.element).find(function (op2) {return op2.key === op1.key;});if (op2 === undefined) {return true;} else {return isCompatible(op1.value, op2.value);}});break;default:throw "Trying to get the compatibility of something which is not an interface: " + i2.type;}}break;default:throw "Trying to get the compatibility of something which is not an interface: " + i1.type;}return res;}function mergeInterface(x, y) {console.log("merge");console.log(x);console.log(y);if (isComposite(x)) {if (isComposite(y)) {var i = 0;
      var res = [];
      for (i = 0; i < Math.max(x.length, y.length); i++) {
        res[i] = mergePortList(x[i], y[i]);}

      return res;} else 
    if (isAtomic(y)) {
      // reduce interface to data type
      if (isCompatible(x, conjugateInterface(y))) return y;} else 
    if (isUndefined(y)) {
      return clone(x);} else 
    {
      throw new Error("PortLists should be strings or arrays of strings");}} else 

  if (isAtomic(x)) {
    if (isComposite(y)) {
      // reduce interface to data type
      if (isCompatible(x, conjugateInterface(y))) return x;} else 
    if (isAtomic(y)) {
      if ((0, _data.compareData)(x.data, y.data)) return x;else 
      throw new Error("Trying to merge incompatible ports " + x + " and " + y);} else 
    if (isUndefined(y)) {
      return clone(x);} else 
    {
      throw new Error("PortLists should be strings or arrays of strings");}} else 

  if (isUndefined(x)) {
    if (isComposite(y)) {
      return clone(y);} else 
    if (isAtomic(y)) {
      return clone(y);
      throw new Error("Trying to merge incompatible ports " + x + " and " + y);} else 
    if (isUndefined(y)) {
      return;} else 
    {
      throw new Error("PortLists should be strings or arrays of strings");}} else 

  {
    throw new Error("PortLists should be strings or arrays of strings");}}