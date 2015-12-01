import React, {
  PropTypes,
  Component
}
from 'react';

import Table from '../Table/Table';


export default class TraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if ( this.props.traceAst ===null) {
      return  <div><p>Nothing yet</p></div>;
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
