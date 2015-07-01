// Pour executer l'exemple :
// node exemple.js

// On require les packages iii et lodash
var iii = require('iii');
var _ = require('lodash');

// Voici une liste de differents exemples de codes source decrivant des interfaces
var sourceCodes = [
  "Number in",
  "Text out",
  "{ a:Number in,b:Number out}",
  "{ x:Number,y:Number} out",
  "{ desired:Dimension out, min:Dimension out,max:Dimension out, actual:Arranging in }",
  "{x:{ a:Text in,b:[Number] out},y:{ a:{x:Number,y:Number} in,b:Number out}}"
];

// Pour chacun de
_.forEach(sourceCodes,function(element){

  // On le parse en utilisant le parser iii qui nous ressort un objet decrivant l'interface
  var interfaceDescription = iii.parser.parse(element,{startRule:"interface"});

  // On affiche le resultat dans la console
  console.log(JSON.stringify(interfaceDescription));

});
