/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-12-16 16:10:30
 * @version 1.0.0
 */
define("b2s_overview",[""],function(require,exports,module){

    ;(function(){
        $(window).off("scroll");
        $(window).on("scroll",function(){
            var H=$(window).height();
            var h=$(window).scrollTop();
            var v=$(".b2s_project_map"),_h=v.offset().top;
            if(_h>h && _h<(h+H-100) ){
                v.find(".b2s_project_map_center").addClass("animate_map");
            }
        });
          
    })();

});