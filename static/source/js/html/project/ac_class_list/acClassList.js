define("acClassList",[],function(require,exports,module){
    var $float = $(".float"),
        $p_btn = $float.find("p"),
        $choose_li = $float.find("li"),
        $select_box = $(".select_box");

    $("body").click(function(){
        $(".float").find("ul").hide();
    });
    $p_btn.on("click",function(e){
        e.stopPropagation();
        var $this = $(this);
        $this.siblings().show();
        $this.parents ().siblings().find("ul").hide();
    });
    $choose_li.on("click",function(){
        var text = $(this).text(),
            value = $(this).attr("data-value");
        $(this).parent().prev().text(text);
        $(this).parent().hide();
        var flg = $(this).parent().parent();
        console.log(flg);
        console.log(flg.hasClass("select_box"));
        if(flg.hasClass("select_box")){
            $(this).parent().parent().next().addClass("cli");
        }
        $(this).parent().next().val(value);
    });

    $(".keys").on("focus",function(){
        $(this).removeClass("cli");
    });

    var flag = false;
    var timer ;
    $(".canot_in").mouseover(function(){
        clearTimeout(timer);
        $(this).parent().find(".tips").show();
        $(this).parents().siblings().find(".tips").hide();
    });

    $(".canot_in").mouseout(function(){
        var that = $(this);
        timer = setTimeout(function(){
            if(flag) return;
            that.parent().find(".tips").hide();
        },1000); 
        
    });

    $(".tips").mouseover(function(){
       flag = true;
        $(this).show();
    });
    $(".tips").mouseout(function(){
       flag = false;
        $(this).hide();
    });

    $(".tips").find("span").click(function(){
        $(this).parent().hide();
    }); 
});