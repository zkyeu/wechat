define(function(require, exports, module) {
	/*选择人群*/
	$(".selectBtn").on("click", function(e) {
		$(".selectBtn").siblings(".group").show();
		$(document).on("click", function(){  
	        $(".group").hide();
	   });
	    e.stopPropagation();
	});

	$(".selectBtn").siblings(".group").find(".list").on("click", function(e) {
		var reTel = /^1[0-9]{10}$/;
		var tel = $("#reg1_tel").val().trim();
		var pwdReg=/^\w{6,}$/;
		var pwd = $("#reg1_passwd").val().trim();
		var _this = $(this);
		_this.not(".defaut").addClass("active").siblings().removeClass("active");
		_this.siblings(".defaut").find("em").html(_this.find("em").html());
		$(".selectBtn").html(_this.find("em").html());
		$("#selector").val(_this.attr("data"));
		setTimeout(function() {
			_this.parent(".group").hide();
			if ($("#selector").val() == "") {
				$(".selectBtn").addClass("error");
				$("#reg1").addClass("noClick");
				//其他灰色显示
				if(!reTel.test(tel)){
					  $("#reg1_tel").val("").removeClass("error");
			  }
			  if(!pwdReg.test(pwd)){
					  $("#reg1_passwd").val("").removeClass("error");
			 	}
			} else {
				$(".selectBtn").removeClass("error");
			}
		}, 300);
		checkForm();
	});
  
	/*手机号码*/
	$("#reg1_tel").blur(function() {
		var reTel = /^1[0-9]{10}$/;
		var tel = $("#reg1_tel").val().trim();
		var pwdReg=/^\w{6,}$/;
		var pwd = $("#reg1_passwd").val().trim();
		if (!reTel.test(tel)) {
			$(this).addClass("error").val("手机号格式不对");
			$("#reg1").addClass("noClick");
			if(!pwdReg.test(pwd)){
					  $("#reg1_passwd").val("").removeClass("error");
			 }
			 $(".selectBtn").removeClass("error");
			return false;
		}
		if (tel == "") {
			$(this).addClass("error").val("");
			$("#reg1").addClass("noClick");
			if(!pwdReg.test(pwd)){
					  $("#reg1_passwd").val("").removeClass("error");
			 }
			 $(".selectBtn").removeClass("error");
			return false;
		}
		checkForm();
	});
	$("#reg1_tel").focus(function() {
		var reTel = /^1[0-9]{10}$/;
		var tel = $("#reg1_tel").val().trim();
		if(!reTel.test(tel)){
				$(this).val("");
		}
		$(this).removeClass("error");
	});
	/*密码*/
	$("#reg1_passwd").blur(function() {
		var pwdReg=/^\w{6,}$/;
		var pwd = $("#reg1_passwd").val().trim();
		var reTel = /^1[0-9]{10}$/;
		var tel = $("#reg1_tel").val().trim();
		if (!pwdReg.test(pwd)) {
			 $(this).val("");
			 $(this).addClass("error").attr("placeholder","密码不低于6位数");
			 $("#reg1").addClass("noClick");
			 if(!reTel.test(tel)){
					  $("#reg1_tel").val("").removeClass("error");
			 }
			 $(".selectBtn").removeClass("error");
			 return false;
		}
		if (pwd=="") {
			 $(this).val("");
			 $(this).addClass("error").attr("placeholder","密码不能为空");
			 $("#reg1").addClass("noClick");
			 if(!reTel.test(tel)){
					  $("#reg1_tel").val("").removeClass("error");
			 }
			 $(".selectBtn").removeClass("error");
			 return false;
		}
		checkForm();
	});
	$("#reg1_passwd").focus(function() {
		$(this).removeClass("error").attr("placeholder","设置您的密码");
	});

	/*提交按钮*/
	function checkForm() {
		if ($("#selector").val().trim() != "" && $("#reg1_tel").val().trim() != "" && $("#reg1_passwd").val().trim() != "") {
				$("#reg1").removeClass("noClick");
		}else{
				$("#reg1").addClass("noClick");
		}
	}
	/*表单提交*/
	$("#reg1").on("click", function() {
		var reTel = /^1[0-9]{10}$/;
		var tel = $("#reg1_tel").val();
		if (!($(this).hasClass("noClick"))) {
			 $("#reg1_form").submit();
		}
	});
  //改变窗口大小
	$(window).resize(function() {
		var groups =$("#selector").val().trim();
		var tel=$("#reg1_tel").val().trim();
		var pwd=$("#reg1_passwd").val().trim();
		var reTel = /^1[0-9]{10}$/;
		var pwdReg=/^\w{6,}$/;
		var groups_val;
		var tel_val;
		var pwd_val;
		if(groups!=""){
			groups_val=true;
		}
		if(tel!=""&& reTel.test(tel)){
			tel_val=true;
		}
		if(pwd!=""&& pwdReg.test(pwd)){
			pwd_val=true;
		}
		if(groups_val==true && tel_val==true && pwd_val==true){
				$("#reg1").removeClass("noClick");
		}else{
			  $("#reg1").addClass("noClick");
		}
	});


});