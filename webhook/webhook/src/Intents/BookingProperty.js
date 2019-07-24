const axios = require('axios');
const fetch = require('fetch');
const http = require('https');
const apiUrl = `http://chatbot.bukitvista.com:8081/api`


module.exports = {
    BookingProperty : async function (req, intent) {

            const sessionID = req.body.session;
            const queryText = req.body.queryResult.queryText;

            console.log('directions')

            let area = req.body.queryResult && req.body.queryResult.parameters ? req.body.queryResult.parameters.bookingArea : null;
            let propertyType = req.body.queryResult && req.body.queryResult.parameters ? req.body.queryResult.parameters.bookingType : null;
            let numberOfGuests = req.body.queryResult && req.body.queryResult.parameters ? req.body.queryResult.parameters.numberOfPeople : null;

            //Normal response for nomral bookingI
			const reqURL =`${apiUrl}/SearchListing`;

      
            
            return await new Promise ((resolve, reject)=> {
                var data = {
                    'area_name':area,
                    'property_type':propertyType
                }
                axios.post(reqURL, data, 
                    {
                    headers:{
                        'content-type': 'application/json',
                    }   
                }).then((response)=>{
                    const propertyArray = response && response.data ? {listingsGivenInResponse: response.data.slice(0, 4)} :  null;
                    let sscbResponse = null;
                    //building the respose
                    if(propertyArray === null || propertyArray.length === 0){

                        if (propertyArray === null){
                            sscbResponse = 'Sorry! We are facing some issues on the database. Plese contact BukitVita Hotline';
                            throw new Error('Error! Something went wrong on retreiving data from the backend');
                        }else if(propertyArray.length === 0){
                            sscbResponse = 'Sorry! The type of property you are looking for is not listed yet. Please try contacting BukitVista hotline.'
                            //slack notify
                            axios.post('https://hooks.slack.com/services/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', {
                                
                                username: "BVBot Human Notification",
                                text: `*Problem*: The user wants to book a property, but such property is not listed in the database: \n*Area:*${area}*\n*Property Type*:${propertyType}\nHere is the link to inbox: https://www.facebook.com/sscbBV/inbox`
                        
                        });
                        }                    
                    }   
                    else {
                        sscbResponse = JSON.stringify(propertyArray)
                        
                    } 
                    
                    const followupEventInput = propertyArray === null ? 'error' : propertyArray;
                    resolve({
                        fulfillmentText: sscbResponse,
                        source: 'get-booking',
                        outputContexts: [
                            {
                                "name":`${sessionID}/contexts/welcome`,
                                "lifespanCount": 1
                                }
                        ]})
    
                }).catch((error)=>{
                    console.log('woof')
                    console.log(`Error in getting property booking info for the guest: ${error}`)
                    resolve( {
                        fulfillmentText: 'Sorry we are facing internal server error, please try again later, or contact the helpline.',
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
