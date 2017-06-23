define("acChoice",["utility","acsoundPlay"],function(require,exports,module){
	var utility = require("utility"),
		acsoundPlay = require("acsoundPlay"),
		pageTag = utility.pageTag();

	var choiceForm = $("[name=acChoice]");


	;(function(){
		// 学生做题
		if(pageTag[2] != "play") return;
		// 学生提交
		// 时间到提交
		$(".ac-timmer").countDown({
			targetFn : function(){
				// 到时间提交
				choiceForm[0].submit();
			}
		});
		// 点击按钮提交
		$(".ac-submit").on("click",function(){
			var val = choiceForm.find("[name=section]").val();
			if(val == "") return acUtility.acAlert({content:'<p style="font-size:20px;text-align:center;line-height:60px;">请选择您的答案</p>'});;
			choiceForm[0].submit();
		});
		// 点击选项
		choiceForm.each(function(i,v){
			$(v).choiceFn({
				dataInput:"[name=section]"
			});
		});

	})();



	// 播放按钮
	$(".play-btn").on("click",function(){
		$(".ac_tip").hide();
		var self = $(this),
			href = self.attr("yinpin"),
			playTag = !self.hasClass("is-play");
		acsoundPlay.playInit({
			href : href,
			playTag : playTag,
			// 播放
			startFn : function(){
				self.addClass("is-play");
			},
			// 暂停
			stopFn : function(){
				self.removeClass("is-play");
			},
			// 结束
			endFn : function(){
				self.removeClass("is-play");
			}
		});
	});


	// 调整宽度
	;(function(){
		var choice = $(".choice-con-t");
		if(!choice[0]) return;
		var dl = choice.find("dl"),
			dlEven = dl.filter(":odd").css("marginLeft","20px").end().filter(":even").css("marginRight","10px"),
			_width = [];

		dlEven.each(function(i,v){
			_width.push(Math.ceil($(v).find("dd>span").outerWidth()));
		});
		
		var widthMax = Math.max.apply(null,_width),
			marginLeft = 231 - widthMax - 10;

		dlEven.css("marginLeft",marginLeft > 0 ? marginLeft : 0);

		choice.css("visibility","visible");
		
 	})();

 	// 调整宽度
 	;(function(){
 		var choice = $(".choice-con");
 		if(!choice[0]) return;
 		var li = choice.find("ul li"),
 			length = li.length;
 		if(length == 4) return choice.css("visibility","visible");
 		var width = li.width() * length + parseInt(li.css("marginLeft")) * (length-1);
 		choice.width(width).css("visibility","visible");
 	})();

	// 老师发题说明
	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();

	// 滚动条设置
	$(".choice-content-inner").getScroll();


	// 老师结果
;(function(){

	var 
	getData = (function(){
		var 
		sendForm = $("[name=class-info]"),
		sendUrl = sendForm.attr("action") || "/ac/getStat",
		sendData = sendForm.serialize(),
		dataFlag = $("[data-flag]");

		return function(cb){
				// var result = {
				// 	status : 1,
				// 	data : {
				// 		section : ""
				// 	}
					
				// }

				// result = {"status":1,"info":"","data":{"num_correct":2,"num_wrong":3,"num_not":"5"}}

				// var status = result.status,
				// 	data = result.data;
				// if(status == 1){
				// 	if(typeof(cb) == "function") cb.call(null,dataFlag,data);
				// 		// else updataFn(dataFlag,data);
				// }

				$.ajax({
					// url : "/api/ac/getStat", 
					url : sendUrl,
					data : sendData,
					dataType : "json",
					success : function(r){
						var status = r.status,
							data = r.data;
						if(status == 1){
							if(typeof(cb) == "function") cb.call(null,dataFlag,data);
								// else updataFn(dataFlag,data);
						} 
					}
				});
			}	
	})(),

	showResult = function(){
		$(".ac-tem-result-con").show();
		$(".ac-tem-result-wait,.ac-tem-result-mask").hide();
	}

	$(".wait-tips-close").on("click",function(){
		$(this).closest(".ac-tem-result-wait").hide().siblings(".ac-tem-result-mask").hide();
	});

	// 老师端倒计时获取结果 一对一
	;(function(){
		var result = $(".tea-choice-result");
		if(!result[0]) return;
				
		var timmer = $(".ac-timmer"),
			interval,
			resultWrap = $("[data-flag=choice-result]");

		timmer.countDown({
			startFn : function(r,t){
				interval = t;
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r,t){
				// 清除轮询
				clearInterval(getTag);
				// 时间结束 没回答
				resultWrap.html("Did not answer").css("paddingLeft","68px").prev("dt").html("").width(0);
				// 显示答案
				showResult();
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});

		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				var section = data.section;
				if(section == "") return;
				resultWrap.html(section);
				// 显示答案
				showResult();
				// 清除轮询
				clearInterval(getTag);
				// 清除倒计时定时器
				clearInterval(interval);
				// 定时器归零
				timmer.find("span").text("00:00");
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			});
		}, 3000);
	})();

	// 老师端倒计时获取结果 一对多
	;(function(){
		var result = $(".tea-choice-result-multi");
		if(!result[0]) return;
		var	timmer = $(".ac-timmer"),
			updataFn = function(tar,data){
				$(tar).each(function(i,v){
					var $v = $(v),
						$flag = $v.attr("data-flag");
					$v.text(data[$flag]);
				});
			},
			interval;

		timmer.countDown({
			startFn : function(r,t){
				interval = t;
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r,t){
				// 时间结束 清除轮询
				clearInterval(getTag);
				// 显示答案
				showResult();
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});

		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				updataFn(dataFlag,data);
				// 全部完成
				if(data.answer_all){
					// 显示答案
					showResult();
					// 清除轮询
					clearInterval(getTag);
					// 清除倒计时定时器
					clearInterval(interval);
					// 定时器归零
					timmer.find("span").text("00:00");
					// 输出完成标志
					acUtility.resultStatus.setEnd();
				}
			});
		}, 3000);
	})();

})();


});