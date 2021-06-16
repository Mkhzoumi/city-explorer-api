const axios = require('axios');
const Movies = require('../models/Movies.model')
require('dotenv').config();
const movieSite = process.env.MOVIES_SITE;
const movieKey= process.env.MOVIES_KEY;

const movies = (req, res) =>{ // callback function of what we should do with our request
    let city= req.query.query;
    if (city) {
    axios.get(`${movieSite}?api_key=${movieKey}&query=${city}`).then(response=>{
        const responseData=response.data.results.map(obj => new Movies(obj));
        res.json(responseData)
    }).catch(error=>{res.send(error.message)});
    // res.json(data) // our endpoint function response
}else {
    res.send('please provide a valid city')
}
}

module.exports = movies;