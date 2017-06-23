/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
	var aPage=$("[data-inits]");
	var arr=[];
	aPage.each(function() {
		arr.push($(this).attr("data-inits"));
	});
    seajs.config({
        alias: {
            "up_pre_m": "/components/html/up_c_pre/js/modules/up_pre_m.js",
        }
    });
    seajs.use(arr);
})();