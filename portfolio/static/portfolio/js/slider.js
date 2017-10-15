var pos = 0;

function autoSlide(){
  var index;
  var slides = document.getElementsByClassName("slide");
  for(index = 0; index < slides.length; index++){
    slides[index].style.display = "none";
  }
  if(pos >= slides.length){
    pos = 0;
  }
  slides[pos].style.display = "block";
  pos ++;
  setTimeout(autoSlide,4000);
}

autoSlide();
