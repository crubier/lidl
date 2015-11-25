var Lidl = require('lidl-core');

var beautify = require('js-beautify').js_beautify;

module.exports = function (self) {
    self.addEventListener('message',function (ev){
        switch(ev.data.type) {
          case 'compile':
            try{
              var comp = Lidl.compiler.compileToJs(ev.data.code,ev.data.header);

              self.postMessage({type:'compilationResult',source:beautify(comp.source,{indent_size:2}),partialSource:comp.partialSource});
            } catch (e) {
              self.postMessage({type:'compilationError',message:e});
            }
            break;
        }

    });
};
