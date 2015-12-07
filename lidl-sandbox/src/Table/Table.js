"use strict";
import React, {
  PropTypes,
  Component
}
from 'react';
import _ from 'lodash'

//TODO fix this because it replaces all null substrings, and stuff
function display(obj) {
  return JSON.stringify(obj).replace(/"lidl_active_value"/g,'active').replace(/"([^"*])":/g,'$1:').replace(/null/g,'inactive');
}

export default class Table extends Component {

  constructor(props){
    super(props);
  }

  static  propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string
  };

  static defaultProps= {
    className: 'simple-table'
  };


  render(){
    let columns = _.map(this.props.columns,column=>{
      if (_.isString( column)){
        return (<th key={column}>{column}</th>);
      } else {
        return (<th key={column.displayName}>{column.displayName}</th>);
      }
    });
    let that = this;
    let body = _.map(this.props.data,(rowData,i)=>{
      let row = [];
      _.forEach(that.props.columns,(column, colIndex)=>{
        if (_.isString( column)) {
          row.push(<td key={i + "-" + column}>{display(_.get(rowData, column))}</td>);
        } else if (_.isString(column.path)) {
          row.push(<td key={i + "-" + column.path}>{display(_.get(rowData, column.path))}</td>);
        } else if (_.isFunction(column.func)){
          row.push(<td key={i + "-" + colIndex}>{display(column.func(rowData))}</td>);
        }
      });
      return (<tr key={i}>{row}</tr>);
    });
    return (
      <table {...this.props} className={this.props.className}>
        <thead key="thead">
          <tr>{columns}</tr>
        </thead>
        <tbody key="tbody">{body}</tbody>
      </table>
    );
  }
}
