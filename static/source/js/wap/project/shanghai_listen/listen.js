
/*邮箱验证*/
var reTel = /^1[0-9]{10}$/;
$(".to_class").click(function(){
  var tel = $(".ph_number").val();
  var passwd = $(".pass_word").val();
  var num = $(".num").val();
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
  if (num == "") {
    alert("请填写奖品代码");
    return false;
  }
  document.getElementById("Form").submit();
});
