const axios = require('axios');
const Movies = require('../models/Movies.model')
require('dotenv').config();
const movieSite = process.env.MOVIES_SITE;
const movieKey = process.env.MOVIES_KEY;
const Cache = require('../helper/Cache');
const cacheObj = new Cache();

const movies = (req, res) => { // callback function of what we should do with our request
    let city = req.query.query;
    const movie = `movies-${city}`;
    if (city) {
        if (cacheObj[movie] && (Date.now() - cacheObj[movie].timestamp < 86400000)) {
            res.json(cacheObj[movie]);
            console.log('cache');
        } else {

            axios.get(`${movieSite}?api_key=${movieKey}&query=${city}`).then(response => {
                const responseData = response.data.results.map(obj => new Movies(obj));
                cacheObj[movie] = responseData;
                cacheObj[movie].timestamp = Date.now();
                res.json(responseData)
                console.log('api');


            }).catch(error => { res.send(error.message) });
        }
    } else {
        res.send('please provide a valid city')
    }
}

module.exports = movies;