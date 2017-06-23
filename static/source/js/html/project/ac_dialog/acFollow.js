define("acFollow",["utility"],function(require,exports,module){
	var utility = require("utility");
$(function(){

    ;(function(){
        // 倒计时
        var timmer = $(".timmer-wrap");
        timmer.countDown({
            targetFn : function(){
                timmer.hide();
            },
            isFormat : false
        });
    })();

    // 绑定回播事件
    $(".replay-c").click(function(){
        $(".replay").trigger("click");
    });

    // 模板
    var getHTML = function(t){
        var html = ["再读一遍","听到“叮”声后开始朗读"];
        return '<p>'+ html[t] +'<i class="arr-o"><i class="arr-i"></i></i></p>';
    }
    // 对比句子
    window.commentFn = (function(){
        var wait = $(".follow-comments .commenting");
        return {
            wait : function(){
                wait.show();
            },
            good : function(){
                wait.hide().siblings(".commentg").fadeIn();
            },
            bad : function(){
                wait.hide().siblings(".commentb").fadeIn();
            },
            reset : function(){
                wait.siblings().hide();
            }
        }
    })();

    window.aiPanel = new chivox.AiPanel({
        appKey: "14350468870000e0",
        secretKey: "55d7229b6ae9332e89596cff1f9ce042",
        data: {
            audioUrl: sourceConfig.audioUrl||"",
            // duration: 10000, //传入参数手动设置录音时长
            serverParams: {//录音服务参数
                // 单词 en.word.score
                // 句子 en.sent.score
                coreType: "en.sent.score",
                refText: sourceConfig.refText||"",
                rank: 100,
                userId: "guest",
                // 是否返回音频url
                attachAudioUrl:1
            }
        },
        onBeforePlay:function(el){
            // 录音叮声后
            $(".pr-wrap .rr-wrap").addClass("type2").html(getHTML(1)).show();

            // 隐藏再读一遍
            // $(".pr-wrap .rr-wrap").hide();
            // 隐藏听我读
            $(".fl-wrap").hide();
            // 重设评分状态
            commentFn.reset();
        },
        onAfterPlay:function(){
            // 切到录音样式
            $(".pr-wrap").addClass("is-record");
            $(".pr-wrap .rr-wrap").hide();
            // 检测是否可以录音
            var timmer = window.setInterval(function(){
                if(!aiPanel.recorder.canRecord){
                	// 如果不能录音 弹出设置层
                    $(".ac-dialog-bottom").css("overflow","visible");
                    $(".ac-follow-mask").show();
                    $("#recorder").css("zIndex",2);
                    clearInterval(timmer);

                    var timmer_r = window.setInterval(function(){
                        if(aiPanel.recorder.canRecord){
                            $(".record").trigger("click");
                            $(".ac-follow-mask").hide();
                            $(".ac-dialog-bottom").css("overflow","hidden");
                            clearInterval(timmer_r);
                        }
                    },500);
                }else{
                    $(".record").trigger("click");
                    clearInterval(timmer);
                }
            }, 500);
        },
        onBeforeRecord:function(){//录音之前需要清除评分，可以在这里设置录音参数
            
        },
        onAfterRecord:function(){
            // 切回播放样式
            $(".pr-wrap").removeClass("is-record");
            // 显示再读一遍
            $(".pr-wrap .rr-wrap").removeClass("type2").html(getHTML(0)).show();
        },
        onBeforeScore:function(){
            commentFn.wait();
        },
        onScore: function(data){//评分成功需要显示评分结果
            // 音频地址
            var 
            // 评分分数
            score = new chivox.EnWordScore(data).getOverall(),
            // 音频地址    
            audioUrl = data.audioUrl;
            // 评分完后显示跟我读
            $(".fl-wrap").show();
            // 打分
            commentFn[score >= 70 ? "good" : "bad"]();
            // 发送最高分
            ;(function(){
                var _score = $("[name=score]"),
                    _audio_url = $("[name=audio_url]"),
                    _followForm = $("[name=audioFollow]"),
                    _action = _followForm.attr("action"),
                    bestScore = _score.val();

                if(score < bestScore) return;
                _score.val(score);
                _audio_url.val(audioUrl);
                $.post( (_action || "/ac/audioFollow"),_followForm.serialize());
            })();

            // if(score >= window.commentFn.bestScore[0]) window.commentFn.bestScore = [score,audioUrl];
            
        },
        onScoreError: function(errorType){//评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
            alert(errorObj.feedback);
        }
    });
    
    
    var timmer = window.setInterval(function(){
        if(aiPanel.player.canPlay){
            $(".play").trigger("click"),clearInterval(timmer);
        }
    }, 500);
});   

});