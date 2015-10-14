jest.dontMock('../operator.js').dontMock('../interactions.js').dontMock('../parser.js').dontMock('../serializer.js').dontMock('../identifiers.js').dontMock('lodash');

var identifiers = require('../identifiers.js');
var parser = require('../parser.js');
var serializer = require('../serializer.js');
var _ = require('lodash');

describe('identifier', function() {
  describe('get identifiers', function() {
    it('should work on example 1', function() {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(#1)", {
        startRule: "interaction"
      })).map(serializer.serialize);

      expect(_.contains(ids, "(#1)")).toBeTruthy();
    });

    it('should work on example 2', function() {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(#1))", {
        startRule: "interaction"
      })).map(serializer.serialize);

      expect(_.contains(ids, "(#1)")).toBeTruthy();
      expect(_.contains(ids, "(cos(#1))")).toBeFalsy();
    });

    it('should work on example 3', function() {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(#1)lol(#2))", {
        startRule: "interaction"
      })).map(serializer.serialize);

      expect(_.contains(ids, "(#1)")).toBeTruthy();
      expect(_.contains(ids, "(#2)")).toBeTruthy();
      expect(_.contains(ids, "(cos(#1)lol(#2))")).toBeFalsy();
    });

    it('should work on example 4', function() {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(#bob(#d3)ss(#f5))lol(#2)dgd(#d3))", {
        startRule: "interaction"
      })).map(serializer.serialize);

      expect(_.contains(ids, "(#bob(#d3)ss(#f5))")).toBeTruthy();
      expect(_.contains(ids, "(#d3)")).toBeTruthy();
      expect(_.contains(ids, "(#2)")).toBeTruthy();
      expect(_.contains(ids, "(#f5)")).toBeFalsy();
      expect(_.contains(ids, "(cos(#bob(#d3)ss(#f5))lol(#2)dgd(#d3))")).toBeFalsy();
    });
  });

  describe('reduce identifiers', function() {
    it('should work on example 1', function() {
      var newInteraction = identifiers.reduceIdentifiers(parser.parse("(#hdhsd)", {
        startRule: "interaction"
      }));
      expect(serializer.serialize(newInteraction)).toEqual("(#0)");
    });

    it('should work on example 2', function() {
      var newInteraction = identifiers.reduceIdentifiers(
        parser.parse("(lol(#hdhsd)ff(#23))", {
          startRule: "interaction"
        })
      );
      expect(serializer.serialize(newInteraction)).toEqual("(lol(#0)ff(#1))");
    });
  });

});
