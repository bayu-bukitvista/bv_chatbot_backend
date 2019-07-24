'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

//GET API
exports.getArrivalList = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "Select u.unit_name, b.booking_guest_name, b.booking_check_in, ";
        csQuery = csQuery + "b.booking_check_out, b.booking_guest_eta, gcs.status_description, ";
        csQuery = csQuery + "pf.profile_name, ch.channel_desc ";
        csQuery = csQuery + "from owner as o ";
        csQuery = csQuery + "right outer join property as pr on o.property_name = pr.property_name ";
        csQuery = csQuery + "right outer join unit as u on u.property_id = pr.property_id ";
        csQuery = csQuery + "right outer join listing as ls on ls.unit_id = u.unit_id ";
        csQuery = csQuery + "right outer join profile as pf on pf.profile_id = ls.profile_id ";
        csQuery = csQuery + "right outer join booking as b on b.listing_id = ls.listing_id ";
        csQuery = csQuery + "right outer join guest_checkin_status as gcs on gcs.status_code = b.booking_guest_status ";
        csQuery = csQuery + "left outer join channel as ch on ch.channel_code = b.booking_comm_channel ";
        csQuery = csQuery + "where 1 = 1 ";

        if (csSearchReq.owner_name) {
            csQuery += " And o.owner_name = '" + csSearchReq.owner_name + "'";
        }
        if (csSearchReq.booking_start_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') >= '" + csSearchReq.booking_start_date + "'";
        }
        if (csSearchReq.booking_end_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') <= '" + csSearchReq.booking_end_date + "'";
        }

        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};

//GET API
exports.getOwnerProperty = function (req, res) {
    var csID = req.params.id;
    var query = "Select distinct o.property_name from property as pr inner join owner as o where o.owner_name = '" + csID + "'";
    dbbase.executequery(req, res, query);
};


//POST API
exports.getGraphDetails = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "Select b.booking_status, b.booking_id, b.booking_guest_name, b.booking_check_in, ";
        csQuery = csQuery + "b.booking_check_out, datediff(b.booking_check_out, b.booking_check_in) as nights, ";
        csQuery = csQuery + "l.listing_name, pr.property_name, l.account_dest, p.payout_currency, b.created_at, b.booking_currency, ";
        csQuery = csQuery + "p.payout_amount, ppt.type_desc, b.booking_earned, p.payout_id, pf.profile_name, pr.property_id ";
        csQuery = csQuery + "from payout as p ";
        csQuery = csQuery + "inner join booking as b on b.booking_id = p.booking_id ";
        csQuery = csQuery + "inner join listing as l on l.listing_id = b.listing_id ";
        csQuery = csQuery + "inner join profile as pf on pf.profile_id = l.profile_id ";
        csQuery = csQuery + "inner join unit as u on l.unit_id = u.unit_id ";
        csQuery = csQuery + "inner join property as pr on pr.property_id = u.property_id ";
        csQuery = csQuery + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
        csQuery = csQuery + "right join owner as o on o.property_name = pr.property_name ";
        csQuery = csQuery + "where 1 = 1 ";

        if (csSearchReq.owner_name) {
            csQuery += " And o.owner_name = '" + csSearchReq.owner_name + "'";
        }
        if (csSearchReq.booking_start_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') >= '" + csSearchReq.booking_start_date + "'";
        }
        if (csSearchReq.booking_end_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') <= '" + csSearchReq.booking_end_date + "'";
        }
        csQuery = csQuery + " order by DATE_FORMAT(b.booking_check_in, '%Y%m%d') DESC, b.booking_id";
        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};