define("acteaAll",["utility"],function(require,exports,module){
	var 
	utility = require("utility"),
	getResultStatus = function(ifr){
		return (!!ifr.contentWindow.acUtility && ifr.contentWindow.acUtility.resultStatus) || {isStart:function(){return false;}};
	},
	disCb = ((typeof(window.disCb) == "function")&&window.disCb) || function(){
		acUtility.alert({
			content:"Please wait for the student to complete the game.",
			width:310
		});	
	}

	/*var teaall = $(".ac-tem-tea-all");
	$(".ac-tem-tit").on("click",function(){
		teaall.height(teaall.height() - 1);
	});

	$(".ac-tea-all-switch").on("click",function(){
		teaall.width(teaall.width() - 1);
	});*/

	var pageTag = utility.pageTag();

	if(pageTag[0] == "all"){
		disCb = ((typeof(window.disCb) == "function")&&window.disCb) || function(){
			acUtility.acAlert({
				content:"Please wait for the student to complete the game."
			});	
		}
		// 新页面
		initSendAll();
	}else{
		// 老页面
		acUtility.acLoading.open({
			mask:true,
			content:"loading"
		});		
		
		;(function(){
			// switch 切换
			var switcher = $(".ac-dialog-switch"),
				li = switcher.find("li"),
				curLi = li.eq(0),
				curClass = "cur",
				ifr = $(".ac-dialog-ifr"),
				ifrs = ifr.find("iframe"),
				curIfr = ifrs.eq(0),
				isStart = function(){
					return getResultStatus(curIfr[0]).isStart();
				}
				// 输出
				acUtility.isStart = isStart;

			switcher.on("click","li",function(){
				var self = $(this);
				if(self.hasClass(curClass)) return;
				// 当前正在进行中
				if(isStart()){
					disCb.call(null);
					return;
				}

				var index = self.index();

				curIfr.removeClass("cur");
				curIfr = ifrs.eq(index).addClass("cur");

				curLi.removeClass(curClass);
				curLi = self.addClass(curClass);
			});

			window.onload = function(){
				// 等iframe加载完
				// 关闭loading
				window.setTimeout(function(){
					acUtility.acLoading.close();
				},2200);	
				// send 点击
				$.each(ifrs,function(i,v){
					var _body = $(v.contentWindow.document.body);
					_body.on("click.k",".btn-teasend,.s-t-s",function(){
						li.eq(i).addClass("is-send");
					});
				});
			}

		})();

	}

function initSendAll(){
	var	allswitch = $(".ac-tea-all-switch");
		controller = allswitch.find(".ac-tea-all-controller"),
		tips = allswitch.find(".ac-tea-all-tips"),
		ifrWrap = $(".ac-tea-all-ifr"),
		curIfr = null,
		curClass = "cur",
		ifrData = dataArr.arr,
		dataLength = ifrData.length,
		loadIfr = function(index){
			var _index = String(index);
			if(!!curIfr) curIfr.removeClass(curClass);
			if(loadedIfr[_index]){
				loadedIfr[_index].addClass(curClass);
				curIfr = loadedIfr[_index];
			}else{
				var ifr = $('<iframe src="'+ dataArr.arr[index] +'" scrolling="no" frameborder="0" class="cur"></iframe>');
				ifr.on("load",function(){
					$(ifr[0].contentWindow.document.body).find(".ac-send").on("click.c",function(){
						li.eq(index).addClass("is-sended send-success");
					});
					curIfr = ifr;
					loadedIfr[_index] = ifr;
				});
				ifrWrap.append(ifr);
			}
		},
		loadedIfr = {};
		loadIfr(0);
	
	// 一对多控制
	for(var i=1;i<=dataLength;i++){
		controller.append('<li' + (i==1? " class=cur" : '') + '>'+i+'</li>');
	}

	// switch 切换
	var li = controller.find("li"),
		curLi = li.eq(0),
		isStart = function(){
			return getResultStatus(curIfr[0]).isStart();
		}
		// 输出
		acUtility.isStart = isStart;

	controller.on("click","li",function(){
		var self = $(this);
		if(self.hasClass(curClass)) return;

		// 当前正在进行中
		if(isStart()){
			disCb.call(null);
			return;
		}

		var index = self.index();
		curLi.removeClass(curClass+" send-success");
		curLi = self.addClass(curClass);

		loadIfr(index);
	});
	
	window.setTimeout(function(){
		allswitch.fadeIn("normal",function(){
			window.setTimeout(function(){
				controller.animate({
					left : (6-dataLength) * (25+7)
				},800,function(){
					tips.animate({
						opacity : 1,
						bottom : -39
					},"normal",function(){
						window.setTimeout(function(){
							tips.animate({
								opacity : 0,
								bottom : -47
							},function(){
								tips.hide();
							});
						},2000);
					});
				});
			},400);
		});
	}, 600);
}

});