
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


// To assign images for each pop up window

$(document).ready(function(){
	var all = document.getElementsByTagName('article');
	var pop = document.getElementsByClassName('overlay');
	for(var i = 0; i < all.length; i++){
		all[i].id = i;
		all[i].getElementsByTagName('a')[0].setAttribute('href','#popup'+i);
		pop[i].id = 'popup' + i;

		// give the button there own unique ids.
		pop[i].getElementsByTagName('button')[0].setAttribute('id','left'+i);
		pop[i].getElementsByTagName('button')[1].setAttribute('id','right'+i);

		// give the images unique id
		var images = pop[i].getElementsByTagName('img');
		for(var j = 0; j < images.length; j++){
			images[j].className +='mySlides'+i;
		}
	}

	// Originally set all images to not display
	var image_styles = document.getElementsByClassName('overlay');
	for(var i = 0; i < image_styles.length; i++){
		var images = image_styles[i].getElementsByTagName('img');
		for(var j = 0; j < images.length; j++){
			if(j != 0)
				images[j].style.display="none";
		}
	}
});

function plusDivs(n,ele) {
	var lastChar = ele.id.charAt(ele.id.length-1);
	showDivs(slideIndex += n,lastChar);
}

function showDivs(n,char) {
	var i;
	var x = document.getElementsByClassName("mySlides"+char);
	if (n > x.length) {slideIndex = 1}
	if (n < 1) {slideIndex = x.length}
	for (i = 0; i < x.length; i++) {
		 x[i].style.display = "none";
	}
	if(x[slideIndex-1])
		x[slideIndex-1].style.display = "block";
};
