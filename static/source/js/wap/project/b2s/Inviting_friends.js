define("Inviting_friends",["fastclick"],function(require, exports, module) {
    require("fastclick");//去除click延迟

    FastClick.attach(document.body);

    var isWeixin = $("#isWeixin").val(),
        share_btn = $(".share_btn"),
        share_pop = $(".share_pop"),
        app_share = $(".app_share"),
        androidShareVersion = $("#androidShareVersion").val();
    share_btn.on("click",function(e){
        if(isWeixin == "1"){//判断是否为微信
            share_pop.removeClass("disnone");
        }else{ //App 的情况下区分安卓和ios
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) { 
                e.stopPropagation(); 
                app_share.removeClass("disnone");
            } else if (/android/.test(ua)) {
                //区分高版本和低版本的安卓App
                if(androidShareVersion == "1"){
                    e.stopPropagation(); 
                    app_share.removeClass("disnone");
                }else{
                    share_pop.removeClass("disnone");
                }
            }
        }
        
    });
    share_pop.on("click",function(){
        share_pop.addClass("disnone");
    });

    $("body").on("click",function(){
        app_share.addClass("disnone");
    });
    app_share.on("click",function(e){
        e.stopPropagation(); 
        app_share.removeClass("disnone"); 
    });

});

