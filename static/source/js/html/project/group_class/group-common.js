define('group-common',[],function(reqire, exports, module){
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

	;(function($){
		$.playAudio =function(options){
			var configs = $.extend(true, {}, {
				player:$(".player").get(0),
				playBtn:$(".playBtn"),
				playingClass:"playing"
			}, options)	;

			var playBtn = configs.playBtn,player = configs.player;

			playBtn.click(function(){
				$(this).addClass(configs.playingClass);
				player.src = $(this).attr("audio-url");
				player.play();
			});

			player.addEventListener("ended",function(){
				playBtn.removeClass(configs.playingClass);
			});


		}
	})(jQuery);
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
					
				}
				return;
			}
			// 配对成功
			//(typeof(dragSuccess) == "function") && dragSuccess(dragTarget,interTarget);
		}
	});
	

});