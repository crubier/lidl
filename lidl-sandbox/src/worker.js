var Lidl = require('lidl-core');

var beautify = require('js-beautify').js_beautify;

module.exports = function(self) {
  self.addEventListener('message', function(ev) {











    switch (ev.data.type) {

      case 'compile':
        try {
          var comp = Lidl.compiler.compileToJs(ev.data.code, ev.data.header);
          self.postMessage({
            type: 'compilationResult',
            source: beautify(comp.source, {
              indent_size: 2
            }),
            partialSource: comp.partialSource
          });
        } catch (e) {
          self.postMessage({
            type: 'error',
            message: e
          });
        }
        break;

      case 'parse':
        try {
          var ast = Lidl.parser.parse(ev.data.code);
          self.postMessage({
            type: 'parserResult',
            ast:ast
          });
        } catch (e) {
          self.postMessage({
            type: 'error',
            message: e
          });
        }
        break;
      case 'run':

          try {

            var trans = new Function("data",ev.data.lidlCompiled.transitionFunction);
                var init = new Function("data",ev.data.lidlCompiled.initializationFunction);
                var scenario = ev.data.scenario;
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
                self.postMessage({
                  type: 'runResult',
                  trace:trace
                });

          } catch (e) {
            self.postMessage({
            type: 'error',
            message: e
          });
          }
          break;
    }

  });
};
