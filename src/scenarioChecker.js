var _ = require('lodash');
var iii = require('iii');
var scenarioInvalidException=require('./ScenarioInvalidException.js');

/*
TODO

Fonction qui verifie que un scenario est valide par rapport a une list
*/
function check(modelCode, scenario, prefix) {
  test=true;
  var listOfAtoms=iii.interfaces.listOfAtoms(modelCode,"main");
  res=[];
  for( var i=0;i<listOfAtoms.length;i++){
    if(listOfAtoms[i].direction=='in'){
      res[listOfAtoms[i].name]=listOfAtoms[i].data.name;
    }
  }

  //console.log(res["main.a"]);
  key=_.keys(res);
  values= _.values(res);
  values=_.map(values, function(n) { return n.toLowerCase(); });


 for( var i=0;i<scenario.length;i++){
   scenarioVar =_.keys(scenario[i]);
   scenarioVal=_.values(scenario[i]);
   scenarioVar=_.map(scenarioVar, function(n) { return prefix+"."+ n; });



  var filtered =_.filter(scenarioVar, function(item) {
    return _.contains(key, item);
  });
  var difference=_.difference(scenarioVar, filtered);
  if(difference.length!=0){
    test=false;
 }
}
 /*
  _.mapValues(scenario[0], function(x) {   //boucle for
      console.log(x);
  });*/

  //console.log( "_.keys =",_.keys(listOfAtoms));
  /*_.every(scenario, function(x) {

    // utiliser _.keys(object)   pour avoir la liste des clefs d'un objet
    // utiliser une fonction recursive, donc appeller check()
    return true;
  })*/
  if (test==false){
    throw new scenarioInvalidException.ScenarioInvalidException("Scenario Invalid");
  }
}



module.exports.check = check;
