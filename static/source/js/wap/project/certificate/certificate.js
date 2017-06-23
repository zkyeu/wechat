define(function(require, exports, module) {
	var validate = {
		isEmpty: function(value) {
			if(!value) {
				return false;
			}else{
				return true;
			}
		},
		isMobile: function(value) {
			var reg = /(^1[3|5|8][0-9]{9}$)/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		},
		isPassword: function(value) {
			var reg = /[0-9|A-Z|a-z]{6,16}/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		}
	};
	var data = {};
	$('.register .btn').on('click', function() {
		var telVal = $('#tel').val(),
			passwordVal = $('#password').val();
		//判断手机
		if(!validate.isEmpty(telVal)) {
			alert('请输入手机号码');
			return false;
		}else if(!validate.isMobile(telVal)) {
			alert('手机格式不正确，请输入正确的手机格式');
			return false;
		}
		//判断密码
		if(!validate.isEmpty(passwordVal)) {
			alert('请输入密码');
			return false;
		}else if(!validate.isPassword(passwordVal)) {
			alert('请输入正确的密码格式');
			return false;
		}
		//提交请求
		$('#formBottom').submit();
	})
})