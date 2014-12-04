(function () {

  $('#unlock-reward').unbind().click(function () {
    $.getJSON(
      "http://lmu-diabolical.appspot.com/items/spawn",
      function (item) {
        $('#absorption-value').text(item.absoption.floor());
        $('#atkspeed-value').text(item.atkspeed.floor());
        $('#blockchance-value').text(item.blockchance.floor());
        $('#critchance-value').text(item.critchance.floor());
        $('#defense-value').text(item.defense.floor());
    })
  });
    
})();

