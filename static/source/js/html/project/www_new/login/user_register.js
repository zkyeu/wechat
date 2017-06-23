define('login/user_register',[],function(require,exports,module){
/* 注册验证 */
  // 错误提示
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
  $(".s-input").focus(function() {
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
  //注册
  $("#register").click(function() {
    var mobileName = $(".s-input").val();
    if(!validateMobile()) {
      flag = false;
      return flag;
    }
    if(!validatePassword2()) {
      flag = false;
      return flag;
    }
    if(!validateEmail()) {
      flag = false;
      return flag;
    }
    if(!validateNickname()) {
      flag = false;
      return flag;
    }
    if(!validateRecMobile()) {
      flag = false;
      return flag;
    }
    if($(".inputChed").val()==0){
      $(".inputChed").parent().siblings(".error").show(); 
      $(".inputChed").parent().siblings(".error").find("span").text("请先同意用户注册协议");
      flag = false;
      return flag;
    }
    if($(".inputChed").val()==1){
      $(".inputChed").parent().siblings(".error").hide();
    }
    $('#registerForm').submit();  
    
  })
  
  // 手机号码
  function validateMobile() {
    var mobileR=/^1[0-9]{10}$/;
    var id = "mobile";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入手机号码");
      showError($("#" + id));
      return false;
    }
    if(!mobileR.test(value)){
      valueId.text("手机号格式错误，请重新输入");
      showError($("#" + id));
      return false;
    }else{
      $.ajax({
        url:"http://login.51talk.com/ajax/mobilevalidate",
        data:{mobile:value,client:client},
        type:"post",
        async:false,
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//成功
            flag=true;
            return;
          }else{
            valueId.text(res.message);
            showError($("#" + id));
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
  // 电子邮箱
  function validateEmail(email) {
    var emailR=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
    var id = "email";
    var value = $("#" + id).val();
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("Email不能为空！");
      showError($("#" + id));
      return false;
    }
    if(!emailR.test(value)){
      valueId.text("电子邮箱格式错误，请重新输入");
      showError($("#" + id));
      return false; 
    }else{ 
      $.ajax({
        url:"http://login.51talk.com/ajax/mobilevalidate",
        data:{mobile:value,client:client},
        type:"post",
        async:false,
        dataType:"json",
        success:function(res) {
          if(res.code==10000){//正确
            flag=true;
            return;
          }else{//错误
            valueId.text(res.message);
            showError($("#" + id));
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
    showOff(value,id);
  }
  // 英文名
  function validateNickname() {
    var nameR=/^[A-Za-z\s]{2,20}$/i;
    var id = "nickname";
    var value = $("#" + id).val();
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value){
      return true;
    }
    if(!nameR.test(value)){
      valueId.text("英文名长度只能是2-20位");
      showError($("#" + id));
      return false;
    }
    return true; 
    showOff(value,id); 
  }
  // 手机号或推荐码
  function validateRecMobile() {
    var recMobR=/^([a-z0-9]{6,20})$/;
    var id = "recMobile";
    var value = $("#" + id).val();
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value){
      return true;
    }
    if(!recMobR.test(value)){
      valueId.text("请输入正确的推荐手机号/推荐码");
      showError($("#" + id));
      return false;  
    }
    return true;
    showOff(value,id);
  }
  // 已验证手机或邮箱
  function validateIphone() {
    var mobileR=/^1[0-9]{10}$/;
    var id = "iphone";
    var value = $("#" + id).val();//获取输入框内容
    var valueId=$("#" + id).parent().siblings(".error").find("span");
    if(!value) {
      valueId.text("请输入手机号或邮箱账号");
      showError($("#" + id));
      return false;
    }
    if(!mobileR.test(value)){
      valueId.text("账号格式错误，请重新输入");
      showError($("#" + id));
      return false;
    }
    return true;
    showOff(value,id);
  }
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