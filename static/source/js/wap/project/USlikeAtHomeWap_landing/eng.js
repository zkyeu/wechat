 
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	var rePsw = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
	$(".u_submit").click(function(){
		var tel = $(".phone").val();
		var passwd = $(".pwd").val();
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
