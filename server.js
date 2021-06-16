const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const indexController = require('./controller/Index.controller');
const data = require('./controller/Data.controller');
const movies = require('./controller/Movies.controller');

app.use(cors()) // after you initialize your express app instance

// a server endpoint 
app.get('/', indexController);


app.get('/data',data); // our endpoint name


app.get('/movies',movies);




app.listen(port) // kick start the express server to work