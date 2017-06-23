define(function(require, exports, module) {
    var $to_down = $(".to_down"),
    	$f_down = $(".f_down");     

	var $top = $to_down.offset().top;
	$(window).on("scroll",function(event) {
		var scrollTop = $(this).scrollTop();
		$f_down[ ((scrollTop > ($top + 40)) ? "add" : "remove") + "Class"]("act");
	});

});
