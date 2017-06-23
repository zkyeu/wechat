define(function(require, exports, module) {
	var oBtn = $('.btn-wrap .btn')[0];
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
			var reg = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
			if(!reg.test(value)) {
				return false;
			}else{
				return true;
			}
		}
	};
	oBtn.addEventListener('click', function() {
		(document.body || document.documentElement).scrollTop = 0;
	}, false);
	var registerBtn = $('.register .btn')[0];
	registerBtn.addEventListener('click', function() {
		var tel = $('#tel').val(),
			password = $('#password').val();
		if(!validate.isEmpty(tel)) {
			alert('请输入手机号码');
			return false;
		};
		if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号码');
			return false;
		};
		if(!validate.isEmpty(password)) {
			alert('请输入密码');
			return false;
		}
		if(!validate.isPassword(password)) {
			alert('密码格式不正确，请输入6~20位密码');
			return false;
		};
		$('#registerFrom').submit();
	}, false);
})