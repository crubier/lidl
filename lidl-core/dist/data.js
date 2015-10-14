var _ = require('lodash');

// Lodash polyfill for object array intersection
function intersectionObjects2(a, b, areEqualFunction) {
    var results = [];

    for(var i = 0; i < a.length; i++) {
        var aElement = a[i];
        var existsInB = _.any(b, function(bElement) { return areEqualFunction(bElement, aElement); });
        if(existsInB) {
            results.push(aElement);
        }
    }

    return results;
}

_.intersectionObjects = function() {
    var results = arguments[0];
    var lastArgument = arguments[arguments.length - 1];
    var arrayCount = arguments.length;
    var areEqualFunction = _.isEqual;
    if(typeof lastArgument === "function") {
        areEqualFunction = lastArgument;
        arrayCount--;
    }
    for(var i = 1; i < arrayCount ; i++) {
        var array = arguments[i];
        results = intersectionObjects2(results, array, areEqualFunction);
        if(results.length === 0) break;
    }
    return results;
};
////////////////////////////////////////////////////////////////////

var isValidData = function(theData) {
  if (theData.hasOwnProperty("type")) {
    switch (theData.type) {
      case "DataAtomic":
        return theData.hasOwnProperty("name");
      case "DataArray":
        return theData.hasOwnProperty("element")?isValidData(theData.element):false;
      case "DataComposite":
        return theData.hasOwnProperty("element")?(_.every(_.map(theData.element,"value"),isValidData)):false;
      case "DataFunction":
        return theData.hasOwnProperty("domain")?(isValidData(theData.domain) && (theData.hasOwnProperty("codomain")?isValidData(theData.codomain):false)):false;
      case "DataOperation":
        // return theData.hasOwnProperty("operand")?(_.every(_.map(theData.operand,function(x){console.log(x);return _.map(x.element,function(y){console.log(y);return computeData(y.value);});})),isValidData):false;
        return theData.hasOwnProperty("operand")?isValidData(computeData(theData)):false;
      default:
        return false;
    }
  } else {
    return false;
  }
};

var computeData = function(theData) {
  if(theData.type==="DataOperation") {
    switch  (theData.operator) {
      case 'union' :
        if(_.every(theData.operand,"type","DataComposite")) {
          return {
            type:"DataComposite",
            element:_.sortBy(_.unique(_.union.apply(null,_.map(theData.operand,"element")),"key"),"key")
          };
        }
        else {
          throw new Error("Arguments of the union data operator can only be composite data");
        }
        break;
      case 'intersection':
        if(_.every(theData.operand,"type","DataComposite")) {
          return {
            type:"DataComposite",
            element:_.sortBy(_.unique(_.intersectionObjects.apply(null,_.map(theData.operand,"element")),"key"),"key")
          };
        }
        else {
          throw new Error("Arguments of the intersection data operator can only be composite data");
        }
        break;
      case 'complement':
        //TODO
        break;
      default:
        throw new Error("Unknown data operator");
    }
  }
  return theData;
};


var compareData = function(data1, data2) {
  switch (data1.type + data2.type) {
    case "DataAtomicDataAtomic":
      // Compare the name
      return data1.name === data2.name;
    case "DataArrayDataArray":
      // Compare the type of the array elements
      return compareData(data1.element, data2.element);
    case "DataCompositeDataComposite":
      // Compare the set of keys
      if(_.isEmpty(_.xor(_.map(data1.element,"key"), _.map(data2.element,"key")))) {
        // If same set of keys, compare type of elements
        return _.reduce(
          _.zip(_.sortBy(data1.element,"key"),_.sortBy(data2.element,"key")),
          function(result,element,n){
            return result && compareData(element[0].value,element[1].value);
          },
          true
        );
      } else {
        return false;
      }
      break;
    case "DataFunctionDataFunction":
      return compareData(data1.codomain, data2.codomain) && compareData(data1.domain, data2.domain);
    default:
      if(data1.type === "DataOperation" || data2.type === "DataOperation"){
        return compareData(computeData(data1), computeData(data2));
      }
      else {
        return false;
      }
  }
};


module.exports = {
  compare:compareData,
  compute:computeData,
  isValid:isValidData
};
