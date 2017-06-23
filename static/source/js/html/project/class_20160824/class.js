/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-09-09 11:10:00
 * @version 1.0.0
 */
define("class", ["lodash", "tmpl"], function(require, exports, module) {
    var tmpl = require('tmpl');
    
    var domain2 = document.domain;
    var cookie = require("cookie");
    var dataIndex = -1; //播放区分标志
    var page = param_json.page; //页码
    var course = param_json.courseid || 0;
    var domain = "http://static.51talk.com/upload/";
    var domain3 = "http://static.51talk.com/";
    var domain1 = "http://static.51talk.com/upload/efl_audio/prepar/"; //移植就版本文件信息
    var tag =  param_json.tag;
    var recordTime = 0;
    var is_guide = param_json.coursetag;
    var cur = 1;
    var jumpFlag = 0;
    var beta_tag = 1;//param_json.betatag; //0 显示选内测版弹出框 显示选项卡(弹窗 使用体验版、原版)使用
    var is_beta = param_json.isbeta; //该课程是否是体验版课程 都是1 为真，0 为显示弹窗及不是体验课程
    var timeId;
    var timer;
    var student_num = param_json.studentnum;
    var startTime; //进入页面时间
    var endTime;
    
    var requestStart; //进入开始响应时间
    var requestEnd; //进入结束响应时间
    var talk_tag = param_json.talktag; //0 时显示对话框显示  1时不显示对话框
    //var talk_tag =0;
    var runoff_tag = param_json.offtag; //0时显示流失弹出框 1时不显示弹出框对话框
    var talk_id=1;
    
    //var runoff_tag = 0;
    var option = {
        course_id: course,
        word_id: "",
        page: ""
    };
    var stay_time = 0,
        word_idNew = 0,
        skip = 0,
        try_num = 0,
        ref_time = 0,
        scoreVal = 0,
        model = 0,
        pageMode = 0,
        trynumObj = {},
        raise = 0,
        is_end = 0;
    var blindTotal = param_json.wordsnum;
    var blindHear = [];
    var appoint_id = param_json.appointid;
    var isStartSkip = 0;
    var record = ""; //驰声返回地址
    var startTimer = null;
    var followReadTimer = null;
    var noticStartTime = new Date().getTime();
    var pageNumber = 0;
    var recordFirst =0;//是否为第一次成绩带有评分非0时，不会在第一次评分成绩显示弹出框，只有4次的时候才会有弹出框
    var recordsArr =[];//评分成绩次数
    var tabStatus = {
        dh: 0,//对话
        dc: 0,//单词
        yf: 0,//语法
        jz:0,//句子
        zj:0
    };
    var model_tag= (param_json.modeltag ?param_json.modeltag:"").replace(/,/g,"");
    var xinaoFlage=null;
     //var model_tag= "5678";
    var bx_isover = 0; //必学词汇是否学完
    var teacher_img = "/static/images/html/class_20150824/teacher_icon.jpg";
    /*-----------------------------驰声插件---------------------------------*/
    $(function() {
        window.aiPanel = new chivox.AiPanel({
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onBeforeReplay : function(){
                 $("#replay").removeClass().addClass('stoping');
            },
            onAfterReplay:function(){
                $("#replay").removeClass().addClass('down');
            }
        });
        aiPanel.Dialog.close();


    });

    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     */
    function setData(aiPanel, obj, toggleClass) {
        var defferd = new $.Deferred();
        var url =encodeURI(obj.attr("media-audio"));
        aiPanel.setData({
            audioUrl: url,
            serverParams: {
                coreType: "en.sent.score",
                refText: "hello limei"
            }
        });
        aiPanel.params.onAfterPlay = function() {
            obj.toggleClass(toggleClass);
            aiPanel.setData({
                audioUrl: ""
            });
            defferd.resolve();
        };
        obj.toggleClass(toggleClass);
        $("#aiPanel .play").click(); //播放触发
        return defferd;
    }
    /**
     * 跟读
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     */
    function setDataRead(aiPanel, obj1, obj2, toggleClass) {
        var defferd = new $.Deferred();
        aiPanel.setData({
            audioUrl: obj1.attr("media-audio"),
            serverParams: {
                coreType: "en.sent.score",
                refText: "hello limei"
            }
        });
        aiPanel.params.onAfterPlay = function() {
            followReadTimer = setTimeout(function() {
                obj1.toggleClass(toggleClass);
                $(".scoreRt").show();
                
                aiPanel.setData({
                    audioUrl: obj2.attr("media-audio"),
                    serverParams: {
                        coreType: "en.sent.score",
                        refText: "hello limei"
                    }
                });
                aiPanel.params.onAfterPlay = function() {
                    obj2.toggleClass(toggleClass);
                    var startTime = new Date().getTime();
                    if((model_tag.indexOf("6")>-1)){
                        $(".compare-box").show();
                        $(".compare-box .u-btn").off().on("click",function(){
                            var endTime =  new Date().getTime();
                            var staytime = endTime-startTime;
                            guide(staytime,6).done(function(){
                                model_tag = model_tag.replace("6","");
                                $(".compare-box").hide();
                            });
                        });
                    }
                    defferd.resolve();
                    
                };
                obj2.toggleClass(toggleClass);
                $("#aiPanel .play").click(); //播放触发
            }, 1500);
        };
        obj1.toggleClass(toggleClass);
        $("#aiPanel .play").click(); //播放触发
        return defferd;
    }
    /* 正确提示音 */
    function setRight(aiPanel, obj) {
        dataIndex = 0200;
        aiPanel.setData({
            audioUrl: domain3+"/static/js/html/project/class_20150824/yes.mp3"
        });
        aiPanel.params.onAfterPlay = function() {
            obj.trigger("click");
        };
        $("#aiPanel .play").click();
    }
    /* 错误提示音 */
    function setFault(aiPanel) {
        dataIndex = 0500;
        aiPanel.setData({
            audioUrl: domain3+"/static/js/html/project/class_20150824/no.mp3"
        });
        aiPanel.params.onAfterPlay = function() {};
        $("#aiPanel .play").click();
    }

    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     */
    function setListen(aiPanel, obj) {
        if (dataIndex != obj.attr("data-index")) {
            dataIndex = obj.attr("data-index");
            aiPanel.setData({
                audioUrl: obj.attr("media-audio"),
                serverParams: {
                    coreType: "en.sent.score",
                    refText: "hello limei"
                }
            });
        }
        aiPanel.params.onBeforePlay = function() {
            obj.css("background-color", "#ff8200");
            obj.css("color", "#fff");
            timeId = setTimeout(function() {
                obj.css("background-color", "#fff");
                obj.css("color", "#ff8200");
            }, 150);
        };
        aiPanel.params.onAfterPlay = function() {
            obj.html("再听一遍");
            obj.append("<i></i>");
            obj.find("i").css("background-position", "-87px -137px");
        };
        $("#aiPanel .play").click(); //播放触发  
    }
    /**
     * @type ABA || AB
     * @selector 需要做样式修改样式的目标
     * @index 当前操作位置
     * @toggleClass 需要调整的样式
     * @需要等待时间 需要调整的样式
     */
    function autoPlay(type, selector, index, toggleClass, time) {
        if (type == "ABA" && index == 0) {
            $("#classOn li").eq(index).show(1500);
        } else if (type == "ABA" && index == 1) {
            $("#classOn li").eq(index).show(1000);
        } else if (type == "ABA" && index == 2) {
            $("#classOff").show();
        } else if (type == "AB" && index == 0) {
            $("#classOn li").show(1500);
        }
        var defferd = new $.Deferred();
        defferd.done(function(res) {
            if (res == 2 && is_guide == "0") {
                setTimeout(function() {
                    $(".w3container,.w2mask").show();
                    $(".w3container .btn").click(function() {
                        $(".w2mask,.w3container").hide();
                        is_guide = 1;
                        $.ajax({
                            url: "/ApiEfl/addPreClassLog?act=info",
                            type: "post",
                            data: {
                                key: 'course',
                                val: course
                            }
                        });
                    });
                }, 500);
            }
        });

        timeId = setTimeout(function() {
            aiPanel.setData({
                audioUrl: selector.attr("media-audio")
            });
            aiPanel.params.onAfterPlay = function() {
                selector.toggleClass(toggleClass);
                if (type == "ABA" && index == 0) {
                    autoPlay("ABA", $("#classOn .icon").eq(1), 1, "classLink");
                    //testAnim('pulse',0);
                } else if (type == "ABA" && index == 1) {
                     //testAnim('pulse',1);
                    if (is_guide == "0") {

                        $(".w1mask,.w1container").show();
                        $(".w1container .btn").click(function() {
                            $(".w1mask,.w1container").hide();
                            $("#classOff,.w2container").show();
                            soundChoice();
                            $(".w2container .btn").click(function() {
                                $(".w2container").hide();
                                autoPlay("ABA", $("#classOff .icon"), 2, "classLink");
                            });
                        });
                    } else {
                        autoPlay("ABA", $("#classOff .icon"), 2, "classLink");
                    }
                } else if (type == "ABA" && index == 2) {
                    defferd.resolve(2);
                    soundChoice();
                } else if (type == "AB" && index == 0) {
                    $("#classOff").show();
                    autoPlay("AB", $("#classOff .icon"), 1, "classLink");
                } else if (type == "AB" && index == 1) {
                    soundChoice();
                }
            };
            selector.toggleClass(toggleClass);
            $("#aiPanel .play").click(); //播放触发          
        }, time || 1000);
        /*defferd.resolve();
        return defferd;*/
    }
    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     * @word_id 需要记录的id
     */
    function setRecord(aiPanel, obj, toggleClass, word_id, type) {
        var coreType = "en.word.score";
        if (obj.attr("data-title").split(" ").length > 1) {
            coreType = "en.sent.score";
        }
        aiPanel.setData({
            audioUrl: obj.attr("media-audio"),
            serverParams: {
                coreType: coreType,
                refText: obj.attr("data-title"),
                attachAudioUrl: 1,
                result: {
                    details: {
                        raw: 1,
                        sym: 1
                    }
                },
                rank: 100,
                userId: type + "_" + student_num
            },
            duration: 600 * obj.attr("data-title").split(" ").length + 2000
        });

        aiPanel.params.onBeforeReplay = function(){
             $("#replay").removeClass().addClass('stop');
        }
        aiPanel.params.onAfterReplay=function(){
            $("#replay").removeClass().addClass('down');
        }
        aiPanel.params.onBeforeRecord = function(data) {
            $(".error_warn").hide();
        }
        aiPanel.params.onScore = function(data) {
            record = data.audioUrl;
            var resultObj = new chivox.EnSentScore(data);
            var sent = "";
            for (var i = 0; i < resultObj.getWordSize(); i++) {
                var color = "";
                var score = resultObj.data.result.details[i].score;
                if (score >= 0 && score <= 60) {
                    color = "#ff5b5b";
                } else if (score > 60 && score < 80) {
                    color = "#000000";
                } else if (score >= 80 && score <= 100) {
                    color = "#4ebc23";
                }

                var singleWord = resultObj.data.result.details[i].rawchar;
                if (singleWord.split(" ").length > 1) {
                    singleWord = changeCase(singleWord);
                }
                sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
            }
            $("#word_content").html(sent);
            var scoreAll = resultObj.getOverall();
            showScoreGuide(scoreAll);
            if (scoreAll >= 0 && scoreAll <= 60) {
                position = "0px 1px";
                //scoreAll = "";
            } else if (scoreAll > 60 && scoreAll < 80) {
                position = "0px -116px";
            } else if (scoreAll >= 80 && scoreAll <= 100) {
                position = "0px -77px";
            } else {
                scoreAll = "0";
            }
            //scoreAll="0";
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; top:-31px; right:-48px; left:-76px;display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";");
           if(scoreAll>60){
                $(".munBer").html(scoreAll);
            }else{
                $(".munBer").html("");
            }
            $(".munBer").hide();
            scoreVal = scoreAll;
            //Scorelog(this, resultObj,obj);
            jumpFlag = 1;
            //logRecordData(word_id, course, 5, resultObj.getOverall());
            if (scoreAll == "0") {
                $(".error_warn").show();
            } else {
                $(".error_warn").hide();
                $(".munBer").show();
            }
            $("#replay").attr('media-audio','http://'+record+'.mp3');
            $("#replay").addClass("down").removeClass("stop");
        };

       

        aiPanel.params.onAfterRecord = function(data) {
           
            obj.removeClass(toggleClass).removeClass("off2").addClass("off");
            obj.attr("isrecord", "false");
            
        };
        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            alert(errorObj.feedback);
            //$(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px; right: -215px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: 0px -38px;");
            $(".munBer").html("0");
             if(errorType==41031){
                $(".error_warn").html("当前用户访问过多，请稍后再试");
            }
            //$(".munBer").show();
            $(".error_warn").show();
        };
        obj.toggleClass(toggleClass);
        $(".munBer").hide();
        $(".error_warn").hide();
        $("#aiPanel .record").click(); //播放触发
    }

    //首字母大写
    function changeCase(str) {
        var s = str;
        return s.replace(/(^|\s+)\w/, function(s) {
            return s.toUpperCase();
        });
    }

    //判断对象长度
    function objectSize(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //句子跟读
    function setRecordReadFollow(aiPanel, obj, toggleClass, word_id, type) {
        aiPanel.setData({
            audioUrl: obj.attr("media-audio"),
            serverParams: {
                coreType: "en.sent.score",
                refText: obj.attr("data-title"),
                attachAudioUrl: 1,
                result: {
                    details: {
                        raw: 1,
                        sym: 1
                    }
                },
                rank: 100,
                userId: type + "_" + student_num
            },
            duration: 600 * obj.attr("data-title").split(" ").length + 2000
        });
        aiPanel.params.onBeforeRecord = function(data) {
            $(".error_warn").hide();
        }
        aiPanel.params.onScore = function(data) {
            var resultObj = new chivox.EnSentScore(data);
            record = data.audioUrl;
            // console.log('----------------> ', resultObj);
            // console.log('-----------> ', resultObj.getPron());
            // console.log('-----------> ', resultObj.getOverall());
            // console.log('-----------> ', resultObj.getWordSize());
            var sent = "";
            for (var i = 0; i < resultObj.getWordSize(); i++) {
                var color = "";
                var score = resultObj.data.result.details[i].score;
                if (score >= 0 && score <= 60) {
                    color = "#ff5b5b";
                } else if (score > 60 && score < 80) {
                    color = "#000000";
                } else if (score >= 80 && score <= 100) {
                    color = "#4ebc23";
                }

                var singleWord = resultObj.data.result.details[i].rawchar;
                if (singleWord.split(" ").length > 1) {
                    singleWord = changeCase(singleWord);
                }
                sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
            }
            $(".wordLink").html(sent);
            var scoreAll = resultObj.getOverall();
            showScoreGuide(scoreAll);
            if (scoreAll >= 0 && scoreAll <= 60) {
                position = "0px 1px";
                //scoreAll = "";
            } else if (scoreAll > 60 && scoreAll < 80) {
                position = "0px -116px";
            } else if (scoreAll >= 80 && scoreAll <= 100) {
                position = "0px -77px";
            } else {
                scoreAll = "0";
            }
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px;top:-81px; right: -175px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";");
            if(scoreAll>60){
                $(".munBer").html(scoreAll);
            }else{
                $(".munBer").html("");
            }
            $(".munBer").hide();
            if (scoreAll == "0") {
                $(".error_warn").show();
            } else {
                $(".error_warn").hide();
                $(".munBer").show();
            }
            scoreVal = scoreAll;
           // Scorelog(this, resultObj,obj);
            jumpFlag = 1;
            $("#replay").attr('media-audio','http://'+record+'.mp3');
            $("#replay").addClass("down").removeClass("stop");
            //logRecordData(word_id, course, 6, resultObj.getOverall());
        };
        aiPanel.params.onBeforeReplay = function(){
             $("#replay").removeClass().addClass('stop');
        }
        aiPanel.params.onAfterReplay=function(){
            $("#replay").removeClass().addClass('down');
        }
        aiPanel.params.onAfterRecord = function(data) {
            obj.removeClass(toggleClass);
            obj.removeClass("off2");
            obj.addClass("off");
            obj.attr("isrecord", "false");

        }
        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            //alert(errorObj.feedback);
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px;top:-81px; right: -175px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: 0px -38px;");
            $(".munBer").html("0");
             if(errorType==41031){
                $(".error_warn").html("当前用户访问过多，请稍后再试");
            }
            $(".error_warn").show();
            //$(".munBer").show();
        };
        obj.toggleClass(toggleClass);
        $(".munBer").hide();
        $("#aiPanel .record").click(); //播放触发
    }

    //看图说话语音回调
    function setRecordReadTalk(aiPanel, obj, toggleClass, word_id, type) {
        aiPanel.setData({
            audioUrl: obj.attr("media-audio"),
            serverParams: {
                coreType: "en.sent.score",
                refText: obj.attr("data-title"),
                attachAudioUrl: 1,
                result: {
                    details: {
                        raw: 1,
                        sym: 1
                    }
                },
                rank: 100,
                userId: type + "_" + student_num
            },
            duration: 600 * obj.attr("data-title").split(" ").length + 2000
        });
        aiPanel.params.onBeforeRecord = function(data) {
            $(".error_warn").hide();
        }
        aiPanel.params.onScore = function(data) {
            record = data.audioUrl;
            var resultObj = new chivox.EnSentScore(data);
            var sent = "";
            for (var i = 0; i < resultObj.getWordSize(); i++) {
                var color = "";
                var wordChar = resultObj.data.result.details[i].rawchar;
                var score = resultObj.data.result.details[i].score;
                if (score >= 0 && score <= 60) {
                    color = "#ff5b5b";
                    if (recordTime == 1) wordChar = "___";
                } else if (score > 60 && score < 80) {
                    color = "#000000";
                } else if (score >= 80 && score <= 100) {
                    color = "#4ebc23";
                }
                if (wordChar.split(" ").length > 1) {
                    wordChar = changeCase(wordChar);
                }
                sent = sent + ' <span style="color:' + color + ';">' + wordChar + '</span>';
            }
            globalChar = wordChar;
            $(".wordLink").html(sent);
            if (wordChar.indexOf("___") == -1) {
                $("#classOn .icon").unbind("click");
                $("#realReadTalk").css("background-position", "");
                $("#classOn .icon").click(function() {
                    $(this).parents(".scoreLt").siblings().find(".icon").removeClass("classLink");
                    setData(aiPanel, $(this), "classLink");
                    $(".off").removeClass("offLink").attr("isrecord", "false");
                });
            }
            var scoreAll = resultObj.getOverall();
            showScoreGuide(scoreAll);
            if (scoreAll >= 0 && scoreAll <= 60) {
                position = "0px 1px";
                //scoreAll = "";
            } else if (scoreAll > 60 && scoreAll < 80) {
                position = "0px -116px";
            } else if (scoreAll >= 80 && scoreAll <= 100) {
                position = "0px -77px";
            } else {
                scoreAll = "0";
            }
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px;top:-81px; right: -175px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";");
            if(scoreAll>60){
                $(".munBer").html(scoreAll);
            }else{
                $(".munBer").html("");
            }
            $(".munBer").hide();
            if (scoreAll == "0") {
                $(".error_warn").show();
            } else {
                $(".error_warn").hide();
                $(".munBer").show();
            }
            scoreVal = scoreAll;
            //Scorelog(this, resultObj,obj);
            jumpFlag = 1;
            $("#replay").attr('media-audio','http://'+record+'.mp3');
            $("#replay").addClass("down").removeClass("stop");
            // logRecordData(word_id, course, 7, resultObj.getOverall());
        };
        aiPanel.params.onAfterRecord = function(data) {
            obj.removeClass(toggleClass);
            obj.removeClass("off2");
            obj.addClass("off");
            obj.attr("isrecord", "false");
            //$(".munBer").show();
            // $(".reFresh").show();
        }
        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            alert(errorObj.feedback);
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px;top:-81px; right: -175px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: 0px -38px;");
            /*$(".munBer").html("0");
            $(".munBer").show();*/
             if(errorType==41031){
                $(".error_warn").html("当前用户访问过多，请稍后再试");
            }
            $(".error_warn").show();
        };
        obj.toggleClass(toggleClass);
        $("#aiPanel .record").click(); //播放触发
    }

    //控制动画
    function testAnim(x,index) {
        setTimeout(function(){
            $('.wordhover').eq(index).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass().addClass("wordhover");
            });
        },800);
    };

    //添加日志
    function Scorelog(obj, resultObj,ele) {
        $.post('/ApiEfl/addScorelog', {
            course_id: course,
            type: model,
            model:model,
            'word_id':ele.attr('word_id'),
            record :record,
            mark:scoreVal,
            setup: JSON.stringify(obj),
            data: JSON.stringify(resultObj.data)
        }, function(data) {});
    }

    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     */
    function setReadRecord(aiPanel, obj, type) {
        if(type=="d"){
            model = 21;
        }else{
            model = 22;
        }
        var title = obj.data("title");
        var coreType = "en.sent.score";
        if(title.split(" ").length==1){
            coreType = "en.word.score";
            aiPanel.setData({
                audioUrl: obj.attr("media-audio"),
                serverParams: {
                    coreType: coreType,
                    refText: obj.attr("data-title"),
                    attachAudioUrl: 1,
                    result: {
                        details: {
                            raw: 1,
                            sym: 1
                        }
                    },
                    rank: 100,
                    userId: type + "_" + student_num
                },
                duration: 600 * obj.attr("data-title").split(" ").length + 2000
            });
            aiPanel.params.onScore = function(data) {
                record = data.audioUrl;
                var resultObj = new chivox.EnSentScore(data);
                var sent = "";
                for (var i = 0; i < resultObj.getWordSize(); i++) {
                    var color = "";
                    var score = resultObj.data.result.details[i].score;
                    if (score >= 0 && score <= 60) {
                        color = "#ff5b5b";
                    } else if (score > 60 && score < 80) {
                        color = "#000000";
                    } else if (score >= 80 && score <= 100) {
                        color = "#4ebc23";
                    }
                    var singleWord = resultObj.data.result.details[i].rawchar;
                    if (singleWord.split(" ").length > 1) {
                        singleWord = changeCase(singleWord);
                    }
                    sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
                }
                obj.parents(".operate").siblings(".text").find(".content").html(sent);
                var scoreAll = resultObj.getOverall();
                if (scoreAll >= 0 && scoreAll <= 54) {
                    position = "0px -409px";
                } else if (scoreAll >= 55 && scoreAll <= 69) {
                    position = "0px -356px";
                } else if (scoreAll >= 70 && scoreAll <= 84) {
                    position = "0px -308px";
                } else if (scoreAll >= 85 && scoreAll <= 100) {
                    position = "0px -258px";
                }
                scoreVal = scoreAll;
                //Scorelog(this, resultObj,obj);
                obj.siblings(".result").html('<i class="grade" style="background-position: ' + position + '"></i>');
            };
        }else if (title.split(" ").length >= 20) {
            coreType = "en.pred.exam";
            aiPanel.setData({
                audioUrl: obj.siblings(".listen").attr("media-audio"),
                serverParams: {
                    coreType: coreType,
                    refText: {
                        qid: "PAPER-000005-QT-000003",
                        lm: obj.attr("data-title")
                    },
                    attachAudioUrl: 1,
                    result: {
                        details: {
                            raw: 1,
                            sym: 1
                        }
                    },
                    rank: 100,
                    precision: 1.0,
                    userId: type + student_num,
                    client_params: {
                        ext_subitem_rank4: 0
                    }
                },
                duration: 600 * obj.attr("data-title").split(" ").length + 2000
            });
            aiPanel.params.onScore = function(data) {
                record = data.audioUrl;
                var resultObj = new chivox.EnSentScore(data);
                var sent = "";
                for (var i = 0; i < resultObj.getWordSize(); i++) {
                    var color = "";
                    var score = resultObj.data.result.details[i].score;

                    if (score >= 0 && score <= 60) {
                        color = "#ff5b5b";
                    } else if (score > 60 && score < 80) {
                        color = "#000000";
                    } else if (score >= 80 && score <= 100) {
                        color = "#4ebc23";
                    }
                    var singleWord = resultObj.data.result.details[i].text;
                    if (singleWord.split(" ").length > 1) {
                        singleWord = changeCase(singleWord);
                    }
                    sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
                }
                obj.parents(".operate").siblings(".text").find(".content").html(sent);
                var scoreAll = resultObj.getOverall();
                if (scoreAll >= 0 && scoreAll <= 54) {
                    position = "0px -409px";
                } else if (scoreAll >= 55 && scoreAll <= 69) {
                    position = "0px -356px";
                } else if (scoreAll >= 70 && scoreAll <= 84) {
                    position = "0px -308px";
                } else if (scoreAll >= 85 && scoreAll <= 100) {
                    position = "0px -258px";
                }
                scoreVal = scoreAll;
               // Scorelog(this, resultObj,obj);
                obj.siblings(".result").html('<i class="grade" style="background-position: ' + position + '"></i>');
            };
        } else {
            aiPanel.setData({
                audioUrl: obj.siblings(".listen").attr("media-audio"),
                serverParams: {
                    coreType: coreType,
                    refText: obj.attr("data-title"),
                    attachAudioUrl: 1,
                    result: {
                        details: {
                            raw: 1,
                            sym: 1
                        }
                    },
                    rank: 100,
                    userId: type + student_num
                },
                duration: 600 * obj.attr("data-title").split(" ").length + 2000
            });
            aiPanel.params.onScore = function(data) {
                record = data.audioUrl;
                var resultObj = new chivox.EnSentScore(data);
                var sent = "";
                for (var i = 0; i < resultObj.getWordSize(); i++) {
                    var color = "";
                    var score = resultObj.data.result.details[i].score;
                    if (score >= 0 && score <= 60) {
                        color = "#ff5b5b";
                    } else if (score > 60 && score < 80) {
                        color = "#000000";
                    } else if (score >= 80 && score <= 100) {
                        color = "#4ebc23";
                    }
                    var singleWord = resultObj.data.result.details[i].rawchar;
                    if (singleWord.split(" ").length > 1) {
                        singleWord = changeCase(singleWord);
                    }
                    sent = sent + ' <span style="color:' + color + ';">' + singleWord + '</span>';
                }
                obj.parents(".operate").siblings(".text").find(".content").html(sent);
                var scoreAll = resultObj.getOverall();
                if (scoreAll >= 0 && scoreAll <= 54) {
                    position = "0px -409px";
                } else if (scoreAll >= 55 && scoreAll <= 69) {
                    position = "0px -356px";
                } else if (scoreAll >= 70 && scoreAll <= 84) {
                    position = "0px -308px";
                } else if (scoreAll >= 85 && scoreAll <= 100) {
                    position = "0px -258px";
                }
                scoreVal = scoreAll;
                 //Scorelog(this, resultObj,obj);
                obj.siblings(".result").html('<i class="grade" style="background-position: ' + position + '"></i>');
            };
        }


        aiPanel.params.onBeforeRecord = function() {
            obj.siblings(".result").html('<i class="load">正在评分...</i>');
            obj.css("background-color", "#ff8200");
            obj.css("color", "#fff");
            timeId = setTimeout(function() {
                obj.css("background-color", "#fff");
                obj.css("color", "#ff8200");
            }, 150);
        }
        aiPanel.params.onAfterRecord = function(data) {
            obj.html("再读一遍");
            obj.append("<i></i>");
            obj.find("i").css("background-position", "-87px -137px");
        }
        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            alert(errorObj.feedback);
        };
        $("#aiPanel .record").click(); //播放触发
    }
    /**
     * 评分日志
     * @word_id 单词id
     * @course 课程id
     * @type 记录类型
     * @score 分数
     */
    function logRecordData(word_id, course, type, score) {
        var record_data = {};
        record_data.word_id = word_id;
        record_data.course_id = course;
        record_data.type = type;
        record_data.score = score;
        $.ajax({
            url: "/ApiEfl/addPreScorelog",
            data: record_data,
            success: function() {},
            type: "post",
            dataType: "json"
        });
    }
    /**
     * 评分日志
     * @obj 组对象
     * @data 音频数组
     * @total 总数
     */
    function setAutoPlayList(obj, data, total) {
        var tmpArr = data;
        obj.find("p").removeClass("arrow");
        obj.eq(total - tmpArr.length).find("p").addClass("arrow");
        aiPanel.setData({
            audioUrl: tmpArr.shift()
        });
        aiPanel.params.onAfterPlay = function() {
            if (tmpArr) setAutoPlayList(obj, tmpArr, total);
        };
         aiPanel.params.onBeforePlay=function(){
            
        }
        $("#aiPanel .play").click(); //播放触发    
    }
    /*-----------------------------事件注册---------------------------------*/
    /* 分数计算函数 */
  /*  function setScore(page, total) {
        $("#step").parents("li").addClass("on");
        //debugger;

        var step = (page / total).toFixed(2).slice(2, 4).toString();
        if (model == 11 && (page == total)) {
            step = 100;
        }
        if (model == 10 || model == 11 || model == 12) {
            step = step * 0.15;
        } else if (model != 9) {
            var total1 = total - (parseInt(blindTotal) + 2);
            step = (85 / total1) * (page - (parseInt(blindTotal) + 2)) + 15 + 3;
        }
        step = step.toString().split(".")[0];
        if (page == total && (model != 10 && model != 11 && model != 12)) {
            $("#step").parents("li").removeClass("on");
            $("#step").addClass("resultScore");
            $("#step").css("background-color", $("#resultScore").attr("color-value"));
            if (parseInt($("#resultScore").html()) < 80) {
                $("#step").html($("#resultScore").html() + " 待提高");
            } else {
                $("#step").html($("#resultScore").html());
            }
            return;
        }
        if (step == "00") {
            step = "0";
        } else if (parseInt(step) > 0 && parseInt(step) < 10) {
            step = step.replace("0", "");
        } else if (parseInt(step) > 100) {
            step = 100;
        }
        if (model == 12) {
            step = 15;
        }
        $("#step").html("（" + step + "%）");
    }*/

     /* 分数计算函数 */
  function setScore(page, total){
    $("#step").parents("li").addClass("on");
    var step = (page/total).toFixed(2).slice(2,4).toString();
    if (page == total) {
      $("#step").parents("li").removeClass("on");
      $("#step").addClass("resultScore");
      $("#step").css("background-color", $("#resultScore").attr("color-value"));
      if (parseInt($("#resultScore").html()) < 80) {
        $("#step").html($("#resultScore").html() + " 待提高");
      } else {
        $("#step").html($("#resultScore").html());
      }
      return;
    }
    if (step == "00") {
      step = "0";
    } else if (parseInt(step)>0 && parseInt(step)<10) {
      step = step.replace("0", "");
    }
    $("#step").html("（" + step + "%）");
  }

    //数据统计
    function statistics(isKnow) {
        var isKnow = isKnow ? isKnow : 0;
        endTime = new Date().getTime();
        stay_time = (endTime - startTime) / 1000;
        ref_time = requestEnd - requestStart;
        var data = $.extend(option, {
            page: pageMode,
            stay_time: stay_time,
            word_id: word_idNew,
            skip: skip,
            try_num: try_num,
            ref_time: ref_time,
            score: scoreVal,
            model: model,
            is_know: isKnow,
            is_end: is_end,
            record: record
        });
        $.ajax({
            url: "/ApiEfl/addPreClassLog?act=words",
            type: "post",
            data: data
        });
        startTime = endTime;
    }

    /* 下一页清除 */
    function nextUnbind() {
        //清除下一页点击事件

        requestStart = 0;
        requestEnd = 0;
        stay_time = 0, word_idNew = 0,skip = 0, try_num = 0, ref_time = 0, scoreVal = 0, model = 0, trynumObj = {}, is_end = 0, record = "", recordsArr=[];
        $("#next").unbind("click");
        $("#next").removeClass("upGry");

    }
    //用户课程统计
    function actCourse(type) {
        var newPage;
        if (page == 0) {
            newPage = 0;
        } else {
            newPage = page;
        }
        var postdata = {
            'course_id': course,
            'page': newPage,
            'raise': raise,
            'appoint_id': appoint_id
        };
        if (model == 5 && is_end == 1) {
            console.log(blindHear.toString());
            postdata.know_id = blindHear.join() ? blindHear.join() : "";
        }
        if (pageNumber == page && model != 10) {
            postdata.is_end = 1;
        }
        $.ajax({
            url: "/ApiEfl/addPreClassLog?act=course",
            type: "post",
            data: postdata
        });
    }



    /*盲读模块页*/
    function nextBlind(isKnow) {
        var isKnow = isKnow;
        page++;
        actCourse();
        $(".error-pic").hide();
        $(".loading-pic").show();
        $.ajax({
            url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
            dataType: "json",
            success: function(res) {
                $(".loading-pic").hide();
                statistics(isKnow);
                apiInfoChoice(res).done(function() {
                    word_idNew = res.id ? res.id : 0;
                    model = res.type;
                    pageMode = res.num;
                    is_end = res.is_end ? res.is_end : 0;
                    setScore(page, res.total);
                    blindTotal = res.total;
                });

            },
            error: function() {
                $(".error-pic").show();
                page--;
                $("#err-fresh").click(function() {
                    $("#next").trigger("click");
                });
            }
        });
    }

    /* 下一页事件绑定 */
    function nextBind() {
         if (page > 0) {
                $(".first-page").show();
            }
        $("#next").addClass("upGry");
        $("#next").unbind().click(function() {
            page++;
            aiPanel.setData({
                audioUrl: ""
            });
            dataIndex = 0;
            recordTime = 0;
            $(".error-pic").hide();
            $(".loading-pic").show();
            if (page > 0) {
                $(".first-page").show();
            }
            actCourse();
            $.ajax({
                url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
                dataType: "json",
                success: function(res) {
                    $(".loading-pic").hide();
                    if (model != 12) {
                        statistics();
                    }
                    apiInfoChoice(res).done(function() {
                        word_idNew = res.id ? res.id : 0;
                        model = res.type;
                        pageMode = res.num;
                        is_end = res.is_end ? res.is_end : 0;
                        pageNumber = res.total;
                        if (is_beta == 1) {
                            floatDialog(res);
                        } else if (model != 9) {
                            $(".ft").show();
                        }
                        setScore(page, res.total);
                        if(model==25){
                            opPreLoss(1);
                        }else{
                             opPreLoss(0);
                        }
                        
                    });


                },
                error: function() {
                    $(".error-pic").show();
                    page--;
                    $("#err-fresh").click(function() {
                        $("#next").trigger("click");
                    });
                }
            });
        });
    }
    /* 跳页事件绑定 */
    function jumpBind() {
        $("#next").addClass("upGry");
        if(page>0){
            $(".first-page").show();
        }
        $("#next").unbind().click(function() {
            if (jumpFlag == 1) {
                page++;
                aiPanel.setData({
                    audioUrl: ""
                });
                dataIndex = 0;
                recordTime = 0;
                $(".error-pic").hide();
                $(".loading-pic").show();
                actCourse();
                $.ajax({
                    url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
                    dataType: "json",
                    success: function(res) {
                        statistics();
                        jumpFlag == 0;
                        $(".loading-pic").hide();
                        apiInfoChoice(res).done(function() {
                            word_idNew = res.id ? res.id : 0;
                            is_end = res.is_end ? res.is_end : 0;
                            model = res.type;
                            pageMode = res.num;
                            setScore(page, res.total);
                            pageNumber = res.total;
                              if(model==25){
                                    opPreLoss(1);
                                }else{
                                     opPreLoss(0);
                                }
                        });

                    },
                    error: function() {
                        $(".error-pic").show();
                        page--;
                        $("#err-fresh").click(function() {
                            $("#next").trigger("click");
                        });
                    }
                });
            } else {
                $("#skipDialog").show();
                $("#wok").unbind().click(function() {
                    $("#skipDialog").hide();
                });
                $("#wsorry").unbind().click(function() {
                    $("#skipDialog").hide();
                    page++;
                    aiPanel.setData({
                        audioUrl: ""
                    });
                    dataIndex = 0;
                    recordTime = 0;
                    $(".error-pic").hide();
                    $(".loading-pic").show();
                    actCourse();
                    $.ajax({
                        url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
                        dataType: "json",
                        success: function(res) {
                            skip = 1; //跳过
                            statistics();
                            jumpFlag == 0;
                            $(".loading-pic").hide();
                            apiInfoChoice(res).done(function() {
                                word_idNew = res.id ? res.id : 0;
                                model = res.type;
                                pageMode = res.num;
                                is_end = res.is_end ? res.is_end : 0;
                                setScore(page, res.total);
                                pageNumber = res.total;
                                  if(model==25){
                                        opPreLoss(1);
                                    }else{
                                        opPreLoss(0);
                                    }
                            });

                        },
                        error: function() {
                            $(".error-pic").show();
                            page--;
                            $("#err-fresh").click(function() {
                                $("#next").trigger("click");
                            });
                        }
                    });
                });
            }
            jumpFlag = 0;
        });
    }
    /* 跟读/图说 */
    function readFollow(type) {
        //声音播放
        $("#classOn .icon").click(function() {
            $(".icon").removeClass("classLink");
            if(!$("#replay").hasClass('stop')){
                 $("#replay").removeClass().addClass('down');
            }
            setData(aiPanel, $(this), "classLink");
            $(".off").removeClass('offLink').attr("isrecord", "false");
        });
        $("#realReadTalk").unbind("click");
        $("#classOn img").click(function() {
            $(this).siblings(".icon").trigger("click");
            $(".off").removeClass('offLink').attr("isrecord", "false");
             if(!$("#replay").hasClass('stop')){
                 $("#replay").removeClass().addClass('down');
            }
        });
        $("#replay").off().on("click",function(){
                $(".off").removeClass("offLink").attr("isrecord", 'false');
                $(".icon").removeClass("classLink");
                if($(this).hasClass('stoping') && !$("#replay").attr('media-audio')){
                    $(this).removeClass('stoping').addClass('down');
                    $('#aiPanel .replay').click();
                    return;
                }
                if($("#replay").attr('media-audio')){
                   if($(this).hasClass('stoping')){
                        $('#aiPanel .play').click();
                        $(this).removeClass('stoping').addClass('down');
                        return;
                   }
                    setData(aiPanel,$(this),'stoping');
                }else if(!$(this).hasClass('stop')){
                    $(".replay").click();
                }
            });
        $(".off,.off2").off().click(function() {
            $(".icon").removeClass("classLink");
            cookie.setCookie("tipsFlag", "flase");
            if(!$("#replay").hasClass('stop')){
                 $("#replay").removeClass().addClass('down');
            }
            $(".friSt").hide();
            $(".munBer").attr("style", "").html("");;
            if (type == "read") {
                if ($(this).attr("isRecord") == "true") {
                    $("#aiPanel .record").click();
                    $(".munBer").hide();
                    $(this).attr("isRecord", "false");
                } else {
                    $(this).attr("isRecord", "true");
                    setRecordReadFollow(aiPanel, $(this), "offLink", $(this).attr("word_id"), type);
                }
            } else if (type == "talk") {
                recordTime++;
                if ($(this).attr("isRecord") == "true") {
                    $("#aiPanel .record").click();
                    $(".munBer").hide();
                    $(this).attr("isRecord", "false");
                } else {
                    $(this).attr("isRecord", "true");
                    setRecordReadTalk(aiPanel, $(this), "offLink", $(this).attr("word_id"), type);
                }
            }
        });
    }
    /* 听声音选图片 */
    function soundChoice() {
        /* 事件添加 */
        requestStart = new Date().getTime();
        $("#classOn .icon").click(function() {
            $(this).parents("li").siblings().find(".icon").removeClass("classLink");
            $("#classOff .icon").removeClass("classLink");
            //audio设置
            setData(aiPanel, $(this), "classLink");
        });
        $("#classOn img").click(function() {
            $(this).siblings(".icon").trigger("click");
        });

        $("#classOff .icon").click(function() {
            $(this).parent().siblings("classOn").find(".icon").removeClass("classLink"); //清除
            setData(aiPanel, $(this), "classLink");
            $("#classOn .icon").removeClass("classLink");
        });

        $("#classOff li").click(function() {
            if (requestEnd == 0) {
                requestEnd = new Date().getTime();
            }
            var timeOut = $(this);
            if ($(this).attr("data-status") == 1) {
                //显示浮动层
                if ((model == 9 || model == 10) && is_beta == 1) {

                    $(".float-box").slideDown(500);
                }
                // 为当前添加正确样式
                $(this).find(".linkClass").addClass("rightClass");
                $(this).siblings().find(".linkClass").addClass("grey-link");
                // 清除其它点击
                $("#classOff li").unbind('click');
                //清楚当前播放
                if ($("#classOff .icon").hasClass("classLink")) {
                    $("#classOff .icon").trigger("click");
                }
                if ($(this).parent().parent().prev().find('li').length > 1) {
                    $(this).parent().parent().prev().find('li').eq(1).find("img").addClass('opacity');
                } else {
                    $(this).parent().parent().prev().find('li').eq(0).find("img").addClass('opacity');

                }
                nextBind(); //添加下一页点击事件
                // 添加定时器
                timeId = setTimeout(function() {
                    timeOut.find("a").removeClass("rightClass");
                    timeOut.find(".check").addClass("checkLink");
                    timeOut.click(function() {
                        $("#classOff .icon").trigger("click");
                    });
                }, 1000);
                setRight(aiPanel, $("#classOff .icon"));
            } else {
                // 为当前添加错误样式
                timeOut.find(".linkClass").addClass("errorClass");
                timeOut.find("i").addClass("checkLink");
                timeId = setTimeout(function() {
                    timeOut.find("a").removeClass("errorClass");
                    timeOut.find("i").removeClass("checkLink");
                }, 1000);
                setFault(aiPanel);
                tryNum($("#classOff li"), $(this));
            }
        });
    }


    //错误次数
    function tryNum(ele1, ele2) {

        var index = ele1.index(ele2);
        index = "a" + index;
        if (!(index in trynumObj)) {
            trynumObj[index] = index;
            try_num++;
        }

    };
    /* 看图选声音 */
    function picSoundChoice() {
        nextUnbind();

        /* 添加事件 */
        $("#picSod div .checkPic").click(function() {
            var choice = $(this);
            //清除所有播放
            dataIndex = '';
            aiPanel.setData({
                audioUrl: ""
            });
            $(this).parents().find(".picSd").removeClass("picSdLink");

            //开始判断
            var timeOff = $(this).parent();
            if ($(this).parent().attr("data-pic") == 1) {
                nextBind();
                timeOff.addClass("right"); //正确
                timeOff.siblings().addClass("picGrey"); //给当前增加正确样式，并将其它蒙层
                //清除其它错误点击
                $("#picSod div").find(".checkPic, .picSd").unbind('click'); //图片的点击事件
                //自动消失定时器
                timeId = setTimeout(function() {
                    //去除选择正确样式
                    timeOff.removeClass("right");
                    choice.addClass("checkLink");
                    //正确声音钮点击
                    timeOff.find(".picSd").click(function() {
                        setData(aiPanel, $(this), "picSdLink");
                    });
                }, 1000);
                setRight(aiPanel, $(this).siblings(".picSd"));
            } else {
                timeOff.addClass("error"); //错误
                choice.addClass("checkLink");
                timeId = setTimeout(function() {
                    choice.removeClass("checkLink");
                    timeOff.removeClass("error");
                }, 1000); //自动消失定时器
                setFault(aiPanel);
                tryNum($("#picSod div .checkPic"), $(this));
            }
        });
        // 给声音添加点击事件
        $("#picSod div .picSd").click(function() {
            //清除所有声音播放
            $(this).parent().siblings().find(".picSd").removeClass("picSdLink");
            setData(aiPanel, $(this), "picSdLink");
        });
    }
    // 判断是否进行调查
    function survey() {
        var defferd = new $.Deferred();
        if (tag == 0) {
            $("#selectTimeDialog").show();
            $("#selectTimeDialog .layerPoi span").click(function() {
                var tagVal = $(this).data("tag");
                $.ajax({
                    url: '/ApiEfl/addPreClassLog?act=user',
                    type: "post",
                    data: {
                        "tag": tagVal
                    }
                }).done(function() {
                    //添加成功
                    $("#selectTimeDialog").hide();
                    defferd.resolve();
                });
            });
        } else {
            defferd.resolve();
        }
        return defferd;
    }
    var talkData = {
            step1:[
                {
                    type:'teacher',
                    sayContent:'Hi,'+nick_name+' ! 欢迎来到预习产品',
                    'class':'noimg'
                },
                {
                    type:'select',
                    buttons:[
                        {
                            button:"老师好<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/weixiao.png'>",
                            key:'step1-1'
                        },
                        {
                            button:"老师好美<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/se.png'>",
                            key:'step1-2'
                        }
                    ]
                }
                
            ],
            "step1-1":[

                {
                    type:'student',
                    sayContent:"老师好<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/weixiao.png'>"
                },
                 {
                    type:'teacher',
                    sayContent:"<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/keai.png'>"
                },
                {
                    type:'teacher',
                    sayContent:'预习之前，有个重要问题要了解下！<br/>你平时是怎样预习的？',
                    'class':'noimg'
                },
                {
                    type:'select',
                    buttons:[
                        {
                            button:"我偶尔看看教材，其实教材的内容挺简单的",
                            key:'step2-1',
                            xinaoFlage:1,
                            'class':'noimg'
                        },
                        {
                            button:"我预习可认真啦，背单词、读课文一步都不少",
                            key:'step2-2',
                            xinaoFlage:2,
                            'class':'noimg'
                        }
                    ]
                }
            ],
            "step1-2":[

                {
                    type:'student',
                    sayContent:"老师好美<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/se.png'>"
                },
                 {
                    type:'teacher',
                    sayContent:"谢谢，嘴真甜<img width=30 height=30 style='margin-left:10px' src='/static/images/html/class_20150824/talk/keai.png'>"
                },
                {
                    type:'teacher',
                    sayContent:'预习之前，有个重要问题要了解下！<br/>你平时是怎样预习的？',
                    'class':'noimg'
                },
                {
                    type:'select',
                    buttons:[
                        {
                            button:"我偶尔看看教材，其实教材的内容挺简单的",
                            key:'step2-1',
                            'class':'noimg',
                            xinaoFlage:1
                        },
                        {
                            button:"我预习可认真啦，背单词、读课文一步都不少",
                            key:'step2-2',
                            'class':'noimg',
                            xinaoFlage:2
                        }
                    ]
                }
                
            ],
            "step2-1":[
                {
                    type:'student',
                    sayContent:'我偶尔看看教材，其实教材的内容挺简单的',
                    'class':'noimg'
                },
                {
                    type:'teacher',
                    sayContent:'对自己很自信嘛！小考一下你，六秒听一段录音',
                    'class':'noimg'
                },
                {
                    type:'student',
                    sayContent:"放马过来<img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/ku.png'>！"
                },
                {
                    type:'teacher',
                    audioUrl:"/static/images/html/class_20150824/talk/sound.mp3",
                    times:6

                },
                {
                    type:'select',
                    buttons:[
                        {
                            button:"<img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'>",
                            key:'step3-1'
                        },
                        {
                            button:"说的太快啦，能不能慢点",
                            key:'step3-2',
                            'class':'noimg'
                        }
                    ]
                }
            
                ],
            "step2-2":[
                    {
                        type:'student',
                        sayContent:'我预习可认真啦，背单词、读课文一步都不少',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'想知道你的预习效果吗？六秒听一段录音！',
                        'class':'noimg'
                    },
                    {
                        type:'student',
                        sayContent:"来吧<img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/ku.png'>"
                    },
                    {
                        type:'teacher',
                        audioUrl:"/static/images/html/class_20150824/talk/sound.mp3",
                        times:6

                    },
                    {
                        type:"select",
                        buttons:[
                            {
                                button:"<img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'>",
                                key:'step3-1'
                            },
                            {
                                button:"说的太快啦，能不能慢点",
                                key:'step3-2',
                                'class':'noimg'
                            }
                        ]
                    }
            ],
            "step3-1":[
                    {
                        type:'student',
                        sayContent:"<img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'><img style='margin-left:10px' width=30 height=30 src='/static/images/html/class_20150824/talk/yun.png'>"
                    },
                    {
                        type:'teacher',
                        sayContent:'听不懂？我们把它写出来！',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'A:What do you want to be doing five years from now.</br>B:Well I would like to be a father of five.',
                        isEn:true
                    },
                    {   
                        type:'select',
                        buttons:[
                            {
                                button:"这些词我都会，为什么听不懂呢？",
                                key:'step4',
                                isback:true,
                                'class':'noimg'
                            }
                        ]
                    }
            ],
            "step3-2":[
                    {
                        type:'student',
                        sayContent:'说的太快啦，能不能慢点',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'已经是正常语速啦！我把它写出来，你再看看！',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'A:What do you want to be doing five years from now.</br>B:Well I would like to be a father of five.',
                        isEn:true
                    },
                    {   type:'select',
                        buttons:[
                            {
                                button:"这些词我都会，为什么听不懂呢！",
                                key:'step4',
                                isback:true,
                                'class':'noimg'
                            }
                        ]
                    }
                    
            ],
            "step4-1":[
                    {
                        type:'student',
                        sayContent:"这些词我都会，为什么听不懂呢？",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:"别被眼睛蒙蔽啦，看得懂≠听得懂",
                        'class':'noimg'
                    },
                    {
                        type:'select',
                        buttons:[
                            {
                                button:"看得懂就可以了吧",
                                key:'step5-1',
                                'class':'noimg'
                            },
                            {
                                button:"我也要听得懂",
                                key:'step5-2',
                                'class':'noimg'
                            }
                        ]
                    }
            ],
            "step4-2":[
                    {
                        type:'student',
                        sayContent:"这些词我都会，为什么听不懂呢？",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'听不懂、但能看懂，因为你正在做<b>“中文翻译”</b>',
                        'class':'noimg'
                    },
                    {
                        type:'select',
                        buttons:[
                            {
                                button:"中文翻译？",
                                key:'step6',
                                'class':'noimg'
                            }   
                        ]
                    }
            ],
            "step5-1":[
                    {
                        type:'student',
                        sayContent:"看得懂就可以了吧",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:"当然不可以啦！听不懂怎么和老外交流呀！",
                        'class':'noimg'
                    },
                    {
                        type:'student',
                        sayContent:"老师乖乖，告诉我该怎么办！",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'你需要使用<b style="color:#ff8200;">新版预习产品</b>解决你的<b>“听不懂问题”</b>',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'听音猜图学英语，5分钟实现<b style="color:#ff8200;">听力秒懂，脱口而出</b>哦！',
                        'class':'noimg'
                    },
                    {
                        type:'end'
                    }
            ],
            "step5-2":[
                    {
                        type:'student',
                        sayContent:"我也要听得懂",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'那就必须要使用<b style="color:#ff8200">新版预习产品</b>啦',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'听音猜图学英语，5分钟实现<b style="color:#ff8200">听力秒懂，脱口而出</b>哦！',
                        'class':'noimg'
                    },
                    {
                        type:'end'
                    }
            ],
            "step6":[
                    {
                        type:'student',
                        sayContent:"中文翻译？",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'<b>“中文翻译”是听说最大的障碍</b>',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'<img src="/static/images/html/class_20150824/talkimg.png">',
                        isimg:true
                    },
                    {
                        type:'teacher',
                        sayContent:'学英语最重要的是：<b>去掉“<span style="color:#ff8200">中文翻译</span>”</b>',
                        'class':'noimg'
                    },
                    {
                        type:'select',
                        buttons:[
                            {
                                button:"快帮我去掉中文翻译！",
                                key:'step7-1',
                                'class':'noimg'
                            },
                            {
                                button:"真的吗？我读书少，可别骗我！",
                                key:'step7-2',
                                'class':'noimg'
                            }
                        ]
                    }
            ],
            "step7-1":[
                    {
                        type:'student',
                        sayContent:"快帮我去掉中文翻译",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'那就必须要使用<b>新版预习产品</b>啦',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'听音猜图学英语，5分钟实现<b style="color:#ff8200">听力秒懂，脱口而出</b>哦！',
                        'class':'noimg'
                    },
                    {
                        type:'end'
                    }
            ],
            "step7-2":[
                    {
                        type:'student',
                        sayContent:"真的吗？我读书少，可别骗我！",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'当然啦！',
                        'class':'noimg'
                    },
                    {
                        type:'student',
                        sayContent:"老师乖乖，告诉我该怎么办！",
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'现在你迫切需要一款“<b style="color:#ff8200">去掉中文</b>”的预习产品。',
                        'class':'noimg'
                    },
                    {
                        type:'teacher',
                        sayContent:'听音猜图学英语，5分钟帮你实现<b style="color:#ff8200">听力秒懂，脱口而出</b>！',
                        'class':'noimg'
                    },
                    {
                        type:'end'
                    }
            ]
        };
