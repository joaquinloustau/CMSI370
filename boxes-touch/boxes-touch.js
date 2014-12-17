$(function() {
  var ongoingTouches = {};
  window.BoxesTouch = {
    setDrawingArea: function (jQueryElements) {
      jQueryElements
      .addClass("drawing-area")

      .each(function (index, element) {
        element.addEventListener("touchstart", BoxesTouch.createBox, false);
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
        var currentBox = touch.target.movingBox;
        if (currentBox) {
          var originLeft = touch.pageX - touch.target.deltaX;
              originTop = touch.pageY - touch.target.deltaY;

          currentBox.offset({ left: originLeft, top: originTop });
           
          var inRange = 
            originLeft > 0 && originLeft < $('#drawing-area').width() &&
            originTop > 0 && originTop < $('#drawing-area').height(); 
           
            //Box border turns red when out of range, warns user that box will be deleted
            if (!inRange) {
              console.log('eliminar');
              currentBox.addClass("delete-box deletebox-highlight"); // JD: 8, 10
            } else {
              currentBox.removeClass("delete-box deletebox-highlight"); // JD: 8, 10
            }
        }
             
        var newBox = ongoingTouches[touch.identifier];
        if (newBox && newBox.box) {
          var newLeft = Math.min(touch.pageX,newBox.initialX);
              newTop = Math.min(touch.pageY,newBox.initialY); 
              newHeight = Math.abs(touch.pageY - newBox.initialY); 
              newWidth = Math.abs(touch.pageX - newBox.initialX); 

          newBox.box
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
          touch.target.movingBox = null;
        }
        var newBox = ongoingTouches[touch.identifier];
        if (newBox && newBox.box) {
          newBox.box.removeClass("newbox-highlight");
          newBox.box = null;
          delete ongoingTouches[touch.identifier];
        }
      });
    },
  
    unhighlight: function () {
      var currentBox = $(this);
      currentBox.removeClass("box-highlight");
        if (currentBox.hasClass("delete-box")) { 
          currentBox.remove();
        };
      },

    startMove: function (event) {
      $.each(event.changedTouches, function (index, touch) {
        var jThis = $(touch.target),
          startOffset = jThis.offset();
        jThis.addClass("box-highlight");
        
        touch.target.movingBox = jThis;
        touch.target.deltaX = touch.pageX - startOffset.left;
        touch.target.deltaY = touch.pageY - startOffset.top;
      });
      event.stopPropagation();
    },

    createBox: function (event) {
      $.each(event.changedTouches, function (index, touch) {
        var newBox = {};
        ongoingTouches[touch.identifier] = newBox;
        newBox.initialX = touch.pageX;
        newBox.initialY = touch.pageY;
        $('<div></div>', {
          class: 'box'
        }).css({
          left: touch.pageX + 'px',
          top: touch.pageY + 'px',
          width: '0px',
          height: '0px'
        }).appendTo('#drawing-area');
        newBox.box = $("div div:last-child"); 
        newBox.box.addClass("newbox-highlight"); 
        $("#drawing-area").find("div.box").each(function (index, element) {
          element.addEventListener("touchstart", BoxesTouch.startMove, false);
          element.addEventListener("touchend", BoxesTouch.unhighlight, false);
        });
      });
      event.stopPropagation();
    }
  };
});