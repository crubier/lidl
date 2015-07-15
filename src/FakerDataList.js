
class FakerDataList {
  constructor( size){
    this.size = size || 2000;
    this._cache = [];
    this.listOfValues=[[{"key":"main.a.e","value":2},{"key":"main.b.c.d","value":5}],[{"key":"main.a.e","value":1}]];
    console.log("coucou ",JSON.stringify([[{"key":"main.a.e","value":2},{"key":"main.b.c.d","value":5}],[{"key":"main.a.e","value":1}]]));
    }


  createFakeRowObjectData( index) {

      for (var i=0;i<this.listOfValues.length;i++){
        var  ligne=this.listOfValues[i];
        {ligne.map(function(x){
            return  (
              x["key"]=x["value"]
            );

         })}



      }


  }

  getObjectAt( index) {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this._cache[index] === undefined) {
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
