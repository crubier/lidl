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


export default class Analysis extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    expandedLidlAst: React.PropTypes.object,
    expandedLidl:React.PropTypes.string
  };

  render() {
    if(this.props.metrics === null || this.props.metrics === undefined)  {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else {
      // console.log(this.props.expandedLidl);
      // let interaction = this.props.expandedLidlAst.interaction
      // var nbrPrevious = nbrOfPrevious(interaction);
      // var nbrIdentifiers = nbrOfIdentifiers(interaction);
      // var nbrFunctions = nbrOfFunctions(interaction);
      // var nbrCompositions = nbrOfCompositions(interaction);

      var children = _(this.props.metrics).map((x,key)=><p key={key}>{_.startCase(key)+ ": " + x} </p>).value();

      return (
        <div style={{width:"100%",height:"100%"}}> {children} </div>
      );
    }


  }
}