var talkList = null;
var intervalTime=50;
var eventAudio = [];
function renderTalk(talkList){
    var tempData = talkList;
    
    setTimeout(function(){
        var obj = talkList.shift();

        var html="";
        if(obj.type=="teacher" || obj.type=="student"){
            if(obj.type=="teacher"){
                 aiPanel.setData({
                        audioUrl:"/static/images/html/class_20150824/talk/news.mp3"
                    });
                aiPanel.params.onAfterPlay = function() {
                  
                };
                 $("#aiPanel .play").click(); //播放触发
            }
            $(".message-box").append(tmpl.xinaoItem({
                data:obj,
                teacher_img:teacher_img,
                student_img:student_img
            }));
            if($(".message-box").get(0).scrollHeight>330){
                $(".message-box").scrollTop($(".message-box").get(0).scrollHeight-340);
            }

            if(obj.sayContent && !obj.isimg && !obj.isEn){
               var dd= $('<div />').html(obj.sayContent);

               var imgSize = dd.find('img').length;
               var textSize = dd.text().length;
               intervalTime = 1000+textSize*100+imgSize*2*100;
            }else if(obj.sayContent && obj.isEn){
                var dd = obj.sayContent.split(" ");
                var textSize = dd.length;
                intervalTime = 1000+textSize*100;
            }
            else if(obj.audioUrl){
                intervalTime = 1000+obj.times*100;
                eventAudio = tempData;
                tempData = [];
            }else{
                intervalTime = 1000+16*100;
            }
            
        }else if(obj.type=="end" || obj.type=="select"){
            intervalTime=2000;
             $(".xinao-list").append(tmpl.xinaoItem({
                data:obj,
                teacher_img:teacher_img,
                student_img:student_img
            }));
        }

        if(tempData.length){
            renderTalk(tempData);
        }
    },intervalTime);
}
    /*-----------------------------模板填充---------------------------------*/
    /* 开始学习初始化 */
    function Init(obj) {
        var defferd = new $.Deferred;

        if(!talk_tag){
            obj.html(tmpl.xinao());
            talkList = talkData.step1;
            //洗脑对话访问统计
            xinaoTalk(1);
            renderTalk(talkList);
            var accessTime = new Date().getTime();
            $(".xinao-skip a").click(function(){
                $("#isSkip").show();
                $("#isSkip #confirm1").click(function(){
                    var endtIime = new Date().getTime();
                    var staytime = endtIime - accessTime;
                    $("#isSkip").hide();
                    xinaoTalk(2,staytime);
                    initfirstPage(obj,defferd);
                    talk_tag=1;
                });
                ;
                $("#isSkip #cancel1").click(function(){
                    $("#isSkip").hide();
                });
                                //defferd.resolve();
            });
            $(".xinao-select .btn").live("click",function(){
                var endtIime = new Date().getTime();
                var staytime = endtIime - accessTime;
                xinaoTalk(3,staytime);
                talk_tag=1;
                initfirstPage(obj,defferd);

            });
            $(".xinao-select .xinao-message").live('click',function(){
                intervalTime=1;
                if($(this).data('xinaoflag')){
                    xinaoFlage = $(this).data('xinaoflag');
                }
                var key = $(this).data("key");
                var isback = $(this).data('isback');
                if(isback){
                    key = key+"-"+xinaoFlage;
                }

                talkList = talkData[key];
                renderTalk(talkList);

                $('.xinao-select').remove();
            });
             $(".xinao-audio,.xinao-tip").live("click",function(){
                var ele = $(this).parent();
                    aiPanel.setData({
                        audioUrl:ele.find(".xinao-audio").attr("audio-url")
                    });
                    ele.find(".xinao-audio").find("span").addClass("active");
                    ele.find(".xinao-audio").find("i").eq(1).removeClass("unactive ");
                    
                    aiPanel.params.onAfterPlay = function() {
                      ele.find(".xinao-audio").find("span").removeClass("active");
                      renderTalk(eventAudio);
                    };
                     $("#aiPanel .play").click(); //播放触发
                });
        }else{
            initfirstPage(obj,defferd);
        }
        return defferd;
    }


    function runoff(){
        if(bx_isover || runoff_tag){
            return;
        }
        runoffTj(1,1);
        $("#runoff").show();
        $("#runoff .close").click(function(){
            bx_isover=1;
            runoff_tag = 1;
             $("#runoff").hide();
             runoffTj(2);

        });
        $("#runoff .btn").click(function(){
            if($("#runoff textarea").val().length<2000 && $("#runoff textarea").val().length>0){
               $("#runoff").hide();
               bx_isover=1;
               runoff_tag = 1;
               runoffTj(3,0,$("#runoff textarea").val());
            }else if($("#runoff textarea").val().length>2000){
                alert("你输入的字符不能超过2000");
            }else{
                alert("输入内容不能为空");
            }
        });
    }

    //统计学员学习记录
    function opPreLoss(isScore){
        var postdata = {
            'course_id':course,
            'model':model,
            'page':pageMode,
            'is_end':isScore
        }
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/ApiEfl/opPreLoss",
            data: postdata,
            success: function(res) {
            }
        });
    }

    //必学词汇流失率统计
    function runoffTj(status,isaccess,remark){
        var postdata = {
            'course_id':course,
            'status':status
        }
        if(isaccess){
            postdata['model']=model;
            postdata['page']=pageMode;
        }
        if(remark){
            postdata['remark'] = remark;
        }

        $.ajax({
            type: "post",
            dataType: "json",
            url: "/ApiEfl/opPreLossW",
            data: postdata,
            success: function(res) {
                
            }
        });
    }

    //初始化模板板页面

    function initfirstPage(obj,defferd){
        var width=null;
        if(param_json.tablist.length==2){
            width = '50%';
        }else if(param_json.tablist.length==3){
            width = '33.333%';
        }else{
            width = '25%';
        }

        obj.html(tmpl.init({
                help: "帮 助",
                'nick_name':nick_name,
                'student_num':student_num1,
                 'data':param_json.tablist,
                 'width':width
            }));
            $(".under li").click(function() {
                dataIndex = -1;
                window.clearTimeout(timeId)
                aiPanel.setData({
                    audioUrl: ""
                });
                var index = $(".under li").index();
                $(this).addClass("on").siblings("li").removeClass("on");
                //1：必学词汇 2：对话练习 3：但那次本 4：语法
                $(".error-pic").hide()
                $(".loading-pic").show();
                switch ($(this).attr("data-tab")) {
                    case "1":
                        $(".sub-class").css("min-height", "400px");
                        if (is_beta == 0) {
                            $(".user-tip").hide();
                        } else {
                            $(".user-tip").show();
                        }
                        $(".float-box").hide();
                        //actCourse();
                        $.ajax({
                            url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page,
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();

                                if (res.type == 5 || res.type == 1 || res.type == 7 || res.type == 25) {
                                    $(".ft").hide();
                                } else {
                                    $(".ft").show();
                                }
                                apiInfoChoice(res).done(function() {
                                    startTime = new Date().getTime();
                                    pageMode = res.num ? res.num : 0;
                                    model = res.type ? res.type : 0;
                                    word_idNew = res.id ? res.id : 0;
                                    is_end = res.is_end ? res.is_end : 0;
                                    if (is_beta == 1 && (res.type == 10 || res.type == 9)) {
                                        floatDialog(res);
                                    }
                                });

                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        break;
                    case "2":
                        cur = 1;
                        $(".user-tip,.float-box").hide();
                        $("#countDown").hide();
                        runoff();
                        if (startTimer) {
                            clearTimeout(startTimer);
                            $(".count-down2 .count").text(3);
                        }
                        $.ajax({
                            url: "/ApiEfl/getPreClassWord?course=" + course + "&type=dialogs",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                diaglogue($(".sub-class"), res);
                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        if (tabStatus.dh == 0) {
                            addEflActlog($(this).attr('model'));
                            tabStatus.dh = 1;
                        }

                        break;
                    case "5":
                         cur = 1;
                        $(".user-tip,.float-box").hide();
                        $("#countDown").hide();
                        runoff();
                        if (startTimer) {
                            clearTimeout(startTimer);
                            $(".count-down2 .count").text(3);
                        }
                        $.ajax({
                            url: "/ApiEfl/getPreClassWord?course=" + course + "&type=sentence",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                sentence($(".sub-class"), res);
                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        if (tabStatus.jz == 0) {
                            addEflActlog($(this).attr('model'));
                            tabStatus.jz = 1;
                        }

                        break;
                    case "7":
                         cur = 1;
                        $(".user-tip,.float-box").hide();
                        $("#countDown").hide();
                        runoff();
                        if (startTimer) {
                            clearTimeout(startTimer);
                            $(".count-down2 .count").text(3);
                        }
                        $.ajax({
                            url: "/ApiEfl/getPreClassWord?course=" + course + "&type=read",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                diaglogue($(".sub-class"), res);
                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        if (tabStatus.jz == 0) {
                            addEflActlog($(this).attr('model'));
                            tabStatus.jz = 1;
                        }

                        break;    
                    case "3":
                        $(".user-tip,.float-box").hide();
                        $("#countDown").hide();
                        runoff();
                        if (startTimer) {
                            clearTimeout(startTimer);
                            $(".count-down2 .count").text(3);
                        }
                        cur = 1;
                        $.ajax({
                            url: "/ApiEfl/getPreClassWord?course=" + course + "&type=words",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                note($(".sub-class"), res);
                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        break;
                    case "4":
                        runoff();
                        $(".user-tip,.float-box").hide();
                        $("#countDown").hide();
                        if (startTimer) {
                            clearTimeout(startTimer);
                            $(".count-down2 .count").text(3);
                        }
                        cur = 1;
                        $.ajax({
                            url: "/ApiEfl/getPreClassWord?course=" + course + "&type=syntax",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                grammar($(".sub-class"), res);
                            },
                            error: function() {
                                $("error-pic").show();
                                $(".under li").eq(index).trigger("click");
                            }
                        });
                        if (tabStatus.yf == 0) {
                            addEflActlog($(this).attr('model'));
                            tabStatus.yf = 1;
                        }

                        break;
                    default:
                        return;
                }
            });
            $(".tip-point").hover(function() {
                $(".tip-container").toggleClass('hide');
            });
            nextBind(); //下一页事件
            defferd.resolve();
    }



    /* ABA 二选三 */
    function ABA(obj, data) {
        var defferd = new $.Deferred;

        obj.html(tmpl.ABA({
            data: data,
            domain: domain
        }));
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        autoPlay("ABA", $("#classOn .icon").eq(0), 0, "classLink", 1);
        defferd.resolve();
        return defferd;
    }
    /* AB 一选二 */
    function AB(obj, data) {
        var defferd = new $.Deferred;
        var pstr1 = data.target.spell != null ? data.target.spell.replace("[", '<span style="background-color:#ffe8d0">').replace("]", "</span>") : "";
        var html = tmpl.AB({
            data: data,
            domain: domain,
            pstr1: pstr1
        });
        obj.html(html);
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        autoPlay("AB", $("#classOn .icon"), 0, "classLink", 1);
        defferd.resolve();
        /*require.async("http://"+domain2+"/static/js/html/project/class_20150824/template/AB.html",function(html){
            var render  = template.compile(html);
            obj.html(render({data:data,domain:domain,pstr1:pstr1}));
            $("img").error(function(){
              $(this).attr("src",$(this).data('img'));
            });
            nextUnbind();
            autoPlay("AB", $("#classOn .icon"), 0, "classLink", 1);
            defferd.resolve();
        });*/
        return defferd;
    }
    /* 跟读 */
    function picRead(obj, data) {
        var defferd = new $.Deferred;
        obj.addClass("picTalk");
        var pstr1 = data.target[0].spell != null ? data.target[0].spell.replace(/\[/g, '<span style="background-color:#ffe8d0">').replace(/\]/g, "</span>") : "";
        var pstr2 = data.target[1].spell != null ? data.target[1].spell.replace(/\[/g, '<span style="background-color:#ffe8d0">').replace(/\]/g, "</span>") : "";
        var tipsStyle = "display:block";
        if (cookie.getCookie("tipsFlag") == "flase") tipsStyle = "display:none";
        str = str + '<a href="javascript:;" class="friSt" style="' + tipsStyle + '">请点击录音<br>系统会为您的口语打分哦！</a><a href="javascript:;" class="error_warn" style="display:none">评分失败，请主人再说一次</a>';
        var style = "display:none;background:none;";
        var position = "";
        var score = parseInt(data.score);
        if (score > 0) {
            if (score == 0) {
                position = "0px -38px;";
            } else if (score > 0 && score <= 60) {
                position = "0px 1px";
                score = "";
            } else if (score > 60 && score < 80) {
                position = "0px -116px";
            } else if (score >= 80 && score <= 100) {
                position = "0px -77px";
            }
            style = "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute;" + cookie.getCookie("tipsFlag") == "flase" ? "right: -203px;" : "" + " bottom: -10px;display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";";
            var tipsScore = "right: -175px;";
            style = "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255);text-align: center; position: absolute;" + tipsScore + " bottom: -10px;top:-81px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";";
        }
        var str = tmpl.picRead({
            data: data,
            domain: domain,
            pstr1: pstr1,
            pstr2: pstr2,
            style: style,
            score: score
        });
        //str = str + '<a href="javascript:;" class="munBer" style="' + style + '">' + score + '</a></div></div></div></div>';
        obj.html(str);
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        if (data.score != 0) {
            scoreVal = data.score;
        }
        jumpBind();
        $("#classOn ul li").show();
        $("#fallow-centence").hide();

        setDataRead(aiPanel, $("#g1"), $("#g2"), "classLink").done(function() {
            readFollow("read");
        });
        defferd.resolve();
        return defferd;
    }

    //评分说明弹出框
    function gradeDialog() {
        var isGrade = cookie.getCookie('isGrade');
        if (!(isGrade == "true")) {
            setTimeout(function() {
                $("#gradeDialog").show();
                $("#gradeDialog .grade-btn").on("click", function() {
                    $("#gradeDialog").hide();
                    cookie.setCookie("isGrade", "true");
                });
            }, 1000);
        }
    }

    /* 图说 */
    function picTalk(obj, data) {
        var defferd = new $.Deferred;
        obj.addClass("picTalk");
        var pstr1 = data.target[0].spell != null ? data.target[0].spell.replace(/\[/g, '<span style="background-color:#ffe8d0">').replace(/\]/g, "</span>") : "";

        var tipsStyle = "display:block";
        if (cookie.getCookie("tipsFlag") == "flase") tipsStyle = "display:none";
        str = str + '<a href="javascript:;" class="friSt" style="' + tipsStyle + '">请点击录音<br>系统会为您的口语打分哦！</a><a href="javascript:;" class="error_warn" style="display:none">评分失败，请主人再说一次</a>';
        var style = "display:none; background:none;";
        var score = parseInt(data.score);
        if (score > 0) {
            var position = "";
            if (score == 0) {
                position = "0px -38px;";
            } else if (score > 0 && score <= 60) {
                position = "0px 1px";
                score = "";
            } else if (score > 60 && score < 80) {
                position = "0px -116px";
            } else if (score >= 80 && score <= 100) {
                position = "0px -77px";
            }
            var tipsScore = "right: -175px;";
            style = "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute;" + tipsScore + " bottom: -10px;top:-81px;display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";";
        }
        // str = str + '<a href="javascript:;" class="munBer" style="' + style + '">' + score + '</a></div></div></div></div>';
        var str = tmpl.picTalk({
            data: data,
            domain: domain,
            pstr1: pstr1,
            style: style,
            score: score
        });
        obj.html(str);
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        if (data.score != 0) {
            scoreVal = data.score;
        }
        jumpBind();
        $("#classOn ul li").show();
        $("#fallow-centence").hide();
        readFollow("talk");
        setData(aiPanel, $("#g3"), "classLink").done(function() {
           
            setTimeout(function() {
                $(".scoreRt").show();
                setTimeout(function(){
                if((model_tag.indexOf("7")>-1)){
                    $(".compare-box").show();
                    var startTime =  new Date().getTime();
                    $(".compare-box .u-btn").off().on("click",function(){
                        var endTime =  new Date().getTime();
                        var staytime = endTime-startTime;
                        guide(staytime,7).done(function(){
                            model_tag = model_tag.replace("7","");
                            $(".compare-box").hide();
                        });
                    });
                }
           },1000);
            }, 1500);
        });
        defferd.resolve();
        return defferd;
    }
    /* 听声音选图片 */
    function soundPic(obj, data) {
        var defferd = new $.Deferred;
        var str = tmpl.soundPic({
            data: data,
            domain: domain
        });
        obj.html(str);
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        $("#classOff").show();
        nextUnbind();

        setData(aiPanel, $(".icon"), "classLink").done(function() {
            soundChoice();
        });
        defferd.resolve();
        return defferd;

    }
    /* 单词卡 */
    function wordCard(obj, data) {
        var defferd1 = new $.Deferred;
        var style = "display:none; background:none;";
        var score = parseInt(data.score);
        scoreVal = score;
        if (score > 0) {
            var position = "";
            if (score == 0) {
                position = "0px -38px;";
            } else if (score > 0 && score <= 60) {
                position = "0px 1px";
                score = "";
            } else if (score > 60 && score < 80) {
                position = "0px -116px";
            } else if (score >= 80 && score <= 100) {
                position = "0px -77px";
            }
            var tipsScore = cookie.getCookie("tipsFlag") == "flase" ? "right: -48px;" : "";
            style = "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255);left:-76px;text-align: center; position: absolute;" + tipsScore + " top:-31px;display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: " + position + ";";
        }
        obj.html(tmpl.wordCard({
            data: data,
            domain: domain,
            style: style,
            score: score
        }));
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        if (data.score != 0) {
            scoreVal = data.score;
        }
        jumpBind();
        var clickTimes = 0;
        $(".off,.off2").off().on('click', function() {
            $("#word_click i").removeClass("word_play");
            cookie.setCookie("tipsFlag", "flase");
            if(!$("#replay").hasClass('stop')){
                 $("#replay").removeClass().addClass('down');
            }
            $(".munBer").css("background", "");
            $(".friSt").hide();

            if ($(this).attr("isRecord") == "true") {
                $("#aiPanel .record").click();
                $(".munBer").hide();
                $(this).attr("isRecord", "false");
            } else {
                $(this).attr("isRecord", "true");
                setRecord(aiPanel, $(this), "offLink", $(this).attr("word_id"), "wordCard");
            }
        });
        $("#replay").off().on("click",function(){
                $(".off").removeClass("offLink").attr("isrecord", 'false');
                $("#word_click i").removeClass("word_play");
                if($(this).hasClass('stoping') && !$("#replay").attr('media-audio')){
                    $(this).removeClass('stoping').addClass('down');
                    $('#aiPanel .replay').click();
                    return;
                }
                if($("#replay").attr('media-audio')){
                   if($(this).hasClass('stoping')){
                        $('#aiPanel .play').click();
                        $(this).removeClass('stoping').addClass('down');
                        return;
                   }
                    setData(aiPanel,$(this),'stoping');
                }else if(!$(this).hasClass('stop')){
                    $(".replay").click();
                }
            });
        //轮播 闭包
        if (data.img.length != 0 && $("#slideLink li").length > 0) {
            (function() {
                var mySlie = document.getElementById("slidLink");
                var addslie = mySlie.getElementsByTagName("li");
                var titles = document.getElementById("slideLink");
                var atitle = titles.getElementsByTagName("li");
                for (var i = 0; i < atitle.length; i++) { //遍历所有的li属性
                    atitle[i].off = i;
                    atitle[i].onclick = function() {
                        mydemo(atitle);
                        this.className = "on"; //为属性添加on样式
                        addslie[this.off].style.display = "block";
                    }
                }
                // 为图片添加setInterval事件
                var index = 0;
                var times = setInterval(function() {
                    index++;
                    // 判断index是否超过li的总个数
                    if (index >= atitle.length) {
                        index = 0;
                    }
                    mydemo(atitle);
                    atitle[index].className = "on";
                    addslie[index].style.display = "block";

                }, 2000);

                function mydemo(atitle) {
                    for (var j = 0; j < atitle.length; j++) { //清除样式
                        atitle[j].className = "";
                        addslie[j].style.display = "none";
                    }
                }
            })();
        }
        $("#word_click").click(function() {
            var obj = $(this);
            $(".off").removeClass("offLink").attr("isrecord", 'false');
            if(!$("#replay").hasClass('stop')){
                 $("#replay").removeClass().addClass('down');
            }
            //alert(dataIndex);
           /* if (dataIndex != obj.attr("data-index")) {
                dataIndex = obj.attr("data-index");
                aiPanel.setData({
                    audioUrl: obj.attr("media-audio")
                });

            }*/
            
            dataIndex = obj.attr("data-index");
            aiPanel.setData({
                audioUrl: obj.attr("media-audio")
            });

            aiPanel.params.onAfterPlay = function() {
                obj.find("i").removeClass("word_play");
                setTimeout(function(){
                  if(model_tag.indexOf("5")>-1){
                      $(".compare-box2").show();
                      var startTime =  new Date().getTime();
                      $(".compare-box2 .u-btn").off().on("click",function(){
                          var endtime = new Date().getTime();
                          var stayTime = endtime - startTime;
                          guide(stayTime,5).done(function(){
                              model_tag = model_tag.replace("5","");
                             $(".compare-box2").hide();
                          });
                      })
                  }
                },800);
            };
            obj.find("i").addClass("word_play")
            $("#aiPanel .play").click(); //播放触发
        });
        setTimeout(function() {
            $("#word_click").trigger("click");
        }, 400);
        $("#word_click_y,#word_content").off().click(function() {
            $("#word_click").trigger("click")
        });
        defferd1.resolve();
        return defferd1;
    }
    /* 看图选声音 */
    function picSound(obj, data) {
        var defferd = new $.Deferred;
        var str = tmpl.picSound({
            data: data,
            domain: domain
        });
        obj.html(str);
        $("img").error(function() {
            $(this).attr("src", $(this).data('img'));
        });
        nextUnbind();
        picSoundChoice();
        defferd.resolve();
        return defferd;
    }

    //判断是否显示浮动层

    function floatDialog(res) {
        $(".user-tip").show();
        if ((res.type == 10 || res.type == 9) && is_beta == 1) {
            $('.ft').hide();
            if (res.type == 9) {
                if (res.option[1].correct == 1) {
                    $('#en-word').html(res.option[1].spell.replace(/\[/g, "").replace(/\]/g, ""));
                    $('#chn-word').html(res.option[1].explain.replace(/\[/g, "").replace(/\]/g, ""));
                } else {
                    $('#en-word').html(res.option[0].spell.replace(/\[/g, "").replace(/\]/g, ""));
                    $('#chn-word').html(res.option[0].explain.replace(/\[/g, "").replace(/\]/g, ""));
                }
            } else {
                $('#en-word').html(res.target[0].spell_js);
                $('#chn-word').html(res.target[0].explain.replace(/\[/g, "").replace(/\]/g, ""));
            }
            var worldLength = $('#en-word').text().length;
            if (worldLength <= 50) {
                $('#en-word').css({
                    "font-size": "30px"
                });
            } else if (worldLength <= 72) {
                $('#en-word').css({
                    "font-size": "21px"
                });
            } else if (worldLength <= 75) {
                $('#en-word').css({
                    "font-size": "20px"
                });
            } else {
                $('#en-word').css({
                    "font-size": "18px"
                });
            }

            $(".float-box .pl-img").off().click(function() {
                $(".float-box").hide();
                var is_know = $(this).data("val");
                endTime = new Date().getTime();
                stay_time = (endTime - startTime) / 1000;
                ref_time = requestEnd - requestStart;
                var data = {
                    course_id: course,
                    word_id: word_idNew,
                    try_num: try_num,
                    ref_time: ref_time,
                    is_know: is_know
                };
                $.ajax({
                    url: "/ApiEfl/addPreClassLog?act=beta",
                    type: "post",
                    data: data
                });
                $("#next").trigger("click");

            });


        } else if (res.type == 1 || res.type == 5 || res.type == 7) {
            $('.ft').hide();
            $(".user-tip").hide();
        } else {
            $(".float-box").hide();
            $('.ft').show();
        }
    }
    //盲读开始页
    function blindStart(data) {
        var defferd = new $.Deferred;
        // floatDialog();
        var str = tmpl.blindStart({
            data: data,
            domain: domain
        });
        blindHear = [];
        $(".sub-class").html(str);
        $(".blind_btn").off("click").click(function() {
            page++;
            actCourse();
            $.ajax({
                url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
                dataType: "json",
                success: function(res) {
                    $(".loading-pic").hide();
                    apiInfoChoice(res).done(function() {
                        startTime = new Date().getTime();
                        word_idNew = res.id ? res.id : 0;
                        model = res.type ? res.type : 0;
                        pageMode = res.num ? res.num : 0;
                        blindTotal = res.total;
                        is_end = res.is_end ? res.is_end : 0;
                        setScore(page, res.total);
                        //page = fPage;
                        // $(".first-page").show();
                        //重新为上一页绑
                        //prePageEvent();
                        if (is_beta == 1) {
                            floatDialog(res);
                        } else {
                            $(".user-tip").hide();
                        }
                    });



                },
                error: function() {
                    $(".error-pic").show();
                    $("#err-fresh").click(function() {
                        $(".scoreBtn").trigger("click");
                    });
                }
            });
        });
        defferd.resolve();
        return defferd;
    }

    //盲听结果页

    function blindResult(data) {
        var defferd = new $.Deferred;
        if (!data.hear_num) {
            data = {
                hear_num: blindHear.length,
                total: data.total
            };
        }
        var str = tmpl.blindResult({
            data: data,
            domain: domain
        });

        $(".sub-class").html(str);
        $(".question-des").hover(function() {
            $(".u-tip").show();
        }, function() {
            $(".u-tip").hide();
        });
        nextBind();
        $(".blind .dd-btn").click(function() {
            $("#next").trigger("click");
        });
        defferd.resolve();
        return defferd;
    }

    //单词倒计时
    function skipTime() {
        var number;
        timer = setTimeout(function() {
            number = parseInt($(".count-down span").text());
            $(".count-down span").text(number - 1);
            if (number > 1) {
                skipTime();
            } else if (number == 1) {

                //location.href="http://bbs.51talk.com/forum/detail/5965.html";
                nextBlind(0);
                clearTimeout(timer);
            }

        }, 1000);
    }
    //封面盲听倒计时
    function afterDone() {
        $(".count-down").removeClass("gray");
        skipTime();
        $(".box2 span").removeClass("gray");
        //soundChoice();
        $(".blind #can").off().click(function() {
            clearTimeout(timer);
            blindHear.push(word_idNew);
            nextBlind(1);
        });
        $(".blind #not").off().click(function() {
            clearTimeout(timer);
            nextBlind(2);

        });
    }
    //进入页面
    function startSkip() {
        var defferd = new $.Deferred;
        var number;
        startTimer = setTimeout(function() {
            number = parseInt($(".count-down2 .count").text());
            $(".count-down2 .count").text(number - 1);
            if (number > 1) {
                startSkip();
            } else if (number == 1) {
                $(".count-down2").hide();
                clearTimeout(startTimer);
                isStartSkip = 1;
                setData(aiPanel, $(".icon"), "classLinks").done(afterDone);


            }

        }, 1000);
        return defferd;
    }

    //单词盲听
    function blindProcess(data) {
        var defferd = new $.Deferred;
        var str = tmpl.blindListen({
            data: data,
            domain: domain
        });
        $(".sub-class").html(str);
        $(".blind #can,.blind #not").off("click");

        $(".icon").off().click(function() {
            setData(aiPanel, $(".icon"), "classLinks").done(afterDone);
        });
        $(".blind #can,.blind #not").off("click");
        if (isStartSkip == 0) {
            $(".count-down2").show();
            startSkip();
        } else {
            setData(aiPanel, $(".icon"), "classLinks").done(afterDone);
        }
        nextUnbind();
        defferd.resolve();
        return defferd;
    }

    //对话洗脑 数据埋点
    function xinaoTalk(status,staytime){
        var postdata = {
            'talk_id':talk_id,
            status:status
        };
        if(staytime){
            postdata['stay_time'] = staytime;
        }
        $.ajax({
                type: "post",
                dataType: "json",
                url: "/ApiEfl/opPreTalk",
                data: postdata,
                success: function(res) {
                    
                }
        });
    }


    /* 分数页 */
    function scorePage(data) {
        var defferd = new $.Deferred;
        bx_isover=1;
        $(".user-tip").hide();
        var str = tmpl.scorePage({
            data: data,
            domain: domain
        });
        $(".ft").hide();
        $(".sub-class").html(str);
        var fPage = $(".scorePage").attr("first-page");
        $(".scoreBtn").click(function() {
            Init($(".wt-main")).done(function() {
                $(".error-pic").hide();
                $(".loading-pic").show();
                raise = 1;
                page = fPage;
                actCourse();
                nextUnbind();
                $.ajax({
                    url: "/ApiEfl/getpreclass?course=" + course + "&page=" + fPage + "",
                    dataType: "json",
                    success: function(res) {
                        $(".loading-pic").hide();
                        apiInfoChoice(res).done(function() {
                            var total = res.total ? res.total : 0;
                            startTime = new Date().getTime();
                            word_idNew = res.id ? res.id : 0;
                            model = res.type;
                            pageMode = res.num;
                            page = fPage;
                            is_end = res.is_end ? res.is_end : 0;
                            setScore(page, total);
                            $(".first-page").show();
                            //重新为上一页绑
                            prePageEvent();

                            if (is_beta == 1) {
                                floatDialog(res);
                            } else if (model == 1 || model == 5 || model == 7) {
                                $(".user-tip").hide();
                                $(".ft").hide();
                            } else {
                                $(".user-tip").hide();
                                $(".ft").show();
                            }

                        });



                    },
                    error: function() {
                        $(".error-pic").show();
                        $("#err-fresh").click(function() {
                            $(".scoreBtn").trigger("click");
                        });
                    }
                });
            });

        });
        defferd.resolve();
        return defferd;
    }
    /* 语法 */
    function grammar(obj, res) {
        var str = tmpl.grammar({
            res: res
        });
        obj.css("min-height", "516px");
        $(".ft").hide();
        obj.html(str);
        $(".prev").click(function() {
            if (cur != 1) {
                cur--;
                $(".next").removeClass("dis-next");
                $(".tab").hide();
                $(".tab").eq(cur - 1).show();
                if (cur == 1) $(".prev").addClass("dis-prev");
                $("#cur").html(cur);
            }
        });
        $(".next").click(function() {
            if (cur != res.total) {
                cur++;
                $(".prev").removeClass("dis-prev");
                $(".tab").hide();
                $(".tab").eq(cur - 1).show();
                if (cur == res.total) $(".next").addClass("dis-next");
                $("#cur").html(cur);
            }
        });

    }
    /* 对话练习 */
    function diaglogue(obj, res) {
        var str = tmpl.diaglogue({
            res: res,
            domain1: domain1
        });
        obj.html(str);
        $(".ft").hide();
        $(".listen").click(function() {
            setListen(aiPanel, $(this));
        });
        $(".read").click(function() {
            setReadRecord(aiPanel, $(this), 'd');
        });
        $(".allPlay").click(function() {
            var liArray = $(this).parents(".allDiag").find(".diaglogue ol li .listen");
            var diag = [];
            for (var i = 0; i < liArray.length; i++) {
                var liObj = liArray.eq(i);
                diag.push(liObj.attr("media-audio"));
            }
            setAutoPlayList($(this).parents(".allDiag").find(".diaglogue ol li"), diag, liArray.length);
        });
    }

    /* 句子 */
    function sentence(obj, res) {
        var str = tmpl.setence({
            res: res,
            domain1: domain1
        });
        obj.html(str);
        $(".ft").hide();
        $(".listen").click(function() {
            setListen(aiPanel, $(this));
        });
        $(".read").click(function() {
            setReadRecord(aiPanel, $(this), 'd');
        });
        $(".allPlay").click(function() {
            var liArray = $(this).parents(".allDiag").find(".diaglogue ol li .listen");
            var diag = [];
            for (var i = 0; i < liArray.length; i++) {
                var liObj = liArray.eq(i);
                diag.push(liObj.attr("media-audio"));
            }
            setAutoPlayList($(this).parents(".allDiag").find(".diaglogue ol li"), diag, liArray.length);
        });
    }
    /* 单词本 */
    function note(obj, res) {
        var str = tmpl.note({
            res: res,
            domain1: domain1,
            domain:domain
        });
        obj.html(str);
        $(".prev").click(function() {
            if (cur != 1) {
                cur--;
                $(".next").removeClass("dis-next");
                $(".trans-content").hide();
                $(".trans-content").eq(cur - 1).show();
                if (cur == 1) $(".prev").addClass("dis-prev");
                $("#cur").html(cur);
            }
        });
        $(".next").click(function() {
            if (cur != res.total) {
                cur++;
                $(".prev").removeClass("dis-prev");
                $(".trans-content").hide();
                $(".trans-content").eq(cur - 1).show();
                if (cur == res.total) {
                    $(".next").addClass("dis-next");
                    if (tabStatus.dc == 0) {
                        tabStatus.dc=1;
                        addEflActlog(1);
                    }
                }
                $("#cur").html(cur);
            }
        });
        $(".ft").hide();
        $(".listen").click(function() {
            setListen(aiPanel, $(this));
        });
        $(".read").click(function() {
            setReadRecord(aiPanel, $(this), 'w');
        });
        $("#hideTip,.u-btn").click(function(){
            $(".m-tips").hide();
        });
        $(".add").click(function() {
            var i_word = {};
            i_word.content = $(this).attr("add_content");
            i_word.pre_id = $(this).attr("add_preid");
            i_word.course_id = $(this).attr("add_courseid");
            i_word.type = 1;
            var index = $(this);
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/ajax/addNewWord",
                data: i_word,
                success: function(res) {
                    if (res.status != 1) {
                        alert(res.info);
                    } else {
                        index.css("background-position", "-116px -74px");
                    }
                }
            });
        });
    }
    //上一页事件绑定
    function prePageEvent() {
        $(".first").on("click", function() {
            $("#firstPageDialog").show();
        });

        $("#firstPageDialog #confirm").off().click(function() {
            $("#firstPageDialog").hide();
            blindHear = [];
            nextUnbind();
            $(".ft").hide();
            if (followReadTimer) {
                clearTimeout(followReadTimer);
            }
            page = 0;
            $.ajax({
                url: "/ApiEfl/getpreclass?course=" + course + "&page=" + 0 + "",
                dataType: "json",
                success: function(res) {
                    $(".loading-pic").hide();
                    $(".sub-class").removeClass("picTalk");
                    apiInfoChoice(res).done(function() {
                        startTime = new Date().getTime();
                        word_idNew = res.id ? res.id : 0;
                        model = res.type;
                        pageMode = res.num;
                        is_end = res.is_end ? res.is_end : 0;
                        $(".first-page").hide();
                        setScore(page, res.total);
                        actCourse();
                        if (is_beta == 1) {
                            floatDialog(res);
                        } else if (res.type == 1 || res.type == 5 || res.type == 7) {
                            $(".ft").hide();
                        } else {
                            $(".ft").show();
                        }
                    });

                },
                error: function() {
                    $(".error-pic").show();
                    $("#err-fresh").click(function() {
                        $("#start_stu").trigger("click");
                    });
                }
            });

        });
        $("#firstPageDialog #cancel").off().click(function() {
            $("#firstPageDialog").hide();
        });
    }

  //判断是否显示评分引导层
  function showScoreGuide(score){
    if(score==0 || score>0 ){
      recordsArr.push(score);
    }
     
    if(recordsArr.length==1 && recordFirst==0 && model_tag.indexOf("8")>-1){
       setTimeout(function(){
          scoreGuide();
          recordFirst=1;
       },500);
        
    }else if(recordsArr.length==4 && model_tag.indexOf("8")>-1){
        setTimeout(function(){
          scoreGuide();
       },200);
    }
  }

   //评分引导
   function  scoreGuide(){
        var startTime = new Date().getTime();
        $("#scoreGuide").show();
         $("#scoreGuide .close").off().on("click",function(){
              $("#scoreGuide").hide();
             
              if( $("#scoreGuide input:checked").length>0){
                var endTime = new Date().getTime();
                var staytime = endTime-startTime;
               console.log("-------------------------");
                  guide(staytime,8).done(function(){
                    model_tag = model_tag.replace("8","");
                    console.log(model_tag);
                  });
              }
         });
   }

    //记录完成率
    function addEflActlog(model) {
        $.ajax({
            url: "/ApiEfl/addEflActlog",
            type: "post",
            data: {
                course_id: course,
                is_pre: 1,
                type: 1,
                model: model
            },
            success: function(res) {}
        });
    }

    //弹出层引导，单词引导，跟读引导

    function guide(staytime,model){
         return $.ajax({
                url: "/ApiEfl/addPreClassLog?act=notice",
                type: "post",
                data: {
                    model: model,
                    stay_time: staytime
                }
            });
    } 

    /*-----------------------------首页加载---------------------------------*/
    $(document).ready(function() {

        function closeNotice(){
            if($(".greay-dialog:visible").length>0){
                    var eles = $(".greay-dialog:visible");
                    var length = $(".greay-dialog:visible").length;
                    var ele = eles.eq(length-1);
                    var nid = ele.find(".close").data('nid');
                    $.ajax({
                        url: "/ApiEfl/addPreClassLog?act=notice",
                        type: "post",
                        data: {
                            nid: nid,
                            stay_time: 0,
                            status:0
                        },
                        success: function() {
                        }
                    });
            }
        }

        if($(".greay-dialog").length>0){
            var eles = $(".greay-dialog");
            var length = $(".greay-dialog").length;
            var ele = eles.eq(length-1);
            var nid = ele.find(".close").data('nid');
            $.ajax({
                url: "/ApiEfl/addPreClassLog?act=notice",
                type: "post",
                data: {
                    nid: nid,
                    stay_time: 0,
                    status:0
                },
                success: function() {
                }
            });
            $(".greay-dialog .linka").click(function(){
                var ele = $(this).parent().parent().find(".close");
                var noticeEndTime = new Date().getTime();
                var stay_time = noticeEndTime - noticStartTime;
                if (stay_time / 1000 > 30) {
                    stay_time = 30000;
                }
                $.ajax({
                    url: "/ApiEfl/addPreClassLog?act=notice",
                    type: "post",
                    data: {
                        nid: nid,
                        stay_time: stay_time,
                        status:1
                    },
                    success: function() {
                    }
                });
                $(this).parent().parent().hide();
                closeNotice();
            });

        }

        $(".greay-dialog .close").click(function() {
            $(this).parent().parent().parent().hide();
            var nid = $(this).data("nid");
            var noticeEndTime = new Date().getTime();
            if ($(".greay-dialog:visible").length == 0 && $(".whiteBg:visible").length == 0) {
                setData(aiPanel, $(".bom i"), "bomLink");
            }

            var stay_time = noticeEndTime - noticStartTime;
            if (stay_time / 1000 > 30) {
                stay_time = 30000;
            }
            $.ajax({
                url: "/ApiEfl/addPreClassLog?act=notice",
                type: "post",
                data: {
                    nid: nid,
                    stay_time: stay_time,
                    status:2
                },
                success: function() {
                    /*if($(".greay-dialog:visible").length==0){
                       setData(aiPanel, $(".bom i"), "bomLink");
                    }*/
                }
            });

             closeNotice();

        });
        setTimeout(function() {
            $(".cov-btn").css("background", "#fa7f00");
            if ($(".greay-dialog").length == 0 && $(".whiteBg").length == 0) {
                setData(aiPanel, $(".bom i"), "bomLink");
            }
            $("#start_stu").click(function() {
                aiPanel.setData({
                    audioUrl: ""
                });
                Init($(".wt-main")).done(function() {
                    $(".error-pic").hide();
                    $(".loading-pic").show();
                    survey().done(function() {
                        $.ajax({
                            url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page + "",
                            dataType: "json",
                            success: function(res) {
                                $(".loading-pic").hide();
                                apiInfoChoice(res).done(function() {
                                    var total = res.total ? res.total : 0;
                                    startTime = new Date().getTime();
                                    word_idNew = res.id ? res.id : 0;
                                    model = res.type;
                                    pageMode = res.num;
                                    setScore(page, total);
                                    actCourse();
                                    if (page > 0) {
                                        $(".first-page").show();
                                    }
                                    prePageEvent();

                                    if (res.type == 5 || res.type == 1 || res.type == 7 || res.type == 25) {
                                        $(".ft").hide();
                                    } else {
                                        $(".ft").show();
                                    }
                                    if (is_beta == 1 && (res.type == 10 || res.type == 9)) {
                                        floatDialog(res);

                                    } else {
                                        $(".user-tip").hide();
                                    }
                                });
                            },
                            error: function() {
                                $(".error-pic").show();
                                $("#err-fresh").click(function() {
                                    $("#start_stu").trigger("click");
                                });
                            }
                        });
                    });
                });
            });

            if (beta_tag == 0) {
                $("#beta-dialog").show();
                $("#beta-dialog .active").click(function() {
                    //$("#start_stu").trigger("click");
                    $("#beta-dialog").hide();
                    $.ajax({
                        url: "/ApiEfl/addPreClassLog?act=info",
                        type: "post",
                        data: {
                            key: 'v2',
                            val: "y"
                        }
                    });
                    is_beta = 1;
                    if ($(".greay-dialog:visible").length == 0 && $(".whiteBg:visible").length == 0) {
                        setData(aiPanel, $(".bom i"), "bomLink");
                    }
                    $("#container").show();
                });
                $("#beta-dialog .hover").click(function() {
                    $("#beta-dialog").hide();
                    $.ajax({
                        url: "/ApiEfl/addPreClassLog?act=info",
                        type: "post",
                        data: {
                            key: 'v2',
                            val: "n"
                        },
                        success: function() {
                            location.href = "/efl/preview/" + course;
                        }
                    });
                });
            } else {
                $("#container").show();
                 setData(aiPanel, $(".bom i"), "bomLink");
            }
            $(".cover").click(function() {
                setData(aiPanel, $(".bom i"), "bomLink");
            });
        }, 2000);
    });
    /*-----------------------------加载处理---------------------------------*/
    /**
     * 1:
     * 2: AB 对话二选一
     * 3: ABA 对话
     * 4: soundPic 听声音选图片
     * 5: wordCard 单词卡
     * 6: picRead 跟读 39
     * 7: picTalk 看图说话 51
     * 8: picSound 看图选声音 63
     * 9: scorePage 分数页
     */
    function apiInfoChoice(data) {
        switch (data.type) {
            case 9:
                return AB($(".sub-class"), data);
                break;
            case 10:
                return ABA($(".sub-class"), data);
                break;
            case 11:
                return soundPic($(".sub-class"), data);
                break;
            case 12:
                return wordCard($(".sub-class"), data);
                break;
            case 13:
                return picRead($(".sub-class"), data);
                break;
            case 14:
                return picTalk($(".sub-class"), data);
                break;
            case 8:
                return picSound($(".sub-class"), data);
                break;
            case 25:
                return scorePage(data);
                break;
            case 1:
                return blindStart(data);
                break;
            case 5:
                return blindProcess(data);
                break;
            case 7:
                return blindResult(data);
            default:
                return;
        }
    }
});
