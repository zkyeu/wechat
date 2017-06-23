/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2016-02-12
 */
(function(){ 
    var aPage=$("[data-init]");
    var arr=[];
    aPage.each(function() {
        arr.push($(this).attr("data-init"));
    });
    seajs.use(arr);
})();