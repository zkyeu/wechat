
define(function(require,exports,module){ 
	//Teaching Experience && Teaching Certificates
	$(".fr_TE,.fr_TC").find("i").on("click",function(){
			 if($(this).hasClass("rg_radio")){
			 			$(this).removeClass("rg_radio");
			 }else{
			 		$(this).addClass("rg_radio");
			 }
	})
	//设置TC样式
$(".fr_TC").parent().css("margin-bottom","1.0rem");
 
//验证英文名字
	$("input[name='first_name']").blur(function(){
			var first_name=$("input[name='first_name']").val();
			var Name = /^[A-Za-z]+$/;
			if(first_name==""){
					$(".fr_tip1").html("Please fill out your first name.");
					return false;
			}
			if(!Name.test(first_name)){
					$(".fr_tip1").html("First name format is not correct.");
					return false;
			}
	});
	$("input[name='first_name']").focus(function(){
			$(".fr_tip1").html("");
	});
	$("input[name='last_name']").blur(function(){
		  var Name = /^[A-Za-z]+$/;
			var last_name=$("input[name='last_name']").val();
			if(last_name==""){
					$(".fr_tip1").html("Please fill out your last name.");
					return false;
			}else if(!Name.test(last_name)){
					$(".fr_tip1").html("Last name format is not correct.");
					return false;
			}
	});
	$("input[name='last_name']").focus(function(){
			$(".fr_tip1").html("");
	});
//验证email
	$("input[name='email']").blur(function(){
		  var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
			var email=$("input[name='email']").val();
			if(email==""){
					$(".fr_tip2").html("Please fill out your email address.");
					return false;
			}else if(!E_mail.test(email)){
					$(".fr_tip2").html("Email format is not correct.");
					return false;
			}
	});
	$("input[name='email']").focus(function(){
			$(".fr_tip2").html("");
	});
//验证Mobile Number
	$("input[name='mobile']").blur(function(){
		var mobile=$("input[name='mobile']").val();
		var reMobile = /^09[0-9]*$/; 
			if(mobile==""){
					$(".fr_tip3").html("Please fill out your mobile number.");
					return false;
			}else if(!reMobile.test(mobile)){
					$(".fr_tip3").html("Mobile number format is not correct.");
					return false;
			}
	});
	$("input[name='mobile']").focus(function(){
			$(".fr_tip3").html("");
	});
//验证Skype ID
$("input[name='skype']").blur(function(){
			var skype=$("input[name='skype']").val();
			if(skype==""){
					$(".fr_tip4").html("Please fill out your skype ID.");
					return false;
			} 
	});
	$("input[name='skype']").focus(function(){
			$(".fr_tip4").html("");
	});
//form验证
	$("#fr_submit").on("click",function(){
			var reMobile = /^09[0-9]*$/;
			var Name = /^[A-Za-z]+$/;
			var E_mail = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
			var first_name=$("input[name='first_name']").val();
			var last_name=$("input[name='last_name']").val();
		  var email=$("input[name='email']").val();
		  var mobile=$("input[name='mobile']").val(); 
		  var skype=$("input[name='skype']").val();
			if(first_name==""){
					$(".fr_tip1").html("Please fill out your first name.");
					return false;
			}else if(!Name.test(first_name)){
					$(".fr_tip1").html("First name format is not correct.");
					return false;
			}else if(last_name==""){
					$(".fr_tip1").html("Please fill out your last name.");
					return false;
			}else if(!Name.test(last_name)){
					$(".fr_tip1").html("Last name format is not correct.");
					return false;
			}else if(email==""){
					$(".fr_tip2").html("Please fill out your email address.");
					return false;
			}else if(!E_mail.test(email)){
				alert(1)
					$(".fr_tip2").html("Email format is not correct.");
					return false;
			}else if(mobile==""){
					$(".fr_tip3").html("Please fill out your mobile number.");
					return false;
			}else if(!reMobile.test(mobile)){
					$(".fr_tip3").html("Mobile number format is not correct.");
					return false;
			}else if(skype==""){
					$(".fr_tip4").html("Please fill out your skype ID.");
					return false;
			}





			 
	})
});
