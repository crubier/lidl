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
    this.state={dataList: new FakerDataList(ROWS)};
  }


/*
  _rowGetter(index){


   var listOfAtoms = this.props.listOfAtoms;
   var listOfValues=this.props.listOfValues;
   console.log("verif =",JSON.stringify(listOfValues));
   var res=[];
   for(var i=0;i<listOfValues.length;i++){
     var ligne=[];
     console.log("i ", i);
     for(var j=0;j<listOfAtoms.length;j++){
       var k=0;
       console.log("j =",j);
       console.log("listOfAtoms[j].name ",listOfAtoms[j].name);
       console.log("listOfValues[i][k].key ",listOfValues[i][k].key);
       console.log("taille de listOfValues[i].length =",listOfValues[i].length);

       while(((listOfValues[i][k].key)!=listOfAtoms[j].name)&&(k<listOfValues[i].length)){
         console.log("k= ",k);
         console.log("slama2 =",listOfValues[i][k].key);
         k++;
         console.log("k2 =",k);
         if(k==listOfValues[i].length){
           break;
         }
       }




       if (k<listOfValues[i].length){
         console.log("slama =",listOfValues[i][k].key);
         ligne[j]=listOfValues[i][k].value;
         console.log("ligne ",ligne) ;//

       }else{
         ligne[j]='-';
       }
     }
     res[res.length]=ligne;
     console.log("resultat final =",JSON.stringify(res));

   }




 return res[index];
}
*/
/*

getInitialState() {

 return {
   dataList: new FakerDataList(ROWS)

 }

}

*/
_rowGetter(index){

    return this.state.dataList.getObjectAt(index);
  }

  render() {
    var listOfAtoms = this.props.listOfAtoms;
    var listOfValues=this.props.listOfValues;

    {listOfAtoms.map(function(x) {
      //console.log(x.name);
      //console.log(x.data.name);
      //console.log(x.direction);
    })}

    //console.log("dorra= ",JSON.stringify(listOfAtoms)) ;
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
