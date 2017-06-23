/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-10-08 15:30:00
 * @version 1.0.0
 */
define(function(require,exports,module){
    $(".bout-btn").click(function(){
        var href = $(".OneS_logIn").offset();
        $("html,body").animate({
            scrollTop: href.top
        }, 1000);
        return false;
    });
});