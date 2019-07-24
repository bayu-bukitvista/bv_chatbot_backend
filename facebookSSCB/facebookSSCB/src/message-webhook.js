const processMessage = require('./process-message');
const processMessageBahasa = require('./process-message-bahasa');



var Algorithmia = require("algorithmia");



module.exports = (req, res) => {


    if (req.body.object === 'page') {
      req.body.entry.forEach(entry => {
        entry.messaging.forEach(async(event) => {

          if (event.message && event.message.text) {

            const userId = event.sender.id;
            const message = event.message.text;

            //input for detecting the language
            var input = {
              "sentence":message,
            }

            // const url = `https://graph.facebook.com/${userId}?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>`

            // axios.get('').then((response)=>{
            //   console.log(response)
            // }).catch((error)=>{
            //   console.log(`Error: ${error}`)
            // })

            //processing the input according language and sending the response
            Algorithmia.client("sim8sNioiFodJshfBgrbpat1u951")
                        .algo("nlp/LanguageIdentification/1.0.0")
                        .pipe(input)
                        .then(function(response) {
                          const result = response.get();

                          var lang = 'en';

                          //checking if the lang is 'id' by any chance
                          result.forEach((langObject)=>{
                            if (langObject.language === 'id'){
                              lang = 'id';
                            }
                          });

                          
                          //processing the language according to the message                
                          if (lang === 'en'){
                            processMessage(userId, message);
                          }else if (lang === 'id'){
                            processMessageBahasa(userId, message);
                          }

                          res.status(200).end();

                        });
          } 
          else if (event.postback && event.postback.title) {
            const userId = event.sender.id;
            const message = event.postback.payload;

            processMessage(userId, message);
            res.status(200).end();
          }

        });
      });

      
    }
  };