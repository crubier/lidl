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
/ _ 'import' _ filename:[^`]* _ {return parse(fs.readFileSync(filename.join(''),{encoding:'utf8'}));}

interactionDefinition 'an interaction definition'
= _ 'interaction' _ signature:interactionSignature  _ definitions:(_ 'with' _ definitions:definitions {return definitions;})? _'is' _ interaction:interaction  _ {
  var res = {
    type:'Definition',
    interaction:interaction,
    signature:signature,
    definitions:(definitions===null?[]:definitions),
    meta:{location:location(),options:options}
  };
  var arrayLength = res.definitions.length;
  for (var i = 0; i < arrayLength; i++) {
    res.definitions[i].parent = res;
  }
  return res;
}

interactionSignature 'an interaction interactionSignature specification'
= '('  elements:interactionSignatureElement*  ')' _ ':' _ interfac:interfac { var temp = mergeSignature(elements);return {type:'InteractionSignature',interfac:interfac,formating:temp.operator,operator:temp.operator.replace(
//  /[ \t\r\n]*\$[ \t\r\n]*/g,"$"
 /[ \t\r\n]*/g,""
),operand:temp.operand,meta:{location:location(),options:options}};}

interactionSignatureElement 'a interactionSignature element'
= operator:operatorIdentifier {return {operator:operator};}
/ '(' _ name:variableIdentifier _':'_ interfac:interfac _ ')' {return {operand:{type:'InteractionSignatureOperandElement',interfac:interfac,name:name,meta:{location:location(),options:options}}};}

interaction 'an interaction'
//= '('lang:language   '`' val:[^`]* '`)'  {return {type:'InteractionNative',language:lang,code:esprima.parse(val.join(''))};}
/// '(' elements:interactionElement* _ ')' {var temp=  mergeExpression(elements);return {type:'InteractionSimple',operator:temp.operator,operand:temp.operand};}
= '(' elements:interactionElement* _ ')' {var temp=  mergeExpression(elements);return {type:'InteractionSimple',formating:temp.operator,operator:temp.operator.replace(
//  /[ \t\r\n]*\$[ \t\r\n]*/g,"$"
 /[ \t\r\n]*/g,""
),operand:temp.operand,meta:{location:location(),options:options}};}

interactionElement 'an interaction element'
= operand:interaction {return {operand:operand};}
/ operator:operatorIdentifier {return {operator:operator};}

//language 'the name of a supported programming language'
//= 'js' / 'es6' / 'javascript' / 'c' / 'c++'


////////////////////////////////////////////////////////////////////////////////
// Interface specifications

interfac 'the specification of an interfac'
= interfaceAtomic / interfaceComposite / interfaceOperation

interfaceOperation 'the specification of an interfac using operators'
= operator:interfaceOperator _ '(' _ first:interfac rest:(_',' _ content:interfac {return content;})* _')' { return {type:"InterfaceOperation",operator:operator,operand:mergeElements(first,rest),meta:{location:location(),options:options}}}

interfaceOperator 'an interfac operator (conjugation,globalisation,localisation,reception,emission,union,intersection,complement)'
= 'conjugation' / 'globalisation' / 'localisation' / 'reception' / 'emission' / 'union' / 'intersection' / 'complement'

interfaceAtomic 'the specification of an atomic interfac'
= data:data _ direction:direction {return {type:'InterfaceAtomic',data:data,direction:direction,meta:{location:location(),options:options}};}

interfaceComposite 'the specification of a composite interfac'
= '{' _ first:(key:keyIdentifier _ ':' _ value:interfac {return {type:'InterfaceCompositeElement',key:key,value:value,meta:{location:location(),options:options}}}) _ rest:(',' _ content:(key:keyIdentifier _ ':' _ value:interfac {return {type:'InterfaceCompositeElement',key:key,value:value,meta:{location:location(),options:options}}}) _ {return content;})* '}' {return {type:'InterfaceComposite',element:mergeElements(first,rest),meta:{location:location(),options:options}};}

direction 'the direction of a data flow'
= 'out' / 'in' / 'ref'

////////////////////////////////////////////////////////////////////////////////
// Data Types specifications

data 'the specification of a data type'
= dataAtomic / dataComposite / dataArray / dataFunction / dataOperation

dataOperation 'the specification of an data type using operators'
= operator:dataOperator _ '(' _ first:data rest:(_',' _ content:data {return content;})* _')' { return {type:"DataOperation",operator:operator,operand:mergeElements(first,rest),meta:{location:location(),options:options}}}

dataOperator 'an data type operator (union,intersection,complement)'
= 'union' / 'intersection' / 'complement'

dataAtomic 'the specification of an atomic data type'
= name:dataIdentifier {return {type:'DataAtomic',name:name,meta:{location:location(),options:options}}}

dataComposite 'the specification of a composite data type'
= '{' _ first:(key:keyIdentifier _ ':' _ value:data {return {type:'DataCompositeElement',key:key,value:value,meta:{location:location(),options:options}}}) _ rest:(',' _ content:(key:keyIdentifier _ ':' _ value:data {return {type:'DataCompositeElement',key:key,value:value,meta:{location:location(),options:options}}}) _ {return content;})* '}' {return {type:'DataComposite',element:mergeElements(first,rest),meta:{location:location(),options:options}};}

dataArray 'the specification of an array type'
= '[' _ element:data _ ']' {return {type:'DataArray',element:element,meta:{location:location(),options:options}};}

dataFunction 'the specification of a function type'
= '{' _ domain:data _ ('→'/'->') _ codomain:data _'}'{return {type:'DataFunction',domain:domain,codomain:codomain,meta:{location:location(),options:options}};}



////////////////////////////////////////////////////////////////////////////////
// Literals and leaves of the AST

operatorIdentifier 'an operator identifier'
/*= val:[^ \t\r\n$\(\)]+ { return val.join(''); }*/
= val:[^\(\)]+ { return val.join(''); }

interfaceIdentifier 'an interfac identifier'
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
