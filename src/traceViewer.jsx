var React = require('react');
var FixedDataTable = require('fixed-data-table');

var _ = require('lodash');


var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;



class TraceViewer extends React.Component {
  _rowGetter(index){
    var listOfAtoms = this.props.listOfAtoms;

    // En JS, deux notations equivalentes :
    //    a.x
    //    a["x"]
    // Ca permet de faire
    //    a["coucou dorra"]
    // a.coucou dorra     /!\ marche pas

    // Pour chaque interface atomique contenue dans this.props.listOfAtoms

    var res = {};
    _.forEach(
      this.props.listOfAtoms,
      function(x){
        res[x.name] = 0 ;/* TODO Recuperer la valeur de la cellule dans la index-ème cellule de this.props.scenario  */
      }
    )

    return res;

}



  render() {
    var listOfAtoms = this.props.listOfAtoms;

    {listOfAtoms.map(function(x) {
      console.log(x.name);
      console.log(x.data.name);
      console.log(x.direction);
    })}

    console.log("dorra= ",JSON.stringify(listOfAtoms)) ;
    var compteur =0;
    return (


      <div className="TraceViewer">


      <Table
      rowHeight={30}
      groupHeaderHeight={30}
      headerHeight={30}
      rowGetter={this._rowGetter}    /* TODO  rowGetter={this._rowGetter.bind(this)}*/
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

TraceViewer.propTypes = {listOfAtoms:React.PropTypes.array,scenario:React.PropTypes.array};

TraceViewer.defaultProps =  {listOfAtoms:[],scenario:[]};
module.exports = TraceViewer;
