jest.autoMockOff();

var compiler = require('../compiler.js');
var _ = require('lodash');

describe('iii', function() {
  xit('should work on example files', function() {

      _.forEach(
      compiler.compileToGraph("interaction  ((click:Activation in) happened (x:Number out) times):Activation inwith  interaction (1):Number out  is ((#1) in (js`o=1;`)(##)=(#1))  interaction ((a:Number in)+(b:Number in)):Number out  is ((#(a)+(b)) in (js`o=i.a+i.b;`)  ({a:(a)b:(b)})  =  (#(a)+(b)))  interaction (new(x:Number in)):Number out  is (#new(x))  interaction (when(a:Activation in)then(b:Activation out)):Activation in  is ((#when(a)then(b)) in (js`o=i.a.active&&i.b.active;`)({a:(#when(a)then(b))b:(a)})=(b))  interaction ((a:Number in) fallback to (b:Number in)):Number out  is ((# (a) fallback to (b)) in (js`o=a.active?a:b;`)({a:(a)b:(b)})=(# (a) fallback to (b)))  interaction ((a:Number out)=(b:Number in)):Activation in  is ((#(a)=(b)) in (js`o=i.a.active?i.b:{active:false};`)({a:(#(a)=(b))b:(b)})=(a))  interaction (make(x:Number in)flow):Activation in  is ( (x) = ((new(x)) fallback to (previous(x))) )  interaction (all(a:Activation out)(b:Activation out)):Activation in  is ((#all(a)(b)) in (js`o={a:i,b:i}`)(#all(a)(b))=({a:(a),b:(b)}))  interaction ((a:Composed in).x):Number out  is ((#(a).x)in(js`o=i;`)(a)=({x:(#(a).x)}))is  (all    (when(click)then((new(x))=((previous(x))+(1))))(make(x)flow))").nodes,
      function(x){console.log(x.id);}
)
    ;
  });

  

});
