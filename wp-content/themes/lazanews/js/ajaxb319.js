jQuery(document).ready(function($){
	
	// Ajax Menu 
	$('.ub-mega-grid .ub-terms-child').hover(function(){
		t = $(this);
		if( t.attr('data-disable') == undefined ) t.attr('data-disable',0);
		t.attr('data-disable',parseFloat(t.attr('data-disable'))+1);
		var index = parseFloat(t.attr('data-index'));
		t.parents('.ub-mega-grid').find('.ub-mega-child-cats .active').removeClass('active');
		t.addClass('active');
		rst_key = t.attr('data-key');
		rst_key_eval = eval(t.attr('data-key'));
		if ( 
			rst_key != undefined && 
			parseFloat(t.attr('data-disable')) == 1 
		) {
			if( t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(index).find('.ub-post-menu').length == 0 ) {
				t.parents('.ub-mega-grid').find('.ub-loading').addClass('active');
				$.ajax({
					type: "POST",
					url: rst_key_eval.url,
					dataType: "json",
					data: { 
						'action' : 'rst_ajax_postmenu',
						'paged' : '1',
						'index' : index,
						'atts' : rst_key_eval.atts
					}
				}).done(function(data){
					when_images_loaded(jQuery(data), function(){
						if( t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(index).find('.ub-post-menu').length == 0 ) {
							t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(parseFloat(data['index'])).append(data['html']);
							t.parents('.ub-mega-grid').find('.ub-loading').removeClass('active');
							t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category.active').removeClass('active');
							t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(index).addClass('active');
							t.attr('data-disable',0);
						}
					});
				});
			}
			else {
				t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category.active').removeClass('active');
				t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(index).addClass('active');
				t.attr('data-disable',0);
			}
		}
		else {
			t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category.active').removeClass('active');
			t.parents('.ub-mega-grid').find('.rst-menu-posts .rst-list-post-of-category').eq(index).addClass('active');
			t.attr('data-disable',0);
		}
	});
	
	// Ajax Terms 
	$(document).on('click', '.rst_ajax', function(e){
		e.preventDefault();
		t = $(this);
		rst_key = t.attr('data-key');
		rst_key_eval = eval(t.attr('data-key'));
		rst_term = t.attr('rst_term');
		rst_slug = t.attr('rst_slug');
		if( ! $('#'+rst_key+'-'+rst_slug).length ) {
			if( t.attr('data-disable') == undefined ) t.attr('data-disable',0);
			t.attr('data-disable',parseFloat(t.attr('data-disable')+1));
			if( parseFloat(t.attr('data-disable')) == 1 ){
				t.parents('.wrap-ajax').find('.ub-loading').show();
				$.ajax({
					type: "POST",
					url: rst_key_eval.url,
					data: { 
						'action' : 'rst_ajax_block',
						'atts' : rst_key_eval.atts,
						'term' : rst_term
					}
				}).done(function(data){
					when_images_loaded(jQuery(data), function(){
						t.parents('.wrap-ajax').find('.tab-ajax').hide();
						t.parents('.wrap-ajax').find('.wrap-content-ajax').append('<div id="'+rst_key+'-'+rst_slug+'" class="tab-ajax">'+data+'</div>').show();
						t.parents('.wrap-ajax').find('.ub-loading').hide();
					});
				});
			}
		}
		else {
			t.parents('.wrap-ajax').find('.tab-ajax:visible').slideUp(1,function(){
				t.parents('.wrap-ajax').find('#'+rst_key+'-'+rst_slug).fadeIn(400);
			});
		}
	});
	
	if( $('.rst_ajax_load_more.rst_auto_load').length ) {
		$(window).scroll(function(event){
			$('.rst_ajax_load_more.rst_auto_load').each(function(index){
				if ( $(window).scrollTop() >= ($(this).offset().top - $(window).height()) ){
					$(this).click();
				}
			});
		});
	}
	
	// Ajax Load More
	$(document).on('click', '.rst_ajax_load_more', function(e){
		e.preventDefault();
		t = $(this);
		paged = parseFloat(t.attr('data-paged'));
		max_paged = parseFloat(t.attr('data-max-paged'));
		rst_key_eval = eval(t.attr('data-key'));
		t.attr('data-disable',parseFloat(t.attr('data-disable')+1));
		if( parseFloat(t.attr('data-disable')) == 1 ){
			t.find('span,i').toggleClass('active');
			$.ajax({
				type: "POST",
				url: rst_key_eval.url,
				data: { 
					'action' : 'rst_ajax_blog',
					'atts' : rst_key_eval.atts,
					'paged' : paged
				}
			}).done(function(data){
				when_images_loaded(jQuery(data), function(){
					t.attr('data-disable', 0 );
					t.find('span,i').toggleClass('active');
					var items = jQuery(data);
					if( $('.masonry').length ){	
						t.parents('.wrap_ajax').find('.wrap_inner_ajax').append(items);
						rst_custom_height_video();
						t.parents('.wrap_ajax').find('.wrap_inner_ajax').isotope('appended', items);
						setTimeout(function(){
							$('.masonry').isotope('layout');
						}, 100);
					}
					else {	
						t.parents('.wrap_ajax').find('.wrap_inner_ajax').append(items);
						rst_custom_height_video();
					}
					if( paged < max_paged ) {
						t.attr('data-paged',parseFloat(paged)+1);
					} 
					else {
						t.remove();
					}
					
					$("body").fitVids();
					$('.thumbnail-bxslider').bxSlider({
						mode: 'fade',
						captions: true
					});
					
					jQuery('.wp-audio-shortcode, .wp-video-shortcode').not('.mejs-video, .mejs-audio').mediaelementplayer( );
				});
			});
		}
	});
});

function when_images_loaded($img_container, callback) { 
	//do callback when images in $img_container are loaded. Only works when ALL images in $img_container are newly inserted images.
	var img_length = $img_container.find('img').length,
		img_load_cntr = 0;

	if (img_length) { //if the $img_container contains new images.
		$img_container.find('img').load(function() { //then we avoid the callback until images are loaded
			img_load_cntr++;
			if (img_load_cntr == img_length) {
				callback();
			}
		});
	}
	else { //otherwise just do the main callback action if there's no images in $img_container.
		callback();
	}
}