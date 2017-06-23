/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	require("formCheck");
	require("placeholder");
	$("#b-regForm").formCheck();
	var $get_prize = $(".get_prize");
	var $get_prize_layer = $(".get_prize_layer");
	var $prize_code = $(".prize_code");
	var $layer_container_bg = $(".layer_container_bg");
	var $layer_container = $(".layer_container");
	var $prize_code = $(".prize_code");
//验证
	var email = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	var mobile = /^1[0-9]{10}$/;
	var password = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
	var $free_get = $(".free_get");
	var $free_get2 = $(".free_get2")
//第一个表单
	$free_get.click(function(event) {
		var $sh_email = $.trim($('.sh_email').val());
		var $sh_mobile = $.trim($('.sh_mobile').val());
		var $sh_password = $.trim($('.sh_password').val());
		var $sh_prize_code = $.trim($('.prize_code').val());
		if($sh_email == ''){
	    	alert("邮箱地址不能为空")
	    	return false;
	    }

	    if(!email.test($sh_email)){
	    	alert("邮箱格式不正确")
	    	return false;
	    }
	    if($sh_mobile == ''){
	    	alert("手机号码不能为空")
	    	return false;
	    }
	    if(!mobile.test($sh_mobile)){
	    	alert("请填写正确的手机号码")
	    	return false;
	    }
	    if($sh_password == ''){
	    	alert("密码不能为空")
	    	return false;
	    }
	    if(!password.test($sh_password)){
	    	alert("密码格式错误")
	    	return false;
	    }
	    if($sh_prize_code == ''){
	    	alert("奖品代码不能为空");
	    	return false;
	    }
	    $("#form_01").submit();
	});
//第二个表单
	$free_get2.click(function(event) {
		var $sh_email = $.trim($('.sh_email2').val());
		var $sh_mobile = $.trim($('.sh_mobile2').val());
		var $sh_password = $.trim($('.sh_password2').val());
		var $sh_prize_code = $.trim($('.prize_code2').val());
		
		if($sh_email == ''){
	    	alert("邮箱地址不能为空")
	    	return false;
	    }

	    if(!email.test($sh_email)){
	    	alert("邮箱格式不正确")
	    	return false;
	    }
	    if($sh_mobile == ''){
	    	alert("手机号码不能为空")
	    	return false;
	    }
	    if(!mobile.test($sh_mobile)){
	    	alert("请填写正确的手机号码")
	    	return false;
	    }
	    if($sh_password == ''){
	    	alert("密码不能为空")
	    	return false;
	    }
	    if(!password.test($sh_password)){
	    	alert("密码格式错误")
	    	return false;
	    }
	    if($sh_prize_code == ''){
	    	alert("奖品代码不能为空");
	    	return false;
	    }
	    $layer_container_bg.hide();
		$layer_container.hide();
		$("#form_02").submit();
	});

//弹层出现
	$get_prize.click(function(event) {
		$layer_container_bg.show();
		$layer_container.show();
	});
//弹层消失
	$layer_container_bg.click(function(event) {
		$(this).hide();
		$layer_container.hide();
	});
});
