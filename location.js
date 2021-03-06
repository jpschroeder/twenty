var uuid = require('node-uuid');
var moment = require('moment');
var express = require('express');
var router = express.Router();

var LocationRequest = {};
var LocationResponse = {};

router.get('/request', function(req, res, next) {
  res.render('location_request', { title: 'Location Request' });
});

router.post('/request', function(req, res, next) {
  var token = uuid.v4();
  LocationRequest[token] = {
    token: token,
    createdAt: new Date()
  };
  LocationResponse[token] = [];
  return res.redirect('/location/response/' + token);
});

router.get('/response/:token', function(req, res, next) {
  var token = req.params.token;
  var request = LocationRequest[token];
  if (!request) {
    return res.redirect('/location/request');
  }
  var responseRows = LocationResponse[token];
  if (!responseRows) {
    responseRows = [];
  }

  var responses = responseRows.map(function(response){
    var latlng = response.latitude + ',' + response.longitude;
    //response.googlemapslink = 'http://maps.google.com/?q=' + latlng;
    response.googlemapslink = 'http://www.google.com/maps/place/' + latlng;
    response.googleimg = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latlng;
    response.googleimg += '&markers=' + latlng + '&size=800x400';
    response.googleimg += '&key=' + process.env.GOOGLEMAPS_KEY;
    response.createdAtString = moment(response.createdAt).fromNow();
    response.latitudeRound = Math.round(response.latitude * 1000) / 1000;
    response.longitudeRound = Math.round(response.longitude * 1000) / 1000;
    return response;
  });
  var hasresponse = (responses.length > 0);
  var lastresponse = hasresponse? responses[0] : null;

  return res.render('location_response', {
    title: 'Location Response',
    request: request,
    responses: responses,
    hasresponse: hasresponse,
    lastresponse: lastresponse
  });
});

router.post('/response/:token', function(req, res, next) {
  var token = req.params.token;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  LocationResponse[token].unshift({
    token: token,
    latitude: latitude,
    longitude: longitude,
    createdAt: new Date()
  })
  return res.redirect('/location/response/' + token);
});

module.exports = router;
