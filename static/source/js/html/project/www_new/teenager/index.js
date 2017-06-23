/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-11-09 12:10:30
 * @version 1.0.0
 */
define('teenager/index',['formCheck','silder','common'],function(require,exports,module){
    require("common"); 
    var directory = $("body").data("directory");
    var p_tit="";
    var t_list="";
    var t_list2="";

    if($(".part1[data-teen='move1']")[0]){
        p_tit = $(".part1[data-teen='move1']").offset().top - $(window).height();
    }
    if($(".t-list[data-teen='move2']")[0]){
        t_list = $(".t-list[data-teen='move2']").offset().top - $(window).height();
    }
    if($(".part4[data-teen='move3']")[0]){
        t_list2 = $(".part4[data-teen='move3']").find(".t4-list").offset().top - $(window).height();
    }
    var top = $(window).scrollTop();
    if(top>p_tit){
        $(".part1[data-teen='move1']").addClass("part-move");
    }

    $(document).scroll(function(){
        var top = $(window).scrollTop();
       
        if(top>p_tit){ 
            $(".part1[data-teen='move1']").addClass("part-move");
        }
        if(top>t_list){ 
            $(".t-list[data-teen='move2']").addClass("move-t-list");
        }
        if(top>t_list2){ 
            $(".part4[data-teen='move3']").addClass("part4-move");
        }
        
    });
// youngsters 切换
  $(".youth_students .youth_nav").click(function(){
    $(this).addClass("on_cl").siblings().removeClass("on_cl");
    var index = $(this).index();
    $('.youth_width').eq(index).show().siblings().hide();
  });
});



