'use strict';jest.dontMock('../operator.js').dontMock('../interactions.js').dontMock('../parser.js').dontMock('../serializer.js').dontMock('../identifiers.js').dontMock('lodash');

var identifiers = require('../identifiers.js');
var parser = require('../parser.js');
var serializer = require('../serializer.js');
var _ = require('lodash');

describe('identifier', function () {
  describe('get identifiers', function () {
    it('should work on example 1', function () {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(variable1)", {
        startRule: "interaction" })).
      map(serializer.serialize);

      expect(_.contains(ids, "(variable1)")).toBeTruthy();
    });

    it('should work on example 2', function () {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(variable1))", {
        startRule: "interaction" })).
      map(serializer.serialize);

      expect(_.contains(ids, "(variable1)")).toBeTruthy();
      expect(_.contains(ids, "(cos(variable1))")).toBeFalsy();
    });

    it('should work on example 3', function () {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(variable1)lol(variable2))", {
        startRule: "interaction" })).
      map(serializer.serialize);

      expect(_.contains(ids, "(variable1)")).toBeTruthy();
      expect(_.contains(ids, "(variable2)")).toBeTruthy();
      expect(_.contains(ids, "(cos(variable1)lol(variable2))")).toBeFalsy();
    });

    it('should work on example 4', function () {
      var ids = identifiers.getIdentifierSetOfInteraction(parser.parse("(cos(variablebob(variabled3)ss(variablef5))lol(variable2)dgd(variabled3))", {
        startRule: "interaction" })).
      map(serializer.serialize);

      expect(_.contains(ids, "(variablebob(variabled3)ss(variablef5))")).toBeTruthy();
      expect(_.contains(ids, "(variabled3)")).toBeTruthy();
      expect(_.contains(ids, "(variable2)")).toBeTruthy();
      expect(_.contains(ids, "(variablef5)")).toBeFalsy();
      expect(_.contains(ids, "(cos(variablebob(variabled3)ss(variablef5))lol(variable2)dgd(variabled3))")).toBeFalsy();
    });
  });

  describe('reduce identifiers', function () {
    it('should work on example 1', function () {
      var newInteraction = identifiers.reduceIdentifiers(parser.parse("(variablehdhsd)", {
        startRule: "interaction" }));

      expect(serializer.serialize(newInteraction)).toEqual("(variable0)");
    });

    it('should work on example 2', function () {
      var newInteraction = identifiers.reduceIdentifiers(
      parser.parse("(lol(variablehdhsd)ff(variable23))", {
        startRule: "interaction" }));


      expect(serializer.serialize(newInteraction)).toEqual("(lol(variable0)ff(variable1))");
    });
  });

});