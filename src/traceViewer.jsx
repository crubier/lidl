var React = require('react');

var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;
var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;



class TraceViewer extends React.Component {
  _rowGetter(index){
    return {firstName:"Vincent",lastName:"Lecrubier",companyName:"ONERA",sentence:"Cool"};
  }

  render() {
    return (
      <div className="TraceViewer">
      <Table
      rowHeight={30}
      groupHeaderHeight={30}
      headerHeight={30}
      rowGetter={this._rowGetter}
      rowsCount={1}
      width={600}
      height={300}
      scrollTop={0}
      scrollLeft={0}
      overflowX={"auto"}
      overflowY={"auto"}>


        <Column
          fixed={true}
          dataKey="firstName"
          label="First Name"
          width={150}
        />

        <Column
          fixed={true}
          label="Last Name"
          dataKey="lastName"
          width={150}
        />
        <Column
          label="Company"
          dataKey="companyName"
          flexGrow={1}
          width={150}
        />
        <Column
          label="Sentence"
          dataKey="sentence"
          flexGrow={1}
          width={150}
        />


    </Table>
      </div>
    );
  }
}


module.exports = TraceViewer;
