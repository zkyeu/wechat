/**
 * 配置路由
 * @file：   config.js
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
    var oContainer  = $("[data-init]"),
        oPage       = oContainer ? oContainer.data("init") : "init",
        src         = $("#seajsnode").attr("src"),
        version     = src.lastIndexOf("?")>0 ? src.substring(src.lastIndexOf("?")+1) : "20170605";

    seajs.config({
        map:[
            [/^(.*\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });

    seajs.use(oPage);
})();