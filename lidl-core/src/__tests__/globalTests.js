jest.autoMockOff();
//
var compiler = require('../compiler.js');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


describe('lidl compiler', function() {

  var exampleTestPath = 'example/test';
  var commonHeader = path.join(exampleTestPath, 'common.lidl.js');

  _.forEach(fs.readdirSync(exampleTestPath), function(x) {
    var file = path.join(exampleTestPath, x);
    if (fs.statSync(file).isDirectory()) {
      test(file);
    };
  });


  // This function compile a lidl file and compare its execution with a scenario
  function test(file) {

    var code = fs.readFileSync(path.join(file, "code.lidl"), {
      encoding: 'utf8'
    });
    var header = fs.readFileSync(commonHeader, {
      encoding: 'utf8'
    });
    var scenarioText = fs.readFileSync(path.join(file, 'scenario.json'), {
      encoding: 'utf8'
    });

    describe('Compilation of file ' + file, function() {
      console.log("====================================================");
      console.log("Now compiling and testing " + file);

      fs.writeFileSync(path.join(file,'expanded.lidl'), compiler.compileToIii(code), {
        encoding: 'utf8'
      });

      //
      // var graph1 = compiler.compileToGraph(code,'referentialTransparency');
      //
      // fs.writeFileSync(path.join(file, 'graph1.dot'), graph1.toDot(), {encoding: 'utf8'});
      // exec("dot " + path.join(file, 'graph1.dot') + " -o" +path.join(file, 'graph1.pdf')+ " -Tpdf", null);





      var graph = compiler.compileToGraph(code);

      // fs.writeFileSync(path.join(file, 'graph.json'), JSON.stringify(graph), {
      //   encoding: 'utf8'
      // });

      fs.writeFileSync(path.join(file, 'graph.dot'), graph.toDot(), {
        encoding: 'utf8'
      });


      exec("dot " + path.join(file, 'graph.dot') + " -o" +path.join(file, 'graph.pdf')+ " -Tpdf", null);


       // Compile code

      var compres = compiler.generateJsCode(graph, header);
      var sourceres = compres.source;
      var res = compres.partialSource;


      // Write executable to file
      fs.writeFileSync(path.join(file,'generated.js'), sourceres, {
        encoding: 'utf8'
      });

      var trans = new Function("data",res.transitionFunction);
      var init = new Function("data",res.initializationFunction);
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

      // Find the oracle
      var oracle = JSON.parse(scenarioText);
      it('Should have correct length',
        function() {
          expect(trace.length).toEqual(oracle.length)
        }
      );

      // Check resulting trace against oracle
      _.forEach(_.zip(oracle, trace), function(s, i) {
        it('Should be correct at step ' + i + ' of the execution',
          function() {
            expect(s[0].inter).toEqual(s[1].inter);
          }
        );
      })

      // Write trace to file
      fs.writeFileSync(path.join(file,'trace.json'), JSON.stringify(trace), {
        encoding: 'utf8'
      });


    });
  };


});
