(function($) {
  $.fn.drags = function() {
    var $selected = null;
    var inDestinationBox = 0;

    $('.box').on("mousedown", function(e) {
      $selected = $(this);
      $selected.addClass('draggable');
      
      var drg_h = $selected.outerHeight(),
          drg_w = $selected.outerWidth(),
          pos_y = $selected.offset().top + drg_h - e.pageY,
          pos_x = $selected.offset().left + drg_w - e.pageX;
      
      $(document).on("mousemove", function(e) {
        $selected.offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        });

        var inRange = 
          e.pageX > $('.destination-box').offset().left &&
          e.pageX < ($('.destination-box').offset().left + $('.destination-box').width()) &&
          e.pageY > $('.destination-box').offset().top &&
          e.pageY < ($('.destination-box').offset().top + $('.destination-box').height());

        if (inRange) {
          $selected.addClass("delete-box deletebox-highlight");
        } else {
          $selected.removeClass("delete-box deletebox-highlight");
        } 
      
      }).on("mouseup", function() {
        console.log(inDestinationBox)
        $(this).off("mousemove"); // Unbind events from document
        if ($selected.hasClass("delete-box")) {
          inDestinationBox++;
          $selected.remove();
          //$('#attributesReward').unbind('hide.bs.collapse');
          $('#attributesReward').collapse('toggle');
          $('#image-holder').append('<img src="../rpg/question-marks.jpg" class="box panel-image-preview" id="reward"/>');
          $('#attributesReward').on('hide.bs.collapse', function (e) {
           e.preventDefault();
          });
          console.log('elimine');
          console.log(inDestinationBox)
        };
      });
      e.preventDefault(); // disable selection
      
    }).on("mouseup", function() {
      console.log('items');
      $selected.removeClass('draggable');
    });
  };
})(jQuery);