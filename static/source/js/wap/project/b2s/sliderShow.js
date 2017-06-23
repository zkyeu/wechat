define(function(require,exports,module){
    require("share");
    (function(){
        var $goal_list = $(".goal_list"),
            $slider_top = $(".slider_top"),
            $slider_down = $(".slider_down");
        //$goal_list:not(".first_line").hide();
            $slider_top.on("click",function(){
                $goal_list.addClass("line_show");
                $slider_top.hide();
                $slider_down.show();
            });
            $slider_down.on("click",function(){
                $slider_down.hide();
                $slider_top.show();
                $goal_list.removeClass("line_show");
            });
    })();
});