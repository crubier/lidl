var React = require('react');
var iii = require('iii');
var _ =require('lodash');

function nbrOfPrevious(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfPrevious(x);
  });
  if (iii.operator.parse(interaction.operator) === "Previous") {
    total++;
  }
  return total;
}

function nbrOfIdentifiers(interaction) {
  function listOfIdentifiers(a){
    var list=[];
    _.forEach(a.operand, function(x) {
      list.push(listOfIdentifiers(x));
    });
    if (iii.operator.parse(a.operator) === "Identifier") {
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
  if (iii.operator.parse(interaction.operator) === "Function") {
    total++;
  }
  return total;
}

function nbrOfCompositions(interaction) {
  var total = 0;
  _.forEach(interaction.operand, function(x) {
    total += nbrOfCompositions(x);
  });
  if (iii.operator.parse(interaction.operator) === "Composition") {
    total++;
  }
  return total;
}


class Analyse extends React.Component {
  constructor(props) {
    super(props);
  }

            render() {
              var interaction=iii.parser.parse(this.props.compiledInteraction,{startRule:"interaction"});
              var nbrPrevious=nbrOfPrevious(interaction);
              var nbrIdentifiers=nbrOfIdentifiers(interaction);
              var nbrFunctions=nbrOfFunctions(interaction);
              var nbrCompositions=nbrOfCompositions(interaction);
              return (

                <div className="analyse">
              <p >{this.props.compiledInteraction}</p>
              <p >{ "Number of previous :" + nbrPrevious} </p>
              <p> { "Number of identifiers :" + nbrIdentifiers} </p>
              <p> { "Number of functions :" + nbrFunctions} </p>
              <p> { "Number of compositions :" + nbrCompositions} </p>
              <p> { "Number of variables :" + (nbrPrevious+nbrIdentifiers)} </p>
              <p> { "Total of interactions :" + (nbrCompositions+nbrFunctions+nbrPrevious+nbrIdentifiers)} </p>
                </div>
                  );
                }
                }

            Analyse.propTypes = {
              compiledInteraction:React.PropTypes.string,


            };

            Analyse.defaultProps = {
              compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})",
            };

            module.exports = Analyse;
