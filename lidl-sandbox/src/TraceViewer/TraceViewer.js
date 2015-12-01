import React, {
  PropTypes,
  Component
}
from 'react';

import Table from '../Table/Table';
import _ from 'lodash';

import CircularProgress  from 'material-ui/lib/circular-progress'

export default class TraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if ( this.props.traceAst ===null || this.props.traceAst.length <1 ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {






    return (<div style={{width:"100%"}}>

    <Table style={{width:"100%"}} columns={[
{"displayName": 'z', "path": 'args.z'},
            {"displayName": 'interface.theNumber', "path": 'inter.theNumber'},
{"displayName": 'interface.theResult', "path": 'inter.theResult'}
          ]} data={this.props.traceAst} />


    </div>);}
  }
}
