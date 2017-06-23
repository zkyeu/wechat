/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	$(".login_now").tap(function(){
		$(".m-reg").hide();
		$(".m-log").show();
	});

	var rule={
		"mobile":{//手机号
			"reg":/^1[0-9]{10}$/,
			"error":"请填写正确的手机号码",
			"empty":"手机号码不能为空"
		},
		"password":{
			"reg":/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
			"error":"密码格式错误",
			"empty":"密码不能为空"
		},
		"code":{
			"reg":/^\d{5}$/,
			"error":"验证码格式错误",
			"empty":"验证码不能为空"
		}
	};
	
	$(".u-btn-sb").tap(function(){
		var oForm=$(this).parents("form");
		var aInput=oForm[0].querySelectorAll(".u-ipt");
		var sError=null;
		var nowInput=null;
		for(var i=0;i<aInput.length;i++){
			var oInput=aInput[i];
			var val=oInput.value;
			var json=rule[oInput.name];
			var reg=json.reg;
			if(val===""){
				sError=json.empty;
				nowInput=oInput;
				break;
			}else if(!reg.test(val)){
				sError=json.error;
				nowInput=oInput;
				break;
			}
		}
		if(sError){
			$(nowInput).next().html(sError).css("visibility","visible");
		}else{
			$.ajax({
                type: oForm.attr("method"),
                dataType: "json",
                url: oForm.attr("action"),
                data: oForm.serializeArray(),
                success: function(res){
                	if(res.status==1){
                		$(".m-log,.m-reg").hide();
                		$(".m-success").show();
                	}else if(res.status==2){
                		location.href="/user/trial";
                	}else if(res.status==0){
                		alert(res.message);
                	}else if(res.status==-1){
                		alert(res.message);
                	}
                }
            });
		}
	});

	$("input[name]").each(function() {
		$(this).focus(function(){
			$(this).next().css("visibility","hidden");
		});
	});

	$(".getCode").on("click",function(){
		var mobile=$("#mobile").val();
		var _this=this;
		this.bAjax=true;
		this.innerHTML="请稍等...";
		$.ajax({
			type:"POST",
			dataType:"json",
			url: "/landing/togetherWork/?send=true",
			data: {"mobile":mobile},
			success: function(res){
				if(res.status){
					timer(_this,60);
				}else{
					_this.innerHTML="重新获取验证码";
					_this.bAjax=false;
					alert("发送验证码失败！");
				}

			}
		}); 
	});
	//倒计时
	function timer(obj,count){
		obj.innerHTML=count+"秒后重新获取";
		obj.timer=setInterval(function(){
			count--;
			if(count==0){
				obj.innerHTML= "重新获取验证码";
				obj.bAjax=false;
				clearInterval(obj.timer);
			}else{
				var str=count+"秒后重新获取";
				obj.innerHTML=str;
			}
		},1000);
	}	
});
