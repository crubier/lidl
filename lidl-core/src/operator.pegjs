{
  var fs = require('fs');

  var resolver = options.resolver;

  function mergeExpression(elements) {
    var res = {operator:'',operand:[]};
    for(var i=0;i<elements.length;i++) {
      if( elements[i].operand!==undefined && elements[i].operand!==null ) {
        res.operand.push(elements[i].operand);
        res.operator = res.operator + '$';
      }
      if( elements[i].operator!==undefined && elements[i].operator!==null ) {
        res.operator = res.operator + elements[i].operator;
      }
    }
    return res;
  }

  function mergeSignature(elements) {
    var res = {operator:'',operand:[]};
    for(var i=0;i<elements.length;i++) {
      if( elements[i].operand!==undefined && elements[i].operand!==null ) {
        res.operand.push(elements[i].operand);
        res.operator = res.operator + '$';
      }
      if( elements[i].operator!==undefined && elements[i].operator!==null ) {
        res.operator = res.operator + elements[i].operator;
      }
    }
    return res;
  }

  function mergeElements(first,rest) {
    var res=[];
    if(rest!==undefined && rest!==null){
      res=rest;
    }
    res.unshift(first);
    return res;
  }

  function flatten(table) {
    var res=[];
    for(var i=0;i<table.length;i++){
      res = res.concat(table[i]);
    }
    return res;
  }
}
// High level elements

start
= composition  /  behaviour / affectation/ previous / identifier / functionApplication / function  / activation / boolean / number / text / custom / void

composition 'a composition interaction'
= _ '{' _ (key:keyIdentifier _':'_'$'_ (',' _)? )* '}' _ {return "Composition";}

behaviour 'a behaviour interaction'
= _ '$' _ 'with'_ 'behaviour' _ '$' _ {return "Behaviour";}

previous 'a previous interaction'
= _ 'get' _ '$' _ 'from' _ 'previous' _ 'and' _ 'set' _ '$' _ 'for' _ 'next' _ {return "Previous";}
/ _ '$' _ '=' _ 'previous' _ '$' _ {return "Previous";}
/ _ 'next' _'$' _ '=' _  '$' _ {return "Previous";}

functionApplication 'a function application interaction'
= _ 'apply' _ '$' _ 'to' _ '$' _ 'and' _ 'get' _ '$' _ {return "FunctionApplication";}
/ _ '$' _ '$' _ '=' _ '$' _ {return "FunctionApplication";}

affectation ''
= _ '$' _ '=' _ '$' _ {return "Affectation";}

identifier 'an identifier interaction'
= _ 'variable' _ (identifier:operatorIdentifier)? _ ('$' _ (identifier:operatorIdentifier)? _ )* _ {return "Identifier";}
/ _ '#' _ (identifier:operatorIdentifier)? _ ('$' _ (identifier:operatorIdentifier)? _ )* _ {return "Identifier";}

function 'a function'
= _ 'function' _ (identifier:functionIdentifier) _ {return "Function";}


activation 'an activation'
= _ ('active'/'inactive') _ {return "Activation";}

boolean 'a boolean'
= _ ('true'/'false') _ {return "Boolean";}

number 'a number'
/*= _ [0-9]*('.'[0-9]*)?  _ {return "Number";}*/
= _ [0-9] _ {return "Number";}

text 'a text'
= _ '"' [^\"]* '"'  _  {return "Text";}


void 'the void interaction'
= _ {return "Void";}




custom 'a non basic interaction'
= _ [^ \t\r\n_\(\)]+ _ {return "Custom";}



////////////////////////////////////////////////////////////////////////////////
// Literals and leaves of the AST

operatorIdentifier 'an operator identifier'
= val:[^ \t\r\n$\(\)\`]+ { return val.join(''); }

interfaceIdentifier 'an interface identifier'
= first:[A-Z] rest:[a-zA-Z0-9]* { return mergeElements(first,rest).join(''); }

dataIdentifier 'a data identifier'
= first:[A-Z] rest:[a-zA-Z0-9]* { return mergeElements(first,rest).join(''); }

variableIdentifier 'a variable identifier'
= first:[a-z] rest:[a-zA-Z0-9]* { return mergeElements(first,rest).join(''); }

keyIdentifier 'a key identifier'
= first:[a-z0-9] rest:[a-zA-Z0-9]* { return mergeElements(first,rest).join(''); }

functionIdentifier 'a C-compatible function identifier'
= first:[a-zA-Z_] rest:[a-zA-Z0-9_]* { return mergeElements(first,rest).join(''); }

_ 'white space'
= [ \t\r\n]*
