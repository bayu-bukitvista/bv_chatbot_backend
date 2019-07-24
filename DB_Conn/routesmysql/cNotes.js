'use strict';

// Module Dependencies
// -------------------
var dbbase = require('./dbbase');


exports.pingserver = function (req, res, next) {
  res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
};

exports.getPayoutNotes = function (req, res) {
  var csSearchReq = req.body;
  console.log(csSearchReq);

  if (csSearchReq) {
    var csQuery = "select * from payout_notes Where 1 = 1";
    if (csSearchReq.booking_id) {
        csQuery += " And booking_id = '" + csSearchReq.booking_id + "'";
    }
    if (csSearchReq.payout_id) {
        csQuery += " And payout_id = " + csSearchReq.payout_id;
    }

    dbbase.executequery(req, res, csQuery);
  } else {
      console.log("Wrong Data");
      res.statusMessage = "Wrong Data!";
      res.status(400).end();
  }
};

exports.insertPayoutNotes = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {

        var csQuery = "INSERT INTO `bukitvis_bukitvista`.`payout_notes` ";
        csQuery += "(`booking_id`, `payout_id`, `note_text`) ";
        csQuery += "VALUES "
        if (csSearchReq.booking_id) {
            csQuery += "('" + csSearchReq.booking_id + "', ";
        }
        if (csSearchReq.payout_id) {
            csQuery += csSearchReq.payout_id+", ";
        }
        if (csSearchReq.note_text) {
            csQuery += "'" + csSearchReq.note_text + "')";
        }

        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};

exports.updatePayoutNotes = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {

        var csQuery = "UPDATE `bukitvis_bukitvista`.`payout_notes` ";
        csQuery += "SET "
        csQuery += "`note_text` = '" + csSearchReq.note_text + "',"
        csQuery += "`updated_at` = current_timestamp() "
        if (csSearchReq.note_id) {
            csQuery += "Where note_id = " + csSearchReq.note_id + " ";
        }
        if (csSearchReq.booking_id) {
            csQuery += "And booking_id = '" + csSearchReq.booking_id + "' ";
        }
        if (csSearchReq.payout_id) {
            csQuery += "And payout_id = " + csSearchReq.payout_id;
        }

        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};

exports.deletePayoutNotes = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {

        var csQuery = "DELETE FROM `bukitvis_bukitvista`.`payout_notes` ";
        if (csSearchReq.note_id) {
            csQuery += "Where note_id = " + csSearchReq.note_id + " ";
        }
        if (csSearchReq.booking_id) {
            csQuery += "And booking_id = '" + csSearchReq.booking_id + "' ";
        }
        if (csSearchReq.payout_id) {
            csQuery += "And payout_id = " + csSearchReq.payout_id;
        }

        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
};