/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-07-11 12:10:30
 * @liyang 1.0.0
 */
define(function(require,exports,module){
	/* 首先判断是不是IE低版本 */
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") 
	{ 
	$(".fly").css("bottom","200px");
	} 
	$(function(){
		$('#page-wrap').fullpage({
			'navigation': true,
		});
	});
	/* 判断是什么操作系统 */
	function validataOS(){
		if(navigator.userAgent.indexOf("Window")>0){
			return "Windows";
		}else if(navigator.userAgent.indexOf("Mac OS X")>0) {
			return "Mac";
		}else if(navigator.userAgent.indexOf("Linux")>0) {
			return "Linux";
		}else{
			return "NUll";
		}
	}
	/* 根据系统判断下载链接 */
	var yourOs = validataOS();
	if(yourOs == "Mac"){
		$(".mac").addClass("mac_after");
	}else{
		$(".pc").addClass("pc_after");
	}
	/* 下载ac悬停效果 */
	$(".pc_link").hover(function(){
		$(this).addClass("pc_hover");
	},function(){
		$(this).removeClass("pc_hover");
	})

	$(".mac_link").hover(function(){
		$(this).addClass("mac_hover");
	},function(){
		$(this).removeClass("mac_hover");
	})
});