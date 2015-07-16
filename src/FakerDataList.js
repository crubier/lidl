var _ = require('lodash');
var dorra =[[{"key":"main.a.e","value":2},{"key":"main.b.c.d","value":5}],[{"key":"main.a.e","value":1}]];
class FakerDataList {
  constructor( size){
    this.size = size || 2000;
    this._cache = [];
    this.listOfValues=dorra;
    console.log("cou ",JSON.stringify(this.listOfValues));
    }


  createFakeRowObjectData( index) {

    /*
      for (var i=0;i<this.listOfValues.length;i++){


        var  ligne=this.listOfValues[i];

        _.forEach(ligne, function(x) {

          return  (
            x["key"]:x.value  // problème ici
          );
        });




      }*/

      return {
      1: index,
      2: index+1,
      3: index+2,
      4: index+3,

    };


  }

  getObjectAt( index) {
    if (index < 0 || index > this.size){
      console.log("undefined");
      return undefined;
    }
    if (this._cache[index] === undefined) {
      console.log("createFakeRowObjectData");
      this._cache[index] = this.createFakeRowObjectData(index);
    }
    return this._cache[index];
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll() {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}

module.exports = FakerDataList;
