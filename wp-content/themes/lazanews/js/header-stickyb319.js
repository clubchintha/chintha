
//header fixed
/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

var cbpAnimatedHeader = (function($) {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
		didScroll = false,
		changeHeaderOn = 300,
		changeScrollOn = $(window).height();
		
	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 200 );
			}
		}, false );
	}
	function scrollPage() {
		var sy = scrollY();
		if($(window).width() > 991) {
			if(sy >= changeScrollOn){
				$('#topcontrol').addClass('active');
			}
			else{
				$('#topcontrol').removeClass('active');
			}
			if ( sy >= changeHeaderOn ) {
				$(header).addClass('navbar-shrink');
				$('body').addClass('navbar-fixed');
				$('body').removeClass('navbar-did-fixed');
				
			}
			else {
				$(header).removeClass('navbar-shrink');
				$('body').removeClass('navbar-fixed');
				$('body').addClass('navbar-did-fixed');
			}
		}
		didScroll = false;
	}
	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
	init();
	
})(jQuery);
