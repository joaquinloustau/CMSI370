// JD: 12
$('#unlock-reward').unbind().click(function(){ // JD: 11
	console.log('entre');
	$.getJSON(
        // JD: 8
    "http://lmu-diabolical.appspot.com/items/spawn",
    {level: 50,slot: "body"}, // JD: 11
    function (item) {
    	console.log(item);
    	$('.panel-image-preview').attr("src", insertReward(item))
    	$('#absorption-value').text(item.absorption.toFixed(2));
    	$('#atkspeed-value').text(item.atkspeed.toFixed(2));
    	$('#blockchance-value').text(item.blockchance.toFixed(2));
    	$('#critchance-value').text(item.critchance.toFixed(2));
    	$('#defense-value').text(item.defense.toFixed(2));
    }
  ) // JD: 8
});


var insertReward = function(item) {
	console.log('entre');
	var hasher = (Math.floor(item.critchance * 1000000)) % 371;
	return "rewards/" + hasher + ".png";
}

$(document).ready(function() {
	$('.panel-image').tooltip({
	    placement: "right",
	    trigger: "hover"
	});
});
