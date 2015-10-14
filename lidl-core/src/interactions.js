var _ = require('lodash');
var operator = require('./operator.js');
var serializer = require('./serializer.js');
var stringify = require('json-stringify-safe');

// get the list of all interaction operators in an interaction expression
function listOfInteractions(theInteraction) {
  switch (theInteraction.type) {
    case "InteractionSimple":
      var res = [theInteraction.operator];
      var i;
      for (i = 0; i < theInteraction.operand.length; i++) {
        res = _.union(res, listOfInteractions(theInteraction.operand[i]));
      }
      return res;
    case "InteractionNative":
      return [theInteraction.lang + '`' + '<code>' + '`'];
    default:
      throw "Trying to get the list of interactions of something which is not an interaction expression";
  }
}

// Fully expand an interaction definition into a composition of base interactions
function expand(interactionDefinition) {

  var definitions = _.map(interactionDefinition.definitions, expand);

  var interactionDefinitionWithChildrenExpanded = {
    type: "Definition",
    interaction: interactionDefinition.interaction,
    signature: interactionDefinition.signature,
    definitions: definitions,
    parent: interactionDefinition.parent
  };

  var interaction = interactionDefinition.interaction;

  var interactionsToExpandAlongWithTheirMatchingDefinition;

  do {
    interactionsToExpandAlongWithTheirMatchingDefinition =
      _.filter(
        _.map(listNonBaseInteractions(interaction),
          function(x) {
            return {
              interaction: x,
              definition: findMatchingDefinition(x, interactionDefinitionWithChildrenExpanded)
            };
          }),
        function(y) {
          return !isDefinitionOfAnArgument(y.definition) && y.interaction.type==="InteractionSimple";
        });

    // For each of these interactions to expand, we instatiate them
    _.forEach(interactionsToExpandAlongWithTheirMatchingDefinition, function(x) {
      interaction = instantiate(interaction, x.definition);
    });
  } while (interactionsToExpandAlongWithTheirMatchingDefinition.length > 0);

  return {
    type: "Definition",
    interaction: interaction,
    signature: interactionDefinition.signature,
    definitions: definitions,
    parent: interactionDefinition.parent
  };
}


// instantiate an interaction (expand this interaction) using a single definition
function instantiate(interaction, interactionDefinition) {

  switch (interaction.type) {
    case 'InteractionNative':
      {
        // this is a native interaction, no need to instantiate
        return interaction;
      }
    case 'InteractionSimple':
      {
        // maybe we can instatiate
        // if it is an argument, then there is no need to instantiate
        if (isDefinitionOfAnArgument(interactionDefinition)) {
          return interaction;
        } else {
          // First we instantiate the operands
          var instantiatedOperands = _.map(interaction.operand, function(x) {
            return instantiate(x, interactionDefinition);
          });
          // Do we substitute this interaction or not ?
          if (interactionMatchesDefinition(interaction, interactionDefinition)) {
            return _.reduce(
              _.zip(interactionDefinition.signature.operand, instantiatedOperands),
              function(accumulator, value, key, collection) {
                return substituteInInteraction(accumulator, {
                  type: "InteractionSimple",
                  operator: value[0].name,
                  operand: []
                }, value[1]);
              }, _.cloneDeep(interactionDefinition.interaction));
          } else {
            return {
              type: "InteractionSimple",
              operator: interaction.operator,
              operand: instantiatedOperands
            };
          }
        }
      }
    default:
      throw new Error("trying to instantiate an invalid interaction");
  }



}


// Finds the definition that matches an interaction, in the context of an interaction definition
function findMatchingDefinition(interaction, interactionDefinition) {

  // First case : No definition
  if (interactionDefinition == undefined) {
    throw new Error("could not find definition matching interaction " + serializer.serialize(interaction));
  }

  if (interaction.type === 'InteractionNative') {
    return {
      type: "Definition",
      interaction: interaction,
      signature: "function",
      definitions: [],
      parent: null
    };
  }


  // Second case : The interaction definition specifies that it is an argument (not really possible ?)
  if (isDefinitionOfAnArgument(interactionDefinition)) {
    return "Argument";
  }



  // Third case : The interaction is an argument of the definition
  if (_.any(interactionDefinition.signature.operand, "name", interaction.operator)) {
    // return {type:'Definition',interaction:"Argument",signature:{operand:[{"name":interaction.operator}]}}; /* TODO precise this return value*/
    return "Argument"; /* TODO problem is here !*/
  }


  // Fourth case : The interaction is defined within the sub definitions of the definition
  for (var i = 0; i < interactionDefinition.definitions.length; i++) {
    if (interactionMatchesDefinition(interaction, interactionDefinition.definitions[i])) {
      return interactionDefinition.definitions[i];
    }
  }

  // Fifth case: The interaction is defined in the context of the parent definition (the definition is a sub definition of its parent)
  if(interactionDefinition.parent !== undefined)
  return findMatchingDefinition(interaction, interactionDefinition.parent);

  throw new Error("cannot find definition of interaction "+interaction.operator);
}


