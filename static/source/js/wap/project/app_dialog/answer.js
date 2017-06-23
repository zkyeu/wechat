define(function(require, exports, module) {

    ;
    (function() {
        ////////////
        // 答题部分开始 //
        ////////////

        //选择题提交
        $(".answer-option-txt,.answer-option-pic").on("tap", "li", function() {
            var valStr = $(this).data("val");
            //alert(valStr);
            $("#answerVal").val(valStr);
            $("#answerForm").submit();
        });

        //音频播放选择题播放
        var audioId = null,
            audioWrap = null,
            timer = null;
        $(".answer-wrap").on("click", ".control", function() {
            audioWrap = $(this);
            audioId = $(this).find("audio")[0];
            console.log(audioId);
            playControl();
        });
        //开始播放
        function playControl() {
            audioWrap.addClass("audioPause").removeClass("audioPlay");
            audioId.play();
            dragMove();
        }
        //暂停播放
        function pauseControl() {
            audioWrap.addClass("audioPlay").removeClass("audioPause");
            //audioId.pause();
            clearInterval(timer);
        }
        //播放时间
        function dragMove() {
            timer = setInterval(function() {
                if (audioId.currentTime >= audioId.duration) { //音频播放完成
                    pauseControl();
                }
            }, 100);
        }

        ////////////
        // 答题部分结束 //
        ////////////

        ////////////
        // 支付部分开始 //
        ////////////

        $("#vipClass").on("click", function() {
            var self = $(this);
            if (self.hasClass("selected")) {
                self.addClass("no-selected").removeClass("selected");
                $("#vipClass1").val(self.data("no"));
            } else {
                self.addClass("selected").removeClass("no-selected");
                $("#vipClass1").val(self.data("yes"));
            }
        });

        $(".alipay,.WeChat").on("click", function() {
            var self = $(this);
            $("#vipPay").val(self.data("pay"));
            $("#answerForm").submit();
        });

        ////////////
        // 支付部分结束 //
        ////////////
    })();

});
