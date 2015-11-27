var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

function gexport(graph,filename){

  if(graph.type==='internal') {
    fs.writeFileSync('/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.dot', graph.toInternalDot(), {encoding: 'utf8'});
        exec("dot " + '/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.dot' + " -o" +'/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.pdf'+ " -Tpdf", null);
  } else {
    fs.writeFileSync('/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.dot', graph.toDot(), {encoding: 'utf8'});
          exec("dot " + '/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.dot' + " -o" +'/Users/vincent/Code/lidl/LIDL/lidl-core/example/'+filename+'.pdf'+ " -Tpdf", null);

  }
}

module.exports = gexport;
