define("acteaFollow",["acsoundPlay","utility"],function(require,exports,module){
	var utility = require("utility"),
        acsoundPlay = require("acsoundPlay");


        // 倒计时
        ;(function(){
            var timmerWrap = $(".follow-timmer"),
                timmer = timmerWrap.find("span");
            if(!timmerWrap[0]) return;
            // 一页多道题
            acUtility.resultStatus.setStart();
            utility.deftime({
                start : +timmer.text(),
                startFn : function(r){
                    timmer.text(r);
                },
                targetFn : function(r){
                    timmerWrap.html("Time's up! You can stop the recording any second now.");
                    acUtility.resultStatus.setEnd();
                }
            });            
        })();

        //音频播放
        $(".follow-play span").on("click",function(){
            var self = $(this),
                href = self.attr("yinpin"),
                playTag = !self.hasClass("playing");
            acsoundPlay.playInit({
                href : href,
                playTag : playTag,
                // 播放
                startFn : function(){
                    self.addClass("playing");
                },
                // 暂停
                stopFn : function(){
                    self.removeClass("playing");
                },
                // 结束
                endFn : function(){
                    self.removeClass("playing");
                }
            });
        });
});