// Checks if an interaction definition states that an interaction is an argument
function isDefinitionOfAnArgument(definition) {
  // {type:'Definition',interaction:interaction,signature:{type:'Signature',interface:interface,operator:temp.operator,operand:temp.operand},definitions:(definitions===null?[]:definitions)};
  return definition === "Argument";
}


// Check if an interaction matches an InteractionDefinition, simple for the moment, will get more complicated later
function interactionMatchesDefinition(interaction, interactiondefinition) {
  if (isDefinitionOfAnArgument(interactiondefinition)) return true;
  return interaction.operator === interactiondefinition.signature.operator;
}




// Compare two interactions, returns 0 if they are equal
function compare(a, b) {
  if (a.type !== 'InteractionSimple' || b.type !== 'InteractionSimple') {
    if(a.type==="InteractionNative" && b.type === "InteractionNative") {
      return ((_.isEqual(a.code,b.code))?(0):(1));
    }
    return -1;
  }
  if (a.operator > b.operator) {
    return 1;
  } else {
    if (a.operator < b.operator) {
      return -1;
    } else {
      if ((a.operand.length - b.operand.length) !== 0) {
        return (a.operand.length - b.operand.length);
      } else {
        var x = _.zip(a.operand, b.operand);
        var f = _.spread(compare);
        for (var i = 0; i < x.length; i++) {
          var res = f(x[i]);
          if (res !== 0) return res;
        }
        return 0;
      }
    }
  }
}

// Substitute a target interaction with another one in an interaction expression
function substituteInInteraction(theInteraction, target, substitute) {
  switch (theInteraction.type) {
    case 'InteractionNative':
      {
        return theInteraction;
      }
    case 'InteractionSimple':
      {
        if (compare(theInteraction, target) === 0) {
          return _.cloneDeep(substitute);
        } else {
          return {
            type: theInteraction.type,
            operator: theInteraction.operator,
            operand: _.map(theInteraction.operand, function(x) {
              return substituteInInteraction(x, target, substitute);
            })
          };
        }
      }
    default:
      throw new Error('Trying to substitute in an invalid interaction');
  }
}




// Checks if a given interaction is made of only base interactions
function isOnlyMadeOfBaseInteractions(interaction) {
  if (!isBaseInteraction(interaction)) {
    return false;
  } else {
    return _.every(interaction.operand, isOnlyMadeOfBaseInteractions);
  }
}



// Gives a list of non base interactions in an interaction expression
function listNonBaseInteractions(interaction) {
  if (interaction.type === 'InteractionSimple') {
    return (isBaseInteraction(interaction) ? [] : [interaction]).concat(_.flatten(_.map(interaction.operand, listNonBaseInteractions)));
  } else {
    return [];
  }
}

// Checks if a given interaction is a base interaction
function isBaseInteraction(interaction) {
  // console.log(interaction.type + " " + interaction.operator);
  switch (interaction.type) {
    case 'InteractionNative':
      {
        return true;
      }
    case 'InteractionSimple':
      {
        var theOperator = operator.parse(interaction.operator);
        switch (theOperator) {
          case "Composition":
          case "Previous":
          case "FunctionApplication":
          case "Identifier":
          case "Function":
          case "Void":
            return true;
          case "Custom":
            return false;
          default:
            throw new Error('problem parsing interaction operator ' + theOperator);
        }
      }
    default:
      throw new Error('invalid interaction type ' + interaction.type);
  }
}



module.exports.listOfInteractions = listOfInteractions;
module.exports.isBaseInteraction = isBaseInteraction;
module.exports.isOnlyMadeOfBaseInteractions = isOnlyMadeOfBaseInteractions;
module.exports.compare = compare;
module.exports.substituteInInteraction = substituteInInteraction;
module.exports.instantiate = instantiate;
module.exports.interactionMatchesDefinition = interactionMatchesDefinition;
module.exports.expand = expand;
module.exports.findMatchingDefinition = findMatchingDefinition;
module.exports.listNonBaseInteractions = listNonBaseInteractions;
