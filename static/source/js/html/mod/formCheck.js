/**
 * 
 * @authors Saturday (13811774679@163.com)
 * @date    2014-09-19 10:46:34
 * @version 1.0.0
 */
define("formCheck",[],function(require,exports,module){
	//表单验证常用的正则表达式
	var defaultJson={
		"email":{//邮箱
			"reg":/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i,
			"error":"邮箱格式不正确",
			"empty":"请填写邮箱"
		},
		"mobile":{//手机号
			"reg":/^1[0-9]{10}$/,
			"error":"请填写正确的手机号码",
			"empty":"手机号码不能为空"
		},
		"user_name":{
			"reg":/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i,
			"error":"邮箱格式不正确",
			"empty":"请填写邮箱"
		},
		"nick_name":{
			"reg":/^[A-Za-z\s]{2,20}$/i,
			"error":"请输入正确的英文名字",
			"empty":"英文名字不能为空"
		},
		"age":{
			"reg":/^(\d{1,2}|100)$/,
			"error":"年龄格式不正确",
			"empty":"年龄不能为空"
		},
		"address":{
			"reg":/[^\s]{1,}/,
			"error":"地址不能为空",
			"empty":"地址不能为空"
		},
		"zip_code":{
			"reg":/^[0-9]{6}$/,
			"error":"邮编格式错误",
			"empty":"邮编不能为空"
		},
		"password":{
			"reg":/^[\w\+\!\@\#\$\%\^\&\*\(\)]{6,20}$/,
			"error":"密码格式错误",
			"empty":"密码不能为空"
		},
		"recommen_mobile":{
			"reg":/^([a-z0-9]{6,20})$/,
			"error":"请填写正确的推荐手机号/推荐码",
			"empty":"推荐手机号/推荐码不能为空"
		},
		"qq":{
			"reg":/^[1-9]{1}[0-9]{4,}$/i,
			"error":"qq格式不正确",
			"empty":"qq不能为空",
			"choice":"QQ和Skype不能同时为空"
		}
	};
	$.fn.extend({
		formCheck:function(options){
			options=options || {};
			var defaults={
				"focus"		 :false,
				"alertType"	 :"alert",
				"enterSubmit":true,
				"json"		 :defaultJson
			};
			
			var settings=$.extend(true,defaults,options);
			var type=settings.type;
			var alertType=settings.alertType;
			var enterSubmit=settings.enterSubmit;
			var json=settings.json;
			return this.each(function(index,ele){
				var oForm=$(ele);
				var oBtn=oForm.find(".jsSubmit");
				oBtn.click(function(){
					var aInput=oForm.find("[name].jsCheck");
					if(oForm.attr("submited")) return;
					var bOk=true;
					var errorMsg=null;
					var oNow=null;
					aInput.each(function(index,ele){
						var oInput=$(ele);
						var name=oInput.attr("name");
						var oBtn=oForm.find(".jsSubmit");
						var oInput=$(ele);
						var inputType=oInput.attr("type");
						if(inputType=="radio" || inputType=="checkbox"){
							var val=$.trim($("[name="+name+"]"+":checked").val());
						}else{
							var val=$.trim(oInput.val());
						}
						var regJson=json[name];
						var reg=regJson.reg;
						var error=regJson.error;
						var empty=regJson.empty;
						var prompt=regJson.prompt;
						var same=regJson.same;
						var choice=regJson.choice;
						//当前字段是否可以为空 empty 允许为空
						if(val=="" || val==oInput.attr("placeholder")){
							if(oInput.hasClass("jsEmpty")){
								return bOk=true;
							}else{
								if(oInput.hasClass("jsChoice")){
									bOk=false;
									errorMsg=choice;
									oNow=oInput;
									$(".jsChoice").each(function(){
										if($.trim(this.value)){
											bOk=true;
											return false;
										}
									});
									return bOk;
								}else{
									errorMsg=empty;
									oNow=oInput;
									return bOk=false;
								}
							}
						}else{
							if(!reg.test(val)){
								errorMsg=error;
								oNow=oInput;
								return bOk=false;
							}
						}
						if(oInput.hasClass("jsSame")){
							if(oInput.val()!=aInput.eq(index-1).val()){
								errorMsg=same;
								oNow=oInput;
								return bOk=false;
							}
						}
						if(oInput.hasClass("jsAjax")){
							$.ajax({
							   type: "POST",
							   dataType:"json",
							   url: oInput.attr("data-url"),
							   async:false,
							   data: oInput.serializeArray(),
							   success: function(res){
							   		if(!res.status){
							   			errorMsg=res.msg;
							   			oNow=oInput;
							   			bOk=false;
							   		}													   	
								}	   
							}); 
							return bOk;
						}
					});
					if(bOk){
						//收起错误信息
						hideAlert(alertType,aInput);
						_submit(oForm,settings.cb,alertType);
					}else{
						_alert(alertType,oNow,errorMsg);
					}
					
				});
				//增加回车提交功能
				if(enterSubmit){
					oForm.keydown(function(event){
					    if(event.keyCode ==13){
					   	 	setTimeout(function(){
					   	 		oBtn.click();
					   	 	},30);
					  	}
					});
				}
				//失去焦点时添加文本提示
				if(settings.focus){
					var aInput=oForm.find(".jsCheck");
					aInput.each(function(index,ele){
						var oInput=$(ele);
						var name=oInput.attr("name");
						var regJson=json[name];
						var reg=regJson.reg;
						var error=regJson.error;
						var empty=regJson.empty;
						var used=regJson.used;
						var prompt=regJson.prompt;

						oInput.focusin(function(){
							hideAlert(alertType,oInput);
						});
						oInput.focusout(function(){
							var val=oInput.val();
							if(val==""){
								//oInput.val("");
							}else{
								if(!(reg.test(val))){
									_alert(alertType,oInput,error);
								}else{
									//是否需要ajax及时校验
									if(oInput.hasClass("jsAjax")){
										$.ajax({
										   type: "POST",
										   dataType:"json",
										   url: oInput.attr("data-url"),
										   data: oInput.serializeArray(),
										   success: function(res){
										   		if(!res.status){
										   			_alert(alertType,oInput,res.msg);
										   		}													   	
											}	   
										}); 
									}
									
								}
								
							}
							
						});
					});
				}
				
			});
		}
	});

	function _alert(alertType,oInput,error){
		switch(alertType){
			case "bottom":
				oInput.closest('li').addClass('u-error').find('.u-err').html(error);
				break;
			case "left":
				oInput.next().html(error).addClass("error").show();
				break;
			case "alert":
				alert(error);
				break;
			case "$alert":
				$.alert(error);
				break;
			default:
				alert(error);
				break;
		}
		
	}
	function hideAlert(alertType,oInput){
		oInput.each(function() {
			switch(alertType){
				case "bottom":
					$(this).closest('li').removeClass('u-error');
					break;
				case "left":
					oInput.next().hide();
					break;
			}
		});
		
	}
	function _submit(oForm,cb,alertType){
		if(cb){
			$.ajax({
                type: oForm.attr("method"),
                dataType: "json",
                url: oForm.attr("action"),
                data: oForm.serializeArray(),
                success: function(res){
                	cb(res);
                }
            });
		}else{
    		oForm.submit();
		}
		
	}
});
