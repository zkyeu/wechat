/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("placeholder");
	require("formCheck");
	require("lazyload");
	$("#t-regForm,#m-regForm,#b-regForm").formCheck();
  // 添加切换
  $(function(){
    $(".clickStepTag li").each(function(i){
      $(this).click(function(){
        // 为li添加相对于的属性
        var index=$(this).index();
        var oDiv=$(this).closest(".clickStepTag").removeClass("picGuide1 picGuide2 picGuide3").addClass("picGuide"+(index+1));
          // 为li添加点击事件
          var showLa = $(".showStep").eq(i);
          showLa.show();
          $(".showStep").not(showLa).hide();
          return false;
      });
    });
  });
});
