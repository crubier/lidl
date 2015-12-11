jest.autoMockOff();
//
var graphCompiler = require('../graphCompiler.js');
var parser = require('../parser.js');
var runner = require('../runner.js');
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
// var Graph =require('../g.js');
var exec = require('child_process').exec;


describe('lidl graph compiler', function() {
  // console.log('-------------------');


  var testPaths = [
    'example/ok'
    // ,'example/investigate'

    // ,'example/nok'
  ];


  _(testPaths)
    .forEach(testPath => {
      var header = path.join(testPath, 'common.lidl.js');
      _(fs.readdirSync(testPath))
        .forEach((x) => {
          var ffile = path.join(testPath, x);
          if (fs.statSync(ffile).isDirectory()) {
            test(ffile, header);
          };
        })
        .commit();
    })
    .commit();




  // This function compile a lidl file and compare its execution with a scenario
  function test(file, commonHeader) {

    function printGraph(graph, name)  {
      if (!fs.existsSync(path.join(file, "dot"))) {
        fs.mkdirSync(path.join(file, "dot"));
      }
      if (!fs.existsSync(path.join(file, "pdf"))) {
        fs.mkdirSync(path.join(file, "pdf"));
      }
      fs.writeFileSync(path.join(file, "dot", name + '.dot'), graph.toDot(), {
        encoding: 'utf8'
      });
      exec("dot " + path.join(file, "dot", name + '.dot') + " -o" + path.join(file, "pdf", name + '.pdf') + " -Tpdf", null);
    }


    function checkTraceAgainstOracle(trace, oracle) {

      // Find the oracle
      it('Should have correct length',
        function() {
          expect(trace.length).toEqual(oracle.length)
        }
      );

      // Check resulting trace against oracle
      _.forEach(_.zip(oracle, trace), function(s, i) {
        it('Interface Should be correct at step ' + i + ' of the execution', function() {
          expect(s[0].inter).toEqual(s[1].inter);
        });
        _.forEach(s[0].args, function(arg, argName) {
          it('Argument ' + argName + ' should be correct at step ' + i + ' of the execution', function() {
            expect(s[0].args[argName]).toEqual(s[1].args[argName]);
          });
        });
      });

      return trace;

    }

    fs.removeSync(path.join(file, "result"));
    fs.removeSync(path.join(file, "dot"));
    fs.removeSync(path.join(file, "pdf"));

    var code = fs.readFileSync(path.join(file, "code.lidl"), {
      encoding: 'utf8'
    });
    var header = fs.readFileSync(commonHeader, {
      encoding: 'utf8'
    });
    var scenarioText = fs.readFileSync(path.join(file, 'scenario.json'), {
      encoding: 'utf8'
    });

    if (!fs.existsSync(path.join(file, "result"))) {
      fs.mkdirSync(path.join(file, "result"));
    }

    describe('Compilation of file ' + file, function() {
      console.log("====================================================");
      console.log("Compiling and testing " + file);

      // removeOneSidedAffectation
      graphCompiler.compile(parser.parse(code)[0], header, {
        createDataFlowDirection: function(graph, data) {
          printGraph(graph, data.step + 'createDataFlowDirection' + data.iteration);
          return true;
        },
        nonMatchingCompositionCompilation: function(graph, data) {
          printGraph(graph, data.step + 'nonMatchingCompositionCompilation' + data.iteration);
          return true;
        },
        removeOneSidedAffectation: function(graph, data) {
          printGraph(graph, data.step + 'removeOneSidedAffectation' + data.iteration);
          return true;
        },
        referentialTransparencyInstances: function(graph, data) {
          printGraph(graph, data.step + 'referentialTransparencyInstances' + data.iteration);
          return true;
        },
        getJsCode: function(graph, data) {
          fs.writeFileSync(path.join(file, 'result', 'generated.js'), data.source, {
            encoding: 'utf8'
          });
          let trace = runner.run(data, JSON.parse(scenarioText));
          checkTraceAgainstOracle(trace, JSON.parse(scenarioText));
          fs.writeFileSync(path.join(file, 'result', 'trace.json'), JSON.stringify(trace), {
            encoding: 'utf8'
          });
          return true;
        },
        getExpandedLidlCode: function(graph, data) {
          fs.writeFileSync(path.join(file, 'result', 'expanded.lidl'), data.source, {
            encoding: 'utf8'
          });
          return true;
        },
        error: function(graph, data) {
          printGraph(graph, 'error');
          return true;
        }
      });
    });
  }


});
