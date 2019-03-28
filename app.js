require('dotenv').config();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var location = require('./location');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
  return res.redirect('/location/request');
});
app.use('/location', location);

const port = 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))
