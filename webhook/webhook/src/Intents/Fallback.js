const axios = require('axios');


module.exports = {
    fallback : async function (req, intent) {

            const sessionID = req.body.session;
            const queryText = req.body.queryResult.queryText;

            //slack notify
            axios.post('https://hooks.slack.com/services/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', {
                            
                username: "BVBot Human Notification",
                text: `*Problem*: BVBot did not understnad the intent of the user\n*Last message*: ${queryText}.\nHere is the link to inbox: https://www.facebook.com/sscbBV/inbox`
            
            });


            //reponse to the user
            return({
                fulfillmentText: 'Sorry! either the service for your request is not available currently! or I am not able to understand what you mean?',
                source: 'default-fallback-intent',
                outputContexts: [
                    {
                        "name":`${sessionID}/contexts/defaultfallbackintent`,
                        "lifespanCount": 1
                        }

                ]
            }) ;
                
            
        }
    }


