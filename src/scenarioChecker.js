var _ = require('lodash');
var iii = require('iii');

/*
TODO

Fonction qui verifie que un scenario est valide par rapport a une list
*/
function check(interface, scenario, prefix) {

  var listOfAtoms = iii.interfaces.listOfAtoms(interface, "main");

  _.every(scenario, function(x) {

    // utiliser _.keys(object)   pour avoir la liste des clefs d'un objet
    // utiliser une fonction recursive, donc appeller check()
    return true;
  })
  return true;
}



module.exports.check = check;
