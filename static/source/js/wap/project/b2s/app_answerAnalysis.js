define("app_answerAnalysis", ["fastclick"], function(require, exports, module) {
    // require("swiper-3.3.1.jquery.min");
    require("fastclick");
    FastClick.attach(document.body);

    window.init = function() {
        /*
         *连线
         */
        var soleNum= -1,
        	js_canvasWrap= $(".js_canvasWrap"),
        	len= js_canvasWrap.length,
            rightLineColor = "rgba(147,223,73,1)",//连线题不是全对时正确的连线的颜色
            wrongLineColor = "rgba(254,120,102,1)",//连线题不是全对时错误的连线的颜色
        	waitLineColor = "rgba(147,223,73,1)",//连线题全对时所用的颜色
	        canvasIdName = null,
			canvas = null,
            canvasWidth = null,
            canvasHeight = null,
	        matching = null,//
	        weixinContent = null,//传过来的JSON
	        type = null,//type为5是图文连线，6是文文连线。
	        _options = null,//渲染数据
	        stem = null,//连线左右两边的显示顺序
	        matchingL = null,
	        matchingR = null,
	        user = null,//用户选择的连线结果
	        wait = null;//用户的这个题做的是否正确
	    
	    loop();

        function loop(){
        	soleNum = ++soleNum;
        	// soleNum >= len ? (return false) : "";
        	if(soleNum >= len){
        		return false;
        	}

			canvasIdName = $(js_canvasWrap[soleNum]).find(".js_canvas").attr("id"),
			canvas = $("#"+canvasIdName),
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
            
            loop();//画完一个之后再调用此方法画下一个。
        }

        function initDom(callback) {
            var imgPath = [];

            for (var i = 0, len = matchingL.length; i < len; i++) {
                var LId = matchingL[i];
                for (var j = 0, len2 = _options.length; j < len2; j++) {
                    var str = _options[j];
                    // console.log(str.pic)
                    if (LId == str.id) {
                    	if(type == "5"){
                    		// matching.find("li").eq(i).find(".matchingL img").attr("src", str.optionL);
                    		matching.find("li").eq(i).find(".matchingL").html('<img src="'+ str.optionL +'">');
                        	imgPath.push(str.optionL);
                    	}else if(type == "6"){
                    		matching.find("li").eq(i).find(".matchingL").html('<span class="matchingL-con">'+ str.optionL +'</span>');
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
                        if(type == "5"){
                        	// matching.find("li").eq(i).find(".matchingR .matchingR-con").html(str.optionR);
                    		matching.find("li").eq(i).find(".matchingR").html('<span class="matchingR-con">'+ str.optionR +'</span>');
                    	}else if(type == "6"){
                    		matching.find("li").eq(i).find(".matchingR").html('<span class="matchingR-con">'+ str.optionR +'</span>');
                    	}
                    }
                }
            }

            if(type == "5"){
            	imgLoad(imgPath, function() {
	                drawLine();
	            });
            }else{
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
    }

});
