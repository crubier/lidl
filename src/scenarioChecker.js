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

  key=_.keys(res);
  values= _.values(res);
  values=_.map(values, function(n) { return n.toLowerCase(); });

 for( var i=0;i<scenario.length;i++){

  scenarioVar =_.keys(scenario[i]);
  console.log("scenarioVar ", scenarioVar);
  scenarioVar=_.map(scenarioVar, function(n) { return prefix+"."+ n; });
   console.log("keys = ",scenarioVar);
   scenarioVal=_.values(scenario[i]);
   console.log("scenarioVal ", scenarioVal);
   console.log("scenarioVar.length ", scenarioVar.length);
   for(var j=0;j<scenarioVal.length;j++){
     console.log("rentrer dans la boucle for");
     listOfAtomicInterfaces(scenarioVal[j],scenarioVar, prefix,j);


  }
  console.log(scenarioVar);
  console.log(scenarioVal);



  var filtered =_.filter(scenarioVar, function(item) {
    return _.contains(key, item);
  });
  var difference=_.difference(scenarioVar, filtered);
  if(difference.length!=0){
    test=false;
 }
}

  if (test==false){
    throw new scenarioInvalidException.ScenarioInvalidException("Scenario Invalid");
  }
}



function listOfAtomicInterfaces(scenarioVal,scenarioVar, prefix,indice) {
  console.log("prefix ", prefix);
  console.log("scenarioVar.length", scenarioVar);
  var tailleScenarioVar=scenarioVar.length;
  switch (typeof scenarioVal) {

    case "object":
      console.log("cas objet");
      var key = _.keys(scenarioVal);
        console.log("key ",key);
      var value=_.values(scenarioVal);
        console.log("value ", value);
        console.log("indice ",indice);
      prefix=scenarioVar[indice]    ;  //scenariovar est une seule case
        console.log("nouveau prefix ", prefix);
      key=_.map(key, function(n) { return prefix+"."+ n; });  //main.a.c
      console.log("nouveau key ", key);
      scenarioVar[indice]=key[0];
      console.log("scenarioVar.length", scenarioVar.length);
      console.log("nouveauo scenarioVar ", scenarioVar);
      scenarioVal=value[0];
      console.log("nouveau scenarioVal", scenarioVal);
      listOfAtomicInterfaces(scenarioVal,scenarioVar, prefix,indice);
      return {scenarioVar,scenarioVal};

       break;
    default:
    console.log("cas simple");
    console.log("nouveau scenarioVar", scenarioVar);
      return scenarioVar;
      break;
  }
}





module.exports.check = check;
