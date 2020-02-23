jQuery(document).ready(function($){
	/*---- Ajax rating ----*/
	$('#rating_post').change(function(){
		t = $(this);
		postID = t.parents('.ub-rate-post').attr('postID');
		rst_rating = eval('rating_'+postID);
		if( t.attr('data-disable') == undefined ) t.attr('data-disable',0);
		t.attr('data-disable',parseFloat(t.attr('data-disable')+1));
		if( parseFloat(t.attr('data-disable')) == 1 ){
			$.ajax({
				type: "POST",
				url: rst_rating.url,
				data: { 
					'action' : 'rst_ajax_rating',
					'postID' : postID,
					'point' : t.val()
				}
			}).done(function(data){
				t.parents('.ub-rate-post').html($(data).html());
				setCookie('ub_cookie_rating_'+postID,1,99);
			});
		}
	});
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}