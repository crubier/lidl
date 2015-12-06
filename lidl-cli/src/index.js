#!/usr/bin/env node

"use strict"
import yargs from 'yargs'
import chalk from 'chalk'
import lidl from 'lidl-core'
import fs from 'fs'

console.log(chalk.blue('\nLidl Compiler'));

let argv = yargs
    .usage('Usage: $0 <command> [options]')

    .example('$0 -i foo.lidl -o foo.js', 'Compiles the given lidl file')
    .demand(['i','o'])

    .alias('i', 'input')
    .nargs('i', 1)
    .describe('i', 'Input Lidl file to compile')

    .alias('o', 'output')
    .nargs('o', 1)
    .describe('o', 'Output generated JS file ')

    .alias('h', 'header')
    // .nargs('h', 1)
    .describe('h', 'Header JS file to use in the generated JS File')

    .help('help')
    .epilog('copyright 2015')
    .argv;



  try {
    let inputFile = (argv.i);
    console.log('Compiling '+inputFile);
    let code = fs.readFileSync(inputFile,{encoding:'utf8'});

    let header = "";
    if (argv.h === undefined){
      console.log('Using default header file');
      header= lidl.examples.header;
    } else {
      console.log('Using header file '+argv.h);
      header = fs.readFileSync(argv.h,{encoding:'utf8'});
    }

    lidl.compiler.simpleCompile(code,header,(code)=>{
      fs.writeFileSync(argv.o,code,{encoding:'utf8'});
      console.log(chalk.green('Success !')+'\n');
    });
  } catch (e) {
    console.log(chalk.red('Error: '+e.message)+'\n');
  }
