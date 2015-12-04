import graphCompiler from './graphCompiler'
import parser from './parser'

// A simple asynchronous compiler
export function compile(lidl,header,callback) {
  let ast = parser.parse(lidl);
  graphCompiler.compile(ast,header,{
    getJsCode:function(graph,data){callback(data.code);}
  });
  return;
}
