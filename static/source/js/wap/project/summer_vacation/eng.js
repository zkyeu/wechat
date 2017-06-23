/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	var rePsw = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
	$(".free").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
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
		if (!rePsw.test(passwd)) {
			alert("请输入6-20位的密码");
			return false;
		}
		document.getElementById("reg1_form").submit();
	});
});
