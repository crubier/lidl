jest.dontMock('../parser.js').dontMock('lodash');
// TODO


var parser = require('../parser.js');

describe('parser', function() {

  describe('interaction', function() {

    it('should parse a simple interaction', function() {
      var parseResult = parser.parse('(x(y)(z))', {
        startRule: "interaction"
      });
      expect(parseResult.operator).toEqual('x$$');
      expect(parseResult.operand[0].operator).toEqual('y');
      expect(parseResult.operand[1].operator).toEqual('z');
    });

    it('should parse a more complex interaction', function() {
      var parseResult = parser.parse('(x(y(a))(z({w:(3)})))', {
        startRule: "interaction"
      });
      expect(parseResult.operator).toEqual('x$$');
      expect(parseResult.operand[0].operator).toEqual('y$');
      expect(parseResult.operand[1].operand[0].operator).toEqual('{w:$}');
    });

  });

  describe('interaction definition', function() {
    it('should parse a simple interaction definition', function() {
      var parseResult = parser.parse('interaction (a):Number in is (b)', {
        startRule: "interactionDefinition"
      });

      expect(parseResult.signature.operator).toEqual('a');

    });

    it('should parse a composite interaction definition', function() {
      var parseResult = parser.parse('interaction (a(x:Number out)):Number in is (b(x))', {
        startRule: "interactionDefinition"
      });

      expect(parseResult.signature.operator).toEqual('a$');

    });

  });


});
