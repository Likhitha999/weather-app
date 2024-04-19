const path = require('path')
const hbs = require('hbs')
const express =  require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars and views location
app.set("view engine",'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title :'weather-app',
        name :'likhitha'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title :'About',
        name :'likhitha'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title :'Help',
        message :'Any help u need??',
        name : 'likhitha'

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please provide an address'
        })
        
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send({
            location : location,
            forecast : forecastData,
            address  : req.query.address
        })
   
        })
        
    })
    
})


 app.get('/help/*',(req,res)=>{
     res.render('404',{
         title :'404',
         error_message : 'Help article not found...',
         name :'likhitha'

     })

 })
  
 app.get('*',(req,res)=>{
     res.render('404',{
         title: '404',
        error_message : 'Page not found',
        name: 'likhitha'
     })

 })


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
