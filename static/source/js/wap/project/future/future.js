define(function(require,exports,module){
  /*验证*/
  var reTel = /^1[0-9]{10}$/;
  
  var passTel = /^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
  $("#sha-reg").click(function(){
    var tel = $("#sha-tel").val();
    var passwd = $("#sha-psd").val();
    if (tel == "") {
      alert("请填写手机号码");
      return false;
    };
    if (!reTel.test(tel)) {
      alert("请填写正确格式手机号码");
      return false;
    };
    if (passwd == "") {
      alert("请填写密码");
      return false;
    };
    if(!passTel.test(passwd)){
      alert("请填写正确格式密码");
      return false;
    };
    document.getElementById("RegForm").submit();
  });

})

