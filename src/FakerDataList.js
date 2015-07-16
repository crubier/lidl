
class FakerDataList {
  constructor( size, listOfValues){
    this.size = size || 2000;
    this._cache = [];
    this.listOfValues=listOfValues;
    console.log("cou ",JSON.stringify(listOfValues));
    }


  createFakeRowObjectData( index) {
      console.log("index ",index);
      console.log("x ",JSON.stringify(this.listOfValues));
      for (var i=0;i<this.listOfValues.length;i++){
        console.log("x ",i);

        var  ligne=this.listOfValues[i];

        _.forEach(ligne, function(x) {

        /*  return  (
            x["key"]:x.value  // problème ici
          );*/
        });




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
