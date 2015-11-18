import React, {
  Component,PropTypes
} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Interaction from './Interaction';

import _ from 'lodash';
import Lidl from 'lidl';

let code1="(({\n    actualSpeed:  (theActualSpeed)\n    targetSpeed:  (theTargetSpeed)\n    alarm:        ((theActualSpeed) > (theTargetSpeed))\n    increment:    ((new(theTargetSpeed)) = ((previous(theTargetSpeed)) + (5)))\n    decrement:    ((new(theTargetSpeed)) = ((previous(theTargetSpeed)) - (5)))\n    current:      ((new(theTargetSpeed)) = (round(theActualSpeed) to nearest (5)))\n  })\nwith behaviour\n(all\n((theTargetSpeed) is a flow initially equal to (0))\n((theActualSpeed) = ((theEngine).ActualSpeed))\n(((theEngine).TargetSpeed) = (theTargetSpeed))))";
let code2 = '(({\n  human:({\n    desired:(Label (active) displaying (text(theDesired)) )\n    actual:(Label (active) displaying (text(theActual)) )\n    increment:(Button (active) displaying ("+") trigerring ((new(theDesired))=((previous(theDesired))+(1))))\n    decrement:(Button (active) displaying ("-") trigerring ((new(theDesired))=((previous(theDesired))-(1))))\n    })\n  system:({\n    actual:(theActual)\n    target:(theDesired)\n    })\n  })\nwith behavior\n((theDesired)is a flow💪)\n)'
let defaultCode = Lidl.parser
  .parse(code1, {
    startRule: "interaction"
  });




  // let defaultCode = Lidl.parser
  //   .parse('(lol(bob)(joe)pan)', {
  //     startRule: "interaction"
  //   });

@DragDropContext(HTML5Backend)
export default class BlockCodeEditor extends Component {
  static propTypes = {
    initialCode: PropTypes.object.isRequired
  };

  static defaultProps = {
    initialCode: defaultCode
  };

  state = {
    code: this.props.initialCode
  };

  handleChange(newVal) {
// console.log("change Container : " +JSON.stringify(newVal));
    this.setState({code:newVal});
  }

  /*style={{
    overflow: 'auto',
    display: 'inline-block',
    verticalAlign: 'top'
  }}*/

  render() {
    return (
<div>
<h1> Code </h1>
        <Interaction onChange={this.handleChange.bind(this)} val={this.state.code}/>
</div>

    // <div>
    //       <Interaction name='Glass' />
    //       <Interaction name='Banana' />
    //       <Interaction name='Paper' />
    // </div>
    );
  }
}