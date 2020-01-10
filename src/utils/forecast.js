const request = require('request')
const forecast = (lat,lon,callback)=>{
    const url ='https://api.darksky.net/forecast/79e37f234efc946c0bdbbd74edece807/' + lat + ',' + lon
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to darksky!!',undefined)
        }else if(body.error){
            callback('not a correct location address',undefined)

        }else{
            callback(undefined,
            
               body.daily.data[0].summary +'It is currently ' + body.currently.temperature )
              
        }
        
    })
}
module.exports = forecast

//response.body.currently.temperature