import React, {
  Component,PropTypes
} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Interaction from './Interaction';

import _ from 'lodash';
import Lidl from 'lidl';

let defaultCode = Lidl.parser
  .parse('(({\n  human:({\n    desired:(Label (active) displaying (text(theDesired)) )\n    actual:(Label (active) displaying (text(theActual)) )\n    increment:(Button (active) displaying ("+") trigerring ((new(theDesired))=((previous(theDesired))+(1))))\n    decrement:(Button (active) displaying ("-") trigerring ((new(theDesired))=((previous(theDesired))-(1))))\n    })\n  system:({\n    actual:(theActual)\n    desired:(theDesired)\n    })\n  })\nwith behavior\n((theDesired)is a flow💪)\n)', {
    startRule: "interaction"
  });

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  static propTypes = {
    code: PropTypes.object.isRequired
  };

  static defaultProps = {
    code: defaultCode
  };

  render() {
    return (

      <div style={{
        'overflow': 'auto',
        'display': 'inline-block'
      }}>
        <Interaction val={this.props.code}/>
      </div>
    // <div>
    //       <Interaction name='Glass' />
    //       <Interaction name='Banana' />
    //       <Interaction name='Paper' />
    // </div>
    );
  }
}
