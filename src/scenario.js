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
  listOfNamesOfInputAtoms =  _.map(iii.interfaces.listOfAtoms(iii.interfaces.receptionInterface(theInterface),prefix),"name");
  listOfElementKeys = _.keys(flattenElement(element,prefix));
  return _.every(listOfElementKeys,function(x){return _.includes(listOfNamesOfInputAtoms,x);});
}

function check(theInterface,theScenario,prefix){
  return _.every(theScenario,function(element){
    return checkElement(theInterface,element,prefix);
  })
}

module.exports.check = check;
module.exports.checkElement = checkElement;
module.exports.flattenElement = flattenElement;
