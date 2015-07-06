var React = require('react');

var FixedDataTable = require('fixed-data-table');
var React = require('react');

var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;



class TraceViewer extends React.Component {
  _rowGetter(index){


      var key1=main.a;
      var key2=main.b;
      return {key1:"dorr",key2:"dorrgast"};

}



  render() {
    var listOfAtoms = this.props.listOfAtoms;
    console.log("dorra= ",JSON.stringify(listOfAtoms)) ;
    var compteur =0;
    return (


      <div className="TraceViewer">


      <Table
      rowHeight={30}
      groupHeaderHeight={30}
      headerHeight={30}
      rowGetter={this._rowGetter}    ////////////////////////////
      rowsCount={1}
      width={650}
      height={300}
      scrollTop={0}
      scrollLeft={0}
      overflowX={"auto"}
      overflowY={"auto"}>

      {listOfAtoms.map(function(x) {
        console.log(x.name);
        compteur++;
         return   <Column   fixed={true} label={x.name} dataKey={x.name} width={150} />;

      })}

    </Table>

      </div>
    );
  }
}

TraceViewer.propTypes = {listOfAtoms:React.PropTypes.array,};

TraceViewer.defaultProps =  {listOfAtoms:[]};
module.exports = TraceViewer;
