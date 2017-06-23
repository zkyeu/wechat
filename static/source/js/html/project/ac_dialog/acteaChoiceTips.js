define("acteaChoiceTips",["utility"],function(require,exports,module){
	var utility = require("utility"),
		pageTag = utility.pageTag(),
		cookie = utility.cookieFn;
	
	(function(){
		var $time_ok = $(".time_ok"),
			$time_tips = $(".time_tips"),
			$send_tips = $(".send_tips"),
			$send_ok = $(".send_ok"),
			$back_class = $(".back_class"),
			$ac_timmer = $(".ac-timmer"),
			$ac_tem_send = $(".ac-tem-send"),
			$ac_tem_tit_in = $(".ac-tem-tit-in"),
			$back_ok = $(".back_ok"),
			$question_img = $(".question_img"),
			$more_question = $(".more_question"),
			$more_ok = $(".more_ok");
		// 一页一道题
		if(pageTag[2] == "tips"){
			cookie.set($("[name=cookieName]").val(),"1",1000);
			$time_ok.on("click",function(){
				$time_tips.fadeOut(1000,function(){
					$ac_timmer.css({zIndex:0});
					$ac_tem_send.css({zIndex:20});
					$send_tips.fadeIn(1000);
				});
			});
			$send_ok.on("click",function(){
				$send_tips.fadeOut(1000,function(){
					$ac_tem_send.css({zIndex:0});
					$back_class.fadeIn();
					$ac_tem_tit_in.css({zIndex:20});
				})
			});
			$back_ok.on("click",function(){
				$back_class.fadeOut(1000,function(){
					$ac_tem_tit_in.css({zIndex:10});
					window.location.assign($(".tips_confirm").attr("choice-end-href"));
				})
			})
		}
		// 一页多道题
		if(pageTag[2] == "tips_all"){
			cookie.set($("[name=cookieName]").val(),"1",1000);
			$time_ok.on("click",function(){
				$time_tips.fadeOut(1000,function(){
					$ac_timmer.css({zIndex:0});
					$ac_tem_send.css({zIndex:20});
					$send_tips.fadeIn(1000);
				});
			});
			$send_ok.on("click",function(){
				$send_tips.fadeOut(1000,function(){
					$ac_tem_send.css({zIndex:0});
					$question_img.css({zIndex:80});
					$more_question.fadeIn();
				})
			});
			$more_ok.on("click",function(){
				$question_img.fadeOut(1000);
				$more_question.fadeOut(1000,function(){
					$back_class.fadeIn(1000);
					$ac_tem_tit_in.css({zIndex:20});
				});
			});
			$back_ok.on("click",function(){
				$back_class.fadeOut(1000,function(){
					$ac_tem_tit_in.css({zIndex:10});
					window.location.assign($(".tips_confirm").attr("choice-all-end-href"));
				})
			})
		}

	})();
});