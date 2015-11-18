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


  it('should preserve identity of nodes', function() {


    var code = "\
interaction (bob):{theNumber:Number in,theResult:Number out} is \
( ({theNumber:(variable theNumber)theResult:(variable theResult)}) with behaviour (apply(function addOne) to (variable theNumber) and send result to (variable theResult)))\
"

    console.log(compiler.compileToJs(code,"var addOne=function(x){return x + 1;}")({
      inter: {
        theNumber: 50,
        theResult: 0
      }
    }));


    var graph = compiler.compileToGraph(code);
    // expect(_.every(graph.edges, function(x) {
    //   return _.includes(_.map(graph.nodes, "id"), x.from.id) && _.includes(_.map(graph.nodes, "id"), x.to.id);
    // })).toBeTruthy();

    // compiler.graphTransformation(graph);

    fs.writeFileSync('/Users/vincent/Documents/test.dot', compiler.graphToDot(graph), {
      encoding: 'utf8'
    });

  });

});
