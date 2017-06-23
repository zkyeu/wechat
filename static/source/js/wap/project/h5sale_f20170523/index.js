/**
 *
 * @authors zhangtian (zhangtian@51talk.com)
 * @date    2017-05-23 16:51:23
 */
define(function(require,exports,module){
    var top_hi=$(window).height();
    var top_wi=$(window).width();
    var bottom_wi=$('body').width();
    
    // alert(bottom_wi);
    // 竖滑屏
    var mySwiper1 = new Swiper ('.swiper-container-v', {
      direction: 'vertical',
      width:bottom_wi,
      height:top_hi,
    });
    // 横滑屏
    var mySwiper2 = new Swiper ('.swiper-container-h', {
      width:bottom_wi,
      pagination:'.swiper-pagination-h',
    });

    var mySwiper3 = new Swiper ('.swiper-container-b', {
      width:bottom_wi,
      pagination:'.swiper-pagination-b',
      paginationClickable:true,
    });
    mySwiper2.params.control = mySwiper3;
    mySwiper3.params.control = mySwiper2;
    // 点击购买
    $('.red_buy').click(function(){
      if($('#is_login').val()==1){
        $('.time').show();
      }else{
       window.location.href ='http://wap.51talk.com/index/login';

      }
      
    })
    // 选择时间段
    $('li').click(function(){
      $('li').removeClass("active");
      $(this).addClass("active");
      $('.time_text').addClass("time_go");
    })
    // 点击确定
    $(document).on('click','.time_go',function(){
      $('.time').hide();
    })
    // alert(top_hi);
    $('.swiper-container-b').css('z-index',10);
    $('.swiper-container-h').css('position','absolute');

});
