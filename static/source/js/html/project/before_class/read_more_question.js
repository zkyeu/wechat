define("read_more_question",["utility"],function(require,exports,module){
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
		recodeTip = $('.recordBtn'),
		tPlay = $('.tPlay'),
		replayTip = $('.sPlay'),
		questionUl = $('#readText'),
		curLi = null,
		curIndex = null;

	
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
	            curLi.find(".c-btn").removeClass("record-btn").addClass('record-gif');
	        },
	        onAfterRecord:function(){
	        	isRecordFlag = true;
	        	curLi.find(".c-btn").removeClass('record-gif').addClass("record-btn");
	        },
	        onBeforeReplay:function(){
	        	curLi.find(".c-btn").removeClass("s-play").addClass('replay-gif');
	        },
	        onAfterReplay: function(){
				curLi.find(".c-btn").removeClass("replay-gif").addClass('s-play');
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
		
		
		questionUl.on('click', '.tPlay', function(){
			curLi = $(this).closest("li");
			curIndex = curLi.index();
			var curData = $(this).parents('li');
			setData(curData.attr("audio-url"),curData.attr("audio-text"));
			$('.play').trigger('click');
		});

		questionUl.on('click', '.recordBtn', function(){
			if(!isplayFlag) return;
			var index = $(this).closest("li").index();
			if(index != curIndex) return;
			$(".record").trigger("click");
		});
		questionUl.on('click', '.sPlay', function(){
			if(!isRecordFlag) return;
			var index = $(this).closest("li").index();
			if(index != curIndex) return;
			$(".replay").trigger("click");
		});


		questionUl.on({
			'mouseover' : function(){
				$(this).next().show();
			},
			'mouseout' : function(){
				$(this).next().hide();
			}
		},'.c-btn');






	var ReadFn = function(opts,readData){
		this.readData = readData;
		this.curValue = 0;
		this.liLen = 4;
		this.cBtnHtml = '<div class="m-play-btn-box clearfixed">\
                            <div class="play-box">\
                                <span class="c-btn t-play tPlay"></span>\
                                <span class="promp-text play-p"></span>\
                            </div>\
                            <div class="record-box">\
                                <span class="c-btn record-btn recordBtn"></span>\
                                <span class="promp-text record-p"></span>\
                            </div>\
                            <div class="replay-box">\
                                <span class="c-btn s-play sPlay"></span>\
                                <span class="promp-text replay-p"></span>\
                            </div>\
                        </div>';
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
			var that = this;
			//显示图片
			this.opts.readImg.html('<img src="'+ this.readData.data[this.curValue].img_url +'"/>');
			
			//根据分页重新渲染阅读题目
			this.liHtml = '';
			this.i = this.curValue*this.liLen;
			this.len = this.i+this.liLen-1;
			for(this.i; this.i<=this.len; this.i++){
				if(this.i <= this.readDataLen-1){
					this.liHtml += '<li audio-url="'+ this.readData.data[this.i].video_url +'" audio-text="'+ this.readData.data[this.i].video_content +'"><p>' + this.readData.data[this.i].video_content + '</p>' + this.cBtnHtml+'</li>';
				}
			}
			this.opts.readText.html(that.liHtml);
			
			//根据数据条数显示分页按钮
			if(this.curValue == 0){
				this.readDataLen <= 4 ? this.opts.btnId.html('<a class="_btn center-b" href="'+ completeHref +'">完成</a>') : this.opts.btnId.html('<a class="_btn center-b" href="javascript:;">下一页</a>');
			}else if(this.curValue == Math.floor(this.readDataLen/this.liLen)){
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
				//翻页后，播放按钮恢复不可点
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
