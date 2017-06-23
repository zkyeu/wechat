define('login/user_login',[],function(require,exports,module){
/* 注册验证 */
  // 错误提示
  document.domain = "51talk.com";
  function showError(ele) {
    ele.parent().addClass("input-error");
    ele.parent().siblings(".error").css("display", "block");
  }
  function  showOff(res,id){
    console.log(res)
    var node=$("#" + id);
     if(node.val()==""){//为空清除所有error
      node.parent().siblings(".error").hide();
      node.parent().removeClass("input-error");
      node.parent().removeClass("correct"); 
    }else{
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
  var flag = true;//表示校验通过
  //提交表单时验证
  var client=$('#client').val();//隐藏域
  function startLogin(){
    var loginForm=$("#LoginForm");
    $.ajax({
      url:$("#LoginForm").attr("action"),
      type:"post",
      data:{
        username: $("#username").val(),
        password : $("#password").val(),
        la :$('#login_la').val(),
        client:$("#client").val(),
        lang : $("#lang").val(),
        from_url:$("#from_url").val(),
        autologin:$("#autologin").val()
      },
      success : function(data){
        if(data.code == 10000){
          if(data.res.from_url){
            window.location.href= data.res.from_url;
          }else{
            window.location.reload();
          } 
        }else{
          $("#password2").parent().removeClass("correct");
          var valueId=$("#password2").parent().siblings(".error").find("span");
          valueId.text(data.message);
          showError($("#password2"));
          $("#password2").attr('name',"password2"); 
        }
      }  
    });
  }
  $("#LoginForm").on("submit",function(event){
    var oForm=$(this);
    if(oForm.attr("submited")) return true;
    var login_la = $('#login_la').val();
    var public_key = $('#public_key').val();
    var password = $('#password2').val();
    if(!public_key){
      ssoController.getPublicKey();
    }
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    var encrypted = encrypt.encrypt(password);
    $("#password").val(encrypted);
    if(!encrypted || encrypted=="false"){
      $("#password").val(hex_md5(password));
    }
    if(!login_la){
      ssoController.preLogin();
    }else{
      //收起错误信息
      $("#password2").removeAttr('name');
      startLogin();
    }
    return false;
    event.preventDefault();
  });
  // 登录
  $("#login").click(function(){
    if(!validateUsername()) {
      flag = false;
      return flag;
    }
    if(!validatePassword2()) {
      flag = false;
      return flag;
    }
    $("#LoginForm").submit();
  });
  // 手机号码
  function validateUsername() {
    var mobileR=/^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i;
    var emailR=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
    var id = "username";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入手机号码或邮箱");
      showError($("#" + id));
      return false;
    }
    if(!mobileR.test(value)){
      valueId.text("用户名格式错误");
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
          if(res.code=10000){//正确
            flag=true;
            return;   
          }else{
            valueId.text(res.message);
            showError($("#" + id));
            flag=false;
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
    showOff(value,id);
  }
  // 密码
  function validatePassword2() {
    var passwdR=/^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
    var id = "password2";
    var value = $("#" + id).val();
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
  
  //sso
  // 动态插入iframe为sso跨域做准备
  window.ssoController = {
    preLogin:function(){
      $.ajax({
        url: 'http://login.51talk.com/sso/prelogin',
        dataType: 'jsonp',
        jsonpCallback: 'preLoginCallBack',
        data: $('#LoginForm').serialize(),
        type: 'get',
        success: function(ret) {
          $('#login_la').val(ret.res.la);
          //收起错误信息
          $("#password2").removeAttr('name');
          startLogin();
          // $("#LoginForm").attr("submited",true).submit().find('li.input-error').removeClass('input-error').end().find('#login').val("登录...");
        }
      });
    },
    feedBack: function(dataObj){
      var data = eval(dataObj);
      if(data.code == 10000){
        if(data.from_url){
          top.location.href= data.from_url;
        }else{
          top.location.reload();
        }
      }else{
        alert(data.msg);  
        $("#password2").attr('name',"password2");
        $("#LoginForm").removeAttr("submited").find('.jsSubmit').val("登录");      
      }
    },
    getPublicKey:function(){
      var client_id = $('input[name=client]').val() || 1;
      if($("#public_key").val()){
        return;
      }
      $.ajax({
          url: 'http://login.51talk.com/sso/publickey',
          dataType: 'jsonp',
          jsonpCallback: 'pubkeyCallBack',
          data: {'client':client_id},
          type: 'get',
          success: function(ret) {
              $("#public_key").val(ret.res.rsa_pub);
          }
      });
    }
  };
  //动态插入iframe为sso跨域做准备
  (function(){
    var loginForm=$("#LoginForm");
    $("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
      // var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
      //             '<input type="hidden" name="group" id="group" value="4" />';
      // loginForm.attr({
      //     "target" : "ssoLoginFrame",
      //     "action" : "http://login.51talk.com/sso/login"
      // });
      ssoController.getPublicKey();
      $('#username').blur(function(){
          $.ajax({    
              url: 'http://login.51talk.com/sso/prelogin',
              dataType: 'jsonp',
              jsonpCallback: 'preLoginCallBack',
              data: loginForm.serialize(),
              type: 'get',
              success: function(ret) {
                $('#login_la').val(ret.res.la);
              }
          });
          return false;
      }).focus(function(){
        ssoController.getPublicKey();
      });
      $('#password').focus(function(){
        ssoController.getPublicKey();
      });
  })();

  // checked
  $("#checkbox").click(function(){
    $(this).toggleClass("checked");
    if($(this).hasClass("checked")){
      $(".inputChed").val("1");
      $(".inputChed").parent().siblings(".error").hide();
    }else{
      $(".inputChed").val("0");  
    }
  });
});