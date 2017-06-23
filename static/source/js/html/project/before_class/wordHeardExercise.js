define("wordHeardExercise",["utility","niceScroll"],function(require,exports,module){
	var utility = require("utility");
		var scoreFlag = 0,
		wordHeadImgId = $('#wordHeadImgId');
		liLength = $(".word-heard-main").find('li').length;
		var setData = function(url,text){
			aiPanel.setData({
			    audioUrl: url,
			    serverParams: {
			        coreType: "en.sent.score",
			        refText: text,
			        userId: "guest"
			    }
			});
		},
		li = $(".word-heard-main").find("li"),
		curLi = null,
		_setData = function(index){
			
			var _li = li.eq(index);
			curLi = _li;
			setData(_li.attr("audio-url"),_li.attr("audio-text"));
			wordHeadImgId.html('<img src="'+ wordHeadImg[index] +'"/>');
		}

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
	        	curLi.addClass("current-read");
	        },
	        onAfterPlay:function(){
	        	wordHeardObj.countDownFn(function(){
	        		$(".record").trigger("click");
	        	}); 
	        },
	        onBeforeRecord:function(){//录音之前需要清除评分，可以在这里设置录音参数
	            
	        },
	        onAfterRecord:function(){

	        },
	        onBeforeScore:function(){
	        },
	        onScore: function(data){//评分成功需要显示评分结果
	        	var score = new chivox.EnWordScore(data).getOverall();
	        	wordHeardObj.showStarFn(score,function(){
	        		$('#scoreId').val(Math.round(this.scroreNumber/liLength));
	        		$('#formId').submit();	
	        	});
	            
	        },
	        onScoreError: function(errorType){//评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
	            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
	            alert(errorObj.feedback);
	        }
	    });
		
		var
		recordTip = function(callback){
			var flag = 0;
            if(!aiPanel.recorder.canRecord){
            	// 如果不能录音 弹出设置层
                $(".mask, .tip").show(); 
                $(".aiMediaDialog").css('left','50%'); 
                var _time = 0 ;
                var timmer_r = window.setInterval(function(){
                	_time += 500;
                    if(aiPanel.recorder.canRecord || _time >= 10000){
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
		

		recordTip(function(){
			_setData(0);
			$('.play').trigger('click');
		});

		function wordHeardFn(){
			this.countDown = $('.count-down');
			this.countNum = $('.count-num');
			this.num = 3;
			this.scroreNumber = 0;
		}
		wordHeardFn.prototype = {
			countDownFn : function(callback){
				var that = this;
				this.countDown.show();
				this.timeout = setInterval(function(){
					that.countDownNum(callback);
				},1000);
			},
			countDownNum:function(callback){
				if(this.num <= 1){
					this.num = 3;
					this.countNum.addClass('count-num'+this.num);
					clearInterval(this.timeout);
					this.countDown.hide();
					typeof(callback) == "function" && callback();
					return false;
				}
				
				this.countNum.removeClass('count-num'+this.num);
				this.num--;
				this.countNum.addClass('count-num'+this.num);
			},
			//评分
			showStarFn:function(score,callback){
				//计算总分数
				this.scroreNumber = score >= 50 ? this.scroreNumber += score : this.scroreNumber;
				curLi.find('.normal-star').removeClass('active-star');
				if(50 <= score && score <= 60){
					scoreFlag = 0;
					curLi.find('.normal-star').eq(0).addClass('active-star');
				}else if(61 <= score && score <= 80){
					scoreFlag = 0;
					curLi.find('.normal-star').eq(0).addClass('active-star');
					curLi.find('.normal-star').eq(1).addClass('active-star');
				}else if(81 <= score && score <= 100){
					scoreFlag = 0;
					curLi.find('.normal-star').addClass('active-star');
				}else{
					if(scoreFlag >= 2){
						scoreFlag = 0;
						this.scroreNumber += 50;
						curLi.find('.normal-star').eq(0).addClass('active-star');
					}else{
						scoreFlag++;
						$('.play').trigger('click');
					}

				}

				if(scoreFlag == 0){
				 	curLi.removeClass('current-read');
				 	curLi.addClass('blue-c');
				 	curLiIndex = curLi.index();
					curLi = curLi.next();
					if(curLiIndex == liLength-1){
				 		typeof callback == 'function' && callback.call(this);
				 		return false;
				 	}
					if(curLiIndex == -1) return false;
					_setData(curLi.index());
				 	$('.play').trigger('click');
				 	
				}

			}
		};
		var wordHeardObj = new wordHeardFn();


	$('#mainId').niceScroll({ 
	    cursorcolor: "#ffdb90",//#CC0071 光标颜色 
	    cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
	    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
	    cursorwidth: "12px", //像素光标的宽度 
	    cursorborder: "0", //     游标边框css定义 
	    cursorborderradius: "12px",//以像素为光标边界半径 
	    autohidemode: false //是否隐藏滚动条 
	});
});
