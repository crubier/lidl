jest.autoMockOff();
//
var  graphCompiler = require('../graphCompiler.js');
var parser = require('../parser.js');
var _ = require('lodash');
var fs  = require('fs');
var path = require('path');
// var Graph =require('../g.js');
var exec = require('child_process').exec;


describe('lidl graph compiler', function() {
  // console.log('-------------------');

  var exampleTestPath = 'example/test';
  var commonHeader = path.join(exampleTestPath, 'common.lidl.js');

  _(fs.readdirSync(exampleTestPath))
  .forEach( (x) =>{
    var ffile = path.join(exampleTestPath, x);
    if (fs.statSync(ffile).isDirectory()) {
      test(ffile);
    };
  })
  .commit();


  // This function compile a lidl file and compare its execution with a scenario
  function test(file) {

    function printGraph(graph,name) {
      fs.writeFileSync(path.join(file, name+'.dot'), graph.toDotDef(), {encoding: 'utf8'});
      exec("dot " + path.join(file, name+'.dot') + " -o" +path.join(file, name+'.pdf')+ " -Tpdf", null);
    }


    function runCodeAgainstOracle(code,scenarioText) {

      var trans = new Function("data",code.transitionFunction);
      var init = new Function("data",code.initializationFunction);
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

      return trace;

    }

    var code = fs.readFileSync(path.join(file, "code.lidl"), {encoding: 'utf8'});
    var header = fs.readFileSync(commonHeader, {encoding: 'utf8'});
    var scenarioText = fs.readFileSync(path.join(file, 'scenario.json'), {encoding: 'utf8'});

    describe('Expansion of file ' + file, function() {
      console.log("====================================================");
      console.log("Now (new) compiling " + file);

      // removeOneSidedAffectation
      graphCompiler.compile(parser.parse(code)[0],header,{
        createDataFlowDirection:function(graph,data){printGraph(graph,'createDataFlowDirection');return true;},
        getJsCode:function(graph,data){
          fs.writeFileSync(path.join(file,'generated.js'), data.code.source, {encoding: 'utf8'});
          let trace = runCodeAgainstOracle(data.code.partialSource,scenarioText);
          fs.writeFileSync(path.join(file,'trace.json'), JSON.stringify(trace), {encoding: 'utf8'});
          return true;
        },
        getExpandedLidlCode:function(graph,data){fs.writeFileSync(path.join(file,'expanded.lidl'), data.code.source, {encoding: 'utf8'});return true;},
        error:function(graph,data){printGraph(graph,'error');return true;}
      });
    });
  }


});
