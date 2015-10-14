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

////////////////////////////////////////////////////////////////////////////////

// High level elements
//TODO

start
= _ definitions:definitions _ {return definitions;}

definitions 'a list of definitions'
= _ content:content* _ {return flatten(content);}

content 'a definition or an import statement'
= _ definition:interactionDefinition {return [definition];}
/ _ 'import' _ package:[^`]* _ {return parse(fs.readFileSync(filename.join(''),{encoding:'utf8'}));}

interactionDefinition 'an interaction definition'
= _ 'interaction' _ signature:interactionSignature  _ definitions:(_ 'with' _ definitions:definitions {return definitions;})? _'is' _ interaction:interaction  _ {
  var res = {
    type:'Definition',
    interaction:interaction,
    signature:signature,
    definitions:(definitions===null?[]:definitions)
  };
  var arrayLength = res.definitions.length;
  for (var i = 0; i < arrayLength; i++) {
    res.definitions[i].parent = res;
  }
  return res;
}

interactionSignature 'an interaction interactionSignature specification'
= '('  elements:interactionSignatureElement* _ ')' _ ':' _ interface:interface { var temp = mergeSignature(elements);return {type:'Signature',interface:interface,operator:temp.operator,operand:temp.operand};}

interactionSignatureElement 'a interactionSignature element'
= _ operator:operatorIdentifier {return {operator:operator};}
/ _ '(' _ name:variableIdentifier _':'_ interface:interface _ ')' {return {operand:{interface:interface,name:name}};}

interaction 'an interaction'
//= '('lang:language   '`' val:[^`]* '`)'  {return {type:'InteractionNative',language:lang,code:esprima.parse(val.join(''))};}
/// '(' elements:interactionElement* _ ')' {var temp=  mergeExpression(elements);return {type:'InteractionSimple',operator:temp.operator,operand:temp.operand};}
= '(' elements:interactionElement* _ ')' {var temp=  mergeExpression(elements);return {type:'InteractionSimple',operator:temp.operator,operand:temp.operand};}

interactionElement 'an interaction element'
= _ operand:interaction {return {operand:operand};}
/ _ operator:operatorIdentifier {return {operator:operator};}

//language 'the name of a supported programming language'
//= 'js' / 'es6' / 'javascript' / 'c' / 'c++'


////////////////////////////////////////////////////////////////////////////////
// Interface specifications

interface 'the specification of an interface'
= interfaceAtomic / interfaceComposite / interfaceOperation

interfaceOperation 'the specification of an interface using operators'
= operator:interfaceOperator _ '(' _ first:interface rest:(_',' _ content:interface {return content;})* _')' { return {type:"InterfaceOperation",operator:operator,operand:mergeElements(first,rest)}}

interfaceOperator 'an interface operator (conjugation,globalisation,localisation,reception,emission,union,intersection,complement)'
= 'conjugation' / 'globalisation' / 'localisation' / 'reception' / 'emission' / 'union' / 'intersection' / 'complement'

interfaceAtomic 'the specification of an atomic interface'
= data:data _ direction:direction {return {type:'InterfaceAtomic',data:data,direction:direction};}

interfaceComposite 'the specification of a composite interface'
= '{' _ first:(key:keyIdentifier _ ':' _ value:interface {return {type:'InterfaceCompositeElement',key:key,value:value}}) _ rest:(',' _ content:(key:keyIdentifier _ ':' _ value:interface {return {type:'InterfaceCompositeElement',key:key,value:value}}) _ {return content;})* '}' {return {type:'InterfaceComposite',element:mergeElements(first,rest)};}

direction 'the direction of a data flow'
= 'out' / 'in' / 'ref'

////////////////////////////////////////////////////////////////////////////////
// Data Types specifications

data 'the specification of a data type'
= dataAtomic / dataComposite / dataArray / dataFunction / dataOperation

dataOperation 'the specification of an data type using operators'
= operator:dataOperator _ '(' _ first:data rest:(_',' _ content:data {return content;})* _')' { return {type:"DataOperation",operator:operator,operand:mergeElements(first,rest)}}

dataOperator 'an data type operator (union,intersection,complement)'
= 'union' / 'intersection' / 'complement'

dataAtomic 'the specification of an atomic data type'
= name:dataIdentifier {return {type:'DataAtomic',name:name}}

dataComposite 'the specification of a composite data type'
= '{' _ first:(key:keyIdentifier _ ':' _ value:data {return {type:'DataCompositeElement',key:key,value:value}}) _ rest:(',' _ content:(key:keyIdentifier _ ':' _ value:data {return {type:'DataCompositeElement',key:key,value:value}}) _ {return content;})* '}' {return {type:'DataComposite',element:mergeElements(first,rest)};}

dataArray 'the specification of an array type'
= '[' _ element:data _ ']' {return {type:'DataArray',element:element};}

dataFunction 'the specification of a function type'
= '(' _ domain:data _ ('→'/'->') _ codomain:data _')'{return {type:'DataFunction',domain:domain,codomain:codomain};}



////////////////////////////////////////////////////////////////////////////////
// Literals and leaves of the AST

operatorIdentifier 'an operator identifier'
= val:[^ \t\r\n$\(\)]+ { return val.join(''); }

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

////////////////////////////////////////////////////////////////////////////////
