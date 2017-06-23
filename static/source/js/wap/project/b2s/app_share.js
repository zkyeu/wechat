define("app_share", ["fastclick"], function(require, exports, module) {
    // require("swiper-3.3.1.jquery.min");
    require("fastclick");
    FastClick.attach(document.body);

    (function() {
        var js_videoBtn = $(".js_videoBtn"), //视频播放点击位置
            dialog = $(".js_dialog"), //蒙层弹框
            js_video = $(".js_video"), //蒙层里的video标签
            video_src = "", //保存视频路径
            js_loadHot = $(".js_loadHot"), //热门分享下面的全部加载按钮
            js_loadNew = $(".js_loadNew"), //最新分享下面的全部加载按钮
            js_audioBtn = $(".js_audioBtn"), //音频播放点击按钮，无进度条。
            js_likeIcon = $(".js_likeIcon"); //点赞按钮

        //内容循环多个标签，内容距离其它标签有间距。
        (function() {
            var js_fontBottom = $(".js_fontBottom");
            for (var i = 0, len = js_fontBottom.length; i < len; i++) {
                $(js_fontBottom[i]).next().hasClass('js_fontBottom') ? "" : $(js_fontBottom[i]).addClass('paddingB');
            }
        })();
        //点赞
        js_likeIcon.on('click', '', function(event) {
            var that = $(this),
                num = that.text(),
                auth = $("body").data("auth"),
                weixinopenid = $("body").data("weixinopenid"),
                ajaxurl = $("body").data("ajaxurl"),
                iswexin = $("body").data("iswexin"),
                commentid = that.data("commentid"),
                like = null;
            // alert("*"+weixinopenid+"*");
            if (iswexin == 1) {
                weixinopenid == "" ? window.location.href = auth : "";
            }
            if (that.hasClass('on')) {
                that.removeClass('on');
                num = num * 1 - 1;
                num = num < 0 ? 0 : num;
                that.text(num);
                like = -1; //发ajax点赞减1
            } else {
                that.addClass('on');
                num = num * 1 + 1;
                that.text(num);
                like = 1; //发ajax点赞加1
            }
            $.ajax({
                type: "GET",
                url: ajaxurl,
                data: { "commentId": commentid, "like": like, "openId": weixinopenid },
                dataType: "json",
                success: function(data) {
                    //不用处理。
                }
            });
        });

        /*
         *视频 start
         */
        //判断是否有视频链接存在，无连接
        var loopVideoSrc = setInterval(function(){
            isVideoSrcFun();
        },1000);
        var isVideoSrcFun = function() {
            var js_isVideoSrc = $(".js_isVideoSrc"),
                len = js_isVideoSrc.length,
                lenTemporary = len;
            for (var i = 0; i < len; i++) {
                var obj = $(js_isVideoSrc[i]),
                    src = obj.data('src') || "",
                    videourl = obj.data('videourl') || "";
                if (src == "" || src == null) {
                    lenTemporary = lenTemporary - 1;
                    obj.find(".js_video_load").removeClass('disnone');
                    obj.find(".js_video_play").addClass('disnone');
                    // console.log("请求一次");
                    $.ajax({
                        type: "GET",
                        url: videourl,
                        data: {},
                        dataType: "json",
                        success: function(data) {
                            //将请求来的视频地址填写进去，并将正在加载的标志去掉。
                            // {"url":"ggjgjg"}
                            var url = data.url;
                            if(url != ""){
                                lenTemporary = lenTemporary + 1;
                                lenTemporary == len ? clearInterval(loopVideoSrc) : "";
                                obj.attr('data-src', url);
                                obj.find(".js_video_load").addClass('disnone');
                                obj.find(".js_video_play").removeClass('disnone');
                            }
                        }
                    });
                } else {
                    // obj.find(".js_video_load").addClass('disnone');
                    // obj.find(".js_video_play").removeClass('disnone');
                }
            }

        }

        //兼容视频全屏播放，暂时不用
        function launchFullScreen(element) {
            alert("进来了")
            if (element.requestFullscreen) {
                console.log(1);
                alert(1);
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                console.log(2);
                alert(2);
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                console.log(3);
                alert(3);
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                console.log(4);
                alert(4);
                element.msRequestFullscreen();
            }
        }
        //有弹框后禁止滑动
        var controlScroll = (function() {
                var dis = function(event) {
                        event.preventDefault();
                    },
                    body = document.body || document.documentElement;

                return {
                    lock: function() {
                        body.addEventListener('touchmove', dis, false);
                    },
                    unLock: function() {
                        body.removeEventListener('touchmove', dis, false);
                    }
                }
            })()
            //点击图片播放视频
        js_videoBtn.on('click', '', function(event) {
            pauseNowAudio(); //先暂停可能存在的播放的音频。
            event.preventDefault();
            var that = $(this),
                videoPic = that.find('img').attr("src"),
                videow = that.data("videow"), //视频宽
                videoh = that.data("videoh"), //视频高
                // whProportion = videow/videoh,//视频宽高比
                bodyw = $("body").width(),
                videoWidth = bodyw,
                // videoHeight = bodyw * whProportion;
                videoHeight = videoWidth * videoh / videow;
            // alert(videoHeight)
            video_src = that.data("src");
            if (video_src == "" || video_src == null) {
                return false;
            }

            js_video.attr({
                "src": video_src,
                "poster": videoPic
            });
            if (videoWidth && videoHeight && videoWidth != 0 && videoHeight != 0) {
                // alert("计算")
                js_video.css({
                    "width": videoWidth + "px",
                    "height": videoHeight + "px"
                });
            } else {
                // alert(3)
                js_video.css({
                    "width": "100%",
                    "height": "auto"
                });

            }

            js_video.get(0).play();
            // alert(1)
            // js_video.get(0).webkitEnterFullScreen();
            // js_video.get(0).webkitRequestFullScreen();
            // launchFullScreen(js_video.get(0));
            dialog.removeClass('disnone');
            controlScroll.lock();
        });
        /*js_videoBtn.on('click', '', function(event) {
            event.preventDefault();
            video_src = js_videoBtn.data("src");
            ///
            dialog.find("video").remove();
            dialog.removeClass('disnone');
            var videoDom = document.createElement("video");
            videoDom.src = video_src;
            dialog.append(videoDom);
            videoDom.play();
            videoDom.webkitEnterFullScreen();
            videoDom.webkitRequestFullScreen();
            videoDom.addEventListener("ended",function(){
                dialog.addClass('disnone');
                alert("播放完了")
            },false)
            ///

            // js_video.attr("src",video_src);
            // js_video.get(0).play();
            // alert(1)
            // js_video.get(0).webkitEnterFullScreen();
            // dialog.removeClass('disnone');
        });*/

        //点击蒙层的空白区域，蒙层隐藏。视频停止播放。
        dialog.on('click', '', function(e) {
            e.preventDefault();
            console.log(e.target.className)
            if (e.target.className == "js_video") {
                return false;
            }
            js_video.get(0).pause();
            dialog.addClass('disnone');
            controlScroll.unLock();
        });

        /*
         *视频 end
         */

        /*
         *音频 start
         */
        //默认初始化所有音频状态条的长度
        (function() {
            var len = js_audioBtn.length;
            for (var i = 0; i < len; i++) {
                var audioDom = $(js_audioBtn[i]),
                    timeDom = audioDom.find('.time'),
                    blinkDom = audioDom.find('.blink'),
                    time = audioDom.data('time');
                audioDom.css({ "width": (20 + time * 0.8) + "%" });
                timeDom.html(time + "''");
            }

        })();
        //初始化音频播放进度条的时间
        (function() {
            var js_audioProgress = $(".js_audioProgress"),
                js_aTime = $(".js_aTime"),
                audioS = js_audioProgress.data('time'),
                timeStr = transitionTime(audioS),
                minute = timeStr.m,
                second = timeStr.s,
                str = "- " + minute + ":" + second;
            js_aTime.html(str);
        })()
        //点击音频状态条
        js_audioBtn.on('click', '', function(e) {
            var _this = $(this),
                blinkDom = _this.find('.blink'),
                audioSrc = _this.data("src");
            console.log(audioSrc)
            if (!_this.data("appended")) {
                var audioDom = document.createElement("audio");
                audioDom.src = audioSrc;
                _this.append(audioDom).data('appended', '1');
                audioDom.addEventListener("ended", function() {
                    blinkDom.removeClass("on");
                }, false)
                audioDom.addEventListener("pause", function() {
                    blinkDom.removeClass("on");
                }, false)
                audioDom.addEventListener("play", function() {
                    blinkDom.addClass("on");
                }, false)
            }
            var audioStr = _this.find('audio')[0];
            if (blinkDom.hasClass('on')) {
                audioStr.pause();
            } else {
                audioStr.src = audioSrc;
                pauseNowAudio();
                $(audioStr).addClass('js_audioCurrent');
                audioStr.play();
            }
        });
        //点击音频播放进度条
        $(".js_audioProgress").on("click", "", function() {
            var that = $(this),
                audioWrap = that.parent(),
                audioSrc = that.data("src"),
                progress = audioWrap.find(".js_aProgress"),
                audioTime = audioWrap.find(".js_aTime");
            if (!audioWrap.data("appended")) {
                var audioDom = document.createElement("audio");
                audioDom.src = audioSrc,
                    audioWrap.append(audioDom).data("appended", !0),
                    audioDom.addEventListener("pause", function() {
                        that.removeClass("on")
                    }, false),
                    audioDom.addEventListener("play", function() {
                        that.addClass("on")
                    }, false),
                    audioDom.addEventListener("timeupdate", function() {
                        var that = audioDom.currentTime / audioDom.duration * 100;
                        100 >= that && progress.css("width", that + "%");
                        var audioS = audioDom.duration - audioDom.currentTime,
                            timeStr = transitionTime(audioS),
                            minute = timeStr.m,
                            second = timeStr.s,
                            str = "- " + minute + ":" + second;
                        audioTime.html(str);
                    }, false),
                    audioDom.addEventListener("ended", function() {
                        $(".js_audioProgress").removeClass("on"),
                            progress.css("width", 0)
                    }, false)
            }
            var audioStr = audioWrap.find("audio")[0];
            if (that.hasClass("on")) {
                audioStr.pause()
            } else {
                pauseNowAudio();
                $(audioStr).addClass("js_audioCurrent");
                audioStr.play();
            }

        });
        //暂停音频播放
        function pauseNowAudio() {
            var audioCurrent = $("audio.js_audioCurrent");
            audioCurrent.length && (audioCurrent[0].pause(), audioCurrent.removeClass("js_audioCurrent"));
        }
        //格式转换（秒 -- 分:秒）
        function transitionTime(s) {
            var minute = parseInt(s / 60),
                second = parseInt(s % 60);
            minute = minute >= 10 ? minute : "0" + minute;
            second = second >= 10 ? second : "0" + second;
            return {
                m: minute,
                s: second
            }
        }
        /*
         *音频 end
         */

        //热门分享下面的全部加载
        js_loadHot.on('click', '', function(e) {
            // console.log("热门分享发ajax");
            // $.ajax();
            var that = $(this);
            $(".js_loadHotOther").removeClass('disnone');
            that.addClass('disnone');
        });

        //最新分享下面的全部加载
        js_loadNew.on('click', '', function(e) {
            // console.log("最新分享发ajax");
            // $.ajax();
        });
    })()

});
