'use strict'

console.log('yiss');

// consoles for our servers are going to live in our servers npm start --> show console logs
// nodemon to see continous logs without constant npm start, remember to shutdown port  npx kill-port {port number}

// *** REQUIRES ****
// all of this library is living in this variable = like import in react

const express = require('express');

// requires us to pull from .env or else it will default to open whatever port defined after ||
require('dotenv').config();
let weatherData = require ('./data/weather.json')
const cors = require('cors');

// name of server:
const app = express();

// middleware to share resources to share across internet
app.use(cors());

// define port:
const PORT = process.env.PORT || 3002;


//  *** ENDPOINTS  **** order matters!!!

// base endpoint
// get is also an express method, server listening for get, 
// app.get('endpoint', function?)
app.get('/', (request, response)=> {
console.log('app get showing up');
response.status(200).send('welcome to my server');
});

app.get('/howdy', (request, response)=>{
  // this console logs if after our endpoint contains a query ?key=value
  // we can pull from querys they are stored in objects, we can then pull them by calling them out in variables 
  console.log(request.query);
  let firstName= request.query.firstName;
  let lastName = request.query.lastName;

  

  response.status(200).send(`HOWDY! ${firstName} ${lastName}`);
});
// !!!!!!!!
app.get('/weather',(request,response,next)=>{
  let cityNameQ = request.query.cityNameQ;
    // let lat = request.query.lat;
    // let lon = request.query.lon;

try{
    
    // search thru data file to find cityNameQ
    let cityNameData= weatherData.find(cityObj =>cityObj.city_name === cityNameQ);

    // creating new objects with search query, brings all of the object 
    let groomedData = cityNameData.data.map(day => new Forecast(day));
    response.status(200).send(groomedData);

  }catch{
    next(error);
  }; 
});

class Forecast{
  constructor (dayObj){
    this.date = dayObj.datetime;
    this.description = dayObj.weather.description;
  };
};


//  '*'=catch all, catch anything MUST LIVE IN BOTTOM 
app.get('*', (request, response)=> {
  response.status(404).send('this route doesnt exist');
})

//  *** ERROR HANDLING ***
// express error handling, pass it to next 
app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
})

//  **** SERVER START ****
app.listen(PORT, ()=> console.log(`running on port ${PORT}`));