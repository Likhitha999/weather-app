const request = require('request')
const geocode =(address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=1&access_token=pk.eyJ1IjoibGlraGl0aGExOTk4IiwiYSI6ImNrNHc4YTZ5NTAwNWkzZm1saW9pYnd2dzMifQ._t4Z2eXBiz71RUrs2JHVfw'
    request({url :url,json:true},(error,{body})=>{
        if(error){

           callback('unable to connect',undefined)
        }else if(body.features.length===0){
            callback('give a proper location',undefined)
        }else{


           callback(undefined,{
               latitude : body.features[0].center[1],
               longitude :body.features[0].center[0],
               location :body.features[0].place_name
           })

        }

    })
}

module.exports = geocode