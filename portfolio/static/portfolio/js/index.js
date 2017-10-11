
const delay = {
  1: 500,
  3: 1000,
  4: 1500,
  2: 2000,
};

$(document).ready(function(){
  $("#header .container p").css("opacity", 0);
  $("#header .container p").removeAttr("hidden");
  $("#header .container p").each(function(i){
    const _this = $(this);
    setTimeout(function(){
      _this.animate({
          opacity: 1,
      }, 2000);
    }, delay[i+1]);
  });
});
