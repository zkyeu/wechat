define(function(require, exports, module) {

    ;
    (function() {

        //音频播放
        var audioId = null,
            audioWrap = null,
            timer = null;
        $(".assignment-con").on("click", ".control", function() {
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

        
    })();

});
