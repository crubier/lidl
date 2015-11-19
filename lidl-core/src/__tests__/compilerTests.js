jest.autoMockOff();
//
// var compiler = require('../compiler.js');
// var _ = require('lodash');
// var fs = require('fs');
//
//
// var glob = require("glob");
// glob("example/test/*.lidl", {nodir:true}, function (er, files) {
// console.log(files);
// })
//
// describe('iii', function() {
//
//
//
// function test(name){
//   var code = fs.readFileSync('example/test/'+name+'.lidl', {encoding: 'utf8'});
//   var header = fs.readFileSync('example/test/common.lidl.js', {encoding: 'utf8'});
// }
//
//
//   it('should preserve identity of nodes 4', function() {
//
//
//     // var code = "\
//     //   interaction (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out} is \
//     //   ( ({theNumber:(variable theNumber)theOther:(variable y)theResult:(variable theResult)theLast:(variable wow)}) with behaviour (apply(function cool) to ({0:(variable theNumber)1:(variable y)}) and get ({sum:(variable theResult)diff:(variable wow)}) ))\
//     //   "
//
// var code = fs.readFileSync('example/test.lidl', {encoding: 'utf8'});
// var header = fs.readFileSync('example/test.lidl.js', {encoding: 'utf8'});
//
//     var graph = compiler.compileToGraph(code);
//     fs.writeFileSync('/Users/vincent/Documents/test.dot', compiler.graphToDot(graph), {encoding: 'utf8'});
//
//     //
//     //
//
//     var res = compiler.compileToJs(code, header);
//     var trans = res.transitionFunction;
//     var init = res.initializationFunction;
//     var cur = init();
//     for (var i=0;i<10;i++){
//       cur.inter = {
//         theNumber: 50-3*i,
//         theOther: 30+i
//       };
//       cur = trans(cur);
//       console.log(cur);
//     }
//
//
//
//   });
//
// });
