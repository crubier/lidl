import React, {
  PropTypes,
  Component
}
from 'react';
import lidl from 'lidl';
import _ from 'lodash';


function nbrOfPrevious(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfPrevious(x);
  });
  if (lidl.operator.parse(interaction.operator) === "Previous") {
    total++;
  }
  return total;
}

function nbrOfIdentifiers(interaction) {
  function listOfIdentifiers(a) {
    var list = [];
    _.forEach(a.operand, function(x) {
      list.push(listOfIdentifiers(x));
    });
    if (lidl.operator.parse(a.operator) === "Identifier") {
      list.push(a.operator);
    }
    return list;
  }
  return _.uniq(_.flattenDeep(listOfIdentifiers(interaction))).length;
}

function nbrOfFunctions(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfFunctions(x);
  });
  if (lidl.operator.parse(interaction.operator) === "Function") {
    total++;
  }
  return total;
}

function nbrOfCompositions(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfCompositions(x);
  });
  if (lidl.operator.parse(interaction.operator) === "Composition") {
    total++;
  }
  return total;
}

export default class Analysis extends Component {
   static propTypes = {
     compiledInteraction: React.PropTypes.string,
   };

   static defaultProps = {
     compiledInteraction: "({x:(previous(#0)),y:(#0),z:(#1)})",
   };

  render() {
    var interaction = lidl.parser.parse(this.props.compiledInteraction, {
      startRule: "interaction"
    });
    var nbrPrevious = nbrOfPrevious(interaction);
    var nbrIdentifiers = nbrOfIdentifiers(interaction);
    var nbrFunctions = nbrOfFunctions(interaction);
    var nbrCompositions = nbrOfCompositions(interaction);
    return (

      <div>
        <h1> Analysis </h1>
        <p> {this.props.compiledInteraction} </p>
        <p> {"Number of previous :" + nbrPrevious} </p>
        <p> {"Number of identifiers :" + nbrIdentifiers} </p>
        <p> {"Number of functions :" + nbrFunctions} </p>
        <p> {"Number of compositions :" + nbrCompositions} </p>
        <p> {"Number of variables :" + (nbrPrevious + nbrIdentifiers)} </p>
        <p> {"Total of interactions :" + (nbrCompositions + nbrFunctions + nbrPrevious + nbrIdentifiers)} </p>
      </div>
    );
  }
}
