'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

exports.getlistinglist = function (req, res) {
    var query = "select * from listing";
    dbbase.executequery(req, res, query);
}

exports.searchlisting = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var query = "Select * from listing where 1 = 1 ";
        if (csSearchReq.listing_id) {
            query += "And listing_id = '" + csSearchReq.listing_id + "'";
        }
        if (csSearchReq.listing_name) {
            query += "And listing_name = '" + csSearchReq.listing_name + "'";
        }
        dbbase.executequery(req, res, query);
    }
    else {
        console.log("Wrong Data !");
        res.send("Wrong Data !");
    }
}

exports.searchlistingId = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq && Object.keys(csSearchReq).length != 0) {
        var query = "Select ls.listing_id, ls.listing_name from listing as ls ";
        query = query + "inner join profile as pf on ls.profile_id = pf.profile_id ";
        query = query + "inner join unit as ut on ls.unit_id = ut.unit_id ";
        query = query + "inner join property as pr on ut.property_id = pr.property_id ";
        query = query + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
        query = query + "inner join area as ar on pr.area_id = ar.area_id where 1 = 1 And ls.listing_status = 1 ";
        if (csSearchReq.area_name) {
            query += "And ar.area_name like '%" + csSearchReq.area_name + "%'";
        }
        if (csSearchReq.listing_name) {
            query += "And ls.listing_name like '%" + csSearchReq.listing_name + "%'";
        }
        if (csSearchReq.property_type) {
            query += "And ppt.type_desc like '%" + csSearchReq.property_type + "%'";
        }
        dbbase.executequery(req, res, query);
    }
    else {
        console.log("Wrong Data !");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
}

exports.searchContactInfo = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq && Object.keys(csSearchReq).length != 0) {
        var query = "Select pf.profile_name, pf.profile_email from listing as ls ";
        query = query + "inner join profile as pf on ls.profile_id = pf.profile_id ";
        query = query + "where 1 = 1 And ls.listing_id = '" + csSearchReq.listing_id + "'";
        dbbase.executequery(req, res, query);
    }
    else {
        console.log("Wrong Data !");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
}