define(function(require,exports,module){
	var reTel = /(^1[3|4|5|7|8][0-9]{9}$)/;
	var rePas = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
	$("#reg_form").on('click', '.p-register_send', function(){
		var tel = $("#mobile").val(),
		pas = $("#password").val();
		if(tel == "" || tel == null) {
			$(".tips-text").html("手机号码不能为空！")
			$(".f-mask").show();
			return;
		}
		if (!reTel.test(tel)) {
			$(".tips-text").html("请输入正确手机号码！")
			$(".f-mask").show();
			return;
		}
		if (!rePas.test(pas)) {
			$(".tips-text").html("请输入6-20位的密码！")
			$(".f-mask").show();
			return;
		}
		$("#reg_form").submit();

	});
	$(".f-mask").on('click', '.close_btn', function() {
		$(".f-mask").hide();
	});
	$(".add-link-btn").on('click', 'a', function() {
		document.body.scrollTop = 0;
	});
});
