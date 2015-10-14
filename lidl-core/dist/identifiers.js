var _ = require('lodash');

var operator = require('./operator.js');
var serializer = require('./serializer.js');
var interactions = require('./interactions.js');

function getIdentifierSetOfInteraction(interaction) {
  switch (interaction.type) {
    case "InteractionSimple":
      return ((operator.parse(interaction.operator) === "Identifier") ?
        ([interaction]) :
        (_.uniq(_.flatten(_.map(interaction.operand, getIdentifierSetOfInteraction)), false, serializer.serialize)));
    case "InteractionNative":
      return [];
    default:
      throw new Error('trying to get identifiers in an invalid interaction');
  }
}

function reduceIdentifiers(interaction, identifierSet) {
  var ids;
  if (identifierSet == undefined) {
    ids = getIdentifierSetOfInteraction(interaction);
  } else {
    ids = identifierSet;
  }
  switch (interaction.type) {
    case "InteractionSimple":
      {
        return (
          (operator.parse(interaction.operator) === "Identifier") ?
          ({
            type: 'InteractionSimple',
            operator: "#" + JSON.stringify(_.findIndex(ids, function(x) {
              return interactions.compare(interaction, x) === 0;
            })),
            operand: []
          }) :
          ({
            type: 'InteractionSimple',
            operator: interaction.operator,
            operand: _.map(interaction.operand, function(x) {
              return reduceIdentifiers(x, ids);
            })
          })
        );
      }
    case "InteractionNative":
      return interaction;
    default:
      throw new Error('trying to reduce identifiers of an invalid interaction');
  }
}

module.exports.getIdentifierSetOfInteraction = getIdentifierSetOfInteraction;
module.exports.reduceIdentifiers = reduceIdentifiers;
