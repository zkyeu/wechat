/**
 *
 * @authors chenxiaosong@51talk.com 
 * @date    2017-03-06 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var reTel = /^1[0-9]{10}$/;
	var rePsw = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/;
	$(".free").click(function(){
		var tel = $("#reg1_tel").val();
		var passwd = $("#reg1_passwd").val();
		if (tel == "") {
			alert("请填写手机号码");
			return false;
		}
		if (!reTel.test(tel)) {
			alert("请填写正确格式手机号码");
			return false;
		}
		if (passwd == "") {
			alert("请填写密码");
			return false;
		}
		if (!rePsw.test(passwd)) {
			alert("请输入6-20位的密码");
			return false;
		}
		document.getElementById("reg1_form").submit();
    _taq.push({convert_id:"59723374101", event_type:"form"});

	});
	//sms
	$("#reg1").on("click",function(){
		 var tel2=$("#reg2_tel").val();
		 var tel2_code=$("#tel2_code").val();
		 var regTelCode=/^[0-9]{5}$/;
		 var reg2_passwd=$("#reg2_passwd").val();
		 if(tel2==""){
		 		alert("请填写手机号码！");
		 		return false;
		 }
		 if(!reTel.test(tel2)){
		 		alert("请填写正确格式的手机号码！");
		 		return false;
		 }
		 if(tel2_code==""){
		 		alert("请填写手机验证码！");
		 		return false;
		 }
		 if(!regTelCode.test(tel2_code)){
		 		alert("验证码错误!");
		 		return false;
		 }
		 if(reg2_passwd==""){
		 		alert("请填写密码！")
		 		return false;
		 }
		 $("#reg1_form").submit();
	});
	//旧的
	$("#getsms").on("click",function(){
			 if(this.oAjax){
			 		return
			 }
			 var tel2=$("#reg2_tel").val();
			 //var times_btn=$("#getsms");
			 var _this=this;
			 if(!reTel.test(tel2)){
			 		alert("请填写正确的手机号码！");
			 		return false;
			 }else{
			 	 _this.oAjax=true;
				 $.ajax({
				 		url:"/Ajax/sendSms",
				 		type:"post",
				 		dataType:"json",
				 		data:{mobile:tel2},
				 		success: function(res){
				 			if(res.status==1){
				 					timer(_this,60);

				 			}else{
				 					_this.innerHTML= "重新获取";
				 					_this.oAjax=false;
				 					alert(res.info);
				 			}
				 		}

				 });
			 }

	});
    $("#getsms_new").on("click",function(){
        if(this.oAjax){
            return
        }
        var tel2=$("#reg2_tel").val();
        var imgCode = $('#authCode').val();
        //var times_btn=$("#getsms");
        var _this=this;
        if(!reTel.test(tel2)){
            alert("请填写正确的手机号码！");
            return false;
        }else if(!imgCode||(imgCode.length && imgCode.length<1)){
            alert("请填写图形验证码！");
            return false;
		}else{
            _this.oAjax=true;
            $.ajax({
                url:"http://www.51talk.com/passport/getMobileCode",
                type:"GET",
                dataType:"jsonp",
                data:{
                    authCode:imgCode,
                	mobile:tel2
                },
                success: function(res){
                    if(res.status==1){
                        timer(_this,120);

                    }else{
                        _this.innerHTML= "重新获取";
                        _this.oAjax=false;
                        alert(res.info);
                        if(res.status==2){
                        	$('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
						}
                    }
                }

            });
        }

    });
	//获取验证码
	function timer(obj,t){ 
		obj.timer=setInterval(function(){ 
			t--;
			if(t==0){ 
					obj.innerHTML= "重新获取";
					obj.oAjax=false;
					clearInterval(obj.timer);
			}else{ 
				 obj.innerHTML= t+"秒";
			}

		},1000);
	};


});
