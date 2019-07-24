'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

exports.getbookinglist = function (req, res) {
    var query = "select * from booking";
    dbbase.executequery(req, res, query);
}

exports.getbooking = function (req, res) {
    var csID = req.params.id;
    var query = "select bk.booking_id, bk.booking_guest_name, bk.booking_check_in, ";
    query = query + "bk.booking_check_out, ls.listing_name, pf. profile_name, ut.unit_name, coalesce(pr.property_direction, '') as property_direction, ";
    query = query + "ut.unit_swimming_pool, pr.property_name, ppt.type_desc, ppst.status_name, ";
    query = query + "ppp.package_name, ppd.design_name, pppr.proximity_desc, ppls.life_support_desc, ";
    query = query + "pps.service_desc, ar.area_name, em.employee_name, coalesce(em.employee_phone, '') as employee_phone ";
    query = query + "from booking as bk ";
    query = query + "inner join listing as ls on bk.listing_id = ls.listing_id ";
    query = query + "inner join profile as pf on ls.profile_id = pf.profile_id ";
    query = query + "inner join unit as ut on ls.unit_id = ut.unit_id ";
    query = query + "inner join property as pr on ut.property_id = pr.property_id ";
    query = query + "inner join prop_property_design as ppd on ppd.property_design = pr.property_design ";
    query = query + "inner join prop_property_life_support as ppls on ppls.property_life_support = pr.property_life_support ";
    query = query + "inner join prop_property_package as ppp on ppp.property_package = pr.property_package ";
    query = query + "inner join prop_property_proximity as pppr on pppr.property_proximity = pr.property_proximity ";
    query = query + "inner join prop_property_service as pps on pps.property_service = pr.property_service ";
    query = query + "inner join prop_property_status as ppst on ppst.property_status = pr.property_status ";
    query = query + "inner join prop_property_type as ppt on ppt.property_type = pr.property_type ";
    query = query + "inner join area as ar on pr.area_id = ar.area_id ";
    query = query + "inner join employee as em on em.employee_id = ar.employee_id ";
    query = query + "where bk.booking_id = '" + csID + "'";
    dbbase.executequery(req, res, query);
}