$(function() {
  var itemsdropped = 0;
  var itemMoved = function () {
    console.log('entre');
    $('#basket').text("Items in Cart (" + itemsdropped + ")");
  }

  window.BoxesTouch = {
    setDrawingArea: function (jQueryElements) {
      console.log('hola');
      jQueryElements
        .addClass("origin-box")
   
        .each(function (index, element) {
            element.addEventListener("touchstart", BoxesTouch.createBox, false);
            element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
            element.addEventListener("touchend", BoxesTouch.endDrag, false);
        })

        .find("img.box").each(function (index, element) {
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

          console.log($('#destination-box').width());
          console.log(touch.target.movingBox.width());

          var inRange = 
            touch.pageX - touch.target.deltaX > $('#destination-box').offset().left &&
            touch.target.movingBox.right < ($('#destination-box').offset().left + $('#destination-box').width()) &&
            touch.pageY - touch.target.deltaY > $('#destination-box').offset().top &&
            touch.target.movingBox.bottom < ($('#destination-box').offset().top + $('#destination-box').height()); 

          console.log(inRange);
          //Box border turns red when out of range, warns user that box will be deleted
          if (inRange) {
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
        $('#attributesReward').unbind('hide.bs.collapse');
        $('#attributesReward').collapse('toggle');
        $('#image-holder').append('<img src="../rpg/question-marks.jpg" class="box panel-image-preview" id="reward"/>');
        $('#attributesReward').on('hide.bs.collapse', function (e) {
         e.preventDefault();
        });
        itemsdropped++;
        itemMoved();
        BoxesTouch.setDrawingArea($("#origin-box"));
      };
    },

    //$('#attributesReward').unbind('hide.bs.collapse');

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
});