$(document).ready(function() {
	$('input[type=password][name=password-tooltip]').tooltip({ // JD: 6
	    placement: "left",
	    trigger: "focus"
	}); // JD: 6
});

// JD: 12
var showModal = function(){
	$('#left-thumbnail').tooltip('toggle');
};
