$(function() {
    window.BoxesTouch = {
      setDrawingArea: function (jQueryElements) {
        console.log('hola');
        jQueryElements
          .addClass("drawing-area")
     
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
            touch.target.movingBox.offset({
                left: touch.pageX - touch.target.deltaX,
                top: touch.pageY - touch.target.deltaY
            });
           var inRange = 
               touch.pageX - touch.target.deltaX < $('#drawing-area').width() &&
               touch.pageY - touch.target.deltaY < $('#drawing-area').height() &&
               touch.pageX - touch.target.deltaX > 0 &&
               touch.pageY - touch.target.deltaY > 0; 
           
            //Box border turns red when out of range, warns user that box will be deleted
            if (!inRange) {
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
                //$(this).remove();
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
});