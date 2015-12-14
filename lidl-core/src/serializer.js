// var escodegen = require('escodegen');
import _ from 'lodash';

function serialize(object,indentation) {
  if(_.isUndefined(object))return "?";
  var indent;
  if(! _.isFinite(indentation)){indent=0;}else {indent=indentation;}
  switch (object.type) {
    case 'InteractionSimple':
      return serializeInteractionSimple(object,indent);
    case 'InteractionNative':
      return serializeInteractionNative(object,indent);
    case 'InteractionDefinition':
      //TODO Proper
      return serialize(object.interaction,indent);
    case 'InteractionSignature':
      return serializeInteractionSignatureSimpleRow(object,indent);
    case 'InteractionSignatureOperandElement':
      return '('+ object.name+': '+serialize(object.interfac)+')';
    case 'InterfaceAtomic':
      return serialize(object.data)+ " "+object.direction;
    case 'InterfaceNamed':
      return object.name;
    case 'InterfaceComposite':
      return '{' + _(object.element).map(x=>(x.key + ": "+serialize(x.value))).join(', ') +'}';
    case 'DataAtomic':
      return object.name;
    case 'DataComposite':
      return '{' + _(object.element).map(x=>(x.key + ": "+serialize(x.value))).join(', ') +'}';
    case 'DataFunction':
      return '{' +serialize(object.domain) + ' -> '+serialize(object.codomain)+'}';
    case 'DataArray':
      return  '['+serialize(object.element)+']' ;
    default:
      throw new Error('Cannot serialize '+object.type);
  }
}


var indentString = '  ';
// Interaction
function serializeInteractionSimple(object,indentation) {
    var r = serializeInteractionSimpleRow(object);
    if(r.length> 80) {
      r = serializeInteractionSimpleNeat(object,indentation);
    }
    return r;
}

function serializeInteractionSimpleRow(object) {
    if(object.operand.length ===0) {
      return '('+ object.operator + ')';
    } else {
      var list = object.operator.split("$");
      var res = '(';
      res = res +list[0];
      for(var i = 1;i<list.length;i++) {
          res = res + serializeInteractionSimpleRow(object.operand[i-1]);
          res = res +list[i];
      }
      res = res +')';
      return res;
    }
}

function serializeInteractionSimpleNeat(object,indentation) {
    let baseIndent = _.repeat(indentString,indentation);
    let nextIndent = baseIndent+indentString;
    if(object.operand.length ===0) {
      return '\n'+baseIndent+'('+ object.operator + ')'
    } else {

      var list = object.operator.split("$");
      var res = '(\n'+baseIndent;
      res = res + ((list[0].length===0)?"":(indentString+list[0]+'\n'+baseIndent));
      for(var i = 1;i<list.length;i++) {
          res = res + indentString+serialize(object.operand[i-1],indentation+1)+'\n'+baseIndent;
          res = res + ((list[i].length===0)?"":(indentString+list[i]+'\n'+baseIndent));
      }
      res = res +')';
      return res;

    }

}


function serializeInteractionSignatureSimpleRow(object,indent) {
    if(object.operand.length ===0) {
      return '('+ object.operator + ')';
    } else {
      var list = object.operator.split("$");
      var res = '(';
      res = res +list[0];
      for(var i = 1;i<list.length;i++) {
          res = res + serialize(object.operand[i-1]);
          res = res +list[i];
      }
      res = res +')';
      return res;
    }
}







// function serializeInteractionNative(object) {
//   return "("+object.language+"`"+escodegen.generate(object.code,{format:{newline:'',space:'',indent:{style:''}}})+"`)";
// }

module.exports.serialize = serialize;
module.exports.serializeInteractionSimpleRow=serializeInteractionSimpleRow;


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
