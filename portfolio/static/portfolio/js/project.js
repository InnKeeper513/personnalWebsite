
	$.fn.jQuerySimpleCounter = function( options ) {
	    var settings = $.extend({
	        start:  0,
	        end:    100,
	        easing: 'swing',
	        duration: 400,
	        complete: ''
	    }, options );

	    var thisElement = $(this);

	    $({count: settings.start}).animate({count: settings.end}, {
			duration: settings.duration,
			easing: settings.easing,
			step: function() {
				var mathCount = Math.ceil(this.count);
				thisElement.text(mathCount);
			},
			complete: settings.complete
		});
	};

	var slideIndex = 1;
	showDivs(slideIndex);

	function plusDivs(n) {
	  showDivs(slideIndex += n);
	}

	function showDivs(n) {
	  var i;
	  var x = document.getElementsByClassName("mySlides");
	  if (n > x.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = x.length}
	  for (i = 0; i < x.length; i++) {
	     x[i].style.display = "none";
	  }
	  x[slideIndex-1].style.display = "block";
	};

$('#number1').jQuerySimpleCounter({end: 8,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 6,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 7,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 2,duration: 2500});



        $(document).ready(function(){
         $('.entry').hover(function(){
           var li = $('li', this);

           for(var i = 0; i < $(li).length; i++){
             $($(li)[i]).stop().animate({
	             'height':'18px'
           		}, 300 + (i * 150));
           }
         }, function(){
           $('li', this).stop().animate({
             'height':'5px'
           }, 250);
         });
        });

// To add a unique id for all projects
// To add a unique id for a href
// To assign images for each pop up window
//
$(document).ready(function(){
	var all = document.getElementByTagName("article");
	for(var i = 0; i < all.length; i++){
		console.log(i);
	}
});
