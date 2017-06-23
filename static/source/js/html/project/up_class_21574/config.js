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
            "up_class_21574": "/js/html/project/up_class_21574/up_class_21574.js",
            "up_class_l": "/components/html/up_class_21574/js/modules/up_class_l.js",
            "up_class_m": "/components/html/up_class_21574/js/modules/up_class_m.js",
            "up_class_evaluate": "/components/html/up_class_21574/js/modules/up_class_evaluate.js",
            "tipBox": "/components/html/my_schedule/js/modules/tipBox.js",
            "pagination": "/components/lib/pagination/pagination.js",
            "ZeroClipboard": "/components/lib/ZeroClipboard/ZeroClipboard.min.js",
            "swf": "/static/components/lib/swf/swf.js"
        }
    });
    seajs.use(arr);
})();
