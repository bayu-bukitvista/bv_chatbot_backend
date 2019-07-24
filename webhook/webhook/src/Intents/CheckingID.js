const axios = require('axios');


module.exports = {
    CheckID : async function (req, intent) {

            const sessionID = req.body.session;
            const queryText = req.body.queryResult.queryText;

            let bookingID = null;

            //extracting the booking ID dependent on the intent
            if (intent.toLowerCase().includes('contact')){
                bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                req.body.queryResult.parameters.bookingID[0] : null;
            }else {
                bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                req.body.queryResult.parameters.bookingID : null;
            }
            
            console.log(bookingID)
            //checking is booking ID is valid or not //fix here    
            if (/\s/g.test(bookingID) || (bookingID.length > 10 || bookingID.length < 6)){

                axios.post('https://hooks.slack.com/services/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', {
                            
                    username: "BVBot Human Notification",
                    text: `*Problem*: The user was not able to provide the bot with correct booking id\n*Last message*: ${queryText}.\nHere is the link to inbox: https://www.facebook.com/sscbBV/inbox`
                
                });

                      

                //returning text dependent on for what itent we have to check the ID
                if (intent.toLowerCase().includes('contact')){
                    return({
                        fulfillmentText: `Sorry I couldn't find this booking code "${bookingID}". Do you want to make a booking instead?`,
                        source: 'get-contact',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/requestcontact-followup`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/i`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/requestcontact-idgiven-followup`,
                                "lifespanCount": 1
                                }                                    
                        ]
                        });
                }else if (intent.toLowerCase().includes('directions')){
                    return({
                        fulfillmentText: 'Sorry it was hard to catch. Can you just type the booking code?',
                        source: 'get-contact',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/i`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/requestdirections-followup`,
                                "lifespanCount": 1
                                }
                                                                   
                        ]
                        });
                }

            }else {

                //returning text dependent on for what itent we have to check the ID
                if (intent.toLowerCase().includes('contact')){
                    return({
                        fulfillmentText: `Please confirm your booking code "${bookingID}". Reply 'I do' if you want to confirm your booking code. Reply 'I do not' if you want to enter your booking code again.`,
                        source: 'get-contact',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/requestcontact-idgiven-followup`,   
                                "lifespanCount": 1
                                }                                 
                        ]
                        })
                }else if (intent.toLowerCase().includes('directions')){
                    return({
                        fulfillmentText: `Please confirm your booking code "${bookingID}". Reply 'I do' if you want to confirm your booking code. Reply 'I do not' if you want to enter your booking code again.`,
                        source: 'get-contact',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                },
                            {
                                "name":`${sessionID}/contexts/requestdirections-idgiven-followup`,   
                                "lifespanCount": 1
                                }                                      
                        ]
                        })
                }
            }
        }
    }


