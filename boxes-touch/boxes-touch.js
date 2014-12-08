$(function() {
    var stash = {};
    window.BoxesTouch = {
      setDrawingArea: function (jQueryElements) {
        jQueryElements
          .addClass("drawing-area")
     
          .each(function (index, element) {
              element.addEventListener("touchstart", BoxesTouch.boxCreation, false);
              element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
              element.addEventListener("touchend", BoxesTouch.endDrag, false);
          })

          .find("div.box").each(function (index, element) {
              element.addEventListener("touchstart", BoxesTouch.startMove, false);
              element.addEventListener("touchend", BoxesTouch.unhighlight, false);
          });
      },

      boxCreation: function (event) {
        console.log('hello');
        $.each(event.changedTouches, function(index, touch) {
          var stashAdd = {};
          stash[touch.identifier] = stashAdd;
          console.log(stash);
          console.log(stashAdd);
          stashAdd.initialX = touch.pageX;
          stashAdd.initialY = touch.pageY;
          $('<div></div>', {
            class: 'box'
          }).css({
            left: touch.pageX + 'px',
            top: touch.pageY + 'px',
            width: '0px',
            height: '0px'
          }).appendTo('#drawing-area');
          (stashAdd.creation) = $("div div:last-child");
          (stashAdd.creation).addClass("creation-highlight");
          $("#drawing-area").find("div.box").each(function(index, element) {
              element.addEventListener("touchstart", BoxesTouch.startMove, false);
              element.addEventListener("touchend", BoxesTouch.unhighlight, false);
          });
        });
        event.stopPropagation();
      },
     
      trackDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
          event.preventDefault();
          if (touch.target.movingBox) {
            touch.target.movingBox.offset({
                left: touch.pageX - touch.target.deltaX,
                top: touch.pageY - touch.target.deltaY
            });
           
            //Box border turns red when out of range, warns user that box will be deleted
            if (!((touch.target.movingBox).hasClass("delete-box")) &&
                (touch.pageX - touch.target.deltaX > 512 ||
                 touch.pageY - touch.target.deltaY > 512||
                 touch.pageX - touch.target.deltaX < 0 ||
                 touch.pageY - touch.target.deltaY < 0)) {
                   (touch.target.movingBox).addClass("delete-box deletion-highlight");
                }
           if ((touch.target.movingBox).hasClass("delete-box") &&
              (touch.pageX - touch.target.deltaX < 512 &&
               touch.pageY - touch.target.deltaY < 512 &&
               touch.pageX - touch.target.deltaX > 0 &&
               touch.pageY - touch.target.deltaY > 0)) {
                   (touch.target.movingBox).removeClass("delete-box deletion-highlight");
              }
          }
             
          var stashAdd = stash[touch.identifier];
            if (stashAdd && stashAdd.creation) {
              var newLeft, newTop, newWidth, newHeight;
              if (touch.pageX < stashAdd.initialX) {
                newLeft = touch.pageX;
                newWidth = stashAdd.initialX - touch.pageX;
                if (touch.pageY < stashAdd.initialY) {
                  newTop = touch.pageY;
                  newHeight = stashAdd.initialY - touch.pageY;
                } else {
                  newTop = stashAdd.initialY;
                  newHeight = touch.pageY - stashAdd.initialY;
                }
              } else {
                  newLeft = stashAdd.initialX;
                  newWidth = touch.pageX - stashAdd.initialX;
                  if (touch.pageY < stashAdd.initialY) {
                      newTop = touch.pageY;
                      newHeight = stashAdd.initialY - touch.pageY;
                  } else {
                      newTop = touch.initialY;
                      newHeight = touch.pageY - stashAdd.initialY;
                  }
                }

              stashAdd.creation
                  .offset({
                      left: newLeft,
                      top: newTop
                  })
                  .width(newWidth)
                  .height(newHeight);
          } 
        });
        event.preventDefault();
      },

        endDrag: function (event) {
          $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
              // Change state to "not-moving-anything" by clearing out
              // touch.target.movingBox.
              touch.target.movingBox = null;
            }
            var stashAdd = stash[touch.identifier];
            if (stashAdd && stashAdd.creation) {
              var $creation = $(stashAdd.creation);
              if ($creation.width() < 20 || $creation.height() < 20) {
                  $creation.remove();
              }
              stashAdd.creation.removeClass("creation-highlight");
              stashAdd.creation = null;
              delete stash[touch.identifier];
            }
          });
        },

        
        unhighlight: function () {
            $(this).removeClass("box-highlight");
            if ($(this).hasClass("delete-box")) {
                $(this).remove();
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