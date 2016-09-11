require('dotenv').config();

var uuid = require('node-uuid');

var sequelize = require('./routes/sequelize');
var LocationRequest = require('./routes/location_request');
var LocationResponse = require('./routes/location_response');

sequelize.sync().then(function() {
  var token = uuid.v4();
  return LocationRequest.create({
    token: token
  });
}).then(function(row) {
  console.log(row.get({ plain: true }));
});
