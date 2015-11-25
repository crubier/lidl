import React, {
  PropTypes,
  Component
}
from 'react';

import _ from 'lodash';

export default class ErrorDisplay extends Component {

  constructor(props){
    super(props);
  }

  render() {
return (<div style={{width:"100%"}}>
 <p> {_.isNull(this.props.value)?"No error":this.props.value.message} </p>
</div>);

  }
}
