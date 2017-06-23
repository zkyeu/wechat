/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
/*导航切换*/
  $(".f_nav").on("click","li",function(){
    $(this).addClass("on").siblings().removeClass("on");
    $(".youth").eq($(this).prevAll().length).show().siblings(".youth").hide();
  });

/*课程切换*/
  $(".m_course").each(function(){
    var $advLi=$(this).find(".advList").find("li");
    var $tabDivs = $(this).find(".tabDivs").children();
    var oldIndex = 0;
    var $jb_sts=$(this).find(".jb_st").children();
    $advLi.mouseover(function(){
        var index = $(this).index();
        $advLi.eq(oldIndex).find('span').removeClass('tab_color');
        $advLi.eq(oldIndex).find('i').removeClass('tabon'+oldIndex);
        $(this).children('i').addClass('tabon'+index);
        $(this).children('span').addClass('tab_color');

        $tabDivs.removeClass('tabDesc').eq(index).addClass('tabDesc');
        $('.sanjiao').removeClass('tab_sanjiao'+oldIndex).addClass('tab_sanjiao'+index);

        $jb_sts.removeClass();
         
        $jb_sts.eq(index).removeClass("jb_stno");
        $jb_sts.eq(index).addClass("jb_stbk");
        
        
      }).mouseout(function(){
        oldIndex = $(this).index();
      });
  });

/*首页课程体系详情切换*/
$(".m_courseList").on("click","li",function(){
  $(".f_nav li").eq($(this).prevAll().length+1).addClass("on").siblings().removeClass("on");
  $(".youth").eq($(this).prevAll().length+1).show().siblings(".youth").hide();  
});

/*弹出层*/
$('.imgBtn,.expriceBtn,.cl-reg,.plen-btn,.wt_btn').click(function(){
  $('.mask,.openWidnow').show();
});
$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});
/*底部注册验证*/
  require("formCheck");
  require("placeholder");
  $("#t-regForm,#t-regForm-bom,#b-regForm").formCheck();
  $("#RegForm1").formCheck({
    json: {
      "occup": {
        "reg":/^[124567]$/,
        "error":"年龄段格式不正确",
        "empty":"年龄段不能为空"
      }
    }
  });
});
