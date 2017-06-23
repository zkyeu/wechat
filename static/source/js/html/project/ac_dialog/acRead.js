// alert(2222);
define("acRead",["utility"],function(require,exports,module){
	var utility = require("utility"),
		pageTag = utility.pageTag();

	try{


	// 播放按钮
	;(function(){
		var playbtn = $(".play-btn");
			
		if(!playbtn[0]) return;
		var teaAudioLen = teaAudio.length,
			teaPlayBtn = $('#teaPlayBtn'),
			teaIndex = 0,
			teaImgList = $('#teaImgList'),
			tIndexImg = $('#tIndexImg'),
			tPageHtml = '<span class="current"></span>',
			tliLen = teaImgList.find('li').width();

			//序列图标
			for(var i = 1; i < teaAudioLen; i++){
				tPageHtml += '<span></span>';
			}
			//判断图片张数显示序列图标
			teaAudioLen == 1 ? tIndexImg.html('') : tIndexImg.html(tPageHtml);
			teaImgList.width(tliLen*teaAudioLen+'px');
			tIndexImg.css('margin-left','-'+tIndexImg.width()/2+'px');

			/*seajs.use("acsoundPlay",function(acsoundPlay){
				$(".play-btn").on("click",function(){
					teaPlayBtn.hide();
					
					$(".ac_tip").hide();
					var self = $(this),
						//href = self.attr("yinpin"),
						href = teaAudio[teaIndex].audioPath,
						playTag = !self.hasClass("is-play");
					acsoundPlay.playInit({
						href : href,
						playTag : playTag,
						// 播放
						startFn : function(){
							self.addClass("is-play");
							// alert('ppppp');
						},
						// 暂停
						stopFn : function(){
							self.removeClass("is-play");
						},
						// 结束
						endFn : function(){
							console.log(22222);
							teaIndex++;
							self.removeClass("is-play");
							if(teaIndex <= teaAudioLen-1){
								setTimeout(function(){
									$(".play-btn").trigger('click');
								},1000);
								teaImgList.animate({'margin-left':'-'+tliLen*teaIndex+'px'});
								tIndexImg.find('span').eq(teaIndex).addClass('current').siblings().removeClass('current');
							}else{
								teaIndex = 0;
								teaPlayBtn.show();
								teaImgList.css('margin-left','0');
								tIndexImg.find('span').eq(teaIndex).addClass('current').siblings().removeClass('current');
							}
						}
					});
				});
			
			});*/

			$(".play-btn").on("click",function(){

				player.play({//可以设置播放参数，例如从什么位置开始播放，播放多长时间
				    onStart: function(){//开始播放的回调
				    	teaPlayBtn.hide();
				    },
				    onStop: function(){//播放完成的回调
				    	teaIndex++;
						if(teaIndex <= teaAudioLen-1){
							setTimeout(function(){
								$(".play-btn").trigger('click');
							},1000);
							teaImgList.animate({'margin-left':'-'+tliLen*teaIndex+'px'});
							tIndexImg.find('span').eq(teaIndex).addClass('current').siblings().removeClass('current');
						}else{
							teaIndex = 0;
							teaPlayBtn.show();
							teaImgList.css('margin-left','0');
							tIndexImg.find('span').eq(teaIndex).addClass('current').siblings().removeClass('current');
						}

						player.load({
						    url: teaAudio[teaIndex].audioPath,//这里支持http协议的mp3音频，rtmp协议的flv音频
						    success: function(){
						    },
						    error: function(){
						        // console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
						    }
						});
				    }
				});
			});

			var player = new chivox.AiPlayer({
			    id: "player", //这里的id对应于HTML节点的id
			    appKey: "14350468870000e0",
			    secretKey: "55d7229b6ae9332e89596cff1f9ce042",
			    onFlashLoad:function(code, message){//Flash加载成功的回调，code值有："50000"
					player.load({
					    url: teaAudio[teaIndex].audioPath,//这里支持http协议的mp3音频，rtmp协议的flv音频
					    success: function(){
					        //加载音频成功，接下来才可以播放音频
					        // console.log("加载音频成功");
					    },
					    error: function(){
					        // console.log("加载音频失败，请检查音频地址是否正确，网络连接是否正常。");
					    }
					});
			    },
			    onError:function(code, message){//出错时的回调，code值有："50408", "50409", "50410"
			    }
			});

	})();

	// 老师发题说明
	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();


	// 学生页面
	;(function(){

		if(utility.pageTag()[2] != "play") return;

		// 倒计时
		$(".ac-timmer").countDown({
			targetFn : function(){
				var _followForm = $("[name=audioFollow]"),
            	_action = _followForm.attr("action");
            	$("[name=the_end]").val("1");
				$.post( (_action || "/ac/audioFollow"),_followForm.serialize());
			}
		});
		$("body").css("overflow-y","hidden");
		
		var
	    showTip = function(type,showtype,callback){
	    	var _type = ["play","record","replay"],
	    		_index = $.inArray(type,_type),
	    		_tip = _index > -1 ? $(".ai-tip li").eq(_index).find("p") : $(type),
	    		_style = showtype == "show" ? {"right" : -110, "opacity" : 1 } : {"right" : -115, "opacity" : 0 };
	    	_tip.animate(_style,function(){
	    		(typeof(callback) == "function") && callback();
	    	});
	    },

	    tiptimmer = $(".tip-timmer"),
	    tiptimmerSpan = tiptimmer.find("span"),
	    timmerStart = +tiptimmerSpan.text(),

	    beginRecord = function(){
	    	showTip("record","show",function(){
	    		window.setTimeout(function(){
					showTip("record","hide",function(){
						showTip(tiptimmer,"show",function(){
							tiptimmer.countDown({
								start : timmerStart,
								isFormat : false,
								targetShow : false,
								targetFn : function(){
									showTip(tiptimmer,"hide",function(){
										tiptimmerSpan.text(timmerStart);
										$(".record").trigger("click");
									})
								}
							});
						});
					});
	    		},1000)
	    	});
	    },

	    recordTip = function(callback){
            if(!aiPanel.recorder.canRecord){
            	// 如果不能录音 弹出设置层
            	// 音频提示
            	// var swfsrc= $(".ac-follow-tip").attr("swf-src");
            	// $(".ac-follow-tip").html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="178" height="100" wmode="transparent" quality="high" allowScriptAccess="always"><param name="movie" value="'+ swfsrc +'" /><param name="allowScriptAccess" value="always" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><embed src="'+ swfsrc +'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="178" height="100" wmode="transparent" quality="high" allowScriptAccess="always"></embed></object>');
				$(document).on("click",function(){
					$(".ac-follow-tip").remove();
				});
                $(".ac-read-setting").css("overflow","visible");
                $(".ac-follow-mask").show();
                $("#recorder").css("zIndex",20);	                			
                
                var timmer_r = window.setInterval(function(){
                    if(aiPanel.recorder.canRecord){
                        $(".ac-follow-mask").hide();
                        $(".ac-read-setting").css("overflow","hidden");
                        clearInterval(timmer_r);
                        typeof(callback == "function") && callback();
                    }
                },500);
            }else{
                typeof(callback == "function") && callback();
            }
	    }

	    commentFn = (function(){
	    	var result = $(".comment-result"),
	    		className = "success fail";
	    	return {
	    		success : function(){
	    			result.removeClass(className).addClass("success").fadeIn();
	    		},
	    		fail : function(){
	    			result.removeClass(className).addClass("fail").fadeIn();
	    		},
	    		close : function(){
	    			result.hide();
	    		}
	    	}
	    })();
		
	    $(".play,.record").on("click",function(){
	    	commentFn.close();
	    });

	    $(".play,.record,.replay").on("click",function(){
	    	showTip("replay","hide");
	    	nextBtn.hide();
	    });

	    
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
	        	showTip("play","show");
	        },
	        onAfterPlay:function(){
	        	showTip("play","hide",function(){
	        		beginRecord();
	        	});	            
	        },
	        onBeforeRecord:function(){//录音之前需要清除评分，可以在这里设置录音参数
	            
	        },
	        onAfterRecord:function(){
	        	// showTip("replay","show");
	        	
	        },
	        onBeforeReplay:function(){
	        	showTip("replay","show");
	        },
	        onAfterReplay:function(){
	        	
	        	showTip("replay","hide");
	        	if(index < sourceLen){
	        		window.setTimeout(function(){
	        			nextBtn.show();
	        		},0);
	        	}else{
	        		nextBtn.hide();
	        		if(sourceLen == 1){
	        			var	scoreLevel = '';
	        			if(scoreFlag == 0){
	        				scoreLevel = 'r-level0';
	        			}else if(0 < scoreFlag && scoreFlag < 70){
	        				scoreLevel = 'r-level1';
	        			}else if(70 <= scoreFlag && scoreFlag <= 85){
	        				scoreLevel = 'r-level2';
	        			}else if(85 < scoreFlag && scoreFlag <= 100){
	        				scoreLevel = 'r-level3';
	        			}
	        			$('#result-score').html('<div class="result-score '+ scoreLevel +' show">\
                            <div class="text">'+ scoreFlag +'<span>分</span></div>\
                        </div>');
	        		}else{
	        			$('#submitBtn').show();
	        		}
	        		
	        	}
	        },
	        onBeforeScore:function(){
	        },
	        onScore: function(data){//评分成功需要显示评分结果
	        	
	        	$(".ai-tip").css("zIndex","1");
	            // 音频地址
	            var 
	            // 评分分数
	            score = new chivox.EnWordScore(data).getOverall();
	            scoreFlag = score;
	            if(score == "") score = 0;
	            
	            var
	            // 音频地址    
	            audioUrl = data.audioUrl;
	            // 评分完后显示跟我读
	            $(".fl-wrap").show();
	            // 打分
	            commentFn[score >= 70 ? "success" : "fail"]();
	            // 发送最高分
	            ;(function(){
	                var _score = $("[name=score]"),
	                    _audio_url = $("[name=audio_url]"),
	                    bestScore = _score.val();

	                if(score < bestScore) return;
	                _score.val(score);
	                _audio_url.val(audioUrl),
					_followForm = $("[name=audioFollow]"),
                	_action = _followForm.attr("action");
					$.post( (_action || "/ac/audioFollow"),_followForm.serialize());
	                
	            })();

	            $(".replay").trigger("click");
	            // if(score >= window.commentFn.bestScore[0]) window.commentFn.bestScore = [score,audioUrl];
	            
	        },
	        onScoreError: function(errorType){//评分失败的显示 "TIMEOUT", "NO_DATA", ErrorID
	            var errorObj = chivox.AiStatusCode.get(errorType, "cn");
	            alert(errorObj.feedback);
	        }
	    });


		var imgList = $('#imgList'),
			index = 0,
			indexImg = $('#indexImg'),
			pageHtml = '<span class="current"></span>',
			sourceLen = sourceConfig.length,
			liLen = imgList.find('li').width(),
			setData = function(url,text){
				aiPanel.setData({
				    audioUrl: url || "",
				    serverParams: {
				        coreType: "en.sent.score",
				        refText: text || "",
				        userId: "guest",
						rank: 100,
		                // 是否返回音频url
		                attachAudioUrl:1
				    }
				});
			},
			 _setData = function(n){
				setData(sourceConfig[n].audioUrl,sourceConfig[n].refText);

				if(index != 0){
					// 先清空 数据 分数 audio_url
					$("[name=audio_url]").val('');
					$("[name=score]").val(0);
					$("[name=current_index]").val(n+1);
					$(".play").trigger("click");
				}

				index = ++n;
			};
		_setData(0);

		var nextBtn = $('#nextBtn');

		nextBtn.on('click',function(){
			imgList.animate({'margin-left':'-'+liLen*index+'px'});
			indexImg.find('span').eq(index).addClass('current').siblings().removeClass('current');
			setTimeout(function(){
				_setData(index);
			},1000);
			nextBtn.hide();
		});


		for(var i = 1; i < sourceLen; i++){
			pageHtml += '<span></span>';
		}

		sourceLen == 1 ? indexImg.html('') : indexImg.html(pageHtml);
		imgList.width(liLen*sourceLen+'px');
		indexImg.css('margin-left','-'+indexImg.width()/2+'px');
		// 判断能否录音
		if($('.result-score').size() == 0){
			window.setTimeout(function(){
				recordTip(function(){
					// 点击播放按钮
				    var timmer = window.setInterval(function(){
				    	// clearInterval(timmer);
				        if(aiPanel.player.canPlay){
				            $(".play").trigger("click"),clearInterval(timmer);
				        }
				    }, 500)
				});			
			},2000);
		}
		



	})();

	// 老师结果页面
	;(function(){
		var pageTag = utility.pageTag();
		if( pageTag[1] != "tea" ) return;
		;(function(){

			var 
			getData = (function(){
				var 
				sendForm = $("[name=class-info]"),
				sendUrl = sendForm.attr("action") || "/ac/getStat",
				dataFlag = $("[data-flag]");

				return function(cb){
						// var result = {
						// 	status : 1,
						// 	data : {
						// 		section : ""
						// 	}
							
						// }

						// result = {"status":1,"info":"","data":{"num_correct":2,"num_wrong":3,"num_not":"5"}}

						// var status = result.status,
						// 	data = result.data;
						// if(status == 1){
						// 	if(typeof(cb) == "function") cb.call(null,dataFlag,data);
						// 		// else updataFn(dataFlag,data);
						// }

						$.ajax({
							// url : "/api/ac/getStat", 
							url : sendUrl,
							data : sendForm.serialize(),
							dataType : "json",
							success : function(r){
								var status = r.status,
									data = r.data;
									// alert( $.param(data) );
								if(status == 1){
									if(typeof(cb) == "function") cb.call(null,dataFlag,data);
										// else updataFn(dataFlag,data);
								} 
							}
						});
					}	
			})(),

			showResult = function(){
				$(".ac-tem-result-con").show();
				$(".ac-tem-result-wait,.ac-tem-result-mask").hide();
			}

			$(".wait-tips-close").on("click",function(){
				$(this).closest(".ac-tem-result-wait").hide().siblings(".ac-tem-result-mask").hide();
			});

			// 老师端倒计时获取结果 一对一
			;(function(){
				var result = $(".tea-choice-result");
				if(!result[0]) return;
						
				var timmer = $(".ac-timmer"),
					interval,
					resultWrap = $("[data-flag=choice-result]");

				timmer.countDown({
					startFn : function(r,t){
						interval = t;
						// 设置开始
						acUtility.resultStatus.setStart();
					},
					targetFn : function(r,t){
						// 清除轮询
						// clearInterval(getTag);
						// 时间结束 没回答
						$("[name=the_end]").val("1");
						// resultWrap.html("Did not answer");
						// 显示答案
						// showResult();
						// 输出完成标志
						acUtility.resultStatus.setEnd();
					}
				});

				var getTag = window.setInterval(function(){
					getData(function(dataFlag,data){
						var score = data.score,
							correct = data.correct,
							audio_url = data.audio_url;
						if(audio_url == ""){
							resultWrap.html("Did not answer");
						}else{
							resultWrap.html(score);
							// resultWrap.html(correct == 1 ? "Excellent" : "Try Again");
						}
						
						// 显示答案
						showResult();
						// 清除轮询
						// clearInterval(getTag);
						// 清除倒计时定时器
						$("[name=the_end]").val("1");
						clearInterval(interval);
						// 定时器归零
						timmer.find("span").text("00:00");
						// 输出完成标志
						acUtility.resultStatus.setEnd();
					});
				}, 3000);
			})();

			// 老师端倒计时获取结果 一对多
			;(function(){
				var result = $(".tea-choice-result-multi");
				if(!result[0]) return;
				var	timmer = $(".ac-timmer"),
					updataFn = function(tar,data){
						$(tar).each(function(i,v){
							var $v = $(v),
								$flag = $v.attr("data-flag");
							$v.text(data[$flag]);
						});
					},
					interval;

				timmer.countDown({
					startFn : function(r,t){
						interval = t;
						// 设置开始
						acUtility.resultStatus.setStart();
					},
					targetFn : function(r,t){
						// 时间结束 清除轮询 不清除轮询
						// clearInterval(getTag);
						// 显示答案
						showResult();
						// 输出完成标志
						acUtility.resultStatus.setEnd();
					}
				});

				var getTag = window.setInterval(function(){
					getData(function(dataFlag,data){
						updataFn(dataFlag,data);
						// 全部完成
						// if(data.answer_all){
						// 	// 显示答案
						// 	showResult();
						// 	// 清除轮询
						// 	clearInterval(getTag);
						// 	// 清除倒计时定时器
						// 	clearInterval(interval);
						// 	// 定时器归零
						// 	timmer.find("span").text("00:00");
						// 	// 输出完成标志
						// 	acUtility.resultStatus.setEnd();
						// }
					});
				}, 3000);
			})();

		})();
	})();

	
	}catch(e){

	}
});