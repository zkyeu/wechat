/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
	var aPage=$("[data-init]");
	var arr=[];
	aPage.each(function() {
		arr.push($(this).attr("data-init"));
	});
    seajs.config({
        alias: {
            "my_schedule": "/js/html/project/my_schedule/my_schedule.js",
            "m_cont": "/components/html/my_schedule/js/modules/m_cont.js",
            "tipBox": "/components/html/my_schedule/js/modules/tipBox.js",
            "m_s_evaluate": "/components/html/my_schedule/js/modules/m_s_evaluate.js",
            "pagination": "/components/lib/pagination/pagination.js",
            "swf": "/components/lib/swf/swf.js"
        }
    });
    seajs.use(arr);
})();
