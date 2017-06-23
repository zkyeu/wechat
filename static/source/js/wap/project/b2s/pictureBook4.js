define("pictureBook4", ["page"], function(require, exports, module) {
    (function() {

        

        /**
         * 翻页播放音频效果 start
         */
        var $bookBlock = jQuery("#bb-bookblock");
        var page = require("page");
        page.init({
            onEndFlip: function(old, page, isLimit) {
                /*var start = dataNode[page].start;
                var audio = audioInit[0];
                if(start > durationGeted) start = getIndex(durationGeted).start;
                audio.currentTime = start;
                giveTime = start;
                audio.play();*/
            }
        });

        var $ = Zepto;

        var debug = function(info) {
            $(".js-log").append('<p>' + info + '</p>');
        }

        var giveTime = 0;
        var durationGeted = 0;


        $.audioPlay = function(opts) {
            var defaults = {
                    autoPlay: false,
                    src: "",
                    control: "",
                    buffer: 1
                },
                configs = $.extend({}, defaults, opts);
            var $audio = $("<audio></audio>"),
                audio = $audio[0],
                $d = $(document),
                $control = $(configs.control),
                $progress = $(configs.progress),
                $drag = $(configs.drag),
                dragFlag = false,
                duration = 0;

            // $("body").append($audio.attr("controls", "controls"));

            if (configs.autoPlay) {
                if (isWeiXin()) {
                    $d.one({
                        "WeixinJSBridgeReady": play,
                        "touchstart": play
                    });
                } else {
                    $audio.one("loadedmetadata", play);
                }
            }

            $audio.on({
                "loadedmetadata": function() {
                    durationGeted = audio.duration;
                },
                "playing": configs.playing,
                "pause": configs.pause,
                "timeupdate": function() {
                    if (dragFlag) return;
                    var
                        currentTime = audio.currentTime,
                        // 传入的duration 
                        durationSet = configs.duration,
                        // 取到的duration
                        durationGet = audio.duration,
                        // 是否在误差范围内
                        isLimit = Math.abs(durationSet - durationGet) < configs.buffer;
                    duration = isLimit ? durationGet : durationSet;

                    durationGeted = durationGet;

                    // 打印取到的duration
                    // console.log(durationGet);

                    var
                        rate = (currentTime / duration) * 100;
                    // 是否在误差范围内
                    if (!isLimit) rate = Math.ceil(rate);
                    rate = rate + "%";
                    configs.timeupdate(currentTime, duration, rate);
                },
                "ended": function() {
                    audio.currentTime = 0;
                    giveTime = 0;
                }
            });

            if ($drag[0]) {
                var dragX = 0,
                    rate = 0;
                $d.on({
                    "touchstart.k": function(e) {
                        var touches = e.touches[0];
                        if (e.target == $drag[0]) {
                            dragFlag = true;
                            dragX = touches.pageX - $drag.offset().left;
                        }
                    },
                    "touchmove.k": function(e) {
                        if (!dragFlag) return;
                        var touches = e.touches[0];
                        left = touches.pageX - $progress.offset().left - dragX + $drag.width() / 2;
                        if (left < 0) left = 0;
                        if (left > $progress.width()) left = $progress.width();
                        rate = left / $progress.width();
                        var _rate = rate * 100 + "%"
                        $drag.css("left", _rate);
                        $speed.css("width", _rate);
                    },
                    "touchend.k": function() {
                        if (!dragFlag) return;
                        var currentTime = duration * rate;
                        if (currentTime > durationGeted) currentTime = durationGeted;
                        // 根据区间 算出距离最近的
                        var start = getIndex(currentTime).start;
                        // debug("give => " + start);
                        audio.currentTime = start;
                        giveTime = start;
                        dragFlag = false;
                        audio.play();
                    }
                });
            }

            $control.on("touchstart", function() {
                audio.paused ? play() : pause();
            });

            $audio.attr("src", configs.src);

            function play() {
                audio.play();
            }

            function pause() {
                audio.pause();
            }

            function isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }

            return $audio;
        }

        var
            startIndex = 1;
        $conAudio = $(".con-audio"),
            $control = $conAudio.find("#control"),
            $progressBar = $conAudio.find(".progressBar"),
            $drag = $conAudio.find("#drag"),
            $speed = $conAudio.find("#speed"),
            $audio = $("#audio"),
            audioSrc = $audio.attr("data-src"),
            dataNode = JSON.parse($audio.attr("data-node")),
            totalTime = $audio.attr("data-totaltime"),
            controlClass = function(cName) {
                $control.removeClass("play pause").addClass(cName);
            },
            getIndex = function(currentTime) {
                var _index = 0, _start = 0;
                $.each(dataNode, function(index, ele) {
                    if (currentTime < ele.start) return false;
                    _index = index;
                    _start = ele.start;
                });
                return {
                    index: _index,
                    start: _start
                };
            }

        var audioInit = $.audioPlay({
            src : audioSrc,
            // src : "http://172.16.3.19:3000//images/wap/b2s/Free-Converter.com-841e35eb4f6585ca9bf4ec8c1aea20cf592559717c7df-28450906.mp3",
            // src : "/test/images/Free-Converter.com-841e35eb4f6585ca9bf4ec8c1aea20cf592559717c7df-28450906.mp3",
            // src: "http://video.51talk.com/b2s/pc/homework/2017/05/24/841e35eb4f6585ca9bf4ec8c1aea20cf592559717c7df.aac",
            autoPlay: true,
            control: $control,
            progress: $progressBar,
            drag: $drag,
            playing: function() {
                controlClass("pause");
            },
            pause: function() {
                controlClass("play");
            },
            timeupdate: function(currentTime, duration, rate) {
                // debug("playing => " + currentTime);
                if (currentTime < giveTime) return;
                $speed.css("width", rate);
                $drag.css("left", rate);
                // 获取index
                var index = getIndex(currentTime).index + 1;
                // if(startIndex != index){
                $bookBlock.bookblock("jump", index);
                // startIndex = index;
                // }
            },
            duration: totalTime
        });

        /**
         * 翻页播放音频效果 end
         */


        // 获取图片中高度最高的图片，设置外层容器的高度
        window.acquireImg = function() {
            var picItem = $("#bb-bookblock .bb-item img"),
                maxHei = 0;
            for (var i = 0, len = picItem.length; i < len; i++) {
                var thisHei = picItem.eq(i).height();
                if (maxHei < thisHei) {
                    maxHei = thisHei;
                }
            }
            $("#bb-bookblock, .js_pictureBook-dialog").height(maxHei);
        }

        /**
        *点赞送小花 start
        */
        var js_praise = $(".js_praise"),
            ajaxurl = js_praise.data('ajaxurl'),
            weixinid = js_praise.data('weixinid');
        js_praise.on('click', '', function() {
            var type = 0,
                num = js_praise.text() * 1;
            if(js_praise.hasClass('not')){
                type = 1;
                js_praise.removeClass('not');
                js_praise.html(num + 1)
            }else{
                js_praise.addClass('not');
                // if(num == 0){}
                js_praise.html( num -1 );
            }
            $.ajax({
                type: "post",
                url: ajaxurl,
                data: {
                    "type":type,
                    "weixinid":weixinid,
                },
                dataType: "json",
                success: function(data) {
                }
            });
        });
        /**
        *点赞送小花 end
        */

    })()

});
