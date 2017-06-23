
define(function(require,exports,module){
	  //输入激活码
	  $("input[name='course_code']").focus(function(){
	  		$(".tip_courseCode").hide();
	  });
	   $("input[name='captcha']").focus(function(){
	  		$(".tip_imgCode").hide();
	  });
	  $(".t_getCourseCode").on("click",function(){
	  			 var courseCode=$("input[name='course_code']").val();
	  			 var imgCode=$("input[name='captcha']").val();
	  			 var registerHref=$(".t_getCourseCode").attr("data-href");
	  			  if(courseCode==""){ 
	  			 			$(".tip_courseCode").show();
	  			 			$(".tip_courseCode").html("<i></i>请填写课程码！");
  			 				return false;
	  			 }
	  			 if(imgCode==""){
	  			 			$(".tip_imgCode").show()
	  			 			$(".tip_imgCode").html("<i></i>请填写验证码！");
  			 				return false;
	  			 }
  			 		$.ajax({
  			 				type:"post",
  			 				url:"/Ajax/checkCourseCode",
  			 				dataType:"json",
  			 				data:{
	  			 					"course_code":courseCode,
	  			 					"captcha":imgCode
	  			 				},
  			 				success:function(data){
  			 							if(data.status==1){
  			 								  window.location.href=registerHref;
  			 								  return false;
  			 							}else if(data.status==2){
  			 									$(".tip_courseCode").show();
  			 									$(".tip_courseCode").html("<i></i>"+data.info);
  			 									return false;
  			 							}else if(data.status==0){
  			 									$(".tip_imgCode").show();
  			 									$(".tip_imgCode").html("<i></i>"+data.info);
  			 									return false;
  			 							}
  			 				}
  			 		});	 
	  });
	  //注册部分
	  $("input[name='mobile']").focus(function(){
	  		$(".tip_phone").hide();
	  });
	  $("input[name='pwd']").focus(function(){
	  	 $(".tip_pwd").hide();
	  });
	  $("input[name='mobileCode']").focus(function(){
	  	 $(".tip_verifiCode").hide();
	  });
	  $(".t_loginT").on("click",function(){
	  			var regMobile=/^1[0-9]{10}$/;
	  			var regEmail=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	  			var mobile=$("input[name='mobile']").val();
	  			var pwd=$("input[name='pwd']").val();
	  			var email=$("input[name='email']").val();
	  			var mobileCode=$("input[name='mobileCode']").val();
	  			var RegMobileCode=/^[0-9]{5}$/;
	  			var loginHref=$(".t_loginT").attr("data-href");
	  			var homeHref=$(".t_home").attr("data-href");
	  			if(!regMobile.test(mobile)||mobile==""){
	  					$(".tip_phone").show();
	  					$(".tip_phone").html("<i></i>请填写正确手机号！");
	  					return false;
	  			}
	  			if(pwd==""){
	  					$(".tip_pwd").show();
	  					$(".tip_pwd").html("<i></i>密码不能为空！");
	  					return false;
	  			}
	  			if(mobileCode==""||!RegMobileCode.test(mobileCode)){
	  					$(".tip_verifiCode").show();
	  					$(".tip_verifiCode").html("<i></i>请填写正确的验证码！");
	  					return false;
	  			}else{
	  				$.ajax({
	  						url:"/Ajax/tmallRegister",
	  						type:"post",
	  						dataType:"json",
	  						data:{
	  							"mobile":mobile,
	  							"pwd":pwd,
	  							"mobileCode":mobileCode
	  						},
	  						success:function(data){
	  							if(data.status==1){
	  									 window.location.href=loginHref;
	  									 return false;
	  							}else if(data.status==0){
	  								 $(".tip_phone").show();
	  								 $(".tip_phone").html("<i></i>"+data.info);
	  								  return false;
	  							}else if(data.status==2){
	  								 alert(data.info);
	  								 window.location.href=homeHref;
	  								 return false;
	  							}else if(data.status==3){
	  								 alert(data.info);
	  								 window.location.href=homeHref;
	  								 return false;
	  							}else if(data.status==5){
	  								 alert(data.info);
	  								 return false;
	  							}else if(data.status==9){
	  									$(".tip_phone").show(); 
	  								 	$(".tip_phone").html("<i></i>"+data.info);
	  								  return false;
	  							}else if(data.status==6){
	  									$(".tip_pwd").show();
	  								 	$(".tip_pwd").html("<i></i>"+data.info);
	  								  return false;
	  							}else if(data.status==7){
	  									$(".tip_phone").show(); 
	  								 	$(".tip_phone").html("<i></i>"+data.info);
	  								  return false;
	  							}else if(data.status==8){
	  								 $(".tip_verifiCode").show();
	  								 $(".tip_verifiCode").html("<i></i>"+data.info);
	  								 return false;
	  							}
	  						}

	  				})	
	  			}
 
	  });
 	 	//获取验证码
	 $("#getCode").on("click",function(){
	 			 var mobile=$("input[name='mobile']").val();
	 			 var regMobile=/^1[0-9]{10}$/;
	 			 var _this=this;
	 			 if (this.bAjax){
					return;
				}
	 			 if(mobile==""||!regMobile.test(mobile)){
	 			 	 alert("请填写正确的手机号码！");
	 			 	 return false;
	 			 }else{
		  		this.bAjax=true;
		  		$("#getCode").val("请稍等...");
	        $.ajax({
	            type:"POST",
	            dataType:"json",
	            url: "/Ajax/sendSms",
	            data: {"mobile":mobile},
	            success: function(res){
	                if(res.status==1){
	                    timer(_this,60);

	                }else{
	                    _this.innerHTML="重新获取";
	                    _this.bAjax=false;
	                    alert(res.info);
	                }

	            }
	        }); 
   		 };
	 	});
	 	  //倒计时
    function timer(obj,count){
        obj.innerHTML="请稍等...";
        obj.timer=setInterval(function(){
            count--;
            if(count==0){
                obj.innerHTML= "重新获取";
                obj.bAjax=false;
                clearInterval(obj.timer);
            }else{
                var str=count+"秒";
                obj.innerHTML=str;
            }
        },1000);
    } 
	 //登录部分
	 	$("input[name='user_name']").focus(function(){
	 			$(".tip_username").hide();
	 	});
	 	$("input[name='password2']").focus(function(){
	 			$(".tip_password").hide();
	 	});
	 	$(".t_loginL").on("click",function(){
	 			var username=$("input[name='user_name']").val();
	 			var regMobile=/^1[0-9]{10}$/;
	  		var regEmail=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	  		var password=$("input[name='password2']").val();
	  		var loginsuccessHref=$(".t_loginL").attr("data-href");
	  		var homeHref=$(".t_home").attr("data-href");
	  		if(username==""||(!regMobile.test(username)&&!regEmail.test(username))){
	  				$(".tip_username").show();
	  				$(".tip_username").html("<i></i>请填写正确的手机号码或者邮箱！");
	  				return false;
	  		}
	  		if(password==""){
	  				$(".tip_password").show();
	  				$(".tip_password").html("<i></i>密码不能为空！");
	  				return false;
	  		}
		  var login_la = $('#login_la').val();
	    var public_key = $('#public_key').val();
	    var password = $('#password2').val();

			if(!public_key){
	        	ssoController.getPublicKey();
	        }
	        var encrypt = new JSEncrypt();
	        encrypt.setPublicKey(public_key);
	        var encrypted = encrypt.encrypt(password);
	        $("#password").val(encrypted);
			if(!encrypted || encrypted=="false"){
	    	$("#password").val(hex_md5(password));
	    }
	    if(!login_la){
	    	ssoController.preLogin();
	    } else {
	    		$("#password2").removeAttr('name');
	    				$("#LoginForm").submit();
	    }
	 	});

	//sso
window.ssoController = {
	preLogin:function(){
		$.ajax({
            url: 'http://login.51talk.com/sso/prelogin',
            dataType: 'jsonp',
            jsonpCallback: 'preLoginCallBack',
            data: $('#LoginForm').serialize(),
            type: 'get',
            success: function(ret) {
                $('#login_la').val(ret.res.la);
                //收起错误信息
                $("#password2").removeAttr('name');
								$("#LoginForm").attr("submited",true).submit().find('li.u-error').removeClass('u-error').end().find('.jsSubmit').val("登录...");
				            }
        });
	},
	feedBack: function(dataObj){
		var data = eval(dataObj);
		if (data.code == 10000){
			var username=$("input[name='user_name']").val();
			var password=$("input[name='password2']").val();
			var loginsuccessHref=$(".t_loginL").attr("data-href");
	  	var homeHref=$(".t_home").attr("data-href");
				 $.ajax({
	  					url:"/Ajax/tmallLogin",
	  					type:"post",
	  					dataType:"json",
	  					data:{
	  						"username":username,
	  						"password":password
	  					},
	  					success:function(data){
	  							if(data.status==1){
	  									 window.location.href=loginsuccessHref;
	  									 return false;
	  							}else if(data.status==2){
	  									alert(data.info);
	  									window.location.href=homeHref;
	  									return false;
	  							}else if(data.status==0){
	  									alert(data.info);
	  									return false;
	  							}else if(data.status==3){
	  									alert(data.info);
	  									window.location.href=homeHref;
	  									return false;
	  							}
	  					}
	  			})	
		} else {
				alert("您的用户名或者密码错误！");	
		}
	},
	getPublicKey:function(){
		var client_id = $('input[name=client]').val() || 1;
		if($("#public_key").val()){
			return;
		}
		$.ajax({
        url: 'http://login.51talk.com/sso/publickey',
        dataType: 'jsonp',
        jsonpCallback: 'pubkeyCallBack',
        data: {'client':client_id},
        type: 'get',
        success: function(ret) {
            $("#public_key").val(ret.res.rsa_pub);
        }
    });
	}
};

	//动态插入iframe为sso跨域做准备
	(function(){
		var loginForm=$("#LoginForm");
		$("body").append("<iframe id='ssoLoginFrame' name='ssoLoginFrame' width='0' height='0' style='display:none;'></iframe>");
	    var hidden3='<input type="hidden" name="public_key" id="public_key" />'+
	                '<input type="hidden" name="la" id="login_la" />'+
	                '<input type="hidden" name="group" id="group" value="4" />' +
	                '<input type="hidden" name="password" id="password">';
	    loginForm.attr({
	        "target" : "ssoLoginFrame",
	        "action" : "http://login.51talk.com/sso/login"
	    }).append(hidden3);
	    ssoController.getPublicKey();
	    $('#user_name').blur(function(){
	        $.ajax({		
	            url: 'http://login.51talk.com/sso/prelogin',
	            dataType: 'jsonp',
	            jsonpCallback: 'preLoginCallBack',
	            data: loginForm.serialize(),
	            type: 'get',
	            success: function(ret) {
	                $('#login_la').val(ret.res.la);
	            }
	        });
	        return false;
	    }).focus(function(){
	    	ssoController.getPublicKey();
	    });
	    $('#password').focus(function(){
	    	ssoController.getPublicKey();
	    });
	})();


});
