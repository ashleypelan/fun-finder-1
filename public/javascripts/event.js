var data = JSON.parse(document.getElementsByClassName('hidden')[0].innerHTML);
var events = data;
var title = document.getElementsByClassName('title')[0];
var description = document.getElementsByClassName('description')[0];
var exploreButton = document.getElementById('button grad transition');
var len = events.length;
var duplicateCheck = [];

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
    trigger = 0;
    duplicateCheck.push(num);
    var specificEvent = events[randomInterest].categories[randomCat];
    title.innerHTML = specificEvent.titles[randomEvent];
    description.innerHTML = specificEvent.description[randomEvent];
  } else {
    console.log(trigger);
    trigger = 0;
    randomizer(events, len);
  }
}

randomizer(events, len);

exploreButton.addEventListener('click', function () {
  randomizer(events, len);
})
