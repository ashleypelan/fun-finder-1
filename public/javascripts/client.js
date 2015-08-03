var all = document.getElementsByClassName('all')[0];


all.addEventListener('click', function(e){
  if(e.target.style.border === ""){
    e.target.style.opacity = 1.0;
    e.target.style.border = "solid 5px #EF8E16";
    if(e.target.className === "label"){
      e.target.style.opacity = "";
      e.target.style.border = "";
    }
  } else {
    e.target.style.opacity = "";
    e.target.style.border = "";
  }
})
