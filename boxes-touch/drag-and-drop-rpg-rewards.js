$(function () {

  $('#unlock-reward').click(function () {
    $.getJSON(
      "http://lmu-diabolical.appspot.com/items/spawn",
      { level: 50, slot: "body" },
      function (item) {
        $('#reward').attr("src", insertReward(item));
        $('#absorption-value').text(item.absorption.toFixed(2));
        $('#atkspeed-value').text(item.atkspeed.toFixed(2));
        $('#blockchance-value').text(item.blockchance.toFixed(2));
        $('#critchance-value').text(item.critchance.toFixed(2));
        $('#defense-value').text(item.defense.toFixed(2));
      })
  });

  var insertReward = function(item) {
    var hasher = (Math.floor(item.critchance * 1000000)) % 371;
    return "rewards/" + hasher + ".png";
  }

  $('#attributesReward').on('hide.bs.collapse', function (e) {
    e.preventDefault();
  })
});

