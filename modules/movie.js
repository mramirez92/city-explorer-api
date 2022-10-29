'use strict'
const axios = require('axios');
let cache = require('./cache.js');


async function movieMod(request,response,next){
  try{
    let movieCity = request.query.movieCity;
    // *** key for cache, store data
    let key= movieCity+ 'movie';

// *** data exist!!! and valid time stamp (cache[key].timestamp)
// if cache key and cache timestap is less than time of requested timestamp, return cache if 1000(rightnow)- 500(cache timestamp) < (is less than) this time RETURN cache
// if not get data from API
if(cache[key] && (Date.now() - cache [key].timestamp < 1.21e+9)){
  response.status(200).send(cache[key].data);

} else{ 
    
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieCity}&language=en`
    let movieResults = await axios.get(movieUrl);
    let  groomedData = movieResults.data.results.map(movie =>new Movie(movie));

    cache[key]={
      data:groomedData,
      timestamp: Date.now()
    };

     response.status(200).send(groomedData);
};

  
    }catch(error){
      console.log(error);
      next(error);
    }
}

class Movie{
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.posterPath =movieObj.poster_path;
  }
}

module.exports = movieMod;