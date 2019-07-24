'use strict';

// Module Dependencies
// -------------------
var mysql = require("mysql");

//var dbConfig = {
//  user: "sa@bukitvistadb",
//  password: "Alok@2357",
//  host: "bukitvistadb.mysql.database.azure.com",
//  database: "bukitvista",
//  ssl: true
//};

//var dbConfig = {
//    user: "bukitvis_jay",
//    password: "jJG8!x5hM6a!",
//    host: "internal.bukitvista.com",
//    database: "bukitvis_bukitvista",
//    ssl: true
//};

var dbConfig = {
    user: "bukitvista",
    password: "InspireDelight2017",
    host: "internal.bukitvista.com",
    database: "bukitvis_bukitvista",
    ssl: true
};

//Function to connect to database and execute query
exports.executequery = function (req, res, csquery) {

  var conn = mysql.createConnection(dbConfig);

  conn.connect(function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.send(err);
    }
    else {
      console.log('Connection done!');
      conn.query(csquery, function (err, result) {
        if (err) {
          console.log("Error while querying database :- " + err);
          res.send(err);
          conn.end();
        }
        else {
          //console.log(result);
          res.send(result);
          conn.end();
        }
      })
    }
  });
}
