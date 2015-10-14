var escodegen = require('escodegen');

function serialize(object) {
  switch (object.type) {
    case 'InteractionSimple':
      return serializeInteractionSimple(object);
    case 'InteractionNative':
      return serializeInteractionNative(object);
    default:
      throw new Error('Cannot serialize '+object.type);
  }
}

// Interaction
function serializeInteractionSimple(object) {
  var list = object.operator.split("$");
  var res = '(';
  res = res + list[0];
  for(var i = 1;i<list.length;i++) {
      res = res + serialize(object.operand[i-1]);
      res = res + list[i];
  }
  res = res +')';
  return res;
}

function serializeInteractionNative(object) {
  return "("+object.language+"`"+escodegen.generate(object.code,{format:{newline:'',space:'',indent:{style:''}}})+"`)";
}

module.exports.serialize = serialize;



// default escodegen options
// {
//         format: {
//             indent: {
//                 style: '    ',
//                 base: 0,
//                 adjustMultilineComment: false
//             },
//             newline: '\n',
//             space: ' ',
//             json: false,
//             renumber: false,
//             hexadecimal: false,
//             quotes: 'single',
//             escapeless: false,
//             compact: false,
//             parentheses: true,
//             semicolons: true,
//             safeConcatenation: false
//         },
//         moz: {
//             starlessGenerator: false,
//             parenthesizedComprehensionBlock: false,
//             comprehensionExpressionStartsWithAssignment: false
//         },
//         parse: null,
//         comment: false,
//         sourceMap: undefined,
//         sourceMapRoot: null,
//         sourceMapWithCode: false,
//         file: undefined,
//         sourceContent: originalSource,
//         directive: false,
//         verbatim: undefined
//     }
