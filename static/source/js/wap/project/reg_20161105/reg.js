/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-10-24 15:13:23
 */
define(function(require,exports,module){

	//全局参数配置
	var gconfig = {
		url: "http://wap.51talk.com:3002"
	}

	var validate = {
		isEmpty: function(value) {
			if(!value) {
				return false;
			}else{
				return true;
			}
		},
		isMobile: function(value) {
			//var reg = /(^1[3|5|8][0-9]{9}$)/;
			var reg = /^1[0-9]{10}$/;
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

	/*关闭弹层*/
    $('#dialog .close').click(function(){
        $('#dialog').addClass('hide');
    });
    // $('#j_tip .close').click(function(){
    //     $('#j_tip').addClass("hide");
    // });

    //验证码倒计时
	function recordTime(time){
		var time = time;
		var sendBtn = $("#send_code").length ? $("#send_code") : $("#send_codeNew");
		var timer = setInterval(function(){
			time--;
			sendBtn.text(time+"s");
			if(time<0){
				sendBtn.text("重获验证码");
				sendBtn.removeClass("sending");
				clearInterval(timer);
			}
		},1000);
	}

	//发送验证码
	$('#send_code').tap(function(){
		var tel = $('#reg1_tel').val();
		if($(this).hasClass('sending')){
			return;
		}
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号码');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号');
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
					$("#send_code").addClass("sending");
					recordTime(60);
				}
			}
		})
	});
	//发送验证码
	$('#send_codeNew').tap(function(){
		var that = this;
		var tel = $('#reg1_tel').val();
		var imgCode = $('#authCode').val();
		if($(this).hasClass('sending')){
			return;
		}
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号码');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号');
			return false;
		}
		if(!imgCode||(imgCode.length && imgCode.length<1)){
            alert("请填写图形验证码！");
            return false;

		}
		$.ajax({
			url:"http://www.51talk.com/passport/getMobileCode",
			type:"GET",
			datatype: 'jsonp',
			data: {
				mobile: tel,
				authCode:imgCode
			},
			success:function(res){
				var res = JSON.parse(res);
				if(res.status == 0) {
					alert(res.info);
				}else if(res.status == 1) {
					$(that).addClass("sending");
					recordTime(120);
				}else if(res.status==2){
                	$('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
				}
			}
		})
	});
	//注册
	var regBtn = $('#regBtn');
	var regForm = $('#regForm');
	regBtn.on('click', function() {
		// var tipDialog = $("#j_tip");
		// tipDialog.find(".text").html("您本次的抽奖机会用完了，感谢您的参与哦。");
		// tipDialog.removeClass("hide");

		var tel = $('#reg1_tel').val(),
			password = $('#reg1_passwd').val(),
			mobileCode = $("#reg1_code").val(),
			registerName = $("#b_registerName").val(),
			type = $("#b_type").val();
		if(!validate.isEmpty(tel)) {
			alert('请输入您的手机号码');
			return false;
		}else if(!validate.isMobile(tel)) {
			alert('请输入正确的手机号');
			return false;
		}
		if(!mobileCode){
			alert('请输入验证码');
			return;
		}
		if(!validate.isEmpty(password)) {
			alert('请设置您的密码');
			return false;
		}else if(!validate.isPassword(password)) {
			alert('密码长度为6~20');
			return false;
		}
		
		$.ajax({
			url: '/Ajax/landingRegister',
			type: 'POST',
			datatype: 'json',
			data: {
				mobile: tel,
				password: password,
				mobile_code: mobileCode,
				registerName: registerName,
				type: type
			},
			success: function(res) {
				var res = JSON.parse(res);
				if(res.status == 1) {
					$('#dialog').removeClass('hide');
				} else {
					alert(res.info);
				}
			}
		});
	});

	//判断20161111 24点图片切换
	/*$.ajax({
		url: '/Ajax/doubleElevenEvents',
		type: 'get',
		datatype: 'json',
		success: function(res) {
			if(res.status == 1) {
				$('#pic_20161105').remove();
				$('#pic_20161111').removeClass('hide');
			} else {
				alert(res.info);
			}
		}
	});*/
});
