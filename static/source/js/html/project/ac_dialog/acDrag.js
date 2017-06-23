define("acDrag",["utility"],function(require,exports,module){
	var utility = require("utility"),
		countDown = utility.countDown,
		pageTag = utility.pageTag();

	/*var con = $(".ac-tem-con"),
		$lili = $(".ac-drag-ul li");
		
	$lili.eq(0).on("click",function(){
		con.width(con.width() - 1);
	});
	$lili.eq(1).on("click",function(){
		con.height(con.height() - 1);
	});	*/
// return;
	;(function(){
		var t = $(".ac-drag-i");
		if(!t[0] || t.find("p").text() == "") return;
		window.setTimeout(function(){
			t.animate({
				left : 170
			},800,function(){
				window.setTimeout(function(){
					t.animate({
						left : -600
					});
				},5000);
			});
		},100);
	})();

	;(function($){
		$.dragInit = function(options){
			var
			dragDefaults =  $.dragDefaults,
			utility = dragDefaults.utility,
			configs = $.extend(true, {}, dragDefaults.configs, options),
			w = $(document),
			selector = $(configs.selector),
			_left,
			_top,
			dragTarget = null;

			// 初始化样式
			$.each(selector,function(i,v){
				var $v = $(v),
					defLeft = $v.offset().left,
					defTop = $v.offset().top;
				$v.data({
					defLeft:defLeft,
					defTop:defTop
				}).css({
					left : $v.offset().left,
					top : $v.offset().top
				});
			});

			selector.css({
				margin:0,
				position:configs.posType
			});

			// 绑定事件
			w.on({
				mousedown : function(e){
					var self = $(this);
					if(self.hasClass(configs.noDrag)) return;
					if(self.is(":animated")) self.stop();
					self.addClass(configs.isDrag);
					_left = e.pageX - self.offset().left,
					_top = e.pageY - self.offset().top;
					self.css("zIndex",++configs.zIndex);
					dragTarget = self;
				}
			},configs.selector);

			w.on({
				mousemove:function(e){
					if(dragTarget == null) return;
					var lt = {
						left : e.pageX - _left,
						top : e.pageY - _top,
						_X : e.pageX,
						_Y : e.pageY
					}

					if(configs.isLimit){
						// 限位
						lt = utility.limitFn(lt,configs.outer,dragTarget,configs.limitBuffer);

						if(!configs.canOuter && lt.isOverLimit){

							if(dragTarget == null) return;

							var arg = (!!$(configs.target)[0] && $.dragDefaults.utility.isInterFn(dragTarget,configs.target)) || {interTarget:null,dragTarget:dragTarget};

							(typeof(configs.upCallback) == "function") && configs.upCallback(arg);
							
							dragTarget.removeClass(configs.isDrag);
							dragTarget = null;

							return false;
						}

					}

					dragTarget.css(lt.lt);
					return false;
				},
				mouseup:function(){
					if(dragTarget == null) return;

					var arg = (!!$(configs.target)[0] && $.dragDefaults.utility.isInterFn(dragTarget,configs.target)) || {interTarget:null,dragTarget:dragTarget};

					(typeof(configs.upCallback) == "function") && configs.upCallback(arg);
					
					dragTarget.removeClass(configs.isDrag);
					dragTarget = null;
				}
			});

		}

		$.dragDefaults = {
			configs : {
				// 限位边界
				outer : window,
				// 限位开关
				isLimit : true,
				// 鼠标能否超出限位
				canOuter : true,
				// 限位buffer 所有数值为在原来的范围上缩减
				limitBuffer : {
					left : 0,
					top : 0,
					right : 0,
					bottom : 0
				},
				// mouseup回调
				upCallback : null,
				// target 目标
				target : "",
				// 需要拖拽的选择器
				selector : "li",
				// 定位方式
				posType : "absolute",
				// zindex 默认值
				zIndex : 100,
				// 不可拖动状态class
				noDrag : "no-drag",
				// 拖动过程状态class
				isDrag : "is-drag"
			},
			utility : {
				// 限位方法
				limitFn : function(lt,outer,inner,limitBuffer){
					var _outer = $(outer),
						left = lt.left,
						top = lt.top,
						pageX = lt._X,
						pageY = lt._Y,
						isWindow = outer == window,
						innerW = inner.outerWidth(),
						innerH = inner.outerHeight(),
						outerW = _outer.outerWidth(),
						outerH = _outer.outerHeight(),
						outerL = isWindow ? 0 : _outer.offset().left,
						outerT = isWindow ? 0 : _outer.offset().top,
						outerBorderLeftWidth = isWindow ? 0 : parseInt(_outer.css("borderLeftWidth")),
						outerBorderRightWidth = isWindow ? 0 : parseInt(_outer.css("borderRightWidth")),
						outerBorderTopWidth = isWindow ? 0 : parseInt(_outer.css("borderTopWidth")),
						outerBorderBottomWidth = isWindow ? 0 : parseInt(_outer.css("borderBottomWidth")),
						isOverLimit = false;

					// 左限位
					var maxLeft = outerL + outerBorderLeftWidth + limitBuffer.left;
					if(left < maxLeft)	left = maxLeft;
					if(pageX <= maxLeft) isOverLimit = true;

					// 右限位
					var maxRight = outerL + outerW - outerBorderRightWidth - innerW - limitBuffer.right;
					if(left > maxRight)	left = maxRight;
					if(pageX >= (maxRight + innerW)) isOverLimit = true;

					// 上限位
					var maxTop = outerT + outerBorderTopWidth + limitBuffer.top;
					if(top < maxTop) top = maxTop;
					if(pageY <= maxTop) isOverLimit = true;


					// 下限位
					var maxBottom = outerT + outerH-outerBorderBottomWidth - innerH - limitBuffer.bottom;
					if(top > maxBottom) top = maxBottom;
					if(pageY >= (maxBottom+innerH)) isOverLimit = true;

					return {
						lt : {
							left : left,
							top : top
						},
						isOverLimit : isOverLimit
					}
				},
				// 是否交叉
				isInter : function(_dragTarget,_target){
					var _dragTargetOffSet = _dragTarget.offset(),
						_targetOffSet =  _target.offset(),
						_dragTargetHeight = _dragTarget.outerHeight(),
						_targetHeight = _target.outerHeight(),
						_dragTargetWidth = _dragTarget.outerWidth(),
						_targetWidth = _target.outerWidth();

					// 纵向
					var max_h_t = _dragTargetOffSet.top + _dragTargetHeight - _targetOffSet.top,
						max_h_b = _dragTargetOffSet.top - _targetHeight - _targetOffSet.top,
						// 纵向中心距离
						disY = _dragTargetOffSet.top + _dragTargetHeight/2 - (_targetOffSet.top + _targetHeight/2);
						// 是否纵向交集
						max_h = max_h_t > 0 && max_h_b < 0;
						// 纵向中心距离
						disY = Math.abs(disY);

					// 横向
					var max_w_l = _dragTargetOffSet.left + _dragTargetWidth - _targetOffSet.left,
						max_w_r = _dragTargetOffSet.left - _targetWidth - _targetOffSet.left,
						// 横向中心距离
						disX = _dragTargetOffSet.left + _dragTargetWidth/2 - (_targetOffSet.left + _targetWidth/2);
						// 是否横向交集
						max_w = max_w_l > 0 && max_w_r < 0;
						// 横向中心距离
						disX = Math.abs(disX);

					return {
						isInter : max_h && max_w,
						disX : disX,
						disY : disY
					}
				},
				isInterFn : function(dragTarget,target){
					var _dragTarget = $(dragTarget),
						_target = $(target),
						_me = this;
					if(!_dragTarget[0] || !_target[0]) return;
					
					var res = {
						dis : Infinity,
						dragTarget : _dragTarget,
						interTarget : null
					};
					$.map(_target,function(v,i){
						var _v = $(v),
							isInter = _me.isInter(_dragTarget,_v);
							isInterFlag = isInter.isInter;
						if(!isInterFlag) return true;
						var x = isInter.disX,
							y = isInter.disY,
							l = x * x + y * y;
						if(l < res.dis) res.dis = l, res.interTarget = _v;
					});

					return res;
				}
			}
		}
	})(jQuery);

	// 全局变量
	var
	dragSuccess,
	acsoundPlayFn,
	playbtn = $(".play-btn"),
	playAudio = function(href){
		// alert(href);
		if(!href) return;
		var swf = $("#acplay").get(0);
		if(typeof(swf.playSound) == "function"){
			playbtn.removeClass("is-play");
			swf.playSound(href);				
		}
	},
	showText = function(text){
		if(!text.hasClass("isPosed")){
			text.css("visibility","hidden");
			text.css("marginLeft",-text.outerWidth()/2);
			text.css("visibility","visible");
			text.addClass("isPosed");
		}

		window.setTimeout(function(){
			var _text = text.clone().addClass("is-clone");
			text.parent().append(_text);
			_text.show();
			_text.stop(true,true).animate({
				top : -88,
				opacity : 0
			},3000,function(){
				_text.remove();
			});
		}, 200);
		// clearTimeout(text.timer);
		// console.log(text.timer);
		// text.timer = window.setTimeout(function(){
			// text.show();
			// text.stop(true,true).animate({
			// 	top : -88,
			// 	opacity : 0
			// },2000,function(){
			// 	text.hide();
			// 	text.css({
			// 		top:-24,
			// 		opacity:1
			// 	});
			// });				
		// },200);

	},
	showTips = function(noText){
		var self = this,
			audiourl = self.attr("audio-url");
		if(!!audiourl) playAudio(audiourl);
		if(noText) return;
		var text = self.find("span").not(".is-clone");
		if(!!text[0]) showText(text);
	},
	errorAudio = $("[error-audio-url]").attr("error-audio-url");

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

	// 拖拽初始化
	$.dragInit({
		selector : ".ac-drag-ul li",
		outer : ".ac-tem-con",
		target : ".ac-drag-target-wrap .ac-drag-target-ul .ac-drag-target-li,.curli .target-span",
		limitBuffer : {
			top : 70
		},
		canOuter : false,
		upCallback : function(isInter){
			// 无论是否交叉 都计数一次
			inputcount.val(++count);

			// 是否交叉
			var interTarget = isInter.interTarget,
				dragTarget = isInter.dragTarget,
				dragTargetData = dragTarget.data();

			// 没有交叉 或者 配对不成功
			if(interTarget == null || dragTarget.attr("data-drag") != interTarget.attr("data-drag")){
				dragTarget.animate({
					left : dragTargetData.defLeft,
					top : dragTargetData.defTop
				});

				if(interTarget != null){
					playAudio(errorAudio);
				}
				return;
			}
			// 配对成功
			(typeof(dragSuccess) == "function") && dragSuccess(dragTarget,interTarget);
		}
	});

	// 播放按钮
	;(function(){
		var playbtn = $(".play-btn");
		seajs.use("acsoundPlay",function(acsoundPlay){
			acsoundPlayFn = acsoundPlay;
			$(".play-btn").on("click",function(){
				$(".ac_tip").hide();
				var self = $(this),
					href = self.attr("yinpin"),
					playTag = !self.hasClass("is-play");
				acsoundPlay.playInit({
					href : href,
					playTag : playTag,
					// 播放
					startFn : function(){
						self.addClass("is-play");
					},
					// 暂停
					stopFn : function(){
						self.removeClass("is-play");
					},
					// 结束
					endFn : function(){
						self.removeClass("is-play");
					}
				});
			});			
		});
	})();


	// 老师发题说明
	;(function(){
		var tips = $(".ac-tem-tips-inner");
		if(!tips[0]) return;
		tips.showScroll();
	})();


	// 学生做题
	// type1
	// 已经lock的点击 层级修改 播放音效
	var form = $("[name=gamePlay]"),
		input = form.find("[name=drag_result]"),
		inputcount = form.find("[name=drag_gocount]"),
		val = +input.val() || 0,
		count = +inputcount.val() || 0,
		dragul = $(".ac-drag-ul"),
		dragli = dragul.find("li"),
		draglilength = dragli.length,
		submitFn = function(){
			if(pageTag[2] != "play") return;
			form[0].submit();
		}

	;(function(){
		if(pageTag[2] != "play") return;
		// 倒计时
		$(".ac-timmer").countDown({
			targetFn : function(){
				submitFn();
			}
		});
	})();

	;(function(){
		var topClass = "no-drag-top",
			zIndex = 10;
		dragul.on("click",".islocked",function(){
			var self = $(this);
			showTips.call(self);
			// if(self.hasClass(topClass)) return;
			/*var data = self.attr("data-drag"),
				topdrag = $("[data-drag="+data+"][class*="+topClass+"]");*/
			zIndex++;
			self.css("zIndex",zIndex);
			// self.addClass(topClass);
			// topdrag.removeClass(topClass);
		});		
	})();

	var dragType = $("[drag-type]").attr("drag-type");
	if(dragType == 2){
		// 改变判断标准
		draglilength = $(".target-span").length;
		// 翻页
		var acCarouselwrap = $(".ac-drag-target-div-in"),
			acCarouselbtns = acCarouselwrap.find(".carousel-btns i"),
			acCarouselul = acCarouselwrap.find(".ac-drag-target-carousel"),
			acCarouselli = acCarouselul.children("li"),
			acCarouselFn = acCarouselwrap.acCarousel({
				callback : function(i,n){
					i.text(n+1);
					_num = n;
					isMove = true;
				},
				cb : function(){
					isMove = false;
				}
			}),
			_num = 0,
			isMove = false;

		if(acCarouselli.length > 1) $(".carousel-btns").css("visibility","visible");

		// 拖拽样式2
		dragSuccess = function(dragTarget,interTarget){
			dragTarget.addClass("no-drag");
			input.val(++val);

			// 更新当条数据
			var dataLi = interTarget.closest("li"),
				dataLength = + (dataLi.attr("data-length"));
				dataLength--;
				dataLi.attr("data-length",dataLength);

			dragTarget.css({
				opacity : 0.6
			}).animate({
				left : interTarget.offset().left - (dragTarget.outerWidth() - interTarget.outerWidth())/2,
				top : interTarget.offset().top - (dragTarget.outerHeight() - interTarget.outerHeight())/2
			},function(){
				window.setTimeout(function(){
					dragTarget.fadeOut();
					var text = dragTarget.find("span").html();
					interTarget.replaceWith("<span class=drag-text>"+text+"</span>");
					showTips.call(dragTarget,true);

					// 全部做完
					if(val == draglilength){
						window.setTimeout(function(){
							submitFn();
						},2000);
						return;
					}

					// 当条做完
					if(dataLength == 0){
						if(isMove) return;
						if(_num < acCarouselFn.length-1){
							_num++;
						}else{
							var __num = acCarouselli.filter("[data-length!=0]").eq(0).index();
							_num = __num;
						}

						window.setTimeout(function(){
							acCarouselFn.moveTo(_num);
						},2200);
					}				
				},500);
			});

		}
	}else{
		// 拖拽样式1
		dragSuccess = function(dragTarget,interTarget){
			dragTarget.addClass("no-drag");
			input.val(++val);
			var targetwrap = interTarget.find(".target-ul"),
				target = targetwrap.find("li"),
				length = target.length,
				targeted = + targetwrap.attr("targeted");

			if(isNaN(targeted)){
				targeted = 1;
			}else{
				targeted++;
			}

			targetwrap.attr("targeted",targeted);

			var _i = Math.ceil(targeted/length) - 1,
				_g = targeted % length - 1;
			
			var lockli = target.eq(_g),
				left = lockli.offset().left - (122-84)/2,
				top = lockli.offset().top - 18 * _i - (122-84)/2 + 10;

			dragTarget.css({
				zIndex : 5 + _i
			}).animate({
				left : left,
				top : top
			},function(){
				dragTarget.addClass("islocked");
				/*var audiourl = dragTarget.attr("audio-url");
				if(!!audiourl) playAudio(audiourl);*/
				showTips.call(dragTarget);
				if(val == draglilength){
					window.setTimeout(function(){
						submitFn();
					},2000);
				}
			});
		}
	}


	// 老师结果
;(function(){

	var 
	getData = (function(){
		var 
		sendForm = $("[name=class-info]"),
		sendUrl = sendForm.attr("action") || "/ac/getStat",
		sendData = sendForm.serialize(),
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
			resultWrap = $("[data-flag=choice-result]"),
			level = ['Do better','Very good','Excellent'];

		timmer.countDown({
			startFn : function(r,t){
				interval = t;
				// 设置开始
				acUtility.resultStatus.setStart();
			},
			targetFn : function(r,t){
				// 清除轮询
				clearInterval(getTag);
				// 时间结束 没回答
				resultWrap.html(level[0]);
				// 显示答案
				showResult();
				// 输出完成标志
				acUtility.resultStatus.setEnd();
			}
		});

		var getTag = window.setInterval(function(){
			getData(function(dataFlag,data){
				resultWrap.html(level[data.level]);
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
				// 时间结束 清除轮询
				clearInterval(getTag);
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

})();




});