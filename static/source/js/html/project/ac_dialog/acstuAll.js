define("acstuAll",["utility"],function(require,exports,module){
	var 
	utility = require("utility"),
	ifr = $(".ac-dialog-ifr iframe"),
	timmer = $(".play-all-timmer>i"),
	que = $(".play-all-detail>i"),
	initFlag = false,
	flag = 0,
	data = dataArr.arr,
	buffter = dataArr.buffer,
	dataCache = [],
	_deftime;

	ifr.on("load",function(){
		// 检测是否是拉取的src
		var src = ifr.attr("src");
		if($.inArray(src,dataCache) > -1){
			// 如果加载的是结果页面
			_deftime.updateStart(buffter);
			return;
		};
		dataCache.push(src);

		// load +1
		flag++;
		// 填入第几题
		que.text(flag);
		// 开始倒计时
		_deftime = utility.deftime({
			start : data[flag-1][1]+buffter,
			startFn : function(r){
				// timmer.text(r);
			},
			targetFn : function(r){
				// timmer.text(r);
				if(flag == data.length) return window.location.assign(dataArr.result);
				ifr.attr("src",data[flag][0]);
			}
		});
		// 第一次初始化
		if(!initFlag){
			// timmer.closest(".play-all-timmer").show();
			que.closest(".play-all-detail").show();
			initFlag = false;
		}
	});
	// 加载第一个ifr
	ifr.attr("src",data[flag][0]);
	
});