$(function(){
	var email='',code="",pass1="",pass2="";
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		currentClass:"current",
		current_page:"teach"
	});;
	//login
	var func={};
	func.login=function(){
		var user=$("input[name=username]").val(),
		password=$("input[name=password]").val();
		if(!user||!password){
			$("p.wrong").text("The email or password you input is incorrect").show();
			return;
		};
		$.ajax({
			url:BASE_URL+"/phweb/page/ajaxLogin",
			type:"POST",
			data:{
				username:user,
				password:password
			},
			success:function(d){
				if(d.code==0){
					window.location=d.res.location;
				}else if(d.code==1){
					$("p.wrong").show().text(d.message);
				}
			}
		})
	};
	func.send_email=function(){
		email=$(".email>input").val();
		if(!email)return;
		$.ajax({
			url:BASE_URL+"/phweb/page/ajaxSendPwdCode",
			type:"POST",
			data:{
				email:email
			},
			success:function(d){
				if(d.code==0||d.code==2){
					$("div.email_code p.notice>span").text(email);
					$("div.password").addClass("hide");
					$("div.email_code").removeClass("hide");
				}else if(d.code==1){
					$(".password p.wrong").show().text(d.message);
				}
			}
		})
	}
	func.check_code=function(){
		code=$("input[action-type=email]").val();
		if(!email||!code)return;
		$.ajax({
			url:BASE_URL+"/phweb/page/ajaxCheckPwdCode",
			type:"POST",
			data:{
				code:code,
				email:email
			},
			success:function(d){
				if(d.code==0){
					$("div.email_code").addClass("hide");
					$("div.reset_code").removeClass("hide");
				}else if(d.code==1){
					$(".email_code p.wrong").show().text(d.message);
				}
			}
		})
	}
	func.reset_pwd=function(){
		pass1=$("input[name=password]").val();
		if(!email||!code||!pass1||!pass2)return;
		$.ajax({
			url:BASE_URL+"/phweb/page/ajaxResetPwd",
			type:"POST",
			data:{
				code:code,
				email:email,
				password:pass1,
				confirm_password:pass2
			},
			success:function(d){
				if(d.code==0){
					$("div.reset_code").addClass("hide");
					$("div.reset_done").removeClass("hide");
				}else if(d.code==1){
					alert(d.message);
				}
			}
		})
	}
	//登陆
	$("a.login").on('click',function(){
		func.login();
	});
	//发送验证码至邮箱
	$("a[action-type=send_email]").on("click",function(){
		func.send_email();
	});
	//校验验证码
	$("a[action-type=check_code]").on("click",function(){
		func.check_code();
	});

	$("div.email_code a.cancel").on('click',function(){
		$("div.password").removeClass("hide");
		$("div.email_code").addClass("hide")
	});
	//修改密码
	$("a[action-type=reset_pwd]").on("click",function(){
		pass1=$("input[name=password]").val(),
		pass2=$("input[name=confirm_password]").val();
		if(pass1!==pass2){
			alert("Please enter the same password!");
			return;
		}
		func.reset_pwd();
	});

	$("div.reset_code a.cancel").on('click',function(){
		$("div.email_code").removeClass("hide");
		$("div.reset_code").addClass("hide")
	});
	func.code_rule=function(v){
		if(!v||v==""){
			$("div.n_t_p li").removeClass().addClass("inital");
			return;
		}
		//8个或者更多的字符
		this.rule1=function(){
			return v.length>=8?true:false;
		}
		//有大写字符且小写字符
		this.rule2=function(){
			var reg=/[A-Z]+/;
			var reg2=/[a-z]+/;
			return reg.test(v)&&reg2.test(v);
		}
		this.rule3=function(){
			var reg=/[0-9]+/;
			return reg.test(v);
		}
		this.set_class=function(i,c){
			if(i===undefined||!c)return;
			$("div.n_t_p li").eq(i).removeClass();
			$("div.n_t_p li").eq(i).addClass(c);
		}
		this.init=function(){
			var rule1=this.rule1(),
			rule2=this.rule2(),
			rule3=this.rule3();
			if(rule1){
				this.set_class(0,"correct");
			}else{
				this.set_class(0,"incorrect");
			}
			if(rule2){
				this.set_class(1,"correct");
			}else{
				this.set_class(1,"incorrect");
			}if(rule3){
				this.set_class(2,"correct");
			}else{
				this.set_class(2,"incorrect");
			}
		}
		this.init();
	}
	//修改密码，实时校验
	$("input[name=password]").on("focus",function(){//切换时触发一次判断
		var val=$(this).val();
		$("div.n_t_p").show();
		func.code_rule(val);
		$("input[name=password]").on("keyup",function(){//输入的时候触发
			var val=$(this).val();
			func.code_rule(val);
		});
	}).on("blur",function(){
		$("div.n_t_p").hide();
	})
	$("input[name=confirm_password]").on("focus",function(){
		var val=$(this).val();
		$("div.n_t_p").show();
		func.code_rule(val);
		$("input[name=confirm_password]").on("keyup",function(){
			var val=$(this).val();
			func.code_rule(val);
		});
	}).on("blur",function(){
		$("div.n_t_p").hide();
	})
})