/**
 *
 * @authors liyang (liyang@51talk.com)
 * @date    2016-04-7 15:20:30
 */
define(function(require,exports,module){
/*弹出层*/
$('.imgBtn,.ly_imgBtn,.imgBtn_l,.imgBtn_r').click(function(){
  $('.mask,.openWidnow').show();
});
$(".mask").on("click",function(){
  $('.mask,.openWidnow').hide();
  $(this).hide();
});
var $age = $(".age ul li");
var $age_course = $(".age_course ul li");
$age.mouseover(function(){
  var $index = $(this).index();
  $age.removeClass('choose');
  $(this).addClass('choose');
  $age_course.hide();
  $age_course.eq($index).show();
})
/*底部注册验证*/
  require('placeholder');
  require('formCheck');
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
