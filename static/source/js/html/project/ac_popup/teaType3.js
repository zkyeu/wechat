define("teaType3",["acpopupTea","acsoundPlay","utility"],function(require,exports,module){
	require("acpopupTea");
	var utility = require("utility"),
	deftime = utility.deftime,
	timmerWrap = $(".actimmer"),
	timmer = timmerWrap.find("i");
	var acsoundPlay = require("acsoundPlay");

	deftime({
		start : +timmer.text(),
		startFn : function(r,t){
			window["tt"] = t;
			timmer.text(r);
		},
		targetFn : function(r,t){
			timmerWrap.html("");
			$(".answer_now").html("");
			(typeof(window.acCallback) == "function") && window.acCallback(r,t);
		}
	});

	//音频播放
	$(".type_btn").on("click",function(){
		$(".ac_tip").hide();
		var self = $(this),
			href = self.attr("yinpin"),
			playTag = !self.hasClass("cli_btn");
		acsoundPlay.playInit({
			href : href,
			playTag : playTag,
			// 播放
			startFn : function(){
				self.addClass("cli_btn");
			},
			// 暂停
			stopFn : function(){
				self.removeClass("cli_btn");
			},
			// 结束
			endFn : function(){
				self.removeClass("cli_btn");
			}
		});
	});
})