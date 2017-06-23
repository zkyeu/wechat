define("acVoice",["utility"],function(require,exports,module){
	var utility = require("utility"),
		pageTag = utility.pageTag();
	

	;(function(){
		// 学生做题
		if(pageTag[2] != "play") return;
		// 学生倒计时
		$(".ac-timmer").countDown();
	})();


	// 老师发题说明
	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();

	// 滚动条设置
	$(".voice-text-scroll").getScroll();
	var score_tit = $(".score_tit");
	score_tit.eq(0).getScroll();

	;(function(){
		if(pageTag["2"] != "result") return;

		var scorePag = $(".score_pag"),
			isMulti = scorePag.length > 1;

		;(function(){
			if(isMulti) $("body").addClass("ac-tem-voice-result-multi");
		})();

		$(".score_page_btn,.ac-voice-score").css("visibility","visible");
		// 设置开始
		acUtility.resultStatus.setStart();

		//星星切换
		$.fn.comment = function(opts){
			var defaults = {
				sel : "li",
				comment : ".score_pag",
				hover : "hover",
				tips : ".score_tips"
			},
			o = $.extend({},defaults,opts),
			self = this,
			objCache,
			comment = self.closest(o.comment),
			tips = comment.find(o.tips).find("li"),
			tipsCache = tips.filter(".cur"),
			_index = null,
			_Index;

			self.on({
				mouseenter : function(){
					var self = $(this),
						index = self.index();
					self.addClass(o.hover);
					if(index == tipsCache.index()) return;
					tipsCache.removeClass("cur");
					tips.eq(index).addClass("cur");
					_Index = index;
					tipsCache = tips.eq(index);
				},
				mouseleave : function(){
					var self = $(this),
						index = self.index();
					if(!self.hasClass("isSel")) self.removeClass(o.hover);
					if(_index == null || _index == _Index) return;
					tipsCache.removeClass("cur");
					tips.eq(_index).addClass("cur");
					_Index = _index;
					tipsCache = tips.eq(_index);
				},
				click : function(){
					var self = $(this);
					if(self.hasClass("isSel")) return;
					if(!!objCache) objCache.removeClass(o.hover+" isSel");
					self.addClass("isSel");
					var index = self.index();
					_index = index;
					comment.attr("comment",++index);

					;(function(){
						if(!isMulti) return;
						var flag = true;
						scorePag.each(function(i,v){
							var $v = $(v),
							comment = $v.attr("comment");
							if(!comment){
								flag = false;
								return false;
							}
							flag = true;
						});
						if(flag) $(".ac-score-send").show();
					})();

					objCache = self;
				}
			},o.sel);

		}

		$(".score_content").each(function(i,v){
			$(v).comment();
		});

		//翻页

		;(function(){
			var $left_btn = $(".left_btn"),
				$right_btn = $(".right_btn"),
				$change_num = $(".change_num"),
				$score_pag = $(".score_pag"),
				$score_page_text = $(".score_page_text"),
				length = $score_pag.length,
				$ac_score_send = $(".ac-score-send"),
				num = 0;
				$left_btn.on("click",function(){
					if(num <= 0) return;
					num--;
					$change_num.html(num+1);
					$score_page_text.stop().animate({top: -311*(num)}, "fast");
					if(num <= 0) $left_btn.addClass("none_left");
					$right_btn.removeClass("none_right");
				});
				$right_btn.on("click",function(){
					if(num >= length-1) return;
					num++;
					$change_num.html(num+1);
					$score_page_text.stop().animate({top: -311*(num)}, "fast",function(){
						score_tit.eq(num).getScroll();
					});
					if(num >= length-1) $right_btn.addClass("none_right");
					$left_btn.removeClass("none_left");
				});
				//Done验证
				$ac_score_send.on("click",function(){
					var answer = [],
						submit = true;
					$score_pag.each(function(i,v){
						var $v = $(v),
							comment = $v.attr("comment");
						if(!comment){
							acUtility.acAlert({
								content : "Please grade your student first before you go back to the class.",
								alertCb : function(){
									$score_page_text.stop().animate({
										top: -311*i
									},function(){
										$change_num.text(i+1);
										if(i <= 0){
											$left_btn.addClass("none_left");
											$right_btn.removeClass("none_right");
										}else if(i >= length-1){
											$left_btn.removeClass("none_left");
											$right_btn.addClass("none_right");											
										}else{
											$left_btn.removeClass("none_left");
											$right_btn.removeClass("none_right");											
										}
										num = i;
									});
								}
							});
							submit = false;
							return false;
						}
						answer.push(comment);
					})
					
					if(!submit) return;

					var form = $("[name=acVoice]"),
						action = form.attr("action"),
						$answer = form.find("[name=answer]");
					$answer.val(answer.join("|"));

					$.ajax({
						url : action,
						data : form.serialize(),
						dataType : "json",
						success : function(data){
							// 输出完成标志
							if(data.status == 0){
								acUtility.acAlert({
								    content : "<p style='text-align:center;line-height:60px;font-size:18px;'>"+data.info+"</p>"
							    });
							    return;
							}
							acUtility.resultStatus.setEnd();
							typeof (window.submitCallback) == "function" && window.submitCallback();
						},
						error : function(){
							acUtility.acAlert({
								content : "<p style='text-align:center;line-height:60px;font-size:18px;'>Error,Please try again!</p>"
							});
						}
					});

				});
		})();
	})();


});