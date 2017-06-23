
define(function(require,exports,module){
		require("placeholder");
		function registerPage(){
			$("#regformcode").hide();
		  $("#regformlogin").show();
		  $("#t_starClass").hide();
		  $(".t_steps").addClass("t_steptwo");
		  $(".t_steps").removeClass("t_stepthree");
			$("#registerPart").show();
			$("#loginPart").hide();
		};
		function loginPage(){
				$("#regformcode").hide();
			  $("#regformlogin").show();
			  $("#t_starClass").hide();
			  $(".t_steps").addClass("t_steptwo");
			  $(".t_steps").removeClass("t_stepthree");
				$("#registerPart").hide();
				$("#loginPart").show();
		};
		function homePage(){
			  $("#regformcode").show();
			  $("#regformlogin").hide();
			  $("#t_starClass").hide();
			  $(".t_steps").removeClass("t_steptwo t_stepthree");
		};
		function successPage(){
			   $("#regformlogin").hide();
			 	 $("#regformcode").hide();
				 $("#t_starClass").show();
				 $(".t_steps").removeClass("t_steptwo");
				 $(".t_steps").addClass("t_stepthree");
		}
		$(".backToFirst").on("click",function(){
				homePage();
		});
	
	  //输入激活码
	  $("input[name='course_code']").focus(function(){
	  		$(".tip_courseCode").hide();
	  		$("input[name='course_code']").removeClass("t_inputActive");
	  });
	   $("input[name='captcha']").focus(function(){
	  		$(".tip_yzCode").hide();
	  		$("input[name='captcha']").removeClass("t_inputActive");
	  });
	  $(".t_getCourseCode").on("click",function(){
	  			 var courseCode=$("input[name='course_code']").val();
	  			 var imgCode=$("input[name='captcha']").val();
	  			 if(courseCode==""){ 
	  			 			$(".tip_courseCode").show();
	  			 			$(".tip_courseCode").html("请填写课程码！");
  			 				$("input[name='course_code']").addClass("t_inputActive");
  			 				return false;
	  			 }
	  			 if(imgCode==""){
	  			 			$(".tip_yzCode").show()
	  			 			$(".tip_yzCode").html("请填写课程码！");
  			 				$("input[name='captcha']").addClass("t_inputActive");
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
			 								    registerPage();
  			 								  // location.hash="#register";
  			 								  return false;
  			 							}else if(data.status==2){
  			 									$(".tip_yzCode").show();
  			 									$(".tip_yzCode").html(data.info);
	  											$("input[name='captcha']").addClass("t_inputActive");
  			 									return false;
  			 							}else if(data.status==0){
	  											$(".tip_courseCode").show();
  			 									$(".tip_courseCode").html(data.info);
  			 									$("input[name='course_code']").addClass("t_inputActive");
	  											return false;
  			 							} 
  			 				}

  			 		});	 
	  });
