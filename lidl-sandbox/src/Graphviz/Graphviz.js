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
    if ( this.props.displayGraph ===null || this.props.displayGraph ===undefined ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {
      return (<div style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>);
    }
  }
}
