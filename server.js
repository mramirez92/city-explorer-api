'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const weather = require('./modules/weather.js');
const movieMod= require('./modules/movie.js');

app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/weather', weatherHandler);
app.get('/movies', movieMod);


function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
} 

app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
})

app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));