/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
    var oPage       = document.getElementById("container").getAttribute("data-init");
        src         = document.getElementById("seajsnode").getAttribute("src"),
        version     = src.lastIndexOf("?")>0 ? src.substring(src.lastIndexOf("?")+1) : "20141111";
    seajs.config({
    	// base: "http://172.16.0.39"
        // paths: {
        //     "project": "/js/wap/project/reg_2015708"
        // }
        alias:{
            "51audio"        : "51audio.js",
            "collector"        : "collector.js",
            "pronounce"        : "pronounce.js",
        },
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use([oPage]);
})();