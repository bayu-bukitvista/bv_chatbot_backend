'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const ssl = require('ssl-root-cas');
const crypto = require('crypto');
const http = require('http');

'use strict';
var rootCas = require('ssl-root-cas/latest').create();
require('https').globalAgent.options.ca = rootCas;


const server = express();

//Impoting intent response functions
var Directions = require('./src/Intents/DirectionsRequest.js');
var Contact = require('./src/Intents/ContactRequest');
var Fallback = require('./src/Intents/Fallback.js')
var IDCheck = require('./src/Intents/CheckingID');
var Booking = require('./src/Intents/BookingProperty');


//exporting the main api url
//module.exports.apiUrl = `http://chatbot.bukitvista.com:8081/api`

//Intent for Property Booking
const requestBookingPropertyParametersGiven =  'Request Booking Property - Parameters Given';




server.use(bodyParser.urlencoded({
    extended:true
}));

server.use(bodyParser.json());

server.post('/get-info', (req, res)=>{


    const intent = req.body.queryResult &&  req.body.queryResult.intent && req.body.queryResult.intent.displayName ? 
                                                                            req.body.queryResult.intent.displayName : null;
    
   
    console.log(req);
    console.log(intent)
    //Response according to intent
    if (intent.toLowerCase().includes('check')){
        IDCheck.CheckID(req, intent).then((response)=>{
            console.log('lololol');
            return res.json(response);
        }).catch((error)=>{
            console.log(`Error in IDCheck module : ${error}`)
        });
    }
    else if (intent.toLowerCase().includes('directions')){
        
        Directions.RequestDirectionsIntent(req, intent).then((response)=>{
            console.log(response);
            return res.json(response);
        }).catch((error)=>{
            console.log(`Error in Directions module : ${error}`)
        });

    
    }
    else if (intent.toLowerCase().includes('contact')) {
        Contact.RequestContactIntent(req,intent).then((response)=>{
            console.log(response);
            return res.json(response);
        }).catch((error)=>{
            console.log(`Error in Contact module: ${error}`)
        })

    }else if (intent.toLowerCase().includes('booking')) {
        Booking.BookingProperty(req,intent).then((response)=>{
            console.log(response);
            return res.json(response);
        }).catch((error)=>{
            console.log(`Error in Booking module: ${error}`)
        })
    }else if(intent.toLowerCase().includes('fallback')){
        console.log('here I am ')
        Fallback.fallback(req, intent).then((response)=>{
            console.log(response);
            return res.json(response);
        }).catch((error)=>{
            console.log(`Error in DefaultFallback module : ${error}`)
        })
    }
 
    });
/*	
var httpServer = http.createServer(server);

httpServer.listen((process.env.PORT || 5000), ()=>{
    console.log("Server is up and running!");
});
*/
/*
var privateKey = fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/privkey.pem').toString();
var certificate = fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/fullchain.pem').toString();

const options = {
    key: privateKey,
	cert: certificate
};

var credentials = crypto.createCredentials(options);

var httpServer = http.createServer(server);

httpServer.setSecure(credentials);
//httpServer.addListener("request", handler);

httpServer.listen(5000, function () {
    console.log('Express server listening on port ' + 5000);
});
*/
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/fullchain.pem')
};

var httpsServer = https.createServer(options, server);

httpsServer.listen(5000, function () {
    console.log('Express server listening on port ' + 5000);
})
