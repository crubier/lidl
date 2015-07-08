var _ = require('lodash');
var iii = require('iii');

/*
TODO

Fonction qui verifie que un scenario est valide par rapport a une list
*/
function check(modelCode, scenario, prefix) {

  var listOfAtoms=iii.interfaces.listOfAtoms(modelCode,"main");
  console.log(JSON.stringify(listOfAtoms));
  console.log( "scenarioChecker");
  res=[];
  console.log(listOfAtoms[0].direction=="in");
  for( var i=0;i<listOfAtoms.length;i++){
    if(listOfAtoms[i].direction=='in'){
      res[listOfAtoms[i].name]=listOfAtoms[i].data.name;
    }
  }
  console.log(res["main.a"]);


  _.mapValues(scenario[0], function(x) {   //boucle for
      console.log(x);
  });

  //console.log( "_.keys =",_.keys(listOfAtoms));
  /*_.every(scenario, function(x) {

    // utiliser _.keys(object)   pour avoir la liste des clefs d'un objet
    // utiliser une fonction recursive, donc appeller check()
    return true;
  })
  return true;*/
}



module.exports.check = check;
