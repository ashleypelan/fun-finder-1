var unirest = require('unirest');
var baseURL = 'http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=';

function Category (name, array) {
  var titles = [];
  var description = [];
  var startTime = [];
  var stopTime = [];
  var venue = [];
  var venueAddress = [];
  // var image = [];
  for (var i = 0; i < array.length; i++) {
    titles.push(array[i].title);
    description.push(array[i].description);
    startTime.push(array[i].start_time);
    stopTime.push(array[i].stop_time);
    venue.push(array[i].venue);
    venueAddress.push(array[i].venue_address);
    // image.push(array[i].image);
    //to grab an image events.event.image.url
  }
  this.name = name;
  this.titles = titles;
  this.description = description;
  this.startTime = startTime;
  this.stopTime = stopTime;
  this.venue = venue;
  this.venueAddress = venueAddress;
  // this.image = image;
}

function Interest(name) {
  this.name = name;
}

Interest.prototype.API = function (categories, output, cb, counter) {
  var info = [];
  unirest.get(baseURL + categories[0] + '&location=Denver&date=Future',
  function (data) {
    var response = JSON.parse(data.body);
    info.push(new Category(categories[0], response.events.event));

    unirest.get(baseURL + categories[1] + '&location=Denver&date=Future',
    function (data2) {
      var response2 = JSON.parse(data2.body);
      info.push(new Category(categories[1], response2.events.event));

      unirest.get(baseURL + categories[2] + '&location=Denver&date=Future',
      function (data3) {
        var response3 = JSON.parse(data3.body);
        info.push(new Category(categories[2], response3.events.event));

        unirest.get(baseURL + categories[3] + '&location=Denver&date=Future',
        function (data4) {
          var response4 = JSON.parse(data4.body);
          info.push(new Category(categories[3], response4.events.event));

          console.log(info);
          counter(info, output, cb);
        });
      });
    });
  });
}

var counter = function (info, output, cb) {
  var trigger = 0;
  this.categories = info;
  trigger ++;
  if(trigger === output.length);
    // console.log(output);
    cb(output);
}

var filterCategories = function (input, cb) {
  var outdoors = ['outdoors_recreation', 'animals', 'sports', 'festivals_parades'];
  var nightLife = ['comedy', 'film', 'food', 'singles_social'];
  var family = ['learning_education', 'family_fun_kids', 'attractions', 'community'];
  var arts = ['music', 'books', 'art', 'performing_arts'];
  var free = [];
  var categories = {outdoors: outdoors, nightLife: nightLife, family: family, arts: arts};
  var interests = input.replace(/[{}:"',]/g, '').split('on');
  var output = [];
  for (var i = 0; i < interests.length -1; i++) {
     output.push(new Interest(interests[i]));
  }
  for (var j = 0; j < output.length; j++) {
    var api = output[j].API;
    // console.log(categories[output[j].name]);
    api(categories[interests[j]], output, cb, counter.bind(output[j]));
  }
}

module.exports = {
  apiCall: filterCategories
}