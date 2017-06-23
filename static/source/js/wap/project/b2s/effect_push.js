define(function(require,exports,module){
    var utility = require("utility");
    require("share");
    var $name_list_confirm = $(".name_list_confirm"),
        $show_list = $(".show_list"),
        $name_list_content = $(".name_list_content"),
        $close_list = $(".close_list"),
        $course_id =  $name_list_content.attr("data-course_id");
//查看学生名单
    $show_list.on("click",function(){
        var $this = $(this),
            $index = $(this).index();
        var show_list_url = $this.find("a").attr("showlListUrl");
        //console.log($(this));
        //console.log($(this).index());

        if($index == 0){
            //console.log($index+"333333");
            $.ajax({
                url : show_list_url,
                type : "get",
                dataType : "json",
                cache : false,
                success : function(r){
                 var data = r.attend_list;
                    $name_list_content.html("");
                    for(var i=0;i<data.length;i++){
                        var name_show = data[i].real_name;
                        var $user_id = data[i].id;
                        var name_s = data[i].real_name ? data[i].real_name : data[i].nick_name;
                        $name_list_content.append("<a href="+"/effect/studentDetail?user_id="+$user_id+"&course_id="+$course_id+">"+name_s+"</a>");
                    }
                    $name_list_confirm.show();
                }
            });
        }else{
            //console.log($index +"hhhhh");
            $.ajax({
                url : show_list_url,
                type : "get",
                dataType : "json",
                cache : false,
                success : function(r){
                 var data = r.no_attend_list;
                    $name_list_content.html("");
                    //console.log(r);
                    for(var i=0;i<data.length;i++){
                        var name_show = data[i].real_name;
                        var $user_id = data[i].id;
                        var name_s = data[i].real_name ? data[i].real_name : data[i].nick_name;
                        $name_list_content.append("<span>"+name_s+"</span>");
                    }
                    $name_list_confirm.show();
                }
            });
        }
            
    })
//关闭弹窗
    $close_list.on("click",function(){
        $name_list_confirm.hide();
    });


//圆形百分比

   // ;(function($){
    $.fn.gotoFn = function(options){
        var defaults = {
            left : ".goto-l",
            right : ".goto-r",
            time : 300
        },
        configs = $.extend({}, defaults, options),
        $self = $(this);

        var
        $left = $self.find(configs.left),
        $right = $self.find(configs.right),
        gotoData = $self.attr("data-goto"),
        time = configs.time / 1e3;

        if(gotoData>1 || gotoData<0) return;

        if(gotoData <= 0.5){
            $right.css({
                "transform" : "rotate(-"+ 180 * (1 - gotoData / 0.5) +"deg)",
                "-webkit-transform" : "rotate(-"+ 180 * (1 - gotoData / 0.5) +"deg)",
                "transition" : "transform "+ time +"s linear",
                "-webkit-transition" : "transform "+ time +"s linear"
            });
        }else{
            $right.css({
                "transform" : "rotate(0deg)",
                "-webkit-transform" : "rotate(0deg)",
                "transition" : "transform "+ 0.5 / gotoData * time +"s linear",
                "-webkit-transition" : "transform "+ 0.5 / gotoData * time +"s linear"
            }).
            one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend",function(){
                $left.css({
                    "transform" : "rotate("+ 180 * ( 1 + (gotoData - 0.5) / 0.5)  +"deg)",
                    "-webkit-transform" : "rotate("+ 180 * ( 1 + (gotoData - 0.5) / 0.5)  +"deg)",
                    "transition" : "transform "+ (gotoData - 0.5) / gotoData * time +"s linear",
                    "-webkit-transition" : "transform "+ (gotoData - 0.5) / gotoData * time +"s linear"
                });             
            });
        }

        return $self;
    }

    //$("[data-goto]").gotoFn();

    ;(function(){
        $(window).off("scroll.k");
        $(window).on("scroll.k",function(){
            var H=$(window).height();
            var h=$(window).scrollTop();
            var $payed_work_list_box = $("[data-goto]");
            $payed_work_list_box.each(function(i,M){
                var M=$(this),_h=M.offset().top;
                if(_h>h && _h<h+H ){
                    M.gotoFn();
                }
            })  

            var v=$(".word_form"),_h=v.offset().top;
            if(_h>h && _h<h+H ){
                if(!v.hasClass("word_trans")){
                    v.addClass("word_trans");                 
                }
            }

            // var w=$(".win_show_perent"),_h=w.offset().top;
            // if(_h>h && _h<h+H ){
            //     if(!w.find("i").hasClass("win_show_perent_i")){
            //         w.find("i").addClass("win_show_perent_i");                 
            //     }
            // }
        });
          
    })();

//})(jQuery);


//切换table
    var $work_table = $(".work_table");
    var $tab_span = $work_table.find("span");
    var $work_report = $(".work_report");
    $tab_span.on("click",function(){
        var index = $(this).index();
        //console.log(index);
        $(this).addClass("is_done").siblings().removeClass("is_done");
        $work_report.eq(index).show().siblings(".work_report").hide();
        if(index == "1"){
            $(".none_work_re").find("[data-goto]").eq(0).gotoFn();
            $(".none_work_re").find("[data-goto]").eq(1).gotoFn();
        }
        
    }); 

});