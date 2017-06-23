define("utility",[],function(require,exports,module){
	// 模块输出
	var utility = new function(){
		var me = this;
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

			// 未进入倒计时先执行
			startFn(start);

			// 进入interval判断时 其实已经过了interval秒
			start -= interval/1e3;

			timer =	window.setInterval(function(){
				if(start <= target){
					// 完成
					clearInterval(timer);
					targetFn(start,timer);
				}else{
					// 进行中 传入定时器 可以在进行中判断清除
					startFn(start,timer);
					start -= interval/1e3;
				}
			},interval);
		}

	}

	// 公用输出
	
	window["acUtility"] = new function(){
		var me = this;

		me.resultStatus = (function(){
			var status = null,
				body = $("body");
			return {
				setStart : function(){
					status = 0;
					body.attr("data-status",status);
				},
				setEnd : function(){
					status = 1;
					body.attr("data-status",status);
				},
				isStart : function(){
					return status == 0;
				},
				isEnd : function(){
					return status == 1;
				},
				getStatus : function(){
					return status;
				}
			}
		})();

		me.acLoading = (function(){
			var acLoading = null,
				acloadingMask = null;
			return {
				open : function(options){
					var defaults = {
						zIndex : 100,
						mask : false,
						maskOpacity : 0.8,
						content : "正在努力加载中"
					},
					o = $.extend({},defaults,options);

					if(!acLoading){
						acLoading = $('<div class="acLoading-content"></div>');
						acLoading.css({
						    "zIndex":o.zIndex			
						});

						acloadingMask = $('<div class="acLoading-mask"></div>');
						acloadingMask.css({
							"zIndex":--o.zIndex,
							"opacity":o.maskOpacity
						});

						acLoading = acLoading.add(acloadingMask[o.mask ? "show" : "hide"]());
						acLoading.appendTo("body");
					}else{
						acLoading.show();
						acloadingMask[o.mask ? "show" : "hide"]();
					}
				},
				close : function(){
					if(!acLoading) return;
					acLoading.hide();
				}
			}
		})();

		me.confirm = (function(){
			var acConfirm,
				acconfirmMask,
				acConfirmWrap,
				contentCache,
				widthCache,
				acconfirmContent,
				typeCache,
				acconfirmBtn,
				confirm = function(options){
					var defaults =  {
						zIndex : 999,
						mask : true,
						maskOpacity : 0,
						type : "confirm",
						sureCb : null,
						cancelCb : null,
						alertCb : null,
						content : "",
						width : 330,
						btnClose : true,
						myClass: null,
						btns : {
							confirm : '<a href="javascript:void(0)" cb="sure" class="btn-sure">Yes</a><a href="javascript:void(0)" cb="cancel" class="btn-cancel">Cancel</a>',
							alert : '<a href="javascript:void(0)" cb="alert" class="btn-alert">Yes</a>'
						}
					},
					o = $.extend({},defaults,options);

					if(!acConfirm){
						acConfirmWrap = $('<div class="acconfirm-wrap"></div>');
						if(!!o.myClass) acConfirmWrap.addClass(o.myClass);
						acconfirmContent = $('<div class="acconfirm-content"></div>');
						acconfirmBtn = $('<div class="acconfirm-btn"></div>');
						acConfirmWrap.css({
						    "position": "fixed",
						    "padding":"15px 10px",
						    "left":"50%",
						    "top":250,
						    "background-color":"#fff",
						    "border":"1px solid #cecece",
						    "color":"#6e6e6e",
						    "zIndex":o.zIndex,
						    "word-break":"break-word",
						    "box-shadow":"0 0px 5px 0px rgba(0,0,0,0.2)"
						});
						
						acconfirmMask = $('<div class="acConfirm-mask"></div>');
						acconfirmMask.css({
							"position":"fixed",
							"width":"100%",
							"height":"100%",
							"left":0,
							"top":0,
							"zIndex":--o.zIndex,
							"background":"#000"
						});

						acconfirmBtn.css({
							"paddingTop":"15px",
							"text-align":"center"
						});

						$('<style>\
							.acconfirm-btn a{display:inline-block;width:98px;height:28px;line-height:30px;border:1px solid #ff8300;background-color:#ff8300;margin:0 5px;color:#fff;border-radius:4px;}\
							.acconfirm-btn a.btn-cancel{background-color:#fff;color:#ff8300;}\
							</style>').prependTo("body");

						acConfirmWrap.append(acconfirmContent);
						acConfirmWrap.append(acconfirmBtn);
						acConfirm = acConfirmWrap.add(acconfirmMask);
						acConfirm.hide().appendTo("body");
					}

					acConfirm.off("click.b").on("click.b","a",function(){
						var self = $(this),
							cb= self.attr("cb");
							callback = o[cb+"Cb"];
						(typeof(callback) == "function") && callback.call(null,acConfirm);
						o.btnClose && acConfirm.hide();
					});

					// 放置按钮
					;(function(){
						var type = o.type;
						if(type == typeCache) return;
						acconfirmBtn.html(o.btns[type]);
					})();

					// 放入content 设置位置
					;(function(){
						var content = o.content;
						if(content == contentCache) return;
						acconfirmContent.html(content);
						contentCache = content;
						acConfirmWrap.css({
							"visibility" : "hidden"
						});

						var width = o.width;
						if(width != widthCache){
							acConfirmWrap.css({
								"width":width
							});
							acConfirmWrap.css({
								"margin-left":-acConfirmWrap.outerWidth()/2
							});
							widthCache = width;
						}

						acConfirmWrap.css({
							"margin-top" : -acConfirmWrap.outerHeight()/2,
							"visibility" : "visible"
						});
					})();
						
					// 设置mask
					acconfirmMask[o.mask ? "show" : "hide"]();
					o.mask ? acconfirmMask.css("opacity",o.maskOpacity).show() : acconfirmMask.hide();
					acConfirmWrap.show();
				}

			return confirm;
		})();

		me.alert = function(options){
			var defaults = {
				type : "alert"
			},
			o = $.extend({},defaults,options);
			me.confirm(o);
		}

	}

	// 扩展jquery
	;(function($){
		$.extend(
			$.fn,{
				// getScroll
				acScroll : function(options){
					var defaults = {
						cursorcolor : "#ff8200",
						autohidemode: false
					},
					o = $.extend({},defaults,options),
					self = $(this);
					seajs.use("niceScroll",function(){
						self.niceScroll(o);
					});
					return self;
				}

			}
		);
	})(jQuery);


	// 公用执行
	;(function(){
		// 滚动条
		$(".acScroll,.ac-dialog-content,.ac-popup-content").filter(":not('.noscroll')").acScroll();

		// 老师端发送按钮
		;(function(){
			var disBtn = $(".btn-disabled");
			if(!disBtn[0]) return;
			setTimeout(function(){
				disBtn.removeClass("btn-disabled").prop("disabled",false);
			},2000);
		})();

		// 加载 在页面回调
		;(function(){
			var Cb = window["utilityReady"];
			if(typeof(Cb) == "function") Cb.call(null);
		})();
		

	})();

	module.exports = utility;

});