define("app_reportMonth_share", ["fastclick", "echarts.min.radar"], function(require, exports, module) {
    require("echarts.min.radar");
    require("fastclick");
    FastClick.attach(document.body);

    (function() {
        window.init = function() {
            // alert($("#main").width())
            // alert($("#main").height())
            // setTimeout(function() {

            // }, 1000)
            // console.log(echarts);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            console.log(myChart);
            var js_percentage_1 = $(".js_percentage_1").data('percentage'),
                js_percentage_2 = $(".js_percentage_2").data('percentage'),
                js_percentage_3 = $(".js_percentage_3").data('percentage'),
                js_percentage_4 = $(".js_percentage_4").data('percentage');

            // 指定图表的配置项和数据
            option = {
                /*title: {
                    text: '多雷达图'
                },*/
                tooltip: {
                    show: '',
                    // showContent:'false',
                    // trigger: 'axis',
                    // triggerOn: 'click',
                    // alwaysShowContent: 'false',
                    // backgroundColor: 'rgba(255,0,0,0.7)',
                    // axisPointer:{
                    //     type:'cross'
                    // }
                },
                legend: {
                    show: '',
                    x: 'center',
                    data: ['月报', '某主食手机', '某水果手机', '降水量', '蒸发量']
                },
                radar: [{
                    indicator: [
                        { text: '', max: 100 },
                        // { text: '内容', max: 100 },
                        { text: '', max: 100 },
                        { text: '', max: 100 },
                        { text: '', max: 100 }
                    ],
                    center: ['50%', '50%'],
                    radius: '100%',
                    name: {
                        // formatter: '【{value}】',
                        textStyle: {
                            color: '#333333'
                        }
                    },
                    nameGap: 10,
                    // shape:'circle',
                    axisLine: {
                        lineStyle: {
                            color: '#dadada',
                            type: 'dashed',
                        }
                    },
                    // axisTick:{
                    //     show:'true'
                    // },
                    splitArea: {
                        show: 'true',
                        areaStyle: {
                            color: ['rgba(235,235,235,0.3)', 'rgba(235,235,235,0.3)'],
                            opacity: 1,
                        }
                    },
                    splitLine: {
                        show: 'false',
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0,
                        },
                    }
                }],
                series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                // borderColor:'#000',
                            }
                        }
                    },
                    data: [{
                        value: [js_percentage_1, js_percentage_4, js_percentage_3, js_percentage_2],
                        name: '月报'
                    }]
                }],
                color: ['#c0f0b8', '#c1bfbf', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                // backgroundColor:'rgba(255, 0, 255, 0.5)',
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            //////////////////////////////////////////////
            /*
             *各种题型 star
             */

            /*
             *连线
             */
            var soleNum = -1,
                js_canvasWrap = $(".js_canvasWrap"),
                len = js_canvasWrap.length,
                rightLineColor = "rgba(147,223,73,1)", //连线题不是全对时正确的连线的颜色
                wrongLineColor = "rgba(254,120,102,1)", //连线题不是全对时错误的连线的颜色
                waitLineColor = "rgba(147,223,73,1)", //连线题全对时所用的颜色
                canvasIdName = null,
                canvas = null,
                canvasWidth = null,
                canvasHeight = null,
                matching = null, //
                weixinContent = null, //传过来的JSON
                type = null, //type为5是图文连线，6是文文连线。
                _options = null, //渲染数据
                stem = null, //连线左右两边的显示顺序
                matchingL = null,
                matchingR = null,
                user = null, //用户选择的连线结果
                wait = null; //用户的这个题做的是否正确

            loop();

            function loop() {
                soleNum = ++soleNum;
                // soleNum >= len ? (return false) : "";
                if (soleNum >= len) {
                    return false;
                }

                canvasIdName = $(js_canvasWrap[soleNum]).find(".js_canvas").attr("id"),
                    canvas = $("#" + canvasIdName),
                    canvasWidth = $(js_canvasWrap[soleNum]).width(),
                    canvasHeight = $(js_canvasWrap[soleNum]).height(),
                    matching = $(js_canvasWrap[soleNum]).find(".js_matching"),
                    weixinContent = JSON.parse(matching.attr("weixinContent")),
                    type = weixinContent.type,
                    _options = weixinContent.options,
                    stem = weixinContent.stem,
                    matchingL = stem.optionL.split(","),
                    matchingR = stem.optionR.split(","),
                    user = weixinContent.userAnswer.split(","),
                    wait = weixinContent.userIsRight;

                initDom();
            }


            function coordinate(type, index) {
                var marginBottom = 18, //li的margin-bottom:18px;
                    lineDistance = 8, //连接线距离图片和文字都有8px的距离;
                    liDom = matching.find("li").eq(index),
                    liDomHei = liDom.height() - marginBottom;
                // console.log(liDom)
                if (type == "pic") {
                    var picDom = matching.find("li").eq(index).find(".matchingL"),
                        L = picDom.width() + lineDistance,
                        T = liDom.height() * (index * 1 + 1) + (index * marginBottom) - (liDomHei / 2);
                } else if (type == "word") {
                    var wordDom = matching.find("li").eq(index).find(".matchingR"),
                        L = wordDom.position().left - lineDistance,
                        T = liDom.height() * (index * 1 + 1) + (index * marginBottom) - (liDomHei / 2);
                }

                return {
                    "x": L,
                    "y": T
                }
            }

            //求索引,图片的id对应的文字id所在的索引值
            function lineIndexOf(id) {
                for (var i = 0, len = matchingR.length; i < len; i++) {
                    if (id == matchingR[i]) {
                        return i;
                    }
                }
                console.log("图片的id无匹配的文字id");
                return false;
            }

            //传入第几个题，返回画线的颜色和坐标
            function calculateLine(num) {

                var arr = matchingL[num],
                    arr2 = user[num],
                    arrPicIndex = num,
                    arrWordIndex = lineIndexOf(arr),
                    arr2WordIndex = lineIndexOf(arr2);
                if (wait == 1) {
                    return {
                        "result": 2,
                        "coordinateStartYes": coordinate("pic", arrPicIndex),
                        "coordinateEndYes": coordinate("word", arr2WordIndex)
                    };
                } else if (wait == 2) {
                    if (arr == arr2) {
                        return {
                            "result": 1,
                            "coordinateStartYes": coordinate("pic", arrPicIndex),
                            "coordinateEndYes": coordinate("word", arrWordIndex)
                        };
                    }
                    return {
                        "result": 0,
                        "coordinateStartYes": coordinate("pic", arrPicIndex),
                        "coordinateEndYes": coordinate("word", arrWordIndex),
                        "coordinateStartNo": coordinate("pic", arrPicIndex),
                        "coordinateEndNo": coordinate("word", arr2WordIndex),
                    };
                }


            }

            //用来在画布上画线
            function drawLine() {
                /*var canvas = $(".js_canvas"),
                    canvasWidth = $(".js_canvasWrap").width(),
                    canvasHeight = $(".js_canvasWrap").height();*/
                canvas.attr({
                    "width": canvasWidth,
                    "height": canvasHeight
                });

                if (canvas == null)
                    return false;
                var context = canvas.get(0).getContext("2d");
                context.lineWidth = 2;

                for (var i = 0, len = matchingL.length; i < len; i++) {
                    var lineData = calculateLine(i),
                        result = lineData.result,
                        coordinateStartYes = lineData.coordinateStartYes,
                        coordinateEndYes = lineData.coordinateEndYes,
                        coordinateStartNo = lineData.coordinateStartNo || null,
                        coordinateEndNo = lineData.coordinateEndNo || null;
                    console.log(lineData);

                    if (result == 2) {
                        context.strokeStyle = waitLineColor;
                        context.fillStyle = waitLineColor;
                        context.beginPath();
                        context.moveTo(coordinateStartYes.x, coordinateStartYes.y);
                        context.lineTo(coordinateEndYes.x, coordinateEndYes.y);
                        context.stroke();
                    } else if (result == 1) {
                        context.strokeStyle = rightLineColor;
                        context.fillStyle = rightLineColor;
                        context.beginPath();
                        context.moveTo(coordinateStartYes.x, coordinateStartYes.y);
                        context.lineTo(coordinateEndYes.x, coordinateEndYes.y);
                        context.stroke();
                    } else {
                        context.strokeStyle = rightLineColor;
                        context.fillStyle = rightLineColor;
                        context.beginPath();
                        context.moveTo(coordinateStartYes.x, coordinateStartYes.y);
                        context.lineTo(coordinateEndYes.x, coordinateEndYes.y);
                        context.stroke();

                        context.strokeStyle = wrongLineColor;
                        context.fillStyle = wrongLineColor;
                        context.beginPath();
                        context.moveTo(coordinateStartNo.x, coordinateStartNo.y);
                        context.lineTo(coordinateEndNo.x, coordinateEndNo.y);
                        // context.lineWidth = 2;
                        context.stroke();
                    }

                }
                //context.beginPath();
                // context.strokeStyle = rightLineColor;
                // context.fillStyle = rightLineColor;
                //实验证明第一次lineTo的时候和moveTo功能一样
                // context.lineTo(100, 100);
                //之后的lineTo会以上次lineTo的节点为开始
                // context.lineTo(200, 200);
                // context.lineTo(200, 100);
                // context.moveTo(200, 50);
                // context.lineTo(100, 50);
                // context.lineWidth = 2;
                // context.stroke();

                loop(); //画完一个之后再调用此方法画下一个。
            }

            function initDom(callback) {
                var imgPath = [];

                for (var i = 0, len = matchingL.length; i < len; i++) {
                    var LId = matchingL[i];
                    for (var j = 0, len2 = _options.length; j < len2; j++) {
                        var str = _options[j];
                        // console.log(str.pic)
                        if (LId == str.id) {
                            if (type == "5") {
                                // matching.find("li").eq(i).find(".matchingL img").attr("src", str.optionL);
                                matching.find("li").eq(i).find(".matchingL").html('<img src="' + str.optionL + '">');
                                imgPath.push(str.optionL);
                            } else if (type == "6") {
                                matching.find("li").eq(i).find(".matchingL").html('<span class="matchingL-con">' + str.optionL + '</span>');
                            }

                        }
                    }
                }

                for (var i = 0, len = matchingR.length; i < len; i++) {
                    var RId = matchingR[i];
                    for (var j = 0, len2 = _options.length; j < len2; j++) {
                        var str = _options[j];
                        // console.log(str.word)
                        if (RId == str.id) {
                            if (type == "5") {
                                // matching.find("li").eq(i).find(".matchingR .matchingR-con").html(str.optionR);
                                matching.find("li").eq(i).find(".matchingR").html('<span class="matchingR-con">' + str.optionR + '</span>');
                            } else if (type == "6") {
                                matching.find("li").eq(i).find(".matchingR").html('<span class="matchingR-con">' + str.optionR + '</span>');
                            }
                        }
                    }
                }

                if (type == "5") {
                    imgLoad(imgPath, function() {
                        drawLine();
                    });
                } else {
                    drawLine();
                }

            }

            function imgLoad(imgArr, callback) {
                var length = imgArr.length;
                var _length = length;
                if (length == 0) return;
                for (var i = 0; i < length; i++) {
                    var img = new Image();
                    img.onload = function() {
                        _length--;
                        if (_length == 0) typeof(callback) == "function" && callback();
                    }
                    img.src = imgArr[i];

                }
            }



            /*
             *音频播放
             */
            var js_audioBtn = $(".js_audioBtn"); //音频播放点击按钮，无进度条
            js_audioBtn.on('click', '', function(e) {
                var _this = $(this),
                    audioStyle = _this.find('.js_audioStyle'),
                    audioSrc = _this.data("src");
                console.log(audioSrc)
                if (!_this.data("appended")) {
                    var audioDom = document.createElement("audio");
                    audioDom.src = audioSrc;
                    _this.append(audioDom).data('appended', '1');
                    audioDom.addEventListener("ended", function() {
                        audioStyle.removeClass("pause").addClass('play');
                    }, false)
                    audioDom.addEventListener("pause", function() {
                        audioStyle.removeClass("pause").addClass('play');
                    }, false)
                    audioDom.addEventListener("play", function() {
                        audioStyle.removeClass('play').addClass("pause");
                    }, false)
                }
                var audioStr = _this.find('audio')[0];
                if (audioStyle.hasClass('pause')) {
                    audioStr.pause();
                } else {
                    audioStr.src = audioSrc;
                    pauseNowAudio();
                    $(audioStr).addClass('js_audioCurrent');
                    audioStr.play();
                }
            });
            //暂停音频播放
            function pauseNowAudio() {
                var audioCurrent = $("audio.js_audioCurrent");
                audioCurrent.length && (audioCurrent[0].pause(), audioCurrent.removeClass("js_audioCurrent"));
            }

            /*
             *各种题型 end
             */
            //////////////////////////////////////////////


        }

        //点击更多
        $(".js_more").on("click", "", function() {
            $(this).hide();
            $(".js_clickMore").show();
        })

        //点击**人答错
        var js_dislogWrap = $(".js_dislogWrap"),
            js_dialogShow = $(".js_dialogShow"),
            js_dialogHide = $(".js_dialogHide"),
            js_rank = $(".js_rank");
        js_dialogShow.on("click", "", function() {
            js_rank.html("");//先清空弹框内容
            var _this = $(this),
                shownum = _this.data('shownum'),
                data = _this.data('rank'),
                num = data.num,
                detail = data.detail,
                str = "";
            if(num == 0){
                return false;
            }
            if(num > 12){
                for(var i = 0;i < shownum-1;i++){
                    var name = detail[i].name,
                        imgSrc=detail[i].imgSrc;
                    str += '<li><span class="icon"><img class="" src="'+imgSrc+'" alt=""></span>'+name+'</li>';
                }
                str += '<li class="omit"></li>';
            }else{
                for(var i = 0;i<num;i++){
                    var name=detail[i].name,
                        imgSrc=detail[i].imgSrc;
                    str += '<li><span class="icon"><img class="" src="'+imgSrc+'" alt=""></span>'+name+'</li>';
                }
            }
            js_rank.html(str);

            js_dislogWrap.show();
            controlScroll.lock();
        })
        js_dialogHide.on("click", "", function() {
            js_dislogWrap.hide();
            controlScroll.unLock();
        })
        var aa = function(){

        }

        //有弹框后禁止滑动
        var controlScroll = (function(){
            var dis = function(event){
                event.preventDefault();
            },
            body = document.body || document.documentElement;

            return {
                lock : function(filter){
                    body.addEventListener('touchmove', dis, false);
                },
                unLock : function(filter){
                    body.removeEventListener('touchmove', dis, false);
                }
            }
        })()

    })()
});
