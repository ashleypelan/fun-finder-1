var express = require('express');
var router = express.Router();
var categories = require('./../lib/javascripts/categories.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// Events Page
router.get('/events', function (req, res, next) {
  res.render('events');
});
// Get User Input
router.post('/events', function (req, res, next) {
  categories.outdoors(function (info) {
    res.render('events', {events: info});
  });
});


module.exports = router;
