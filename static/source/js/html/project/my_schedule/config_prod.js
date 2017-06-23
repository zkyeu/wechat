/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2016-05-05
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
            "my_schedule": "/static/js/html/project/my_schedule/my_schedule.js",
            "m_cont": "/static/components/html/my_schedule/js/m_cont.js",
            "tipBox": "/static/components/html/my_schedule/js/tipBox.js",
            "m_s_evaluate": "/static/components/html/my_schedule/js/m_s_evaluate.js",
            "pagination": "/static/components/lib/pagination/pagination.js",
            "swf": "/static/components/lib/swf/swf.js"
        }
    });
    seajs.use(arr);
})();
