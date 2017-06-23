/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
  
  //手机号码，密码验证
  var reTel = /^1[0-9]{10}$/;
  $("#reg1").click(function(){
    var tel = $("#reg1_tel").val();
    var passwd = $("#reg1_passwd").val();
    if (tel == "" ){
      alert("请填写手机号码");
      return false;
    }
    if (!reTel.test(tel) ) {
      alert("请填写正确格式手机号码");
      return false;
    }
    if (passwd == "" ) {
      alert("请填写密码");
      return false;
    }
    document.getElementById("reg1_form").submit();
  });
  $("#reg2").click(function(){
    var te2 = $("#reg2_tel").val();
    var passwd2 = $("#reg2_passwd").val();
    if (te2 == "" ){
      alert("请填写手机号码");
      return false;
    }
    if ( !reTel.test(te2)) {
      alert("请填写正确格式手机号码");
      return false;
    }
    if ( passwd2 == "") {
      alert("请填写密码");
      return false;
    }
    document.getElementById("reg2_form").submit();
  });
//移动端事件代理
/* (function(){
        var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click', _on = $.fn.on;
            $.fn.on = function(){
                arguments[0] = (arguments[0] === 'click') ? isTouch: arguments[0];
                return _on.apply(this, arguments); 
            };
  })();*/
  //图片点击效果
  $('.dark ul li').on('click',function(){
    var index = $(this).index();
    $('.main > section').eq(index).show().siblings().hide();
    $(this).parents(".dark").hide();
  });
  var screenW=$(window).height();
  $('.dark ul,.dark').height(screenW);
  $('.dark ul li img').height(screenW/2);


});
