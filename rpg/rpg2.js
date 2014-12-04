$(function () {

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


});

