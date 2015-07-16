var React = require('react');
var FixedDataTable = require('fixed-data-table');

var _ = require('lodash');
var ROWS = 1000000;

var Column = FixedDataTable.Column;

var ColumnGroup = FixedDataTable.ColumnGroup;
var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var FakerDataList=require('./FakerDataList.js');




class TraceViewer extends React.Component {


    constructor(props) {
      super(props);
      this.state={dataList: this._dataListGetter()}; // probleme this.props.listOfValues pas définit

    }

  _dataListGetter(){


   var listOfAtoms = [{"name":"main.a.e","data":{"type":"DataAtomic","name":"Number"},"direction":"in"},{"name":"main.b.c.d","data":{"type":"DataAtomic","name":"Number"},"direction":"in"}];
   var listOfValues=[[{"key":"main.a.e","value":2},{"key":"main.b.c.d","value":5}],[{"key":"main.a.e","value":1}],[{"key":"main.a.e","value":0},{"key":"main.b.c.d","value":-5}], [],[{"key":"main.b.c.d","value":10}]];
   var res=[];
   for(var i=0;i<listOfValues.length;i++){
     var ligne=[];
     //console.log("i ", i);
     if(listOfValues[i].length==0){
       for(var j=0;j<listOfAtoms.length;j++){
         ligne[j]='-';
       }
     }else{
     for(var j=0;j<listOfAtoms.length;j++){



       var k=0;
       //console.log("j =",j);
       //console.log("listOfAtoms[j].name ",listOfAtoms[j].name);
       //console.log("listOfValues[i][k].key ",listOfValues[i][k].key);
       //console.log("taille de listOfValues[i].length =",listOfValues[i].length);

       while(((listOfValues[i][k].key)!=listOfAtoms[j].name)&&(k<listOfValues[i].length)){
         //console.log("k= ",k);
         //console.log("slama2 =",listOfValues[i][k].key);
         k++;
         //console.log("k2 =",k);
         if(k==listOfValues[i].length){
           break;
         }
       }




       if (k<listOfValues[i].length){
         //console.log("slama =",listOfValues[i][k].key);
         ligne[j]=listOfValues[i][k].value;
         //console.log("ligne ",ligne) ;//

       }else{
         ligne[j]='-';
       }
     }
   }
     res[res.length]=ligne;
     //console.log("resultat final =",JSON.stringify(res));

   }
 console.log ("dataList" ,JSON.stringify(res));
 return res;
}






  _rowGetter(index){
      var ligne =this.state.dataList[index];


        return {0:ligne[0],1:ligne[1]};//this.state.dataList[index];

  }




  render() {


    var controlledScrolling =
      this.props.left !== undefined || this.props.top !== undefined;

    var listOfAtoms = this.props.listOfAtoms;
    var listOfValues=this.props.listOfValues;
    var key=-1;

    return (


      <div className="TraceViewer">


      <Table
      rowHeight={30}
      groupHeaderHeight={30}
      headerHeight={30}
      rowGetter={this._rowGetter.bind(this)}
      rowsCount={this.state.dataList.length}
      width={650}
      height={this.props.tableHeight}
      scrollTop={this.props.top}
      scrollLeft={this.props.left}
      overflowX={controlledScrolling ? "hidden" : "auto"}
      overflowY={controlledScrolling ? "hidden" : "auto"}>




      {listOfAtoms.map(function(x) {
        key++;
         return  (
        <ColumnGroup fixed={true} label={x.name}>
           <Column   fixed={true} label={x.data.name} dataKey={key} width={150} />
           <Column   fixed={true} label={x.direction} dataKey={x.name} width={150} />
        </ColumnGroup>
      );



      })}



    </Table>

      </div>
    );
  }




}

TraceViewer.propTypes = {listOfAtoms:React.PropTypes.array,scenario:React.PropTypes.array,onContentDimensionsChange: React.PropTypes.func,left: React.PropTypes.number,top: React.PropTypes.number};

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
