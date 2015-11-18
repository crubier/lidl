// // import LIDL from '../lidl-core';
//
// import neo4j from 'neo4j';
//
// // console.log("trouduc");
//
// // LIDL.compiler.compileToJs("ok");
//
// // console.log("bouzouk");
//
//
// // var neo4j = require('neo4j');
//
//   var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');
//
//
//   console.log(db);
//
//   function callback(err,results){console.log(results);}
//
//   db.cypher({
//     query:'MATCH (n) RETURN n LIMIT 100',
//     params:{}
//   },callback);

  // var neo4j = require('node-neo4j');

  var neo4j = require('node-neo4j');
  db = new neo4j('http://neo4j:neo4j@localhost:7474');





  db.cypherQuery('MATCH(x:Node:Composition)Return DISTINCT x.operator', function(err, result){
    if(err) throw err;

    console.log(result.data); // delivers an array of query results
    console.log(result.columns); // delivers an array of names of objects getting returned
});







//
//
//
//   var db = new neo4j.GraphDatabase({
//     url:'http://neo4j:neo4j@localhost:7474',
//     auth:{username:'neo4j',password:'neo4j'}
// });
//
//   db.query( 'MATCH (n) RETURN n LIMIT 100',
//       {
//       },
//  function (err, results) {
//       if (err) throw err;
//       var result = results[0]['n'];
//
//
// console.log(JSON.stringify(result));
//       //
//       // if (!result) {
//       //     console.log('No user found.');
//       // } else {
//       //     console.log(JSON.stringify(result));
//       // }
//   });
