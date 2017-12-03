$(document).ready(function () {
	$('.center-page').vAlign();
	//$('.menu').scrollFadeIn({offset:50});
	var btnDelete = $('.delete');
	btnDelete.click(function (e){
		var id = btnDelete.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/' + id
		});
	});
/*
	var btnPost = $('#post');

	btnPost.click(function () {
		console.log('save clicked');
		$.ajax({
			type: 'POST',
			url: $('form').attr('action')
		});
	});
*/
});
