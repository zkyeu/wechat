/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-01-20 11:10:00
 * @version 1.0.0
 */
define("class", ["lodash", "tmpl"], function(require, exports, module) {
    var tmpl = require('tmpl');
    require("bx_alert");

    //必学模块功能
    var cookieUtil = require('cookie');
    var bx_common = require('bx_common');
    var bx_drag = require('bx_drag');

    var staticPath = 'http://static.51talk.com/static';
    var fightPlayerLoad = 0;
    var autoNextTimer = null;
    //必学模块功能
    window.tipPlayer=null;
    var domain2 = document.domain;
    var cookie = require("cookie");
    var dataIndex = -1; //播放区分标志
    var page = param_json.page; //页码
    var course = param_json.courseid || 0;
    var domain = "http://static.51talk.com/upload/";
    var domain3 = "http://static.51talk.com/";
    var domain1 = "http://static.51talk.com/upload/efl_audio/prepar/"; //移植就版本文件信息
    var tag = param_json.tag;
    var recordTime = 0;
    var is_guide = param_json.coursetag;
    var cur = 1;
    var jumpFlag = 0;
    var beta_tag = 1; //param_json.betatag; //0 显示选内测版弹出框 显示选项卡(弹窗 使用体验版、原版)使用
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
    var talk_id = 1;
    var coverTimer = null;
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
        m_page = 0, //模块参数 （内容数据中有） m_page
        trynumObj = {},
        raise = 0, //重新学习 标示（结果页重新学习记录）
        is_end = 0, //模块最后一项
        raise_status = 0; //标识是否来自于最后一页
    var blindTotal = param_json.wordsnum;
    var blindHear = [];
    var appoint_id = param_json.appointid; //js参数初始化接口）
    var isStartSkip = 0;
    var record = ""; //驰声返回地址
    var startTimer = null;
    var followReadTimer = null;
    var noticStartTime = new Date().getTime();
    var pageNumber = 0;
    var recordFirst = 0; //是否为第一次成绩带有评分非0时，不会在第一次评分成绩显示弹出框，只有4次的时候才会有弹出框
    var recordsArr = []; //评分成绩次数
    var tabStatus = {
        dh: 0, //对话
        dc: 0, //单词
        yf: 0, //语法
        jz: 0, //句子
        zj: 0
    };
    var model_tag = (param_json.modeltag ? param_json.modeltag : "").replace(/,/g, "");
    var xinaoFlage = null;
    //var model_tag= "5678";
    var bx_isover = 0; //必学词汇是否学完
    var teacher_img = "/static/images/html/class_2017/teacher_icon.jpg";

    /*-----------------------------驰声插件---------------------------------*/
    $(function() {
       /* window.aiPanel = new chivox.AiPanel({
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onBeforeReplay: function() {
                $("#replay").removeClass().addClass('stoping');
            },
            onAfterReplay: function() {
                $("#replay").removeClass().addClass('down');
                $(".btn-play").removeClass("active");
            },
            onConnectorStatusChange: function(code, message) {
                //连接器状态发生改变时回调
                //code值有：50100, 50103, 50104, 50109
                //alert(code);
            }
        });
        aiPanel.Dialog.close();*/
    });
   /* $("#recorder").css({"width":"1px","height":"1px"});
          $("#player").css({"width":"1px","height":"1px"});*/
    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     */
    function setData(aiPanel, obj, toggleClass) {
        var defferd = new $.Deferred();
        aiPanel.setData({
            audioUrl: obj.attr("media-audio"),
            serverParams: {
                coreType: "en.sent.score",
                refText: "hello limei"
            }
        });

        aiPanel.params.onBeforePlay = function(res) {

        }

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
                    if ((model_tag.indexOf("6") > -1)) {
                        $(".compare-box").show();
                        $(".compare-box .u-btn").off().on("click", function() {
                            var endTime = new Date().getTime();
                            var staytime = endTime - startTime;
                            guide(staytime, 6).done(function() {
                                model_tag = model_tag.replace("6", "");
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
            audioUrl: domain3 + "/static/js/html/project/class_20150824/yes.mp3"
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
            audioUrl: domain3 + "/static/js/html/project/class_20150824/no.mp3"
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
    }

    /**
     * @aiPanel 驰声音频对象
     * @obj 数据操作节点
     * @toggleClass 操作样式
     * @word_id 需要记录的id
     */
    function setRecord(aiPanel, obj, toggleClass, word_id, type, title) {

        $(".score-result").html("").addClass("hide");
        var coreType = "en.word.score";
        if (title.split(" ").length > 1) {
            coreType = "en.sent.score";
        }

        aiPanel.setData({
            audioUrl: "/upload/pre_record/565183/a_customer__818.mp3",
            serverParams: {
                coreType: coreType,
                refText: title,
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
            duration: 600 * title.split(" ").length + 2000
        });

        aiPanel.params.onBeforeReplay = function() {

        }
        aiPanel.params.onAfterReplay = function() {
            $(".btn-play").removeClass('active');
        }
        aiPanel.params.onBeforeRecord = function(data) {
            $(".error_warn").hide();
        }
        aiPanel.params.onScore = function(data) {
            record = data.audioUrl;
            var resultObj = new chivox.EnSentScore(data);
            var sent = "";
            var realScore = resultObj.getOverall();
            var scoreAll = resultObj.getOverall();

            showScore(scoreAll, data);
        };

        aiPanel.params.onAfterRecord = function(data) {
            $(".btn-record").removeClass("active");
            $(".btn-play").removeClass("disabled");
        };

        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            if (errorType == 40092) {
                $(".d-tip").html("没有在限时内读完 T_T</br>建议读快一点试试。").show();
            } else {
                $(".d-tip").html("评分失败 T_T</br>请检查网络，或者重启浏览器。").show();
            }
        }
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
        };

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
            if (scoreAll > 60) {
                $(".munBer").html(scoreAll);
            } else {
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
            $("#replay").attr('media-audio', 'http://' + record + '.mp3');
            $("#replay").addClass("down").removeClass("stop");
            //logRecordData(word_id, course, 6, resultObj.getOverall());
        };

        aiPanel.params.onBeforeReplay = function() {
            $("#replay").removeClass().addClass('stop');
        };

        aiPanel.params.onAfterReplay = function() {
            $("#replay").removeClass().addClass('down');
        };

        aiPanel.params.onAfterRecord = function(data) {
            obj.removeClass(toggleClass);
            obj.removeClass("off2");
            obj.addClass("off");
            obj.attr("isrecord", "false");

        };

        aiPanel.params.onScoreError = function(errorType) {
            //评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            //alert(errorObj.feedback);
            $(".munBer").attr("style", "width: 40px; height: 40px; line-height: 40px; color: rgb(255, 255, 255); text-align: center; position: absolute; bottom: -10px;top:-81px; right: -175px; display: block;background:url(/static/images/html/class_20150824/result.png) no-repeat; background-position: 0px -38px;");
            $(".munBer").html("0");
            if (errorType == 41031) {
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
            if (scoreAll > 60) {
                $(".munBer").html(scoreAll);
            } else {
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
            $("#replay").attr('media-audio', 'http://' + record + '.mp3');
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
            /*$(".munBer").html("0");
            $(".munBer").show();*/
            if (errorType == 41031) {
                $(".error_warn").html("当前用户访问过多，请稍后再试");
            }
            $(".error_warn").show();
        };
        obj.toggleClass(toggleClass);
        $("#aiPanel .record").click(); //播放触发
    }

    //控制动画
    function testAnim(x, index) {
        setTimeout(function() {
            $('.wordhover').eq(index).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass().addClass("wordhover");
            });
        }, 800);
    };

    //添加日志
    function Scorelog(obj, resultObj, ele) {
        $.post('/ApiEfl/addScorelog', {
            course_id: course,
            type: model,
            model: model,
            'word_id': ele.attr('word_id'),
            record: record,
            mark: scoreVal,
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
        if (type == "d") {
            model = 21;
        } else {
            model = 22;
        }
        var title = obj.data("title");
        var coreType = "en.sent.score";
        if (title.split(" ").length == 1) {
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
        } else if (title.split(" ").length >= 20) {
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
    function setAutoPlayList(obj, data, total,checkedEle,data2) {
        var tmpArr = data;
        var tmpData = data2.concat();
        obj.find("p").removeClass("arrow");
        obj.eq(total - tmpArr.length).find("p").addClass("arrow");
        aiPanel.setData({
            audioUrl: tmpArr.shift()
        });
        aiPanel.params.onBeforePlay=function(){
            
        }
        aiPanel.params.onAfterPlay = function() {
            var checked =  checkedEle.hasClass("checked");
            if (tmpArr.length>0) {
                setAutoPlayList(obj, tmpArr, total,checkedEle,data2);
            }else if(tmpArr.length == 0 && checked){
                setAutoPlayList(obj, tmpData, total,checkedEle,data2);
            }
        };
        $("#aiPanel .play").click(); //播放触发    
    }

    /*-----------------------------事件注册---------------------------------*/



    /* 下一页清除 */
    function nextUnbind() {
        //清除下一页点击事件
        requestStart = 0;
        requestEnd = 0;
        stay_time = 0, word_idNew = 0, skip = 0, try_num = 0, ref_time = 0, scoreVal = 0, model = 0, trynumObj = {}, is_end = 0, record = "", recordsArr = [];

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

    //上一页事件绑定
    function preBind() {
        $("#j_page_prev").unbind().click(function() {
            if ($(this).hasClass('disabled')) {
                bx_common.playAudio2(tipPlayer, $('#j_audio_disabled').attr("media-audio"), function() {

                }, function() {

                });
                return;
            }
            clearTimeout(autoNextTimer);
            page--;
            aiPanel.setData({
                audioUrl: ""
            });
            bxLoad();
        });
    }
    //跳到首页
    function backFirst() {
        page = 0;
        aiPanel.setData({
            audioUrl: ""
        });
        bxLoad();
    }

    //自动跳转
    function autoNext() {
        clearTimeout(autoNextTimer);
        page++;
        aiPanel.setData({
            audioUrl: ""
        });
        bxLoad();
    }

    /* 下一页事件绑定 */
    function nextBind() {
        $("#j_page_next").unbind().bind('click', function() {
            if ($(this).hasClass('disabled')) {
                bx_common.playAudio2(tipPlayer, $('#j_audio_disabled').attr("media-audio"), function() {

                }, function() {

                });
                return;
            }

            clearTimeout(autoNextTimer);
            page++;
            aiPanel.setData({
                audioUrl: ""
            });
            bxLoad();
        });
    }

    /* 跳页事件绑定 */
    function jumpBind(bd, cancel_msg, confirm_msg, cancelBack, confirmBack) {
        $("#j_page_next").unbind().click(function() {
            if ($(this).hasClass('disabled')) {
                return;
            }
            if (jumpFlag == 1 || $('#j_result_box').attr("data-flag") == 1) {
                page++;
                aiPanel.setData({
                    audioUrl: ""
                });
                bxLoad();
            } else {
                $.alert(bd, cancel_msg, confirm_msg, cancelBack, confirmBack);
            }
        });
    }

    /* 跟读/图说 */
    function readFollow(type) {
        //声音播放
        $("#classOn .icon").click(function() {
            $(".icon").removeClass("classLink");
            if (!$("#replay").hasClass('stop')) {
                $("#replay").removeClass().addClass('down');
            }
            setData(aiPanel, $(this), "classLink");
            $(".off").removeClass('offLink').attr("isrecord", "false");
        });
        $("#realReadTalk").unbind("click");
        $("#classOn img").click(function() {
            $(this).siblings(".icon").trigger("click");
            $(".off").removeClass('offLink').attr("isrecord", "false");
            if (!$("#replay").hasClass('stop')) {
                $("#replay").removeClass().addClass('down');
            }
        });
        $("#replay").off().on("click", function() {
            $(".off").removeClass("offLink").attr("isrecord", 'false');
            $(".icon").removeClass("classLink");
            if ($(this).hasClass('stoping') && !$("#replay").attr('media-audio')) {
                $(this).removeClass('stoping').addClass('down');
                $('#aiPanel .replay').click();
                return;
            }
            if ($("#replay").attr('media-audio')) {
                if ($(this).hasClass('stoping')) {
                    $('#aiPanel .play').click();
                    $(this).removeClass('stoping').addClass('down');
                    return;
                }
                setData(aiPanel, $(this), 'stoping');
            } else if (!$(this).hasClass('stop')) {
                $(".replay").click();
            }
        });
        $(".off,.off2").off().click(function() {
            $(".icon").removeClass("classLink");
            cookie.setCookie("tipsFlag", "flase");
            if (!$("#replay").hasClass('stop')) {
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



    /*视频模块*/

    function singleVideo(obj, res) {
        var str = tmpl.singleVideo({
            data: res,
            domain: domain
        });
        obj.html(str);
    }


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

    /*-----------------------------模板填充---------------------------------*/
    /* 开始学习初始化 */
    function Init() {
        var defferd = new $.Deferred;
        initfirstPage($(".wt-main"), defferd);
        return defferd;
    }



    //初始化模板板页面

    function initfirstPage(obj, defferd) {
       
        obj.html(tmpl.init({
            help: "帮 助",
            nick_name: nick_name,
            student_num: student_num1,
            data: param_json.tablist,
            count: param_json.tablist.length,
            staticPath: staticPath,
            courseid:course
        }));

        $(".nav-tab li").click(function() {
            //闭免音效重复
            aiPanel.recorder.stopReplay();
            aiPanel.recorder.stop();
            coverPlayer.stop();
            fightPlayer.stop();

            aiPanel.player.stop();
            $(".play").removeClass("playOn").addClass("playOff");
            $(".replay").removeClass("replayOn").addClass("replayOff");
            $(".record").removeClass('recordOn').addClass("recordOff");


            dataIndex = -1;
            window.clearTimeout(timeId)
            aiPanel.setData({
                audioUrl: ""
            });
            var index = $(".nav-tab li").index();
            $(this).addClass("on").siblings("li").removeClass("on");
            //1：必学词汇 2：对话练习 3：但那次本 4：语法
            switch ($(this).attr("data-tab")) {
                case "1":
                    bxLoad();
                    break;
                case "2":
                    cur = 1;

                    $("#countDown").hide();
                    runoff();
                    $(".waiting").show();
                    if (startTimer) {
                        clearTimeout(startTimer);
                        $(".count-down2 .count").text(3);
                    }
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=dialogs",
                        dataType: "json",
                        success: function(res) {
                           $(".waiting").hide();
                            diaglogue($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    });
                    if (tabStatus.dh == 0) {
                        //addEflActlog($(this).attr('model'));
                        tabStatus.dh = 1;
                    }

                    break;
                case "5":
                    cur = 1;
                    $("#countDown").hide();
                    runoff();
                     $(".waiting").show();
                    if (startTimer) {
                        clearTimeout(startTimer);
                        $(".count-down2 .count").text(3);
                    }
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=sentence",
                        dataType: "json",
                        success: function(res) {
                            $(".waiting").hide();
                            sentence($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    });
                    if (tabStatus.jz == 0) {
                        //addEflActlog($(this).attr('model'));
                        tabStatus.jz = 1;
                    }
                    break;
                case "6":
                    cur = 1;
                    runoff();
                    $(".waiting").show();
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=video",
                        dataType: "json",
                        success: function(res) {
                            $(".waiting").hide();
                            singleVideo($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    })
                    break;
                case "7":
                    cur = 1;
                    runoff();
                    $(".waiting").show();
                    $(".user-tip,.float-box").hide();
                    $("#countDown").hide();
                    if (startTimer) {
                        clearTimeout(startTimer);
                        $(".count-down2 .count").text(3);
                    }
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=read",
                        dataType: "json",
                        success: function(res) {
                           $(".waiting").hide();
                            diaglogue($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    });
                    if (tabStatus.jz == 0) {
                        // addEflActlog($(this).attr('model'));
                        tabStatus.jz = 1;
                    }

                    break;
                case "3":
                    $("#countDown").hide();
                    runoff();
                    if (startTimer) {
                        clearTimeout(startTimer);
                        $(".count-down2 .count").text(3);
                    }
                    cur = 1;
                    $(".waiting").show();
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=words",
                        dataType: "json",
                        success: function(res) {
                            $(".waiting").hide();
                            note($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    });
                    break;
                case "4":
                    $("#countDown").hide();
                    runoff();
                    if (startTimer) {
                        clearTimeout(startTimer);
                        $(".count-down2 .count").text(3);
                    }
                    cur = 1;
                    $.ajax({
                        url: "/ApiEfl/getPreClassWord?course=" + course + "&type=syntax",
                        dataType: "json",
                        success: function(res) {
                            $(".waiting-pic").hide();
                            grammar($(".sub-class"), res);
                        },
                        error: function() {
                            $("error-pic").show();
                            $(".nav-tab li").eq(index).trigger("click");
                        }
                    });
                    if (tabStatus.yf == 0) {
                        //addEflActlog($(this).attr('model'));
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
         $(".allDiag .checkbox").click(function(){
            $(this).toggleClass("checked");
        });  
        $(".listen").click(function() {
            setListen(aiPanel, $(this));
        });
        $(".read").click(function() {
            setReadRecord(aiPanel, $(this), 'd');
        });
        $(".allPlay").click(function() {
            var liArray = $(this).parents(".allDiag").find(".diaglogue ol li .listen");
            var diag = [];
            var diag2 = [];
            var checkedEle = $(this).next(); 
            for (var i = 0; i < liArray.length; i++) {
                var liObj = liArray.eq(i);
                diag.push(liObj.attr("media-audio"));
                diag2.push(liObj.attr("media-audio"));
            }
            setAutoPlayList($(this).parents(".allDiag").find(".diaglogue ol li"), diag, liArray.length,checkedEle,diag2);
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
            domain: domain
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
                        tabStatus.dc = 1;
                        // addEflActlog(1);
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
        $("#hideTip,.u-btn").click(function() {
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

    //必学词汇加载
    function bxLoad(raiseFlage) {
        $(".waiting").show();
        $.ajax({
            url: "/ApiEfl/getpreclass?course=" + course + "&page=" + page,
            dataType: "json",
            success: function(res) {

                bxInfoChoice(res).done(function() {
                    $(".waiting").hide();
                    //记录页码数据
                    is_end = res.is_end ? res.is_end : 0;
                    m_page = res.num ? res.num : 0;
                    model = res.model;
                    raise = 0;
                    if (raiseFlage) {
                        raise = 1;
                    }
                    addPrePictureLog();
                    //避免音效重复
                    aiPanel.recorder.stopReplay();
                    aiPanel.recorder.stop();
                    aiPanel.player.stop();
                    if(coverPlayer){
                     coverPlayer.stop();
                    }
                    //fightPlayer.stop();
                    if(tipPlayer){
                         tipPlayer.stop();
                    }
                    $(".play").removeClass("playOn").addClass("playOff");
                    $(".replay").removeClass("replayOn").addClass("replayOff");
                    $(".record").removeClass('recordOn').addClass("recordOff");

                    //拼一拼背景音乐控制
                    if (res.model === 21 && fightPlayer) {
                        if (fightPlayer.getPlayerStatus() === 'player.idle') {
                            playFight();
                        }
                    } else if(fightPlayer) {
                        fightPlayer.stop();
                    }

                    //模块功能
                    if (res.model === 7) {
                        jumpFlag = 0;
                        jumpBind('跳过跟读，会影响最终成绩哦，求跟读！', '读', '继续跳过', null, function() {
                            page++;
                            bxLoad();
                        });
                    } else if (res.model === 21) {
                        jumpFlag = 0;
                        jumpBind('跳过拼图，会影响最终成绩哦，求拼图！', '拼！', '继续跳过', null, function() {
                            page++;
                            bxLoad();
                        });
                    } else {
                        nextBind();
                    }
                    preBind();
                });
            },
            error: function(res) {
                console.log(res);
            }
        });
    }

    //封面页加载音频
    function playCover(url, callBack) {
        coverPlayer.load({
            url: url,
            success: function() {
                console.log("player2加载成功2222======");


                coverPlayer.play({
                    onStart: function() {},
                    onStop: function() {
                         callBack().done(function() {
                            clearTimeout(coverTimer);
                             bxLoad();
                         });
                    }
                });
            },
            error: function() {
                console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
            }
        });
    }
    //进入封面页时播放音频
    function playCoverAudio(callBack) {
        var defferd = new $.Deferred();
        //alert(1);

        window.coverPlayer = new chivox.AiPlayer({
            id: "player2",
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onFlashLoad: function(code, message) {
                console.log("player2加载成功======");
                defferd.resolve();
               // playCover($("#j_cover_audio").attr('media-audio'), callBack);
            },
            onError: function(code, message) {
                console.log("flash加载失败！");
            }
        });
        return defferd;
    }
    //拼一拼环节声音
    function playFightAudio() {
        var defferd = new $.Deferred();
        window.fightPlayer = new chivox.AiPlayer({
            id: "fightplayer",
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onFlashLoad: function(code, message) {
                console.log("fightplayer播放器加载成功！");
                defferd.resolve();
            },
            onError: function(code, message) {
                console.log("flash加载失败！");
            }
        });
        return defferd;
    }

    //提示音效
    function playTipAudio() {
        var defferd = new $.Deferred();
        //alert(1111);
        window.tipPlayer = new chivox.AiPlayer({
            id: "tipplayer",
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onFlashLoad: function(code, message) {
                console.log("tipPlayer 加载成功");
                defferd.resolve();
            },
            onError: function(code, message) {
                console.log("tipPlayerh加载失败！");
            }
        });
        return defferd;
    }

    //控制拼一拼背景音乐
    function playFight() {
        //播放音乐
        if (fightPlayerLoad == 1) {
            fightPlayer.play({
                onStart: function() {},
                onStop: function() {
                    playFight();
                }
            });
        } else {
            fightPlayer.load({
                url: $('#j_fight_audio').attr('media-audio'),
                success: function() {
                    fightPlayerLoad = 1;
                    fightPlayer.play({
                        onStart: function() {},
                        onStop: function() {
                            playFight();
                        }
                    });
                },
                error: function() {}
            });
        }
    }

    //页码记录

    function addPrePictureLog() {
        $.ajax({
            url: "/ApiEfl/addPrePictureLog?act=page",
            type: "post",
            data: {
                course_id: course,
                appoint_id: appoint_id,
                page: page,
                m_page: m_page,
                is_end: is_end,
                type: 3,
                stay_time: stay_time,
                raise: raise,
                model:model

            }
        })
    }


    param_json.browV = $.browser.version;

    function checkBroser() {
        var isIeBrowser = $.browser.msie;
        var browserVersion = parseInt($.browser.version, 10);
        if (isIeBrowser && browserVersion < 9) {
            return true;
        }
        return false;
    }

    //统计弹窗，下载记录
    function getBrowerInfo(type) {
        var userInfo = {
            course_id: param_json.courseid,
            browse_v: param_json.browV,
            behavior: type
        }
        $.ajax({
            url: param_json.href + '/ApiEfl/addPrePictureLog?act=browser',
            type: 'POST',
            data: userInfo,
            success: function(res) {}
        })
    }

    $('#downChrome').mousedown(function() {
        getBrowerInfo(1);
    })

    /*-----------------------------首页加载---------------------------------*/
    $(document).ready(function() {
        if (checkBroser()) {
            $(".box").html('<div class="box-browser"><h3>无法预习，您的浏览器版本较低！</h3><p>升级到Chrome浏览器，<br/>立即拥有<span>“6分钟，上课效果提升1倍”</span>的神奇体验^O^!</p><a target="_blank" href="http://www.baidu.com/link?url=OfJDTsUi84wmJYP_xn1A-IaiO8kqvSo9We4k659YhqKd0N1giAOAWM6akv2Y7rnbunNlHTeqNvH7NU75o5vATVtET9STivjmwPg0CYxyJ5a" id="downChrome">1分钟升级</div></a>');
            getBrowerInfo(3);
            return;
        }
        //debugger;

        //渲染海报
        var posterHtml = tmpl.poster_list({
            noticelist: param_json.noticelist,
            domain: domain

        });
        $("body").append(posterHtml);

        function closeNotice() {
            if ($(".greay-dialog:visible").length > 0) {
                var eles = $(".greay-dialog:visible");
                var length = $(".greay-dialog:visible").length;
                var ele = eles.eq(length - 1);
                var nid = ele.find(".close").data('nid');
                $.ajax({
                    url: "/ApiEfl/addPreClassLog?act=notice",
                    type: "post",
                    data: {
                        nid: nid,
                        stay_time: 0,
                        status: 0
                    },
                    success: function() {}
                });
            }
        }

        if ($(".greay-dialog").length > 0) {
            var eles = $(".greay-dialog");
            var length = $(".greay-dialog").length;
            var ele = eles.eq(length - 1);
            var nid = ele.find(".close").data('nid');
            $.ajax({
                url: "/ApiEfl/addPreClassLog?act=notice",
                type: "post",
                data: {
                    nid: nid,
                    stay_time: 0,
                    status: 0
                },
                success: function() {}
            });

            $(".greay-dialog .linka").click(function() {
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
                        status: 1
                    },
                    success: function() {}
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
                playCoverAudio(Init);
                playFightAudio();
                playTipAudio().done(function(){
                    playCover($("#j_cover_audio").attr('media-audio'), Init);
                });
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
                    status: 2
                },
                success: function() {}
            });

            closeNotice();
        });

        if ($(".greay-dialog").length == 0 && $(".whiteBg").length == 0) {

            
            playCoverAudio(Init);
            playFightAudio();
            playTipAudio().done(function(){
                        playCover($("#j_cover_audio").attr('media-audio'), Init);
            });
        }


         window.aiPanel = new chivox.AiPanel({
            appKey: "14350468870000e0",
            secretKey: "55d7229b6ae9332e89596cff1f9ce042",
            onBeforeReplay: function() {
                $("#replay").removeClass().addClass('stoping');
            },
            onAfterReplay: function() {
                $("#replay").removeClass().addClass('down');
                $(".btn-play").removeClass("active");
            },
            onConnectorStatusChange: function(code, message) {
                //连接器状态发生改变时回调
                //code值有：50100, 50103, 50104, 50109
                //alert(code);
            }
        });
        aiPanel.Dialog.close();
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
            case 5:
                return blindProcess(data);
                break;
            case 7:
                return blindResult(data);
            default:
                return;
        }
    }

    /**
     * 必学模块加载
     */

    //猜一猜
    function bx_guess(res) {
        var defferd = new $.Deferred;
        var html = tmpl.bx_guess({
            staticPath: staticPath,
            domain: domain,
            data: res
        });
        $(".sub-class").html(html);

        var pageNextBtn = $('#j_page_next');

        bx_common.playAudio2(coverPlayer, $('#j_audio_link').attr('media-audio'), function() {

        }, function() {
            // pageNextBtn.removeClass('disabled');
            // autoNextTimer = setTimeout(function() {
            //     autoNext();
            // }, 1000);
        });

        defferd.resolve();
        return defferd;
    }

    //单词卡
    function bx_listenread(res) {
        var defferd = new $.Deferred;
        var targetTitle = res.target.title.replace(/\[/g, '<span class="tag"><span class="word">').replace(/\]/g, '</span></span>');
        var html = tmpl.bx_listenread({
            staticPath: staticPath,
            domain: domain,
            data: res,
            targetTitle: targetTitle
        });
        $(".sub-class").html(html);

        var audioBtn = $(".audio-btn");
        var wordPic = $(".word-speak .word-pic");
        var btnListen = $(".btn-listen");
        if(res.title.length<10){
            $(".practice .word").css({"font-size":"72px"});
        }else if(res.title.length>10){
            $(".practice .word").css({"font-size":"50px"});
        }
        //第一个声音播放
        $(".word-speak .word-pic").off().on('click', function() {
            aiPanel.recorder.stop();
            $(".bx-tip-zan,.bx-tip-tzan").addClass("hide");
            $(".replay").removeClass("replayOn").addClass("replayOff");
            aiPanel.recorder.stopReplay();
            $(".active").removeClass('active');
            bx_common.playAudio2(coverPlayer, audioBtn.attr('media-audio'), function() {
                audioBtn.addClass('active');
            }, function() {
                audioBtn.removeClass('active');
                //默认播放
            });
        });

        //第二个声音播放
        $(".word-speak .btn-listen").off().on('click', function() {
            aiPanel.recorder.stopReplay();
            aiPanel.recorder.stop();
            $(".bx-tip-zan,.bx-tip-tzan").addClass("hide");
            $(".replay").removeClass("replayOn").addClass("replayOff");
            $(".record").removeClass('recordOn').addClass("recordOff");
            $(".active").removeClass('active');
            bx_common.playAudio2(coverPlayer, btnListen.attr('media-audio'), function() {
                btnListen.addClass('active');
            }, function() {
                btnListen.removeClass('active');
                //默认播放
            });
        });

        //跟读
        $(".btn-record").off().on("click", function() {
            $(".s-tip-default").addClass("hide");
            coverPlayer.stop();
            $(".score-result").removeClass("great").removeClass("badly").addClass("hide");
            $(".active").removeClass('active');
            $(".d-tip").hide();
            if (!$(".record").hasClass('recordOn')) {
                $(this).addClass('active');
                setRecord(aiPanel, $(this), "active", res.id, res.type, res.title);
            } else {
                $(".record").removeClass('recordOn').addClass("recordOff");
                $(".replay").removeClass("replayDisabled").addClass("replayOff");
                aiPanel.recorder.stop({
                    onStop: function(res) {
                        aiPanel.recorder.getScores({
                            success: function(data) {
                                var keys = _.keys(data);
                                if (keys.length == 0) {
                                    $(".d-tip").html("发音不完整，请再试一次").show();
                                    return;
                                } else {
                                    var key = keys[keys.length - 1];
                                    var resultObj = data[key];
                                    $(".btn-play").removeClass("disabled");
                                    showScore(resultObj.result.overall, resultObj);
                                }
                            }
                        });
                    }
                });
            }
        });

        $(".btn-play").off().on("click", function() {
            coverPlayer.stop();
            if ($(this).hasClass("disabled")) {
                return;
            }
            $(".active").removeClass('active');
            if (!$(".replay").hasClass("replayOn")) {
                $(this).addClass("active");
                aiPanel.recorder.stop();
                $(".record").removeClass('recordOn').addClass("recordOff");
                $(".replay").removeClass("replayDisabled").addClass("replayOff");
                $(".replay").click();
            } else {
                $(".replay").removeClass("replayOn").addClass("replayOff");
                aiPanel.recorder.stopReplay();
                $(this).removeClass("active");
            }
        });

        //默认播放
        setTimeout(function() {
            $(".word-speak .btn-listen").trigger('click');
        }, 500);
    
        defferd.resolve();
        return defferd;
    }

    //拼一拼
    function bx_fight(res) {
        var defferd = new $.Deferred;
        var html = tmpl.bx_fight({
            staticPath: staticPath,
            domain: domain,
            data: res
        });
        $(".sub-class").html(html);

        var pageNextBtn = $('#j_page_next');

        bx_common.playAudio2(coverPlayer, $('#j_audio_link').attr('media-audio'), function() {

        }, function() {
            pageNextBtn.removeClass('disabled');
            // autoNextTimer = setTimeout(function() {
            //     autoNext();
            // }, 1000);
        });

        defferd.resolve();
        return defferd;
    }

    //拼一拼拼图
    function bx_pin(res) {
        var defferd = new $.Deferred;

        var targetTitle = res.target.title.replace(/\[/g, '<span class="tag">').replace(/\]/g, '</span>');
        var html = tmpl.bx_pin({
            staticPath: staticPath,
            domain: domain,
            data: res,
            targetTitle: targetTitle
        });
        $(".sub-class").html(html);

        var j_audio_word = $('#j_audio_word');

        //提示拖动
        setTimeout(function() {
            if ($('#j_result_box .r-item[data-select]').length == 0) {
                $('#j_tip_drag').removeClass('hide');
            } else {
                $('#j_tip_drag').addClass('hide');
                jumpFlag = 1;
            }
        }, 5000);

        //拖动
        document.addEventListener('selectstart', bx_drag.selectstart, false);
        document.addEventListener('dragstart', bx_drag.start, false);
        document.addEventListener('dragenter', bx_drag.enter, false);
        document.addEventListener('dragover', bx_drag.over, false);
        document.addEventListener('drop', bx_drag.drop, false);
        document.addEventListener('dragend', bx_drag.end, false);

        //声音播放
        $("#j_result_box").on('click', '.audio-btn', function(e, params) {

            var that = $(this);
            bx_common.playAudio2(coverPlayer, that.attr('media-audio'), function() {
                that.addClass("active");
            }, function() {
                that.removeClass('active');
                // if (params.correct === 'ok') {
                //     jumpFlag = 1;
                // }
            });
        });

        //默认播放单词
        setTimeout(function() {
            j_audio_word.trigger('click');
        }, 500);
        
        defferd.resolve();
        return defferd;
    }

    //盲听声音
    function bx_blind_listen(res) {
        var defferd = new $.Deferred;
        var html = tmpl.bx_blind_listen({
            staticPath: staticPath,
            domain: domain,
            data: res
        });
        $(".sub-class").html(html);

        //挑战升级
        setTimeout(function(){
            if (res.upgrade && res.upgrade === 1) {

                bx_common.playAudio(coverPlayer, '#j_tip_upgrade', function() {
                    $('#j_tip_upgrade').removeClass("hide");
                }, function() {
                    $('#j_tip_upgrade').addClass("hide");
                    //默认播放
                    bx_common.playAudio(coverPlayer, '#j_monster', function() {
                        $("#j_talk_gif").removeClass("hide");
                    }, function() {
                        $("#j_talk_gif").addClass("hide");
                        $('#j_page_next').removeClass('disabled');
                        autoNextTimer = setTimeout(function() {
                            autoNext();
                        }, 1000);
                    });
                });
            } else {
                //默认播放
                bx_common.playAudio(coverPlayer, '#j_monster', function() {
                    $("#j_talk_gif").removeClass("hide");
                }, function() {
                    $("#j_talk_gif").addClass("hide");
                    $('#j_page_next').removeClass('disabled');
                    autoNextTimer = setTimeout(function() {
                        autoNext();
                    }, 1000);
                });
            }
        }, 500);

        //绑定事件
        $("#j_blind").on('click', '#j_monster', function() {
            clearTimeout(autoNextTimer);
            bx_common.playAudio(coverPlayer, '#j_monster', function() {
                $("#j_talk_gif").removeClass("hide");
            }, function() {
                $("#j_talk_gif").addClass("hide");
                $('#j_page_next').removeClass('disabled');
                autoNextTimer = setTimeout(function() {
                    autoNext();
                }, 1000);
            });
        });

        defferd.resolve();
        return defferd;
    }

    //盲听词（单图）
    function bx_blind_single(res) {
        var defferd = new $.Deferred;

        var wordHtml = res.target.title.replace(/\[/g, '<span id="j_monster" class="tag" media-audio="' + domain + res.record + '"><span class="word hide">').replace(/\]/g, '</span><img class="t-cover" src="' + staticPath + '/images/html/class_2017/monster/' + res.monster + '-monster_small.png" media-blow="' + staticPath + '/images/html/class_2017/audio/blow.mp3"/><i class="talk-gif hide"></i></span>')

        var html = tmpl.bx_blind_single({
            staticPath: staticPath,
            domain: domain,
            data: res,
            word: wordHtml,
            tipCheats: cookieUtil.getCookie("tip-cheats")
        });
        $(".sub-class").html(html);

        var monster = $('#j_monster');
        var audioBtn1 = $('#j_audio_1');
        var j_target = $('#j_target');
        var monsterCover = $('#j_monster .t-cover');
        var guessBtn = $('#j_page_guess');
        var cix = j_target.attr("data-cix");
        var audioFlag = 0;
        //事件
        $('.sub-class').on('click', '#j_target', function() {
            if (audioFlag === 0) {
                audioFlag = 1;
                var that = $(this);

                bx_common.playAudio2(coverPlayer, audioBtn1.attr('media-audio'), function() {
                    audioBtn1.addClass("active");
                }, function() {
                    audioBtn1.removeClass("active");
                    audioFlag = 0;
                    //猜一猜按钮可点击
                    setTimeout(function() {
                        guessBtn.removeClass("disabled");
                    }, 1000);
                });
            }
        });

        $('.sub-class').on('click', '#j_monster .t-cover', function(e) {
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, monster.attr('media-audio'), function() {
                    monster.find('.talk-gif').removeClass('hide');
                }, function() {
                    monster.find('.talk-gif').addClass('hide');
                    //猜一猜按钮可点击
                    //guessBtn.removeClass("disabled");
                    audioFlag = 0;
                });
            }
            e.stopPropagation();
        });

        $('.sub-class').on('click', '#j_page_guess', function() {
            if ($(this).hasClass('disabled')) {
                bx_common.playAudio2(tipPlayer, $('#j_audio_disabled').attr("media-audio"), function() {

                }, function() {

                });
                return;
            }

            if (audioFlag === 0) {
                audioFlag = 1;

                //guessBtn.addClass("disabled");

                if (cix == 'chouxd') {
                    //抽象词
                    autoNext();
                } else if (cix == 'jux') {
                    //具像词
                    bx_common.playAudio2(coverPlayer, monster.find('img').attr('media-blow'), function() {
                        monster.find('img').attr('src', staticPath + '/images/html/class_2017/bao1.gif');
                    }, function() {
                        monster.find('.word').removeClass('hide');
                        monster.find('img').remove();
                        monster.find('.talk-gif').remove();
                        //播放目标词声音
                        bx_common.playAudio2(coverPlayer, monster.attr('media-audio'), function() {

                        }, function() {
                            //猜一猜按钮可点击
                            guessBtn.removeClass("disabled");
                            // audioFlag = 0;
                            autoNextTimer = setTimeout(function() {
                                autoNext();
                            }, 1000);
                        });
                    });
                } else {

                }
            }
        });

        // $('.sub-class').on("click", '#j_tip_cheats', function() {
        //     var url = $(this).attr("data-url");
        //     window.open(url);
        // });

        // $('.sub-class').on("click", '#j_tip_cheats .close', function(e) {
        //     cookieUtil.setCookie("tip-cheats", '1');
        //     $(this).parent().remove();
        //     return false;
        // });

        //默认事件处理
        setTimeout(function(){
            j_target.trigger('click');
        }, 500);

        defferd.resolve();
        return defferd;
    }

    //盲听词（双图）
    function bx_blind_double(res) {

        var defferd = new $.Deferred;

        var propHtml = res.prop.title.replace(/\[/g, '<span class="tag"><span class="word">').replace(/\]/g, '</span></span>');
        var targetHtml = res.target.title.replace(/\[/g, '<span class="tag" media-audio="' + domain + res.record + '"><span class="word hide">').replace(/\]/g, '</span><img class="t-cover" src="' + staticPath + '/images/html/class_2017/monster/' + res.monster + '-monster_small.png" media-blow="' + staticPath + '/images/html/class_2017/audio/blow.mp3"/><i class="talk-gif hide"></i></span>');

        var html = tmpl.bx_blind_double({
            staticPath: staticPath,
            domain: domain,
            data: res,
            propTitle: propHtml,
            targetTitle: targetHtml,
            tipCheats: cookieUtil.getCookie("tip-cheats")
        });
        $(".sub-class").html(html);

        var guessBtn = $('#j_page_guess');
        var propAudioBtn = $('#j_audio_1');
        var targetAudioBtn = $('#j_audio_2');
        var j_prop = $('#j_prop');
        var j_target = $('#j_target');
        var j_target_tag = $('#j_target .tag');
        //var monsterCover = $('#j_target .t-cover');
        var cix = j_target.attr("data-cix");
        var audioFlag = 0;

        //事件
        $('.sub-class').on('click', '#j_prop', function() {
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, propAudioBtn.attr('media-audio'), function() {
                    propAudioBtn.addClass("active");
                }, function() {
                    propAudioBtn.removeClass("active");
                    audioFlag = 0;
                    //自动显示目标
                    if (j_target.hasClass('hide')) {
                        setTimeout(function() {
                            j_target.removeClass('hide');
                            setTimeout(function() {
                                j_target.trigger('click');
                            }, 500);
                        }, 1000);
                    }
                });
            }
        });

        $('.sub-class').on('click', '#j_target', function() {
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, targetAudioBtn.attr('media-audio'), function() {
                    targetAudioBtn.addClass("active");
                }, function() {
                    targetAudioBtn.removeClass("active");
                    audioFlag = 0;
                    setTimeout(function() {
                        guessBtn.removeClass("disabled");
                    }, 1000);
                });
            }
        });

        $('.sub-class').on('click', '#j_target .t-cover', function(e) {
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, j_target_tag.attr('media-audio'), function() {
                    j_target_tag.find('.talk-gif').removeClass('hide');
                }, function() {
                    j_target_tag.find('.talk-gif').addClass('hide');
                    //猜一猜按钮可点击
                    //guessBtn.removeClass("disabled");
                    audioFlag = 0;
                });
            }
            e.stopPropagation();
        });

        $('.sub-class').on("click", '#j_page_guess', function() {
            if ($(this).hasClass('disabled')) {
                bx_common.playAudio2(tipPlayer, $('#j_audio_disabled').attr("media-audio"), function() {

                }, function() {

                });
                return;
            }
            //guessBtn.addClass("disabled");

            if (audioFlag === 0) {
                audioFlag = 1;

                if (cix == 'chouxs') {
                    //抽象词
                    autoNext();
                } else if (cix == 'jux') {
                    bx_common.playAudio2(coverPlayer, j_target_tag.find('img.t-cover').attr('media-blow'), function() {
                        j_target_tag.find('img.t-cover').attr('src', staticPath + '/bao1.gif');
                    }, function() {
                        j_target_tag.find('.word').removeClass('hide');
                        j_target_tag.find('img.t-cover').remove();
                        j_target_tag.find('.talk-gif').remove();

                        //播放目标词声音
                        bx_common.playAudio2(coverPlayer, j_target_tag.attr('media-audio'), function() {

                        }, function() {
                            //猜一猜按钮可点击
                            guessBtn.removeClass("disabled");
                            //audioFlag = 0;
                            autoNextTimer = setTimeout(function() {
                                autoNext();
                            }, 1000);
                        });
                    });
                }
            }
        });

        //宝典提示
        $('.sub-class').on("click", '#j_tip_cheats', function() {
            cookieUtil.setCookie("tip-cheats", '2');
            var url = $(this).attr("data-url");
            window.open(url);
        });

        $('.sub-class').on("click", '#j_tip_cheats .close', function(e) {
            cookieUtil.setCookie("tip-cheats", '1');
            $(this).parent().remove();
            return false;
        });

        //默认事件处理
        setTimeout(function(){
            j_prop.trigger('click');
        }, 500);
        
        defferd.resolve();
        return defferd;
    }

    //选择中文
    function bx_select_chinese(res) {
        var defferd = new $.Deferred;
        var html = tmpl.bx_select_chinese({
            staticPath: staticPath,
            domain: domain,
            data: res
        });
        $(".sub-class").html(html);

        var audioFlag = 0;
        var j_monster = $('#j_monster');
        var nextBtn = $('#j_page_next');

        //事件
        $('.sub-class').on('click', '.options .item', function() {
            var audioBtn = $(this);

            var correct = audioBtn.attr('data-correct');
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, audioBtn.attr("media-audio"), function() {
                    audioBtn.addClass("active");
                    if (correct == '1') {
                        $('#j_tip_zan').removeClass('hide');
                    } else {
                        $('#j_tip_wrong').removeClass('hide');
                    }
                }, function() {
                    if (correct == '1') {
                        $('#j_tip_zan').addClass('hide');
                        //爆炸声音
                        bx_common.playAudio2(coverPlayer, j_monster.attr("media-blow"), function() {
                            j_monster.find('img').attr('src', staticPath + '/images/html/class_2017/bao1.gif');
                        }, function() {
                            $('#j_word .letter').removeClass('hide');
                            //播放目标词声音
                            bx_common.playAudio2(coverPlayer, j_monster.attr("media-audio"), function() {

                            }, function() {
                                //下一页按钮可点击
                                nextBtn.removeClass("disabled");
                                //audioFlag = 0;
                                autoNextTimer = setTimeout(function() {
                                    autoNext();
                                }, 1000);
                            });
                        });
                    } else {
                        $('#j_tip_wrong').addClass('hide');
                        audioBtn.removeClass("active");
                        audioFlag = 0;
                    }
                });
            }
        });

        //鼠标滑过
        $('.sub-class').on('mouseover', '.options .item', function() {
            $(this).addClass('hover');
        });

        $('.sub-class').on('mouseout', '.options .item', function() {
            $(this).removeClass('hover');
        });

        //点击怪物
        $('.sub-class').on('click', '#j_monster', function() {
            var audioBtn = $(this);
            if (audioFlag === 0) {
                audioFlag = 1;
                bx_common.playAudio2(coverPlayer, audioBtn.attr("media-audio"), function() {
                    audioBtn.find(".talk-gif").removeClass("hide");
                }, function() {
                    audioBtn.find(".talk-gif").addClass("hide");
                    audioFlag = 0;
                });
            }
        });

        //默认事件处理
        setTimeout(function() {
            j_monster.trigger('click');
        }, 500);
        
        defferd.resolve();
        return defferd;
    }

    //结果页
    function bx_result(res) {
        var defferd = new $.Deferred;
        var html = tmpl.bx_result({
            staticPath: staticPath,
            data: res
        });
        $(".sub-class").html(html);

        bx_common.playAudio(coverPlayer, $("#result-audio"), function() {
            aiPanel.recorder.stop();

        }, function() {

            //默认播放
        });
        $("#studySetence").off().on("click", function() {

            $("[data-tab=5]").trigger('click');
        });
        $("#reStudy").off().on("click", function() {
            page = $(this).attr('begin');

            bxLoad(1);
        });


        defferd.resolve();
        return defferd;
    }

    //流失率统计
    function runoff() {
        if (bx_isover || runoff_tag) {
            return;
        }
        runoffTj(1, 1);
        $("#runoff").show();
        $("#runoff .close").click(function() {
            bx_isover = 1;
            runoff_tag = 1;
            $("#runoff").hide();
            runoffTj(2);

        });
        $("#runoff .btn").click(function() {
            if ($("#runoff textarea").val().length < 2000 && $("#runoff textarea").val().length > 0) {
                $("#runoff").hide();
                bx_isover = 1;
                runoff_tag = 1;
                runoffTj(3, 0, $("#runoff textarea").val());
            } else if ($("#runoff textarea").val().length > 2000) {
                alert("你输入的字符不能超过2000");
            } else {
                alert("输入内容不能为空");
            }
        });
    }

    //成绩展示
    function showScore(score, data) {
        var scoreAll = score,
            realScore = score;
        if (scoreAll == 0 || scoreAll > 1) {
            $(".s-tip-default").addClass("hide");
        }
        if (scoreAll > 30 && scoreAll < 90) {
            scoreAll = 95 - parseInt((90 - scoreAll) / 1.7);

        } else if (scoreAll >= 0 && scoreAll <= 30) {
            $(".d-tip").html("和您真实能力不符，请再试一次").show();
        }

        if (scoreAll >= 70 && scoreAll <= 100) {
            $(".score-result").removeClass('badly').addClass("great").text(scoreAll);
            $(".d-tip").hide();
        } else if (scoreAll >= 60 && scoreAll < 70) {
            $(".score-result").removeClass('great').addClass("badly").text(scoreAll);
            $(".d-tip").hide();
        } else {
            $(".score-result").removeClass('great').removeClass('badly');
        }
        jumpFlag = 1;
        //双赞
        if (scoreAll >= 90 && scoreAll <= 100) {
            $(".bx-tip-tzan").removeClass("hide");
            bx_common.playAudio2(tipPlayer, staticPath + "/images/html/class_2017/audio/perfect.mp3", function() {

            }, function() {
                $(".bx-tip-tzan").addClass("hide");
                //默认播放
            });

        }
        //单赞
        if (scoreAll >= 70 && scoreAll < 90) {
            $(".bx-tip-zan").removeClass("hide");
            bx_common.playAudio2(tipPlayer, staticPath + "/images/html/class_2017/audio/goodjob.mp3", function() {

            }, function() {
                $(".bx-tip-zan").addClass("hide");
                //默认播放
            });
        }

        if ((realScore >= 0 && realScore <= 64) && data.result.info.tipId == 10000) {
            $(".d-tip").html("未录到声音 T_T，请再试一次").show();
        } else if ((realScore >= 0 && realScore <= 64) && (data.result.info.tipId == 10001 || data.result.info.tipId == 10002 || data.result.info.tipId == 10003)) {
            $(".d-tip").html("发音不完整，请再试一次").show();
        } else if ((realScore >= 0 && realScore <= 64) && data.result.info.tipId == 10004) {
            $(".d-tip").html("声音有点小哦!</br>建议大声点或者把麦克风放近点试试。^_^").show();
        } else if ((realScore >= 0 && realScore <= 64) && data.result.info.tipId == 10005) {
            $(".d-tip").html("声音有点大哦!</br>建议小声点或者把麦克风放远点试试。^_^").show();
        } else if ((realScore >= 0 && realScore <= 64) && data.result.info.tipId == 10006) {
            $(".d-tip").html("有杂音，听不清</br>建议在安静的环境朗读，或者更换麦克风。").show();
        }

        if ((realScore >= 0 && realScore <= 30) && data.result.info.tipId == 0) {
            $(".d-tip").html("和您真实能力不符，请再试一次").show();
        }

    }

    //必学词汇流失率统计
    function runoffTj(status, isaccess, remark) {
        var postdata = {
            'course_id': course,
            'status': status
        }
        if (isaccess) {
            postdata['model'] = model;
            postdata['page'] = m_page;
        }
        if (remark) {
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


    /**
     * 1:
     * 2: 
     * 3: 
     * 4: 
     */
    function bxInfoChoice(data) {
        switch (data.model) {
            case 2:
                return bx_guess(data);
                break;
            case 5:
                //盲听声音
                return bx_blind_listen(data);
                break;
            case 6:
                //盲听词（单图）
                return bx_blind_single(data);
                break;
            case 7:
                //单词卡
                return bx_listenread(data);
                break;
            case 8:
                //中文选项
                return bx_select_chinese(data);
                break;
            case 9:
                //盲听词（双图）
                return bx_blind_double(data);
                break;
            case 20:
                //拼一拼首页
                return bx_fight(data);
                break;
            case 21:
                //拼一拼
                return bx_pin(data);
                break;
            case 30:
                //节果页
                return bx_result(data);
                break;
            default:
                return;
        }
    }
});