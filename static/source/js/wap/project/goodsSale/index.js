/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-10-24 15:13:23
 */
define(function(require,exports,module){
		$(".question").tap(function(){
			var ele=$(this).attr("question");
			$(".mask").removeClass("hide");
			$("."+ele).removeClass("hide");
			$("html,body").css({"overflow-y":"hidden"})
		});
		$(".btn").tap(function(){
			$(this).parent().addClass("hide");
			$(".mask").addClass("hide");
			$("html,body").css({"overflow-y":"auto"});
		})
});
