 
define(function(require,exports,module){
  require("formCheck");
  require("silder");

  $(".m-reg form").formCheck({
    "focus" :true,
    "alertType":"bottom"
  });
  
  $(".m-log form").formCheck({
    "focus" :true,
    "alertType":"bottom",
    "json":{
      "user_name":{//手机号
        "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
        "error":"用户名格式错误",
        "empty":"请输入用户名"
      },
      "username":{//手机号
        "reg":/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i,
        "error":"用户名格式错误",
        "empty":"请输入用户名"
      }
    }
  }).on("submit",function(){
    //及时验证用户名+密码
    var oForm=$(".m-log form");
    if(oForm.attr("submited"))return true;
    var aInput=oForm.find('input[name="user_name"],input[name="password"]');
    $.ajax({
      url: '/user/ajax_login.php',
      type: 'POST',
      dataType: 'json',
      data: aInput.serializeArray(),
      success:function(res){
        if(res.status==1){
          //收起错误信息
          oForm.find('li.u-error').removeClass('u-error');
          oForm.find('.jsSubmit').val("登录...");
          oForm.attr("submited",true).submit();
        }else{
          aInput.eq(res.type).closest('li').addClass('u-error').find('.u-err').html(res.msg);
        }
      }
    });
    return false;
  });
  
  $("#formBottom").formCheck();

  $(".m-main .jsCheck").focusin(function() {
    $(this).closest('li').addClass('icon-btn');
  }).focusout(function() {
    if(!$(this).val()){
      $(this).closest('li').removeClass('icon-btn');
    }
  });;
  
  //微博 微信 下拉
  $(".jsMore").hover(function(){
    $(this).find('.jsUl').show();
  },function(){
    $(this).find('.jsUl').hide();
  }); 
//资料轮播
  function tabPic(){
     $(".nce_pic").children("li").eq(index).show().siblings().hide();
  }
  var index=0;
  $(".nce_left").click(function(){
      index++;
      if(index==4) {
        index=-1;
        index++;
        tabPic(index);
      }
      tabPic(index);

  })
  $(".nce_right").click(function(){
        index++;
        if(index==4){
          index=-1;
          index++;
          tabPic(index);
        }
        tabPic(index);     
  });

}); 