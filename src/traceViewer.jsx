var React = require('react');
var FixedDataTable = require('fixed-data-table');


var _ = require('lodash');
var ROWS = 1000000;

var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var rowNumber=0;
// var FakerDataList = require('./FakerDataList.js');

var scenarioUtils=require('./scenario.js');

//console.log("length ",scenarioLength);
function testxxxx(){
  console.log("bobobobbobobobobobobo");
}

class TraceViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableWidth: this.props.tableWidth,
      tableHeight: this.props.tableHeight,
      tableRowNumber:0
    };
// this.state = {
//   dataList: this._dataListGetter()
// }; // probleme this.props.listOfValues pas définit

  }

  componentDidMount() {
    this._updateSize();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize.bind(this), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize.bind(this));
    } else {
      win.onresize = this._onResize.bind(this);
    }
  }

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._updateSize.bind(this), 16);
  }

  _updateSize() {
    var win = window;
    this.setState({
      tableWidth: win.innerWidth / 2,
      tableHeight: win.innerHeight
    });
  }




//   _dataListGetter() {
//
//     var listOfAtoms = [
//       {
//         "name": "main.a.e",
//         "data": {
//           "type": "DataAtomic",
//           "name": "Number"
//         },
//         "direction": "in"
//       }, {
//         "name": "main.b.c.d",
//         "data": {
//           "type": "DataAtomic",
//           "name": "Number"
//         },
//         "direction": "in"
//       }
//     ];
//     var listOfValues = [
//       [
//         {
//           "key": "main.a.e",
//           "value": 2
//         }, {
//           "key": "main.b.c.d",
//           "value": 5
//         }
//       ], [
//         {
//           "key": "main.a.e",
//           "value": 1
//         }
//       ], [
//         {
//           "key": "main.a.e",
//           "value": 0
//         }, {
//           "key": "main.b.c.d",
//           "value": -5
//         }
//       ], [], [
//         {
//           "key": "main.b.c.d",
//           "value": 10
//         }
//       ]
//     ];
//     var res = [];
//
//     for (var i = 0; i < listOfValues.length; i++) {
//       var ligne = [];
// //console.log("i ", i);
//       if (listOfValues[i].length == 0) {
//         for (var j = 0; j < listOfAtoms.length; j++) {
//           ligne[j] = '-';
//         }
//       } else {
//         for (var j = 0; j < listOfAtoms.length; j++) {
//
//           var k = 0;
// //console.log("j =",j);
// //console.log("listOfAtoms[j].name ",listOfAtoms[j].name);
// //console.log("listOfValues[i][k].key ",listOfValues[i][k].key);
// //console.log("taille de listOfValues[i].length =",listOfValues[i].length);
//
//           while (((listOfValues[i][k].key) != listOfAtoms[j].name) && (k < listOfValues[i].length)) {
// //console.log("k= ",k);
// //console.log("slama2 =",listOfValues[i][k].key);
//             k++;
// //console.log("k2 =",k);
//             if (k == listOfValues[i].length) {
//               break;
//             }
//           }
//
//           if (k < listOfValues[i].length) {
// //console.log("slama =",listOfValues[i][k].key);
//             ligne[j] = listOfValues[i][k].value;
// //console.log("ligne ",ligne) ;//
//
//           } else {
//             ligne[j] = '-';
//           }
//         }
//       }
//       res[res.length] = ligne;
// //console.log("resultat final =",JSON.stringify(res));
//
//     }
//     console.log ("dataList", JSON.stringify(res));
//     return res;
//   }

  _rowGetter(index) {
    var prefix = "main";
    var row = this.props.scenario[index];
    return scenarioUtils.flattenElement(row,prefix);
  }


backward(){
    if(rowNumber>0){
      rowNumber=rowNumber-1;
    }
    this.setState({tableRowNumber:rowNumber});
}

forward(){
    if(rowNumber<this.props.scenario.length){
      rowNumber=rowNumber+1;
    }
    this.setState({tableRowNumber:rowNumber});

}
fastBackward(){
    rowNumber=0;
    this.setState({tableRowNumber:rowNumber});
}
fastForward(){
    rowNumber=this.props.scenario.length;
    this.setState({tableRowNumber:rowNumber});
  }



  render() {

    var controlledScrolling = this.props.left !== undefined || this.props.top !== undefined;

    var listOfAtoms = this.props.listOfAtoms;



    return (
      <div className="TraceViewer">

        <Table groupHeaderHeight={30} headerHeight={30} height={this.state.tableHeight} width={this.state.tableWidth} overflowX={controlledScrolling ? "hidden" : "auto"} overflowY={controlledScrolling ? "hidden" : "auto"} rowGetter={this._rowGetter.bind(this)} rowHeight={30} rowsCount={this.state.tableRowNumber} scrollLeft={this.props.left} scrollTop={this.props.top}>

          {listOfAtoms.map(function(x) {
            return (
          <ColumnGroup key={x.name} fixed={true} label={x.name}>
            <Column dataKey={x.name} fixed={true} label={x.data.name + " " + x.direction} width={150}/>
          </ColumnGroup>
          ); })}

        </Table>
        <div class="list-item">
        <i class="fa fa-backward"></i>
          <i className="fa fa-fast-backward" onClick={this.fastBackward.bind(this)}></i>
          <i className="fa fa-backward" onClick={this.backward.bind(this)}></i>
          <i className="fa fa-forward" onClick={this.forward.bind(this)}></i>
          <i className="fa fa-fast-forward" onClick={this.fastForward.bind(this)}></i>
        </div>

      </div>


    );
  }

}
TraceViewer.propTypes = {
  listOfAtoms: React.PropTypes.array,
  scenario: React.PropTypes.array,
  onContentDimensionsChange: React.PropTypes.func,
  left: React.PropTypes.number,
  top: React.PropTypes.number
};

TraceViewer.defaultProps = {
  listOfAtoms: [],
  scenario: [],
  tableWidth: 500,
  tableHeight: 500
};
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
