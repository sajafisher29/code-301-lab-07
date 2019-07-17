'use strict';

//Load environment variables from the dotenv file
require('.env').config();

//Application dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//Application setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

//API routes
app.get('/location', locationIdentify);
app.get('/weather', weatherIdentify);

//Constructor functions
function Location(query, res) {
  this.city_query = query;
  this.formattedQuery = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toDateString();
}

//Helper functions
function locationIdentify(req, res) { 
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data}&key=${process.env.GEOCODE_API_KEY}`

  return superagent.get(url)
    .then (res => {
      const location = new Location(req.query.data, JSON.parse(res.text));
      res.send(location);
    })
    .catch (err => {
      res.send(err);
    })
}

function weatherIdentify(req, res) {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.data.latitude},${req.query.data.longitude}`

  return superagent.get(url)
    .then (res => {
      const weatherEntries = res.body.daily.map(day => {
        return new Weather(day);
      })
      res.send(weatherEntries);
    })
    .catch (err => {
      res.send(err);
    })
}

//Make sure the server is listening for requests
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
