forEachDoc = function(collection) {
  if(collection) {
    collection.forEach( function(doc) {
      console.log(doc);
    });
  }
}
