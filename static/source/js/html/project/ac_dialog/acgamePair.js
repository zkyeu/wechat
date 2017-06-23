define("acgamePair",["utility","acsoundPlay"],function(require,exports,module){
	var utility = require("utility"),
		acsoundPlay = require("acsoundPlay");

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
				isOpen : true,
				checkData : {
					"0" : "game-wrong",
					"1" : "game-right"
				},
				submitCb : null,
				timmer : ".timmer-wrap"
			},
			configs = $.extend({},defaults,options);

			if(!configs.dataJson) return;
			// 输出配置
			me.configs = configs;
			// 生成ui
			me.createUI();
			// 绑定事件
			me.bindEvent();
		}

		me.playSound = (function(){
			// 设置播放全局变量
			// console.log(me);
			acsoundPlay.getGlobal();
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
				html = [];

			html.push('<div class="game-wrap game-wrap-'+ dataArr.length +''+ (isOpen ? " game-wrap-open" : "") +'">');
			html.push('<ul class="clearfix">');
			$(dataArr).each(function(i,v){
				var 
				// 切割数据
				_v = v.split("|"),
				// 答案图片地址
				dataImg = _v[0],
				// dataPair 配对属性
				dataPair = _v[1],
				// 对错标识
				checkClass = me.configs.checkData[_v[2]],
				// 使用index作为唯一识别id
				dataSn = i;

				;(function(){
					// 输出recodeArr 默认为错
					me.datas.recodeArr.push(me.setCheck(v,"0"));		
				})();


			html.push('<li>\
                    <dl dataSn="'+ dataSn +'" dataPair="'+ dataPair +'"'+ (checkClass ? 'class="'+checkClass+'"' : '')  +' >\
                        <dt>\
                            <img src="'+ me.updateImg("right") +'" class="game-right" />\
                            <img src="'+ me.updateImg("wrong") +'" class="game-wrong" />\
                        </dt>\
                        <dd class="front">\
                            <img src="'+ me.updateImg("front") +'" />\
                        </dd>\
                        <dd class="back">\
                            <img src="'+ dataImg +'" class="game-answer" />\
                            <img src="'+ me.updateImg("back_base") +'" />\
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

			// 倒计时至开始游戏
			;(function(){
				var timmer = $(me.configs.timmer);
				me.deftime({
					start : closeTime/1e3,
					startFn : function(r){
						timmer.html('<i>'+ r +'秒</i> 后开始答题');
					},
					targetFn : function(r){
						// 开始游戏
						me.startGame();
					}
				});
			})();
		}
		// 开始游戏
		me.startGame = function(){
			var configs = me.configs,
				selector = configs.selector,
				dataJson = configs.dataJson,
				workTime = dataJson.workTime/1e3,
				timmer = $(configs.timmer);
				me.timmer = timmer;
			$(selector).find(".game-wrap").removeClass("game-wrap-open");
			me.deftime({
				start : workTime,
				startFn : function(r,t){
					// 记下开始游戏定时器 在提交时清除
					me._timmer = t;
					timmer.html('距离答题结束还有 <i>'+ r +'秒</i>');
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
							timmer : me.timmer,
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

			$(selector).on("click","ul li dl",function(){
				var self = $(this),
					gameWrap = self.closest(".game-wrap");

				if(gameWrap.hasClass("game-wrap-open")) return;	
				
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
							me.playSound.success();
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
									var submitCb = me.configs.submitCb;
									if(typeof (submitCb) == "function"){
										submitCb.call(null,{
											goCount : me.datas.goCount,
											bestScore : me.datas.score,
											resultArr : me.datas.recodeArr,
											reset : me.reset,
											timmer : me.timmer,
											playTime : me.playTime
										})
									}

								}
							});
						},500);				
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
						},800);
					}
				}
			});

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
		selector : ".game-pair .game-content",
		submitCb : function(data){
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

var getData = (function(){

		var 
		input = $("[name=class-info] input[type=hidden]"),
		sendData = {},
		dataFlag = $("[data-flag]");

		$(input).each(function(i,v){
			var $v = $(v);
			sendData[$v.attr("name")] = $v.val();
		});
			 
		return function(cb){
				$.ajax({
					// url : "/api/ac/getStat", for test
					url : "/ac/getStat",
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
		})();

	// 老师端倒计时获取结果 一对一
	;(function(){
		var result = $(".game-result-teacher");
		if(!result[0] || !dataJson ) return;
		
		var start = (dataJson.workTime + dataJson.closeTime + (dataJson.bufferTime || 0 )) / 1e3;
			result.html('<p class="game-result-timmer">Time remaining: <span>'+ start +'</span> seconds</p>');
		var timmer = result.find(".game-result-timmer>span"),
			getHTML = function(level,count){
				var html = [];
				html.push('<div class="game-result-con">');
					html.push('<h4 class="level'+ level +'">'+ ['Do better','Very good','Excellent'][level] +'!</h4>');
					html.push('<p>'+ count +'clicks</p>');
				html.push('</div>');
				return html.join("");
			},
			interval;
		pairsFn.deftime({
			start : start,
			startFn : function(r,t){
				interval = t;
				timmer.text(r);
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(){
				// 清除轮询
				clearInterval(getTag);
				// 时间结束 直接给出最差成绩
				result.html(getHTML(0,0));
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});
		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				result.html(getHTML(data.level,data.goCount));
				// 清除轮询
				clearInterval(getTag);
				// 清除倒计时定时器
				clearInterval(interval);
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			});
		}, 3000);
	})();

	// 老师端倒计时获取结果 一对多
	;(function(){
		var result = $(".game-result-teacher-multi");
		if(!result[0] || !dataJson ) return;
		var start = (dataJson.workTime + dataJson.closeTime + (dataJson.bufferTime || 0 )) / 1e3,
			timmerWrap = result.find(".game-result-timmer");
			timmerWrap.html('Time remaining: <span>'+ start +'</span> seconds');
		var timmer = timmerWrap.find("span"),
			updataFn = function(tar,data){
				$(tar).each(function(i,v){
					var $v = $(v),
						$flag = $v.attr("data-flag");
					$v.text(data[$flag]);
				});
			}

		pairsFn.deftime({
			start : start,
			startFn : function(r,t){
				timmer.text(r);
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r){
				// 时间结束 去掉定时区 清除轮询
				timmer.text(r);
				clearInterval(getTag);
				acUtility.resultStatus.setEnd();
			}
		});
		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				updataFn(dataFlag,data);
			});
		}, 3000);
	})();

})();


});