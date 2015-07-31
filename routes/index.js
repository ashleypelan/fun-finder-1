var express = require('express');
var router = express.Router();
var unirest = require('unirest');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// Events Page
router.get('/events', function (req, res, next) {
  res.render('events');
});

router.post('/events', function (req, res, next) {
  var category = 'outdoors_recreation'
  var response = [];
    unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + category + '&location=Denver&date=Future', function (data) {
      console.log(data.body[1]);
      res.render('index', {info: JSON.stringify(data)})
  });
});


module.exports = router;
