var React = require('react');
var FixedDataTable = require('fixed-data-table');

var _ = require('lodash');
var ROWS = 1000000;

var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var FakerDataList=require('./FakerDataList.js');
var key='dorra';


class TraceViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state={dataList: new FakerDataList(ROWS,this.props.listOfValues)}; // probleme this.props.listOfValues pas définit

  }

  _rowGetter(index){
      return this.state.dataList.getObjectAt(index);
  }




  render() {
    var listOfAtoms = this.props.listOfAtoms;
    var listOfValues=this.props.listOfValues;

    return (


      <div className="TraceViewer">


      <Table
      rowHeight={30}
      groupHeaderHeight={30}
      headerHeight={30}
      rowGetter={this._rowGetter.bind(this)}
      rowsCount={1}
      width={650}
      height={300}
      scrollTop={0}
      scrollLeft={0}
      overflowX={"auto"}
      overflowY={"auto"}>

      {listOfAtoms.map(function(x) {
         return  (
        <ColumnGroup fixed={true} label={x.name}>
           <Column   fixed={true} label={x.data.name} dataKey={x.name} width={150} />
           <Column   fixed={true} label={x.direction} dataKey={"d"+x.name} width={150} />
        </ColumnGroup>
      );

      })}

    </Table>

      </div>
    );
  }

}

TraceViewer.propTypes = {listOfAtoms:React.PropTypes.array,scenario:React.PropTypes.array,};

TraceViewer.defaultProps =  {listOfAtoms:[],scenario:[]};
module.exports = TraceViewer;




    // En JS, deux notations equivalentes :
    //    a.x
    //    a["x"]
    // Ca permet de faire
    //    a["coucou dorra"]
    // a.coucou dorra     /!\ marche pas

    // Pour chaque interface atomique contenue dans this.props.listOfAtoms


    //console.log(tab[0].x);
/*    _.forEach(
      this.props.listOfAtoms,
      function(x){
        res[x.name] = tab[0].x ;/*  Recuperer la valeur de la cellule dans la index-ème cellule de this.props.scenario  */
    /*  }
    )

    return res[index];
*/
