"use strict";
import {compile} from './graphCompiler'
import parser from './parser'

// A simple asynchronous compiler
export function simpleCompile(lidl,header,callback) {
  let ast = parser.parse(lidl);
  compile(ast[0],header,{
    getJsCode:function(graph,data){callback(data.source);return true;}
  });
  return;
}
