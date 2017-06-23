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
				startFn : Function(),
				// 到达时callback
				targetFn : Function()
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

			// 对外提供修改内部start
			return {
				updateStart : function(t){
					start = t;
				},
				clearTimer : function(){
					window.clearInterval(timer);
				}
			}
		},
		// 秒转分
		me.returnTime = function(r){
			var _r = +r;
			if(isNaN(_r) || _r>3600) return null;
			var t1 = parseInt(_r/60);
			if(t1 < 1) return "00:" + me.formatTime(_r);
			
			var t2 = _r%60;
			return me.formatTime(t1) + ":" + me.formatTime(t2);
		},

		me.formatTime = function(t){
			return t <= 9 ? "0" + t : t;
		}

		me.pageTag = function(){
			var pageTag = $("[page-tag]").attr("page-tag");
			if(!pageTag) return [];
			pageTag = pageTag.split(",");
			return pageTag;
		}

		me.cookieFn = {
		    set:function(name,value,days,path,domain,secure){
		        document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)
		        +(days?"; expires="+this.setDays(days):"")
		        +(path?"; path="+path:"; path=/")
		        +(domain?"; domain="+domain:"")
		        +(secure?"; secure":"");
		    },
		    get:function(name){
		        var cookie=document.cookie.split("; ");
		        for(var i=0;i<cookie.length;i++){
		            var arr2=cookie[i].split("=");
		            if(decodeURIComponent(arr2[0])===name){
		                return decodeURIComponent(arr2[1]);
		            }
		        }
		        return "";
		    },
		    del:function(name){
		        this.set(name,"",-1);
		    },
		    setDays:function(days){
		        var date=new Date();
		        date.setDate(date.getDate()+days);
		        return date.toGMTString();
		    }
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

		me.acConfirm = (function(){
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
						zIndex : 2002,
						mask : true,
						maskOpacity : 0.5,
						type : "confirm",
						sureCb : null,
						cancelCb : null,
						alertCb : null,
						content : "",
						btnClose : true,
						myClass: null,
						btns : {
							confirm : '<a href="javascript:void(0)" cb="sure" class="btn-sure">Yes</a><a href="javascript:void(0)" cb="cancel" class="btn-cancel">Cancel</a>',
							alert : '<a href="javascript:void(0)" cb="alert" class="btn-alert">Yes</a>'
						}
					},
					o = $.extend({},defaults,options);

					if(!acConfirm){
						acConfirmWrap = $('<div class="ac-confirm-wrap"></div>');
						if(!!o.myClass) acConfirmWrap.addClass(o.myClass);
						acconfirmContent = $('<div class="ac-confirm-content"></div>');
						acconfirmBtn = $('<div class="ac-confirm-btn"></div>');
						acConfirmWrap.css({
						    "zIndex":o.zIndex
						});
						
						acconfirmMask = $('<div class="ac-confirm-mask"></div>');
						acconfirmMask.css({
							"position":"fixed",
							"width":"100%",
							"height":"100%",
							"left":0,
							"top":0,
							"zIndex":--o.zIndex,
							"background":"#000"
						});

						acConfirmWrap.append(acconfirmContent);
						acConfirmWrap.append(acconfirmBtn);
						acConfirm = acConfirmWrap.add(acconfirmMask);
						acConfirm.hide().appendTo("body");
					}

					acconfirmContent.html(o.content);
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

				
					// 设置mask
					acconfirmMask[o.mask ? "show" : "hide"]();
					o.mask ? acconfirmMask.css("opacity",o.maskOpacity).show() : acconfirmMask.hide();
					acConfirmWrap.show();
				}

			return confirm;
		})();

		me.acAlert = function(options){
			var defaults = {
				type : "alert"
			},
			o = $.extend({},defaults,options);
			me.acConfirm(o);
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
				},
				// getScroll
				getScroll : function(options){
					var defaults = {
						cursorcolor : "#dab972",
						horizrailenabled : false,
						cursorborder : 0
					},
					o = $.extend({},defaults,options),
					self = $(this);
					seajs.use("niceScroll",function(){
						self.niceScroll(o);
					});
					return self;
				},
				// deftime
				countDown : function(options){
					var defaults = {
						innerSel : "span",
						start : null,
						startFn : Function(),
						targetFn : Function(),
						isFormat : true,
						targetShow : true
					},
					o = $.extend({},defaults,options),
					self = $(this),
					innerSel = self.find(o.innerSel),
					start = +(o.start == null ? self.attr("left-time")||0 : o.start);
					// 如果是免费用户
					if($("[is-free]").attr("is-free") == "1") return;
					var timmerFn = utility.deftime({
						start : start,
			            startFn : function(r,t){
			                innerSel.text(o.isFormat ? utility.returnTime(r) : r);
			                o.startFn(r,t);
			            },
			            targetFn : function(r,t){
			            	if(o.targetShow) innerSel.text(o.isFormat ? utility.returnTime(r) : r);
			                o.targetFn(r,t);
			            }
					});

					return {
						self : self,
						timmerFn : timmerFn
					}
				},
				// tips
				showScroll : function(options){
					var defaults = {
						outer : "ul",
						inner : "li",
						speed : 25,
						space : 100
					},
					o = $.extend({},defaults,options);

					var 
					self = $(this),
					w1 = self.width(),
					inner = self.find(o.inner),
					w2 = inner.width();

					if(w1 >= w2) return;

					var
					outer = self.find(o.outer),
					left = 0;

					outer.append(inner.clone().css({marginLeft:o.space}));
					// return;
					window.setTimeout(function(){
						window.setInterval(function(){
							left = Math.abs(left) >= (w2+o.space) ? 0 : left - 1;
							outer.css("left",left);
						},o.speed);
					},800);

				},

				choiceFn : function(options){
					var defaults = {
						choiceSel : ".choice-sel",
						tagSel : ".choice-btn",
						choiceClass : "is-chosen",
						dataInput : "[name=g_section]",
						dataFlag : "data-choice"
					},
					o = $.extend({},defaults,options),
					self = $(this),
					dataInput = self.find(o.dataInput),
					choiceCache = null;
					

					self.on("click",o.choiceSel,function(){
						var _self = $(this);
						if(_self.hasClass(o.choiceClass)) return;
						if(!!choiceCache) choiceCache.removeClass(o.choiceClass);
						_self.addClass(o.choiceClass);
						dataInput.val(_self.attr(o.dataFlag)||"");
						choiceCache = _self;
					});

					return self;
				},

				acCarousel : function(options){
					var defaults = {
						leftBtn : "left-btn",
						rightBtn : "right-btn",
						outer : "ac-drag-target-carousel",
						inner : "li",
						callback : null,
						curClass : "curli",
						btnWrap :  "carousel-btns",
						leftBtnDis : "left-btn-dis",
						rightBtnDis : "right-btn-dis"
					},
					configs = $.extend({}, defaults ,options),
					self = $(this);

					if(!self[0]) return;

					var
					outer = self.find("."+configs.outer),
					inner = outer.find(configs.inner),
					length = inner.length,
					height = inner.outerHeight(),
					num = 0,
					curli,
					leftBtn,
					rightBtn,
					wrapT,
					move = function(n){
						leftBtn[ (n > 0 ? "remove" : "add") + "Class" ](configs.leftBtnDis);
						rightBtn[ (n < length - 1 ? "remove" : "add") + "Class" ](configs.rightBtnDis);
						curli.removeClass(configs.curClass), curli = inner.eq(n).addClass(configs.curClass);
						outer.stop().animate({
							top : -n * height
						},function(){
							typeof(configs.cb) == "function" && configs.cb(n);
						});
						typeof(configs.callback) == "function" && configs.callback(wrapT.find("i"),n);
					},
					btnFn = function(type){
						switch(type){
							case "left":
							if(num > 0) num--, move(num);
							break;

							case "right":
							if(num < length-1) num++, move(num);
							break;
						}
					},
					moveTo = function(c){
						if(c>length-1 || c<0) return;
						move(c);
						num = c;
					}

					;(function(){
						var btnWrap = $('<div class='+ configs.btnWrap +'></div>');
							wrapT = $('<p><i>1</i>/'+ length +'</p>');

							leftBtn = $('<span class="'+ configs.leftBtn + ' ' + configs.leftBtnDis +'"></span>');
							rightBtn = $('<span class='+ configs.rightBtn +'></span>');
						self.append(btnWrap.append(leftBtn.add(wrapT).add(rightBtn)));
					})();

					curli = inner.eq(num).addClass(configs.curClass);

					rightBtn.on("click",function(){
						btnFn("right");
					});

					leftBtn.on("click",function(){
						btnFn("left");
					});

					return {
						moveTo : moveTo,
						self : self,
						length : length
					};
				}
			}
		);
	})(jQuery);


	// 公用执行
	;(function(){
		// demo点击
		;(function(){
			var demo_btn = $(".ac-tea-demo");
			if(!demo_btn[0]) return;
			demo_btn.on("click",function(){
				$($(window)[0].parent.document).find(".ac-tea-all-switch").hide();
			});
		})();
		// back 点击
		;(function(){
			var back_btn = $("a");
			back_btn = back_btn.filter(":contains('back')").add(back_btn.filter(":contains('Back')"));
			back_btn = back_btn.filter(":not('.ac-close')");
			if(!back_btn[0]) return;
			back_btn.on("click",function(){
				$($(window)[0].parent.document).find(".ac-tea-all-switch").show();
			});
		})();		


		// 滚动条
		$(".acScroll,.ac-dialog-content,.ac-popup-content").filter(":not('.noscroll')").acScroll();

		// demo
		;(function(){
			var demo = $(".ac-swf-demo");
			if(!demo[0] || utility.pageTag()[1]=="tea") return;
			var skip = demo.find(".skip"),
				notip = demo.find(".notip"),
				href = skip.attr("href");
			// console.log(utility.cookieFn.get($("[name=cookieName]").val()));
			notip.on("click",function(){
				utility.cookieFn.set($("[name=cookieName]").val(),1,1000);
				window.location.assign(href);
			});

			window.swfplayEnd = function(){

				utility.deftime({
					start : 5,
					startFn : function(r){
						skip.html('<em style="color:#f8fc54;font-style:normal;">'+r+'</em>秒后跳过');
					},
					targetFn : function(){
						window.location.assign(href);
					}
				});
			}
		})();

		// 老师端发送按钮
		;(function(){
			var disBtn = $(".btn-disabled");
			if(!disBtn[0]) return;
			disBtn.removeClass("btn-disabled").prop("disabled",false);
			return;

			var sendWrap = disBtn.closest(".ac-tem-send"),
				sendTip = $('<span class="btn-send-tip"></span>');
			sendWrap.css("position","relative").append(sendTip);
			setTimeout(function(){
				var _time = 250;
				;(function(){
					var me = arguments.callee;
					sendTip.animate({
						"marginLeft" : 95
					},_time,function(){
						sendTip.animate({
							"marginLeft" : 115
						},_time,function(){
							me();
						});
					});					
				})();

				sendTip.css("visibility","visible");
				disBtn.removeClass("btn-disabled").prop("disabled",false);
			},2000);
		})();

		// 加载 在页面回调
		;(function(){
			var Cb = window["utilityReady"];
			if(typeof(Cb) == "function") Cb.call(null);
		})();

		// 播放提示
		;(function(){
			var playTip = $(".play-tip");
			if(!playTip[0]) return;
			
			// 如果是老师页面
			if($(".ac-tem-tea")[0] || utility.pageTag()[1] == "tea"){
				playTip.addClass("tea-tip");
			}

			playTip.animate({
				opacity : 1,
				bottom : -40
			},"1500",function(){
				window.setTimeout(function(){
					playTip.animate({
						opacity : 0,
						bottom : -48
					},function(){
						playTip.hide();
					});
				},2500);
			});
		})();
		
		// 新版手型
		;(function(){
			return;
			var pageTag = utility.pageTag();
			if(pageTag[0] != "pair" || pageTag[1]=="tea") return;
			var me = {};
			if (!window.location.origin){
		    	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: "");
		    }

			var src = $("script[src*=vendor]").attr("src");
			if(!src) return;
			var _src = src.split("js")[0],
				path = "/images/html/ac_dialog/",
				host = (_src.indexOf("http") > -1) ? _src : location.origin;
			path = host + path,
			sel = "html,html .ac-tem .ac-tem-con .ac-tem-send .ac-btn";
			me.curCss = {};
			me.curCss.curCss1 = 'url("'+ path +'cur1.ico"),auto';
			me.curCss.curCss2 = 'url("'+ path +'cur2.ico"),auto';
			$("head").append('<style>'+sel+'{cursor:'+me.curCss.curCss1+'}</style>');
			$("html,.ac-btn").on("mousedown mouseup",function(e){				
				$(this).css({
					cursor : me.curCss[ "curCss" + ((e.type == "mousedown") ? "2" : "1") ]
				});
			});
		})();

	})();

	module.exports = utility;

});