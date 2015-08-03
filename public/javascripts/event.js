var data = JSON.parse(document.getElementsByClassName('hidden')[0].innerHTML);
var events = data;
var title = document.getElementsByClassName('title')[0];
var description = document.getElementsByClassName('description')[0];
var len = events.length;

var randomizer = function (events, len) {
  var randomInterest = Math.floor(Math.random() * len);
  var randomCat = Math.floor(Math.random() * len);
  var randomEvent = Math.floor(Math.random() * 9);
  var specificEvent = events[randomInterest].categories[randomCat];
  console.log(specificEvent.titles[randomEvent])
  title.innerHTML = specificEvent.titles[randomEvent];
  description.innerHTML = specificEvent.description[randomEvent];

}

randomizer(events, len);
