/*var pos = 0;
var slides = document.getElementsByClassName("slide");
var contents = document.getElementsByClassName("inline");

function autoSlide(){
  var index;

  for(index = 0; index < slides.length; index++){
    slides[index].style.display = "none";
  }
  for(index = 0; index < contents.length; index++){
    contents[index].style.display = "none";
  }
  if(pos >= slides.length){
    pos = 0;
  }
  slides[pos].style.display = "block";
  for(index = 0; index < 3; index ++){
    contents[pos * 3 + index].style.display = "block";
  }
  pos ++;
  setTimeout(autoSlide,2500);

}

autoSlide();
*/
