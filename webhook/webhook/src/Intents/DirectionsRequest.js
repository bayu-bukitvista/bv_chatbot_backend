const axios = require('axios');
const apiUrl = `http://chatbot.bukitvista.com:8081/api`


//Intents for Directions
const requestDirectionsIDConfirmed = 'Request Directions - ID Confirmed'; // reply enter again
const requestDirectionsIDNotConfirmedEnteredAgain = 'Request Directions - ID Not Confirmed - Entered Again';  // reply enter again
const requestDirectionsIDConfirmedNotFoundLast = 'Request Directions - ID Confirmed - Not Found - Last'; // reply call helpline
const requestDirectionsIDNotConfirmedEnteredAgainNotFoundLast = 'Request Directions - ID Not Confirmed - Entered Again - Not Found - Last'; // reply call helpline



module.exports = {
    RequestDirectionsIntent : async function (req, intent) {

            const sessionID = req.body.session;
            const queryText = req.body.queryResult.queryText;

            console.log('directions')

            let bookingID = null;
    
                if (intent === requestDirectionsIDConfirmed){
                    bookingID = req.body.queryResult &&  req.body.queryResult.outputContexts ? 
                                                                req.body.queryResult.outputContexts[0].parameters.bookingID : null;
                } else if (intent === requestDirectionsIDNotConfirmedEnteredAgain){
                    bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                        req.body.queryResult.parameters.bookingID : null;
                } else if (intent === requestDirectionsIDConfirmedNotFoundLast) {
                    bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                        req.body.queryResult.parameters.bookingID : null;
                } else if (intent === requestDirectionsIDNotConfirmedEnteredAgainNotFoundLast){
                    bookingID = req.body.queryResult &&  req.body.queryResult.parameters && req.body.queryResult.parameters.bookingID ? 
                                                                                        req.body.queryResult.parameters.bookingID : null;
                }

             
            



                //Normal response for nomral bookingID
				const reqURL =`${apiUrl}/getBooking/${bookingID}`;
                
                return await new Promise ((resolve, reject)=> {
                    axios.get(reqURL).then((response)=>{
                        const guestInfo = response.data[0];
    
                        //building the response
                    let sscbResponse = '';
                    if (guestInfo.employee_phone !== ""){
                        sscbResponse = `Hi, ${guestInfo.booking_guest_name}. Directions are as follows:
                                             ${guestInfo.property_direction}.`;
                    }else {
                        sscbResponse = `Hi, ${guestInfo.booking_guest_name}. I am sorry, I was not able to find the direction info that you are looking in the database. I will search for it, and will text you back. Thanks!`
                        //slack notify
                        axios.post('https://hooks.slack.com/services/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', {
                            
                                username: "BVBot Human Notification",
                                text: `*Problem*: The directions info was not found on the database for booking ID: ${bookingID}\n*Last message*: ${queryText}.\nHere is the link to inbox: https://www.facebook.com/sscbBV/inbox`
                            
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

                            ]}) ;
                            
                        
                    }).catch((error)=>{
                        console.log('woof')
                        console.log(`Error in getting contact info for the guest: ${error}`)
                        resolve( {
                            fulfillmentText: 'Sorry we could not find you in our guest database, please try typing only your code.',
                            source: 'get-directions',
                            outputContexts: [
                                {
                                    "name":`${sessionID}/contexts/i`,
                                    "lifespanCount": 1
                                    },
                                {
                                    "name":`${sessionID}/contexts/requestdirections-followup`,
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


  