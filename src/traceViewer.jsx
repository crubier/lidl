var React = require('react');
var FixedDataTable = require('fixed-data-table');

var _ = require('lodash');
var ROWS = 1000000;

var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var FakerDataList=require('./FakerDataList.js');
var ZyngaScroller = require('./ZyngaScroller.js');
var TouchableArea = require('./TouchableArea.js');
var cloneWithProps = require('react/lib/cloneWithProps');
var PropTypes = React.PropTypes;


function isTouchDevice() {
  return 'ontouchstart' in document.documentElement // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10
};

class TraceViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state={dataList: new FakerDataList(ROWS,this.props.listOfValues),left: 0,top: 0,contentHeight: 0,contentWidth: 0}; // probleme this.props.listOfValues pas définit

  }
/*
  componentWillMount() {
    this.scroller = new ZyngaScroller(this._handleScroll);
  }*/


  _rowGetter(index){
      return this.state.dataList.getObjectAt(index);
  }




  render() {
    /*
    if (!isTouchDevice()) {
      return cloneWithProps(this.props.children, {
        tableHeight: this.props.tableHeight,
        tableWidth: this.props.tableWidth,
      });
    }

    var example = cloneWithProps(this.props.children, {
      onContentDimensionsChange: this._onContentDimensionsChange,
      left: this.state.left,
      top: this.state.top,
      tableHeight: this.props.tableHeight,
      tableWidth: this.props.tableWidth,
    });*/


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


  _onContentDimensionsChange(contentHeight, contentWidth) {
    this.scroller.setDimensions(
      this.props.tableWidth,
      this.props.tableHeight,
      contentWidth,
      contentHeight
    );
  }

  _handleScroll(left, top) {
    this.setState({
      left: left,
      top: top
    });
  }

}

TraceViewer.propTypes = {listOfAtoms:React.PropTypes.array,scenario:React.PropTypes.array,tableWidth: React.PropTypes.number.isRequired,
    tableHeight: React.PropTypes.number.isRequired,};

TraceViewer.defaultProps =  {listOfAtoms:[],scenario:[],tableWidth: 500,tableHeight: 500};
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
