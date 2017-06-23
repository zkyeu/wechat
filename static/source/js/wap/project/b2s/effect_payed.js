define(function(require,exports,module){
    var utility = require("utility");
    require("share");

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

//})(jQuery);
//词汇掌握统计表
    ;(function(){
        $(window).off("scroll.k");
        $(window).on("scroll.k",function(){
            var H=$(window).height();
            var h=$(window).scrollTop();
            var $payed_work_list_box = $(".payed_work_list_box");
            $payed_work_list_box.each(function(i,v){
                var v=$(this),_h=v.offset().top;
                if(_h>h && _h<h+H ){
                    if(!v.hasClass("trans_list_move")){
                        v.addClass("trans_list_move");                 
                    }
                }
            }) 

            var $payed_work_list_box = $("[data-goto]");
            var _h=$payed_work_list_box.offset().top;
            if(_h>h && _h<h+H ){
                $payed_work_list_box .gotoFn();
            }

            var w=$(".win_show_perent"),_h=w.offset().top;
            if(_h>h && _h<h+H ){
                if(!w.find("i").hasClass("win_show_perent_i")){
                    w.find("i").addClass("win_show_perent_i");                 
                }
            }
        });
          
    })();
    

    var $payed_invite_stu = $(".payed_invite_stu");
    $payed_invite_stu.on("click",function(){
        $(".stu-audio-dialog").show();
    });
});