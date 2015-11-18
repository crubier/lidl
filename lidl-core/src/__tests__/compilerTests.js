jest.autoMockOff();

var compiler = require('../compiler.js');
var _ = require('lodash');
var fs = require('fs');

describe('iii', function() {
  xit('should work on example files', function() {
    _.forEach(
      compiler.compileToGraph("interaction  ((click:Activation in) happened (x:Number out) times):Activation inwith  interaction (1):Number out  is ((#1) in (js`o=1;`)(##)=(#1))  interaction ((a:Number in)+(b:Number in)):Number out  is ((#(a)+(b)) in (js`o=i.a+i.b;`)  ({a:(a)b:(b)})  =  (#(a)+(b)))  interaction (new(x:Number in)):Number out  is (#new(x))  interaction (when(a:Activation in)then(b:Activation out)):Activation in  is ((#when(a)then(b)) in (js`o=i.a.active&&i.b.active;`)({a:(#when(a)then(b))b:(a)})=(b))  interaction ((a:Number in) fallback to (b:Number in)):Number out  is ((# (a) fallback to (b)) in (js`o=a.active?a:b;`)({a:(a)b:(b)})=(# (a) fallback to (b)))  interaction ((a:Number out)=(b:Number in)):Activation in  is ((#(a)=(b)) in (js`o=i.a.active?i.b:{active:false};`)({a:(#(a)=(b))b:(b)})=(a))  interaction (make(x:Number in)flow):Activation in  is ( (x) = ((new(x)) fallback to (previous(x))) )  interaction (all(a:Activation out)(b:Activation out)):Activation in  is ((#all(a)(b)) in (js`o={a:i,b:i}`)(#all(a)(b))=({a:(a),b:(b)}))  interaction ((a:Composed in).x):Number out  is ((#(a).x)in(js`o=i;`)(a)=({x:(#(a).x)}))is  (all    (when(click)then((new(x))=((previous(x))+(1))))(make(x)flow))").nodes,
      function(x) {
        console.log(x.id);
      }
    );
  });


  xit('should preserve identity of nodes', function() {


    var code = "\
interaction (bob):{theNumber:Number in,theResult:Number out} is \
( ({theNumber:(variable theNumber)theResult:(variable theResult)}) with behaviour (apply(function addOne) to (variable theNumber) and send result to (variable theResult)))\
"
    var header = "var addOne=function(x){return x + 1;};"
    console.log(compiler.compileToJs(code, header)({
      inter: {
        theNumber: 50,
        theResult: 0
      }
    }));


    // var graph = compiler.compileToGraph(code);
    // fs.writeFileSync('/Users/vincent/Documents/test.dot', compiler.graphToDot(graph), {
    //   encoding: 'utf8'
    // });
    // expect(_.every(graph.edges, function(x) {
    //   return _.includes(_.map(graph.nodes, "id"), x.from.id) && _.includes(_.map(graph.nodes, "id"), x.to.id);
    // })).toBeTruthy();



  });


  xit('should preserve identity of nodes 2', function() {


    var code = "\
interaction (bob):{theNumber:Number in,theOther:Number in,theResult:Number out} is \
( ({theNumber:(variable theNumber)theOther:(variable y)theResult:(variable theResult)}) with behaviour (apply(function addition) to ({0:(variable theNumber)1:(variable y)}) and send result to (variable theResult)))\
"

var graph = compiler.compileToGraph(code);
    fs.writeFileSync('/Users/vincent/Documents/test.dot', compiler.graphToDot(graph), {
      encoding: 'utf8'
    });


    var header = "var addition=function(x){return x[0] + x[1];};"
    console.log(compiler.compileToJs(code, header)({
      inter: {
        theNumber: 50,
        theOther: 50,
        theResult: 0
      }
    }));




  });


  it('should preserve identity of nodes 3', function() {


      var code = "\
  interaction (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out} is \
  ( ({theNumber:(variable theNumber)theOther:(variable y)theResult:(variable theResult)theLast:(variable wow)}) with behaviour (apply(function cool) to ({0:(variable theNumber)1:(variable y)}) and send result to ({sum:(variable theResult)diff:(variable wow)}) ))\
  "

  var graph = compiler.compileToGraph(code);
      fs.writeFileSync('/Users/vincent/Documents/test.dot', compiler.graphToDot(graph), {
        encoding: 'utf8'
      });


      var header = "var cool=function(x){return {sum:(x[0] + x[1]),diff:(x[0]-x[1])};};"
      console.log(compiler.compileToJs(code, header)({
        inter: {
          theNumber: 50,
          theOther: 30,
          theResult: 0
        }
      }));




    });

});
