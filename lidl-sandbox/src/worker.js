
"use strict"

var _ = require('lodash');
var beautify = require('js-beautify').js_beautify;
var viz = require('viz.js');


var Lidl = require('lidl-core');
var Compiler= Lidl.graphCompiler;
var Parser= Lidl.parser;
var Serializer= Lidl.serializer;
var Runner= Lidl.runner;
var Config= Lidl.config;




module.exports = function(self) {
  self.addEventListener('message', function(ev) {

    var m = ev.data;

    switch (m.type) {
      case 'Ping':
        self.postMessage({
          type: 'Ping',
          message: m.message
        });
        break;


      case 'RecompileAll':
        // Need :
        //   m.lidl      : string      LIDL code
        //   m.header    : string      header js code
        //   m.scenario  : string      header js code

        function graphToSvg(graph) {
          let rawres = viz(graph,{format:'svg',engine:'dot'});
          let offset = rawres.search('<svg');
          rawres = rawres.substring(offset);
          rawres = rawres.replace(/(width="[^"]+pt")/g, 'width="100%"');
          rawres = rawres.replace(/(height="[^"]+pt")/g, 'height="100%"');
          return rawres;
        }

        var ast = Parser.parse(m.lidl);
        self.postMessage({type: 'LidlAst',lidlAst:ast});
        ast = ast[0]; // Compile the first def only

        // Create callbacks for each element of the Lidl config file (declared graph transformation stages)
        var autoCallbacks =
        _(Config.graphTransformations)
        .map(x=>[x,function(graph,data){
          self.postMessage({type: 'IntermediateGraph',stage:x,graphSvg:{__html:graphToSvg(graph.toDot())}});
          return true;}])
        .zipObject()
        .value();

        // Add custom callbacks for points we are interested in specifically within the lidl sandbox
        var customCallbacks =
        {
          getJsCode : function(graph,data){
            self.postMessage({type: 'GeneratedJs',js:data,cleanJs:beautify(data.source)});
            let trace = Runner.run(data,JSON.parse(m.scenario));
            self.postMessage({type: 'Trace',traceAst:trace,trace:beautify(JSON.stringify(trace))});
            return true;
          },
          getExpandedLidlCode : function(graph,data){
            self.postMessage({type: 'ExpandedLidl',code:data.source});
            return true;
          },
          getInteractionMetrics : function(graph,data){
            self.postMessage({type: 'InteractionMetrics',metrics:data.metrics});
            return true;
          },
          error : function(graph,data){
            autoCallbacks.error(graph,data);
            self.postMessage({type: 'Error',error:data.error.message,message:'Error'});
            return true;
          }
        };

        var callbacks = _.assign(_.clone(autoCallbacks),customCallbacks);

        var header = m.header;

        Compiler.compile(ast,header,callbacks);

        break;

        case 'RunScenario':
          let trace = Runner.run(m.js,JSON.parse(m.scenario));
          self.postMessage({type: 'Trace',traceAst:trace,trace:beautify(JSON.stringify(trace))});
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
