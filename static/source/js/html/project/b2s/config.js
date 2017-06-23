/**
 * 配置路由
 * @file：   config.js
 * @author:  panqi(panqi@51talk.com)
 * @update:  2016-09-21
 * @note: base
 */
;(function(){ 
    var aPage=$("[data-init]");
    if(!aPage.get(0)) return;
    var getVersion=function(v){
        var src = $("script[src*=vendor]").attr("src"),
            version = "v=" + v;
        if(!!src && src.indexOf("?")>-1) version = src.substring(src.lastIndexOf("?")+1);
        return version;
    },
    arr=[],
    version = getVersion("20160920");       
    aPage.each(function() {
        arr.push($(this).attr("data-init"));
    });

    seajs.config({
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use(arr);
})();