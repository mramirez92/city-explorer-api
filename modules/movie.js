'use strict'
const axios = require('axios');

async function movieMod(request,response,next){
  try{
    let movieCity = request.query.movieCity;
    
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieCity}&language=en`
    
    let movieResults = await axios.get(movieUrl);
  
    let  groomedData = movieResults.data.results.map(movie =>new Movie(movie));
    response.status(200).send(groomedData);
  
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