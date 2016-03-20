#!/usr/bin/env node
"use strict";var _yargs = require('yargs');var _yargs2 = _interopRequireDefault(_yargs);var _chalk = require('chalk');var _chalk2 = _interopRequireDefault(_chalk);var _lidlCore = require('lidl-core');var _lidlCore2 = _interopRequireDefault(_lidlCore);var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}







console.log(_chalk2.default.blue('\nLidl Compiler'));

var argv = _yargs2.default.
usage('Usage: $0 <command> [options]').

example('$0 -i foo.lidl -o foo.js', 'Compiles the given lidl file').
demand(['i', 'o']).

alias('i', 'input').
nargs('i', 1).
describe('i', 'Input Lidl file to compile').

alias('o', 'output').
nargs('o', 1).
describe('o', 'Output generated JS file ').

alias('h', 'header')
// .nargs('h', 1)
.describe('h', 'Header JS file to use in the generated JS File').

help('help').
epilog('copyright 2015').
argv;



try {
  var inputFile = argv.i;
  console.log('Compiling ' + inputFile);
  var code = _fs2.default.readFileSync(inputFile, { encoding: 'utf8' });

  var header = "";
  if (argv.h === undefined) {
    console.log('Using default header file');
    header = _lidlCore2.default.examples.header;} else 
  {
    console.log('Using header file ' + argv.h);
    header = _fs2.default.readFileSync(argv.h, { encoding: 'utf8' });}


  _lidlCore2.default.compiler.simpleCompile(code, header, function (code) {
    _fs2.default.writeFileSync(argv.o, code, { encoding: 'utf8' });
    console.log(_chalk2.default.green('Success !') + '\n');});} 

catch (e) {
  console.log(_chalk2.default.red('Error: ' + e.message) + '\n');}