;(function(){ 
    var oPage       = $("[data-init]").attr("data-init");
        src         = document.getElementById("seajsnode").getAttribute("src"),
        version     = src.lastIndexOf("?")>0 ? src.substring(src.lastIndexOf("?")+1) : "20141111";
    seajs.config({
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
    seajs.use([oPage]);
})();