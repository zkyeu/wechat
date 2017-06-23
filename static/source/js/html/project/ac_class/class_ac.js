/**
 *
 * @authors vincent (huhaili@51talk.com)
 * @date    2015-09-29 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
  // 约课须知
  $(".ac-rt").on("click",function(){
    $(this).toggleClass("up-bg-icon");
    $(".ac-word").slideToggle();
  });
  $(".delete").on("click",function(){
    $(".ac-word").hide();
    $(this).parents().find(".up-bg-icon").removeClass("up-bg-icon");
  });
  // banner切换
  $(".ac-ban li").on("click",function(){
    $(this).addClass("on").siblings().removeClass("on");
    // 显示当天点击的class页面
    $(".ac-list").hide();
    $(".ac-list").eq($(this).index()).show();
  });
});