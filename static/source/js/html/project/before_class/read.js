define("read",["utility"],function(require,exports,module){
	var utility = require("utility");
		var setData = function(url,text){
			console.log(url,text);
			aiPanel.setData({
			    audioUrl: url,
			    serverParams: {
			        coreType: "en.sent.score",
			        refText: text,
			        userId: "guest"
			    }
			});
		},
		isplayFlag = false,
		isRecordFlag = false,
		recodeTip = $('#recordBtn'),
		tPlay = $('#tPlay');
		replayTip = $('#sPlay');

	
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
	        	isplayFlag = false;
	        },
	        onAfterPlay:function(){
	        	isplayFlag = true;
	        },
	        onBeforeRecord:function(){//录音之前需要清除评分，可以在这里设置录音参数
	        	isRecordFlag = false;
	            recodeTip.removeClass("record-btn").addClass('record-gif');
	        },
	        onAfterRecord:function(){
	        	isRecordFlag = true;
	        	recodeTip.removeClass('record-gif').addClass("record-btn");
	        },
	        onBeforeReplay:function(){
	        	replayTip.removeClass("s-play").addClass('replay-gif');
	        },
	        onAfterReplay: function(){
				replayTip.removeClass("replay-gif").addClass('s-play');
	        },
	        onBeforeScore:function(){

	        },
	        onScore: function(data){//评分成功需要显示评分结果
	        	
	            
	        },
	        onScoreError: function(errorType){//评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
	           
	        }
	    });
		
		var
		recordTip = function(){
			var flag = 0;
            if(!aiPanel.recorder.canRecord){
            	// 如果不能录音 弹出设置层
                $(".mask, .tip").show(); 
                $(".aiMediaDialog").css('left','50%'); 
                var _time = 0 ;
                var timmer_r = window.setInterval(function(){
                	//console.log(aiPanel.recorder.canRecord);
                	_time += 500;
                    if(aiPanel.recorder.canRecord || _time >= 10000){
                    	flag = 1;
                        $(".mask, .tip").hide();
                        $(".aiMediaDialog").css('left',-10000);

                        clearInterval(timmer_r);
                     //   typeof(callback == "function") && callback();
                    }
                },500);

            }else{
                // typeof(callback == "function") && callback();
            }
	    }
		

		recordTip();
		
		
		tPlay.on('click',function(){
			var curData = $('#readText');
			setData(curData.attr("audio-url"),curData.attr("audio-text"));
			$('.play').trigger('click');
		});

		recodeTip.on('click',function(){
			if(!isplayFlag) return;
			$(".record").trigger("click");
		});
		replayTip.on('click',function(){
			if(!isRecordFlag) return;
			$(".replay").trigger("click");
		});

		tPlay.add(recodeTip).add(replayTip).hover(function(){
			$(this).next().show();
		},function(){
			$(this).next().hide();
		});







	var ReadFn = function(opts,readData){
		this.readData = readData;
		this.curValue = 0;
		this.defaultv = {
			readImg : $('#readImg'),
			readText : $('#readText'),
			btnId : $('#btnId')
		};
		
		this.opts = $.extend({},this.defaultv,opts);
		this.readDataLen = this.readData.data.length;
		this._init();
		this._event();
	};
	ReadFn.prototype = {
		//绘制页面
		_init : function(){
			this.opts.readImg.html('<img src="'+ this.readData.data[this.curValue].img_url +'"/>');
			this.opts.readText.html('<p>'+this.readData.data[this.curValue].video_content+'</p>');
			this.opts.readText.attr({'audio-url':this.readData.data[this.curValue].video_url,'audio-text':this.readData.data[this.curValue].video_content});
			
			//根据数据条数显示分页按钮
			if(this.curValue == 0){
				this.readDataLen == 1 ? this.opts.btnId.html('<a class="_btn center-b" href="'+ completeHref +'">完成</a>') : this.opts.btnId.html('<a class="_btn center-b" href="javascript:;">下一页</a>');
			}else if(this.curValue == this.readDataLen-1){
				this.opts.btnId.html('<a class="_btn prev-b" href="javascript:;">上一页</a><a class="_btn next-b" href="'+ completeHref +'">完成</a>')
			}else{
				this.opts.btnId.html('<a class="_btn prev-b" href="javascript:;">上一页</a><a class="_btn next-b" href="javascript:;">下一页</a>')
			}
			
			
		},
		_event : function(){
			var that = this;
			this.opts.btnId.on('click', '._btn', function(){
				//翻页过程，改变按钮状态
				recodeTip.removeClass('record-gif').addClass("record-btn");
				replayTip.removeClass("replay-gif").addClass('s-play');
				//停掉声音
				aiPanel.player.stop();
				//停止录音
				aiPanel.recorder.stop();
				//停止回放
				aiPanel.recorder.stopReplay();
				//翻页后，播放按钮回复不可点
				isplayFlag = false;

				that.opts.readText.attr({'audio-url':that.readData.data[that.curValue].video_url,'audio-text':that.readData.data[that.curValue].video_content});
				switch ($(this).text()){
					case '下一页' : that.nextFn()
					break;
					case '上一页' : that.prevFn()
					break;
				}

			});
		},
		nextFn : function(){
			this.curValue ++;
			this._init();
		},
		prevFn : function(){
			this.curValue --;
			this._init();
		}

	};
	readData && new ReadFn({},readData);
	

});
