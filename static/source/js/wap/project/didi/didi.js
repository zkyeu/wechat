define(function(require, exports, module) {
	var dialog = require('minidialog');
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

	function reviewDialog(){
		var height = document.body.scrollHeight
		$(".js_mask").height(height);
	}
	
	//验证码倒计时
	function recordTime(time){
		var time = time;
		var timer = setInterval(function(){
			time--;

			$(".send-code").text("倒计时"+time+"s");
			if(time<0){
				$(".send-code").text("重获验证码");
				$(".send-code").removeClass("sending");
				clearInterval(timer);
			}
		},1000);
	}

	$('.send-code').tap(function(){
		var tel = $('.reg .tel').val();
		if($(this).hasClass('sending')){
			return;
		}
		if(!validate.isEmpty(tel)) {
			new dialog({
				html: '请输入您的手机号码',
				modal: true,
				autoHide: 1500
			});
			return false;
		}else if(!validate.isMobile(tel)) {
			new dialog({
				html: '请输入正确的手机号',
				modal: true,
				autoHide: 1500
			});
			return false;
		}
		
		
		$.ajax({
			url:"/Ajax/sendSms",
			type:"POST",
			datatype: 'json',
			data: {
				mobile: tel
			},
			success:function(res){
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					$(".send-code").addClass("sending");
					recordTime(60);
				}
			}
		})
	});
	var receiveBtn = $('.reg .submit2');
	receiveBtn.on('click', function() {
		var tel = $('.tel').val(),
			password = $('.reg .password').val(),
			registerName = $('.reg .register_from').val(),
			mobileCode = $(".reg .code").val(),
			type = $('.reg .type').val();
		if(!validate.isEmpty(tel)) {
			new dialog({
				html: '请输入您的手机号码',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}else if(!validate.isMobile(tel)) {
			new dialog({
				html: '请输入正确的手机号',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}
		if(!mobileCode){
			new dialog({
				html: '请输入验证码',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return;
		}
		if(!validate.isEmpty(password)) {
			new dialog({
				html: '请设置您的密码',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}else if(!validate.isPassword(password)) {
			new dialog({
				html: '密码长度为6~20',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}
		$.ajax({
			url: '/Ajax/landingRegister',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password,
				mobile_code:mobileCode,
				registerName: registerName,
				type: type
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

	//登录
	var receiveBtn2 = $('.login .submit1');
	receiveBtn2.on('click', function() {
		var tel = $('.login  .tel').val(),
			password = $('.login  .password').val(),
			registerName = $('.login  .register_from').val(),
			type = $('.login  .type').val();
		if(!validate.isEmpty(tel)) {
			new dialog({
				html: '请输入您的手机号码',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}else if(!validate.isMobile(tel)) {
			new dialog({
				html: '请输入正确的手机号',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}
		if(!validate.isEmpty(password)) {
			new dialog({
				html: '请设置您的密码',
				modal: true,
				autoHide: 1500
			});
			reviewDialog();
			return false;
		}else if(!validate.isPassword(password)) {
			new dialog({
				html: '密码长度为6~20',
				modal: true,
				autoHide: 1500
			});
			return false;
		}
		$.ajax({
			url: '/Ajax/landingLogin',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password,
				registerName: registerName,
				type: type
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

	$("#login").tap(function(){
		$(".login .tel").val("");
		$(".login .password").val("");
		$(".reg").show();
		$("#reg").parent().show();
		$(".login").hide();
		$("#login").parent().hide();
	});
	$("#reg").tap(function(){
		$(".reg").hide();
		$(".reg .tel").val("");
		$(".reg .password").val("");
		$(".reg .code").val("");
		$("#reg").parent().hide();
		$(".login").show();
		$("#login").parent().show();
	});
})