//注册 and 登录   
$(".btn_register").click(function(){
		$(this).addClass("t_switchActive").siblings().removeClass("t_switchActive");
	   registerPage();
		location.hash="#register";
		return false;
	
});
$(".btn_login").click(function(){
	$(this).addClass("t_switchActive").siblings().removeClass("t_switchActive");
  loginPage();
	// location.hash="#login";
	return false;
})
	  //注册部分
	  $("input[name='mobile']").focus(function(){
	  		$(".tip_phone").hide();
	  		$("input[name='mobile']").removeClass("t_inputActive");
	  });
	  $("input[name='pwd']").focus(function(){
	  	$(".tip_pwd").hide();
	  	$("input[name='pwd']").removeClass("t_inputActive");
	  });
	  $("input[name='mobileCode']").focus(function(){
	  	$(".tip_verifiCode").hide();
	  	$("input[name='mobileCode']").removeClass("t_inputActive");
	  });

	  $(".t_loginT").on("click",function(){
	  			var regMobile=/^1[0-9]{10}$/;
	  			var mobile=$("input[name='mobile']").val();
	  			var pwd=$("input[name='pwd']").val();
	  			var regPwd=/^\d{6,18}$/;
	  			var mobileCode=$("input[name='mobileCode']").val();
	  			var RegMobileCode=/^[0-9]{5}$/;
	  			if(!regMobile.test(mobile)||mobile==""){
	  					$(".tip_phone").show();
	  					$("input[name='mobile']").addClass("t_inputActive");
	  					return false;
	  			}
	  			if(pwd==""){
	  					$(".tip_pwd").show();
	  					$("input[name='pwd']").addClass("t_inputActive");
	  					return false;
	  			}
	  			if(mobileCode==""||!RegMobileCode.test(mobileCode)){
	  					$(".tip_verifiCode").show();
	  					$("input[name='mobileCode']").addClass("t_inputActive");
	  					return false;
	  			}
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
  									$(".t_loginT").unbind("click");
  								  successPage();
  									// location.hash="#loginSuccess";	  										
  									return false;
  							}else if(data.status==0){
  								 $(".tip_phone").show();
  								 $(".tip_phone").html(data.info);
  								 $("input[name='mobile']").addClass("t_inputActive");
  								 return false;
  							}else if(data.status==2){
  								  alert(data.info);
  									$("#regformlogin").show();
  									$("#regformcode").hide();
  									$("#t_starClass").hide();
  									$(".t_steps").removeClass("t_steptwo");
  									return false;
  							}else if(data.status==3){
  									alert(data.info);
  									$("#regformlogin").show();
  									$("#regformcode").hide();
  									$("#t_starClass").hide();
  									$(".t_steps").removeClass("t_steptwo");	
  									return false;
  							}else if(data.status==5){
  									alert(data.info);
  									return false;
  							}else if(data.status==6){
  								 $(".tip_pwd").show();
  								 $(".tip_pwd").html(data.info);
  								 $("input[name='pwd']").addClass("t_inputActive");
  								 return false;
  							}else if(data.status==7){
  								 $(".tip_phone").show();
  								 $(".tip_phone").html(data.info);
  								 $("input[name='mobile']").addClass("t_inputActive");
  								 return false;
  							}else if(data.status==8){
  								 $(".tip_verifiCode").show();
  								 $(".tip_verifiCode").html(data.info);
  								 $("input[name='mobileCode']").addClass("t_inputActive");
  								 return false;
  							}else if(data.status==9){
  								 $(".tip_phone").show();
  								 $(".tip_phone").html(data.info);
  								 $("input[name='mobile']").addClass("t_inputActive");
  								 return false;
  							}
  						}
  				})	
	  			
 
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
		  		$("#getCode").html("请稍等...");
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
	 			$("input[name='user_name']").removeClass("t_inputActive");
	 	});
	 	$("input[name='password2']").focus(function(){
	 			$(".tip_password").hide();
	 			$("input[name='password2']").removeClass("t_inputActive");
	 	});
	 	$(".t_loginL").on("click",function(){
	 			var username=$("input[name='user_name']").val();
	 			var regMobile=/^1[0-9]{10}$/;
	  		var regEmail=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	  		var password=$("input[name='password2']").val();
	  		if(username==""||(!regMobile.test(username)&&!regEmail.test(username))){
	  				$(".tip_username").show();
	  				$("input[name='user_name']").addClass("t_inputActive");
	  				return false;
	  		}
	  		if(password==""){
	  				$(".tip_password").show();
	  				$("input[name='password2']").addClass("t_inputActive");
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
//判断位置
// function loactionHash(){
// 		if(window.location.hash===""){
// 				homePage();
// 				location.hash="#index";
// 		}else if(window.location.hash==="#index"){
// 				homePage();
// 		}else if(window.location.hash==="#register"){
// 			$(".btn_register").addClass("t_switchActive").siblings().removeClass("t_switchActive");
// 			 registerPage();

// 		}else if(window.location.hash==="#login"){
// 			 $(".btn_login").addClass("t_switchActive").siblings().removeClass("t_switchActive");
// 			 loginPage();
// 		}else if(window.location.hash==="#loginSuccess"){
// 			 successPage();
// 		}
// };
// loactionHash();
// window.onhashchange=function(){
// 		loactionHash();
// }
 

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
	  									 $(".t_loginL").unbind("click");
	  									 successPage();
	  									 // location.hash="#loginSuccess";
	  									 return false;
	  							}else if(data.status==2){
	  								   alert(data.info);
	  									 $("#regformlogin").show();
	  									 $("#regformcode").hide();
	  									 $("#t_starClass").hide();
	  									 $(".t_steps").removeClass("t_steptwo");
	  									 return false; 
	  							}else if(data.status==0){
	  									 alert(data.info);
	  									 return false;
	  							}else if(data.status==3){
  										alert(data.info);
  										 $("#regformlogin").show();
	  									 $("#regformcode").hide();
	  									 $("#t_starClass").hide();
	  									 $(".t_steps").removeClass("t_steptwo");
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

	// ie低版本
	// !function(){
	// 		var oldHref = location.href;
	// 		function checkHrefChange(){
	// 		if(oldHref == location.href) return;
	// 		oldHref = location.href;
	// 		window.onhashchange();
	// 		}
	// 		setInterval(checkHrefChange, 10);
	// }();

});

 





	
