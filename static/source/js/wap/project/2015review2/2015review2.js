
/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2016-02-22 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
  /*email check*/
    var reTel = /^1[0-9]{10}$/;
    $("#sha-reg").click(function(){
      var tel = $("#dl-tel").val();
      var passwd = $("#dl_password").val();
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
      document.getElementById("RegForm").submit();
    });
});
