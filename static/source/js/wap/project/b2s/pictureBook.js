define("pictureBook", ["fastclick","swiper-3.3.1.jquery.min"], function(require, exports, module) {
    require("fastclick"); //去除click延迟
    FastClick.attach(document.body);
    require("swiper-3.3.1.jquery.min");

    /*audio.addEventListener("timeupdate", function(){
      // console.log(audio.duration);
      $(".js_test2").text(audio.currentTime);
      // console.log(audio.currentTime);
    });*/

    (function() {

        // 获取图片中高度最高的图片，设置外层容器的高度
        window.acquireImg = function(){
            var picItem = $(".swiper-wrapper .swiper-slide img"),
                maxHei = 0;
            for(var i = 0,len = picItem.length;i<len;i++){
                var thisHei = picItem.eq(i).height();
                if(maxHei < thisHei){
                    maxHei = thisHei;
                }
            }
            $(".con-pic").height(maxHei);
        }

        /*var before = $("#before");
        var after = $("#after");
        var book = $(".book");
        var page = $(".book .page");

        rotate();

        function rotate() {
            var middle = 1;
            var picIndex = 100;
            for (var z = 0; z < book.children().length; z++) {
                // page.eq(z).style.zIndex = book.children().length - z;
                page.eq(z).css({
                    "z-index": book.children().length - z,
                });
                console.log(z)
                console.log(page)
            }
            after.on('click', '', function() {
                // alert(middle);
                if (middle < book.children().length - 1) {
                    // page[middle].style.animation = "page 1.5s linear 1 forwards";
                    page.eq(middle).css({
                        "animation": "page 1s linear 1 forwards",
                        "z-index": picIndex++,
                    });
                    middle++;
                } else {
                    middle = book.children().length -1;
                }
            });
            before.on("click","",function() {
                // alert(middle);
                if (middle > 0+1) {
                    // page[middle - 1].style.animation = "page1 1.5s linear 1 forwards";
                    page.eq(middle-1).css({
                        "animation": "page1 1s linear 1 forwards",
                        "z-index": picIndex++,
                    });
                    middle--;
                } else {
                    middle = 0+1;
                }
            })
        }*/


        /**
         *音频进度条 开始
         */
        var audio = document.getElementById("audio");
        // audio.src = "http://video.51talk.com/b2s_app/forum/2017/01/269/33653269_56_20170106190523950012.aac";
        // audio.src = "http://video.51talk.com/b2s_app/forum/2017/01/573/33767573_72_20170106190821301444.aac";
        // audio.src = "http://video.51talk.com/b2s/pc/homework/2017/05/24/841e35eb4f6585ca9bf4ec8c1aea20cf592559717c7df.aac";
        var totaltime = $("#audio").data("totaltime");

        //点击播放/暂停
        $("#control").on("click", "", function() {
            if ($("#control").hasClass("play")) {
                $("#control").addClass("pause").removeClass("play");
                // dragMove(); //并且滚动条开始滑动
                // $("#control").html("暂停播放");
                audio.play(); //开始播放
            } else {
                $("#control").addClass("play").removeClass("pause");
                // $("#control").html("点击播放");
                audio.pause();
            }
        })

        // addListenTouch(); //歌曲加载之后才可以拖动进度条
        playCotrol(); //播放控制函数


        //播放事件监听
        function playCotrol() {
            audio.addEventListener("canplay",
                function(){
                    addListenTouch(); //歌曲加载之后才可以拖动进度条
                }, false);
            // audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
            //     function() {
            //         addListenTouch(); //歌曲加载之后才可以拖动进度条
            //     }, false);
            audio.addEventListener("pause",
                function() { //监听暂停
                    // $("#control").addClass("play").removeClass("pause");
                    // $("#control").html("点击播放");
                    if (audio.currentTime == audio.duration) {
                        // audio.stop();
                        audio.currentTime = 0;
                    }
                    clearInterval(window.setTime);
                }, false);
            audio.addEventListener("play",
                function() { //监听开始
                    // $("#control").addClass("pause").removeClass("play");
                    // $("#control").html("暂停播放");
                    dragMove();
                }, false);
            audio.addEventListener("ended", function() {
                // alert(0)
                // clearInterval(window.setTime);
                audio.pause();
                $("#control").addClass("play").removeClass("pause");
                // $("#control").html("点击播放");
                drag.style.left = $(".js_progressBac").width() + "px";
                speed.style.width = $(".js_progressBac").width() + "px";
            }, false)
        }

        //进度条
        //这里我用的是事件实现进度拖动 如果不太熟悉touch的可以看下我之前写的一个小demo http://www.cnblogs.com/leinov/p/3701951.html
        var startX, x, aboveX = 0; //触摸时的坐标 //滑动的距离  //设一个全局变量记录上一次内部块滑动的位置 
        var drag = document.getElementById("drag");
        var speed = document.getElementById("speed");

        //1拖动监听touch事件，，因小问题，暂停支持拖动效果
        function addListenTouch() {
            /*document.getElementById("drag").addEventListener("touchstart", touchStart, false);
            document.getElementById("drag").addEventListener("touchmove", touchMove, false);
            document.getElementById("drag").addEventListener("touchend", touchEnd, false);*/
        }

        //touchstart,touchmove,touchend事件函数
        function touchStart(e) {
            audio.pause();
            // clearInterval(window.setTime);
            e.preventDefault();
            var touch = e.touches[0];
            startX = touch.pageX;
            aboveX = parseInt(drag.style.left) || 0;
            console.log(e);
            console.log(startX);
        }

        function touchMove(e) { //滑动          
            e.preventDefault();
            var touch = e.touches[0];
            x = touch.pageX - startX; //滑动的距离
            //drag.style.webkitTransform = 'translate(' + 0+ 'px, ' + y + 'px)';  //也可以用css3的方式   
            var distance = aboveX + x;
            if (distance <= 0) {
                distance = 0;
            } else if (distance >= $(".js_progressBac").width()) {
                distance = $(".js_progressBac").width();
            }
            drag.style.left = distance + "px"; //  
            // speed.style.left = -((window.innerWidth) - (aboveX + x)) + "px";
            speed.style.width = distance + "px";
            // $(".js_test").html(distance)
        }

        function touchEnd(e) { //手指离开屏幕
            e.preventDefault();
            // aboveX = parseInt(drag.style.left);
            var touch = e.touches[0];
            // var dragPaddingLeft = drag.style.left || "0";
            // var change = dragPaddingLeft.replace("px", "");
            // numDragpaddingLeft = parseInt(change);
            numDragpaddingLeft = parseInt(drag.style.left) || 0;
            var currentTime = (numDragpaddingLeft / ($(".js_progressBac").width())) * totaltime; //30是拖动圆圈的长度，减掉是为了让歌曲结束的时候不会跑到window以外
            // alert(numDragpaddingLeft)
            // alert($(".js_progressBac").width())
            // alert(totaltime)
            // alert(currentTime)
            audio.currentTime = currentTime;
            clearInterval(window.setTime);
            // dragMove();
            if(currentTime == totaltime){
                audio.pause();
                $("#control").addClass("play").removeClass("pause");
                drag.style.left = $(".js_progressBac").width() + "px";
                speed.style.width = $(".js_progressBac").width() + "px";
                audio.currentTime = 0;
            }else{
                audio.play();
                $("#control").addClass("pause").removeClass("play");
            }
        }
        //3拖动的滑动条前进
        function dragMove() {
            window.setTime = null;
            window.setTime = setInterval(function() {
                // drag.style.left = (audio.currentTime / audio.duration) * ($(".js_progressBac").width()) + "px";
                // speed.style.width = (audio.currentTime / audio.duration) * ($(".js_progressBac").width()) + "px";
                setNode(audio.currentTime);
                // console.log(audio.currentTime)
                // console.log(123)
            }, 20);
        }

        /**
         *音频进度条 结束
         */

         

        var audioNode = $("#audio").data("node");
        audioNode = eval("("+audioNode+")");
        // console.log(audioNode);
        // var swiperIndex = 0;//记录swiper的当前索引
        
        var mySwiper = new Swiper('.swiper-container', {
            // autoplay: 5000,//可选选项，自动滑动
            // allowSwipeToNext : false,
            // allowSwipeToPrev : false,
            noSwiping : true,
            onSlideChangeStart: function(swiper){
                // alert(swiper.activeIndex);
                audio.pause();
                audio.currentTime = audioNode[swiper.activeIndex].start;
                if($("#control").hasClass("play")){
                    $("#control").addClass("pause").removeClass("play");
                }
            },
            onSlideChangeEnd: function(swiper){
                // alert(swiper.activeIndex);
                    audio.play();
            }
        })

        var setNode = function(cTime){
            for(var i = 0,nodeLen = audioNode.length;i<nodeLen;i++){
                var f = i +1,
                    start = null,
                    end = null;
                if(f >= nodeLen){
                    f = nodeLen - 1;
                    start = audioNode[i].start;
                    end = audioNode[f].end;
                }else{
                    start = audioNode[i].start;
                    end = audioNode[f].start;
                }
                // var timeNode = audioNode[i],
                //     start = timeNode.start,
                //     end = timeNode.end,
                //     nextStart = audioNode[i+1];
                // console.log(start+"======"+end);
                if(cTime>=start && cTime < end){
                        drag.style.left = (start / totaltime) * ($(".js_progressBac").width()) + "px";
                        speed.style.width = (start / totaltime) * ($(".js_progressBac").width()) + "px";
                        // $(".js_test").html(i +"*"+start+"*"+audio.duration+"*"+(start / audio.duration));
                    // alert(mySwiper.activeIndex)
                    // alert(i)
                    if(mySwiper.activeIndex != i){
                        mySwiper.slideTo(i, 1000, false);//切换到第一个slide，速度为1秒
                    }
                }
            }
        }

        



    })()
});
