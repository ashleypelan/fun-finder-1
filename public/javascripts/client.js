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

// var first = document.getElementsByTagName('label')[0];
// var second = document.getElementsByTagName('label')[1];
// var third = document.getElementsByTagName('label')[2];
// var fourth = document.getElementsByTagName('label')[3];
// var fifth = document.getElementsByTagName('label')[4];
//
//
// first.addEventListener('click', function(){
//   if(first.parentNode.style.opacity === "" ){
//   first.parentNode.style.border = "5px solid #EF8E16";
//   first.parentNode.style.opacity = 1.0;
// } else {
//   first.parentNode.style.border = "";
//   first.parentNode.style.opacity = "";
// }
// });
//
// second.addEventListener('click', function(){
//   if(second.parentNode.style.opacity === "" ){
//   second.parentNode.style.border = "5px solid #EF8E16";
//   second.parentNode.style.opacity = 1.0;
// } else {
//   second.parentNode.style.border = "";
//   second.parentNode.style.opacity = "";
// }
// });
//
// third.addEventListener('click', function(){
//   if(third.parentNode.style.opacity === "" ){
//   third.parentNode.style.border = "5px solid #EF8E16";
//   third.parentNode.style.opacity = 1.0;
// } else {
//   third.parentNode.style.border = "";
//   third.parentNode.style.opacity = "";
// }
// });
//
// fourth.addEventListener('click', function(){
//   if(fourth.parentNode.style.opacity === "" ){
//   fourth.parentNode.style.border = "5px solid #EF8E16";
//   fourth.parentNode.style.opacity = 1.0;
// } else {
//   fourth.parentNode.style.border = "";
//   fourth.parentNode.style.opacity = "";
// }
// });
//
// fifth.addEventListener('click', function(){
//   if(fifth.parentNode.style.opacity === "" ){
//   fifth.parentNode.style.border = "5px solid #EF8E16";
//   fifth.parentNode.style.opacity = 1.0;
// } else {
//   fifth.parentNode.style.border = "";
//   fifth.parentNode.style.opacity = "";
// }
// });
