define("b2sApp",["fullPage"],function(require,exports,module){
    require("fullPage");
    var fullpage = $("#fullpage"),
        qrIndex = $("[qrIndex]").attr("qrIndex"),
        $qrcode = $(".app-download-qrcode"),
        $appBack = $(".b2s-app-back");
    fullpage.fullpage({
        navigation : true,
        resize : false,
        afterRender : function(){
            window.setTimeout(function(){
                
            },1000);
            fullpage.css({
                visibility : "visible",
                opacity : 1
            });
        },
        afterLoad : function(anchorLink,index){
            // console.log(index);
        },
        onLeave : function(index,nextIndex,direction){
            $appBack[(nextIndex == 1 ? "hide" : "show")]();
            $qrcode[(nextIndex == qrIndex ? "hide" : "show")]();
        }
    });

    //点击向上的箭头，返回滚动的第一屏。
    $appBack.on("click","",function(){
        $("#fp-nav li:eq(0) a").trigger("click");
    })
});