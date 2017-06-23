/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2016-01-25 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	window.onmousewheel=function(){return false};
	window.onkeydown = function(){return false};
	var scroll = document.getElementById('scroll');

	var firefox = navigator.userAgent.indexOf('Firefox') != -1;
	firefox ? scroll.addEventListener('DOMMouseScroll', MouseWheel, false) : (scroll.onmousewheel = MouseWheel);
	function MouseWheel(e) {
		e = e || window.event;
		if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true;
		if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
		if(e.detail<0 || e.deltaY<0 || e.wheelDelta>0) {
			jump(window.pos, 0);
		} else{
			jump(window.pos, 1);
		}
	}
	/* 视差插件 */
	window.pos = 0;
	var s = skrollr.init({});

	/* 右侧导航点 */
	$(".section-btn li").unbind().click(function(){
		window.pos = $(this).index();
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		switch(window.pos) {
			case 0: 
				$(window).scrollTop(0);	
				break;
			case 1:
				$(window).scrollTop(110);
				break;
			case 2: 
				$(window).scrollTop(210);	
				break;
			case 3:
				$(window).scrollTop(310);	
				break;
			case 4: 
				$(window).scrollTop(410);	
				break;
			case 5:
				$(window).scrollTop(510);	
				break;
			case 6:
				$(window).scrollTop(610);
				break;
		};
	});

	/* jump 跳转函数
	 * type: 0：减少 | 1：增加
	 */
	function jump(pos, type) {
		if ( type==0) {
			window.pos = window.pos - 1;
			window.pos = window.pos<0 ? 0 : window.pos;
		} else if (type==1){
			window.pos = window.pos + 1;
			window.pos = window.pos>6 ? 6 : window.pos;
		}
		$(".section-btn li").removeClass("on");
		$(".section-btn li").eq(window.pos).addClass("on");
		$(".section-btn li").eq(window.pos).trigger("click");
	}

	/* 向下箭头 */
	$(".arrow").css({
		"-webkit-animation":"twinkling 1s infinite 0.6s ease-in-out alternate",
		"animation":"twinkling 1s infinite 0.6s ease-in-out alternate"
	});
	$(".arrow").click(function(){jump(window.pos, 1);});

	/* 上下按键 */
	$(document).on('keydown', function (event){
		var e=event||window.event;
		var key=e.keyCode||e.which||e.charCode;
		switch(key)	{
			case 38: 
				jump(window.pos, 0);
				break;
			case 40:
				jump(window.pos, 1);
				break;
		};
	});
});