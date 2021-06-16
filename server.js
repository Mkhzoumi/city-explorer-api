
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT;
const weatherKey= process.env.WEATHER_API_KEY;
const weatherSite = process.env.WEATHER_SITE;
const movieSite = process.env.MOVIES_SITE;
const movieKey= process.env.MOVIES_KEY;

app.use(cors()) // after you initialize your express app instance



// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello') // our endpoint function response
    })


app.get('/data', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        let lat= req.query.lat;
        let lon = req.query.lon;
        if (lat && lon) {
        axios.get(`${weatherSite}?key=${weatherKey}&lat=${lat}&lon=${lon}`).then(response=>{
            const responseData=response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error=>{res.send(error.message)});
        // res.json(data) // our endpoint function response
    }else {
        res.send('please provide a valid lat and lon')
    }
    });


    
app.get('/movies', // our endpoint name
function (req, res) { // callback function of what we should do with our request
    let city= req.query.query;
    if (city) {
    axios.get(`${movieSite}?api_key=${movieKey}&query=${city}`).then(response=>{
        const responseData=response.data.results.map(obj => new Movies(obj));
        res.json(responseData)
    }).catch(error=>{res.send(error.message)});
    // res.json(data) // our endpoint function response
}else {
    res.send('please provide a valid lat and lon')
}
});





    class Weather{
        constructor(obj){
            this.description=obj.weather.description;
            this.date=obj.datetime;

        }
    }


    class Movies{
        constructor(obj){
            this.title=obj.title;
            this.overview=obj.overview;
            this.avera_gevote=obj.vote_average;
            this.popularity=obj.popularity;
            this.release_date=obj.release_date;
        }
    }





app.listen(port) // kick start the express server to work