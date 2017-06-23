define(function(require, exports, module) {
  var reTel = /^1[0-9]{10}$/;
  $(".unicomBtn").click(function(){
    var tel = $("#tel").val();
    var passwd = $("#passwd").val();
    var telNum=tel.substring(5,11);
    if (tel == "") {
      alert("请填写手机号码");
      return false;
    }
    if (!reTel.test(tel)) {
      alert("请填写正确格式手机号码");
      return false;
    }
    if (passwd == "") {
      alert("请填写密码");
      return false;
    }
    if (passwd!=telNum){
      alert("请输入手机号6位数");
      return false;
    }
    $("#reg1_form").submit();
  });
});