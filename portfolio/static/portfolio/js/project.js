
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
