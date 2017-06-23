/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2016-05-05
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
            "up_class_21574": "/static/js/html/project/up_class_21574/up_class_21574.js",
            "up_class_l": "/static/components/html/up_class_21574/js/up_class_l.js",
            "up_class_m": "/static/components/html/up_class_21574/js/up_class_m.js",
            "up_class_evaluate": "/static/components/html/up_class_21574/js/up_class_evaluate.js",
            "tipBox": "/static/components/html/my_schedule/js/tipBox.js",
            "pagination": "/static/components/lib/pagination/pagination.js",
            "ZeroClipboard": "/static/components/lib/ZeroClipboard/ZeroClipboard.min.js",
            "swf": "/static/components/lib/swf/swf.js"
        }
    });
    seajs.use(arr);
})();
