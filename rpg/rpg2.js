$(document).ready(function() {
	$('input[type=password][name=password-tooltip]').tooltip({
	    placement: "left",
	    trigger: "focus"
	});
});


var showModal = function(){
	$('#left-thumbnail').tooltip('toggle');
};
