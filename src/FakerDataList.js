class FakeObjectDataListStore {
  constructor(/*number*/ size){
    this.size = size || 2000;
    this._cache = [];
  }

  createFakeRowObjectData(/*number*/ index,resultat) /*object*/ {
    return {
      'main.a.e':resultat[index][0],  // il faut savoir obtenir dynamiquement les  datakey de chaque colonne
      'main.b.c.d':resultat[index][1],
    };
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

module.exports = FakeObjectDataListStore;
