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

Interest.prototype.API = function (categories, output, interest, cb, counter) {
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

          // console.log(info);
          counter(info, output, interest, cb);
        });
      });
    });
  });
}

var trigger = 0;
var counter = function (info, output, interest, cb) {
  for (var i = 0; i < output.length; i++) {
    if(output[i].name === interest) {
      output[i].categories = info;
    }
  }
  trigger ++;
  if (trigger  === output.length) {
    cb(output);
  }
}

var filterCategories = function (input, cb) {
  var outdoors = ['outdoors_recreation', 'animals', 'sports', 'festivals_parades'];
  var nightLife = ['comedy', 'film', 'food', 'singles_social'];
  var family = ['learning_education', 'family_fun_kids', 'attractions', 'community'];
  var arts = ['music', 'books', 'art', 'performing_arts'];
  var free = [];
  var categories = {outdoors: outdoors, nightLife: nightLife, family: family, arts: arts};
  var interests = input.replace(/[{}:"',&]/g, '').split('on');
  var len = interests.length -1;
  var output = [];

  if (len === 1) {
    output.push(new Interest(interests[0]));
    output[0].API(categories[interests[0]], output, interests[0], cb, counter.bind(this));
  } else if (len === 2) {
    output.push(new Interest(interests[0]));
    output[0].API(categories[interests[0]], output, interests[0], cb, counter.bind(this));
    output.push(new Interest(interests[1]));
    output[1].API(categories[interests[1]], output, interests[1], cb, counter.bind(this));
  } else if (len === 3) {
    output.push(new Interest(interests[0]));
    output[0].API(categories[interests[0]], output, interests[0], cb, counter.bind(this));
    output.push(new Interest(interests[1]));
    output[1].API(categories[interests[1]], output, interests[1], cb, counter.bind(this));
    output.push(new Interest(interests[2]));
    output[0].API(categories[interests[2]], output, interests[2], cb, counter.bind(this));
  } else if (len === 4) {
    output.push(new Interest(interests[0]));
    output[0].API(categories[interests[0]], output, interests[0], cb, counter.bind(this));
    output.push(new Interest(interests[1]));
    output[1].API(categories[interests[1]], output, interests[1], cb, counter.bind(this));
    output.push(new Interest(interests[2]));
    output[0].API(categories[interests[2]], output, interests[2], cb, counter.bind(this));
    output.push(new Interest(interests[3]));
    output[0].API(categories[interests[3]], output, interests[3], cb, counter.bind(this));
  } else {
    output.push(new Interest(interests[0]));
    output[0].API(categories[interests[0]], output, interests[0], cb, counter.bind(this));
    output.push(new Interest(interests[1]));
    output[1].API(categories[interests[1]], output, interests[1], cb, counter.bind(this));
    output.push(new Interest(interests[2]));
    output[0].API(categories[interests[2]], output, interests[2], cb, counter.bind(this));
    output.push(new Interest(interests[3]));
    output[0].API(categories[interests[3]], output, interests[3], cb, counter.bind(this));
    output.push(new Interest(interests[4]));
    output[0].API(categories[interests[4]], output, interests[4], cb, counter.bind(this));
  }
}
module.exports = {
  apiCall: filterCategories
}
