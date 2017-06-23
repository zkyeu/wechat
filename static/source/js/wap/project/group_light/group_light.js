 
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
  var screenH=$(window).height();
  $('.dark ul,.dark').height(screenH);
  $('.dark ul li img').height(screenH/2);
  if(screenH==667){
    $("#img1").attr({"src":"http://www.51talk.com/static/images/wap/group_light/boy_375278.jpg","width":"375"});
    $("#img2").attr({"src":"http://www.51talk.com/static/images/wap/group_light/girl_375278.jpg","width":"375"});
    $(".s_bgay").css("width","375px");
  }else if(screenH==736){
    $("#img1").attr({"src":"http://www.51talk.com/static/images/wap/group_light/boy_414313.jpg","width":"414"});
    $("#img2").attr({"src":"http://www.51talk.com/static/images/wap/group_light/girl_414313.jpg","width":"414"});
     $(".s_bgay").css("width","414px");
  }else{
    $("#img1").attr({"src":"http://www.51talk.com/static/images/wap/group_light/s_img.jpg","width":"100%"});
    $("#img2").attr({"src":"http://www.51talk.com/static/images/wap/group_light/s_img2.jpg","width":"100%"});
    $(".s_bgay").css("width","100%");
  }

});


