'use strict';jest.dontMock('../interfaces.js').dontMock('../parser.js').dontMock('../data.js').dontMock('lodash');

var interfaces = require('../interfaces.js');
var parser = require('../parser.js');

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

        direction: "in" });});



    it('composite', function () {
      expect(interfaces.conjugateInterface({ 
        type: 'InterfaceComposite', 
        element: [{ 
          type: "InterfaceCompositeField", 
          key: "x", 
          value: { 
            type: 'InterfaceAtomic', 
            data: { 
              type: "TypeNamed", 
              name: "Number" }, 

            direction: "out" } }, 

        { 
          type: "InterfaceCompositeField", 
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
          type: "InterfaceCompositeField", 
          key: "x", 
          value: { 
            type: 'InterfaceAtomic', 
            data: { 
              type: "TypeNamed", 
              name: "Number" }, 

            direction: "in" } }, 

        { 
          type: "InterfaceCompositeField", 
          key: "y", 
          value: { 
            type: 'InterfaceAtomic', 
            data: { 
              type: "TypeNamed", 
              name: "Text" }, 

            direction: "out" } }] });});});







  describe('atom list', function () {
    it('simple', function () {
      expect(interfaces.listOfAtoms(
      parser.parse("Number in", { 
        startRule: "interfac" }), 
      "main")).toEqual(
      [{ 
        name: "main", 
        data: { 
          type: "DataAtomic", 
          name: "Number" }, 

        direction: "in" }]);});






    it('composite', function () {
      expect(interfaces.listOfAtoms(
      parser.parse("{x:Number in,y:Number out}", { 
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

        direction: "out" }]);});});





  //
  describe('localisationInterface', function () {
    it('simple ok', function () {
      expect(interfaces.localisationInterface(
      parser.parse("Number in", { 
        startRule: "interfac" }))).
      toEqual(
      parser.parse("Number in", { 
        startRule: "interfac" }));});



    it('composite ok1', function () {
      expect(interfaces.localisationInterface(
      parser.parse("{a:Number,b:Number} in", { 
        startRule: "interfac" }))).
      toEqual(
      parser.parse("{a:Number in,b:Number in}", { 
        startRule: "interfac" }));});



    it('composite ok2', function () {
      expect(interfaces.localisationInterface(
      parser.parse("{ a: { x: Boolean , y : Text},b:Number} in", { 
        startRule: "interfac" }))).
      toEqual(
      parser.parse("{a:{x:Boolean in,y:Text in},b:Number in}", { 
        startRule: "interfac" }));});



    it('composite ok3', function () {
      expect(interfaces.localisationInterface(
      parser.parse("{a:{x:Boolean,y:Text} out,b:Number in }", { 
        startRule: "interfac" }))).
      toEqual(
      parser.parse("{a:{x:Boolean out,y:Text out},b:Number in}", { 
        startRule: "interfac" }));});



    it('composite ok4', function () {
      expect(interfaces.localisationInterface(
      parser.parse("{a:{x:Boolean in,y:Text out},b:Number in }", { 
        startRule: "interfac" }))).
      toEqual(
      parser.parse("{a:{x:Boolean in,y:Text out},b:Number in}", { 
        startRule: "interfac" }));});});








  describe('globalisationInterface', function () {
    // it('simple ok', function() {
    //   expect(interfaces.globalisationInterface(
    //     parser.parse("Number in", {
    //       startRule: "interfac"
    //     }))).toEqual(
    //     parser.parse("Number in", {
    //       startRule: "interfac"
    //     }));
    // });
    //
    // it('composite ok1', function() {
    //   expect(interfaces.globalisationInterface(
    //     parser.parse("{a:Number in,b:Number}", {
    //       startRule: "interfac"
    //     }))).toEqual(
    //     parser.parse("{a:Number,b:Number} in", {
    //       startRule: "interfac"
    //     }));
    // });
    //
    // it('composite ok2', function() {
    //   expect(interfaces.globalisationInterface(
    //     parser.parse("{ a: { x: Boolean in , y : Text in},b:Number in}", {
    //       startRule: "interfac"
    //     }))).toEqual(
    //     parser.parse("{a:{x:Boolean ,y:Text },b:Number } in", {
    //       startRule: "interfac"
    //     }));
    // });
    //
    // it('composite ok3', function() {
    //   expect(interfaces.globalisationInterface(
    //     parser.parse("{a:{x:Boolean out,y:Text out},b:Number in }", {
    //       startRule: "interfac"
    //     }))).toEqual(
    //     parser.parse("{a:{x:Boolean,y:Text} out,b:Number in}", {
    //       startRule: "interfac"
    //     }));
    // });
    //
    // it('composite ok4', function() {
    //   expect(interfaces.globalisationInterface(
    //     parser.parse("{a:{x:Boolean in,y:Text out},b:Number in }", {
    //       startRule: "interfac"
    //     }))).toEqual(
    //     parser.parse("{a:{x:Boolean in,y:Text out},b:Number in}", {
    //       startRule: "interfac"
    //     }));
    // });
  });





  describe('isCompatible', function () {
    it('simple ok', function () {
      expect(interfaces.isCompatible(
      parser.parse("Number in", { 
        startRule: "interfac" }), 
      parser.parse("Number out", { 
        startRule: "interfac" }))).
      toBeTruthy();});


    it('simple nok because of direction', function () {
      expect(interfaces.isCompatible(
      parser.parse("Number in", { 
        startRule: "interfac" }), 
      parser.parse("Number in", { 
        startRule: "interfac" }))).
      toBeFalsy();});


    it('simple nok because of data type', function () {
      expect(interfaces.isCompatible(
      parser.parse("Number in", { 
        startRule: "interfac" }), 
      parser.parse("Text out", { 
        startRule: "interfac" }))).
      toBeFalsy();});


    it('simple nok because of both', function () {
      expect(interfaces.isCompatible(
      parser.parse("Number in", { 
        startRule: "interfac" }), 
      parser.parse("Text in", { 
        startRule: "interfac" }))).
      toBeFalsy();});


    it('composite ok ', function () {
      expect(interfaces.isCompatible(
      parser.parse("{x:Number in,y:Number out}", { 
        startRule: "interfac" }), 
      parser.parse("{x:Number out,y:Number in}", { 
        startRule: "interfac" }))).
      toBeTruthy();});


    it('composite nok ', function () {
      expect(interfaces.isCompatible(
      parser.parse("{x:Number in,y:Number out}", { 
        startRule: "interfac" }), 
      parser.parse("{x:Number out,y:Number out}", { 
        startRule: "interfac" }))).
      toBeFalsy();});


    it('composite too much on first but ok', function () {
      expect(interfaces.isCompatible(
      parser.parse("{x:Number in,y:Number out,a:Number out}", { 
        startRule: "interfac" }), 
      parser.parse("{x:Number out,y:Number in}", { 
        startRule: "interfac" }))).
      toBeTruthy();});


    it('composite too much on second but ok', function () {
      expect(interfaces.isCompatible(
      parser.parse("{x:Number in,y:Number out,a:Number out}", { 
        startRule: "interfac" }), 
      parser.parse("{x:Number out,y:Number in,b:{x:Number in,y:Text out}}", { 
        startRule: "interfac" }))).
      toBeTruthy();});});






  describe('madeOnlyOf', function () {
    it('simple ok', function () {
      expect(interfaces.madeOnlyOf(
      parser.parse("Number in", { 
        startRule: "interfac" }))).
      toEqual('in');});

    it('simple ok1', function () {
      expect(interfaces.madeOnlyOf(
      parser.parse("{a:Number out,b:Number out}", { 
        startRule: "interfac" }))).
      toEqual('out');});


    it('simple ok2', function () {
      expect(interfaces.madeOnlyOf(
      parser.parse("{a:Number out,b:{x:Number out,y:Number out}}", { 
        startRule: "interfac" }))).
      toEqual('out');});

    it('simple ok2', function () {
      expect(interfaces.madeOnlyOf(
      parser.parse("{a:Number out,b:{x:Number in,y:Number out}}", { 
        startRule: "interfac" }))).
      toBeUndefined();});});


  //
  //
  // describe('mergeInterface', function() {
  //   it('simple ok', function() {
  //     expect(interfaces.mergeInterface(
  //       parser.parse("Number in", {
  //         startRule: "interfac"
  //       }), parser.parse("Number in", {
  //         startRule: "interfac"
  //       }))).toEqual(parser.parse("Number in", {
  //       startRule: "interfac"
  //     }));
  //   });
  //   it('simple ok 2', function() {
  //     expect(interfaces.mergeInterface(
  //       parser.parse("Number in", {
  //         startRule: "interfac"
  //       }), parser.parse("{x:Number in,y:Number out}", {
  //         startRule: "interfac"
  //       }))).toThrow();
  //   });
  //   it('simple ok 3', function() {
  //     expect(interfaces.mergeInterface(
  //       parser.parse("{x:Number in,y:Number out}", {
  //         startRule: "interfac"
  //       }), parser.parse("{x:Number in,y:Number out}", {
  //         startRule: "interfac"
  //       }))).toEqual(parser.parse("{x:Number in,y:Number out}", {
  //       startRule: "interfac"
  //     }));
  //   });
  //
  //
  //
  //
  // });
});