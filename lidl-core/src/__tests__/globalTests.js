jest.autoMockOff();

var fs = require('fs');
var iii = require('../../index.js');
var _ = require('lodash');


describe('iii', function() {


  it('should work on example files', function() {

    var list = [
      "small",
      "small2",
      "smallfct",
      "test",
      "test2",
      "justFct",
      "testCase",
      "testCase2"
    ];

    _.forEach(list, function(x) {

      console.log(
        iii.serializer.serialize(
          iii.identifiers.reduceIdentifiers(
            iii.interactions.expand(
              iii.parser.parse(
                fs.readFileSync('example/' + x + '.iii', {
                  encoding: 'utf8'
                })
              )[0]
            ).interaction
          )
        )
      );


    });



  });
});
