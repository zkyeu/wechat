/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2016-01-12 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
    var part3H = $(".item3").offset().top-$(window).height(),
        part4H = $(".item4").offset().top-$(window).height();
    $(".item1 .item_text").addClass("item_text_r");
    $(".item2 .item_text").addClass("item_text_r");
    $(".item2 .minute").addClass("minuter");
    $(window).on('scroll', function() {
        if ($(window).scrollTop()>part3H) {
                //debugger;
            $(".item3 .item_text").addClass("item_text_r");
        }
        if($(window).scrollTop()>part4H){
            $(".item4 .item_text").addClass("item_text_r");

        }
    })
});
