/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
	var regUser = /^(([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6})|(1[0-9]{10})$/i;
	$("#reg1").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
		if (tel == "") {
			alert("请填写用户名");
			return false;
		}
		if (!regUser.test(tel)) {
			alert("用户名格式不正确");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		document.getElementById("reg1_form").submit();
	});
	
	
	
});
