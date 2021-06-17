const axios = require('axios');
const Weather = require('../models/Weather.model')
require('dotenv').config();
const weatherKey = process.env.WEATHER_API_KEY;
const weatherSite = process.env.WEATHER_SITE;
const Cache = require('../helper/Cache');
const cacheObj = new Cache();

const data = (req, res) => { // callback function of what we should do with our request
    let lat = req.query.lat;
    let lon = req.query.lon;
    const reqKey = `weather-${lat}-${lon}`;
    
    if (lat && lon) {
        if (cacheObj[reqKey] && (Date.now() - cacheObj[reqKey].timestamp < 86400000)) {
            res.json(cacheObj[reqKey]);
        } else {

            axios.get(`${weatherSite}?key=${weatherKey}&lat=${lat}&lon=${lon}`).then(response => {
                const responseData = response.data.data.map(obj => new Weather(obj));
                cacheObj[reqKey] = responseData;
                cacheObj[reqKey].timestamp = Date.now();
                res.json(responseData)
            }).catch(error => { res.send(error.message) });
        }
    } else {
        res.send('please provide a valid lat and lon')
    }
};

module.exports = data;
