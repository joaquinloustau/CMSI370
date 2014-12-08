  var BoxesTouch = {

    setDrawingArea: function (jQueryElements) {
      jQueryElements
        .addClass("drawing-area")
        
        .each(function (index, element) {
          //element.addEventListener("touchstart", BoxesTouch.createBox, false);
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
        if (touch.target.movingBox) {
          touch.target.movingBox.offset({
            left: touch.pageX - touch.target.deltaX,
            top: touch.pageY - touch.target.deltaY
          });
        }
      });
        
        event.preventDefault();
    },

    endDrag: function (event) {
      $.each(event.changedTouches, function (index, touch) {
        if (touch.target.movingBox) {
            touch.target.movingBox = null;
        }
      });
    },

    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },

    createBox: function (event) {
      console.log('hello');
      $.each(event.changedTouches, function (index, touch) {
        var currTouch = new Touch();
        console.log(currTouch.identifier);
        $('<div></div>', {
          class: 'box'
        }).css({
          left: touch.pageX + 'px',
          top: touch.pageY + 'px',
          width: '0px',
          height: '0px'
        }).appendTo('#drawing-area');
      })
    }

    startMove: function (event) {
      console.log('hello');
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
