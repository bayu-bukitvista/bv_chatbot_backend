'use strict';

// Module Dependencies
// -------------------
var express = require('express');
var bodyParser = require("body-parser");
var http = require('http');
var https = require('https');
var fs = require('fs');

var csArea = require('./routesmysql/cArea');
var csListing = require('./routesmysql/cListing');
var csBooking = require('./routesmysql/cBooking');
var csEmail = require('./routesmysql/cEmail');
var csPayment = require('./routesmysql/cPayment');
var csNote = require('./routesmysql/cNotes');
var csPartner = require('./routesmysql/cPartner');

var app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.set('port', process.env.PORT || 8081);

app.get("/url", (req, res, next) => {
    res.json(["Apple", "Banana", "Mango", "Orange", "Lichi"]);
})


//Read & Display html file
app.get("/TestForm", (req, res, next) => {
    fs.readFile("TestForm.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
});


//DB mysql functions
app.get("/api/getarealist", csArea.getarealist);
app.get("/api/getareainfo/:id", csArea.getareainfo);
app.post("/api/SearchArea", csArea.searcharea);

app.post("/api/getlisting", csListing.searchlisting)
//app.get("/api/getlisting/:id", csListing.getlisting)
app.get("/api/getlistinglist", csListing.getlistinglist)
app.post("/api/SearchListing", csListing.searchlistingId)
app.post("/api/SearchContactInfo", csListing.searchContactInfo)

app.get("/api/SearchEmailInfo/:id", csEmail.searchEmailInfo)


app.get("/api/getbooking/:id", csBooking.getbooking)
app.get("/api/getbookinglist", csBooking.getbookinglist)

app.post("/api/getConfirmFinanceDetails", csPayment.getConfirmFinanceDetails);
app.post("/api/getFinanceDetails", csPayment.getFinanceDetails);
app.post("/api/insertPayoutDetails", csPayment.insertPayoutDetails);
app.post("/api/getpropertylist", csPayment.getpropertylist);
app.get("/api/getpropertytype", csPayment.getpropertytype);

app.post("/api/getPayoutNotes", csNote.getPayoutNotes);
app.post("/api/insertPayoutNotes", csNote.insertPayoutNotes);
app.post("/api/updatePayoutNotes", csNote.updatePayoutNotes);
app.post("/api/deletePayoutNotes", csNote.deletePayoutNotes);

app.post("/api/getArrivalList", csPartner.getArrivalList);
app.post("/api/getGraphDetails", csPartner.getGraphDetails);
app.get("/api/getOwnerProperty/:id", csPartner.getOwnerProperty);


//Setting up server
//var server = app.listen(process.env.PORT || 8080, function () {
//  var port = server.address().port;
//  console.log("App now running on port", port);
//});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//const options = {
//    pfx: fs.readFileSync('./ssl/chatbot.bukitvista.com.pfx')
//};

//https.createServer(options, (req, res) => {
//    res.writeHead(200);
//    res.end('hello world\n');
//}).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//});

//app.listen(3000, () => {
//  console.log('Express server listening on port 3000');
//});
