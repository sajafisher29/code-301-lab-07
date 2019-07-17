'use strict';

//Code review: Application dependencies
const express = require('express');

//Code review: Application setup
const app = express();
const PORT = process.env.PORT || 3000;

//Code review: API routes
app.get('/location', locationIdentify);
app.get('/weather', weatherIdentify);

//Code review: Constructor functions
function Location(query, geoData) { 
  this.city_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(forecast, time) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toDateString();
}
//Code review: Adjusted the date formula to correctly show the date without time. Previously showing all the same day.

//Code review: Helper functions
function locationIdentify(req, res) { 
  try { 
    if (req.query.data === 'Lynnwood') {
      const geoData = require('./data/geo.json');
      const user_location = new Location(req.query.data, geoData);
      res.send(user_location);
    } else { 
      res.status(500).send('Sorry, something went wrong');
    }
  }
  catch (err) { 
    res.status(500).send('Sorry, something went wrong');
  }
}

function weatherIdentify(req, res) {
  if (req.query.data === 'Lynnwood') {
      const weatherArr = [];
      const darkskyData = require('./data/darksky.json');
      const weatherEntries = darkskyData.body.daily.data.map(day => {return darkskyData.send(weatherArr);}
  } else { 
    res.status(500).send('Sorry, something went wrong');
    } 
};

//Code review: make sure the server is listening for requests
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
