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
 <p> {_.isNull(this.props.lidlCodeError)?"No error":this.props.lidlCodeError.message} </p>
</div>);

  }
}
