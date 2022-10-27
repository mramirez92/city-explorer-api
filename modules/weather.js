'use strict'
const axios = require('axios');

async function weatherMod(request,response,next){
  try{
    console.log(request);
      let lat = request.query.lat;
      let lon = request.query.lon;
  
      let weatherApiUrl= `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=6`;
  
      let weatherData= await axios.get(weatherApiUrl);
    
      // creating new objects with search query, brings all of the object 
      let groomedData = weatherData.data.data.map(day => new Forecast(day));
      response.status(200).send(groomedData);
  
    }catch(error){
      next(error);
    }
}

class Forecast{
  constructor (dayObj){
    this.date = dayObj.datetime;
    this.description = dayObj.weather.description;
  }
}

module.exports = weatherMod;