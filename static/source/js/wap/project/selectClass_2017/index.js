$(function(){
	$(".list .item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
});