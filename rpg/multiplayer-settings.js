$(function () {
	$(".has-tooltip").tooltip()
	$("#multiplayer-enabled").click(function (event) {
		$(".radio").toggleClass("disabled");
	});
});