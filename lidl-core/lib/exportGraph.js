'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



exportGraph;var fs = require('fs');var path = require('path');var exec = require('child_process').exec;function exportGraph(gg, filename) {

    fs.writeFileSync(filename + '.dot', gg, { encoding: 'utf8' });
    exec("dot " + filename + '.dot' + " -o " + filename + '.pdf' + " -Tpdf", null);}