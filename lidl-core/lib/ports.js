"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.




mergePortList = mergePortList;exports.













































portIsOnlyMadeOf = portIsOnlyMadeOf;exports.





















conjugatePort = conjugatePort;exports.






















portIsDefined = portIsDefined;var _lodash = require("lodash");var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //TODO Interfaces instead of ports
function mergePortList(x, y) {if (_lodash2.default.isArray(x)) {if (_lodash2.default.isArray(y)) {var i = 0;var res = [];for (i = 0; i < Math.max(x.length, y.length); i++) {res[i] = mergePortList(x[i], y[i]);}return res;} else if (_lodash2.default.isString(y)) {// reduce interface to data type
      if (portIsOnlyMadeOf(x, y)) return y;} else if (_lodash2.default.isUndefined(y)) {return _lodash2.default.clone(x);} else {throw new Error("PortLists should be strings or arrays of strings");}} else if (_lodash2.default.isString(x)) {if (_lodash2.default.isArray(y)) {// reduce interface to data type
      if (portIsOnlyMadeOf(y, x)) return x;} else if (_lodash2.default.isString(y)) {if (x === y) return x;else throw new Error("Trying to merge incompatible ports " + x + " and " + y);} else if (_lodash2.default.isUndefined(y)) {return x;} else {throw new Error("PortLists should be strings or arrays of strings");}} else if (_lodash2.default.isUndefined(x)) {if (_lodash2.default.isArray(y)) {return _lodash2.default.clone(y);} else if (_lodash2.default.isString(y)) {return y;throw new Error("Trying to merge incompatible ports " + x + " and " + y);} else if (_lodash2.default.isUndefined(y)) {return;} else {throw new Error("PortLists should be strings or arrays of strings");}} else {throw new Error("PortLists should be strings or arrays of strings");}} // Check if ports like x = ['in','in'] are compatible with s ='in'
function portIsOnlyMadeOf(x, s) {if (_lodash2.default.isArray(x)) {var i = 0;var res = true;for (i = 0; i < x.length; i++) {res = res && portIsOnlyMadeOf(x[i], s);}return res;} else if (_lodash2.default.isString(x)) {if (x === s) {return true;} else {return false;}} else if (_lodash2.default.isUndefined(x)) {return false;} else {throw new Error("Port should be arrays of strings or strings");}} // ['in','out','out'] -> ['out','in','in']
function conjugatePort(x) {if (_lodash2.default.isArray(x)) {var i = 0;var res = [];for (i = 0; i < x.length; i++) {res[i] = conjugatePort(x[i]);}return res;} else if (_lodash2.default.isString(x)) {if (x === 'in') {return 'out';} else if (x === 'out') {return 'in';} else {throw new Error("Port should be in our out or arrays of in and out");}} else if (_lodash2.default.isUndefined(x)) {return undefined;} else {throw new Error("Port should be arrays of strings or strings");}}function portIsDefined(x) {if (_lodash2.default.isNull(x) || _lodash2.default.isUndefined(x)) {return false;} else {return true;};}