/**
 *
 * @authors vincent (wuyan@51talk.com)
 * @date    2017-05-27 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	
    var anniversary_login = {
    	init: function(){
    		this.ajax_able = true;//是否可以调用ajax接口
    		$(".login").on("click", this.login);
    		$("#getsms_new").on("click", this.getCode);
    	},
    	getCode: function(){
    		if (this.bAjax) {
	            return;
	        }
	        var _this=this;
	        var reTel = /^1[0-9]{10}$/;
	        var mobile=$("#reg1_tel").val();
	        var imgCode = $('#authCode').val();
	        if(!reTel.test(mobile)){
	            alert("请填写正确的手机号码！");
	            return false;
	        }else if(!imgCode||(imgCode.length && imgCode.length<1)){
	            alert("请填写图形验证码！");
	            return false;
	        }else{
	            this.bAjax=true;
	            $(this).html("请稍等...");
	            $.ajax({
	                type:"GET",
	                dataType:"jsonp",
	                url:"http://www.51talk.com/passport/getMobileCode",
	                data: {"mobile":mobile,"authCode":imgCode, type:"reg_or_login"},
	                success: function(res){
	                	
	                    if(res.status==1){
	                        anniversary_login.timer(_this,120);

	                    }else{
	                        _this.innerHTML="重新获取";
	                        _this.bAjax=false;
	                        alert(res.info);
	                        if(res.status==2){
	                            $('#verifycode').attr('src','http://www.51talk.com/passport/authCode'+'?a'+'='+new Date().getTime());
	                        }
	                    }

	                }
	            });
	        };
    	},
    	timer: function(obj,count){
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
    	},
    	login: function(){
    		var reTel = /^1[0-9]{10}$/;
			var tel = $("#reg1_tel").val();
			var mobileCode=$(".mycode").val();
			// var mobileCodeReg=/^[0-9]{5}$/;
			if (tel == "") {
				alert("请填写手机号码");
				return false;
			}
			if (!reTel.test(tel)) {
				alert("请填写正确格式手机号码");
				return false;
			}
			if(mobileCode==""){
				alert("验证码不能为空");
				return false;
	   		};

	 		/*if(!mobileCodeReg.test(mobileCode)){
	 					alert("验证码错误");
	 					return false;
	 		};*/
			$.ajaxRequest("/ajax/mobileCodeLogin",{mobile: tel, mobile_code: mobileCode, act: "anniversary"},function(res){
			  	if(res.status == 1){
	                window.location = res.data;
	            }
			},{method:"POST"});
    	}
    
    	
    };
    $.extend(true,$,{
        ajaxRequest: function(url, params, callback, settings){
            if(anniversary_login.ajax_able){
            	anniversary_login.ajax_able = false;
            	$.ajax({
	                url: url,
	                type: (settings && settings.method) || "GET",
	                dataType: (settings && settings.dataType) || "json",
	                data: params,
	                success: function(response){
	                	anniversary_login.ajax_able = true;
	                	if(response.status == 1){
		                    !!callback && callback(response);
		                }else if(response.status == -1){
							window.location.href = response.data;
			            }else{
							alert(response.info);
			            }
	                },
	                error: function(){
	                	anniversary_login.ajax_able = true;
	                	console.log("fail")
	                }
	            })
            }
        }
        
    });
    $(function(){
       
        anniversary_login.init();
    });
});



