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
            "my_schedule": "/static/js/html/project/up_course21574/up_course21574.js",
            "course": "/static/components/html/up_course21574/js/course.js",
            "tipBox": "/static/components/html/my_schedule/js/tipBox.js",
            "pagination": "/static/components/lib/pagination/pagination.js"
        }
    });
    seajs.use(arr);
})();
