define("test", [""], function(require, exports, module) {
    // require("fastclick"); //去除click延迟
    // FastClick.attach(document.body);

    (function() {

        var js_audio = $(".js_audio"),
            audioarr = js_audio.data("audioarr"),
            audioIndex = 0;

        audioPlay(audioIndex);

        js_audio.on("ended", function() {
            audioIndex = audioIndex + 1;
            if (audioIndex < audioarr.length) {
                audioPlay(audioIndex);
            }
        })

        function audioPlay(i) {
            js_audio.attr("src", audioarr[i]);
            js_audio.eq(0)[0].play();
        }

    })()

});
