(function($) {
  var itemsdropped = 0;
  var itemMoved = function () {
    $('#basket').text("Items Dropped (" + itemsdropped + ")");
  }

  window.BoxesTouch = {
    setDrawingArea: function (jQueryElements) {
      jQueryElements
      .addClass("origin-box")
   
      .each(function (index, element) {
        element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
        element.addEventListener("touchend", BoxesTouch.endDrag, false);
      })

      .find("div.box").each(function (index, element) {
        element.addEventListener("touchstart", BoxesTouch.startMove, false);
        element.addEventListener("touchend", BoxesTouch.unhighlight, false);
      });
    },

    trackDrag: function (event) {
      $.each(event.changedTouches, function (index, touch) {
        event.preventDefault();
        if (touch.target.movingBox) {
          touch.target.movingBox.bottom = touch.pageY - touch.target.deltaY + touch.target.movingBox.height();
          touch.target.movingBox.right = touch.pageX - touch.target.deltaX + touch.target.movingBox.width();
          touch.target.movingBox.offset({
            left: touch.pageX - touch.target.deltaX,
            top: touch.pageY - touch.target.deltaY
          });
          
          var inRange2 = 
              touch.pageX - touch.target.deltaX > $('#destination-box').position().left &&
              touch.target.movingBox.right < $('#destination-box').position().left + $('#destination-box').width() &&
              touch.pageY - touch.target.deltaY > $('#destination-box').position().top &&
              touch.target.movingBox.bottom < $('#destination-box').position().top + $('#destination-box').height(); 
           
          //Box border turns red when out of range, warns user that box will be deleted
          if (inRange2) {
            console.log('eliminar');
            (touch.target.movingBox).addClass("delete-box deletebox-highlight");
          } else {
            (touch.target.movingBox).removeClass("delete-box deletebox-highlight");
          }
        }
      });
      event.preventDefault();
    },

    endDrag: function (event) {
      $.each(event.changedTouches, function (index, touch) {
        if (touch.target.movingBox) {
          touch.target.movingBox.unhighlight;
          touch.target.movingBox = null;
        }
      });
    },

    unhighlight: function () {
      $(this).removeClass("box-highlight");
      if ($(this).hasClass("delete-box")) {
        $(this).remove();
        itemsdropped++;
        itemMoved();
      };
    },

    startMove: function (event) {
      $.each(event.changedTouches, function (index, touch) {
      $(touch.target).addClass("box-highlight");
      
      var jThis = $(touch.target),
          startOffset = jThis.offset();
          touch.target.movingBox = jThis;
          touch.target.deltaX = touch.pageX - startOffset.left;
          touch.target.deltaY = touch.pageY - startOffset.top;
      });
      event.stopPropagation();
    }
  };
  $.fn.boxes = function () {
    BoxesTouch.setDrawingArea(this);
  };
}(jQuery));