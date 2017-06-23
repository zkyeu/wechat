/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(chengxiaosong@51talk.com)
 * @update:  2017-01-05
 * @note: base
 */
;(function(){ 
	var aPage=$("[data-init]");
	var arr=[];
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
    seajs.use(arr);
})();