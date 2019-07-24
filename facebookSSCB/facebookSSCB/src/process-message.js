const fetch = require('node-fetch');


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
    const  FACEBOOK_ACCESS_TOKEN  = "EAAfhyICmV5MBAFqcLtcs4l0hiOLZC5RxavjJqQ9IweRfhn7gTI1Atn22QCwpSTe1dkMX7onCKuNm8UEBeG4l2ZANDlgBmy53ZCLznSumAty44E8PXBllOz2zZCmRZAe0KZCZC20DEBdb5ZAoTQqdBcz55uzjrCa043BWKcjxCZCVLkgZDZD";

    const sendTextMessage = (userId, result) => {


      const text = result.fulfillmentText;
      const dialogFlowParameters = result.parameters;
      const displayName = result.intent !== null ? result.intent.displayName.toLowerCase() : 'Welcome'


      // EXTRACTING PARAMETERS


        //bookingID
        let bookingID = null;

          //extracting bookingID based on intent (UNDER PARAMETERS)
          if (displayName.includes("contact")){
            bookingID = dialogFlowParameters.fields.bookingID && dialogFlowParameters.fields.bookingID.listValue  ? dialogFlowParameters.fields.bookingID.listValue.values[0].stringValue : null;
          } else if (displayName.includes("directions")){
            bookingID = dialogFlowParameters.fields.bookingID && dialogFlowParameters.fields.bookingID.stringValue ? dialogFlowParameters.fields.bookingID.stringValue : null;
          }





      //SPECIAL RETURNS FOR POSTBACK BUTTONS  

      // special return for choosing the area
      if (text === 'Okay! please choose the area. 1. Canggu 2. Uluwatu 3.Bingin'){
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
                    text:"Please choose a area",
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
                        payload: "Bingin"
                      }
                    ]
                  }
                }
              },
            }),
          }
        );
      }


      //Special return for choosing the property type
      else if (text === 'Please choose one of the property types?'){
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
                text: "Please choose your preferred property type below",
                quick_replies:[
                  {
                    content_type:"text",
                    title:"Villa",
                    payload:"Villa",
                  },
                  {
                    content_type:"text",
                    title:"Guest House",
                    payload:"Guesthouse",
                  },
                  {
                    content_type:"text",
                    title:"Apartment",
                    payload:"Apartment",
                  },
                  {
                    content_type:"text",
                    title:"House",
                    payload:"House",
                  },
                  {
                    content_type:"text",
                    title:"Resort",
                    payload:"Resort",
                  }
                ]
              },
            }),
          }
        );
      }


      //Special return for entering code .....if no code the button will be used for choosing 'no code' option
      else if (text === `Okay I will help you! Can you give me your booking code? If you don't have a booking code please reply with 'no code'`){

        let inText = displayName.includes("contact") ? 'Contact details' : 'Directions'

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
                    text:`Hi, I can give you the ${inText}. Please reply this message with your booking code.`,
                    buttons:[
                      {
                        type: "postback",
                        title: "I don't have a code",
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

      //Special return for yes or no for creating a booking after 'no code'
      else if (text === `Do you want to make a booking?`){
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
      else if (text === `Please confirm your booking code "${bookingID}". Reply 'I do' if you want to confirm your booking code. Reply 'I do not' if you want to enter your booking code again.`){
                
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
                    text:`Please confirm your booking code "${bookingID}"`,
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


      //Special return for property available
      else if (text.includes('listingsGivenInResponse')){
        var propertyObject = JSON.parse(text);
        propertyObject = propertyObject.listingsGivenInResponse;

        //GENERATING TEMPLATE FOR EACH OF THE PORPERTY
        var elements = [];
        propertyObject.forEach((listing)=>{
          var newObject = {
            title:listing.listing_name,
            subtitle: 'Please make sure that you have logged in to your AirBnb accout before clicking on this link!',
            default_action: {
              type: "web_url",
              url: `https://www.airbnb.com/rooms/${listing.listing_id}`,
              webview_height_ratio: "tall",
            },
            buttons:[
              {
                type:"web_url",
                url:`https://www.airbnb.com/rooms/${listing.listing_id}`,
                title:"View Property"
                }             
              ]      
            }
            elements.push(newObject);
          }
        )

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
                    template_type:"generic",
                    elements:elements
                  }
                }
              }
            }),
          }
        );
      }


      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          get_started:{
              "payload":"<GET_STARTED_PAYLOAD>"
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