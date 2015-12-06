"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.




simpleCompile = simpleCompile;var _graphCompiler = require('./graphCompiler');var _parser = require('./parser');var _parser2 = _interopRequireDefault(_parser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // A simple asynchronous compiler
function simpleCompile(lidl, header, callback) {var ast = _parser2.default.parse(lidl);
  (0, _graphCompiler.compile)(ast[0], header, { 
    getJsCode: function getJsCode(graph, data) {callback(data.source);return true;} });

  return;}