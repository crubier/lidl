import React, {
  Component, PropTypes
}
from 'react';

import {DragDropContext}from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import Interaction from './Interaction';

import _ from 'lodash';
import lidl from 'lidl-core';

let code1 = "(({\n    actualSpeed:  (theActualSpeed)\n    targetSpeed:  (theTargetSpeed)\n    alarm:        ((theActualSpeed) > (theTargetSpeed))\n    increment:    ((new(theTargetSpeed)) = ((previous(theTargetSpeed)) + (5)))\n    decrement:    ((new(theTargetSpeed)) = ((previous(theTargetSpeed)) - (5)))\n    current:      ((new(theTargetSpeed)) = (round(theActualSpeed) to nearest (5)))\n  })\nwith behaviour\n(all\n((theTargetSpeed) is a flow initially equal to (0))\n((theActualSpeed) = ((theEngine).ActualSpeed))\n(((theEngine).TargetSpeed) = (theTargetSpeed))))";
let code2 = '(({\n  human:({\n    desired:(Label (active) displaying (text(theDesired)) )\n    actual:(Label (active) displaying (text(theActual)) )\n    increment:(Button (active) displaying ("+") trigerring ((new(theDesired))=((previous(theDesired))+(1))))\n    decrement:(Button (active) displaying ("-") trigerring ((new(theDesired))=((previous(theDesired))-(1))))\n    })\n  system:({\n    actual:(theActual)\n    target:(theDesired)\n    })\n  })\nwith behavior\n((theDesired)is a flow💪)\n)'
let defaultCode = lidl.parser
  .parse(code1, {
    startRule: "interaction"
  });


// let defaultCode = lidl.parser
//   .parse('(lol(bob)(joe)pan)', {
//     startRule: "interaction"
//   });

// TODO Use decoration when babel is fixed
// @DragDropContext(HTML5Backend)
// export default class BlockCodeEditor extends Component {
class BlockCodeEditor extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    lidlAst: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    lidlAst: defaultCode
  };

  state = {
    code: this.props.lidlAst
  };

  // handleChange(newVal) {
  //   // console.log("change Container : " +JSON.stringify(newVal));
  //   this.setState({
  //     code: newVal
  //   });
  // }

  /*style={{
    overflow: 'auto',
    display: 'inline-block',
    verticalAlign: 'top'
  }}*/

  render() {
    // console.log(this.props.value[0])
    // TODO here we render only the first interaction : this.state.code[0]
    if(this.props.lidlAst===null) {
return <div><p>Nothing yet</p></div>;
    }else
{
return (
      <div>
        <Interaction onChange = {this.props.onChange} val={this.props.lidlAst[0].interaction}/>
      </div>
    );}
  }
}

export default DragDropContext(HTML5Backend)(BlockCodeEditor)
