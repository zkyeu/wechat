/**
 * 配置路由
 * @file：   config.js
 * @author:  shaoyongkai (shaoyongkai@51talk.com)
 * @update:  2017-02-17
 * @note: base
 */
;(function(){ 
    var oPage       = document.getElementById("container").getAttribute("data-init");
        src         = document.getElementById("seajsnode").getAttribute("src"),
        version     = src.lastIndexOf("?")>0 ? src.substring(src.lastIndexOf("?")+1) : "20141111";
    seajs.config({
        alias:{
            "index": "index.js",
            "reg": "reg.js",
            "exam": "exam.js",
            "addname": "addname.js"
        },
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use([oPage]);
})();