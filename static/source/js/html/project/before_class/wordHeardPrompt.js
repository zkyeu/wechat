define("wordHeardPrompt",["utility"],function(require,exports,module){
	var utility = require("utility");
	// 跟读逻辑
	    window.aiPanel = new chivox.AiPanel({
	        appKey: "14350468870000e0",
	        secretKey: "55d7229b6ae9332e89596cff1f9ce042",
	        data: {
	            audioUrl: "",
	            // duration: 10000, //传入参数手动设置录音时长
	            serverParams: {//录音服务参数
	                // 单词 en.word.score
	                // 句子 en.sent.score
	                coreType: "en.sent.score",
	                refText: "",
	                rank: 100,
	                userId: "guest",
	                // 是否返回音频url
	                attachAudioUrl:1
	            }
	        },
	        onBeforePlay:function(el){
	        	// showTip("play","show");
	        },
	        onAfterPlay:function(){
	        	// showTip("play","hide",function(){
	        	// 	beginRecord();
	        	// });	            
	        },
	        onBeforeRecord:function(){//录音之前需要清除评分，可以在这里设置录音参数
	            
	        },
	        onAfterRecord:function(){
	        	// showTip("replay","show");
	        },
	        onBeforeScore:function(){
	        },
	        onScore: function(data){//评分成功需要显示评分结果
	            // 音频地址
	        //    var 
	            // 评分分数
	         //   score = new chivox.EnWordScore(data).getOverall(),
	            // 音频地址    
	          //  audioUrl = data.audioUrl;
	            // 评分完后显示跟我读
	          //  $(".fl-wrap").show();
	            // 打分
	           // commentFn[score >= 70 ? "success" : "fail"]();
	            // 发送最高分
	            // ;(function(){
	            //     var _score = $("[name=score]"),
	            //         _audio_url = $("[name=audio_url]"),
	            //         bestScore = _score.val();

	            //     if(score < bestScore) return;
	            //     _score.val(score);
	            //     _audio_url.val(audioUrl);
	                
	            // })();

	            // if(score >= window.commentFn.bestScore[0]) window.commentFn.bestScore = [score,audioUrl];
	            
	        },
	        onScoreError: function(errorType){//评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
	            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
	            alert(errorObj.feedback);
	        }
	    });
		
		var
		recordTip = function(callback){
			var flag = 0;
			setTimeout(function(){
				if(flag != 1){
					window.location.href = $('.word-p-btn').attr('href');
				}
				
			},10000);
            if(!aiPanel.recorder.canRecord){
            	// 如果不能录音 弹出设置层
                $(".mask, .tip").show(); 
                $(".aiMediaDialog").css('left','50%');    			
                promptbox.html("");
                promptbox.hide();
                var timmer_r = window.setInterval(function(){
                    if(aiPanel.recorder.canRecord){
                    	flag = 1;
                        $(".mask, .tip").hide();
                        $(".aiMediaDialog").css('left',-10000);

                        clearInterval(timmer_r);
                        typeof(callback == "function") && callback();
                    }
                },500);

            }else{
                typeof(callback == "function") && callback();
            }
	    }
		
		var promptbox = $(".word-prompt-box"),
			promptboxIn = promptbox.find("span");
		utility.deftime({
			start : +promptboxIn.text(),
			startFn : function(r){
				promptboxIn.text(r);
			},
			targetFn : function(){
				promptbox.html("检测中...");
				recordTip(function(){
					promptbox.html("检测完毕");
					promptbox.show();
					$('.word-p-btn').show();
				});
			}
		});


});
