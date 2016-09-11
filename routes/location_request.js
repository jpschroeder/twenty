var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var LocationRequest = sequelize.define('location_request', {
  token: Sequelize.UUID
}, {
  indexes: [{
    unique: true,
    fields: ['token']
  }]
});

module.exports = LocationRequest;
