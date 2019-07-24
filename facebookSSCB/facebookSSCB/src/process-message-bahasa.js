const fetch = require('node-fetch');
const axios = require('axios')

    const projectId = 'newagent-5d02d'; 
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvTevW7AwIbtCQ\ny/94dMmnCMDDQW3T2cCxPw1ntTtEjEo5w887/cIIBmc1I7Kf4XoBa8+EN+Q4a4qQ\nx+u/M/aMkSVrBv8tyah4eb2D4EPegwDkYw9EUAnbSm3sjI1DFzyelz6/dPmOzpcq\nL+YbNiMQNStWgqWXqw51LP1lev2qqK1Eucy18wwJvrTimKGeGo1Alfh4/jbR9Z2o\niFJ/bUvgV0ulZFaYBbzznAkv381yLw6adcHjjFQswzrO+VcvFfJB+EMw/VZTJaYx\nx5/o2+gE4Qj4laJxpjn8h46GXlH/HgsUz62cn8vbO9noerDTZSqvVJRbYFfyiTYw\no93pvGg9AgMBAAECggEANXpPVj6nAxGPFYTt17jE5WxBpa75ipWUd121QKxkOqqT\nYCDQQMxOGzWc2XSc4rIdjn5tjTehquZ/nGAolikLbuE+aXJ2eOjaOHpm6mqJOcF8\nDa/8ccn638dKVk2gMFXP289myHAuSzbRnYCEMUvoEWMu59KuImD/5ZYGbSVCagNN\ncH9OYbKGdAajjdDOy3Wylh8mEHVyH6MkGS4Q1LvXU5RbilO43NYi8YRerv83Tox4\nhEdeM8a+wKRa2OFrjk1SQYFiJSwrrs9xZOuA0MmR6tldgQMGauKOXMkFIwQCbuhS\n247RACCx2VKST7JURDkxQMT73suLK4dqCk2qYlkT7wKBgQDzMCRmMpX94mSFT7SC\nk173X0zkHNfyJBRtQ0CqdnvYYU2GXlBb0Gf3ZMSwzcNqwCpGnbTdqeTC+7HhH77o\nlwV8k9azKrlJisIJL1YmCZAvGE80jZEhLEWhhOi8p1owtBDRO5Diu58kthyiM9W6\nXN8mh7PfI+FQjtaV9iWgPglZRwKBgQC4ijzEZDkxigS9BcpUuqHmAIHIgMB7WsrU\nLyOcWMJ7fMnfhMs4ZU0Q3G2JXqYB9Udb4s/7ceM0hLNyStQq0l26wgcp35qk7f7F\n285b7Kv/wUD4JR9JgDc5+5AEuZecKadIlqUxFmpP4UvB5EHaozGOWeIyPUJsl10y\noSCcGx70WwKBgQCODY8Vi3MGLJpfLOHabE9K3IZDsX2K2fx8no5FhJRvHtd0J990\n4lX4swoZ5PfDgaCwQysFWFpiczfCsxKHNsBjts/xNIGrLbyONPJzoZ5xhBewMQmX\ngQ7jfImeuXr7fBNexRaq+sHJZf9v2Ct+gwVuslIlhAX3UpiSXIg6BELdvQKBgQCi\nymeiw9rkRaG6caI0LlNlh2r1ygaCiuxEU7UxVedycfnPcOCoxkw+pIUIWnNNZOdn\nOmVIpgXNLYbzOumBQQQoHMOe/7724XAPcMDQvK5aNkuu22iHOVD+mFlKocIJo4EL\nesEM1X5BKzjeORKS4cV0kvwEX5/6FWjEofkXXKFo4wKBgGhvMfRyle6+NA3wsCKL\njYqbdcc4RlO+m7SZNpVH9ICg8Ew80yhvb3+TDtinMdTsWEVCQ0ZUWhUlQrNgwTb3\nwnfYnspQqaciv2+tK56XhGvMkC0d+JJT53PFErPtS7gOpkZX6HeeaSLL6qNYIjIt\npueg4amjEbOcNozWNQ2EJ78Z\n-----END PRIVATE KEY-----\n",
        client_email: "bukitvista-clienta-access@newagent-5d02d.iam.gserviceaccount.com"
      }
    };
  

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const  FACEBOOK_ACCESS_TOKEN  = "EAAIDuuSTYEYBACgy3TRYOZBSRmZBw6ZAfpu1NuquiRB4dkWTHiFWkYJOIImwZB6sfT0vp9iMk4OZBJFHe4FNF7WxctBTuS5Uau8HCfXTvLUSMK9aYagqtFFYZCwOAqO7gw5k1AeheZCZABn4KyexdKkPsl9CkYdbkCZCMpLgB2r53TgZDZD";

    const sendTextMessage = (userId, result) => {

      console.log(result.intent.displayName);

      const text = result.fulfillmentText;
      const dialogFlowParameters = result.parameters;
      const displayName = result.intent.displayName.toLowerCase();


      // EXTRACTING PARAMETERS

      let bookingID = null;

        //extracting bookingID based on intent (UNDER PARAMETERS)
        if (displayName.includes("contact")){
          bookingID = dialogFlowParameters.fields.bookingID && dialogFlowParameters.fields.bookingID.listValue  ? dialogFlowParameters.fields.bookingID.listValue.values[0].stringValue : null;
        } else if (displayName.includes("directions")){
          bookingID = dialogFlowParameters.fields.bookingID && dialogFlowParameters.fields.bookingID.stringValue ? dialogFlowParameters.fields.bookingID.stringValue : null;
        }



      //SPECIAL RETURNS FOR POSTBACK BUTTONS  

      // special return for choosing the area
      if (text === 'Baik! silakan pilih area. 1. Canggu 2. Uluwatu 3.Bingin'){
        return fetch(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              messaging_type: 'RESPONSE',
              recipient: {
                id: userId,
              },
              message:{
                attachment:{
                  type:"template",
                  payload:{
                    template_type:"button",
                    text:"Silakan pilih area",
                    buttons:[
                      {
                        type: "postback",
                        title: "Canggu",
                        payload: "Canggu"
                      },
                      {
                        type: "postback",
                        title: "Uluwatu",
                        payload: "Uluwatu"
                      },
                      {
                        type: "postback",
                        title: "Bingin",
                        payload: "Uluwatu"
                      }
                    ]
                  }
                }
              },
            }),
          }
        );
      }
      //Special return for entering code .....if no code the button will be used for choosing 'no code' option
      else if (text === `Oke saya akan membantu Anda! Bisakah Anda memberi saya kode pemesanan Anda? Jika Anda tidak memiliki kode pemesanan, silakan balas dengan 'no code'`){
        return fetch(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              messaging_type: 'RESPONSE',
              recipient: {
                id: userId,
              },
              message:{
                attachment:{
                  type:"template",
                  payload:{
                    template_type:"button",
                    text:"Oke saya akan membantu Anda! Bisakah Anda memberi saya kode pemesanan Anda?",
                    buttons:[
                      {
                        type: "postback",
                        title: "Saya tidak punya kode!",
                        payload: "no code"
                      }
                    ]
                  }
                }
              },
            }),
          }
        );
      }

    //this is left
      //Special return for yes or no for creating a booking after 'no code'
      else if (text === `Apakah Anda ingin memesan?`){
        return fetch(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              messaging_type: 'RESPONSE',
              recipient: {
                id: userId,
              },
              message:{
                attachment:{
                  type:"template",
                  payload:{
                    template_type:"button",
                    text:"Do you want to book?",
                    buttons:[
                      {
                        type: "postback",
                        title: "Yes",
                        payload: "yes"
                      },
                      {
                        type: "postback",
                        title: "No",
                        payload: "no"
                      }
                    ]
                  }
                }
              },
            }),
          }
        );
      }


      //Special return for confirming the entered booking code.....button for 'I do' and button for 'I do not'
      else if (text === `Harap konfirmasikan kode pemesanan Anda ${bookingID}. Balas 'Saya lakukan' jika Anda ingin mengkonfirmasi kode pemesanan Anda. Balas 'Saya tidak' jika Anda ingin memasukkan kode pemesanan Anda lagi.`){
        return fetch(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              messaging_type: 'RESPONSE',
              recipient: {
                id: userId,
              },
              message:{
                attachment:{
                  type:"template",
                  payload:{
                    template_type:"button",
                    text:`Please confirm your booking code ${bookingID}`,
                    buttons:[
                      {
                        type: "postback",
                        title: "I do confirm",
                        payload: "I do"
                      },
                      {
                        type: "postback",
                        title: "I do not confirm",
                        payload: "I do not"
                      }
                    ]
                  }
                }
              },
            }),
          }
        );
      }


      //Special return for asking human intervention on 'DEFAULT FALLBACK INTENT'
      else if (text === `Maaf, apa itu tadi?`){

        //send the notification to slack here
        axios.post('https://hooks.slack.com/services/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', {
          text:"Urgent, check messages on facebook messenger"
        }).then(()=>{
          return fetch(
            `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                  id: userId,
                },
                message:{
                  attachment:{
                    type:"template",
                    payload:{
                      template_type:"button",
                      text:`Aku minta maaf! Saya tidak dapat mengerti apa yang Anda katakan. Jika Anda ingin seorang eksekutif layanan pelanggan untuk berbicara maka silakan klik tombol 'Permintaan' di bawah ini!`,
                      buttons:[
                        {
                          type: "postback",
                          title: "Permintaan",
                          payload: "HUMANNEEDED"
                        }
                      ]
                    }
                  }
                },
              }),
            }
          );
        }).catch((error)=>{
          return fetch(
            `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                  id: userId,
                },
                message:{
                  attachment:{
                    type:"template",
                    payload:{
                      template_type:"button",
                      text:`I am sorry! None of our executives are available. We will try to contact as soon as possible`,
                      buttons:[
                        {
                          type: "postback",
                          title: "Request",
                          payload: "HUMANNEEDED"
                        }
                      ]
                    }
                  }
                },
              }),
            }
          );
        })

        
      }



      



      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }

    module.exports = (userId, message) => {
      
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
        },
      };
      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          return sendTextMessage(userId, result);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }