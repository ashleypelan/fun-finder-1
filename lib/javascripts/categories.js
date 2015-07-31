var unirest = require('unirest');
var categoriesO = ['outdoors_recreation', 'animals', 'sports']

var outdoorsAPI = function (cb) {

  var titles = [];
  unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categoriesO[0] + '&location=Denver&date=Future',
  function (data) {
    var response = JSON.parse(data.body)
    titles.push(response.events.event[0].title)
    console.log(response.events.event[0].title);
  });
  unirest.get('http://api.eventful.com/json/events/search?app_key=' + process.env.EVENTFUL_KEY + '&keywords=' + categoriesO[1] + '&location=Denver&date=Future',
  function (data2) {
    var response = JSON.parse(data.body)
    titles.push(response.events.event[0].title)
    console.log(response.events.event[0].title);
    cb(titles);
  });

}

module.exports = {
  outdoors: outdoorsAPI
}
