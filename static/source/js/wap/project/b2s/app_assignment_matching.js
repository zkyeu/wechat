define(function(require, exports, module) {

    ;
    (function() {

        // $.ready(function(){
        //      alert(1)
        // })
        var matching = $("#matching"),
            weixinContent = JSON.parse(matching.attr("weixinContent")),
            questionDetail = weixinContent.questionDetail,
            displaySequence = weixinContent.displaySequence,
            initPic = displaySequence.pic.split(","),
            initWord = displaySequence.word.split(","),
            answer = weixinContent.answer,
            // right = answer.right,
            user = answer.user.split(","),
            wait = answer.correct,
            waitLineColor = "rgba(230,230,230,1)",
            rightLineColor = "rgba(147,223,73,1)",
            wrongLineColor = "rgba(254,120,102,1)";
            
        // console.log(matching.attr("weixinContent"))
        // console.log(weixinContent)

        initDom();
        // drawLine();


        function coordinate(type, index) {
            // alert(123);
            var marginBottom = 18, //li的margin-bottom:18px;
                lineDistance = 8, //连接线距离图片和文字都有8px的距离;
                liDom = matching.find("li").eq(index),
                liDomHei = liDom.height() - marginBottom;
            // console.log(liDom)
            if (type == "pic") {
                var picDom = matching.find("li").eq(index).find(".assignment-item4-con-pic"),
                    L = picDom.width() + lineDistance,
                    T = liDom.height() * (index * 1 + 1) + (index * marginBottom) - (liDomHei / 2);
            } else if (type == "word") {
                var wordDom = matching.find("li").eq(index).find(".assignment-item4-con-text"),
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
            for (var i = 0, len = initWord.length; i < len; i++) {
                if (id == initWord[i]) {
                    return i;
                }
            }
            console.log("图片的id无匹配的文字id");
            return false;
        }

        //传入第几个题，返回画线的颜色和坐标
        function calculateLine(num) {
            
            var arr = initPic[num],
                arr2 = user[num],
                arrPicIndex = num,
                arrWordIndex = lineIndexOf(arr),
                arr2WordIndex = lineIndexOf(arr2);
            if(wait==0){
                return {
                    "result": 2,
                    "coordinateStartYes": coordinate("pic", arrPicIndex),
                    "coordinateEndYes": coordinate("word", arr2WordIndex)
                };
            }else if(wait==1){
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
            var canvas = $("#canvas"),
                canvasWidth = $(".assignment-item4-con").width(),
                canvasHeight = $(".assignment-item4-con").height();
            canvas.attr({
                "width": canvasWidth,
                "height": canvasHeight
            });
            
            if (canvas == null)
                return false;
            var context = canvas.get(0).getContext("2d");
            context.lineWidth = 2;

            for (var i = 0, len = initPic.length; i < len; i++) {
                var lineData = calculateLine(i),
                    result = lineData.result,
                    coordinateStartYes = lineData.coordinateStartYes,
                    coordinateEndYes = lineData.coordinateEndYes,
                    coordinateStartNo = lineData.coordinateStartNo || null,
                    coordinateEndNo = lineData.coordinateEndNo || null;
                console.log(lineData);

                if (result == 2){
                    context.strokeStyle = waitLineColor;
                    context.fillStyle = waitLineColor;
                    context.beginPath();
                    context.moveTo(coordinateStartYes.x, coordinateStartYes.y);
                    context.lineTo(coordinateEndYes.x, coordinateEndYes.y);
                    context.stroke();
                }else if (result == 1) {
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
        }

        function initDom(callback) {
            var imgPath = [];
            for (var i = 0, len = initPic.length; i < len; i++) {
                var picId = initPic[i];
                for (var j = 0, len2 = questionDetail.length; j < len2; j++) {
                    var str = questionDetail[j];
                    // console.log(str.pic)
                    if (picId == str.id) {
                        matching.find("li").eq(i).find(".assignment-item4-con-pic img").attr("src", str.pic);
                        imgPath.push(str.pic);
                    }
                }
            }
            imgLoad(imgPath,function(){
                drawLine();
            });
            for (var i = 0, len = initWord.length; i < len; i++) {
                var wordId = initWord[i];
                for (var j = 0, len2 = questionDetail.length; j < len2; j++) {
                    var str = questionDetail[j];
                    // console.log(str.word)
                    if (wordId == str.id) {
                        matching.find("li").eq(i).find(".assignment-item4-con-text").html(str.word);
                    }
                }
            }
        }

        function imgLoad(imgArr,callback){
            var length = imgArr.length;
            var _length = length;
            if(length == 0) return;
            for(var i=0;i<length;i++){
                var img = new Image();
                img.onload = function(){
                    _length--;
                    if(_length == 0) typeof(callback) == "function" && callback();
                }
                img.src = imgArr[i];
                
            }
        }


    })();

});
