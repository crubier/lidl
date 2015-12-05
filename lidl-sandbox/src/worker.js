
"use strict"

var _ = require('lodash');
var beautify = require('js-beautify').js_beautify;
var viz = require('viz.js');


var Lidl = require('lidl-core');
var Compiler= Lidl.graphCompiler;
var Parser= Lidl.parser;
var Runner= Lidl.runner;
var Config= Lidl.config;



function graphToSvg(graph) {
  let rawres = viz(graph,{format:'svg',engine:'dot'});
  let offset = rawres.search('<svg');
  rawres = rawres.substring(offset);
  rawres = rawres.replace(/(width="[^"]+pt")/g, 'width="100%"');
  rawres = rawres.replace(/(height="[^"]+pt")/g, 'height="100%"');
  return rawres;
}


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

        var ast = Parser.parse(m.lidl)[0];
        self.postMessage({type: 'LidlAst',lidlAst:ast});

        // Create callbacks for each element of the Lidl config file (declared graph transformation stages)
        var autoCallbacks =
        _(Config.graphTransformations)
        .map(x=>[x,function(graph,data){
          self.postMessage({type: 'IntermediateGraph',stage:x,graphSvg:graphToSvg(graph)});
          return true;}])
        .zipObject()
        .value();

        // Add custom callbacks for points we are interested in specifically within the lidl sandbox
        var customCallbacks =
        {
          getJsCode : function(graph,data){
            self.postMessage({type: 'GeneratedJs',code:data.code});
            let trace = runner.run(data.code,JSON.parse(m.scenario));
            self.postMessage({type: 'Trace',trace:trace});
            return true;
          },
          getExpandedLidlCode : function(graph,data){
            self.postMessage({type: 'ExpandedLidl',code:data.code});
            return true;
          },
          getInteractionMetrics : function(graph,data){
            self.postMessage({type: 'InteractionMetrics',metrics:data.metrics});
            return true;
          },
          error : function(graph,data){
            autoCallbacks.error(graph,data);
            self.postMessage({type: 'Error',message:'Error'});
            return true;
          }
        };

        var callbacks = _.assign(autoCallbacks,customCallbacks);

        var header = m.header;

        Compiler.compile(ast,header,callbacks);

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
