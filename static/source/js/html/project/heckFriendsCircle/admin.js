define("admin",["niceScroll"],function(require,exports,module){

    // 滚动条
    
    $(".introduce_mess").niceScroll(
        {
            cursorcolor : "#686b71",
            autohidemode: true,
            cursorwidth:7,
            cursorborderradius:"999px",
            cursorborder : 0,
            horizrailenabled:false
        }
    );

//删除弹层
    var $close_btn = $(".close_btn"),
    $pop = $(".pop"),
    $sure_btn = $(".sure_btn"),
    $not_btn = $(".not_btn");
    $close_btn.on("click",function(){
        console.log($(this).siblings());
        $(this).siblings().show();
    });
    $sure_btn.on("click",function(){
        var data_id = $(this).attr("data-id"),
            user_group = $(this).attr("user-group");
        $.ajax({
            url : "/Knowledge/del",
            type : "post",
            dataType : "json",
            data : {
                id : data_id,
                user_group : user_group
            },
            success : function(data){
                if(data.status == 10000){
                    window.location.assign("/Knowledge/index?user_group="+ user_group);
                }
            },
            error : function(){
                alert("网络错误请重试！");
            }
        });
    });
    $not_btn.on("click",function(){
        //alert("1");
        $(this).parent().parent().hide();
    });



    var $text = $(".text"),
    $add_message = $(".add_message");
    $change_message = $(".change_message");
    $text.on("click",function(){
        var $this = $(this),
        data_value = $this.attr("data-value");
        //console.log(data_value);
        $(".change_message").find(".change_text").find("input").val(data_value);
        //console.log($(".change_message").find(".change_text").find("input").val());
        $this.addClass("change_mes_text");
        $this.siblings().removeClass("change_mes_text");
        $this.parent().parent().addClass("click_mes");
        $this.parent().parent().siblings().find(".text").removeClass("change_mes_text");
        $this.parent().parent().siblings().removeClass("click_mes");
        $add_message.hide();
        var c_title = $this.parent().siblings().text(),
            c_cont = $this.find("i").text();

        $change_message.find(".add_title").find("input").val(c_title);
        $change_message.find("textarea").val(c_cont);
        $change_message.show();
    });


    $(".delet").on("click",function(){
        $change_message.hide();
        $add_message.show();
    });


    
});