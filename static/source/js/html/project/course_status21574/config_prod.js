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
            "course_status21574": "/static/js/html/project/course_status21574/course_status21574.js",
            "course": "/static/components/html/course_status21574/js/course.js",
            "pagination": "/static/components/lib/pagination/pagination.js"
        }
    });
    seajs.use(arr);
})();
