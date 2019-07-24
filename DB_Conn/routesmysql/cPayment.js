'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

//GET API
exports.getpropertylist = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "Select distinct pr.property_name ";
        csQuery = csQuery + "from property as pr ";
        csQuery = csQuery + "inner join unit as u on pr.property_id = u.property_id ";
        csQuery = csQuery + "inner join listing as l on l.unit_id = u.unit_id ";
        csQuery = csQuery + "inner join booking as b on b.listing_id = l.listing_id ";
        csQuery = csQuery + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
        csQuery = csQuery + "where 1 = 1 ";

        if (csSearchReq.property_type) {
            csQuery += " And ppt.type_desc = '" + csSearchReq.property_type + "'";
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
exports.getpropertytype = function (req, res) {
    var query = "select type_desc from prop_property_type";
    dbbase.executequery(req, res, query);
};


//POST API
exports.getConfirmFinanceDetails = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "Select b.booking_status, b.booking_id, b.booking_guest_name, b.booking_check_in, p.bundle_amount, p.payout_bundle, ";
        csQuery = csQuery + "b.booking_check_out, datediff(b.booking_check_out, b.booking_check_in) as nights, ";
        csQuery = csQuery + "l.listing_name, pr.property_name, l.account_dest, b.booking_currency, p.payout_currency, b.created_at, ";
        csQuery = csQuery + "b.booking_received_timestamp, p.payout_booking_checkin, l.listing_account_bv, l.listing_account_owner, ";
        csQuery = csQuery + "p.payout_amount, ppt.type_desc, b.booking_earned, p.payout_id, pf.profile_name, p.payout_date, p.payout_eta, p.bundle_currency ";
        csQuery = csQuery + "from payout as p ";
        csQuery = csQuery + "right join booking as b on b.booking_id = p.booking_id ";
        csQuery = csQuery + "inner join listing as l on l.listing_id = b.listing_id ";
        csQuery = csQuery + "inner join profile as pf on pf.profile_id = l.profile_id ";
        csQuery = csQuery + "inner join unit as u on l.unit_id = u.unit_id ";
        csQuery = csQuery + "inner join property as pr on pr.property_id = u.property_id ";
        csQuery = csQuery + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
        csQuery = csQuery + "where 1 = 1 And b.booking_status = 1";

        if (csSearchReq.property_name) {
            csQuery += " And pr.property_name = \"" + csSearchReq.property_name + "\"";
        }
        if (csSearchReq.property_type) {
            csQuery += " And ppt.type_desc = '" + csSearchReq.property_type + "'";
        }
        if (csSearchReq.booking_start_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') >= '" + csSearchReq.booking_start_date + "'";
        }
        if (csSearchReq.booking_end_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') <= '" + csSearchReq.booking_end_date + "'";
        }
        if (csSearchReq.unpaid_reservation) {
            csQuery += " And p.payout_amount is Null ";
        }
        if (csSearchReq.booking_code) {
            csQuery += " And b.booking_id = '" + csSearchReq.booking_code + "'";
        }
        csQuery = csQuery + " order by DATE_FORMAT(b.booking_check_in, '%Y%m%d') DESC, p.payout_bundle, b.booking_id";
        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};

