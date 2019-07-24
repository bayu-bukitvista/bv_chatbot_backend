const axios = require('axios');
const apiUrl = `http://chatbot.bukitvista.com:8081/api`

//Intents for Contact
const requestContactIDConfirmed = 'Request Contact - ID Confirmed'; // reply enter again
const requestContactIDNotConfirmedEnteredAgain = 'Request Contact - ID Not Confirmed - Entered Again';  // reply enter again
const requestContactIDConfirmedNotFoundLast = 'Request Contact - ID Confirmed - Not Found - Last'; // reply call helpline
const requestContactIDNotConfirmedEnteredAgainNotFoundLast = 'Request Contact - ID Not Confirmed - Entered Again - Not Found - Last'; // reply call helpline



module.exports = {
    RequestContactIntent : async function (req, intent) {

            const sessionID = req.body.session;
            const queryText = req.body.queryResult.queryText;

            let bookingID = null;
    
            if (intent === requestContactIDConfirmed){
                bookingID = req.body.queryResult &&  req.body.queryResult.outputContexts  ? 
                                                                        req.body.queryResult.outputContexts[0].parameters.bookingID[0] : null;
            } else if (intent === requestContactIDNotConfirmedEnteredAgain){
                bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                    req.body.queryResult.parameters.bookingID : null;
            } else if (intent === requestContactIDConfirmedNotFoundLast) {
                bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                    req.body.queryResult.parameters.bookingID : null;
            } else if (intent === requestContactIDNotConfirmedEnteredAgainNotFoundLast){
                bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                    req.body.queryResult.parameters.bookingID : null;
            }
    
            
            console.log(bookingID);
            const reqURL =`${apiUrl}/getBooking/${bookingID}`;
            console.log(reqURL)
            return await new Promise ((resolve, reject)=> {
                axios.get(reqURL).then((response)=>{
                    console.log(response.data[0])
                    const arrayReturned = response.data;
                    const guestInfo = arrayReturned[0];
                    
                    //building the response
                    let sscbResponse = '';
                    if (guestInfo.employee_phone !== ""){
                        sscbResponse = `Hi ${guestInfo.booking_guest_name}, you are staying at ${guestInfo.property_name}, you can contact your host ${guestInfo.employee_name} via this number ${guestInfo.employee_phone}. If you don't have local phone you can call or chat via internet using Whatsapp.`;
                    }else {
                        sscbResponse = `Hi, ${guestInfo.booking_guest_name}. I am sorry, I was not able to find the contact information that you are looking in the database. I will search for it, and will text you back. Thanks!`
                        //slack notify
                        axios.post('https://hooks.slack.com/services/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', {
                            
                                username: "BVBot Human Notification",
                                text: `*Problem*: The contact info was not found on the database for booking ID: ${bookingID}\n*Last message*: ${queryText}.\nHere is the link to inbox: https://www.facebook.com/sscbBV/inbox`
                            
                            });
                    }

                    resolve({
                        fulfillmentText: sscbResponse,
                        source: 'get-directions',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                }

                        ]
                    }) ;
                        
                        
                }).catch((error)=>{ 
                    console.log(`Error in getting contact info for the guest: ${error}`);
                    resolve( {
                        fulfillmentText: 'Sorry we could not find you in our guest database, please try typing only your code',
                        source: 'get-contact',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/requestcontact-info-followup`,   
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
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                }                                    
                        ]
                        });

    
                       
                    })

                })
    
        }
    }


