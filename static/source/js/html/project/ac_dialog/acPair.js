define("acPair",["utility","acsoundPlay"],function(require,exports,module){
	var utility = require("utility"),
		returnTime = utility.returnTime,
		acsoundPlay = require("acsoundPlay");

	$.fn.setRelative = function(t){
		return $(this).css({ zIndex : (t ? 1 : 992) });
	}

	var cb = function(c,t){
		window.setTimeout(function(){
			c();
		},t || 400);
	}

	// 游戏控制器
	window.pairsFn = new function(){
		var me = this;
		me.datas = {
			// 计数器
			count : 0,
			// 总计数器
			goCount : 0,
			// 最高分
			score : 0,
			// dom总数
			allCount : 0,
			// datasn
			dataSn : null,
			// 配对数组
			pairArr : [],
			// 节点缓存
			objCache : null,
			// 记录数组
			recodeArr : []
		}

		me.init = function(options){
			var defaults = {
				dataJson : null,
				selector : null,
				shuffle : false,
				pageTag : null,
				isOpen : true,
				checkData : {
					"0" : "pair-wrong",
					"1" : "pair-right"
				},
				submitCb : null,
				timmer : ".ac-timmer"
			},
			configs = $.extend({},defaults,options);

			if(!configs.dataJson) return;

			configs.dataJson.dataArr = me.editData(configs.dataJson.dataArr);
			// 输出配置
			me.configs = configs;
			// 生成ui
			me.createUI();
			// 绑定事件
			me.bindEvent();
		}

		// 新老数据兼容
		me.editData = function(data){
			var _data = $.map(data,function(i){
				var _i = i.split("|");
				if(_i.length != 4) _i.splice(1,-1,"");
				return _i.join("|");
			});
			return _data;
		}

		me.playSound = (function(){
			// 设置播放全局变量
			// console.log(me);
			acsoundPlay.getGlobal(function(){
				if(me.datas.allCount == 0) me.datas.playEnd = true;
			});
			var audioPath = $("[audioPath]").attr("audioPath") || "../../../../images/html/ac_dialog/",
				fnObj = {},
				fnType = ["click","success","fail"],
				fileName = ".mp3";

			for(var i=0,l=fnType.length;i<l;i++){
				var _type = fnType[i];
				fnObj[_type] = (function(t){
					return function(){
						acsoundPlay.playSound(audioPath+t+fileName);
					}
				})(_type);
			}

			var successPath = audioPath+"success"+fileName;
			// 修改成功方法
			$.extend(fnObj,{
				success:function(me){
					var _successPath = $(me).attr("successPath") || successPath;
					acsoundPlay.playSound(_successPath);
				}
			});


			return fnObj;
		})();

		// 乱序
		me.arrShuffle = function(arr){
			return arr.sort(function(a,b){
				return Math.random()>.5 ? -1 : 1;
			});
		}
		// 倒计时
		me.deftime = function(options){
			var
			defaults = {
				// 初始
				start : 5,
				// 目标
				target : 0,
				// 时间间隔 单位毫秒
				interval : 1000,
				// 到达之前callback
				startFn : Function,
				// 到达时callback
				targetFn : Function

			},
			configs = $.extend({},defaults,options);
			var
			start = configs.start,
			target = configs.target,
			startFn = configs.startFn,
			targetFn = configs.targetFn;

			// 立即结束
			if(start <= target) return targetFn(start);

			var
			timer,
			interval = configs.interval;

			startFn(start);

			// 进入interval判断时 其实已经过了interval秒
			start -= interval/1e3;

			timer =	window.setInterval(function(){
				if(start <= target){
					clearInterval(timer);
					targetFn(start,timer);
				}else{
					startFn(start,timer);
					start -= interval/1e3;
				}
			},interval);
		}

		// 图片地址
		me.updateImg = function(c){
			return [me.configs.dataJson.imgPath,"/images/html/ac_dialog/ac_game_pair_",c,".png"].join("");
		}
		// 生成ui模板
		me.getUI = function(){
			var configs = me.configs,
				dataJson = configs.dataJson,
				dataArr = dataJson.dataArr,
				isOpen = configs.isOpen,
				pageTag = configs.pageTag,
				html = [];

			html.push('<div class="pair-wrap pair-wrap-'+ dataArr.length +''+ (isOpen ? " pair-wrap-open" : "") + (pageTag[1] == "tea" ? " pair-wrap-tea" : "") +'">');
			html.push('<ul class="clearfix">');
			$(dataArr).each(function(i,v){
				var 
				// 切割数据
				_v = v.split("|"),
				// 答案图片地址
				dataImg = _v[0],
				// dataPair 配对属性
				dataPair = _v[2],
				// 对错标识
				checkClass = me.configs.checkData[_v[3]],
				// 成功音频
				successPath = _v[1],
				// 使用index作为唯一识别id
				dataSn = i;

				;(function(){
					// 输出recodeArr 默认为错
					me.datas.recodeArr.push(me.setCheck(v,"0"));		
				})();

			html.push('<li>\
                    <dl dataSn="'+ dataSn +'" dataPair="'+ dataPair +'"'+ (checkClass ? 'class="'+checkClass+'"' : '')  +' successPath="'+ successPath +'" >\
                        <dt></dt>\
                        <dd class="back">\
                            <img src="'+ dataImg +'" />\
                        </dd>\
                    </dl>\
                </li>')
			});
			html.push('</ul></div>');
			return html.join("");
		}

		// 将ui放入dom
		me.createUI = function(){
			var html = me.getUI(),
				dataJson = me.configs.dataJson,
				selector = me.configs.selector,
				type = dataJson.type,
				closeTime = dataJson.closeTime,
				$selector = $(selector);
			$(selector).html(html);
			if (!!type && type == "show") return;

			var isDemo = me.configs.pageTag[2] == "demo";

			if(isDemo){
				$(".notip").on("click",function(){
					utility.cookieFn.set("stu_pair_demo",1,1000);
					window.location.assign($(".skip").attr("href"));
				});
				$("body").append('<div class="demo-mask-c"></div>');
			}

			

			var $pairStart = $(".pair-start,.pair-start-t"),
				cannotStart = (isDemo || $pairStart.length==0);

			if(!cannotStart) $(".ac-timmer span").html("00:00");

			// 倒计时至开始游戏
			window.setTimeout(function(){
				$pairStart.hide();
				;(function(){
					me.timmerWrap = $(me.configs.timmer);
					me.timmerWrap.countDown({
						start : closeTime/1e3,
						targetFn : function(r,t){
							// 开始游戏
							me.startGame();
							// 如果为演示
							if(isDemo){
								window.setTimeout(function(){
									me.demo(function(){
										
										window.setTimeout(function(){
											var skip = $(".skip");
											utility.deftime({
												start : 5,
												startFn : function(r){
													skip.html('<em style="color:#f8fc54;font-style:normal;">'+r+'</em>秒后跳过');
												},
												targetFn : function(){
													window.location.assign(skip.attr("href"));
												}
											});
										},1000);

									});
								},1000);
							}
						}
					});
				})();
			}, ( cannotStart ? 0 : 3000 ) );

		}

		me.demo = function(callback){
			var demoMask = $('.demo-mask'),
				demoTips = $(".demo-tips p");

			var dl = $(me.configs.selector).find("dl");
			dlFirst = dl.eq(0),
			dlDatapair = dlFirst.attr('datapair'),
			datasn = dlFirst.attr('datasn'),
			dlpairTrue =  dl.filter("[datapair="+dlDatapair+"][datasn!="+datasn+"]"),
			dlpairFalse = dl.filter("[datapair!="+ dlDatapair +"]").eq(0);
			
			dlFirst.setRelative().trigger("click");
			window.setTimeout(function(){
				dlpairFalse.setRelative().trigger("click");

				cb(function(){
					demoMask.show();
					demoTips.eq(1).show();
				});

				cb(function(){
					dlpairFalse.setRelative(true);
					demoTips.eq(1).hide();
					demoMask.hide();
				},2600);

				window.setTimeout(function(){
					dlFirst.trigger("click");
					window.setTimeout(function(){
						dlpairTrue.setRelative().trigger("click");
						cb(function(){
							demoTips.eq(0).show();
							demoMask.show();
						});

						cb(function(){
							demoTips.eq(0).hide();
							// demoMask.hide();
						},2600);
						
						if(!$(".ac-tem-tea")[0]){
							typeof (callback) == "function" && callback();
						}

					},600);
				},4000);

			},600);
		}

		// 开始游戏
		me.startGame = function(){
			var configs = me.configs,
				selector = configs.selector,
				dataJson = configs.dataJson,
				workTime = dataJson.workTime/1e3;
			$(selector).find(".pair-wrap").removeClass("pair-wrap-open");
			me.timmerWrap.countDown({
				start : workTime,
				startFn : function(r,t){
					// 记下开始游戏定时器 在提交时清除
					me._timmer = t;
					me.playTime = workTime - r;
				},
				targetFn : function(r,t){
					// 到时间 提交答题回调
					// 答题时间
					me.playTime = workTime - r;
					var submitCb = me.configs.submitCb;
					if(typeof (submitCb) == "function"){
						submitCb.call(null,{
							goCount : me.datas.goCount,
							bestScore : me.datas.score,
							resultArr : me.datas.recodeArr,
							reset : me.reset,
							timmer : me.timmerWrap,
							playTime : me.playTime
						})
					}
				}
			});

		}

		// 更改数据
		me.setRecode = function(v,t){
			$(v).each(function(i,v){
				var dataSn =  v.attr("dataSn"),
					_v = me.setCheck(me.datas.recodeArr[dataSn],t);
				me.datas.recodeArr.splice(dataSn,1,_v);
				// console.log(me.datas.recodeArr);
			});
		}
		// setRight
		me.setCheck = function(v,t){
			return v.slice(0,-1) + t;
		}
		// 绑定事件
		me.bindEvent = function(){
			// console.log(me.datas.recodeArr);
			var configs = me.configs,
				selector = configs.selector,
				dataJson = configs.dataJson,
				dataArr = dataJson.dataArr,
				dataLength = dataArr.length;
			
			me.datas.allCount = dataLength;
			me.reset = function(shuffle){
				if(shuffle) me.configs.dataJson.dataArr = me.arrShuffle(me.configs.dataJson.dataArr);
				me.datas.recodeArr = [];
				me.datas.goCount = 0;
				me.datas.allCount = dataLength;
				me.createUI();
			}

			me.resetGame = function(){
				me.clearFn();
				me.reset();
			}

			var selector = $(selector),
				pairdl = selector.find("ul li dl");

			selector.on(
				{
					click : function(){
						var self = $(this),
							gameWrap = self.closest(".pair-wrap");

						if(gameWrap.hasClass("pair-wrap-open")) return;	
				
						var	dataSn = self.attr("dataSn"),
							checkData = me.configs.checkData;

						if(!!me.datas.dataSn && (me.datas.dataSn == dataSn)) return;
				
						var	data = self.attr("dataPair");
							me.datas.count++;

						if(me.datas.count > 2) return;

						me.datas.goCount++;

						// 点击
						self.addClass("flip");
						me.playSound.click();

						if(me.datas.count < 2){
							me.datas.objCache = self;
							me.datas.dataSn = dataSn;
							me.datas.pairArr.push(data);
						}

						if(me.datas.count == 2){
							if($.inArray(data, me.datas.pairArr) > -1){
								// 配对成功
								// console.log(self.attr("dataSn"),me.datas.objCache.attr("dataSn"));

								window.setTimeout(function(){
									self.addClass(checkData[1]);
									me.datas.objCache.addClass(checkData[1]);
									me.playSound.success(self);
									me.datas.playEnd = false;
								},450);

								window.setTimeout(function(){
									self.fadeOut();
									me.datas.objCache.fadeOut(function(){
										me.datas.allCount -= 2;
										// 更新记录
										me.setRecode([self,me.datas.objCache],"1");

										me.clearFn();
										if(me.datas.allCount == 0){
											// 最高分
											if(me.datas.score == null  || me.datas.goCount < me.datas.score){
												me.datas.score = me.datas.goCount;
											}

											// 清除定时器
											clearInterval(me._timmer);
											
											window.setTimeout(function(){
												var submitCb = me.configs.submitCb;
												if(typeof (submitCb) == "function"){
													submitCb.call(null,{
														goCount : me.datas.goCount,
														bestScore : me.datas.score,
														resultArr : me.datas.recodeArr,
														reset : me.reset,
														timmer : me.timmer,
														playTime : me.playTime
													});
												}
											},1000);
										}
									});
								},me.configs.pageTag[2] == "demo" ? 2600 : 1500);				
							}else{
								// 展示对错
								window.setTimeout(function(){
									self.addClass(checkData[0]);
									me.datas.objCache.addClass(checkData[0]);
								},420);
								// 配对失败
								window.setTimeout(function(){
									me.playSound.fail();
									self.removeClass(checkData[0]+" flip");
									me.datas.objCache.removeClass(checkData[0]+" flip");
									me.clearFn();
								}, (me.configs.pageTag[2] == "demo" ? 2600 : 800) );
							}
						}
					}
				}
				,"ul li dl"
			);

		}

		me.clearFn = function(){
			me.datas.count = 0;
			me.datas.pairArr = [];
			me.datas.objCache = null;
			me.datas.dataSn = null;
		}
	}
	// 初始化
	pairsFn.init({
		dataJson : window.dataJson,
		selector : ".ac-tem-pair .ac-tem-content",
		 pageTag : utility.pageTag(),
		submitCb : function(data){
			if(utility.pageTag()[2] == "demo") return;
			// 提交
			var gamePlay = $("[name=gamePlay]"),
				input = gamePlay.find("input[type=hidden]");
			$(input).each(function(i,v){
				var $v = $(v),
					$name = $v.attr("name"),
					$val = data[$name];
				// 如果没有键
				if(!$val) return true;
				if($name == "resultArr") $val = $val.join(",");
				$v.val(data[$name]);
			});
			gamePlay.get(0).submit();
		}
	});

;(function(){

	var 
	getData = (function(){

		var
		sendForm = $("[name=class-info]"),
		sendUrl = sendForm.attr("action") || "/ac/getStat",
		sendData = sendForm.serialize(),
		dataFlag = $("[data-flag]");

		return function(cb){
				$.ajax({
					// url : "/api/ac/getStat", 
					url : sendUrl,
					data : sendData,
					dataType : "json",
					success : function(r){
						var status = r.status,
							data = r.data;
						if(status == 1){
							if(typeof(cb) == "function") cb.call(null,dataFlag,data);
								// else updataFn(dataFlag,data);
						} 
					}
				});
			}	
	})(),
	showResult = function(){
		$(".ac-tem-result-multi").show();
		$(".ac-tem-result-wait,.ac-tem-result-mask").hide();
	}
	
	$(".wait-tips-close").on("click",function(){
		$(this).closest(".ac-tem-result-wait").hide().siblings(".ac-tem-result-mask").hide();
	});

	// 老师端倒计时获取结果 一对一
	;(function(){
		var result = $(".ac-tem-result");
		if(!result[0] || !dataJson ) return;

		var start = (dataJson.workTime + dataJson.closeTime + (dataJson.bufferTime || 0 )) / 1e3;
			
		var timmer = $(".ac-timmer"),
			getHTML = function(level,count){
				return '<em class="l-tip">Student\'s grade：</em><span class="level'+ level +'">'+ ['Do better','Very good','Excellent'][level] +'</span>'
			},
			interval;

		timmer.countDown({
			start : start,
			startFn : function(r,t){
				interval = t;
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r,t){
				// 清除轮询
				clearInterval(getTag);
				// 时间结束 直接给出最差成绩
				result.html(getHTML(0,0));
				// 显示结果
				showResult();
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});

		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				// 显示结果
				showResult();
				// 填入结果
				result.html(getHTML(data.level,data.goCount));
				// 清除轮询
				clearInterval(getTag);
				// 清除倒计时定时器
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
		var result = $(".ac-tem-result-multi");
		if(!result[0] || !dataJson ) return;
		var start = (dataJson.workTime + dataJson.closeTime + (dataJson.bufferTime || 0 )) / 1e3,
			timmer = $(".ac-timmer"),
			updataFn = function(tar,data){
				$(tar).each(function(i,v){
					var $v = $(v),
						$flag = $v.attr("data-flag");
					$v.text(data[$flag]);
				});
			},
			interval;

		timmer.countDown({
			start : start,
			startFn : function(r,t){
				interval = t;
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r,t){
				// 时间结束 清除轮询
				clearInterval(getTag);
				// 显示结果
				showResult();
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});

		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				updataFn(dataFlag,data);
				// 全部完成
				if(data.answer_all){
					// 显示答案
					showResult();
					// 清除轮询
					clearInterval(getTag);
					// 清除倒计时定时器
					clearInterval(interval);
					// 定时器归零
					timmer.find("span").text("00:00");
					// 输出完成标志
					acUtility.resultStatus.setEnd();
				}
			});
		}, 3000);
	})();

	// 老师发题说明
	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();

	// 学生完成页面 播放完成音乐
	if($(".ac-stu-results").length > 0){
		var
		completeAudio = $("[complete-audio-url]").attr("complete-audio-url"),
		completeFlag = window.setInterval(function(){
			var swf = $("#acplay").get(0);
			// console.log(typeof(swf.playSound) == "function");
			if(typeof(swf.playSound) == "function" && !!completeAudio){
				swf.playSound(completeAudio);
				clearInterval(completeFlag);
			}
		},100);
	}


})();


});