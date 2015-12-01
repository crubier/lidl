import React, {
  PropTypes,
  Component
}
from 'react';

import lidl from 'lidl-core'

import Table from '../Table/Table'
import _ from 'lodash'

import CircularProgress  from 'material-ui/lib/circular-progress'

export default class TraceViewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if ( this.props.traceAst ===null ||this.props.lidlAst ===null|| this.props.traceAst.length <1 ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {

// Get lists of atoms
let inter= lidl.interfaces.listOfAtoms(this.props.lidlAst[0].signature.interfac,"");
let args= _(this.props.lidlAst[0].signature.operand).map(arg=>lidl.interfaces.listOfAtoms(arg.interfac,arg.name)).flatten().value();
// console.log(inter);
// Transform into correct column spec
let interCols=
_(inter)
.map(x=>({displayName:"interface"+x.name,path: "inter"+x.name,dir:x.direction}))
.value();

let argsCols=
_(args)
.map(x=>({displayName:x.name,path: "args."+x.name,dir:x.direction}))
.value();

let cols = _.sortBy(_.union(interCols,argsCols),'dir');

// console.log(interCols);
// console.log(argsCols);
// console.log(lidl.interfaces.listOfAtoms(args[0].interfac,args[0].name));


    return (<div style={{width:"100%"}}>

    <Table style={{width:"100%"}} columns={cols} data={this.props.traceAst} />


    </div>);}
  }
}
