define(function(require, exports, module) {
    var utility = require("utility");
    require("swiper-3.3.1.jquery.min");
    ;
    (function() {

        //显示分享引导-学生页
        $(".share-btn").on("click", function() {
            $(".stu-audio-dialog").show();
        });
        //显示分享引导-老师页
        $(".share-btn-tea").on("click", function(e) {
            $(".stu-audio-dialog").show();
            //更改老师页面中的share_info变量的值，分享时用来传参数。
            share_info = $.parseJSON(e.target.dataset.share);
            console.log(share_info);
            //shareToWx方法在页面模板中，用来绑定微信分享的信息。
            shareToWx();
        });
        //隐藏分享引导
        $(".share-cancel").on("click", function() {
            $(".stu-audio-dialog").hide();
        });
        //点赞
        $(".like-btn-select").one("click", function() {
            var self = $(this),
                href = self.data("href");

            $.ajax({
                type: "get",
                url: href,
                data: {},
                dataType: "json",
                success: function(data) {
                    if (data.status != 1) return;
                    $(".like-btn dd").html(data.data.click_like_num);
                }
            });
            self.removeClass("like-btn-select");
        });

        //audio的触发
        var control = $(".control"),
            audioData = {},
            index = -1,
            isFirstWeiXin = 1;


        $(".swiper-container, .stu-audio-class,.tea-audio-class").on("click",".control",function(e){
            //alert("dianji,,,索引为"+index);
            var target = e.target;
            if (target.className == "share-btn-tea") return;

            console.log($(this));
            if (audioData.audioId == $(this).data("audio")) {
                if($(audioData.audio).data("gather")==1) return;//判断如果是班级优秀配音就不可以暂停，必须全部播放完。
                clickControl();
            } else {
                if (audioData.audioId != null) {
                    pauseControl();
                    emptyAudio();
                }

                bindAudio($(this));
                playControl();
                console.log(audioData);
            }
        });

        /*control.on("click", function(e) {
            var target = e.target;
            if (target.className == "share-btn-tea") return;

            console.log($(this));
            if (audioData.audioId == $(this).data("audio")) {
                clickControl();
            } else {
                if (audioData.audioId != null) {
                    pauseControl();
                    emptyAudio();
                }

                bindAudio($(this));
                playControl();
                console.log(audioData);
            }
        });*/

        //绑定音频的相关数据
        function bindAudio(self) {
            audioData = {};
            audioData.self = self;
            audioData.audioId = audioData.self.data("audio");
            audioData.audio = audioData.self.find("#" + audioData.audioId)[0];
            console.log(audioData)
        }

        //点击控制按钮
        function clickControl() {
            if (audioData.self.hasClass("audioPlay")) {
                playControl();
            } else {
                pauseControl();
            }
        }
        //开始播放
        function playControl() {
            console.log(audioData)
            audioData.self.addClass("audioPause").removeClass("audioPlay");
            // audioData.audio.addEventListener("loadeddata", function() {
            //     alert("+++")
                audioData.audio.play();
            // }, false);
            dragMove();
            // alert("------");
        }
        //暂停播放
        function pauseControl() {
            audioData.self.addClass("audioPlay").removeClass("audioPause");
            audioData.audio.pause();
            clearInterval(audioData.timer);
            console.log(1)
        }
        //清除播放
        function emptyAudio() {
            audioData.audio.currentTime = 0;
            console.log(2)
        }

        //音频监听
        /*function playCotrolMonitor() {
            audioData.audio.addEventListener("ended", function() {
                audioData.drag.animate({"left": "100%"},300);
                audioData.speed.animate({"width": "100%"},300,"",function(){
                    alert(1)
                    pauseControl();
                    emptyAudio();
                });
            }, false)
        }*/
        //音频播放完成转到下个页面继续播放
        // function moveNext(){
        //    var $length = $(".swiper-slide");

        // }
        function dragMove() {
            audioData.timer = setInterval(function() {
                var len = (audioData.audio.currentTime / audioData.audio.duration) * audioData.progressBar;
                if (audioData.audio.currentTime >= audioData.audio.duration) {//音频播放完成
                    if($(audioData.audio).data("gather")==1){
                        //gather为1代表这是一个学员的多个音频中的一个
                        var audioPlayIndex = $(audioData.audio).index()*1+1,
                            audioLenth = $(audioData.self).find("audio").length;
                        if(audioPlayIndex < audioLenth){
                            audioData.audio = audioData.self.find("audio").eq(audioPlayIndex)[0];
                            console.log(audioData.audio)
                            playControl();
                        }else{
                            pauseControl();
                            emptyAudio();
                            console.log(3)
                            audioData.audioId = -1;
                            // audioData = {};
                        }

                        // alert($(audioData.self).find("audio").length);
                        // alert($(audioData.audio).index());
                    }else{
                        pauseControl();
                        emptyAudio();
                        //音频播放完成转到下个页面继续播放
                        //console.log(swiperLenth,index,"===========================");
                        //console.log(audioData.self.parents(".swiper-container"))
                        if(audioData.self.parents(".swiper-container").length!=0){
                            $(".swiper-button-next").trigger("click");
                        }

                        //stuTea(index);
                    }



                }
            }, 100);
        }


        function isWeiXin(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }
        function stuTea(index){
            //alert($("body").data("class"))
            //学生页和老师页都调用这个js文件，学生页进去直接播放音频，老师页进去不用自动播放
            //if ($("body").data("class") == "tea") return;
            //默认先触发第一个音频的点击事件
            if(isWeiXin()){
                // alert("是微信")
                if(isFirstWeiXin == 1){
                    document.addEventListener("WeixinJSBridgeReady", function() {
                        // alert(111);
                        $(".swiper-slide").eq(index).find(".control").eq(0).trigger('click');
                        // alert(222);
                        isFirstWeiXin = 0;
                    }, false);
                }else{
                    // alert("为："+isFirstWeiXin);
                    $(".swiper-slide").eq(index).find(".control").eq(0).trigger('click');
                }
            }else{
                // alert("bushi")
                    $(".swiper-slide").eq(index).find("audio").eq(0).trigger('click');
            }
        }

        //计算下标
        function countIndex(i){
            if(i<1){
                return swiperLenth;
            }else if(i >swiperLenth){
                return 1;
            }
            return i;
        }

        var $swiper_slide = $(".swiper-slide"),
            swiperLenth = $swiper_slide.length;
        if( swiperLenth > 1){
            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,

                // 如果需要分页器
                pagination: '.swiper-pagination',
                // autoplay: 3000,
                // preloadImages:false,
                updateOnImagesReady : true,
                /*paginationHide :true,*/
                //左右切换
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',

                onSlideNextEnd: function(swiper){
                    console.log(this,countIndex(swiper.activeIndex),$(".swiper-slide").length);
                  index=swiper.activeIndex;

                  if(audioData.audioId!=undefined&&(index==1 || index==swiperLenth+1)){
                    pauseControl();
                    emptyAudio();
                    return;
                  }
                    //alert("jinlai"+index)
                  stuTea(index);
                },
                onSlidePrevEnd: function(swiper){
                  index=swiper.activeIndex;
                  stuTea(index);
                },
                onImagesReady: function(swiper){
                  //alert('事件触发了;');
                  setTimeout(function(){
                    $(".swiper-pagination").css({"visibility":"visible"})
                  },1000);
                }
            })
        }else{
            $(".swiper-pagination").css({"display":"none"});
            stuTea(0);
        }

        //stuTea(index);
    })();
    //添加swiper滑动


    (function(){

    })();
});
