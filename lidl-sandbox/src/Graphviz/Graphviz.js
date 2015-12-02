import React, {
  PropTypes,
  Component
}
from 'react';

import CircularProgress  from 'material-ui/lib/circular-progress'

export default class Graphviz extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if ( this.props.displayGraph ===null ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {
      return (<div style={{textAlign:'center',width:"100%",overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>);
    }
  }
}
