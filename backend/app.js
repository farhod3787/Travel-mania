const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path")

const cors = require("cors");
const app = express();
const CountryRoute = require("./routes/countrys")
const HotelRoute = require("./routes/hotels")

app.use(cors());

mongoose.connect("mongodb://localhost:27017/travel-mania").then(() => {
        console.log('Connected to database')
    })
    .catch(() => {
        console.log('Error in connected database')
    });

module.exports = { mongoose };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/photos', express.static(path.join("backend/photos")));
app.use('/api/country', CountryRoute)
app.use('/api/hotel', HotelRoute)

module.exports = app;