<<<<<<< Updated upstream
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
=======
(function () {

  $(document).ready(function () {
    $('input[type=password][name=password-tooltip]').tooltip({
      placement: "left",
      trigger: "focus"
    });
  });


  $("#help-tab").click( function() {showModal(); return false;});

  var showModal = function () {
    $('#help-home').tooltip('toggle');
  }


})();
>>>>>>> Stashed changes
