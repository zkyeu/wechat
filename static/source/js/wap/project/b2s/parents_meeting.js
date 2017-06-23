define(function(require,exports,module){
    require("swiper-3.3.1.jquery.min");
    require("share");
    var $swiper_slide = $(".swiper-slide");
    if($swiper_slide.length > 1){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            
            // 如果需要分页器
            pagination: '.swiper-pagination',
            autoplay: 3000,
        }) 
    }else{
        $(".swiper-pagination").css({"display":"none"})
    }
});