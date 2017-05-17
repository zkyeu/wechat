define("circleLibrary",["niceScroll"],function(require,exports,module){
    require("niceScroll");

    // 滚动条
    $.fn.heckScroll = function(){
        var that = $(this);
        that.niceScroll(
            {
                cursorcolor : "#686b71",
                autohidemode: true,
                cursorwidth:7,
                cursorborderradius:"999px",
                cursorborder : 0,
                horizrailenabled:false
            }
        );
        return that;
    }
    $(".already_send_mes").heckScroll();
    $(".already_send").find("ul").heckScroll();
  
    //从朋友圈库拉取内容
    var $copy_mes = $(".copy_mes");
    $copy_mes.on("click","span",function(){
        var that = $(this);
        var text = that.parent().siblings(".text").text(),
            imgArr = that.parent().siblings("ul").html();
            imgall = that.parent().siblings("ul").find("li"),
            imgArr = [];
        for(var i=0; i<imgall.length; i++){
            imgArr.push("<li class='js-check'><img src='" + imgall.eq(i).find('img').attr('src') + "'><i>x</i></li>");
        }
        // console.log(text,imgArr);
        sessionStorage.setItem("text", text);
        sessionStorage.setItem("imgArr", imgArr); 
        sessionStorage.setItem("flag", 1);
        //调用父级页面方法
        window.parent.top.window.closeIfr();
    });

});