exports.getFinanceDetails = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "Select b.booking_status, b.booking_id, b.booking_guest_name, b.booking_check_in, p.bundle_amount, p.payout_bundle, ";
        csQuery = csQuery + "b.booking_check_out, datediff(b.booking_check_out, b.booking_check_in) as nights, ";
        csQuery = csQuery + "l.listing_name, pr.property_name, l.account_dest, b.booking_currency, p.payout_currency, b.created_at, ";
        csQuery = csQuery + "b.booking_received_timestamp, p.payout_booking_checkin, l.listing_account_bv, l.listing_account_owner, ";
        csQuery = csQuery + "p.payout_amount, ppt.type_desc, b.booking_earned, p.payout_id, pf.profile_name, p.payout_date, p.payout_eta, p.bundle_currency ";
        csQuery = csQuery + "from payout as p ";
        csQuery = csQuery + "right join booking as b on b.booking_id = p.booking_id ";
        csQuery = csQuery + "inner join listing as l on l.listing_id = b.listing_id ";
        csQuery = csQuery + "inner join profile as pf on pf.profile_id = l.profile_id ";
        csQuery = csQuery + "inner join unit as u on l.unit_id = u.unit_id ";
        csQuery = csQuery + "inner join property as pr on pr.property_id = u.property_id ";
        csQuery = csQuery + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
        csQuery = csQuery + "where 1 = 1";

        if (csSearchReq.property_name) {
            csQuery += " And pr.property_name = \"" + csSearchReq.property_name + "\"";
        }
        if (csSearchReq.property_type) {
            csQuery += " And ppt.type_desc = '" + csSearchReq.property_type + "'";
        }
        if (csSearchReq.booking_start_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') >= '" + csSearchReq.booking_start_date + "'";
        }
        if (csSearchReq.booking_end_date) {
            csQuery += " And DATE_FORMAT(b.booking_check_in, '%Y%m%d') <= '" + csSearchReq.booking_end_date + "'";
        }
        if (csSearchReq.unpaid_reservation) {
            csQuery += " And p.payout_amount is Null ";
        }
        if (csSearchReq.booking_code) {
            csQuery += " And b.booking_id = '" + csSearchReq.booking_code + "'";
        }
        csQuery = csQuery + " order by DATE_FORMAT(b.booking_check_in, '%Y%m%d') DESC, p.payout_bundle, b.booking_id";
        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};

exports.insertPayoutDetails = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var csQuery = "INSERT INTO `bukitvis_bukitvista`.`payout` (";
        if (csSearchReq.payout_date) {
            csQuery += "`payout_date`, ";
        }
        if (csSearchReq.payout_bundle) {
            csQuery += "`payout_bundle`, ";
        }
        if (csSearchReq.payout_eta) {
            csQuery += "`payout_eta`, ";
        }
        if (csSearchReq.booking_id) {
            csQuery += "`booking_id`, ";
        }
        if (csSearchReq.payout_booking_checkin) {
            csQuery += "`payout_booking_checkin`, ";
        }
        if (csSearchReq.payout_booking_checkout) {
            csQuery += "`payout_booking_checkout`, ";
        }
        if (csSearchReq.payout_listing_name) {
            csQuery += "`payout_listing_name`, ";
        }
        if (csSearchReq.payout_currency) {
            csQuery += "`payout_currency`, ";
        }
        if (csSearchReq.payout_amount) {
            csQuery += "`payout_amount`, ";
        }
        if (csSearchReq.bundle_currency) {
            csQuery += "`bundle_currency`, ";
        }
        if (csSearchReq.bundle_amount) {
            csQuery += "`bundle_amount`, ";
        }

        csQuery += "`created_at`) VALUES ( ";

        if (csSearchReq.payout_date) {
            csQuery += "'" + csSearchReq.payout_date + "', ";
        }
        if (csSearchReq.payout_bundle) {
            csQuery += "'" + csSearchReq.payout_bundle + "', ";
        }
        if (csSearchReq.payout_eta) {
            csQuery += "'" + csSearchReq.payout_eta + "', ";
        }
        if (csSearchReq.booking_id) {
            csQuery += "'" + csSearchReq.booking_id + "', ";
        }
        if (csSearchReq.payout_booking_checkin) {
            csQuery += "'" + csSearchReq.payout_booking_checkin + "', ";
        }
        if (csSearchReq.payout_booking_checkout) {
            csQuery += "'" + csSearchReq.payout_booking_checkout + "', ";
        }
        if (csSearchReq.payout_listing_name) {
            csQuery += "'" + csSearchReq.payout_listing_name + "', ";
        }
        if (csSearchReq.payout_currency) {
            csQuery += csSearchReq.payout_currency + ", ";
        }
        if (csSearchReq.payout_amount) {
            csQuery += "'" + csSearchReq.payout_amount + "', ";
        }
        if (csSearchReq.bundle_currency) {
            csQuery += csSearchReq.bundle_currency + ", ";
        }
        if (csSearchReq.bundle_amount) {
            csQuery += "'" + csSearchReq.bundle_amount + "', ";
        }
        csQuery = csQuery + "current_timestamp())";
        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};