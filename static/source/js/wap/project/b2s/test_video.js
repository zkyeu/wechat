define("test_video", ["fastclick"], function(require, exports, module) {
    // require("swiper-3.3.1.jquery.min");
    require("fastclick");
    FastClick.attach(document.body);

    (function(){
        var js_video = $(".js_video"),
            js_audio = $(".js_audio"),
            js_btn_play = $(".js_btn_play"),
            js_btn_pause = $(".js_btn_pause");
        js_btn_play.on("click","",function(){
            js_video.get(0).play();
            js_audio.get(0).play();
        })
        js_btn_pause.on("click","",function(){
            js_video.get(0).pause();
            js_audio.get(0).pause();
        })
    })()

});
