 
define(function(require,exports,module){
 /*导航切换*/
  // $(".pt_navIn").on("click","li",function(){
  //   $(this).children("a").addClass("pt_active").parent().siblings().children("a").removeClass("pt_active");
  //   $(".youth").eq($(this).prevAll().length).show().siblings(".youth").hide();
  // });
  
/*弹出层*/
$('.form_btn').click(function(){
  $('.mask,.openWidnow').show();
});
$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});
/*底部注册验证*/
  require("formCheck");
  require("placeholder");
  $("#t-regForm").formCheck();
  $("#RegForm1").formCheck({
    json: {
      "occup": {
        "reg":/^[124567]$/,
        "error":"年龄段格式不正确",
        "empty":"年龄段不能为空"
      }
    }
  });
 
(function(){
  $(window).scroll(function(){
    if($(".pt_feature").offset().top - $(document).scrollTop() + $(".pt_feature").height()>=0){
      $(".pt_nav").removeClass("pt_nav_top");
      $(".pt_kids").css("margin-top", "0");
      $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
      $(".pt_nav .pt_navIn .jsTab").eq(0).addClass("pt_active");
      $(".pt_no").hide();
    } else {
       $(".pt_no").show();
       $(".pt_nav").addClass("pt_nav_top");
      /* 滚动高度计算 */
      var domScrollHeight = $(document).scrollTop() + $(".pt_nav").height();
      var kidsHeight = $(".pt_kids").height()
      var kidsTop = $(".pt_kids").offset().top;
      var juniorHeight = $(".pt_junior").height()
      var juniorTop = $(".pt_junior").offset().top;
      var adultHeight = $(".pt_adult ").height() ;
      var adultTop = $(".pt_adult").offset().top;
      var baseHeight = $(".pt_base").height();
      var baseTop = $(".pt_base").offset().top;
      var professionHeight = $(".pt_profession").height();
      var professionTop = $(".pt_profession").offset().top;
      var openclassHeight = $(".pt_openclass").height();
      var openclassTop = $(".pt_openclass").offset().top;
      /* 标签控制 */
      if (domScrollHeight >= kidsTop && domScrollHeight <= kidsTop + kidsHeight/2) {
        $(".pt_nav").addClass("pt_nav_top");
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(0).addClass("pt_active");
      } else if (domScrollHeight > kidsTop + kidsHeight/2 && domScrollHeight < juniorTop + juniorHeight/2) {
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(1).addClass("pt_active");
      } else if (domScrollHeight > juniorTop + juniorHeight/2 && domScrollHeight < adultTop + adultHeight/2){
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(2).addClass("pt_active");
      } else if (domScrollHeight > adultTop + adultHeight/2 && domScrollHeight < baseTop + baseHeight/2){
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(3).addClass("pt_active");
      } else if (domScrollHeight > baseTop + baseHeight/2 && domScrollHeight < professionTop + professionHeight/2){
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(4).addClass("pt_active");
      } else if (domScrollHeight > professionTop + professionHeight/2 && domScrollHeight < openclassTop + openclassHeight/2){
        $(".pt_nav .pt_navIn .jsTab").removeClass("pt_active");
        $(".pt_nav .pt_navIn .jsTab").eq(5).addClass("pt_active");
      }
 
    }
  });

})();
 
});
