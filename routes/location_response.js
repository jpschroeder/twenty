var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var LocationResponse = sequelize.define('location_response', {
  token: Sequelize.UUID,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT
}, {
  indexes: [{
    fields: ['token']
  }]
});

module.exports = LocationResponse;
