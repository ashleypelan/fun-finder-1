var data = JSON.parse(document.getElementsByClassName('hidden')[0].innerHTML);
var events = data;
var title = document.getElementsByClassName('title')[0];
var description = document.getElementsByClassName('description')[0];
var startTime = document.getElementsByClassName('start-time')[0];
var venueAddress = document.getElementsByClassName('venue-address')[0];
var latitude = document.getElementsByClassName('latitude')[0];
var longitude = document.getElementsByClassName('longitude')[0];
var mainImage = document.getElementsByClassName('main-image')[0];
var exploreButton = document.getElementById('button grad transition');
var len = events.length;
var duplicateCheck = [];
var favs = {};

var randomizer = function (events, len) {
  var randomInterest = Math.floor(Math.random() * len);
  var randomCat = Math.floor(Math.random() * len);
  var randomEvent = Math.floor(Math.random() * 9);
  var num = String(randomInterest) + String(randomCat) + String(randomEvent);
  var trigger = 0;
  for (var i = 0; i < duplicateCheck.length; i++) {
    if(duplicateCheck[i] === num){
      trigger ++;
    }
  }

  if(trigger === 0) {
    // trigger = 0;
    duplicateCheck.push(num);
    var specificEvent = events[randomInterest].categories[randomCat];
    title.innerHTML = specificEvent.titles[randomEvent];
    description.innerHTML = specificEvent.description[randomEvent];
    startTime.innerHTML = specificEvent.startTime[randomEvent];
    venueAddress.innerHTML = specificEvent.venueAddress[randomEvent] + '<br>' + 'Denver, CO' + '</br>';
    latitude.innerHTML = specificEvent.latitude[randomEvent];
    longitude.innerHTML = specificEvent.longitude[randomEvent];
    favs = {title: specificEvent.titles[randomEvent], description: specificEvent.description[randomEvent],
                time: specificEvent.startTime[randomEvent], address: specificEvent.venueAddress[randomEvent]};
    // Google Maps
    function initialize() {
      var myLatlng = new google.maps.LatLng(latitude.innerHTML,longitude.innerHTML);

      var mapOptions = {
        center:  myLatlng,
        zoom: 15
      }
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var marker = new google.maps.Marker({
          position:  myLatlng,
          map: map,
          title: 'Hello World!'
      });
    }
    if(duplicateCheck.length ===1) {
      google.maps.event.addDomListener(window, 'load', initialize);
      return favs;
    } else {
      google.maps.event.addDomListener(exploreButton, 'click', initialize);
      return favs;
    }
    
  } else  {
    console.log(trigger);
    trigger = 0;
    randomizer(events, len);
  }
}

randomizer(events, len);

exploreButton.addEventListener('click', function () {
  randomizer(events, len);
});
