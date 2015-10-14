jest.dontMock('../interfaces.js').dontMock('../parser.js').dontMock('lodash');

var interfaces = require('../interfaces.js');
var parser = require('../parser.js');

describe('interfaces', function() {
  var interfaces = require('../interfaces');

  describe('conjugate', function() {

    it('atomic', function() {
      expect(interfaces.conjugate({
        type: 'InterfaceAtomic',
        datatype: {
          type: "TypeNamed",
          name: "Number"
        },
        direction: "out"
      })).toEqual({
        type: 'InterfaceAtomic',
        datatype: {
          type: "TypeNamed",
          name: "Number"
        },
        direction: "in"
      });
    });

    it('composite', function() {
      expect(interfaces.conjugate({
        type: 'InterfaceComposite',
        component: [{
          type: "InterfaceCompositeField",
          key: "x",
          value: {
            type: 'InterfaceAtomic',
            datatype: {
              type: "TypeNamed",
              name: "Number"
            },
            direction: "out"
          }
        }, {
          type: "InterfaceCompositeField",
          key: "y",
          value: {
            type: 'InterfaceAtomic',
            datatype: {
              type: "TypeNamed",
              name: "Text"
            },
            direction: "in"
          }
        }]
      })).toEqual({
        type: 'InterfaceComposite',
        component: [{
          type: "InterfaceCompositeField",
          key: "x",
          value: {
            type: 'InterfaceAtomic',
            datatype: {
              type: "TypeNamed",
              name: "Number"
            },
            direction: "in"
          }
        }, {
          type: "InterfaceCompositeField",
          key: "y",
          value: {
            type: 'InterfaceAtomic',
            datatype: {
              type: "TypeNamed",
              name: "Text"
            },
            direction: "out"
          }
        }]
      });
    });

  });

  describe('atom list', function() {
    it('simple', function() {
      expect(interfaces.listOfAtoms(
        parser.parse("Number in", {startRule: "interface"}), "main")).toEqual(
        [{
          name: "main",
          data: {
            type: "DataAtomic",
            name: "Number"
          },
          direction: "in"
        }]
      );
    });



    it('composite', function() {
      expect(interfaces.listOfAtoms(
        parser.parse("{x:Number in,y:Number out}", {startRule: "interface"}), "main")).toEqual(
        [{
          name: "main.x",
          data: {
            type: "DataAtomic",
            name: "Number"
          },
          direction: "in"
        },
      {
        name: "main.y",
        data: {
          type: "DataAtomic",
          name: "Number"
        },
        direction: "out"
      }]
      );
    });
  });

});
