'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

printInteractionInstanceNodeStack = printInteractionInstanceNodeStack;var _serializer = require('./serializer');function printInteractionInstanceNodeStack(node) {
  return node.content.meta.stack.map(function (x) {return 'at ' + (0, _serializer.serialize)(x.content) + " (" + x.content.meta.location.start.line + ":" + x.content.meta.location.start.column + ")";}).join('\n');
}