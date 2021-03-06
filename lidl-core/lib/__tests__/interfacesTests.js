'use strict';jest.dontMock('../interfaces.js').dontMock('../parser.js').dontMock('../data.js').dontMock('lodash');

var interfaces = require('../interfaces.js');
var parser = require('../parser.js');

function removeMeta(obj) {
  if (obj.hasOwnProperty("meta")) {
    delete obj.meta;
  }
  if (Array.isArray(obj) || obj.hasOwnProperty("type")) {
    for (var prop in obj) {
      if (prop !== 'parent') {
        if (obj.hasOwnProperty(prop)) {
          removeMeta(obj[prop]);
        }
      }
    }}
  return obj;
}


function parse(x, options) {
  var opts;
  if (options === undefined) opts = { startRule: 'start' };else opts = options;
  return removeMeta(parser.parse(x, opts));
}

describe('interfaces', function () {
  var interfaces = require('../interfaces');

  describe('conjugate', function () {

    it('atomic', function () {
      expect(interfaces.conjugateInterface({
        type: 'InterfaceAtomic',
        data: {
          type: "TypeNamed",
          name: "Number" },

        direction: "out" })).
      toEqual({
        type: 'InterfaceAtomic',
        data: {
          type: "TypeNamed",
          name: "Number" },

        direction: "in" });

    });

    it('composite', function () {
      expect(interfaces.conjugateInterface({
        type: 'InterfaceComposite',
        element: [{
          type: "InterfaceCompositeElement",
          key: "x",
          value: {
            type: 'InterfaceAtomic',
            data: {
              type: "TypeNamed",
              name: "Number" },

            direction: "out" } },

        {
          type: "InterfaceCompositeElement",
          key: "y",
          value: {
            type: 'InterfaceAtomic',
            data: {
              type: "TypeNamed",
              name: "Text" },

            direction: "in" } }] })).


      toEqual({
        type: 'InterfaceComposite',
        element: [{
          type: "InterfaceCompositeElement",
          key: "x",
          value: {
            type: 'InterfaceAtomic',
            data: {
              type: "TypeNamed",
              name: "Number" },

            direction: "in" } },

        {
          type: "InterfaceCompositeElement",
          key: "y",
          value: {
            type: 'InterfaceAtomic',
            data: {
              type: "TypeNamed",
              name: "Text" },

            direction: "out" } }] });



    });

  });

  describe('atom list', function () {
    it('simple', function () {
      expect(interfaces.listOfAtoms(
      parse("Number in", {
        startRule: "interfac" }),
      "main")).toEqual(
      [{
        name: "main",
        data: {
          type: "DataAtomic",
          name: "Number" },

        direction: "in" }]);


    });



    it('composite', function () {
      expect(interfaces.listOfAtoms(
      parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }),
      "main")).toEqual(
      [{
        name: "main.x",
        data: {
          type: "DataAtomic",
          name: "Number" },

        direction: "in" },
      {
        name: "main.y",
        data: {
          type: "DataAtomic",
          name: "Number" },

        direction: "out" }]);


    });
  });

  //
  describe('localisationInterface', function () {
    it('simple ok', function () {
      expect(interfaces.localisationInterface(
      parse("Number in", {
        startRule: "interfac" }))).
      toEqual(
      parse("Number in", {
        startRule: "interfac" }));

    });

    it('composite ok1', function () {
      expect(interfaces.localisationInterface(
      parse("{a:Number,b:Number} in", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:Number in,b:Number in}", {
        startRule: "interfac" }));

    });

    it('composite ok2', function () {
      expect(interfaces.localisationInterface(
      parse("{ a: { x: Boolean , y : Text},b:Number} in", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean in,y:Text in},b:Number in}", {
        startRule: "interfac" }));

    });

    it('composite ok3', function () {
      expect(interfaces.localisationInterface(
      parse("{a:{x:Boolean,y:Text} out,b:Number in }", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean out,y:Text out},b:Number in}", {
        startRule: "interfac" }));

    });

    it('composite ok4', function () {
      expect(interfaces.localisationInterface(
      parse("{a:{x:Boolean in,y:Text out},b:Number in }", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean in,y:Text out},b:Number in}", {
        startRule: "interfac" }));

    });



  });


  describe('globalisationInterface', function () {
    it('simple ok', function () {
      expect(interfaces.globalisationInterface(
      parse("Number in", {
        startRule: "interfac" }))).
      toEqual(
      parse("Number in", {
        startRule: "interfac" }));

    });
    //
    it('composite ok1', function () {
      expect(interfaces.globalisationInterface(
      parse("{a:Number in,b:Number in}", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:Number,b:Number} in", {
        startRule: "interfac" }));

    });

    it('composite ok2', function () {
      expect(interfaces.globalisationInterface(
      parse("{ a: { x: Boolean in , y : Text in},b:Number in}", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean ,y:Text },b:Number } in", {
        startRule: "interfac" }));

    });

    it('composite ok3', function () {
      expect(interfaces.globalisationInterface(
      parse("{a:{x:Boolean out,y:Text out},b:Number in }", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean,y:Text} out,b:Number in}", {
        startRule: "interfac" }));

    });

    it('composite ok4', function () {
      expect(interfaces.globalisationInterface(
      parse("{a:{x:Boolean in,y:Text out},b:Number in }", {
        startRule: "interfac" }))).
      toEqual(
      parse("{a:{x:Boolean in,y:Text out},b:Number in}", {
        startRule: "interfac" }));

    });

  });


  describe('isCompatible', function () {
    it('simple ok', function () {
      expect(interfaces.isCompatible(
      parse("Number in", {
        startRule: "interfac" }),
      parse("Number out", {
        startRule: "interfac" }))).
      toBeTruthy();
    });

    it('simple nok because of direction', function () {
      expect(interfaces.isCompatible(
      parse("Number in", {
        startRule: "interfac" }),
      parse("Number in", {
        startRule: "interfac" }))).
      toBeFalsy();
    });

    it('simple nok because of data type', function () {
      expect(interfaces.isCompatible(
      parse("Number in", {
        startRule: "interfac" }),
      parse("Text out", {
        startRule: "interfac" }))).
      toBeFalsy();
    });

    it('simple nok because of both', function () {
      expect(interfaces.isCompatible(
      parse("Number in", {
        startRule: "interfac" }),
      parse("Text in", {
        startRule: "interfac" }))).
      toBeFalsy();
    });

    it('composite ok ', function () {
      expect(interfaces.isCompatible(
      parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }),
      parse("{x:Number out,y:Number in}", {
        startRule: "interfac" }))).
      toBeTruthy();
    });

    it('composite nok ', function () {
      expect(interfaces.isCompatible(
      parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }),
      parse("{x:Number out,y:Number out}", {
        startRule: "interfac" }))).
      toBeFalsy();
    });

    it('composite too much on first but ok', function () {
      expect(interfaces.isCompatible(
      parse("{x:Number in,y:Number out,a:Number out}", {
        startRule: "interfac" }),
      parse("{x:Number out,y:Number in}", {
        startRule: "interfac" }))).
      toBeTruthy();
    });

    it('composite too much on second but ok', function () {
      expect(interfaces.isCompatible(
      parse("{x:Number in,y:Number out,a:Number out}", {
        startRule: "interfac" }),
      parse("{x:Number out,y:Number in,b:{x:Number in,y:Text out}}", {
        startRule: "interfac" }))).
      toBeTruthy();
    });


  });


  describe('madeOnlyOf', function () {
    it('simple ok', function () {
      expect(interfaces.madeOnlyOf(
      parse("Number in", {
        startRule: "interfac" }))).
      toEqual('in');
    });
    it('simple ok1', function () {
      expect(interfaces.madeOnlyOf(
      parse("{a:Number out,b:Number out}", {
        startRule: "interfac" }))).
      toEqual('out');
    });

    it('simple ok2', function () {
      expect(interfaces.madeOnlyOf(
      parse("{a:Number out,b:{x:Number out,y:Number out}}", {
        startRule: "interfac" }))).
      toEqual('out');
    });
    it('simple ok2', function () {
      expect(interfaces.madeOnlyOf(
      parse("{a:Number out,b:{x:Number in,y:Number out}}", {
        startRule: "interfac" }))).
      toBeUndefined();
    });
  });


  describe('mergeInterface', function () {
    it('simple ok', function () {
      expect(interfaces.mergeInterface(
      parse("Number in", {
        startRule: "interfac" }),
      parse("Number in", {
        startRule: "interfac" }))).
      toEqual(parse("Number in", {
        startRule: "interfac" }));

    });
    it('simple ok 2', function () {
      expect(function () {
        interfaces.mergeInterface(
        parse("Number in", {
          startRule: "interfac" }),
        parse("{x:Number in,y:Number out}", {
          startRule: "interfac" }));

      }).toThrow();
    });
    it('simple ok 2.5', function () {
      expect(function () {
        interfaces.mergeInterface(
        parse("Number in", {
          startRule: "interfac" }),
        parse("Number out", {
          startRule: "interfac" }));

      }).toThrow();
    });
    it('simple ok 3', function () {
      expect(interfaces.mergeInterface(
      parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }),
      parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }))).
      toEqual(parse("{x:Number in,y:Number out}", {
        startRule: "interfac" }));

    });
    it('simple ok 4', function () {
      expect(interfaces.mergeInterface(
      parse("{x:Number in,y:Number out,a:Text in}", {
        startRule: "interfac" }),
      parse("{x:Number in,y:Number out,b:Text out}", {
        startRule: "interfac" }))).
      toEqual(parse("{x:Number in,y:Number out,a:Text in,b: Text out}", {
        startRule: "interfac" }));

    });
    it('simple ok 5', function () {
      expect(interfaces.mergeInterface(
      parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }),
      parse("{x:Number ,y:Number ,z:Text }in", {
        startRule: "interfac" }))).
      toEqual(parse("{x:Number in,y:Number in,z:Text in}", {
        startRule: "interfac" }));

    });
    it('simple ok 5.5', function () {
      expect(interfaces.mergeInterface(parse("{x:Number ,y:Number ,z:Text }in", {
        startRule: "interfac" }),

      parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }))).
      toEqual(parse("{x:Number in,y:Number in,z:Text in}", {
        startRule: "interfac" }));

    });
    it('simple ok 6', function () {
      expect(interfaces.mergeInterface(
      parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }),
      undefined)).toEqual(parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }));

    });
    it('simple ok 7', function () {
      expect(interfaces.mergeInterface(
      undefined, parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }))).
      toEqual(parse("{x:Number in,y:Number in}", {
        startRule: "interfac" }));

    });
    it('simple ok 7', function () {
      expect(interfaces.mergeInterface(
      undefined, parse("Number in", {
        startRule: "interfac" }))).
      toEqual(parse("Number in", {
        startRule: "interfac" }));

    });
    it('simple ok 7', function () {
      expect(interfaces.mergeInterface(
      parse("Number in", {
        startRule: "interfac" }),
      undefined)).toEqual(parse("Number in", {
        startRule: "interfac" }));

    });
    it('simple ok 7', function () {
      expect(interfaces.mergeInterface(
      undefined, undefined)).toBeUndefined();
    });
  });



  describe('subInterface', function () {
    it('simple ok1', function () {
      expect(interfaces.subInterface(
      parse("{a:Number in,b:Number out}", {
        startRule: "interfac" }),
      "a")).toEqual(parse("Number in", {
        startRule: "interfac" }));

    });
    it('simple ok2', function () {
      expect(interfaces.subInterface(
      parse("{a:Number in,b:Number out}", {
        startRule: "interfac" }),
      "b")).toEqual(parse("Number out", {
        startRule: "interfac" }));

    });
    it('simple ok3', function () {
      expect(interfaces.subInterface(
      parse("{z:Boolean in,a:{x:Text in,y:Text out, z:Number in},b:Number out}", {
        startRule: "interfac" }),
      "a")).toEqual(parse("{x:Text in,y:Text out, z:Number in}", {
        startRule: "interfac" }));

    });
    it('simple ok4', function () {
      expect(interfaces.subInterface(
      parse("{z:Boolean in,a:{x:Text,y:Text, z:Number}out,b:Number out}", {
        startRule: "interfac" }),
      "a")).toEqual(parse("{x:Text out,y:Text out, z:Number out}", {
        startRule: "interfac" }));

    });

  });



});