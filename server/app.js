require("dotenv").config();
const express = require("express");
// const cors = require('cors');
const app = express();

// for building routers in api
const router = require('./api');

//cross origin resource sharing middleware
// app.use(cors())

app.use(express.json())



const morgan = require('morgan');
app.use(morgan('dev'));

// Setup your Middleware and API Router here

app.use('/api', router); // sends requests to */api to the api routers

module.exports = app;