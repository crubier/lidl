jest.dontMock('../serializer.js').dontMock('../parser.js').dontMock('lodash');


var serializer = require('../serializer.js');
var parser = require('../parser.js');
var _ = require('lodash');

describe('serializer', function() {

  describe('interactions', function() {

    it('simple case', function() {

      expect(serializer.serialize(parser.parse("(cos((4)*((5)lol(bob)joe))+(5))",{startRule:"interaction"}))).toEqual("(cos((4)*((5)lol(bob)joe))+(5))");

    });
  });
});
