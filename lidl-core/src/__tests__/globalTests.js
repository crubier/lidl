jest.autoMockOff();
//
var compiler = require('../compiler.js');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');


xdescribe('lidl compiler', function() {

  var exampleTestPath = 'example/test';
  var commonHeader = path.join(exampleTestPath, 'common.lidl.js');

  _.forEach(fs.readdirSync(exampleTestPath), function(x) {
    var file = path.join(exampleTestPath, x);
    if (fs.statSync(file).isFile() && path.extname(file) === '.lidl') {
      test(file);
    };
  });


  // This function compile a lidl file and compare its execution with a scenario
  function test(file) {

    var code = fs.readFileSync(file, {
      encoding: 'utf8'
    });
    var header = fs.readFileSync(commonHeader, {
      encoding: 'utf8'
    });
    var scenarioText = fs.readFileSync(file + '.scenario.json', {
      encoding: 'utf8'
    });

    describe('Compilation of file ' + file, function() {
      var graph = compiler.compileToGraph(code);

      fs.writeFileSync(file + '.dot', compiler.graphToDot(graph), {
        encoding: 'utf8'
      });

      var res = compiler.generateJsCode(graph, header);

      var trans = res.transitionFunction;
      var init = res.initializationFunction;
      var scenario = JSON.parse(scenarioText);
      var trace = [init()];

      // Execute LIDL system step by step
      var i;
      for (i = 0; i < scenario.length; i++) {
        trace[i].inter = scenario[i].inter;
        trace[i].args = scenario[i].args;
        trace[i] = trans(trace[i]);
        if (i < scenario.length - 1) {
          trace[i + 1] = {};
          trace[i + 1].state = trace[i].state;
          trace[i + 1].memo = trace[i].memo;
        }
      }

      var oracle = JSON.parse(scenarioText);
      it('Should have correct length',
        function() {
          expect(trace.length).toEqual(oracle.length)
        }
      );

      _.forEach(_.zip(oracle, trace), function(s, i) {
        it('Should be correct at step ' + i + ' of the execution',
          function() {
            expect(s[0].inter).toEqual(s[1].inter);
          }
        );
      })

      fs.writeFileSync(file + '.trace.json', JSON.stringify(trace), {
        encoding: 'utf8'
      });

    });
  };


});
