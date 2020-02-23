/**
* @javascript for custom menu frontend
*/
jQuery(document).ready(function($){
	// var args = [];
	// args['two-column'] = '2';
	// args['three-column'] = '3';
	// args['four-column'] = '4';
	// console.log(args);
	
	//custom hover for mega-menu-category-with-list
	$('.category_with_sub').hover(function(){
			$(this).find('ul li').first().addClass('active');
		},function(){
			$(this).find('ul li').first().removeClass('active');
	});
	$('.category_with_sub ul > li').hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
	});
});