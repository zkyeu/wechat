/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
	$("li").on("tap",function(){
		$("li").find("p").addClass("hide");
		$("li").find(".tit_r").addClass("hide");
		$(this).find("p").removeClass("hide");
		$(this).find(".tit_r").removeClass("hide");
	});
	
});
