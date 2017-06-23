define(function(require,exports,module) {
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
	//user center Interaction;
	$('.container .tab li').on('click', function() {
		var _self = $(this),
			index = _self.index(),
			userBox = $('.user-box > section');
		_self.addClass('current').siblings().removeClass('current');
		userBox.eq(index).show().siblings().hide();
	});
	//register
	$('.disney .register .btn').on('click', function() {
		var tel = $('.disney .register .mobile').val(),
			password = $('.disney .register .password').val(),
			registerFrom = $('#register_from').val();
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号码')
			return false;
		}
		if(!validate.isEmpty(password)) {
			alert('密码不能为空');
			return false;
		}else if(!validate.isPassword(password)) {
			alert('密码为6~20位');
			return false;
		}
		$.ajax({
			url: '/Ajax/landingRegister',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password,
				registerName: registerFrom
			},
			success: function(res) {
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					window.location.href = res.data.url;
				}
			}
		});
	});
	//login
	$('.disney .login .btn').on('click', function() {
		var tel = $('.disney .login .mobile').val(),
			password = $('.disney .login .password').val();
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号码')
			return false;
		}
		if(!validate.isEmpty(password)) {
			alert('密码不能为空');
			return false;
		}else if(!validate.isPassword(password)) {
			alert('密码为6~20位');
			return false;
		}
		$.ajax({
			url: '/Ajax/landingRegister',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password
			},
			success: function(res) {
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					window.location.href = res.data.url;
				}
			}
		});
	})
	//go back top
	$('.disney .course-plan .btn').on('click', function() {
		var offsetTop =	document.querySelector('.container').offsetTop;
		(document.body || document.documentElement).scrollTop = offsetTop;
	});
	var isComplete = false;
	var isSuccess = false;
	//click btn reservation
	$('.reservation .btn').on('click', function() {
		var _self = $(this);
		if(isComplete) {
			return false;
		}
		if(isSuccess) {
			alert('您已预约此课程，请勿重复预约！');
			return false;
		}
		if(!isComplete) {
			_self.text('正在预约中');
			isComplete = true;
		};
		$.ajax({
			url: '/Ajax/disneyAboutClass',
			type: 'POST',
			dataType: 'json',
			success: function(res) {
				if(res.status == 1) {
					alert(res.info);
				}else if(res.status == 0) {
					alert(res.info);
				}
				isComplete = false;
				isSuccess = true;
				$('.reservation .btn').text('已预约');
			}
		})
	})
})