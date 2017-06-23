define('login/user_get_password',[],function(require,exports,module){
  // 错误提示
  function showError(ele) {
    ele.parent().addClass("input-error");
    ele.parent().siblings(".error").css("display", "block");
  }
  function  showOff(res,id){
    var node=$("#" + id);
    if(node.val()==""){//为空清除所有error
      node.parent().siblings(".error").hide();
      node.parent().removeClass("input-error");
      node.parent().removeClass("correct");
    }else{
      if(res==0){//重复密码
        node.parent().removeClass("correct");
        return false;
      }
      if(res==true){
        node.parent().addClass("correct");
      }else{
        node.parent().siblings(".error").show();
        node.parent().removeClass("correct");
      }
    }
  }
  // 输入框得到焦点信息
  $(".s-input,.m-code-input").focus(function() {
    $(this).parent().siblings(".error").hide();
    $(this).parent().removeClass("input-error");
  });
  // 输入框失去焦点信息
  $(".s-input").blur(function() {
    var id = $(this).attr("id");
    var fullName = "var value = validate" + id.substring(0,1).toUpperCase() + id.substring(1) + "()";
    eval(fullName);//函数调用
    showOff(value,id);
  });
  // 验证码获取倒计时
  var flag = true;//表示校验通过
  var wait = 60;
  function time(o) {
    if (wait == 0) {
      o.attr("disabled", false);
      o.removeClass("y_code_down");
      o.text("获取验证码");
      wait = 60;
    } else {
      o.attr("disabled", true);
      o.addClass("y_code_down");
      o.text(wait + "秒后可重新获取");
      wait--;
      setTimeout(function() {time(o);}, 1000);
    }
  };
  var client=$('#client').val();//隐藏域
  $(".send-code").click(function(){
    var index=$(this);
    if ($(this).hasClass("y_code_down")) return false;
    var mobile=$(".iphone-text").text();
    $.ajax({
      url:"http://login.51talk.com/ajax/mobile/captcha",
      data:{mobile:mobile,client:client},
      type:"post",
      dataType:"json",
      success:function(res) {
        if(res.code==10000){//成功
          time(index);
        }else if(res.code==60017){//点击超过三次
          $(".user-two").hide();
          $(".user-two-error").show();    
        }else{//失败
          alert(res.message);
          flag = false;
          return;
        }
      },
      error: function() {
        alert('网络异常');
        flag = false;
        return;
      }
    });    
  });
  // 发送短信验证码
  $("#getCode").click(function(){
    var mobile=$("#mobile").val();
    var imgcode=$("#imgcode").val();
    var id = "imgcode";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".code-btn").siblings(".error").find("span");
    if(!validateMobile()) {
      flag = false;
    }
    if(!value){
      valueId.text("请输入验证码");
      showError($("#" + id));
      flag = false;
    }else{
      $.ajax({
        url:"http://login.51talk.com/ajax/mobile/captcha",
        data:{mobile:mobile,imgcode:imgcode,client:client},
        type:"post",
        async:false,
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//成功
            if(!validateImgcode()) {
              flag = false;
              return;
            }else{
              $("#getCode").parent(".user-one").hide().siblings(".user-two").show();
              $(".list").addClass("list-two");
              $(".user-two .iphone-text").text(mobile);
              $("#" + id).parent().addClass("correct");
              time($(".send-code"));
              flag = true;
              return;
            }
          }else{//验证失败
            $("#imgcode").parent().removeClass("correct");
            var valueId=$("#imgcode").parent().siblings(".code-btn").siblings(".error").find("span");
            valueId.text(res.message);
            showError($("#imgcode"));
            flag = false;
            return; 
          }
        },
        error: function() {
          alert('网络异常');
          flag = false;
          return;
        }
      });
    }
    return flag;
  });
  // 安全验证
  $("#safeNext").click(function(){
    var imgcode=$("#mobileCode").val();
    if(!validateMobileCode()) {
      return false;
    }else{
      $.ajax({
        url:"http://login.51talk.com/ajax/mobile/verify",
        data:{mobileCode:imgcode,client:client},
        type:"post",
        async:false,
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//成功
            $("#safeNext").parent().hide().siblings(".user-two-error").siblings(".user-three").show();
            $(".list").addClass("list-three"); 
            $(".user-three").find(".iphone").text($(".iphone-text").text());
            flag = true;
            return; 
          }else{//如果校验失败
            var valueId=$("#mobileCode").parent().siblings(".send-code").siblings(".error").find("span");
            valueId.text(res.message);
            showError($("#mobileCode"));
            flag = false;
            return; 
          }
        }
      });
    }
    return flag;
  });
  // 重置密码
  $("#confirm").click(function(){
    var password=$("#password").val();
    if(!validatePassword()) {
      flag = false;
    }
    if(!validateComfirmpswd()) {
      flag = false;
      $("#comfirmpswd").parent().removeClass("correct");
    }else{
      $.ajax({
        url:"http://login.51talk.com/ajax/password/reset",
        data:{password:password,client:client},
        type:"post",
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//成功
            $("#confirm").parent(".user-three").hide().siblings(".user-four").show();
            $(".list").addClass("list-four");
            return flag;
          }else{//失败
            alert(res.message);
            flag = false;
            return;
          }
        }
      });
    }
    return flag;
  });
  // 手机号码
  function validateMobile(mobile) {
    var mobileR=/^1[0-9]{10}$/;
    var id = "mobile";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入正确手机号");
      showError($("#" + id));
      return false;
    }else if(!mobileR.test(value)){
      valueId.text("手机号格式错误，请重新输入");
      showError($("#" + id));
      return false;
    }else{
      $.ajax({
        url:"http://login.51talk.com/ajax/mobile/check",
        data:{mobile:value,client:client},
        type:"post",
        async:false,
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//成功
            flag=true;
            return;      
          }else{//错误
            valueId.text(res.message);
            showError($("#" + id));
            flag=false;
            return;
          }
        }
      });
    }
    return flag;
    showOff(value,id);
  }
  // 图片验证码
  function validateImgcode(){
    var id = "imgcode";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".code-btn").siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入验证码");
      showError($("#" + id));
      return false;
    }
    return true; 
    showOff(value,id); 
  }
  // 手机验证码
  function validateMobileCode() {
    var id = "mobileCode";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".send-code").siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入短信验证码");
      showError($("#" + id));
      return false;
    }
    return true;
    showOff(value,id);
  }
  // 设置密码
  function validatePassword(){
    var id = "password";
    var passwdR=/^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入密码");
      showError($("#" + id));
      return false;
    }
    if(!passwdR.test(value)){
      valueId.text("密码长度只能是6-20位字符");
      showError($("#" + id));
      return false;  
    }
    return true; 
    showOff(value,id); 
  }
  function validateComfirmpswd(){
    var id = "comfirmpswd";
    var pswdVal = $("#password").val();
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(validatePassword()==true){
      if(!value) {
        valueId.text("请再次输入新密码");
        showError($("#" + id));
        return false;
      }
      if(value!=pswdVal){
        valueId.text("两次输入的密码不一致");
        showError($("#" + id));
        return false;  
      }
    }else{
      return 0;
    }
    return true; 
    showOff(value,id); 
  }
});