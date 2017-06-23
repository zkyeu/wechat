/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-04-18 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
    $(".choseTime").on("click",function(){
        if(!$(this).hasClass("disable")){
            $(".choseTime").removeClass("on");
            $(this).addClass("on");
        }
        
    });
});



