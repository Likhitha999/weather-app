console.log('client side js is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


 
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent="loading..."
    messageTwo.textContent=" "
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error

           // console.log(data.error)
        }else{
            messageOne.textContent= data.forecast
             messageTwo.textContent=data.location
           // console.log(data.forecast)
           // console.location(data.location)
         
        }
    })

})
})