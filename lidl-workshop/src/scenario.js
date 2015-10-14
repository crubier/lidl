var _ = require('lodash');
var iii = require('iii');

function flattenElement(element, prefix) {
  if (element !== null && typeof element === 'object') {


    return _.merge.apply(this, _.flatten(_.map(_.mapKeys(element, function(value, key) {
      return prefix + "." + key;
    }), flattenElement)));

  } else {
    var res = {};
    res[prefix] = element;
    return res;
  }
}

function checkElement(theInterface,element, prefix){

  var listOfAtoms=iii.interfaces.listOfAtoms(theInterface,"main");
   _.remove(listOfAtoms, function(n) {
    return n.direction=="out";
  });
  listOfNamesOfInputAtoms = listOfAtoms;
  listOfElementKeys = _.keys(flattenElement(element,prefix));
  listOfNamesOfInputAtoms=_.map(listOfNamesOfInputAtoms,function(n){
    return n.name;
  });
  return _.map(listOfElementKeys,function(x){
    return _.includes(listOfNamesOfInputAtoms,x);});
}

function check(theInterface,theScenario,prefix){

  return _.map(theScenario,function(element){
    return checkElement(theInterface,element,prefix);
  })
}

module.exports.check = check;
module.exports.checkElement = checkElement;
module.exports.flattenElement = flattenElement;
