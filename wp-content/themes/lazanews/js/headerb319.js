jQuery(document).ready(function($){
	$('.rst-display-none').remove();
	
	//submenu hover
	$('.rst-nav-menu .rst-not-mega.menu-item-has-children').hover(function(){
		var offsets = $(this).offset();
		var left = offsets.left;
		var width_li = $(this).width();
		var width_sub = $(this).find('> .sub-menu').width();
		var window_width = $(window).width();
		var container = $('#wrapper').width();
		var container_offset = $('#wrapper').offset();
		if( left+width_sub+width_li > window_width-container_offset.left ){
			$(this).find('> .sub-menu').addClass('ub-position-left');
		}
		else {
			$(this).find('> .sub-menu').removeClass('ub-position-left');
		}
	});
	
	//menu full width
	$('.rst-top-main-menu-full .rst-mega-menu.two_column.menu-item-has-children').hover(function(){
		if($(window).width() > 767){
			var offsets = $(this).offset();
			var top = offsets.top;
			var left = offsets.left;
			var window_width = $(window).width();
			var container = $('#wrapper').width();
			var right = container - ($(this).width() + (left - (window_width - container)/2));
			
			var to_right = window_width - (left + 20);
			if(($(this).find('ul.sub-menu > li').width()) > to_right){
				$(this).find('ul.sub-menu > li').removeClass('pull-left');
				$(this).find('ul.sub-menu > li').addClass('pull-right');
				$(this).find('ul.sub-menu').css('left','auto');
				$(this).find('ul.sub-menu').css('right',right);
			}
			else{
				var left = (left - (window_width - container)/2);
				$(this).find('ul.sub-menu > li').removeClass('pull-right');
				$(this).find('ul.sub-menu > li').addClass('pull-left');
				$(this).find('ul.sub-menu').css('right','auto');
				$(this).find('ul.sub-menu').css('left', 'auto');
			}
		}
	});
	
	//menu not full width
	$('.rst-top-main-menu .rst-mega-menu.two_column.menu-item-has-children').hover(function(){
		if($(window).width() > 991){
			var offsets = $(this).offset();
			var top = offsets.top;
			var left = offsets.left;
			var window_width = $(window).width();
			var container = $('#wrapper').width();
			var right = container - ($(this).width() + (left - (window_width - container)/2));
			var to_right = window_width - left - $(this).width();
		
			if(($(this).find('ul.sub-menu > li').width()) > to_right){
				$(this).find('ul.sub-menu > li').removeClass('pull-left');
				$(this).find('ul.sub-menu > li').addClass('pull-right');
				$(this).find('ul.sub-menu').css('left','auto');
				$(this).find('ul.sub-menu').css('right',right);
			}
			else{
				var left =  left - $('.rst-nav-menu').offset().left;
				$(this).find('ul.sub-menu > li').removeClass('pull-right');
				$(this).find('ul.sub-menu > li').addClass('pull-left');
				$(this).find('ul.sub-menu').css('right','auto');
				$(this).find('ul.sub-menu').css('left','auto');
			}
		}
	});
	
	//jquery search menu
	$('.rst-top-search').click(function(){
		$(this).parent().find('.ub-search').addClass('active').stop().slideDown(50);
	});
	$(document).click(function(event){
		if(!$(event.target).is('.rst-top-search .fa-search, .main-menu .ub-search,  .main-menu .ub-search input')){
			$('.header-sticky .ub-search').removeClass('active').stop().hide();
		}
	});
});
	