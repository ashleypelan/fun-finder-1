if(document.getElementById('save-fav')) {
  var favorites = document.getElementById('save-fav');
  favorites.addEventListener("click", function() {
    var data = 'data=' + JSON.stringify(favs);
    var xhr = new XMLHttpRequest;
    xhr.open('post', '/favorites', true);
    xhr.addEventListener('load', function () {
      console.log('helloYo');
    });
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  })
}

if(document.getElementsByTagName("form")[1]) {
  var all = document.getElementsByTagName("form")[1];
  all.addEventListener("click", function(e){
    if(e.target.className === "category"){
      if(e.target.children[1].children[0].checked === false){
        e.target.style.border = "5px solid #EF8E16";
        e.target.style.opacity = 1;
        e.target.children[1].children[0].checked = true;
      } else {
        e.target.style.border = "";
        e.target.style.opacity = "";
        e.target.children[1].children[0].checked = false;
      }
    }
  })
}
