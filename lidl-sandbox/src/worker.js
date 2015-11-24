var Lidl = require('lidl-core');



module.exports = function (self) {
    self.addEventListener('message',function (ev){
        switch(ev.data.type) {
          case 'compile':
            try{
              self.postMessage({type:'compilationResult',partialSource:Lidl.compiler.compileToJs(ev.data.code,ev.data.header).partialSource});
            } catch (e) {
              self.postMessage({type:'error',message:e});
            }
            break;
        }

    });
};
