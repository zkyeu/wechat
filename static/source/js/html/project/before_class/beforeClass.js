define("beforeClass",["utility","acsoundPlay"],function(require,exports,module){
	var utility = require("utility"),
		returnTime = utility.returnTime,
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
				html = [];

			html.push('<div class="pair-wrap pair-wrap-'+ dataArr.length +''+ (isOpen ? " pair-wrap-open" : "") +'">');
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
			if($('#promptBox').length>0){
				html.push('</ul><div class="mask-box"></div></div>');
			}else{
				html.push('</ul></div>');
			}
				
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
				me.timmerWrap = $(me.configs.timmer);
				me.timmerWrap.countDown({
					start : closeTime/1e3,
					targetFn : function(r,t){
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
				workTime = dataJson.workTime/1e3;
			$(selector).find(".pair-wrap").removeClass("pair-wrap-open");
			if(typeof(showCallback) == "function"){
				window.setTimeout(function(){
					showCallback();
				},550);
			}
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
											var timmer_c = 0;
											var endtimmer = window.setInterval(function(){
												timmer_c++;
												// console.log(timmer_c);
												if(me.datas.playEnd || timmer_c>=3){
													clearInterval(endtimmer);
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
											},1000);

										}
									});
								},1500);				
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

	window.showCallback = function(){
		if($('#promptBox').length <= 0) return;
		var dl = $(".pair-wrap dl");
		dlFirst = dl.eq(0),
		dlDatapair = dlFirst.attr('datapair'),
		datasn = dlFirst.attr('datasn'),
		dlpairTrue =  dl.filter("[datapair="+dlDatapair+"][datasn!="+datasn+"]"),
		dlpairFalse = dl.filter("[datapair!="+ dlDatapair +"]").eq(0);
		

		dlFirst.after('<div id="handIcon0" class="hand-icon"></div>');
		dlpairFalse.after('<div id="handIconF"  class="hand-icon"></div>');
		dlpairTrue.after('<div id="handIconT"  class="hand-icon"></div>');

		//手型控制
		var handIcon0 = $('#handIcon0');
		var handIconF = $('#handIconF');
		var handIconT = $('#handIconT');
		
		dlFirst.trigger("click");
		handIcon0.show();
		window.setTimeout(function(){
			$('#dlFirst').hide();
			handIcon0.hide();
			handIconF.show();

			dlpairFalse.trigger("click");
			window.setTimeout(function(){
				handIconF.hide();
				dlFirst.trigger("click");
				handIcon0.show();
				window.setTimeout(function(){
					dlpairTrue.trigger("click");
					handIcon0.hide();
					handIconT.show();
					window.setTimeout(function(){
						handIconT.hide();
					},600);
				},600);
			},2000);
		},600);
	}


});

//不再提醒cookie
(function(){
	$('#nPrompt').on('click',function(){
		var date = new Date();
        var expiresTime = new Date(date.getTime() + 60000*60*24*365);
        document.cookie = "nPromptCookieName = true;path=/;expires=" + expiresTime.toGMTString() + ";";
	});
})();