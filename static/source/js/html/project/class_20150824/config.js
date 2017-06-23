/**
 * 配置路由
 * @file：   config.js
 * @author:  vincent(zhuning@51talk.com)
 * @update:  2015-07-14
 * @note: base
 */
(function(){ 
	var aPage = document.getElementById("container").getAttribute("data-init");
    src = document.getElementById("seajsnode").getAttribute("src"),
    version = src.lastIndexOf("?")>0 ? src.substring(src.lastIndexOf("?")+1) : "20141111";
    seajs.config({
        alias:{"class": "class.js"},
        map:[
            [/^(.*\/project\/.*\.(?:css|js))(?:.*)$/i,"$1?"+version]
        ]
    });
     seajs.use([aPage],function(){
        var t_endTime = new Date().getTime();
        if($("#switch").val()){
            $.ajax({
              url:"/ApiEfl/addLoadPerformanceLog",
              type: "post",
              data:{
                url:location.href,
                type:"4",
                "load_time":t_endTime - t_startTime,
                "edition":1
              }
             });
        }
        
    });
})();