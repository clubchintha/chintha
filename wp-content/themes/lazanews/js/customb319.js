jQuery(document).ready(function($){
	 
	 $(".ub-iframe").fitVids();	
	 $('.tab-post-new li').click (function(){
		$('ul li.active').removeClass('active');
		$(this).addClass('active');
		var n = $(this).index();
		$(this).parent().parent().find('.info-post-new ul').stop(true,false).hide().eq(n).stop(true,false).show();				
			return false;			
	 });
	 $('.video-bxslider').bxSlider();
	 $('.thumbnail-bxslider').bxSlider({
		 mode: 'fade',
		 nextText: '<i class="fa fa-angle-right"></i>',
		 prevText: '<i class="fa fa-angle-left"></i>',
		 captions: true
	 });
	 
	 $('.tab-post-new').each(function(){
		$(this).find('li:eq(0)').addClass('active');
	 });
	 
	 if( $("#sidebar").length ) {
		$("#sidebar").stickit({
			scope: StickScope.Parent,
			top: 0
		});
	}
	
	if( $('.archive .wrap_inner_ajax').hasClass('col-sm-12') ) {
		$('.wp-pagenavi').addClass('col-sm-12');
	}
	
	$('.wrap-share').each(function(){
		var current_class = $(this).find('img').attr('class');
		$(this).addClass(current_class);
	});
	 
	 // jquery breaking news
	if($(window).width() > 767){
		if( $('.rst-list-breaking-news').length )
			$('.rst-list-breaking-news').vTicker();
	}
	
	$(".fancybox").fancybox({
		padding		: 0,
		helpers: {
			overlay: {
			  locked: false
			}
		},
		tpl: {
			next    : '<a class="fancybox-nav fancybox-next" href="javascript:;"><label class="fancybox-button fancybox-next"><i class="fa fa-angle-right"></i></label></a>',
			prev    : '<a class="fancybox-nav fancybox-prev" href="javascript:;"><label class="fancybox-button fancybox-prev"><i class="fa fa-angle-left"></i></label></a>'
		},
		scrolling 	: 'no',
		width		: '70%',
		height		: '70%',
		closeBtn	: false,
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'elastic',
		closeEffect	: 'elastic'
	});
	 
	 // Royan Slider
	 if( $('.ub-news-column').length ) {
		 $('.ub-news-column').royalSlider({
			arrowsNav: false,
			fadeinLoadedSlide: true,
			controlNavigationSpacing: 0,
			controlNavigation: 'thumbnails',

			thumbs: {
			  autoCenter: false,
			  fitInViewport: true,
			  orientation: 'vertical',
			  spacing: 0,
			  paddingBottom: 0
			},
			sliderDrag: false,
			keyboardNavEnabled: true,
			imageScaleMode: 'fill',
			imageAlignCenter:true,
			slidesSpacing: 0,
			loop: false,
			loopRewind: true,
			numImagesToPreload: 3,
			autoPlay: {
				enabled: true,
				pauseOnHover: true,
				stopAtAction: false,
				delay: 6000,
			},
			video: {
			  autoHideArrows:true,
			  autoHideControlNav:false,
			  autoHideBlocks: true
			},
			autoScaleSlider: true, 
			autoScaleSliderWidth: 960,     
			autoScaleSliderHeight: 363,
			imgHeight: 390,
			navigateByClick: false,
			visibleNearby: {
					navigateByCenterClick: false
			}

		  });
		  $(document).on('click', '.ub-news-column img.rsMainSlideImage', function(e){
			  e.preventDefault();
			  var url = $(this).next().find('h2 a').attr('href');
			  window.location = url;
		  });
	 }
	 
	  if( $('.ub-news-slider').length ) {
		  
		  $('.ub-news-slider').royalSlider({
			fullscreen: {
			  enabled: true,
			  nativeFS: true
			},
			controlNavigation: 'thumbnails',
			autoScaleSlider: true, 
			autoScaleSliderWidth: 960,     
			autoScaleSliderHeight: 690,
			loop: false,
			imageScaleMode: 'fill',
			navigateByClick: true,
			numImagesToPreload:2,
			arrowsNav:true,
			arrowsNavAutoHide: true,
			arrowsNavHideOnTouch: true,
			keyboardNavEnabled: true,
			fadeinLoadedSlide: true,
			globalCaption: true,
			globalCaptionInside: false,
			thumbs: {
			  appendSpan: true,
			  firstMargin: true,
			  spacing: 0,
			  paddingBottom: 4
			}
		  });
	  }
	  
});


jQuery(window).resize(function(){
	setTimeout(rst_custom_height_video, 100);
	rst_slider_scroll();
});

function rst_custom_height_video() {

	$ = jQuery;
	$('.wp-video').each(function(){
		
		var $video = $(this).find('video');
		var vidWidth = $video.attr('width');
		var vidHeight = $video.attr('height');
		
		var targetWidth = $(this).parent().width();
		if( targetWidth < $(this).find('.mejs-container').width() ){
			$(this).width(targetWidth);
			$(this).find('.mejs-overlay-play,.mejs-overlay,.mejs-poster,.wp-video-shortcode').css('height', Math.ceil(vidHeight * (targetWidth / vidWidth)));
		}
	});
}

