(function($) {
  var inDestinationBox = 0;
  $.fn.drags = function() {
    var currentBox = null;
    var boxMoved = function () {
      $('.counter').text("Items in Cart(" + inDestinationBox +")")
    }

    $('.box').on("mousedown", function(e) {
      currentBox = $(this);
      currentBox.addClass('draggable');
      
      var drg_h = currentBox.outerHeight(),
          drg_w = currentBox.outerWidth(),
          pos_y = currentBox.offset().top + drg_h - e.pageY,
          pos_x = currentBox.offset().left + drg_w - e.pageX;
      
      $(document).on("mousemove", function(e) {
        currentBox.offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        });

        var inRange = 
          e.pageX > $('.destination-box').offset().left &&
          e.pageX < ($('.destination-box').offset().left + $('.destination-box').width()) &&
          e.pageY > $('.destination-box').offset().top &&
          e.pageY < ($('.destination-box').offset().top + $('.destination-box').height());

        if (inRange) {
          currentBox.addClass("delete-box deletebox-highlight");
        } else {
          currentBox.removeClass("delete-box deletebox-highlight");
        } 
      }).on("mouseup", function() {
        $(this).off("mousemove"); // Unbind events from document
        if (currentBox.hasClass("delete-box")) {
          currentBox.remove();
          inDestinationBox++;
          boxMoved();
          $('#attributesReward').unbind('hide.bs.collapse');
          $('#attributesReward').collapse('toggle');
          $('#image-holder').append('<img src="../rpg/question-marks.jpg" class="box panel-image-preview" id="reward"/>');
          $('#attributesReward').on('hide.bs.collapse', function (e) { e.preventDefault(); });
          $('.origin-box').drags();
        };
        $(this).off("mouseup");
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function() {
      currentBox.removeClass('draggable');
    });
  };
})(jQuery);