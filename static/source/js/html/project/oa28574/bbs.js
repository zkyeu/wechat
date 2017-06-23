define(function(require,exports,module){
	// 论坛导航随屏幕走
	var bbsTop = $(".m-nav").offset().top;
	$(window).scroll(function(){
		var bodyTop = $(this).scrollTop();
		if(bodyTop>=bbsTop){
			$(".m-nav").css("marginTop",bodyTop-bbsTop);
		}else{
			$(".m-nav").css("marginTop",0);
		}
	});
});