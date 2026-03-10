"use strict"

var _ = require('lodash');
var beautify = require('js-beautify').js_beautify;
var viz = require('viz.js');


var Lidl = require('lidl-core');
var Compiler = Lidl.graphCompiler;
var Parser = Lidl.parser;
var Serializer = Lidl.serializer;
var Runner = Lidl.runner;
var Config = Lidl.config;
var Graph = Lidl.graph;




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


      case 'RenderGraph':
        // Need :
        //   m.lidl      : string      LIDL code
        //   m.header    : string      header js code
        //   m.scenario  : string      header js code

        function dotToSvg(dot) {
          let rawres = viz(dot, {
            format: 'svg',
            engine: 'dot'
          });
          let offset = rawres.search('<svg');
          rawres = rawres.substring(offset);
          rawres = rawres.replace(/(width="[^"]+pt")/g, 'width="100%"');
          rawres = rawres.replace(/(height="[^"]+pt")/g, 'height="100%"');
          return rawres;
        }

        try {
          var graph = new Graph(m.graph.nodes,m.graph.edges);
          self.postMessage({
            type: 'RenderedGraph',
            data:m.data,
            graphSvg: {
              __html: dotToSvg(graph.toDot())
            }
          });
        } finally {
          self.close();
        }

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
