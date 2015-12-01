import React, {
  PropTypes,
  Component
}
from 'react';
import lidl from 'lidl-core';
import _ from 'lodash';
import CircularProgress  from 'material-ui/lib/circular-progress'


var brace  = require('brace');
var AceEditor  = require('react-ace');

require('brace/mode/text');
require('brace/theme/chrome');

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

  constructor(props) {
    super(props);
  }

  static propTypes = {
    expandedLidlAst: React.PropTypes.object,
    expandedLidl:React.PropTypes.string
  };

  render() {
    if(this.props.expandedLidlAst === null) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else {
      // console.log(this.props.expandedLidl);
      let interaction = this.props.expandedLidlAst.interaction
      var nbrPrevious = nbrOfPrevious(interaction);
      var nbrIdentifiers = nbrOfIdentifiers(interaction);
      var nbrFunctions = nbrOfFunctions(interaction);
      var nbrCompositions = nbrOfCompositions(interaction);
      return (
        <div>
<p> {
          "Number of previous :" + nbrPrevious
        } </p> <p> {
          "Number of identifiers :" + nbrIdentifiers
        } </p> <p> {
          "Number of functions :" + nbrFunctions
        } </p> <p> {
          "Number of compositions :" + nbrCompositions
        } </p> <p> {
          "Number of variables :" + (nbrPrevious + nbrIdentifiers)
        } </p> <p> {
          "Total interactions :" + (nbrCompositions + nbrFunctions + nbrPrevious + nbrIdentifiers)
        } </p>
        <p> {
                  "Expanded LIDL Code :"
                } </p>
        <AceEditor
                mode="text"
                theme="chrome"
                width="100%"
                value={(this.props.expandedLidl===null)?"":this.props.expandedLidl}
                readOnly={true}
                name="analysisAce"
                showPrintMargin={false}
                wrapEnabled={true}
                showGutter={true}

                editorProps={{$blockScrolling: true,$useWrapMode:true}}
              />

</div>
      );
    }


  }
}
