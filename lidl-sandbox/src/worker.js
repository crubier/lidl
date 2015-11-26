var l = require('lidl-core')
var Lidl= l.compiler;
var Graph = l.graph;
var _ = require('lodash');
var beautify = require('js-beautify').js_beautify;


module.exports = function(self) {
  self.addEventListener('message', function(ev) {

    var m = ev.data;

    switch (m.type) {
      case 'Ping':
        self.postMessage({type: 'Ping',message:m.message});
        break;
      case 'Lidl2LidlAst':
        self.postMessage({type: 'Lidl2LidlAst',lidlAst:Lidl.Lidl2LidlAst (m.lidl)});
        break;
      case 'ExpandedLidlAst2ExpandedLidl':
          self.postMessage({type: 'ExpandedLidlAst2ExpandedLidl',expandedLidl:Lidl.LidlAst2Lidl (m.expandedLidlAst)});
          break;
      case 'LidlAst2ExpandedLidlAst':
        self.postMessage({type: 'LidlAst2ExpandedLidlAst', expandedLidlAst:Lidl.LidlAst2ExpandedLidlAst(m.lidlAst) });
        break;
      case 'ExpandedLidlAst2Graph':
        self.postMessage({type: 'ExpandedLidlAst2Graph', graph:Lidl.ExpandedLidlAst2Graph(m.expandedLidlAst,m.upto) });
        break;
      case 'Graph2Js':
        self.postMessage({type: 'Graph2Js', js:Lidl.Graph2Js(new Graph(m.graph.nodes,m.graph.edges),m.header) });
        break;
      case 'Graph2DisplayGraph':
        self.postMessage({type: 'Graph2DisplayGraph', displayGraph:{nodes:[{label:"A"},{label:"B"}],edges:[{from:0,to:1}]} });
        break;
      case 'Js2CleanJs':
        self.postMessage({type: 'Js2CleanJs', cleanJs:beautify(m.js.source,{indent_size: 2}) });
        break;
      case 'Scenario2ScenarioAst':
        self.postMessage({type: 'Scenario2ScenarioAst',scenarioAst:JSON.parse(m.scenario)});
        break;
      case 'Js2TraceAst':
if(m.js!==null && m.js!==undefined && m.scenarioAst!==null && m.scenarioAst!==undefined ) {
        var trans = new Function("data",m.js.partialSource.transitionFunction);
        var init = new Function("data",m.js.partialSource.initializationFunction);

        var scenario = m.scenarioAst;
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
                self.postMessage({type: 'Js2TraceAst',traceAst:trace});
}else {
  throw new Error('Missing Scenario or Generated code');
}
          break;
      case 'TraceAst2Trace':
        self.postMessage({type: 'TraceAst2Trace',trace:JSON.stringify(m.traceAst,null,2)});
        break;

    }

  });
};




//
//
//
//
//
//
