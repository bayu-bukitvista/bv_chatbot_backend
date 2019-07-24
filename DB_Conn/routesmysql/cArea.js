'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
  res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

//GET API
exports.getarealist = function (req, res) {
  var query = "select * from area";
  dbbase.executequery(req, res, query);
};

//GET API
exports.getareainfo = function (req, res) {
  var csID = req.params.id;
  var query = "select * from area Where area_id = '" + csID + "'";
  dbbase.executequery(req, res, query);
};


//POST API
exports.searcharea = function (req, res) {
  var csSearchReq = req.body;
  console.log(csSearchReq);

  if (csSearchReq) {
    //console.log(oData);

    var csQuery = "select * from area Where 1 = 1";
    // var csID = req.params.id;
    if (csSearchReq.area_id) {
      csQuery += " And area_id = '" + csSearchReq.area_id + "'";
    }
    if (csSearchReq.area_name) {
      csQuery += " And area_name = '" + csSearchReq.area_name + "'";
    }

    dbbase.executequery(req, res, csQuery);
  } else {
    console.log("Wrong Data");
    res.send("Wrong Data");
  }
};



//GET API
//exports.addcuisine = function (req, res) {
//  dbbase.executeSP(res);
//};
