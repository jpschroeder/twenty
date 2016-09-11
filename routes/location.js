var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();

var LocationRequest = require('./location_request');
var LocationResponse = require('./location_response');

router.get('/request', function(req, res, next) {
  res.render('location_request', { title: 'Location Request' });
});

router.post('/request', function(req, res, next) {
  var token = uuid.v4();
  LocationRequest.create({
    token: token
  })
  .then(function(row){
    return res.redirect('/location/response/' + token);
  });
});

router.get('/response/:token', function(req, res, next) {
  var token = req.params.token;
  var request = {};
  LocationRequest.findOne({
    where: { token: token }
  })
  .then(function(requestRow){
    if (!requestRow) {
      return res.redirect('/location/request');
    }
    request = requestRow.get({ plain: true });
    return LocationResponse.findAll({
      where: { token: token },
      order: [
        ['id', 'DESC']
      ]
    });
  })
  .then(function(responseRows) {
    var responses = responseRows.map(function(r){
      var response = r.get({ plain: true });
      var latlng = response.latitude + ',' + response.longitude;
      //response.googlemapslink = 'http://maps.google.com/?q=' + latlng;
      response.googlemapslink = 'http://www.google.com/maps/place/' + latlng;
      response.googleimg = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latlng;
      response.googleimg += '&markers=' + latlng + '&size=600x300';
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
});

router.post('/response/:token', function(req, res, next) {
  var token = req.params.token;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  LocationResponse.create({
    token: token,
    latitude: latitude,
    longitude: longitude
  })
  .then(function(row){
    return res.redirect('/location/response/' + token);
  });
});

module.exports = router;
