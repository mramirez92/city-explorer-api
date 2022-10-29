// 'use strict'

// console.log('yiss');

// // *** REQUIRES ****
// // all of this library is living in this variable = like import in react
// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const app = express();
// const weatherMod= require('./modules/myweather.js');
// const movieMod= require('./modules/movie.js');

// // middleware to share resources to share across internet
// app.use(cors());

// const PORT = process.env.PORT || 3002;

// //  *** ENDPOINTS  **** order matters!!!

// // base endpoint, app.get('endpoint', function?)
// app.get('/', (request, response)=> {
// console.log('app get showing up');
// response.status(200).send('welcome to my server');
// });

// app.get('/weather', weatherMod);

// app.get('/movies', movieMod);

// //  '*'=catch all, catch anything MUST LIVE IN BOTTOM 
// app.get('*', (request, response)=> {
//   response.status(404).send('this route doesnt exist');
// })

// //  *** ERROR HANDLING ***
// // express error handling, pass it to next 
// app.use((error, request, response, next)=>{
//   response.status(500).send(error.message);
// })

// //  **** SERVER START ****
// app.listen(PORT, ()=> console.log(`running on port ${PORT}`));