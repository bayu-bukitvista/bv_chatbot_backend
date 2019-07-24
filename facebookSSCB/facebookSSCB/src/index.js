require('dotenv').config({ path: 'variables.env' });

const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const fs = require('fs');

const verifyWebhook = require('./verify-facebook');
const messageWebhook = require('./message-webhook');



const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/', verifyWebhook);
server.post('/', messageWebhook);

/*server.listen((process.env.PORT || 3000), ()=>{
    console.log("Server is up and running!");
});*/

/*const options = {
    pfx: fs.readFileSync('./ssl/chatbot.bukitvista.com.pfx')
};

var httpsServer = https.createServer(options, server);

httpsServer.listen(3000, function () {
    console.log('Express server listening on port ' + 3000);
});*/

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/chatbot.bukitvista.com/fullchain.pem')
};

var httpsServer = https.createServer(options, server);

httpsServer.listen(3000, function () {
    console.log('Express server listening on port ' + 3000);
})