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
return (<div style={{width:"100%",height:"100%"}}>
{this.props.value.isEmpty()?(<p style={{textAlign:'center',color:'rgb(51, 195, 78)'}}>No problem 👌</p>):this.props.value.map((x,index)=><p key={index}>{x.message}</p>)}
</div>);

  }
}
