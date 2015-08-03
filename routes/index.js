var express = require('express');
var router = express.Router();
var categorize = require('./../lib/javascripts/categories.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// Events Page
router.get('/events', function (req, res, next) {
  // console.log(req.query);
  categorize.apiCall(JSON.stringify(req.query), function (info) {
    // console.log(info);
    res.render('events', {events: JSON.stringify(info)});
  });
});



module.exports = router;
