import _ from "lodash";

import operator from "./operator";
import * as serializer from "./serializer";
import * as interactions from "./interactions";

export function getIdentifierSetOfInteraction(interaction: any): any[] {
  switch (interaction.type) {
    case "InteractionSimple":
      return operator.parse(interaction.operator) === "Identifier"
        ? [interaction]
        : _.uniqBy(
            _.flatten(
              _.map(interaction.operand, getIdentifierSetOfInteraction),
            ),
            serializer.serializeInteractionSimpleRow,
          );
    case "InteractionNative":
      return [];
    default:
      throw new Error("trying to get identifiers in an invalid interaction");
  }
}

export function reduceIdentifiers(interaction: any, identifierSet?: any[]): any {
  var ids;
  if (identifierSet === undefined) {
    ids = getIdentifierSetOfInteraction(interaction);
    // console.log("===============ids");
    // console.log(ids);
  } else {
    ids = identifierSet;
  }
  switch (interaction.type) {
    case "InteractionSimple": {
      return operator.parse(interaction.operator) === "Identifier"
        ? {
            type: "InteractionSimple",
            operator:
              "variable" +
              _.findIndex(
                ids,
                (x) =>
                  serializer.serializeInteractionSimpleRow(interaction) ===
                  serializer.serializeInteractionSimpleRow(x),
              ),
            operand: [],
          }
        : {
            type: "InteractionSimple",
            operator: interaction.operator,
            operand: _.map(interaction.operand, function (x) {
              return reduceIdentifiers(x, ids);
            }),
          };
    }
    case "InteractionNative":
      return interaction;
    default:
      throw new Error("trying to reduce identifiers of an invalid interaction");
  }
}