jQuery(window).load(function() {
	$ = jQuery;
	rst_slider_scroll();
	rst_custom_height_video();
	if($('.masonry').length){
		$('.masonry').isotope({
			itemSelector: '.ub-blog-post',
			layoutMode: 'packery'
		});
	}
	
});	


function rst_slider_scroll(){
	$ = jQuery;
	width_window = $(window).width();
	if( $('.ub-scroll-4col').length ) {
		if( ! $('.bx-wrapper .ub-scroll-4col').length ){
			slider_4col = $('.ub-scroll-4col').bxSlider({
				  auto: true,
				  infiniteLoop: true,
				  nextText: '<i class="fa fa-angle-right"></i>',
				  prevText: '<i class="fa fa-angle-left"></i>',
				  speed: 500,
				  slideWidth: 1000,
				  moveSlides: 1,
				  minSlides: 4,
				  touchEnabled: false,
				  maxSlides: 4,
				  slideMargin: 19,
				  onSliderLoad: function(){
					  $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					  $(".rs-scroll-item").css("visibility", "visible");
				  }
			});
		}
		if( width_window > 1024 ){
			slider_4col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 touchEnabled: false,
				 minSlides: 4,
				 maxSlides: 4,
				 slideMargin: 24,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 1024 && width_window >= 768 ){
			slider_4col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 3,
				 maxSlides: 3,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 768 && width_window >= 500 ){
			slider_4col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 2,
				 maxSlides: 2,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 500 ){
			slider_4col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 1,
				 maxSlides: 1,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
	}
	if( $('.ub-scroll-3col').length ) {
		if( ! $('.bx-wrapper .ub-scroll-3col').length ){
			slider_3col = $('.ub-scroll-3col').bxSlider({
				  auto: true,
				  infiniteLoop: true,
				  nextText: '<i class="fa fa-angle-right"></i>',
				  prevText: '<i class="fa fa-angle-left"></i>',
				  speed: 500,
				  slideWidth: 1000,
				  moveSlides: 1,
				  minSlides: 3,
				  maxSlides: 3,
				  slideMargin: 24,
				  touchEnabled: false,
				  onSliderLoad: function(){
					  $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					  $(".rs-scroll-item").css("visibility", "visible");
				  }
			 });
		}
		if( width_window > 767 ){
			slider_3col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 3,
				 maxSlides: 3,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 768 && width_window >= 500 ){
			slider_3col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 2,
				 maxSlides: 2,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 500 ){
			slider_3col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 1,
				 maxSlides: 1,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
	}
	if( $('.ub-scroll-2col').length ) {
		if( ! $('.bx-wrapper .ub-scroll-2col').length ){
			slider_2col = $('.ub-scroll-2col').bxSlider({
				  auto: true,
				  infiniteLoop: true,
				  nextText: '<i class="fa fa-angle-right"></i>',
				  prevText: '<i class="fa fa-angle-left"></i>',
				  speed: 500,
				  slideWidth: 1000,
				  moveSlides: 1,
				  minSlides: 2,
				  maxSlides: 2,
				  slideMargin: 24,
				  touchEnabled: false,
				  onSliderLoad: function(){
					  $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					  $(".rs-scroll-item").css("visibility", "visible");
				  }
			 });
		}
		if( width_window >= 500 ){
			slider_2col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 2,
				 maxSlides: 2,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
		if( width_window < 500 ){
			slider_2col.reloadSlider({
				 auto: true,
				 infiniteLoop: true,
				 nextText: '<i class="fa fa-angle-right"></i>',
				 prevText: '<i class="fa fa-angle-left"></i>',
				 speed: 500,
				 slideWidth: 1000,
				 moveSlides: 1,
				 minSlides: 1,
				 maxSlides: 1,
				 slideMargin: 24,
				 touchEnabled: false,
				 onSliderLoad: function(){
					 $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					 $(".rs-scroll-item").css("visibility", "visible");
				 }
			});
		}
	}
	if( $('.ub-scroll-1col').length ) {
		if( ! $('.bx-wrapper .ub-scroll-1col').length ){
			slider_2col = $('.ub-scroll-1col').bxSlider({
				  auto: true,
				  infiniteLoop: true,
				  nextText: '<i class="fa fa-angle-right"></i>',
				  prevText: '<i class="fa fa-angle-left"></i>',
				  speed: 500,
				  slideWidth: 1000,
				  moveSlides: 1,
				  minSlides: 1,
				  maxSlides: 1,
				  slideMargin: 24,
				  touchEnabled: false,
				  onSliderLoad: function(){
					  $('.bx-loading').html('<div class="loader"><p><b>LOADING</b></p><span></span><span></span><span></span></div>');
					  $(".rs-scroll-item").css("visibility", "visible");
				  }
			 });
		}
	}
}