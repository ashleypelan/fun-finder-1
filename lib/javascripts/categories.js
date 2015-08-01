var unirest = require('unirest');
var categories = ['outdoors_recreation', 'animals', 'sports', 'festivals_parades'];

function Itterate (name, array) {
  var cat = {};
  var titles = [];
  var description = [];
  for (var i = 0; i < array.length; i++) {
    titles.push(array[i].title)
    description.push(array[i].description)
  }
  cat.titles = titles;
  cat.description = description;
  return cat;
}


var outdoorsAPI = function (cb) {
  var info = [];
  unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categories[0] + '&location=Denver&date=Future',
  function (data) {
    var response = JSON.parse(data.body)
    var outdoors = itterate(response.events.event)
    info.push(outdoors);

    unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categories[1] + '&location=Denver&date=Future',
    function (data2) {
      var response2 = JSON.parse(data2.body)
      var animals = itterate(response2.events.event)
      info.push(animals);

      unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categories[2] + '&location=Denver&date=Future',
      function (data3) {
        var response3 = JSON.parse(data3.body)
        var sports = itterate(response3.events.event)
        info.push(sports);

        unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categories[3] + '&location=Denver&date=Future',
        function (data4) {
          var response4 = JSON.parse(data4.body)
          var festivals = itterate(response4.events.event)
          info.push(festivals);
          cb(info);
        });
      });
    });
  });

}


module.exports = {
  outdoors: outdoorsAPI
}
