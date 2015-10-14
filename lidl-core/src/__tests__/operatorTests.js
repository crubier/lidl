jest.dontMock('../operator.js').dontMock('../parser.js').dontMock('lodash');


var operator = require('../operator.js');
var parser = require('../parser.js');
var _ = require('lodash');



describe('operator', function() {

  describe('previous', function() {

    it('should detect previous', function() {
      expect(operator.parse("previous$")).toEqual("Previous");
    });

  });

  describe('composition', function() {

    it('should detect composition with commas ', function() {
      expect(operator.parse("{x:$,y:$,}")).toEqual("Composition");
    });

    it('should detect composition without commas', function() {
      expect(operator.parse("{x:$y:$}")).toEqual("Composition");
    });

    it('should detect composition with mixed commas ', function() {
      expect(operator.parse("{bobie:$,joe:$,lol:$wow:$}")).toEqual("Composition");
    });

    it('should invalidate composition with invalid keys ', function() {
      expect(operator.parse("{bobie:$,Joe:$,lol:$wow:$}")).toEqual("Custom");
    });

  });

  describe('function', function() {

    it('should detect function', function() {
      expect(operator.parse("`aaa`")).toEqual("Function");
    });

    it('should detect function', function() {
      expect(operator.parse("`bobie_joe5`")).toEqual("Function");
    });

    it('should invalidate function with an invalid name', function() {
      expect(operator.parse("`5jf`")).toEqual("Custom");
    });

  });

  describe('identifier', function() {

    it('should detect basic singleton identifier', function() {
      expect(operator.parse("#")).toEqual("Identifier");
    });

    it('should detect named singleton identifier', function() {
      expect(operator.parse("#bobie")).toEqual("Identifier");
    });

    it('should detect basic dependant identifier', function() {
      expect(operator.parse("#$$$")).toEqual("Identifier");
    });

    it('should detect named dependant identifier', function() {
      expect(operator.parse("#lol$$$")).toEqual("Identifier");
    });

  });

  describe('function application', function() {

    it('should detect basic function application', function() {
      expect(operator.parse("$in$$=$")).toEqual("FunctionApplication");
    });

  });

  describe('custom', function() {

    it('should detect case 1', function() {
      expect(operator.parse("wow")).toEqual("Custom");
    });


    it('should detect case 2', function() {
      expect(operator.parse("$pif$")).toEqual("Custom");
    });


    it('should detect case 3', function() {
      expect(operator.parse("paf$")).toEqual("Custom");
    });


    it('should detect case 4', function() {
      expect(operator.parse("$pouf")).toEqual("Custom");
    });

    it('should detect case 4', function() {
      expect(operator.parse("$$$w$o$$widei\"\"d$$loliel$$")).toEqual("Custom");
    });

  });

  describe('with parsed interaction', function() {
    it('should work on a parsed interaction', function() {
      expect(operator.parse(parser.parse("(wow(5)lolie(6))", {startRule: "interaction"}).operator)).toEqual("Custom");
    });
  });

});
