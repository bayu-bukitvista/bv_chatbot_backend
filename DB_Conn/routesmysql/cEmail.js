'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

exports.searchEmailInfo = function (req, res) {
    var csID = req.params.id;
    var query = "Select eo.email_id ";
    query = query + "From booking as b ";
    query = query + "inner join listing as l on b.listing_id = l.listing_id ";
    query = query + "inner join profile as pf on pf.profile_id = l.profile_id ";
    query = query + "inner join unit as u on u.unit_id = l.unit_id ";
    query = query + "inner join property as pr on pr.property_id = u.property_id ";
    query = query + "inner join email_owner as eo on eo.owner_id = pr.owner_id ";
    query = query + "where b.booking_id = '" + csID + "'";
    dbbase.executequery(req, res, query);
}